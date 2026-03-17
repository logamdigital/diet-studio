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
    <section className="relative bg-gradient-to-b from-beige-50 via-beige-100 to-beige-50 pt-28 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-400/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-beige-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-300/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="max-w-4xl mx-auto px-4 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Users size={14} />
          <span>500+ Happy Clients Across India</span>
        </div>

        {/* Headline */}
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-brown-900 leading-tight mb-6">
          Tired of Diets That{' '}
          <span className="text-orange-500 italic">Never Work</span>{' '}
          for You?
        </h1>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl text-brown-700 leading-relaxed mb-8 max-w-2xl mx-auto font-light">
          Stop following random diet charts. Get a{' '}
          <strong className="font-semibold">100% personalized plan</strong> built for your body,
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
            <li key={item} className="flex items-start gap-2.5 text-brown-800">
              <CheckCircle2 size={18} className="text-orange-500 mt-0.5 shrink-0" />
              <span className="text-sm md:text-base">{item}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-5">
          <button
            onClick={onBookNow}
            className="btn-primary text-lg flex items-center gap-2"
          >
            Book My Consultation
            <span className="bg-white/20 rounded-full px-2 py-0.5 text-sm font-bold">₹200</span>
          </button>
          <div className="text-sm text-brown-600">
            <span className="line-through text-brown-400 mr-1">₹999</span>
            <span className="text-orange-600 font-semibold">Limited-time introductory price</span>
          </div>
        </div>

        {/* Micro trust */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm text-brown-600 mb-14">
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
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-beige-200 to-orange-400/30 aspect-video flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 shimmer opacity-60" />

            {/* Play button */}
            <div className="relative z-10 flex flex-col items-center gap-4">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 group-hover:bg-orange-600">
                <Play size={32} className="text-white ml-1" fill="white" />
              </div>
              <p className="text-brown-800 font-semibold text-sm bg-white/80 backdrop-blur-sm rounded-full px-5 py-2">
                Watch: How Diet Studio Transforms Lives
              </p>
            </div>

            <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold rounded-full px-3 py-1 tracking-wide">
              2 MIN WATCH
            </div>
          </div>

          {/* Floating result card */}
          <div className="absolute -bottom-5 -left-4 md:-left-8 bg-white rounded-2xl shadow-xl p-3.5 flex items-center gap-3 border border-beige-200">
            <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
              <CheckCircle2 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-brown-900 text-sm">Anjali lost 9kg</p>
              <p className="text-xs text-brown-500">in 3 months — eating dal-roti daily</p>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -top-4 -right-4 md:-right-8 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 border border-beige-200">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={13} className="text-orange-400" fill="#E07B39" />
              ))}
            </div>
            <span className="font-bold text-brown-900 text-sm">4.9/5</span>
          </div>
        </div>

      </div>
    </section>
  );
}
