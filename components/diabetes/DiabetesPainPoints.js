'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AlertCircle } from 'lucide-react';

const painPoints = [
  {
    title: 'On Metformin for years, your HbA1c is still above target',
    desc: 'You take the medicine daily, yet your fasting blood sugar stays above 130 and your HbA1c never reaches a healthy range.',
  },
  {
    title: 'Scared of kidneys, heart, and nerve damage',
    desc: 'Long-term diabetes complications are real — kidney failure, heart disease, neuropathy. The fear is valid, but conventional management doesn\'t eliminate the risk.',
  },
  {
    title: 'Spending ₹1,000–₹5,000+ every month on medicines and doctor visits',
    desc: 'The bills pile up year after year with no end in sight. Managing diabetes has become a lifelong financial drain with no cure offered.',
  },
  {
    title: 'Home remedies and WhatsApp tips haven\'t worked',
    desc: 'You\'ve tried bitter gourd juice, fenugreek seeds, karela powder — and your fasting blood sugar still hasn\'t dropped below 130 mg/dL.',
  },
  {
    title: 'Daily symptoms that drain your quality of life',
    desc: 'Frequent urination, extreme thirst, tingling in hands and feet, blurred vision, and constant fatigue — these are your everyday reality.',
  },
  {
    title: 'No one has explained how to reverse it through food',
    desc: 'You were told to avoid sugar and exercise more. No structured plan. No root cause explanation. Just generic advice that doesn\'t move the needle.',
  },
];

export default function DiabetesPainPoints({ onBookNow }) {
  const headerRef = useScrollReveal();
  const bridgeRef = useScrollReveal(200);

  return (
    <section className="bg-brand-teal-light py-20 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-red-100 text-red-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Does This Sound Like You?
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            If You Have Diabetes,{' '}
            <span className="text-brand-teal">Does This Sound Like You?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto font-light">
            These are the everyday realities most diabetics live with, because the real problem
            has never been addressed.
          </p>
        </div>

        {/* Pain cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {painPoints.map((point, i) => (
            <PainCard key={i} point={point} delay={i * 80} />
          ))}
        </div>

        {/* Bridge callout */}
        <div
          ref={bridgeRef}
          className="opacity-0 translate-y-6 transition-all duration-700 bg-brand-teal rounded-2xl p-8 text-center text-white max-w-3xl mx-auto"
        >
          <AlertCircle size={28} className="mx-auto mb-3 text-white/80" />
          <p className="font-bold text-xl md:text-2xl leading-snug">
            The problem isn&apos;t your willpower.
          </p>
          <p className="text-white/80 text-base md:text-lg mt-2 font-light">
            It&apos;s that no one has treated the root cause: insulin resistance, gut inflammation,
            and metabolic dysfunction that drive every diabetic complication.
          </p>
          <button
            onClick={onBookNow}
            className="mt-6 bg-white text-brand-teal font-bold px-8 py-3 rounded-full text-sm transition-all hover:bg-brand-teal-light hover:shadow-lg"
          >
            See How We Fix the Root Cause
          </button>
        </div>

      </div>
    </section>
  );
}

function PainCard({ point, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-2xl p-5 border border-gray-200 hover:border-brand-teal/30 hover:shadow-md"
    >
      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
        <AlertCircle size={16} className="text-red-500" />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5">{point.title}</h3>
      <p className="text-gray-600 text-xs leading-relaxed font-light">{point.desc}</p>
    </div>
  );
}
