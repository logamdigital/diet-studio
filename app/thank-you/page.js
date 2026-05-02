'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import Script from 'next/script';

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get('name') || '';
  const email = params.get('email') || '';

  const calendlyUrl = new URL('https://calendly.com/contact-thedietstudio/30min');
  if (name) calendlyUrl.searchParams.set('name', name);
  if (email) calendlyUrl.searchParams.set('email', email);

  useEffect(() => {
    if (window.Calendly) {
      window.Calendly.initInlineWidget({
        url: calendlyUrl.toString(),
        parentElement: document.getElementById('calendly-embed'),
      });
    }
  }, []);

  return (
    <main className="h-dvh flex flex-col bg-brand-purple-light overflow-hidden">

      {/* Compact confirmation banner */}
      <div className="flex-none px-4 pt-4 pb-3">
        <div className="bg-white rounded-2xl shadow-md px-5 py-3 flex items-center gap-3">
          <CheckCircle2 size={28} className="text-brand-teal shrink-0" />
          <div>
            <p className="font-bold text-gray-900 text-sm leading-tight">
              Payment Confirmed{name ? `, ${name}!` : '!'}
            </p>
            <p className="text-gray-500 text-xs leading-tight mt-0.5">
              Pick a time slot below to schedule your consultation with Dt. Sushant.
            </p>
          </div>
        </div>
      </div>

      {/* Calendly takes all remaining height */}
      <div className="flex-1 px-4 pb-4 min-h-0">
        <div className="h-full bg-white rounded-2xl shadow-md overflow-hidden">
          <div
            id="calendly-embed"
            className="calendly-inline-widget"
            data-url={calendlyUrl.toString()}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
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
