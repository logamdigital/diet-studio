'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, Check, Loader2, Lock } from 'lucide-react';

const WEBHOOK_URL     = process.env.NEXT_PUBLIC_WEBHOOK_URL;
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
    id: 'conditions', type: 'text', label: 'Any medical conditions we should know about?', optional: true,
    placeholder: 'e.g. PCOD, Diabetes Type 2, Hypothyroid',
    validation: {},
  },
];

const PCOD_STEPS = [
  {
    id: 'contact', type: 'contact', label: "Let's start with your details", required: true,
  },
  {
    id: 'pcos_duration', type: 'single',
    label: 'How long have you been suffering from PCOS / PCOD?', required: true,
    options: [
      'Newly diagnosed',
      '1 – 3 years',
      'More than 3 years',
      'Not officially diagnosed but experiencing symptoms',
    ],
  },
  {
    id: 'symptoms', type: 'multi',
    label: 'Which symptoms are you experiencing?', required: true,
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
    id: 'medications', type: 'multi',
    label: 'Are you on any medications for PCOS?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Yes, on birth control / hormonal pills',
      'Yes, on metformin or similar medication',
      'Previously took medications but discontinued',
      'No medications yet',
    ],
  },
  {
    id: 'life_impact', type: 'multi',
    label: 'Which areas of your life has PCOS affected?', optional: true,
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
    id: 'barriers', type: 'multi',
    label: 'What has been stopping you from managing PCOS?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Lack of proper guidance',
      'Lack of motivation / discipline',
      'Time constraints',
      "I'm not consistent",
    ],
  },
];

const DIABETES_STEPS = [
  {
    id: 'contact', type: 'contact', label: "Let's start with your details", required: true,
  },
  {
    id: 'diabetes_duration', type: 'single',
    label: 'How long have you been living with diabetes?', required: true,
    options: [
      'Newly diagnosed (less than 6 months)',
      '6 months – 2 years',
      '2 – 5 years',
      'More than 5 years',
    ],
  },
  {
    id: 'symptoms', type: 'multi',
    label: 'Which symptoms are you currently experiencing?', required: true,
    subtitle: 'Select all that apply',
    options: [
      'High blood sugar / HbA1c above 7',
      'Fatigue and low energy',
      'Frequent urination or excessive thirst',
      'Weight gain or difficulty losing weight',
      'Nerve tingling or numbness',
      'Blurred vision',
    ],
  },
  {
    id: 'medications', type: 'multi',
    label: 'Are you currently on any diabetes medications?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Yes, on Metformin',
      'Yes, on insulin',
      'Yes, on other oral medications',
      'Previously on medications but discontinued',
      'No medications yet',
    ],
  },
  {
    id: 'life_impact', type: 'multi',
    label: 'Which areas of your life has diabetes affected?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Energy levels and daily productivity',
      'Professional life',
      'Personal life or relationships',
      'Mental health and confidence',
      'Sleep quality',
      'Not affecting much yet',
    ],
  },
  {
    id: 'barriers', type: 'multi',
    label: 'What has been stopping you from reversing diabetes?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Lack of proper guidance',
      'Unsure if reversal is possible for me',
      'Time constraints',
      "I'm not consistent with diet",
    ],
  },
];

const WEIGHTLOSS_STEPS = [
  {
    id: 'contact', type: 'contact', label: "Let's start with your details", required: true,
  },
  {
    id: 'weight_duration', type: 'single',
    label: 'How long have you been struggling with weight loss?', required: true,
    options: [
      'Less than 6 months',
      '6 months – 2 years',
      '2 – 5 years',
      'More than 5 years',
    ],
  },
  {
    id: 'symptoms', type: 'multi',
    label: 'Which challenges are you currently facing?', required: true,
    subtitle: 'Select all that apply',
    options: [
      'Weight not changing despite dieting',
      'Constant cravings and hunger',
      'Stubborn belly fat',
      'Low energy and fatigue',
      'Weight comes back after stopping diet',
      'Hit a weight loss plateau',
    ],
  },
  {
    id: 'tried_before', type: 'multi',
    label: 'What have you already tried?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Calorie-restricted diets',
      'Keto or low-carb diet',
      'Gym or cardio workouts',
      'Generic meal plans / PDFs',
      'Fasting or intermittent fasting',
      'Nothing structured yet',
    ],
  },
  {
    id: 'barriers', type: 'multi',
    label: 'What has been stopping you?', optional: true,
    subtitle: 'Select all that apply',
    options: [
      'Lack of proper guidance',
      'Cravings and consistency',
      'Weight returns after stopping',
      'No visible results despite trying',
    ],
  },
];

