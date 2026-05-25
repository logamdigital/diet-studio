'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  {
    q: 'Can stubborn weight really be lost permanently without a strict diet?',
    a: 'Yes. Chronic weight gain is primarily a metabolic condition driven by low metabolic flexibility and insulin resistance. By addressing the root causes like visceral fat and hormonal blockages, your body switches from "fat-storage mode" to "fat-burn mode" naturally. Our 3-month program is specifically designed to reset your metabolic rate so your body maintains its ideal weight effortlessly.',
  },
  {
    q: 'How is this different from generic online diets or fitness apps?',
    a: 'Standard fat loss plans focus purely on starvation — forcing you to "eat less and move more" to create a calorie deficit. This crashes your metabolism, spikes your hunger hormones, and causes you to regain all the weight later. Our program focuses on repairing your hormonal and cellular foundation so your body burns fat efficiently without feeling starved.',
  },
  {
    q: 'Will I have to eat separate, boring "diet food" or give up the everyday foods I love?',
    a: 'Absolutely not. Real weight loss must fit into your daily life. We don\'t force you onto exotic, expensive ingredients or tasteless boiled meals. Your plan will be built entirely around your regular meals and favorite foods, customized in the right metabolic proportions so that it is sustainable for you to follow forever.',
  },
  {
    q: 'What is BCA analysis and why does it matter for weight loss?',
    a: 'A standard scale only tells you your weight, but it cannot differentiate between fat, muscle, and water. BCA (Body Composition Analysis) measures your "hidden" visceral fat around your organs, muscle mass, and cellular fluid. Knowing these exact metrics is essential to designing a fat loss plan that preserves your muscle and permanently torches stubborn fat. It is included free in your first consultation.',
  },
  {
    q: 'Is the consultation online or in-clinic?',
    a: 'Both. In-clinic consultations are held in Anand (Gujarat) with on-site BCA analysis. Online consultations are available across India via WhatsApp or Google Meet. We guide our online clients step-by-step on how to track the necessary metrics so their data-driven plan is just as effective as an in-clinic visit.',
  },
  {
    q: 'I\'ve been overweight for 10+ years and have tried everything. Is it too late?',
    a: 'It is never too late. Long-standing weight plateaus still respond to root-cause metabolic treatment because your fat-burning pathways can be "re-trained." Many of our clients who had completely given up after trying multiple gym memberships and fad diets see significant drops in inches, clothing sizes, and fat percentages within our structured 3-month program.',
  },
];

export default function WeightLossFAQ() {
  const headerRef = useScrollReveal();

  return (
    <section className="bg-white py-20 px-4" id="faq">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-beige-100 text-orange-600 rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Weight Loss Questions,{' '}
            <span className="text-orange-500">Answered Honestly</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Everything you need to know before starting your metabolic weight loss journey.
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
      <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-orange-400/40 shadow-md' : 'border-gray-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-beige-50 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-sm leading-relaxed pr-2">
            {faq.q}
          </span>
          <ChevronDown
            size={18}
            className={`text-orange-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="px-5 pb-5 bg-beige-50/50 border-t border-orange-200/30">
            <p className="text-gray-700 text-sm leading-relaxed pt-4 font-light">{faq.a}</p>
          </div>
        )}
      </div>
    </div>
  );
}
