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
    <section className="bg-brown-900 py-20 px-4" id="offer">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-orange-500/20 text-orange-300 rounded-full px-4 py-1 text-sm font-semibold mb-4">
            What You Get
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Everything Included in Your{' '}
            <span className="text-orange-400">₹200 Consultation</span>
          </h2>
          <p className="text-beige-200 text-lg max-w-xl mx-auto font-light">
            No hidden fees. No upsells inside the call. Just expert nutrition guidance built around you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Included list */}
          <div ref={leftRef} className="opacity-0 translate-y-6 transition-all duration-700 bg-white/5 rounded-3xl p-8 border border-white/10">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
              <Zap size={20} className="text-orange-400" />
              Your Consultation Includes:
            </h3>
            <ul className="space-y-4">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-400 mt-0.5 shrink-0" />
                  <span className="text-beige-100 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing card */}
          <div ref={rightRef} className="opacity-0 translate-y-6 transition-all duration-700">
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="inline-block bg-white/20 text-white rounded-full px-3 py-1 text-xs font-bold mb-4 uppercase tracking-widest">
                  Limited Time Offer
                </div>

                <div className="mb-6">
                  <div className="flex items-end gap-3 mb-1">
                    <span className="text-6xl font-bold text-white font-heading">₹200</span>
                    <div className="pb-2">
                      <p className="text-orange-200 line-through text-xl">₹999</p>
                      <p className="text-orange-100 text-xs">80% off today</p>
                    </div>
                  </div>
                  <p className="text-orange-100 text-sm">One-time consultation booking fee</p>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-2 text-orange-100 text-sm">
                    <Lock size={15} className="text-white shrink-0" />
                    <span>Secure payment via Razorpay</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-100 text-sm">
                    <Clock size={15} className="text-white shrink-0" />
                    <span>Choose your slot after payment</span>
                  </div>
                  <div className="flex items-center gap-2 text-orange-100 text-sm">
                    <CheckCircle2 size={15} className="text-white shrink-0" />
                    <span>Diet plan pricing discussed in consultation</span>
                  </div>
                </div>

                <button
                  onClick={onBookNow}
                  className="w-full bg-white text-orange-600 hover:bg-beige-50 font-bold py-4 rounded-xl text-lg transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  Book My Consultation Now
                </button>

                <p className="text-orange-200 text-xs text-center mt-4">
                  Only 8 slots available this week · Offer valid for limited time
                </p>
              </div>
            </div>

            {/* Value comparison */}
            <div className="mt-6 bg-white/5 rounded-2xl p-5 border border-white/10">
              <p className="text-beige-200 text-sm font-semibold mb-3">Compare the cost:</p>
              <div className="space-y-2 text-sm">
                {[
                  ['Gym membership (monthly)', '₹3,000 – ₹5,000'],
                  ['Random supplements',       '₹2,000 – ₹8,000'],
                  ['Private doctor visit',     '₹500 – ₹2,000'],
                  ['Diet Studio consultation', '₹200 only'],
                ].map(([label, cost], i) => (
                  <div key={i} className={`flex justify-between ${i === 3 ? 'text-orange-300 font-bold' : 'text-beige-300'}`}>
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
