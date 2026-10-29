'use client';

import React from 'react';
import { TarotCardData } from '../lib/tarotData';
import { Sparkles } from 'lucide-react';

interface TarotCardProps {
  card: TarotCardData;
  isReversed: boolean;
  isRevealed: boolean;
  onClick?: () => void;
  positionLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const TarotCard: React.FC<TarotCardProps> = ({
  card,
  isReversed,
  isRevealed,
  onClick,
  positionLabel,
  size = 'md',
  interactive = true
}) => {
  const sizeClasses = {
    sm: 'w-28 h-48',
    md: 'w-44 h-72 sm:w-52 sm:h-84',
    lg: 'w-64 h-96 sm:w-72 sm:h-[440px]'
  }[size];

  return (
    <div
      onClick={interactive ? onClick : undefined}
      className={`group relative perspective-1000 ${sizeClasses} select-none ${
        interactive ? 'cursor-pointer' : ''
      }`}
    >
      {/* 3D Flip Container */}
      <div
        className={`w-full h-full duration-700 preserve-3d transition-transform ${
          isRevealed ? 'rotate-y-180' : ''
        } ${isRevealed && isReversed ? 'rotate-z-180' : ''}`}
      >
        {/* CARD BACK (검은색 미스터리 아르카나 뒷면) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl border-2 border-zinc-800 bg-[#09090b] p-3 shadow-2xl transition-all duration-300 group-hover:border-purple-500/80 group-hover:shadow-purple-500/25 group-hover:scale-[1.02]">
          <div className="w-full h-full rounded-xl border border-zinc-800 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black flex flex-col items-center justify-between p-3.5 relative overflow-hidden">
            {/* Subtle Etching Lines */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d1c4e9_1px,transparent_1px)] [background-size:12px_12px]" />

            <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>✦</span>
              <span>UNIVERSAL</span>
              <span>✦</span>
            </div>

            {/* Central Mystic Star Sigil */}
            <div className="relative flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border border-zinc-700/80 flex items-center justify-center animate-spin-slow">
                <div className="w-14 h-14 rounded-full border border-purple-500/40 border-dashed flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-purple-950/60 border border-purple-400/60 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <Sparkles className="w-4 h-4 text-purple-300" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-500">
              <span>✦</span>
              <span>ARCANUM</span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* CARD FRONT (유니버셜 덱을 오마주한 고급 블랙 카드 앞면) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl border-2 border-zinc-700 bg-[#09090b] p-1.5 shadow-2xl transition-all duration-300 group-hover:border-purple-400 group-hover:shadow-purple-500/30 group-hover:scale-[1.02]">
          {card.imageUrl ? (
            <div className="w-full h-full rounded-xl overflow-hidden relative flex items-center justify-center bg-[#09090b]">
              <img
                src={card.imageUrl}
                alt={card.nameKo}
                className="w-full h-full object-cover select-none transition-transform duration-500"
              />
              {isReversed && (
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
                  <span className="inline-block text-[9px] font-mono font-medium text-amber-300 bg-black/80 backdrop-blur border border-amber-600/50 px-2 py-0.5 rounded-full shadow-lg">
                    REVERSED (역방향)
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full rounded-xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-black flex flex-col justify-between p-3 relative overflow-hidden">
              {/* Header: Roman Numeral & Element */}
              <div className="flex justify-between items-center z-10 border-b border-zinc-800/80 pb-1.5">
                <span className="text-[11px] font-serif font-bold text-amber-200/90 tracking-wider">
                  {card.number}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-zinc-800/90 text-zinc-300 border border-zinc-700/60">
                  {card.element}
                </span>
              </div>

              {/* Middle: Universal Waite Inspired Vector Artwork */}
              <div className="my-auto flex flex-col items-center justify-center py-2 relative z-10">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-zinc-700/90 bg-black/90 flex items-center justify-center relative shadow-inner overflow-hidden group-hover:border-purple-400/80 transition-colors">
                  <svg
                    className="w-14 h-14 sm:w-16 sm:h-16 text-purple-200 stroke-[1.25] group-hover:scale-110 transition-transform duration-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    dangerouslySetInnerHTML={{ __html: card.svgDrawing || '' }}
                  />
                </div>

                {/* Card Title */}
                <h3 className="font-serif text-xs sm:text-sm font-semibold tracking-wide text-zinc-100 text-center mt-3">
                  {card.nameKo}
                </h3>
                <p className="text-[10px] text-zinc-400 font-sans tracking-tight">
                  {card.nameEn}
                </p>
              </div>

              {/* Footer: Keywords & Orientation Badge */}
              <div className="z-10 flex flex-col gap-1 border-t border-zinc-800/80 pt-1.5 text-center">
                <div className="text-[9px] text-zinc-400 truncate">
                  {(isReversed ? card.keywordsReversed : card.keywordsUpright).slice(0, 2).join(' · ')}
                </div>

                {isReversed ? (
                  <span className="inline-block self-center text-[9px] font-mono font-medium text-amber-300 bg-amber-950/50 border border-amber-600/50 px-2 py-0.5 rounded-full">
                    REVERSED (역방향)
                  </span>
                ) : (
                  <span className="inline-block self-center text-[9px] font-mono font-medium text-purple-300 bg-purple-950/40 border border-purple-700/40 px-2 py-0.5 rounded-full">
                    UPRIGHT (정방향)
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Position Label Tag (흰 배경 위에서 잘 보이도록 다크 텍스트) */}
      {positionLabel && (
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-zinc-700 group-hover:text-purple-700 transition-colors">
          {positionLabel}
        </div>
      )}
    </div>
  );
};
