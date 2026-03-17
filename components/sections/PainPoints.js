'use client';

import { TrendingDown, FileX, Package, AlertCircle, Stethoscope, Clock } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const pains = [
  {
    Icon: TrendingDown,
    color: 'text-red-500 bg-red-50',
    title: 'Crash Diets That Always Fail',
    desc: 'You lose a few kilos, then gain it all back — plus more. The yo-yo cycle never ends.',
  },
  {
    Icon: FileX,
    color: 'text-orange-500 bg-orange-50',
    title: 'Generic Diet Charts from the Internet',
    desc: 'Charts that suggest "eat salad" when your family eats dal-chawal every day. Completely impractical.',
  },
  {
    Icon: Package,
    color: 'text-purple-500 bg-purple-50',
    title: 'Expensive Supplements That Do Nothing',
    desc: 'Spent thousands on protein powders, fat burners, and detox teas with zero lasting results.',
  },
  {
    Icon: AlertCircle,
    color: 'text-yellow-600 bg-yellow-50',
    title: 'Confusing, Contradictory Advice',
    desc: "One Reel says eat carbs, another says cut them. You don't know who to believe anymore.",
  },
  {
    Icon: Stethoscope,
    color: 'text-blue-500 bg-blue-50',
    title: 'Medical Conditions Making It Harder',
    desc: 'Diabetes, PCOD, thyroid — everyone gives advice but nobody has a plan that accounts for your condition.',
  },
  {
    Icon: Clock,
    color: 'text-teal-500 bg-teal-50',
    title: '"No Time" to Follow Complex Plans',
    desc: "Plans that require 2 hours of meal prep or 10 different ingredients you can't even find.",
  },
];

export default function PainPoints() {
  const ref = useScrollReveal();

  return (
    <section className="section-tan py-20 px-4" id="pain-points">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={ref} className="text-center mb-14 opacity-0 translate-y-6 transition-all duration-700">
          <span className="inline-block bg-red-100 text-red-600 rounded-full px-4 py-1 text-sm font-semibold mb-4">
            Sound Familiar?
          </span>
          <h2 className="section-heading mb-4">
            You&apos;ve Probably Tried <span className="text-orange-500">All of This…</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            If any of these hit home, you're not alone — and it's not your fault.
            The problem is that you've never had a plan built specifically for <em>you</em>.
          </p>
        </div>

        {/* Pain Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pains.map((pain, i) => (
            <PainCard key={i} pain={pain} delay={i * 100} />
          ))}
        </div>

        {/* Bridge */}
        <div className="mt-14 text-center">
          <div className="inline-block bg-orange-500 text-white rounded-2xl px-8 py-5 max-w-2xl shadow-lg">
            <p className="text-lg font-semibold leading-relaxed">
              The problem is not your body or your willpower.
              <br />
              <span className="text-orange-100 font-normal">
                It&apos;s that no one has ever taken the time to understand your unique situation.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PainCard({ pain, delay }) {
  const ref = useScrollReveal(delay);
  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-6 transition-all duration-700 bg-white rounded-2xl p-6 border border-beige-100 hover:border-red-100 hover:shadow-md group"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${pain.color}`}>
        <pain.Icon size={22} />
      </div>
      <h3 className="font-semibold text-brown-900 text-base mb-2">{pain.title}</h3>
      <p className="text-brown-600 text-sm leading-relaxed">{pain.desc}</p>
    </div>
  );
}
