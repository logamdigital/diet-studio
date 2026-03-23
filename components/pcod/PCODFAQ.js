'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const faqs = [
  {
    q: 'Can PCOD really be fully reversed?',
    a: 'Yes, for most women with PCOD, full reversal is achievable. PCOD is a metabolic and hormonal condition, not a structural defect. When you address the root causes: insulin resistance, gut inflammation, and chronic metabolic dysfunction, your hormones can regulate themselves naturally. Our 3-month program is specifically designed to achieve this.',
  },
  {
    q: 'How is this different from what my doctor prescribed?',
    a: 'Doctors typically prescribe Metformin (to lower blood sugar) or contraceptive pills (to regulate cycles artificially). These manage symptoms but do not correct the underlying hormonal and metabolic dysfunction. Our program works on the root cause through targeted nutrition, insulin regulation, and gut healing, so your body does not need the medicines to function normally.',
  },
  {
    q: 'Do I need to stop my current medicines?',
    a: 'No, you should never stop prescribed medicines without consulting your doctor. We work alongside your current treatment. As your body heals through the program, your doctor may review and gradually reduce your medication. The goal is to reach a point where your body no longer needs them.',
  },
  {
    q: 'What is BCA analysis and why does it matter?',
    a: 'BCA (Body Composition Analysis) measures your muscle mass, fat percentage, visceral fat, metabolic rate, and body water levels, far beyond what a simple weight scale shows. For PCOD, understanding your exact metabolic state is essential to designing a plan that actually works for your body. It is included free in your first consultation.',
  },
  {
    q: 'Is the consultation online or in-clinic?',
    a: 'Both options are available. In-clinic consultations are held in Anand (Gujarat) where you also get BCA analysis done on-site. Online consultations are available across India via WhatsApp or Google Meet video call. The BCA kit can also be arranged at partner clinics for outstation clients and we will guide you through this during booking.',
  },
  {
    q: 'I have had PCOD for 5+ years. Is it too late?',
    a: 'It is never too late. Even long-standing PCOD responds well to root-cause treatment because the underlying metabolic dysfunction is still addressable through nutrition and lifestyle changes. Many of our clients with PCOD for 8 to 10 years have seen significant reversal within the 3-month program. The earlier you start, the faster the results, but starting now is always the right time.',
  },
];

export default function PCODFAQ() {
  const headerRef = useScrollReveal();

  return (
    <section className="bg-white py-20 px-4" id="faq">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-brand-purple-light text-brand-purple rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Common Questions
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            PCOD Questions,{' '}
            <span className="text-brand-purple">Answered Honestly</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
            Everything you need to know before starting your PCOD reversal journey.
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
      <div className={`border rounded-xl overflow-hidden transition-all ${open ? 'border-brand-purple/40 shadow-md' : 'border-gray-200'}`}>
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left bg-white hover:bg-brand-purple-light/40 transition-colors"
        >
          <span className="font-semibold text-gray-900 text-sm leading-relaxed pr-2">
            {faq.q}
          </span>
          <ChevronDown
            size={18}
            className={`text-brand-purple shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          />
        </button>
        {open && (
          <div className="px-5 pb-5 bg-brand-purple-light/20 border-t border-brand-purple/20">
            <p className="text-gray-700 text-sm leading-relaxed pt-4 font-light">{faq.a}</p>
          </div>
        )}
      </div>
    </div>
  );
}
