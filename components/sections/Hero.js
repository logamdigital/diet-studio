'use client';

import { useEffect, useRef } from 'react';
import { Play, Star, CheckCircle2, Users, BadgeCheck } from 'lucide-react';

export default function Hero({ onBookNow }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    setTimeout(() => {
      el.style.transition = 'all 0.8s ease-out';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-brand-purple-light via-white to-white pt-28 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-brand-purple-light text-brand-purple rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Users size={14} />
          <span>500+ Happy Clients Across India</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Tired of Diets That{' '}
          <span className="text-brand-purple italic">Never Work</span>{' '}
          for You?
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
          Stop following random diet charts. Get a{' '}
          <strong className="font-semibold text-gray-900">100% personalized plan</strong> built for your body,
          your Indian food, and your health goals — by a certified dietitian.
        </p>

        {/* Checklist — centered two-column */}
        <ul className="inline-grid sm:grid-cols-2 gap-x-10 gap-y-3 text-left mb-10">
          {[
            'Weight loss, gain, maintenance & medical diets',
            'Indian food — dal, roti, sabzi — no restrictions',
            'Plans for diabetes, PCOD, thyroid & more',
            'Expert consultation from home — phone or video',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-gray-700">
              <CheckCircle2 size={18} className="text-brand-teal mt-0.5 shrink-0" />
              <span className="text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-col items-center justify-center gap-2 mb-5">
          <button
            onClick={onBookNow}
            className="btn-primary text-lg flex items-center gap-2"
          >
            Get 1:1 Consultation · ₹500
          </button>
          <p className="text-gray-500 text-sm">One-time consultation fee · 100% personalized plan</p>
        </div>

        {/* Micro trust */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-gray-500 mb-14">
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={15} className="text-green-500" /> Secured by Razorpay
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={15} className="text-green-500" /> Phone / Video Call
          </span>
          <span className="flex items-center gap-1.5">
            <BadgeCheck size={15} className="text-green-500" /> Indian Diet Friendly
          </span>
        </div>

        {/* VSL Video — full width below content */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-brand-purple-light to-brand-purple/30 aspect-video flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 shimmer opacity-60" />

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-brand-purple rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-brand-purple/90">
                <Play size={32} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-gray-800 font-semibold text-sm bg-white/80 backdrop-blur-sm rounded-full px-5 py-2">
                Watch: How Diet Studio Transforms Lives
              </p>
            </div>

            <div className="absolute top-4 left-4 bg-brand-purple text-white text-xs font-bold rounded-full px-3 py-1 tracking-wide">
              2 MIN WATCH
            </div>
          </div>

          {/* Floating result card */}
          <div className="absolute -bottom-5 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-brand-purple/10">
            <div className="w-9 h-9 bg-brand-teal-light rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} className="text-brand-teal" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Anjali lost 9kg</p>
              <p className="text-xs text-gray-500">in 3 months — eating dal-roti daily</p>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-brand-purple/10">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={13} className="text-brand-purple" fill="#5E3B87" />
              ))}
            </div>
            <span className="font-bold text-gray-900 text-sm">4.9/5</span>
          </div>
        </div>

      </div>
    </section>
  );
}
