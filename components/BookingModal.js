'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2, Lock, ArrowLeft, ArrowRight, Check } from 'lucide-react';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;
const CRM_WEBHOOK_URL = process.env.NEXT_PUBLIC_CRM_WEBHOOK_URL;

const fbq = (event, data = {}) => {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, data);
};

const getUtmParams = () => {
  if (typeof window === 'undefined') return {};
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source:   p.get('utm_source')   || '',
    utm_medium:   p.get('utm_medium')   || '',
    utm_campaign: p.get('utm_campaign') || '',
    utm_content:  p.get('utm_content')  || '',
    utm_term:     p.get('utm_term')     || '',
    fbclid:       p.get('fbclid')       || '',
    landing_page: window.location.href,
  };
};

const sendWebhook = (payload) => {
  [WEBHOOK_URL, CRM_WEBHOOK_URL].filter(Boolean).forEach((url) =>
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {})
  );
};

const loadRazorpay = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

// ─── Step definitions ─────────────────────────────────────────────────────────
// 'contact' type shows name + phone + email together on one screen

const GENERAL_STEPS = [
  {
    id: 'contact', type: 'contact', label: "Let's start with your details", required: true,
  },
  {
    id: 'goal', type: 'single', label: 'What is your primary health goal?', required: true,
    options: [
      'Weight Loss',
      'Weight Gain / Muscle Building',
      'Diabetes Management',
      'PCOD / PCOS',
      'Thyroid Management',
      'Heart Health / Cholesterol',
      'Post-Pregnancy Diet',
      'General Wellness / Maintenance',
    ],
  },
  {
    id: 'conditions', type: 'text', label: 'Any medical conditions?', optional: true,
    placeholder: 'e.g. PCOD, Diabetes Type 2, Hypothyroid',
    validation: {},
  },
];

