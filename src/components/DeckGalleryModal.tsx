'use client';

import React, { useState } from 'react';
import { X, Sparkles, Filter, Eye, Layers } from 'lucide-react';
import { useTarotStore } from '../store/useTarotStore';
import { TAROT_CARDS, TarotCardData } from '../lib/tarotData';
import { TarotCard } from './TarotCard';

export const DeckGalleryModal: React.FC = () => {
  const { isGalleryOpen, setIsGalleryOpen, openDirectCardDetail } = useTarotStore();
  const [activeCategory, setActiveCategory] = useState<'all' | 'major' | 'minor' | 'wands' | 'cups' | 'swords' | 'pentacles'>('all');

  if (!isGalleryOpen) return null;

  // 카드 필터링
  const filteredCards = TAROT_CARDS.filter((card) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'major') return card.arcana === 'major';
    if (activeCategory === 'minor') return card.arcana === 'minor';
    if (activeCategory === 'wands') return card.suit === 'wands';
    if (activeCategory === 'cups') return card.suit === 'cups';
    if (activeCategory === 'swords') return card.suit === 'swords';
    if (activeCategory === 'pentacles') return card.suit === 'pentacles';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-50 border border-zinc-200 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden text-zinc-900">
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-zinc-200 flex items-center justify-between z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-zinc-900 flex items-center gap-2">
                유니버셜 덱 디자인 도감 <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-700 font-sans font-medium">{filteredCards.length}장 표시</span>
              </h2>
              <p className="text-xs text-zinc-500">카드를 클릭하면 각 아르카나의 깊이 있는 상징과 행동 조언 설명을 볼 수 있습니다.</p>
            </div>
          </div>

          <button
            onClick={() => setIsGalleryOpen(false)}
            className="p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="px-6 py-3 bg-white/70 border-b border-zinc-200 flex flex-wrap gap-1.5 overflow-x-auto text-xs z-10">
          {[
            { id: 'all', label: '전체 보기 (78장)' },
            { id: 'major', label: '메이저 아르카나 (22장)' },
            { id: 'minor', label: '마이너 아르카나 (전체)' },
            { id: 'wands', label: '완드 (불의 열정)' },
            { id: 'cups', label: '컵 (물의 감정)' },
            { id: 'swords', label: '소드 (공기의 이성)' },
            { id: 'pentacles', label: '펜타클 (흙의 물질)' }
          ].map((tab) => {
            const isActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-purple-700 text-white shadow-sm'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-100">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 justify-items-center">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                onClick={() => openDirectCardDetail(card, false)}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300">
                  <TarotCard
                    card={card}
                    isReversed={false}
                    isRevealed={true}
                    size="sm"
                    interactive={false}
                  />
                </div>
                <button
                  type="button"
                  className="mt-3 text-[11px] px-3 py-1 rounded-full bg-white border border-zinc-300 text-zinc-700 font-semibold group-hover:bg-purple-100 group-hover:text-purple-800 group-hover:border-purple-300 transition-colors shadow-sm flex items-center gap-1"
                >
                  <Eye className="w-3 h-3 text-purple-600" />
                  <span>설명 보기</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
