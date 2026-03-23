'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, BookOpen, Activity } from 'lucide-react';

const credentials = [
  { Icon: BookOpen,   text: 'M.Sc. Food & Nutrition' },
  { Icon: Award,      text: 'Certified Registered Dietitian (RD)' },
  { Icon: Activity,   text: 'Specialised in PCOD / Hormonal & Metabolic Disorders' },
];

export default function AboutExpert() {
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal(150);

  return (
    <section className="section-tan py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* ── Photo ─────────────────────────────────────────────── */}
          <div ref={leftRef} className="opacity-0 translate-y-6 transition-all duration-700">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about/dr_award.jpg"
                alt="Dt. Sushant Thakur — Pride Bharat Award 2025"
                className="w-full h-full object-cover object-top"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

              {/* Award badge inside photo */}
              <div className="absolute bottom-5 left-4 right-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center shrink-0 shadow-lg">
                  <Award size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">Pride Bharat Award 2025</p>
                  <p className="text-white/80 text-xs mt-0.5">Clinical Excellence in Dietary Management</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Content ───────────────────────────────────────────── */}
          <div ref={rightRef} className="opacity-0 translate-y-6 transition-all duration-700">

            <span className="inline-block bg-orange-100 text-orange-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
              Meet Your Dietitian
            </span>

            <p className="text-orange-600 font-semibold text-base mb-1">Dt. Sushant Thakur</p>
            <h2 className="section-heading mb-6">
              A Dietitian Who Understands{' '}
              <span className="text-orange-500">Hormones, Not Just Calories</span>
            </h2>

            <p className="text-brown-700 leading-relaxed mb-5 font-light">
              Hi! I am Dt. Sushant Thakur, founder of Diet Studio. Over 5+ years I have worked with
              hundreds of women across India dealing with PCOD, insulin resistance, and hormonal
              imbalances. I understand how frustrating it is to follow medical advice and still see
              no change.
            </p>

            <p className="text-brown-700 leading-relaxed mb-8 font-light">
              My approach focuses on the root cause: correcting insulin sensitivity, healing gut
              health, and reducing inflammation — so your body can regulate its own hormones again,
              without depending on medicines indefinitely.
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-3 text-brown-800">
                  <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 shrink-0">
                    <cred.Icon size={18} />
                  </div>
                  <span className="text-sm font-medium">{cred.text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-orange-400 pl-5 py-2 text-brown-700 bg-beige-50 rounded-r-xl italic font-light">
              "I don&apos;t believe in one-size-fits-all diets. Your body is unique, your food is
              unique, and your plan should be too."
            </blockquote>
          </div>

        </div>
      </div>
    </section>
  );
}
