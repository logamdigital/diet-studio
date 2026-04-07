'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, Lock } from 'lucide-react';

const healthGoals = [
  'Weight Loss',
  'Weight Gain / Muscle Building',
  'Diabetes Management',
  'PCOD / PCOS',
  'Thyroid Management',
  'Heart Health / Cholesterol',
  'Post-Pregnancy Diet',
  'General Wellness / Maintenance',
  'Other',
];

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;
const CRM_WEBHOOK_URL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;

const fbq = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, data);
};

const getUtmParams = () => {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get('utm_source')   || '',   // e.g. facebook
    utm_medium:   p.get('utm_medium')   || '',   // e.g. cpc
    utm_campaign: p.get('utm_campaign') || '',   // campaign name
    utm_content:  p.get('utm_content')  || '',   // ad name / creative
    utm_term:     p.get('utm_term')     || '',   // ad set / keyword
    fbclid:       p.get('fbclid')       || '',   // Meta click ID (auto-appended)
    landing_page: window.location.href,
  };
};

const sendWebhook = (payload) => {
  const urls = [WEBHOOK_URL, CRM_WEBHOOK_URL].filter(Boolean);
  const body = JSON.stringify(payload);
  urls.forEach((url) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true, // keeps request alive even after page navigation
    }).catch(() => {}) // silent — never block the payment flow
  );
};

export default function BookingModal({ isOpen, onClose, defaultGoal = '' }) {
  const [step, setStep] = useState(1);
  const [paymentError, setPaymentError] = useState('');

  // Fire ViewContent every time the modal opens
  useEffect(() => {
    if (isOpen) fbq('ViewContent', { content_name: 'Booking Modal' });
  }, [isOpen]);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    defaultValues: { goal: defaultGoal },
  });

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const onSubmit = async (data) => {
    setPaymentError('');
    setStep(2);

    // Lead captured — fire pixel only
    fbq('Lead', { content_name: data.goal, value: 200, currency: 'INR' });

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Payment gateway failed to load. Please try again.');

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, phone: data.phone, email: data.email }),
      });

      if (!orderRes.ok) throw new Error('Could not initiate payment. Please try again.');
      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Diet Studio',
        description: '1:1 Consultation with Dr. Sushant',
        order_id: order.id,
        prefill: { name: data.name, email: data.email, contact: data.phone },
        theme: { color: '#5E3B87' },
        handler: async (response) => {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              customerData: data,
            }),
          });

          if (verifyRes.ok) {
            fbq('Purchase', { value: 200, currency: 'INR', content_name: data.goal });
            sendWebhook({
              event: 'purchase',
              name: data.name,
              phone: '+91' + data.phone,
              email: data.email,
              goal: data.goal,
              conditions: data.conditions || '',
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              amount: 200,
              currency: 'INR',
              timestamp: new Date().toISOString(),
              ...getUtmParams(),
            });
            window.location.href = '/thank-you?name=' + encodeURIComponent(data.name);
          } else {
            setPaymentError('Payment verification failed. Please contact support.');
            setStep(1);
          }
        },
        modal: { ondismiss: () => setStep(1) },
      };

      const rzp = new window.Razorpay(options);
      fbq('InitiateCheckout', { value: 200, currency: 'INR', num_items: 1 });
      rzp.on('payment.failed', (response) => {
        setPaymentError(response.error.description || 'Payment failed. Please try again.');
        setStep(1);
      });
      rzp.open();
    } catch (err) {
      setPaymentError(err.message || 'Something went wrong. Please try again.');
      setStep(1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-purple to-[#4a2d6f] p-6 text-white sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <h2 className="font-heading text-xl font-bold">Book Your Consultation</h2>
          <p className="text-white/80 text-sm mt-1">30-min initial consultation with Dt. Sushant Thakur</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-white/70 text-xs">Personalized plan built for your body. Full program pricing discussed in session.</span>
          </div>
        </div>

        <div className="p-6">
          {/* STEP 1: Form */}
          {step === 1 && (
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {paymentError && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-4">
                  {paymentError}
                </div>
              )}

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Full Name *</label>
                  <input
                    {...register('name', { required: 'Please enter your name' })}
                    type="text"
                    placeholder="e.g. Anjali Sharma"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">WhatsApp / Phone Number *</label>
                  <div className="flex">
                    <span className="bg-gray-100 border border-gray-300 border-r-0 rounded-l-xl px-3 flex items-center text-sm text-gray-600">+91</span>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian number' },
                      })}
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      className={`w-full border rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition ${errors.phone ? 'border-red-400' : 'border-gray-300'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address *</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                    type="email"
                    placeholder="yourname@gmail.com"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Health Goal */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Primary Health Goal *</label>
                  <select
                    {...register('goal', { required: 'Please select your health goal' })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple bg-white transition ${errors.goal ? 'border-red-400' : 'border-gray-300'}`}
                  >
                    <option value="">-- Select your goal --</option>
                    {healthGoals.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal.message}</p>}
                </div>

                {/* Medical conditions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Any Medical Conditions? <span className="font-normal text-gray-500">(optional)</span>
                  </label>
                  <input
                    {...register('conditions')}
                    type="text"
                    placeholder="e.g. PCOD, Diabetes Type 2, Hypothyroid"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 rounded-xl text-base mt-6 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Proceed to Book
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
                <Lock size={12} />
                <span>Your information is 100% confidential and secure</span>
              </div>
            </form>
          )}

          {/* STEP 2: Processing */}
          {step === 2 && (
            <div className="py-12 text-center">
              <Loader2 size={48} className="text-brand-purple animate-spin mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Setting up payment...</h3>
              <p className="text-gray-600 text-sm">You will be redirected to Razorpay in a moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
