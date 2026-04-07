'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function StickyBar({ onBookNow }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 transition-transform duration-400 ${visible ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-brand-purple border-t border-white/10 shadow-2xl px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden sm:block">
            <p className="text-white font-semibold text-sm">Limited slots available this week!</p>
            <p className="text-white/60 text-xs font-light">Expert 1:1 consultation · Program pricing in session</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={onBookNow}
              className="bg-white text-brand-purple hover:bg-brand-purple-light font-bold px-5 py-2.5 rounded-full text-sm transition-all hover:shadow-lg flex items-center gap-1.5"
            >
              Get 1:1 Consultation with Dr. Sushant
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
