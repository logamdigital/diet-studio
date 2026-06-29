'use client';

import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import PainPoints from '@/components/sections/PainPoints';
import Solution from '@/components/sections/Solution';
import Services from '@/components/sections/Services';
import PCODReversal from '@/components/sections/PCODReversal';
import AboutExpert from '@/components/sections/AboutExpert';
import InstaTestimonials from '@/components/sections/InstaTestimonials';
import Offer from '@/components/sections/Offer';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/Footer';
import StickyBar from '@/components/StickyBar';

export default function HomePage() {
  const router = useRouter();
  const openBooking = () => router.push('/booking');

  return (
    <>
      <Navbar onBookNow={openBooking} />

      <main>
        <Hero onBookNow={openBooking} />
        <TrustBar />
        <PainPoints />
        <Solution onBookNow={openBooking} />
        <Services onBookNow={openBooking} />
        <PCODReversal onBookNow={openBooking} />
        <AboutExpert />
        <InstaTestimonials />
        <HowItWorks onBookNow={openBooking} />
        <Offer onBookNow={openBooking} />
        <FAQ />
        <FinalCTA onBookNow={openBooking} />
      </main>

      <Footer />
      <StickyBar onBookNow={openBooking} />
    </>
  );
}
