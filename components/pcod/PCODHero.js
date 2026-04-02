'use client';

import { ArrowRight, Clock, MapPin, Activity } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const YOUTUBE_VIDEO_ID = 'iAvzfNBHvsQ';

const stats = [
  { Icon: Clock,    value: '3 Months',           label: 'Reversal Program' },
  { Icon: Activity, value: 'BCA Analysis',        label: 'Included Free' },
  { Icon: MapPin,   value: 'In-clinic + Online',  label: 'Anand / Anywhere' },
];

export default function PCODHero({ onBookNow }) {
  const badgeRef  = useScrollReveal(0);
  const textRef   = useScrollReveal(100);
  const videoRef  = useScrollReveal(200);
  const statsRef  = useScrollReveal(300);

  return (
    <section className="bg-white pt-16 pb-16 px-4">
      <div className="max-w-5xl mx-auto text-center">

        {/* Badge */}
        <div
          ref={badgeRef}
          className="opacity-0 translate-y-6 transition-all duration-700 inline-block mb-5"
        >
          <span className="bg-brand-purple-light text-brand-purple rounded-full px-5 py-1.5 text-sm font-semibold tracking-wide">
            3-Month PCOD Reversal Program
          </span>
        </div>

        {/* Headline + sub */}
        <div
          ref={textRef}
          className="opacity-0 translate-y-6 transition-all duration-700 mb-10"
        >
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
            Reverse PCOD in 3 Months{' '}
            <span className="text-brand-purple">Without Depending on Medicines Forever</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8 font-light">
            Metformin and contraceptive pills only manage your symptoms. The moment you stop,
            your PCOD returns. Watch Dr. Sushant explain the root cause and how the 3-phase
            reversal program fixes it permanently.
          </p>
          <button
            onClick={onBookNow}
            className="bg-brand-purple hover:bg-brand-purple/90 text-white font-bold px-10 py-4 rounded-full text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2 group"
          >
            Book PCOD Reversal Consultation — Rs.200
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-gray-400 text-sm mt-3">Rs.200 is for the initial consultation only · Full program pricing discussed in session</p>
        </div>

        {/* YouTube Shorts embed */}
        <div
          ref={videoRef}
          className="opacity-0 translate-y-6 transition-all duration-700 flex justify-center mb-10"
        >
          <div className="w-full max-w-sm" style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 24px 0 rgba(0,0,0,0.10)' }}>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="PCOD Reversal Program"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: '100%', aspectRatio: '9/16', border: 0, display: 'block' }}
            />
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="opacity-0 translate-y-6 transition-all duration-700 flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {stats.map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 bg-brand-purple-light rounded-xl flex items-center justify-center shrink-0">
                <Icon size={20} className="text-brand-purple" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm leading-tight">{value}</p>
                <p className="text-gray-500 text-xs">{label}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
