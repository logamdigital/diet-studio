'use client';

import Link from 'next/link';
import { ArrowRight, Droplets, Leaf, Scale, Activity, Heart, Baby } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
  {
    Icon: Leaf,
    title: 'PCOD / PCOS Reversal',
    desc: 'A 3-phase program that fixes insulin resistance and inflammation to reverse PCOD at the root — not just manage symptoms.',
    href: '/pcod-program',
    cta: 'Explore Program',
  },
  {
    Icon: Droplets,
    title: 'Diabetes Reversal',
    desc: 'Lower your HbA1c and reduce dependence on medication with a personalised, food-first diabetes management plan.',
    href: '/diabetes-program',
    cta: 'Explore Program',
  },
  {
    Icon: Scale,
    title: 'Weight Loss',
    desc: 'Sustainable fat loss built around your Indian food and lifestyle — no crash diets, no rebound weight.',
    href: '/weight-loss-program',
    cta: 'Explore Program',
  },
  {
    Icon: Activity,
    title: 'Thyroid Management',
    desc: 'Targeted nutrition for hypo- and hyperthyroid to stabilise energy, weight, and metabolism.',
    href: null,
    cta: 'Book Consultation',
  },
  {
    Icon: Heart,
    title: 'Heart Health & Cholesterol',
    desc: 'Bring down cholesterol and blood pressure with a heart-friendly plan made for your everyday meals.',
    href: null,
    cta: 'Book Consultation',
  },
  {
    Icon: Baby,
    title: 'Post-Pregnancy Diet',
    desc: 'Recover strength, support breastfeeding, and lose pregnancy weight safely with expert guidance.',
    href: null,
    cta: 'Book Consultation',
  },
];

export default function Services({ onBookNow }) {
  const headerRef = useScrollReveal();

  return (
    <section className="bg-brand-purple-light py-20 px-4" id="services">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block bg-white text-brand-purple rounded-full px-4 py-1 text-sm font-semibold mb-4 shadow-sm">
            Our Services
          </span>
          <h2 className="section-heading mb-4">
            Specialised Programs for{' '}
            <span className="text-brand-purple">Your Health Goal</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Whatever you're working towards, every plan is built around your body, your food, and
            your routine — guided 1:1 by Dt. Sushant.
          </p>
        </div>

        {/* Service cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} delay={i * 90} onBookNow={onBookNow} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay, onBookNow }) {
  const ref = useScrollReveal(delay);
  const { Icon, title, desc, href, cta } = service;

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-purple/30 hover:shadow-md flex flex-col"
    >
      <div className="w-12 h-12 bg-brand-purple-light rounded-xl flex items-center justify-center mb-4 shrink-0">
        <Icon size={22} className="text-brand-purple" />
      </div>
      <h3 className="font-semibold text-gray-900 text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-light mb-5 flex-1">{desc}</p>

      {href ? (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-brand-purple font-semibold text-sm hover:gap-2.5 transition-all group"
        >
          {cta}
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      ) : (
        <button
          onClick={onBookNow}
          className="inline-flex items-center gap-1.5 text-brand-purple font-semibold text-sm hover:gap-2.5 transition-all group self-start"
        >
          {cta}
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </div>
  );
}
