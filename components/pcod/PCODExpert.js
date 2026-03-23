'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, Users, BookOpen, Star, Activity } from 'lucide-react';

const credentials = [
  { Icon: BookOpen,  text: 'M.Sc. Food & Nutrition' },
  { Icon: Award,     text: 'Certified Registered Dietitian (RD)' },
  { Icon: Activity,  text: 'Specialised in PCOD / Hormonal & Metabolic Disorders' },
  { Icon: Users,     text: '500+ Clients Successfully Treated' },
  { Icon: Star,      text: '5+ Years of Clinical Experience' },
];

export default function PCODExpert() {
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal(150);

  return (
    <section className="bg-brand-teal-light py-20 px-4" id="expert">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Photo side */}
          <div ref={leftRef} className="opacity-0 translate-y-6 transition-all duration-700 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl">
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

            {/* Award floating badge */}
            <div className="absolute -bottom-5 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-beige-200 flex items-center gap-2.5 max-w-[200px]">
              <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                <Award size={18} className="text-amber-600" />
              </div>
              <div>
                <p className="font-bold text-brown-900 text-xs leading-tight">Pride Bharat Award</p>
                <p className="text-amber-600 text-[10px] mt-0.5">Clinical Excellence 2025</p>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div ref={rightRef} className="opacity-0 translate-y-6 transition-all duration-700">
            <span className="inline-block bg-brand-purple-light text-brand-purple rounded-full px-4 py-1 text-sm font-semibold mb-4">
              Meet Your PCOD Specialist
            </span>

            <p className="text-brand-purple font-semibold text-base mb-1">Dt. Sushant Thakur</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              A Dietitian Who Understands{' '}
              <span className="text-brand-teal">Hormones, Not Just Calories</span>
            </h2>

            <p className="text-gray-700 leading-relaxed mb-5 font-light">
              Hi! I am Dt. Sushant Thakur, founder of Diet Studio. Over 5+ years I have worked with
              hundreds of women across India dealing with PCOD, insulin resistance, and hormonal
              imbalances. I understand how frustrating it is to follow medical advice and still see no
              change.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8 font-light">
              My approach focuses on the <strong className="font-semibold">root cause</strong>:
              correcting insulin sensitivity, healing gut health, and reducing inflammation, so your
              body can regulate its own hormones again, without depending on medicines indefinitely.
            </p>

            {/* Credentials */}
            <div className="space-y-3 mb-8">
              {credentials.map((cred, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-800">
                  <div className="w-9 h-9 bg-brand-purple-light rounded-lg flex items-center justify-center text-brand-purple shrink-0">
                    <cred.Icon size={18} />
                  </div>
                  <span className="text-sm font-medium">{cred.text}</span>
                </div>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-brand-purple pl-5 py-2 text-gray-700 bg-brand-purple-light/40 rounded-r-xl italic font-light">
              &ldquo;PCOD is not a life sentence. When we fix insulin resistance and gut health at the
              root, your hormones regulate themselves naturally.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
