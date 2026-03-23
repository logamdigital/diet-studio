'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import TrustBar from '@/components/sections/TrustBar';
import PainPoints from '@/components/sections/PainPoints';
import Solution from '@/components/sections/Solution';
import PCODReversal from '@/components/sections/PCODReversal';
import AboutExpert from '@/components/sections/AboutExpert';
import GoogleReviews from '@/components/sections/GoogleReviews';
import InstaTestimonials from '@/components/sections/InstaTestimonials';
import Offer from '@/components/sections/Offer';
import HowItWorks from '@/components/sections/HowItWorks';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import StickyBar from '@/components/StickyBar';

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Navbar onBookNow={openModal} />

      <main>
        <Hero onBookNow={openModal} />
        <TrustBar />
        <PainPoints />
        <Solution onBookNow={openModal} />
        <PCODReversal onBookNow={openModal} />
        <AboutExpert />
        <GoogleReviews />
        <InstaTestimonials />
        <HowItWorks onBookNow={openModal} />
        <Offer onBookNow={openModal} />
        <FAQ />
        <FinalCTA onBookNow={openModal} />
      </main>

      <Footer />

      <BookingModal isOpen={modalOpen} onClose={closeModal} />
      <StickyBar onBookNow={openModal} />
    </>
  );
}
