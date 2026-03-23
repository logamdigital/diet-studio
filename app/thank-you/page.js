'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get('name') || 'there';

  return (
    <main className="min-h-screen bg-brand-purple-light flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">

        <div className="w-20 h-20 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={44} className="text-brand-teal" />
        </div>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Booking Confirmed!
        </h1>

        <p className="text-gray-600 leading-relaxed font-light">
          Thank you, <span className="text-brand-purple font-semibold">{name}</span>! We have
          received your consultation charge. Dt. Sushant will reach out to you shortly to
          confirm your session.
        </p>

        <Link
          href="/pcod-program"
          className="mt-8 inline-flex items-center gap-2 border-2 border-brand-purple text-brand-purple hover:bg-brand-purple-light font-semibold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Program
        </Link>

      </div>
    </main>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
