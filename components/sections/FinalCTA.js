'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight, Clock, Lock, Shield } from 'lucide-react';

export default function FinalCTA({ onBookNow }) {
  const ref = useScrollReveal();

  return (
    <section className="section-tan py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className="opacity-0 translate-y-6 transition-all duration-700 bg-gradient-to-br from-brown-900 via-brown-800 to-orange-700 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 text-orange-300 border border-orange-500/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Clock size={14} />
              <span>Limited Slots Available This Week</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Your Health Journey Starts with{' '}
              <span className="text-orange-400">One Decision</span>
            </h2>

            <p className="text-beige-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4 font-light">
              Stop spending another month guessing what to eat or following diets that were not
              made for your body.
            </p>

            <p className="text-beige-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Get expert eyes on your health and a clear, personalized path forward.
            </p>

            {/* CTA */}
            <button
              onClick={onBookNow}
              className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-10 py-5 rounded-full text-xl transition-all duration-300 shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1 inline-flex items-center gap-3 group"
            >
              Get 1:1 Consultation with Dr. Sushant
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Trust row */}
            <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-beige-300">
              <span className="flex items-center gap-1.5">
                <Lock size={14} className="text-orange-400" /> Secure payment
              </span>
              <span className="flex items-center gap-1.5">
                <Shield size={14} className="text-orange-400" /> No hidden charges
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-orange-400" /> Choose your slot
              </span>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-10 pt-8 border-t border-white/10">
              {[
                ['500+', 'Clients Helped'],
                ['4.9 Stars', 'Average Rating'],
                ['30 Min', 'Expert Session'],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-orange-400 font-bold text-2xl font-heading">{val}</p>
                  <p className="text-beige-300 text-xs">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
