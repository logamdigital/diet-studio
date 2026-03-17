import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata = {
  title: 'Diet Studio — Book a Personal Diet Consultation | Rs.200',
  description:
    'Get a personalized diet plan for weight loss, diabetes, PCOD, thyroid & more. Book a 1-on-1 consultation with an expert dietitian for just Rs.200. 500+ success stories across India.',
  keywords:
    'diet plan India, weight loss consultation, diabetes diet plan, PCOD diet, personal dietitian, diet studio, healthy eating India',
  openGraph: {
    title: 'Diet Studio — Personalized Diet Plans That Actually Work',
    description:
      'Stop guessing what to eat. Get a custom diet plan built for your body, your food, and your goals. Book a consultation for just Rs.200.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
