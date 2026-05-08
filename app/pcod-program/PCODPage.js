'use client';

import { useRouter } from 'next/navigation';
import StickyBar from '@/components/StickyBar';
import PCODHero from '@/components/pcod/PCODHero';
import PCODPainPoints from '@/components/pcod/PCODPainPoints';
import PCODProgram from '@/components/pcod/PCODProgram';
import PCODExpert from '@/components/pcod/PCODExpert';
import PCODFAQ from '@/components/pcod/PCODFAQ';
import PCODFinalCTA from '@/components/pcod/PCODFinalCTA';
import InstaTestimonials from '@/components/sections/InstaTestimonials';

export default function PCODPage() {
  const router = useRouter();
  const openBooking = () => router.push('/booking?pcod=1');

  return (
    <>
      <main>
        <PCODHero        onBookNow={openBooking} />
        <PCODPainPoints  onBookNow={openBooking} />
        <PCODProgram     onBookNow={openBooking} />
        <PCODExpert />
        <InstaTestimonials />
        <PCODFAQ />
        <PCODFinalCTA    onBookNow={openBooking} />
      </main>

      <StickyBar onBookNow={openBooking} />
    </>
  );
}
