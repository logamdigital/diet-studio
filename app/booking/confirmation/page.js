import Link from 'next/link';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export const metadata = {
  title: 'Booking Confirmed | Diet Studio',
};

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-beige-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={44} className="text-green-500" />
        </div>

        <h1 className="font-heading text-2xl md:text-3xl font-bold text-brown-900 mb-3">
          Booking Confirmed!
        </h1>

        <p className="text-brown-700 leading-relaxed mb-6 font-light">
          Thank you for booking your Diet Studio consultation. We have received your payment
          and will contact you on WhatsApp to confirm your slot.
        </p>

        <div className="bg-beige-50 rounded-2xl p-5 border border-beige-200 text-left mb-6">
          <h3 className="font-semibold text-brown-900 mb-3">What happens next?</h3>
          <ul className="space-y-3">
            {[
              'Check your email for a booking confirmation',
              'We will WhatsApp you within a few hours to confirm your consultation slot',
              'Join the call at your booked time — via phone or video',
              'Get a clear direction for your personalized diet plan',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-brown-700">
                <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-orange-600 font-bold text-xs">{i + 1}</span>
                </div>
                <span className="font-light">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 border-2 border-orange-400 text-orange-600 hover:bg-orange-50 font-semibold py-3 rounded-xl text-sm transition-colors text-center"
          >
            Back to Home
          </Link>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl text-sm transition-colors text-center flex items-center justify-center gap-2"
          >
            <MessageCircle size={16} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
