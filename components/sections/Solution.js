'use client';

import { Scale, Dumbbell, Droplets, Leaf, Activity, Heart, Baby, Sparkles, Search, UtensilsCrossed, Smartphone, FlaskConical } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const conditions = [
  { Icon: Scale,          label: 'Weight Loss' },
  { Icon: Dumbbell,       label: 'Weight Gain' },
  { Icon: Droplets,       label: 'Diabetes (T1 & T2)' },
  { Icon: Leaf,           label: 'PCOD / PCOS' },
  { Icon: Activity,       label: 'Thyroid' },
  { Icon: Heart,          label: 'Heart Health' },
  { Icon: Baby,           label: 'Post-Pregnancy' },
  { Icon: Sparkles,       label: 'General Wellness' },
];

const pillars = [
  {
    step: '01',
    Icon: Search,
    title: 'We Understand YOU First',
    desc: 'Your body type, medical history, blood reports, food preferences, lifestyle, and goals — all assessed before any advice.',
  },
  {
    step: '02',
    Icon: UtensilsCrossed,
    title: 'Indian Food, Always',
    desc: 'Dal, roti, rice, sabzi — we build your plan around food you actually eat and enjoy. No bland boiled meals.',
  },
  {
    step: '03',
    Icon: Smartphone,
    title: 'Built for Real Life',
    desc: 'Busy schedule? Eating out? Family food? Our plans fit into your actual life, not the other way around.',
  },
  {
    step: '04',
    Icon: FlaskConical,
    title: 'Science-Backed Results',
    desc: 'Every recommendation is based on certified nutritional science — not trends, fads, or YouTube advice.',
  },
];

export default function Solution({ onBookNow }) {
  const headerRef = useScrollReveal();

  return (
    <section className="section-white py-20 px-4" id="solution">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
            The Diet Studio Difference
          </span>
          <h2 className="section-heading mb-4">
            Personalized Diet Plans That{' '}
            <span className="text-orange-500">Actually Fit Your Life</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            We don&apos;t give you a generic chart. We build a plan around your body, your food,
            and your goals — because no two people are the same.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p, i) => (
            <PillarCard key={i} pillar={p} delay={i * 120} />
          ))}
        </div>

        {/* Conditions */}
        <div className="bg-gradient-to-br from-beige-50 to-orange-400/10 rounded-3xl p-8 md:p-12">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-brown-900 text-center mb-8">
            We Help With All of These Conditions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {conditions.map((c, i) => (
              <ConditionBadge key={i} condition={c} delay={i * 80} />
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-brown-600 mb-5 text-sm">
              Not sure if we can help with your specific condition? Ask during the consultation.
            </p>
            <button onClick={onBookNow} className="btn-primary">
              Get 1:1 Consultation with Dr. Sushant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PillarCard({ pillar, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div ref={ref} className="opacity-0 translate-y-6 transition-all duration-700">
      <div className="bg-beige-50 rounded-2xl p-6 h-full hover:shadow-md transition-shadow border border-beige-200">
        <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
          <pillar.Icon size={22} className="text-orange-600" />
        </div>
        <div className="text-orange-500 font-bold text-xs mb-1 tracking-widest">
          STEP {pillar.step}
        </div>
        <h3 className="font-semibold text-brown-900 text-base mb-2">{pillar.title}</h3>
        <p className="text-brown-600 text-sm leading-relaxed">{pillar.desc}</p>
      </div>
    </div>
  );
}

function ConditionBadge({ condition, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-4 transition-all duration-600 flex items-center gap-3 bg-white rounded-xl px-4 py-3 shadow-sm border border-beige-200 hover:border-orange-300 hover:shadow-md"
    >
      <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center shrink-0">
        <condition.Icon size={16} className="text-orange-500" />
      </div>
      <span className="font-medium text-brown-800 text-sm">{condition.label}</span>
    </div>
  );
}
