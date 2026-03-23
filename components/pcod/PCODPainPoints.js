'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AlertCircle } from 'lucide-react';

const painPoints = [
  {
    title: 'On Metformin for years, nothing has changed',
    desc: 'You take the medicine daily, yet your weight, periods, and hormone levels stay the same.',
  },
  {
    title: 'Pills regulate your cycle, until you stop them',
    desc: 'Contraceptive pills create artificial cycles. The moment you stop, everything goes back to how it was.',
  },
  {
    title: 'Told to "just lose weight" with no real guidance',
    desc: 'Doctors advise weight loss but give no plan, leaving you to guess with generic diets that don\'t work for PCOD.',
  },
  {
    title: 'Irregular periods, hair fall, weight gain still present',
    desc: 'Despite treatment, your core symptoms: missed periods, thinning hair, and unexplained weight gain, haven\'t gone away.',
  },
  {
    title: 'Constant fatigue and low energy despite treatment',
    desc: 'You sleep enough, eat reasonably, yet feel exhausted all day. Insulin resistance silently drains your energy.',
  },
  {
    title: 'No one has explained why you have PCOD',
    desc: 'You were diagnosed, given medicines, and sent home. Nobody explained the actual root cause behind your condition.',
  },
];

export default function PCODPainPoints({ onBookNow }) {
  const headerRef = useScrollReveal();
  const bridgeRef = useScrollReveal(200);

  return (
    <section className="bg-brand-purple-light py-20 px-4">
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
            If You Have PCOD,{' '}
            <span className="text-brand-purple">Does This Sound Like You?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto font-light">
            These are the everyday realities most PCOD patients live with, because the real problem
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
          className="opacity-0 translate-y-6 transition-all duration-700 bg-brand-purple rounded-2xl p-8 text-center text-white max-w-3xl mx-auto"
        >
          <AlertCircle size={28} className="mx-auto mb-3 text-white/80" />
          <p className="font-bold text-xl md:text-2xl leading-snug">
            The problem isn&apos;t your body.
          </p>
          <p className="text-white/80 text-base md:text-lg mt-2 font-light">
            It&apos;s that no one has treated the root cause: insulin resistance, gut inflammation,
            and metabolic dysfunction that drive every PCOD symptom.
          </p>
          <button
            onClick={onBookNow}
            className="mt-6 bg-white text-brand-purple font-bold px-8 py-3 rounded-full text-sm transition-all hover:bg-brand-purple-light hover:shadow-lg"
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
      className="opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-2xl p-5 border border-gray-200 hover:border-brand-purple/30 hover:shadow-md"
    >
      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
        <AlertCircle size={16} className="text-red-500" />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5">{point.title}</h3>
      <p className="text-gray-600 text-xs leading-relaxed font-light">{point.desc}</p>
    </div>
  );
}
