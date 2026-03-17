'use client';

import { useEffect, useRef, useState } from 'react';
import { Users, Star, Award, ThumbsUp } from 'lucide-react';

function CountUp({ end, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 500, suffix: '+', label: 'Clients Helped', Icon: Users },
  { value: 4, suffix: '.9★', label: 'Average Rating', Icon: Star },
  { value: 5, suffix: '+', label: 'Years Experience', Icon: Award },
  { value: 98, suffix: '%', label: 'Client Satisfaction', Icon: ThumbsUp },
];

export default function TrustBar() {
  return (
    <section className="bg-brown-900 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 bg-orange-500/20 rounded-full flex items-center justify-center">
                <stat.Icon size={20} className="text-orange-400" />
              </div>
              <p className="text-3xl font-bold text-orange-400 font-heading">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-beige-100 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
