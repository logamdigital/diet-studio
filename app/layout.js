import './globals.css';
import { Poppins } from 'next/font/google';
import Script from 'next/script';

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
      <body className="font-sans">
        {children}
        {/* Facebook Pixel — set NEXT_PUBLIC_FB_PIXEL_ID in .env.local */}
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
              n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
              (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init','${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track','PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img height="1" width="1" style={{display:'none'}}
            src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_FB_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
      </body>
    </html>
  );
}
