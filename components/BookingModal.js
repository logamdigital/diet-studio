'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { X, CheckCircle2, Loader2, Lock } from 'lucide-react';

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

export default function BookingModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [paymentError, setPaymentError] = useState('');

  const { register, handleSubmit, formState: { errors }, getValues } = useForm();

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
        description: 'Personal Diet Consultation',
        order_id: order.id,
        prefill: { name: data.name, email: data.email, contact: data.phone },
        theme: { color: '#E07B39' },
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
            setStep(3);
          } else {
            setPaymentError('Payment verification failed. Please contact support.');
            setStep(1);
          }
        },
        modal: { ondismiss: () => setStep(1) },
      };

      const rzp = new window.Razorpay(options);
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
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white sticky top-0 z-10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <h2 className="font-heading text-xl font-bold">Book Your Consultation</h2>
          <p className="text-orange-100 text-sm mt-1">30-min personal session with a certified dietitian</p>
          <div className="flex items-center gap-3 mt-3">
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm font-bold">Rs.200</div>
            <span className="text-orange-200 text-xs line-through">Rs.999</span>
            <span className="text-green-300 text-xs font-semibold">80% OFF</span>
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
                  <label className="block text-sm font-semibold text-brown-800 mb-1.5">Full Name *</label>
                  <input
                    {...register('name', { required: 'Please enter your name' })}
                    type="text"
                    placeholder="e.g. Anjali Sharma"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.name ? 'border-red-400' : 'border-beige-300'}`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold text-brown-800 mb-1.5">WhatsApp / Phone Number *</label>
                  <div className="flex">
                    <span className="bg-beige-100 border border-beige-300 border-r-0 rounded-l-xl px-3 flex items-center text-sm text-brown-600">+91</span>
                    <input
                      {...register('phone', {
                        required: 'Phone number is required',
                        pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian number' },
                      })}
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      className={`w-full border rounded-r-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.phone ? 'border-red-400' : 'border-beige-300'}`}
                    />
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-brown-800 mb-1.5">Email Address *</label>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                    type="email"
                    placeholder="yourname@gmail.com"
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition ${errors.email ? 'border-red-400' : 'border-beige-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                {/* Health Goal */}
                <div>
                  <label className="block text-sm font-semibold text-brown-800 mb-1.5">Primary Health Goal *</label>
                  <select
                    {...register('goal', { required: 'Please select your health goal' })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white transition ${errors.goal ? 'border-red-400' : 'border-beige-300'}`}
                  >
                    <option value="">-- Select your goal --</option>
                    {healthGoals.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  {errors.goal && <p className="text-red-500 text-xs mt-1">{errors.goal.message}</p>}
                </div>

                {/* Medical conditions */}
                <div>
                  <label className="block text-sm font-semibold text-brown-800 mb-1.5">
                    Any Medical Conditions? <span className="font-normal text-brown-500">(optional)</span>
                  </label>
                  <input
                    {...register('conditions')}
                    type="text"
                    placeholder="e.g. Diabetes Type 2, Hypothyroid"
                    className="w-full border border-beige-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-base mt-6 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                Proceed to Pay Rs.200
              </button>

              <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-brown-400">
                <Lock size={12} />
                <span>Your information is 100% confidential and secure</span>
              </div>
            </form>
          )}

          {/* STEP 2: Processing */}
          {step === 2 && (
            <div className="py-12 text-center">
              <Loader2 size={48} className="text-orange-500 animate-spin mx-auto mb-4" />
              <h3 className="font-semibold text-brown-900 text-lg mb-2">Setting up payment...</h3>
              <p className="text-brown-600 text-sm">You will be redirected to Razorpay in a moment.</p>
            </div>
          )}

          {/* STEP 3: Success */}
          {step === 3 && (
            <div className="py-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-brown-900 mb-2">Booking Confirmed!</h3>
              <p className="text-brown-700 text-sm mb-4">
                Thank you, <strong>{getValues('name')}</strong>! Your consultation is booked.
              </p>
              <p className="text-brown-600 text-sm mb-6">
                We have sent the details to <strong>{getValues('email')}</strong> and
                will reach out on WhatsApp to confirm your time slot.
              </p>
              <div className="bg-beige-50 rounded-xl p-4 text-left text-sm text-brown-700 mb-6 border border-beige-200">
                <p className="font-semibold mb-2">Next Steps:</p>
                <ul className="space-y-2">
                  {[
                    'Check your email for confirmation',
                    'We will WhatsApp you to confirm your slot',
                    'Join the call at your booked time',
                  ].map((s, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="text-green-500 mt-0.5 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={onClose}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
