'use client';

import React from 'react';
import { useTarotStore } from '../store/useTarotStore';
import { TarotCard } from './TarotCard';
import { Eye, Shuffle, Sparkles } from 'lucide-react';

export const CardDeck: React.FC = () => {
  const {
    isShuffling,
    shuffleMethod,
    drawnCards,
    revealedIndices,
    revealCard,
    revealAllCards,
    openCardDetail,
    step
  } = useTarotStore();

  if (step === 'home') return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      {/* Shuffling Motion View */}
      {isShuffling && (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-300">
          <div className="relative w-44 h-72 mb-8">
            {/* Multi-layered card stack simulation for Cut/Overhand */}
            {[0, 1, 2, 3, 4].map((idx) => {
              const rot = (idx - 2) * 6;
              const tx = (idx - 2) * 12;
              return (
                <div
                  key={idx}
                  style={{
                    transform: `translate(${tx}px, ${idx * -4}px) rotate(${rot}deg)`,
                    transition: 'all 0.4s ease'
                  }}
                  className="absolute inset-0 rounded-xl border border-zinc-700 bg-zinc-950 p-3 shadow-2xl flex items-center justify-center animate-pulse"
                >
                  <div className="w-full h-full rounded-lg border border-zinc-800 bg-zinc-900/80 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-purple-400/40" />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 text-purple-300 text-sm font-serif tracking-wider mb-2">
            <Shuffle className="w-4 h-4 animate-spin" />
            <span>
              {shuffleMethod === 'cut'
                ? '덱을 3단 컷하여 섞는 중...'
                : shuffleMethod === 'overhand'
                ? '손 안에서 카드를 유려하게 넘기며 섞는 중...'
                : '테이블 위에 펼쳐 에너지를 정렬하는 중...'}
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-light">
            질문자의 마음과 상황의 역학을 덱에 투영하고 있습니다.
          </p>
        </div>
      )}

      {/* Spread Cards Grid */}
      {!isShuffling && (
        <div className="w-full flex flex-col items-center animate-in fade-in duration-500">
          {/* Controls Bar */}
          <div className="w-full flex items-center justify-between mb-8 max-w-4xl px-2">
            <div className="text-xs text-zinc-400">
              <span className="text-purple-300 font-medium">카드를 직접 클릭</span>하여 한 장씩 뒤집거나, 상세 보기를 열어보세요.
            </div>

            {revealedIndices.length < drawnCards.length && (
              <button
                onClick={revealAllCards}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-purple-500/40 text-xs font-medium text-purple-200 hover:bg-purple-950/40 hover:text-white transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                모든 카드 한 번에 뒤집기
              </button>
            )}
          </div>

          {/* Cards Display */}
          <div
            className={`w-full flex flex-wrap justify-center items-center gap-6 sm:gap-10 pb-12 ${
              drawnCards.length === 10 ? 'max-w-5xl' : 'max-w-4xl'
            }`}
          >
            {drawnCards.map((drawn, idx) => {
              const isRevealed = revealedIndices.includes(idx);
              return (
                <div key={drawn.card.id + idx} className="flex flex-col items-center">
                  <TarotCard
                    card={drawn.card}
                    isReversed={drawn.isReversed}
                    isRevealed={isRevealed}
                    positionLabel={drawn.positionName}
                    size="md"
                    onClick={() => {
                      if (!isRevealed) {
                        revealCard(idx);
                      } else {
                        openCardDetail(idx);
                      }
                    }}
                  />
                  {/* Quick Detail Open Pill when revealed */}
                  {isRevealed && (
                    <button
                      onClick={() => openCardDetail(idx)}
                      className="mt-8 text-[11px] px-3 py-1 rounded-full bg-purple-950/60 border border-purple-800/40 text-purple-300 hover:bg-purple-900/60 transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      상세 심층 분석
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
