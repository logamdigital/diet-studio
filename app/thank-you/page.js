'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { CheckCircle2, MessageCircle, Clock, PhoneCall } from 'lucide-react';

function ThankYouContent() {
  const params = useSearchParams();
  const name   = params.get('name') || '';

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center bg-brand-purple-light px-4 py-10">
      <div className="w-full max-w-sm flex flex-col gap-4">

        {/* Confirmation card */}
        <div className="bg-white rounded-2xl shadow-md px-6 py-6 text-center">
          <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-brand-teal" />
          </div>
          <h1 className="font-heading text-xl font-bold text-gray-900 leading-tight">
            {name ? `You're all set, ${name}!` : "You're all set!"}
          </h1>
          <p className="text-gray-500 text-sm mt-2 leading-relaxed">
            Payment confirmed! Dt. Sushant's team will reach out to schedule your 30-minute consultation.
          </p>
        </div>

        {/* What to expect */}
        <div className="bg-white rounded-2xl shadow-md px-5 py-4 flex flex-col gap-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">What happens next</p>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-brand-purple/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <MessageCircle size={15} className="text-brand-purple" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">WhatsApp confirmation</p>
              <p className="text-xs text-gray-500 mt-0.5">You'll receive a WhatsApp message from Dt. Sushant's team within a few hours to confirm your session time.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-brand-purple/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <PhoneCall size={15} className="text-brand-purple" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Session scheduling</p>
              <p className="text-xs text-gray-500 mt-0.5">The team will pick a time that works for you — Google Meet or phone call as per your preference.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-brand-purple/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Clock size={15} className="text-brand-purple" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">Join on time</p>
              <p className="text-xs text-gray-500 mt-0.5">Your 30-minute 1:1 session with Dt. Sushant will be fully personalised to your goals.</p>
            </div>
          </div>
        </div>

        <a
          href="https://wa.me/919999999999"
          className="text-center text-xs text-gray-400 px-4 hover:text-brand-purple transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Questions? <span className="font-semibold underline">WhatsApp us</span>
        </a>
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
