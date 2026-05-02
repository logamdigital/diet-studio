'use client';

import { useState } from 'react';
import BookingModal from '@/components/BookingModal';
import StickyBar from '@/components/StickyBar';
import PCODHero from '@/components/pcod/PCODHero';
import PCODPainPoints from '@/components/pcod/PCODPainPoints';
import PCODProgram from '@/components/pcod/PCODProgram';
import PCODExpert from '@/components/pcod/PCODExpert';
import PCODFAQ from '@/components/pcod/PCODFAQ';
import PCODFinalCTA from '@/components/pcod/PCODFinalCTA';
import InstaTestimonials from '@/components/sections/InstaTestimonials';

export default function PCODPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal  = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <main>
        <PCODHero        onBookNow={openModal} />
        <PCODPainPoints  onBookNow={openModal} />
        <PCODProgram     onBookNow={openModal} />
        <PCODExpert />
        <InstaTestimonials />
        <PCODFAQ />
        <PCODFinalCTA    onBookNow={openModal} />
      </main>

      <BookingModal isOpen={modalOpen} onClose={closeModal} defaultGoal="PCOD / PCOS" simple price={199} />
      <StickyBar onBookNow={openModal} />
    </>
  );
}
