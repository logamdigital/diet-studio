'use client';

import { CheckCircle2, Clock, Zap, Lock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const included = [
  '30-minute 1-on-1 consultation call (phone or video)',
  'Complete health & lifestyle assessment',
  'Root cause analysis of your current struggle',
  'Custom diet direction built for your body & goals',
  'Roadmap for your full personalized diet plan',
  'Indian food-compatible recommendations',
  'Open Q&A — ask anything about your nutrition',
  'Priority slot for your follow-up diet plan',
];

export default function Offer({ onBookNow }) {
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal(150);

  return (
    <section className="bg-brand-purple py-20 px-4" id="offer">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-white/15 text-white rounded-full px-4 py-1 text-sm font-semibold mb-4">
            What You Get
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Everything Included in Your{' '}
            <span className="text-brand-teal">₹500 Consultation</span>
          </h2>
          <p className="text-white/75 text-lg max-w-xl mx-auto font-light">
            No hidden fees. No upsells inside the call. Just expert nutrition guidance built around you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Included list */}
          <div ref={leftRef} className="opacity-0 translate-y-6 transition-all duration-700 bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Zap size={20} className="text-brand-teal" />
              Your Consultation Includes:
            </h3>
            <ul className="space-y-4">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-brand-teal mt-0.5 shrink-0" />
                  <span className="text-white/85 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing card */}
          <div ref={rightRef} className="opacity-0 translate-y-6 transition-all duration-700">
            <div className="bg-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="inline-block bg-brand-purple-light text-brand-purple rounded-full px-3 py-1 text-xs font-bold mb-4 uppercase tracking-widest">
                  Limited Time Offer
                </div>

                <div className="mb-6">
                  <p className="text-gray-500 text-sm mb-1">One-time consultation booking fee</p>
                  <div className="flex items-end gap-2">
                    <span className="font-heading text-5xl font-bold text-brand-purple leading-none">₹500</span>
                    <span className="text-gray-400 line-through text-lg mb-1">₹1,000</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Lock size={15} className="text-brand-teal shrink-0" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock size={15} className="text-brand-teal shrink-0" />
                    <span>Choose your slot after payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle2 size={15} className="text-brand-teal shrink-0" />
                    <span>Diet plan pricing discussed in consultation</span>
                  </div>
                </div>

                <button
                  onClick={onBookNow}
                  className="w-full bg-brand-purple text-white hover:bg-brand-purple/90 font-bold py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book My Consultation · ₹500
                </button>

                <p className="text-gray-400 text-xs text-center mt-4">
                  Only 8 slots available this week · Offer valid for limited time
                </p>
              </div>
            </div>

            {/* Value comparison */}
            <div className="mt-6 bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-white/85 text-sm font-semibold mb-3">Compare the cost:</p>
              <div className="space-y-2 text-sm">
                {[
                  ['Gym membership (monthly)', '₹3,000 – ₹5,000'],
                  ['Random supplements',       '₹2,000 – ₹8,000'],
                  ['Private doctor visit',     '₹500 – ₹2,000'],
                  ['Diet Studio consultation', '₹500'],
                ].map(([label, cost], i) => (
                  <div key={i} className={`flex justify-between ${i === 3 ? 'text-brand-teal font-bold' : 'text-white/60'}`}>
                    <span>{label}</span>
                    <span>{cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
