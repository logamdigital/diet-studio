'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StickyBar from '@/components/StickyBar';
import WeightLossHero from '@/components/weightloss/WeightLossHero';
import WeightLossPainPoints from '@/components/weightloss/WeightLossPainPoints';
import WeightLossProgram from '@/components/weightloss/WeightLossProgram';
import WeightLossExpert from '@/components/weightloss/WeightLossExpert';
import WeightLossFAQ from '@/components/weightloss/WeightLossFAQ';
import WeightLossFinalCTA from '@/components/weightloss/WeightLossFinalCTA';
import InstaTestimonials from '@/components/sections/InstaTestimonials';

export default function WeightLossPage() {
  const router = useRouter();
  const openBooking = () => router.push('/booking?weightloss=1');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: 'Weight Loss Program Page', content_category: 'Program' });
    }
  }, []);

  return (
    <>
      <main>
        <WeightLossHero       onBookNow={openBooking} />
        <WeightLossPainPoints onBookNow={openBooking} />
        <WeightLossProgram    onBookNow={openBooking} />
        <WeightLossExpert />
        <InstaTestimonials />
        <WeightLossFAQ />
        <WeightLossFinalCTA   onBookNow={openBooking} />
      </main>

      <StickyBar onBookNow={openBooking} theme="orange" />
    </>
  );
}
