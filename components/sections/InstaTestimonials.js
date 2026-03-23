'use client';

const REELS = [
  'DWB2qL8DF_X',
  'DUniXn7jO5d',
  'DSmwW4bjRnU',
  'DSXA4rJiVG6',
  'DRmESGrDvcU',
  'DQhRWO0ExNi',
  'DQANMYKE1ep',
  'DPjFzSuk5R_',
  'DG5dZSyzMt1',
  'DG0Or5lTfSt',
];

const DOUBLED = [...REELS, ...REELS];

const IgIcon = ({ size = 20, gradId = 'ig-g1' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id={gradId} cx="30%" cy="107%" r="150%">
        <stop offset="0%"  stopColor="#fdf497" />
        <stop offset="5%"  stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </radialGradient>
    </defs>
    <rect width="24" height="24" rx="6" fill={`url(#${gradId})`} />
    <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="1.8" fill="none" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

export default function InstaTestimonials() {
  return (
    <section className="bg-brand-purple-light py-16" id="insta-testimonials">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-white border border-purple-200 rounded-2xl px-5 py-2.5 shadow-sm mb-6">
          <IgIcon size={20} gradId="ig-badge" />
          <span className="font-semibold text-brown-900 text-sm">Real Client Stories</span>
        </div>

        <h2 className="section-heading mb-3">
          Transformations That{' '}
          <span className="text-brand-purple">Speak for Themselves</span>
        </h2>
        <p className="section-subheading max-w-xl mx-auto">
          Watch real clients share their journey with The Diet Studio — in their own words.
        </p>
      </div>

      {/* Infinite auto-scroll */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-brand-purple-light to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-brand-purple-light to-transparent z-10 pointer-events-none" />

        <div className="insta-marquee-track flex" style={{ width: 'max-content' }}>
          {DOUBLED.map((id, i) => (
            <div
              key={i}
              className="shrink-0 mx-3"
              style={{
                width: 300,
                height: 560,
                borderRadius: 16,
                border: '1.5px solid rgba(94,59,135,0.25)',
                overflow: 'hidden',
                background: '#fff',
              }}
            >
              <iframe
                src={`https://www.instagram.com/reel/${id}/embed/`}
                width="300"
                height="560"
                frameBorder="0"
                scrolling="no"
                allowTransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                style={{ display: 'block' }}
                title={`Instagram reel ${id}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10 px-4">
        <a
          href="https://www.instagram.com/thedietstudio_/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white font-semibold px-6 py-3 rounded-full text-sm transition-all duration-300"
        >
          <IgIcon size={16} gradId="ig-cta" />
          Follow on Instagram
        </a>
      </div>
    </section>
  );
}
