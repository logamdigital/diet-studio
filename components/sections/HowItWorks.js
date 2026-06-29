'use client';

import { CreditCard, CalendarDays, PhoneCall, Leaf } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const steps = [
  {
    number: '01',
    Icon: CreditCard,
    title: 'Book & Pay',
    subtitle: '2 minutes',
    desc: 'Click the button, fill a short form with your health details, and pay the ₹500 fee securely. Accepted: UPI, cards, net banking, wallets.',
    iconColor: 'bg-brand-purple-light text-brand-purple',
  },
  {
    number: '02',
    Icon: CalendarDays,
    title: 'Pick Your Slot',
    subtitle: 'Instant',
    desc: 'After payment, choose a date and time that works for you. Morning, evening, weekday or weekend — we have flexible options.',
    iconColor: 'bg-brand-teal-light text-brand-teal',
  },
  {
    number: '03',
    Icon: PhoneCall,
    title: 'Attend Your Consultation',
    subtitle: '30 minutes',
    desc: 'Join via WhatsApp call, phone, or video. Your dietitian will do a deep assessment and give you a clear direction.',
    iconColor: 'bg-brand-purple-light text-brand-purple',
  },
  {
    number: '04',
    Icon: Leaf,
    title: 'Start Your Journey',
    subtitle: 'Ongoing',
    desc: 'Based on the consultation, get your personalized full diet plan. Follow it, see results, and build a healthier life.',
    iconColor: 'bg-brand-teal-light text-brand-teal',
  },
];

export default function HowItWorks({ onBookNow }) {
  const headerRef = useScrollReveal();

  return (
    <section className="section-tan py-20 px-4" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14 opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block bg-brand-purple-light text-brand-purple rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Simple Process
          </span>
          <h2 className="section-heading mb-4">
            Getting Started is{' '}
            <span className="text-brand-purple">Incredibly Easy</span>
          </h2>
          <p className="section-subheading max-w-xl mx-auto">
            From booking to your first consultation in just a few clicks. No complicated forms, no long waits.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-brand-purple/20 via-brand-purple to-brand-purple/20 z-0" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {steps.map((step, i) => (
              <StepCard key={i} step={step} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button onClick={onBookNow} className="btn-primary text-lg">
            Get 1:1 Consultation · ₹500
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Just ₹500 · Takes less than 2 minutes · Secure Razorpay checkout
          </p>
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div ref={ref} className="opacity-0 translate-y-6 transition-all duration-700 text-center">
      <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-200 h-full">
        <div className={`w-12 h-12 ${step.iconColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <step.Icon size={22} />
        </div>
        <span className="inline-block bg-brand-purple-light text-brand-purple text-xs rounded-full px-3 py-0.5 mb-3 font-medium">
          {step.subtitle}
        </span>
        <h3 className="font-bold text-gray-900 text-base mb-2">{step.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed font-light">{step.desc}</p>
      </div>
    </div>
  );
}
