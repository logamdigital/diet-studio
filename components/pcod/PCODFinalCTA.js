'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { ArrowRight, CheckCircle2, Wifi, Activity } from 'lucide-react';

const trustPoints = [
  { Icon: Activity,     text: 'BCA Analysis Included' },
  { Icon: CheckCircle2, text: 'Rs.200 for Initial Consultation Only' },
  { Icon: Wifi,         text: 'Online Available' },
];

export default function PCODFinalCTA({ onBookNow }) {
  const ref = useScrollReveal();

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div
          ref={ref}
          className="opacity-0 translate-y-6 transition-all duration-700 bg-gradient-to-br from-brand-purple via-[#4a2d6f] to-[#3a1f5c] rounded-3xl p-10 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-brand-teal rounded-full animate-pulse" />
              <span>Limited Consultation Slots Available</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Start Reversing PCOD Today
            </h2>

            <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Don&apos;t spend another year managing symptoms. Book your PCOD Reversal Consultation
              and get a personalised plan backed by BCA analysis to fix the root cause.
            </p>

            {/* CTA Button */}
            <button
              onClick={onBookNow}
              className="bg-white text-brand-purple hover:bg-brand-purple-light font-bold px-10 py-5 rounded-full text-lg transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1 inline-flex items-center gap-3 group"
            >
              Book PCOD Reversal Consultation — Rs.200
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Micro trust row */}
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/70">
              {trustPoints.map(({ Icon, text }) => (
                <span key={text} className="flex items-center gap-1.5">
                  <Icon size={14} className="text-brand-teal" />
                  {text}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-10 pt-8 border-t border-white/10">
              {[
                ['500+', 'Clients Helped'],
                ['3 Months', 'Full Reversal Program'],
                ['Root Cause', 'Not Just Symptom Relief'],
              ].map(([val, label]) => (
                <div key={label} className="text-center">
                  <p className="text-brand-teal font-bold text-2xl font-heading">{val}</p>
                  <p className="text-white/60 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