const PCOD_STEPS = [
  {
    id: 'contact', type: 'contact', label: "Let's start with your details", required: true,
  },
  {
    id: 'pcos_duration', type: 'single', label: 'How long have you been suffering from PCOS / PCOD?', required: true,
    options: [
      'Newly diagnosed',
      '1 – 3 years',
      'More than 3 years',
      'Not officially diagnosed but experiencing symptoms',
    ],
  },
  {
    id: 'symptoms', type: 'multi', label: 'Which symptoms are you experiencing?', required: true,
    subtitle: 'Select all that apply',
    options: [
      'Irregular or missed periods',
      'Weight gain or difficulty losing weight',
      'Acne or excessive facial hair',
      'Hair thinning / hair fall',
      'Bloating or fatigue',
      'Mood swings / anxiety',
    ],
  },
  {
    id: 'medications', type: 'multi', label: 'Are you on any medications for PCOS?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Yes, on birth control / hormonal pills',
      'Yes, on metformin or similar medication',
      'Previously took medications but discontinued',
      'No medications yet',
    ],
  },
  {
    id: 'life_impact', type: 'multi', label: 'Which areas of your life has PCOS affected?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Professional life',
      'Personal life or relationship',
      'Confidence and body image',
      'Emotional or mental health',
      'Fertility issues',
      'Energy levels and daily productivity',
      'Not affecting much',
    ],
  },
  {
    id: 'barriers', type: 'multi', label: 'What has been stopping you from managing PCOS?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Lack of proper guidance',
      'Lack of motivation / discipline',
      'Time constraints',
      "I'm not consistent",
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function BookingModal({ isOpen, onClose, defaultGoal = '', simple = false, price = 99 }) {
  const steps = simple ? PCOD_STEPS : GENERAL_STEPS;

  const [stepIdx, setStepIdx]           = useState(0);
  const [phase, setPhase]               = useState('form'); // 'form' | 'paying'
  const [customFields, setCustomFields] = useState({});
  const customFieldsRef                 = useRef({});
  const [paymentError, setPaymentError] = useState('');
  const [kbHeight, setKbHeight]         = useState(0);
  const priceRef                        = useRef(price);
  useEffect(() => { priceRef.current = price; }, [price]);

  const { register, trigger, getValues, formState: { errors } } = useForm({
    defaultValues: { goal: defaultGoal },
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const updateCustomField = (id, value) => {
    const next = { ...customFieldsRef.current, [id]: value };
    customFieldsRef.current = next;
    setCustomFields({ ...next });
  };

  // Reset on open
  useEffect(() => {
    if (!isOpen) return;
    setStepIdx(0);
    setPhase('form');
    setCustomFields({});
    customFieldsRef.current = {};
    setPaymentError('');
    fbq('ViewContent', { content_name: 'Booking Modal' });
  }, [isOpen]);

  // Track keyboard height so Continue button stays visible above keyboard
  useEffect(() => {
    if (!isOpen || phase !== 'form') return;
    const vv = window.visualViewport;
    if (!vv) return;
    const update = () => setKbHeight(Math.max(0, window.innerHeight - vv.height - vv.offsetTop));
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    update();
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      setKbHeight(0);
    };
  }, [isOpen, phase]);

  // ── Navigation ───────────────────────────────────────────────────────────────

  const initiatePayment = async () => {
    const data = getValues();
    const cf = customFieldsRef.current;
    const p = priceRef.current;

    setPaymentError('');
    setPhase('paying');

    try {
      const loaded = await loadRazorpay();
      if (!loaded) throw new Error('Payment gateway failed to load. Please try again.');

      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, phone: data.phone, email: data.email, price: p }),
      });
      if (!orderRes.ok) throw new Error('Could not initiate payment. Please try again.');
      const order = await orderRes.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: 'INR',
        name: 'Diet Studio',
        description: '1:1 Consultation with Dt. Sushant',
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
            fbq('Purchase', { value: p, currency: 'INR', content_name: data.goal || cf.goal || 'PCOD / PCOS' });
            sendWebhook({
              event:               'purchase',
              name:                data.name,
              phone:               '+91' + data.phone,
              email:               data.email,
              goal:                data.goal || cf.goal || 'PCOD / PCOS',
              conditions:          data.conditions || '',
              pcos_duration:       cf.pcos_duration || '',
              symptoms:            (cf.symptoms    || []).join(', '),
              medications:         (cf.medications  || []).join(', '),
              life_impact:         (cf.life_impact  || []).join(', '),
              barriers:            (cf.barriers     || []).join(', '),
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              amount:              p,
              currency:            'INR',
              timestamp:           new Date().toISOString(),
              ...getUtmParams(),
            });
            const qs = new URLSearchParams({ name: data.name, ...(data.email ? { email: data.email } : {}) });
            window.location.href = '/thank-you?' + qs.toString();
          } else {
            setPaymentError('Payment verification failed. Please contact support.');
            setPhase('form');
          }
        },
        modal: { ondismiss: () => setPhase('form') },
      };

      const rzp = new window.Razorpay(options);
      fbq('InitiateCheckout', { value: p, currency: 'INR', num_items: 1 });
      rzp.on('payment.failed', (resp) => {
        setPaymentError(resp.error.description || 'Payment failed. Please try again.');
        setPhase('form');
      });
      rzp.open();
    } catch (err) {
      setPaymentError(err.message || 'Something went wrong. Please try again.');
      setPhase('form');
    }
  };

  const advanceStep = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      const data = getValues();
      fbq('Lead', { content_name: data.goal || customFieldsRef.current.goal || 'PCOD / PCOS', value: priceRef.current, currency: 'INR' });
      initiatePayment();
    }
  };

  const handleNext = async () => {
    const step = steps[stepIdx];

    if (step.type === 'contact') {
      const nameValid  = await trigger('name');
      const phoneValid = await trigger('phone');
      const emailVal   = getValues('email');
      const emailValid = emailVal ? await trigger('email') : true;
      if (!nameValid || !phoneValid || !emailValid) return;
      advanceStep();
      return;
    }

    if (['text', 'email', 'tel'].includes(step.type) && !step.optional) {
      const valid = await trigger(step.id);
      if (!valid) return;
    } else if (['text', 'email', 'tel'].includes(step.type) && getValues(step.id)) {
      const valid = await trigger(step.id);
      if (!valid) return;
    }

    if (step.type === 'multi' && step.required && !(customFieldsRef.current[step.id]?.length)) return;

    advanceStep();
  };

  const handleSingleSelect = (option) => {
    updateCustomField(steps[stepIdx].id, option);
    setTimeout(advanceStep, 220);
  };

  const handleBack = () => {
    if (stepIdx > 0) setStepIdx((i) => i - 1);
  };

  // ── Render helpers ────────────────────────────────────────────────────────────

  const inputBase = 'w-full border rounded-xl px-4 py-3 text-[16px] leading-tight focus:outline-none focus:ring-2 focus:ring-brand-purple transition';

  const renderField = () => {
    const step = steps[stepIdx];
    const cf = customFields;

    if (step.type === 'contact') {
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register('name', { required: 'Please enter your name' })}
              type="text"
              placeholder="e.g. Anjali Sharma"
              autoComplete="name"
              autoFocus
              className={`${inputBase} ${errors.name ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              WhatsApp Number <span className="text-red-400">*</span>
            </label>
            <div className={`flex rounded-xl border overflow-hidden transition ${errors.phone ? 'border-red-400' : 'border-gray-300 focus-within:ring-2 focus-within:ring-brand-purple'}`}>
              <span className="bg-gray-50 border-r border-gray-300 px-3 flex items-center text-[16px] text-gray-500 shrink-0">+91</span>
              <input
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian number' },
                })}
                type="tel"
                inputMode="numeric"
                placeholder="9876543210"
                maxLength={10}
                autoComplete="tel"
                className="flex-1 px-3 py-3 text-[16px] leading-tight text-gray-900 placeholder-gray-300 focus:outline-none bg-transparent"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1.5">
              Email <span className="text-gray-300 font-normal normal-case">(optional)</span>
            </label>
            <input
              {...register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
              type="email"
              placeholder="yourname@gmail.com"
              autoComplete="email"
              className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
        </div>
      );
    }

    if (step.type === 'text' || step.type === 'email') {
      return (
        <div>
          <input
            key={step.id}
            {...register(step.id, step.validation)}
            type={step.type}
            placeholder={step.placeholder}
            autoFocus
            className={`${inputBase} ${errors[step.id] ? 'border-red-400' : 'border-gray-300'}`}
          />
          {errors[step.id] && <p className="text-red-500 text-xs mt-1.5">{errors[step.id].message}</p>}
        </div>
      );
    }

    if (step.type === 'tel') {
      return (
        <div>
          <div className={`flex rounded-xl border overflow-hidden transition ${errors[step.id] ? 'border-red-400' : 'border-gray-300 focus-within:ring-2 focus-within:ring-brand-purple'}`}>
            <span className="bg-gray-50 border-r border-gray-300 px-3 flex items-center text-[16px] text-gray-500 shrink-0">+91</span>
            <input
              key={step.id}
              {...register(step.id, step.validation)}
              type="tel"
              inputMode="numeric"
              placeholder={step.placeholder}
              maxLength={10}
              autoFocus
              className="flex-1 px-3 py-3 text-[16px] leading-tight text-gray-900 placeholder-gray-300 focus:outline-none bg-transparent"
            />
          </div>
          {errors[step.id] && <p className="text-red-500 text-xs mt-1.5">{errors[step.id].message}</p>}
        </div>
      );
    }

    if (step.type === 'single') {
      const selected = cf[step.id];
      return (
        <div className="space-y-2.5">
          {step.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSingleSelect(option)}
              style={{ touchAction: 'manipulation' }}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3
                ${selected === option
                  ? 'border-brand-purple bg-brand-purple/5 text-brand-purple'
                  : 'border-gray-200 bg-white text-gray-700 active:bg-gray-50'
                }`}
            >
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                ${selected === option ? 'border-brand-purple bg-brand-purple' : 'border-gray-300'}`}>
                {selected === option && <Check size={11} className="text-white" strokeWidth={3} />}
              </span>
              {option}
            </button>
          ))}
        </div>
      );
    }

    if (step.type === 'multi') {
      const selected = cf[step.id] || [];
      return (
        <div className="space-y-2.5">
          {step.options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  const next = checked
                    ? selected.filter((o) => o !== option)
                    : [...selected, option];
                  updateCustomField(step.id, next);
                }}
                style={{ touchAction: 'manipulation' }}
                className={`w-full text-left px-4 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3
                  ${checked
                    ? 'border-brand-purple bg-brand-purple/5 text-brand-purple'
                    : 'border-gray-200 bg-white text-gray-700 active:bg-gray-50'
                  }`}
              >
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                  ${checked ? 'border-brand-purple bg-brand-purple' : 'border-gray-300'}`}>
                  {checked && <Check size={11} className="text-white" strokeWidth={3} />}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      );
    }

    return null;
  };

  if (!isOpen) return null;

  const currentStep = steps[stepIdx];
  const totalSteps  = steps.length;
  const progress    = ((stepIdx + 1) / totalSteps) * 100;
  const isPaying    = phase === 'paying';

  return (
    <div
      className="fixed inset-x-0 top-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{
        // Shrink the modal container as keyboard rises so the Continue button stays visible
        height: kbHeight > 0 ? `calc(100dvh - ${kbHeight}px)` : '100dvh',
        transition: 'height 0.2s ease-out',
      }}
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={phase === 'form' ? onClose : undefined}
        style={{ height: '100dvh' }}
      />

      {/* Modal card */}
      <div
        className="relative bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl flex flex-col"
        style={{
          maxHeight: '100%',
        }}
      >
        {/* Header — sticky */}
        <div className="bg-gradient-to-r from-brand-purple to-[#4a2d6f] px-5 pt-5 pb-4 text-white rounded-t-3xl flex-none">
          {phase === 'form' && (
            <button
              onClick={onClose}
              style={{ touchAction: 'manipulation' }}
              className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          )}
          <h2 className="font-heading text-xl font-bold">Book Your Consultation</h2>
          <p className="text-white/80 text-sm mt-0.5">30-min session with Dt. Sushant Thakur</p>

          {phase === 'form' && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>Step {stepIdx + 1} of {totalSteps}</span>
              </div>
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-5">
          {paymentError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-4">
              {paymentError}
            </div>
          )}

          {/* Form step */}
          {phase === 'form' && currentStep && (
            <>
              <div className="mb-4">
                <h3 className="text-base font-semibold text-gray-900 leading-snug">
                  {currentStep.label}
                </h3>
                {currentStep.optional && (
                  <p className="text-xs text-gray-400 mt-0.5">
                    {currentStep.subtitle || 'Optional'}
                  </p>
                )}
                {currentStep.subtitle && !currentStep.optional && (
                  <p className="text-xs text-gray-400 mt-0.5">{currentStep.subtitle}</p>
                )}
              </div>

              {renderField()}

              {/* Back link for single-choice steps */}
              {currentStep.type === 'single' && stepIdx > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={{ touchAction: 'manipulation' }}
                  className="mt-4 flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <ArrowLeft size={14} /> Back
                </button>
              )}
            </>
          )}

          {/* Paying */}
          {isPaying && (
            <div className="py-12 text-center">
              <Loader2 size={48} className="text-brand-purple animate-spin mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Setting up payment...</h3>
              <p className="text-gray-600 text-sm">You will be redirected to Razorpay in a moment.</p>
            </div>
          )}
        </div>

        {/* Footer — always visible, never scrolled away */}
        {phase === 'form' && currentStep.type !== 'single' && (
          <div className="flex-none px-5 pt-3 pb-5">
            <div className="flex gap-3">
              {stepIdx > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  style={{ touchAction: 'manipulation' }}
                  className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center text-gray-600 hover:bg-gray-50 transition shrink-0"
                  aria-label="Back"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <button
                type="button"
                onClick={handleNext}
                style={{ touchAction: 'manipulation' }}
                className="flex-1 bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-3.5 rounded-xl text-base transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                {stepIdx < steps.length - 1 ? (
                  <>{currentStep.optional && !customFields[currentStep.id] ? 'Skip' : 'Continue'} <ArrowRight size={18} /></>
                ) : (
                  <>Book & Pay <ArrowRight size={18} /></>
                )}
              </button>
            </div>
            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <Lock size={12} />
              <span>Your information is 100% confidential</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
