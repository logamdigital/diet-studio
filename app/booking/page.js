'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight, Check, Calendar, Loader2, Lock } from 'lucide-react';
import Script from 'next/script';

// ─── Constants ───────────────────────────────────────────────────────────────

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

// ─── Step definitions ────────────────────────────────────────────────────────

const GENERAL_STEPS = [
  {
    id: 'name', type: 'text', label: 'What is your name?',
    placeholder: 'e.g. Anjali Sharma', required: true,
    validation: { required: 'Please enter your name' },
  },
  {
    id: 'phone', type: 'tel', label: 'Your WhatsApp number?',
    placeholder: '9876543210', required: true,
    validation: {
      required: 'Phone number is required',
      pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian number' },
    },
  },
  {
    id: 'email', type: 'email', label: 'Your email address?', optional: true,
    placeholder: 'yourname@gmail.com',
    validation: { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } },
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
    id: 'name', type: 'text', label: 'What is your name?',
    placeholder: 'e.g. Anjali Sharma', required: true,
    validation: { required: 'Please enter your name' },
  },
  {
    id: 'phone', type: 'tel', label: 'Your WhatsApp number?',
    placeholder: '9876543210', required: true,
    validation: {
      required: 'Phone number is required',
      pattern: { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian number' },
    },
  },
  {
    id: 'email', type: 'email', label: 'Your email address?', optional: true,
    placeholder: 'yourname@gmail.com',
    validation: { pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } },
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

// ─── Booking flow ─────────────────────────────────────────────────────────────

function BookingFlow() {
  const params  = useSearchParams();
  const router  = useRouter();
  const isPcod  = params.get('pcod') === '1';
  const price   = isPcod ? 199 : (Number(params.get('price')) || 99);
  const steps   = isPcod ? PCOD_STEPS : GENERAL_STEPS;

  const [stepIdx, setStepIdx]             = useState(0);
  const [phase, setPhase]                 = useState('form'); // 'form' | 'calendly' | 'paying'
  const [customFields, setCustomFields]   = useState({});
  const customFieldsRef                   = useRef({});
  const [paymentError, setPaymentError]   = useState('');
  const [calendlyReady, setCalendlyReady] = useState(false);
  const calendlyInitialized               = useRef(false);
  const priceRef                          = useRef(price);
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

  // Calendly messages
  useEffect(() => {
    const onMessage = (e) => {
      if (e.data?.event === 'calendly.event_type_viewed') setCalendlyReady(true);
      if (e.data?.event === 'calendly.event_scheduled') {
        initiatePayment(e.data.payload?.event?.uri || null);
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Init Calendly widget
  useEffect(() => {
    if (phase !== 'calendly' || calendlyInitialized.current) return;
    const init = () => {
      const el = document.getElementById('booking-calendly-embed');
      if (!window.Calendly || !el) { setTimeout(init, 200); return; }
      const data = getValues();
      const url  = new URL('https://calendly.com/contact-thedietstudio/30min');
      if (data.name)  url.searchParams.set('name', data.name);
      if (data.email) url.searchParams.set('email', data.email);
      window.Calendly.initInlineWidget({ url: url.toString(), parentElement: el });
      calendlyInitialized.current = true;
    };
    setTimeout(init, 100);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Navigation ──────────────────────────────────────────────────────────────

  const advanceStep = () => {
    if (stepIdx < steps.length - 1) {
      setStepIdx((i) => i + 1);
    } else {
      const data = getValues();
      fbq('Lead', { content_name: data.goal || customFieldsRef.current.goal || 'PCOD / PCOS', value: priceRef.current, currency: 'INR' });
      setPhase('calendly');
    }
  };

  const handleNext = async () => {
    const step = steps[stepIdx];
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
    if (phase === 'calendly') {
      setPhase('form');
      setStepIdx(steps.length - 1);
      calendlyInitialized.current = false;
      setCalendlyReady(false);
    } else if (stepIdx > 0) {
      setStepIdx((i) => i - 1);
    } else {
      router.back();
    }
  };

  // ── Payment ─────────────────────────────────────────────────────────────────

  const initiatePayment = async (calendlyEventUri = null) => {
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
        theme:       { color: '#5E3B87' },
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
              calendly_event_uri:  calendlyEventUri || '',
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
            setPhase('calendly');
          }
        },
        modal: { ondismiss: () => setPhase('calendly') },
      };

      const rzp = new window.Razorpay(options);
      fbq('InitiateCheckout', { value: p, currency: 'INR', num_items: 1 });
      rzp.on('payment.failed', (resp) => {
        setPaymentError(resp.error.description || 'Payment failed. Please try again.');
        setPhase('calendly');
      });
      rzp.open();
    } catch (err) {
      setPaymentError(err.message || 'Something went wrong. Please try again.');
      setPhase('calendly');
    }
  };

  // ── Field renderer ───────────────────────────────────────────────────────────

  const renderField = () => {
    const step = steps[stepIdx];
    const cf   = customFields;

    if (step.type === 'text' || step.type === 'email') {
      return (
        <div>
          <input
            key={step.id}
            {...register(step.id, step.validation)}
            type={step.type}
            placeholder={step.placeholder}
            autoFocus
            className={`w-full border-b-2 bg-transparent px-0 py-3 text-lg text-gray-900 placeholder-gray-300 focus:outline-none transition
              ${errors[step.id] ? 'border-red-400' : 'border-gray-300 focus:border-brand-purple'}`}
          />
          {errors[step.id] && <p className="text-red-500 text-sm mt-2">{errors[step.id].message}</p>}
        </div>
      );
    }

    if (step.type === 'tel') {
      return (
        <div>
          <div className="flex items-end border-b-2 border-gray-300 focus-within:border-brand-purple transition pb-1">
            <span className="text-gray-400 text-lg pr-2 shrink-0">+91</span>
            <input
              key={step.id}
              {...register(step.id, step.validation)}
              type="tel"
              placeholder={step.placeholder}
              maxLength={10}
              autoFocus
              className={`flex-1 bg-transparent py-2 text-lg text-gray-900 placeholder-gray-300 focus:outline-none
                ${errors[step.id] ? 'placeholder-red-300' : ''}`}
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
              className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-sm font-medium flex items-center gap-3
                ${selected === option
                  ? 'border-brand-purple bg-brand-purple/5 text-brand-purple'
                  : 'border-gray-200 text-gray-700 hover:border-gray-300 active:bg-gray-50'
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
                className={`w-full text-left px-4 py-3.5 rounded-2xl border-2 transition-all text-sm font-medium flex items-center gap-3
                  ${checked
                    ? 'border-brand-purple bg-brand-purple/5 text-brand-purple'
                    : 'border-gray-200 text-gray-700 hover:border-gray-300 active:bg-gray-50'
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

  // ── Layout ───────────────────────────────────────────────────────────────────

  const totalSteps = steps.length + 1; // +1 for calendly
  const progress   = ((stepIdx + 1) / totalSteps) * 100;

  // ── Calendly: full-screen ────────────────────────────────────────────────────
  if (phase === 'calendly') {
    return (
      <>
        <div className="fixed inset-0 flex flex-col bg-brand-purple-light">
          <div className="flex-none bg-gradient-to-r from-brand-purple to-[#4a2d6f] px-4 pt-4 pb-3 flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-9 h-9 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors shrink-0"
              aria-label="Go back"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <div>
              <p className="font-bold text-white text-sm leading-tight">Pick a Time Slot</p>
              <p className="text-white/70 text-xs">30-min consultation · Dt. Sushant</p>
            </div>
          </div>

          {paymentError && (
            <div className="flex-none px-4 pt-3">
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm">{paymentError}</div>
            </div>
          )}

          <div className="flex-1 px-4 pb-4 pt-3 min-h-0 relative">
            {!calendlyReady && (
              <div className="absolute inset-0 mx-4 mb-4 mt-3 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center gap-4 z-10">
                <div className="w-12 h-12 border-4 border-brand-purple/20 border-t-brand-purple rounded-full animate-spin" />
                <div className="text-center">
                  <p className="font-semibold text-gray-800 text-sm">Loading your booking calendar...</p>
                  <p className="text-gray-400 text-xs mt-1">This usually takes a few seconds</p>
                </div>
              </div>
            )}
            <div className="h-full bg-white rounded-2xl shadow-md overflow-hidden">
              <div id="booking-calendly-embed" style={{ width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </>
    );
  }

  // ── Paying ───────────────────────────────────────────────────────────────────
  if (phase === 'paying') {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <Loader2 size={48} className="text-brand-purple animate-spin mx-auto mb-4" />
          <h2 className="font-semibold text-gray-900 text-lg mb-2">Setting up payment...</h2>
          <p className="text-gray-500 text-sm">You will be redirected to Razorpay in a moment.</p>
          {paymentError && (
            <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm max-w-sm">
              {paymentError}
            </div>
          )}
        </div>
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
      </div>
    );
  }

  // ── Form: full page ───────────────────────────────────────────────────────────
  const currentStep = steps[stepIdx];

  return (
    <>
      <div className="min-h-dvh bg-white flex flex-col">

        {/* Top bar: back + progress */}
        <div className="flex-none px-5 pt-5 pb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition shrink-0"
              aria-label="Back"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-brand-purple rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 shrink-0 w-10 text-right">
              {stepIdx + 1}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Question + field */}
        <div className="flex-1 px-5 pt-6 pb-4 max-w-lg w-full mx-auto flex flex-col">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 leading-snug mb-1">
              {currentStep.label}
            </h2>
            {(currentStep.optional || currentStep.subtitle) && (
              <p className="text-sm text-gray-400 mb-6">
                {currentStep.subtitle || 'Optional — you can skip this'}
              </p>
            )}
            {!currentStep.optional && !currentStep.subtitle && (
              <div className="mb-6" />
            )}

            {renderField()}
          </div>

          {/* Navigation */}
          <div className="flex-none pt-6 pb-2">
            {currentStep.type !== 'single' && (
              <button
                type="button"
                onClick={handleNext}
                className="w-full bg-brand-purple hover:bg-brand-purple/90 text-white font-bold py-4 rounded-2xl text-base transition-all hover:shadow-lg flex items-center justify-center gap-2"
              >
                {stepIdx < steps.length - 1 ? (
                  <>{currentStep.optional && !customFields[currentStep.id] ? 'Skip' : 'Continue'} <ArrowRight size={18} /></>
                ) : (
                  <>Pick a Slot <Calendar size={18} /></>
                )}
              </button>
            )}

            <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-gray-400">
              <Lock size={11} />
              <span>Your information is 100% confidential</span>
            </div>
          </div>
        </div>
      </div>

      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" />
    </>
  );
}

export default function BookingPage() {
  return (
    <Suspense>
      <BookingFlow />
    </Suspense>
  );
}
