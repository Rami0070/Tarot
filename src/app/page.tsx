'use client';

import React from 'react';
import { useTarotStore } from '../store/useTarotStore';
import { SoundController } from '../components/SoundController';
import { TarotHome } from '../components/TarotHome';
import { TarotSpreadView } from '../components/TarotSpreadView';
import { TarotConfigModal } from '../components/TarotConfigModal';
import { DeckGalleryModal } from '../components/DeckGalleryModal';

export default function Home() {
  const { step } = useTarotStore();

  return (
    <main className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans selection:bg-purple-100 selection:text-purple-800">
      {/* Global Header & Sound Manager Controller */}
      <SoundController />

      {/* Main View Router based on Step */}
      {step === 'home' ? <TarotHome /> : <TarotSpreadView />}

      {/* Global Deck & Reading Config Modal */}
      <TarotConfigModal />

      {/* [신규] 전체 덱 도감 및 펼쳐보기 모달 */}
      <DeckGalleryModal />
    </main>
  );
}
