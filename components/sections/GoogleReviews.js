'use client';

import { Star, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import reviews from '@/data/reviews';

const GOOGLE_REVIEWS_URL = 'https://share.google/wuHRmKTuVfF9nttIs';

const AVATAR_COLORS = [
  'bg-pink-100 text-pink-700',
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-purple-100 text-purple-700',
  'bg-amber-100 text-amber-700',
  'bg-red-100 text-red-700',
  'bg-teal-100 text-teal-700',
  'bg-indigo-100 text-indigo-700',
];

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function GoogleG({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function StarRow({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={13} fill={i <= count ? '#FACC15' : 'none'} className={i <= count ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  return (
    <div className="w-80 shrink-0 bg-white rounded-2xl p-5 border border-beige-200 shadow-sm mx-3 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          {review.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={review.photo}
              alt={review.name}
              className="w-9 h-9 rounded-full shrink-0 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${AVATAR_COLORS[index % AVATAR_COLORS.length]}`}>
              {initials(review.name)}
            </div>
          )}
          <div>
            <p className="font-semibold text-brown-900 text-sm leading-tight">{review.name}</p>
            <p className="text-xs text-brown-400">{review.time}</p>
          </div>
        </div>
        <GoogleG size={18} />
      </div>
      <StarRow count={review.rating} />
      <p className="text-brown-700 text-sm leading-relaxed font-light">{review.text}</p>
    </div>
  );
}

export default function GoogleReviews() {
  const headerRef = useScrollReveal();
  const doubled   = [...reviews, ...reviews];

  return (
    <section className="section-white py-16 overflow-hidden" id="google-reviews">
      {/* Header */}
      <div ref={headerRef} className="max-w-6xl mx-auto px-4 text-center mb-10 opacity-0 translate-y-6 transition-all duration-700">
        {/* Google badge */}
        <div className="inline-flex items-center gap-3 bg-white border border-beige-200 rounded-2xl px-5 py-2.5 shadow-sm mb-6">
          <GoogleG size={22} />
          <div className="text-left">
            <p className="font-bold text-brown-900 text-sm leading-tight">The Diet Studio</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} size={11} fill="#FACC15" className="text-yellow-400" />)}
              </div>
              <span className="text-xs text-brown-500">5.0 · Google Reviews</span>
            </div>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 flex items-center gap-1 text-orange-500 hover:text-orange-600 text-xs font-semibold"
          >
            See all <ExternalLink size={11} />
          </a>
        </div>

        <h2 className="section-heading mb-3">
          What Clients Say on <span className="text-orange-500">Google</span>
        </h2>
        <p className="section-subheading max-w-xl mx-auto">
          Verified reviews from real clients — straight from Google.
        </p>
      </div>

      {/* Infinite marquee */}
      <div className="relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        <div className="flex marquee-track">
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} index={i} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10 px-4">
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-brown-800 text-brown-900 hover:bg-brown-900 hover:text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300"
        >
          <GoogleG size={16} />
          Read All Reviews on Google
          <ExternalLink size={14} />
        </a>
      </div>
    </section>
  );
}