// ─── Booking flow ─────────────────────────────────────────────────────────────

function BookingFlow() {
  const params  = useSearchParams();
  const router  = useRouter();
  const isPcod       = params.get('pcod') === '1';
  const isDiabetes   = params.get('diabetes') === '1';
  const isWeightLoss = params.get('weightloss') === '1';
  const price        = Number(params.get('price')) || 500;
  const steps        = isPcod ? PCOD_STEPS : isDiabetes ? DIABETES_STEPS : isWeightLoss ? WEIGHTLOSS_STEPS : GENERAL_STEPS;
  const defaultGoal  = isDiabetes ? 'Diabetes Management' : isPcod ? 'PCOD / PCOS' : isWeightLoss ? 'Weight Loss' : '';
  const accent = isDiabetes
    ? { bar: 'bg-brand-teal',   btn: 'bg-brand-teal hover:bg-brand-teal/90',     ring: 'focus:border-brand-teal',   ringWithin: 'focus-within:border-brand-teal',   selected: 'border-brand-teal bg-brand-teal/5 text-brand-teal',     dot: 'border-brand-teal bg-brand-teal',     spin: 'text-brand-teal'   }
    : isWeightLoss
    ? { bar: 'bg-orange-500',   btn: 'bg-orange-500 hover:bg-orange-600',         ring: 'focus:border-orange-500',   ringWithin: 'focus-within:border-orange-500',   selected: 'border-orange-500 bg-orange-500/5 text-orange-600',     dot: 'border-orange-500 bg-orange-500',     spin: 'text-orange-500'   }
    : { bar: 'bg-brand-purple', btn: 'bg-brand-purple hover:bg-brand-purple/90', ring: 'focus:border-brand-purple', ringWithin: 'focus-within:border-brand-purple', selected: 'border-brand-purple bg-brand-purple/5 text-brand-purple', dot: 'border-brand-purple bg-brand-purple', spin: 'text-brand-purple' };

  const [stepIdx, setStepIdx]           = useState(0);
  const [phase, setPhase]               = useState('form'); // 'form' | 'paying'
  const [customFields, setCustomFields] = useState({});
  const customFieldsRef                 = useRef({});
  const [paymentError, setPaymentError] = useState('');
  const [kbHeight, setKbHeight]         = useState(0);
  const priceRef                        = useRef(price);
  useEffect(() => { priceRef.current = price; }, [price]);

  const { register, trigger, getValues, formState: { errors } } = useForm({
    mode: 'onTouched',
    shouldUnregister: false,
  });

  const updateCustomField = (id, value) => {
    const next = { ...customFieldsRef.current, [id]: value };
    customFieldsRef.current = next;
    setCustomFields({ ...next });
  };

  useEffect(() => { fbq('ViewContent', { content_name: 'Booking Page' }); }, []);

  // Push content above keyboard so Continue button stays visible
  useEffect(() => {
    if (phase !== 'form') return;
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
  }, [phase]);

  // ── Payment ───────────────────────────────────────────────────────────────────

  const initiatePayment = async () => {
    const data = getValues();
    const cf   = customFieldsRef.current;
    const p    = priceRef.current;
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
        key:         process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount:      order.amount,
        currency:    'INR',
        name:        'Diet Studio',
        description: '1:1 Consultation with Dt. Sushant',
        order_id:    order.id,
        prefill:     { name: data.name, email: data.email, contact: data.phone },
        theme:       { color: isDiabetes ? '#00A5B5' : isWeightLoss ? '#E07B39' : '#5E3B87' },
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
            sendWebhook({
              event:               'purchase',
              name:                data.name,
              phone:               '+91' + data.phone,
              email:               data.email,
              goal:                data.goal || cf.goal || defaultGoal,
              conditions:          data.conditions || '',
              pcos_duration:       cf.pcos_duration     || '',
              diabetes_duration:   cf.diabetes_duration || '',
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
            // Purchase fires on /thank-you (not here) so the pixel beacon isn't
            // cancelled by this navigation. pid is passed for de-duplication.
            const qs = new URLSearchParams({
              name: data.name,
              ...(data.email ? { email: data.email } : {}),
              value: String(p),
              goal: data.goal || cf.goal || defaultGoal,
              pid: response.razorpay_payment_id,
            });
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

  // ── Navigation ────────────────────────────────────────────────────────────────

  const advanceStep = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      fbq('Lead', {
        content_name: getValues().goal || customFieldsRef.current.goal || defaultGoal,
        value: priceRef.current,
        currency: 'INR',
      });
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
      if (!(await trigger(step.id))) return;
    } else if (['text', 'email', 'tel'].includes(step.type) && getValues(step.id)) {
      if (!(await trigger(step.id))) return;
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
    else router.back();
  };

  // ── Field renderer ────────────────────────────────────────────────────────────

  const inputBase = 'w-full border-b-2 bg-transparent px-0 py-3 text-[16px] leading-tight text-gray-900 placeholder-gray-300 focus:outline-none transition';

  const renderField = () => {
    const step = steps[stepIdx];
    const cf   = customFields;

    if (step.type === 'contact') {
      return (
        <div className="space-y-6">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              {...register('name', { required: 'Please enter your name' })}
              type="text"
              placeholder="e.g. Anjali Sharma"
              autoComplete="name"
              autoFocus
              className={`${inputBase} ${errors.name ? 'border-red-400' : `border-gray-300 ${accent.ring}`}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1.5">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              WhatsApp Number <span className="text-red-400">*</span>
            </label>
            <div className={`flex items-center border-b-2 transition ${errors.phone ? 'border-red-400' : `border-gray-300 ${accent.ringWithin}`}`}>
              <span className="text-gray-400 text-[16px] pr-2 pb-3 shrink-0">+91</span>
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
                className="flex-1 bg-transparent py-3 text-[16px] leading-tight text-gray-900 placeholder-gray-300 focus:outline-none"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-sm mt-1.5">{errors.phone.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
              Email <span className="text-gray-300 font-normal normal-case">(optional)</span>
            </label>
            <input
              {...register('email', { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })}
              type="email"
              placeholder="yourname@gmail.com"
              autoComplete="email"
              className={`${inputBase} ${errors.email ? 'border-red-400' : `border-gray-300 ${accent.ring}`}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1.5">{errors.email.message}</p>}
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
            className={`${inputBase} ${errors[step.id] ? 'border-red-400' : `border-gray-300 ${accent.ring}`}`}
          />
          {errors[step.id] && <p className="text-red-500 text-sm mt-2">{errors[step.id].message}</p>}
        </div>
      );
    }

    if (step.type === 'tel') {
      return (
        <div>
          <div className={`flex items-center border-b-2 transition ${errors[step.id] ? 'border-red-400' : `border-gray-300 ${accent.ringWithin}`}`}>
            <span className="text-gray-400 text-[16px] pr-2 pb-3 shrink-0">+91</span>
            <input
              key={step.id}
              {...register(step.id, step.validation)}
              type="tel"
              inputMode="numeric"
              placeholder={step.placeholder}
              maxLength={10}
              autoFocus
              className="flex-1 bg-transparent py-3 text-[16px] leading-tight text-gray-900 placeholder-gray-300 focus:outline-none"
            />
          </div>
          {errors[step.id] && <p className="text-red-500 text-sm mt-2">{errors[step.id].message}</p>}
        </div>
      );
    }

    if (step.type === 'single') {
      const selected = cf[step.id];
      return (
        <div className="space-y-3 mt-2">
          {step.options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleSingleSelect(option)}
              style={{ touchAction: 'manipulation' }}
              className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-sm font-medium flex items-center gap-3
                ${selected === option
                  ? accent.selected
                  : 'border-gray-200 text-gray-700 active:bg-gray-50'
                }`}
            >
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                ${selected === option ? accent.dot : 'border-gray-300'}`}>
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
        <div className="space-y-3 mt-2">
          {step.options.map((option) => {
            const checked = selected.includes(option);
            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  updateCustomField(step.id, checked
                    ? selected.filter((o) => o !== option)
                    : [...selected, option]
                  )
                }
                style={{ touchAction: 'manipulation' }}
                className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-sm font-medium flex items-center gap-3
                  ${checked
                    ? accent.selected
                    : 'border-gray-200 text-gray-700 active:bg-gray-50'
                  }`}
              >
                <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all
                  ${checked ? accent.dot : 'border-gray-300'}`}>
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

  // ── Layout ────────────────────────────────────────────────────────────────────

  const totalSteps  = steps.length;
  const progress    = ((stepIdx + 1) / totalSteps) * 100;
  const currentStep = steps[stepIdx];

  if (phase === 'paying') {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <Loader2 size={48} className={`${accent.spin} animate-spin mx-auto mb-4`} />
          <h2 className="font-semibold text-gray-900 text-lg mb-2">Setting up payment...</h2>
          <p className="text-gray-500 text-sm">You will be redirected to Razorpay in a moment.</p>
          {paymentError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm max-w-sm">
              {paymentError}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    // paddingBottom shifts the whole page up when keyboard opens, keeping the Continue button visible
    <div
      className="bg-white flex flex-col"
      style={{
        height: kbHeight > 0
          ? `calc(100dvh - ${kbHeight}px)`
          : '100dvh',
        transition: 'height 0.2s ease-out',
      }}
    >
      {/* Top bar: back + progress */}
      <div className="flex-none px-5 pt-5 pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            style={{ touchAction: 'manipulation' }}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition shrink-0"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${accent.bar} rounded-full transition-all duration-300`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 shrink-0 w-10 text-right">
            {stepIdx + 1}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Scrollable content + sticky bottom button */}
      <div className="flex-1 overflow-y-auto px-5 max-w-lg w-full mx-auto">
        <div className="pt-4 pb-6">
          <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-1">
            {currentStep.label}
          </h2>
          {(currentStep.optional || currentStep.subtitle) && (
            <p className="text-sm text-gray-400 mb-5">
              {currentStep.subtitle || 'Optional — you can skip this'}
            </p>
          )}
          {!currentStep.optional && !currentStep.subtitle && <div className="mb-5" />}

          {paymentError && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm mb-4">
              {paymentError}
            </div>
          )}

          {renderField()}
        </div>
      </div>

      {/* Continue button — always visible above keyboard */}
      {currentStep.type !== 'single' && (
        <div className="flex-none px-5 pt-3 pb-6 max-w-lg w-full mx-auto">
          <button
            type="button"
            onClick={handleNext}
            style={{ touchAction: 'manipulation' }}
            className={`w-full ${accent.btn} text-white font-bold py-4 rounded-2xl text-base transition-all hover:shadow-lg flex items-center justify-center gap-2`}
          >
            {stepIdx < steps.length - 1 ? (
              <>{currentStep.optional && !customFields[currentStep.id] ? 'Skip' : 'Continue'} <ArrowRight size={18} /></>
            ) : (
              <>Book & Pay <ArrowRight size={18} /></>
            )}
          </button>
          <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
            <Lock size={11} />
            <span>Your information is 100% confidential</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense>
      <BookingFlow />
    </Suspense>
  );
}
