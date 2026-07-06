'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { BookOpen, CalendarDays, UtensilsCrossed, CheckCircle2, Leaf, Drumstick, Stethoscope } from 'lucide-react';

const includes = [
  {
    Icon: Stethoscope,
    iconBg: 'bg-brand-teal-light',
    iconText: 'text-brand-teal',
    title: '1:1 Consultation with Dt. Sushant',
    desc: 'A personal one-on-one consultation with Dt. Sushant to understand your body, find the root cause of your PCOD, and build a plan made just for you.',
    tag: 'Personal Guidance',
  },
  {
    Icon: BookOpen,
    iconBg: 'bg-brand-purple-light',
    iconText: 'text-brand-purple',
    title: 'PCOD Reversal E-Book',
    desc: 'A complete guide covering what PCOD really is, why medicines fall short, and the exact lifestyle changes that reverse it at the root. Yours to keep, forever.',
    tag: 'Digital PDF',
  },
  {
    Icon: CalendarDays,
    iconBg: 'bg-brand-teal-light',
    iconText: 'text-brand-teal',
    title: '7-Week Diet Charts',
    desc: 'Structured, week-by-week meal plans designed for PCOD reversal — available for both Vegetarian and Non-Vegetarian eaters, so you follow a plan that fits your lifestyle.',
    tag: 'Veg & Non-Veg',
    badges: [
      { Icon: Leaf, label: 'Vegetarian' },
      { Icon: Drumstick, label: 'Non-Vegetarian' },
    ],
  },
  {
    Icon: UtensilsCrossed,
    iconBg: 'bg-brand-purple-light',
    iconText: 'text-brand-purple',
    title: 'Healthy Recipes',
    desc: 'Simple, tasty, PCOD-friendly recipes so you never run out of ideas. Easy-to-cook meals that keep your hormones balanced without feeling like a diet.',
    tag: 'Easy to cook',
  },
];

export default function PCODIncludes({ onBookNow }) {
  const headerRef = useScrollReveal();
  const cardsRef  = useScrollReveal(150);
  const ctaRef    = useScrollReveal(200);

  return (
    <section className="bg-brand-grey-light py-20 px-4" id="whats-included">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-brand-teal-light text-brand-teal rounded-full px-4 py-1 text-sm font-semibold mb-4">
            What You Get
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Everything Included in Your{' '}
            <span className="text-brand-purple">PCOD Program</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto font-light">
            When you join, you get a complete toolkit to reverse PCOD — not just a consultation.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={cardsRef}
          className="opacity-0 translate-y-6 transition-all duration-700 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {includes.map((item, i) => (
            <IncludeCard key={i} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="opacity-0 translate-y-6 transition-all duration-700 text-center">
          <button
            onClick={onBookNow}
            className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Get Started · ₹500
          </button>
        </div>

      </div>
    </section>
  );
}

function IncludeCard({ item }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-teal hover:shadow-md transition-all flex flex-col">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.iconBg} ${item.iconText}`}>
        <item.Icon size={24} />
      </div>
      <div className="text-xs font-bold text-brand-teal tracking-widest mb-2 uppercase">
        {item.tag}
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{item.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-light mb-4">{item.desc}</p>

      {item.badges && (
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {item.badges.map((badge, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 bg-brand-teal-light text-brand-teal text-xs font-semibold rounded-full px-3 py-1.5"
            >
              <badge.Icon size={14} />
              {badge.label}
            </span>
          ))}
        </div>
      )}

      {!item.badges && (
        <div className="flex items-center gap-2 text-brand-teal text-xs font-semibold mt-auto pt-2">
          <CheckCircle2 size={14} />
          Included in your program
        </div>
      )}
    </div>
  );
}
