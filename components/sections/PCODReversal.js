'use client';

import { CheckCircle2, Zap, Heart, ShieldCheck } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const phases = [
  {
    number: '01',
    title: 'Insulin & Blood Sugar Control',
    desc: 'We regulate your insulin resistance and stabilise blood sugar — the primary trigger behind PCOD.',
    iconBg: 'bg-brand-purple-light',
    iconText: 'text-brand-purple',
    Icon: Zap,
  },
  {
    number: '02',
    title: 'Metabolic & Gut Health',
    desc: 'We heal your metabolism and gut lining, reducing the chronic inflammation that drives hormonal imbalance.',
    iconBg: 'bg-brand-teal-light',
    iconText: 'text-brand-teal',
    Icon: Heart,
  },
  {
    number: '03',
    title: 'Medicine-Free Reversal',
    desc: 'As your body heals at the root, you gradually come off medications and your PCOD is reversed — not just managed.',
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-600',
    Icon: ShieldCheck,
  },
];

const included = [
  'BCA (Body Composition Analysis) on your first visit',
  'Detailed counselling to find the root cause of inflammation',
  'Personalised diet & lifestyle plan — not a generic chart',
  'In-clinic (Anand) or online consultation available',
];

export default function PCODReversal({ onBookNow }) {
  const headerRef = useScrollReveal();
  const leftRef   = useScrollReveal(100);
  const rightRef  = useScrollReveal(200);

  return (
    <section className="section-white py-20 px-4" id="pcod-reversal">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          className="text-center mb-14 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-brand-purple-light text-brand-purple rounded-full px-4 py-1 text-sm font-semibold mb-4">
            PCOD Reversal Program
          </span>
          <h2 className="section-heading mb-4">
            Pills Only Manage Symptoms —
            <br />
            <span className="text-brand-teal">Here&apos;s What Actually Reverses PCOD</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Metformin lowers sugar. Contraceptive pills regulate your cycle artificially. But the
            moment you stop, the problem returns. Hear directly from Dr. Sushant — and discover the
            3-phase program that reverses PCOD from the root in just 3 months.
          </p>
        </div>

        {/* ── Two-column: Video + Content ────────────────────────────────────── */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-14">

          {/* Left — Dr. Sushant photo */}
          <div
            ref={leftRef}
            className="opacity-0 translate-y-6 transition-all duration-700 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Main photo */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about/dr_portrait.jpg"
                  alt="Dt. Sushant Thakur — Pride Bharat Awards 2025"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-sm leading-tight">Dt. Sushant Thakur</p>
                  <p className="text-white/75 text-xs mt-0.5">Founder, The Diet Studio</p>
                </div>
              </div>

              {/* Award badge */}
              <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-beige-200 flex items-center gap-2.5 max-w-[200px]">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-brown-900 text-xs leading-tight">Pride Bharat Award</p>
                  <p className="text-amber-600 text-[10px] mt-0.5">Clinical Excellence 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Problem + Phases + CTA */}
          <div
            ref={rightRef}
            className="opacity-0 translate-y-6 transition-all duration-700 space-y-6"
          >
            {/* Problem callout */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
              <p className="text-red-700 font-semibold text-base mb-1">
                The Hard Truth About Conventional PCOD Treatment
              </p>
              <p className="text-red-600 text-sm leading-relaxed">
                Metformin controls blood sugar. Contraceptive pills regulate your cycle. But neither
                one addresses <strong>why</strong> you have PCOD. Once you stop these medicines, the
                symptoms come back — because the root cause was never treated.
              </p>
            </div>

            {/* 3-phase program */}
            <div>
              <p className="text-brown-700 font-semibold mb-3">
                Our Special 3-Phase PCOD Reversal Program:
              </p>
              <div className="space-y-3">
                {phases.map((phase, i) => (
                  <PhaseCard key={i} phase={phase} />
                ))}
              </div>
            </div>

            {/* Timeline badge */}
            <div className="bg-brand-purple text-white rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="text-5xl font-bold leading-none shrink-0">3</div>
              <div>
                <div className="font-bold text-lg leading-tight">Months to Reverse PCOD</div>
                <div className="text-white/70 text-sm mt-0.5">
                  BCA analysis + detailed counselling + personalised plan
                </div>
              </div>
            </div>

            {/* Included items */}
            <div className="space-y-2">
              {included.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-brown-700">
                  <CheckCircle2 size={16} className="text-brand-teal shrink-0 mt-0.5" />
                  {item}
                </div>
              ))}
            </div>

            <button onClick={onBookNow} className="btn-primary w-full sm:w-auto">
              Book PCOD Reversal Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({ phase }) {
  return (
    <div className="flex gap-4 bg-beige-50 rounded-xl p-4 border border-beige-200 hover:border-brand-teal hover:shadow-sm transition-all">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${phase.iconBg} ${phase.iconText}`}
      >
        <phase.Icon size={18} />
      </div>
      <div>
        <div className="text-xs font-bold text-brand-purple tracking-widest mb-0.5">
          PHASE {phase.number}
        </div>
        <div className="font-semibold text-brown-900 text-sm">{phase.title}</div>
        <div className="text-brown-600 text-xs leading-relaxed mt-0.5">{phase.desc}</div>
      </div>
    </div>
  );
}
