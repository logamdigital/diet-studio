'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import StickyBar from '@/components/StickyBar';
import DiabetesHero from '@/components/diabetes/DiabetesHero';
import DiabetesPainPoints from '@/components/diabetes/DiabetesPainPoints';
import DiabetesProgram from '@/components/diabetes/DiabetesProgram';
import DiabetesExpert from '@/components/diabetes/DiabetesExpert';
import DiabetesFAQ from '@/components/diabetes/DiabetesFAQ';
import DiabetesFinalCTA from '@/components/diabetes/DiabetesFinalCTA';
import InstaTestimonials from '@/components/sections/InstaTestimonials';

export default function DiabetesPage() {
  const router = useRouter();
  const openBooking = () => router.push('/booking?diabetes=1');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', { content_name: 'Diabetes Reversal Program Page', content_category: 'Program' });
    }
  }, []);

  return (
    <>
      <main>
        <DiabetesHero        onBookNow={openBooking} />
        <DiabetesPainPoints  onBookNow={openBooking} />
        <DiabetesProgram     onBookNow={openBooking} />
        <DiabetesExpert />
        <InstaTestimonials />
        <DiabetesFAQ />
        <DiabetesFinalCTA    onBookNow={openBooking} />
      </main>

      <StickyBar onBookNow={openBooking} theme="teal" />
    </>
  );
}
