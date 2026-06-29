'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import { CheckCircle2, Zap, Heart, ShieldCheck } from 'lucide-react';

const phases = [
  {
    number: '01',
    title: 'Blood Sugar & Insulin Regulation',
    desc: 'We regulate your insulin resistance and stabilise blood glucose, the primary driver behind uncontrolled diabetes.',
    iconBg: 'bg-brand-teal-light',
    iconText: 'text-brand-teal',
    Icon: Zap,
  },
  {
    number: '02',
    title: 'Metabolic & Gut Health',
    desc: 'We heal your metabolism and gut lining, reducing the chronic inflammation that worsens insulin sensitivity.',
    iconBg: 'bg-brand-purple-light',
    iconText: 'text-brand-purple',
    Icon: Heart,
  },
  {
    number: '03',
    title: 'Medicine-Free Reversal',
    desc: 'As your body heals at the root, you gradually reduce medications and your blood sugar stays in range naturally.',
    iconBg: 'bg-brand-teal-light',
    iconText: 'text-brand-teal',
    Icon: ShieldCheck,
  },
];

const firstVisit = [
  'BCA (Body Composition Analysis) to understand your exact metabolic state',
  'Review of your latest HbA1c and fasting blood sugar reports',
  'Root cause assessment: insulin resistance, gut health, or metabolic dysfunction',
  'Personalised diabetic-friendly diet & lifestyle plan tailored to your body',
];

export default function DiabetesProgram({ onBookNow }) {
  const headerRef  = useScrollReveal();
  const calloutRef = useScrollReveal(100);
  const phasesRef  = useScrollReveal(150);
  const visitRef   = useScrollReveal(200);

  return (
    <section className="bg-white py-20 px-4" id="program">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headerRef}
          className="text-center mb-12 opacity-0 translate-y-6 transition-all duration-700"
        >
          <span className="inline-block bg-brand-teal-light text-brand-teal rounded-full px-4 py-1 text-sm font-semibold mb-4">
            The 3-Phase Program
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Why Medicines Keep You Stuck{' '}
            <span className="text-brand-purple">and What Actually Works</span>
          </h2>
        </div>

        {/* Why medicines callout */}
        <div
          ref={calloutRef}
          className="opacity-0 translate-y-6 transition-all duration-700 bg-red-50 border border-red-100 rounded-2xl p-6 mb-12 max-w-3xl mx-auto"
        >
          <p className="text-red-700 font-semibold text-base mb-2">
            The Hard Truth About Conventional Diabetes Treatment
          </p>
          <p className="text-red-600 text-sm leading-relaxed">
            Metformin controls blood sugar. Insulin injections keep numbers in range temporarily. But
            neither one addresses <strong>why</strong> your blood sugar is high. Once you stop these
            medicines, the readings spike because the root cause was never treated. Insulin resistance,
            gut inflammation, and metabolic dysfunction remain untouched.
          </p>
        </div>

        {/* Phase cards */}
        <div
          ref={phasesRef}
          className="opacity-0 translate-y-6 transition-all duration-700 grid md:grid-cols-3 gap-6 mb-12"
        >
          {phases.map((phase, i) => (
            <PhaseCard key={i} phase={phase} />
          ))}
        </div>

        {/* Timeline badge */}
        <div className="flex justify-center mb-12">
          <div className="bg-brand-teal text-white rounded-2xl px-8 py-5 flex items-center gap-5 shadow-lg">
            <div className="text-6xl font-bold leading-none shrink-0 font-heading">3</div>
            <div>
              <div className="font-bold text-xl leading-tight">Months to Reverse Diabetes</div>
              <div className="text-white/70 text-sm mt-1">
                Structured, phase-by-phase. Results you can measure on your glucometer.
              </div>
            </div>
          </div>
        </div>

        {/* What happens in your first visit */}
        <div
          ref={visitRef}
          className="opacity-0 translate-y-6 transition-all duration-700 bg-brand-teal-light rounded-2xl p-8 border border-brand-teal/20 max-w-2xl mx-auto"
        >
          <h3 className="font-semibold text-gray-900 text-lg mb-5">
            What Happens in Your First Visit
          </h3>
          <div className="space-y-3 mb-6">
            {firstVisit.map((item, i) => (
              <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-brand-teal shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onBookNow}
            className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 w-full sm:w-auto"
          >
            Get 1:1 Consultation · ₹500
          </button>
        </div>

      </div>
    </section>
  );
}

function PhaseCard({ phase }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand-teal hover:shadow-md transition-all">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${phase.iconBg} ${phase.iconText}`}>
        <phase.Icon size={20} />
      </div>
      <div className="text-xs font-bold text-brand-teal tracking-widest mb-1">
        PHASE {phase.number}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{phase.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed font-light">{phase.desc}</p>
    </div>
  );
}
