'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { AlertCircle } from 'lucide-react';

const painPoints = [
  {
    title: 'On strict diets for years, nothing has changed',
    desc: 'You drastically cut down your food intake daily, yet your weight, body fat percentage, and sluggish energy levels stay exactly the same.',
  },
  {
    title: 'Fad diets work, until you stop them',
    desc: 'Extreme restriction and keto plans create temporary, unrealistic results. The moment you take a single normal meal, everything goes back to how it was.',
  },
  {
    title: 'Told to "just eat less" with no real guidance',
    desc: 'Gym trainers and internet advisors tell you to cut calories but give no sustainable plan, leaving you to guess with generic PDFs that ignore your lifestyle.',
  },
  {
    title: 'Stubborn fat, constant cravings, and plateaus are still present',
    desc: 'Despite starving yourself, your core struggles — stubborn belly fat, intense 4 PM sweet cravings, and painful fat-loss plateaus — haven\'t gone away.',
  },
  {
    title: 'Constant fatigue and low energy despite "eating clean"',
    desc: 'You try to eat right, yet you feel completely exhausted and weak all day. Cellular sluggishness and hidden metabolic resistance are silently draining your energy.',
  },
  {
    title: 'No one has explained why your body holds onto fat',
    desc: 'You were given a calorie limit and sent home. Nobody ever explained the actual biological root cause — like high cortisol, poor gut health, or leptin issues — behind your stubborn weight.',
  },
];

export default function WeightLossPainPoints({ onBookNow }) {
  const headerRef = useScrollReveal();
  const bridgeRef = useScrollReveal(200);

  return (
    <section className="bg-beige-50 py-20 px-4">
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
            If You Struggle to Lose Weight,{' '}
            <span className="text-orange-500">Does This Sound Like You?</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-xl mx-auto font-light">
            These are the everyday realities most people on a weight loss journey live with, because
            the real problem has never been addressed.
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
          className="opacity-0 translate-y-6 transition-all duration-700 bg-orange-500 rounded-2xl p-8 text-center text-white max-w-3xl mx-auto"
        >
          <AlertCircle size={28} className="mx-auto mb-3 text-white/80" />
          <p className="font-bold text-xl md:text-2xl leading-snug">
            The problem isn&apos;t your body.
          </p>
          <p className="text-white/80 text-base md:text-lg mt-2 font-light">
            It&apos;s that no one has treated the root cause: insulin insensitivity, chronic gut
            inflammation, and metabolic adaptations that drive your body to store fat instead of
            burning it.
          </p>
          <button
            onClick={onBookNow}
            className="mt-6 bg-white text-orange-500 font-bold px-8 py-3 rounded-full text-sm transition-all hover:bg-beige-100 hover:shadow-lg"
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
      className="opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-2xl p-5 border border-gray-200 hover:border-orange-400/30 hover:shadow-md"
    >
      <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mb-3">
        <AlertCircle size={16} className="text-red-500" />
      </div>
      <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1.5">{point.title}</h3>
      <p className="text-gray-600 text-xs leading-relaxed font-light">{point.desc}</p>
    </div>
  );
}
