'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  {
    q: 'Can Type 2 Diabetes really be fully reversed?',
    a: 'Yes, for most people with Type 2 Diabetes, full reversal or significant reduction in dependency on medicines is achievable. Type 2 Diabetes is a metabolic condition driven by insulin resistance, not an irreversible disease. When you address the root causes — insulin resistance, gut inflammation, and chronic metabolic dysfunction — your body can regulate blood sugar naturally. Our 3-month program is specifically designed to achieve this.',
  },
  {
    q: 'How is this different from what my doctor prescribed?',
    a: 'Doctors typically prescribe Metformin or Glycomet to lower blood sugar, or insulin to manage spikes. These manage readings but do not correct the underlying insulin resistance and metabolic dysfunction. Our program works on the root cause through targeted nutrition, blood sugar regulation, and gut healing — so your body does not need the medicines to function normally.',
  },
  {
    q: 'Do I need to stop my current medicines?',
    a: 'No, you should never stop prescribed medicines without consulting your doctor. We work alongside your current treatment. As your body heals through the program, your doctor may review and gradually reduce your medication. The goal is to reach a point where your body no longer needs them.',
  },
  {
    q: 'What is BCA analysis and why does it matter for diabetes?',
    a: 'BCA (Body Composition Analysis) measures your muscle mass, fat percentage, visceral fat, metabolic rate, and body water levels. For diabetes, visceral fat and muscle mass directly affect insulin sensitivity. Understanding your exact metabolic state is essential to designing a plan that actually works for your body. It is included free in your first consultation.',
  },
  {
    q: 'Is the consultation online or in-clinic?',
    a: 'Both options are available. In-clinic consultations are held in Anand (Gujarat) where you also get BCA analysis done on-site. Online consultations are available across India via WhatsApp or Google Meet video call. For online clients, we will guide you on how to get the BCA analysis done at a partner clinic near you.',
  },
  {
    q: 'I have had diabetes for 10+ years and am on insulin. Can I still benefit?',
    a: 'Yes, even long-standing diabetes responds well to root-cause treatment because the underlying metabolic dysfunction is still addressable through nutrition and lifestyle changes. Many clients on insulin have seen significant reduction in their doses within the 3-month program. A thorough assessment in your first consultation will tell you exactly what to expect.',
  },
  {
    q: 'Do I need to share my blood sugar logs before the consultation?',
    a: 'It is highly recommended. If you have a glucometer, sharing your 7-day fasting and post-meal readings helps Dt. Sushant understand your blood sugar patterns before the call. If you do not have a glucometer, we will guide you on getting one. Your latest HbA1c report is also very helpful to bring to the first consultation.',
  },
];

export default function DiabetesFAQ() {
  const headerRef = useScrollReveal();

  return (
    <section className="bg-white py-20 px-4" id="faq">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-brand-teal-light text-brand-teal rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Diabetes Questions,{' '}
            <span className="text-brand-teal">Answered Honestly</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Everything you need to know before starting your diabetes reversal journey.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} delay={i * 60} />
          ))}
        </div>

      </div>
    </section>
  );
}

function FAQItem({ faq, delay }) {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal(delay);

  return (
    <div ref={ref} className="opacity-0 translate-y-4 transition-all duration-700">
      <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-brand-teal/40 shadow-md' : 'border-gray-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-brand-teal-light/40 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-sm leading-relaxed pr-2">
            {faq.q}
          </span>
          <ChevronDown
            size={18}
            className={`text-brand-teal shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="px-5 pb-5 bg-brand-teal-light/20 border-t border-brand-teal/20">
            <p className="text-gray-700 text-sm leading-relaxed pt-4 font-light">{faq.a}</p>
          </div>
        )}
      </div>
    </div>
  );
}
