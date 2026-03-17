'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { Award, Users, BookOpen, Star, UserCircle } from 'lucide-react';

const credentials = [
  { Icon: BookOpen, text: 'M.Sc. Food & Nutrition (Details coming soon)' },
  { Icon: Award,    text: 'Certified Registered Dietitian (RD)' },
  { Icon: Users,    text: '500+ Successful Consultations' },
  { Icon: Star,     text: '5+ Years of Clinical Experience' },
];

export default function AboutExpert() {
  const leftRef  = useScrollReveal();
  const rightRef = useScrollReveal(150);

  return (
    <section className="section-tan py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Photo side */}
          <div ref={leftRef} className="opacity-0 translate-y-6 transition-all duration-700 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto shadow-2xl bg-gradient-to-br from-beige-200 to-orange-300/40">
              {/* Placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
                  <UserCircle size={64} className="text-orange-400" />
                </div>
                <p className="text-brown-600 font-medium text-sm">Expert photo coming soon</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute bottom-6 -right-4 bg-orange-500 text-white rounded-2xl p-4 shadow-xl max-w-[180px]">
              <p className="font-bold text-2xl">500+</p>
              <p className="text-sm text-orange-100">Lives transformed with personalized nutrition</p>
            </div>
          </div>

          {/* Content side */}
          <div ref={rightRef} className="opacity-0 translate-y-6 transition-all duration-700">
            <span className="inline-block bg-orange-100 text-orange-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
              Meet Your Dietitian
            </span>

            <p className="text-orange-600 font-semibold text-base mb-1">Dt. Sushant Thakur</p>
            <h2 className="section-heading mb-4">
              Your Personal Health Partner,{' '}
              <span className="text-orange-500">Not Just a Diet Chart</span>
            </h2>

            <p className="text-brown-700 leading-relaxed mb-5 font-light">
              Hi! I am Dt. Sushant Thakur, founder of Diet Studio. With over 5 years of experience
              in clinical nutrition and lifestyle management, I have helped hundreds of Indians across
              the country transform their health — without giving up their favourite foods or
              following impossible routines.
            </p>

            <p className="text-brown-700 leading-relaxed mb-8 font-light">
              My approach is simple: <strong className="font-semibold">understand you first, then build your plan</strong>.
              Whether you want to lose weight, manage diabetes, tackle PCOD, or just eat
              healthier — I create a plan that fits your real life.
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
