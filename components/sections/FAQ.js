'use client';

import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  {
    q: 'Is Rs.200 just for the consultation? What does the diet plan cost?',
    a: 'Yes, Rs.200 is the consultation booking fee only. During your 30-minute session, your dietitian will understand your health goals, assess your situation, and explain the personalized plan options with their pricing. There is absolutely no obligation to purchase anything during or after the consultation.',
  },
  {
    q: 'I am vegetarian. Will the diet plan work for me?',
    a: 'Absolutely! We specialize in Indian vegetarian, non-vegetarian, Jain, and regional cuisine diets. Your plan will be built around foods you actually eat — whether it is dal-roti in North India or rice-sambhar in the South.',
  },
  {
    q: 'I have a medical condition (diabetes, thyroid, PCOD). Can you help?',
    a: 'Yes, this is our core specialty. Our dietitians are trained in therapeutic nutrition for diabetes (Type 1 & 2), PCOD/PCOS, hypothyroid, hyperthyroid, high cholesterol, blood pressure, and more. Please mention your condition in the booking form so we can assign the most suitable expert.',
  },
  {
    q: 'How is this different from free diet charts on YouTube or Google?',
    a: 'Generic content does not know your body weight, blood reports, lifestyle, cooking habits, or specific health history. Our consultation does a complete assessment first and builds a plan that is 100% specific to you — not one designed for an average person.',
  },
  {
    q: 'What if I am not satisfied with the consultation?',
    a: 'We stand behind our work. If you feel the consultation did not add value, reach out to us within 24 hours and we will address your concern. Our goal is for every client to walk away with clarity and confidence about their nutrition journey.',
  },
  {
    q: 'How is the consultation conducted?',
    a: 'After payment, you will choose your preferred slot from a booking calendar. The consultation happens via phone call or WhatsApp/Google Meet video call — whichever you prefer. You can be anywhere in India.',
  },
  {
    q: 'How quickly will I see results from the diet plan?',
    a: 'Most clients notice improvements in energy levels and digestion within the first 1-2 weeks. Weight results typically become visible in 3-4 weeks when the plan is followed consistently. Medical condition improvements (like blood sugar) usually show up within 4-8 weeks.',
  },
  {
    q: 'Can I get a diet plan for my entire family?',
    a: 'Yes! We offer family diet plans as well. During your consultation, mention that you want a family plan and your dietitian will create customized guidelines for each family member — especially useful when managing conditions like diabetes across age groups.',
  },
];

export default function FAQ() {
  const headerRef = useScrollReveal();

  return (
    <section className="section-white py-20 px-4" id="faq">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block bg-orange-100 text-orange-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Got Questions?
          </span>
          <h2 className="section-heading mb-4">
            Frequently Asked <span className="text-orange-500">Questions</span>
          </h2>
          <p className="section-subheading">
            Everything you need to know before booking your consultation.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} delay={i * 50} />
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-10 text-center bg-beige-50 rounded-2xl p-6 border border-beige-200">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle size={18} className="text-orange-500" />
            <p className="text-brown-700 font-medium">Still have questions?</p>
          </div>
          <p className="text-brown-600 text-sm">
            Reach out on WhatsApp — we typically reply within 30 minutes.{' '}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-500 font-semibold hover:underline"
            >
              Chat on WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, delay }) {
  const [open, setOpen] = useState(false);
  const ref = useScrollReveal(delay);

  return (
    <div ref={ref} className="opacity-0 translate-y-4 transition-all duration-600">
      <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-orange-300 shadow-md' : 'border-beige-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-beige-50 transition-colors"
        >
          <span className="font-semibold text-brown-900 text-sm leading-relaxed pr-2">
            {faq.q}
          </span>
          <ChevronDown
            size={18}
            className={`text-orange-500 shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="px-5 pb-5 bg-beige-50 border-t border-beige-200">
            <p className="text-brown-700 text-sm leading-relaxed pt-4 font-light">{faq.a}</p>
          </div>
        )}
      </div>
    </div>
  );
}
