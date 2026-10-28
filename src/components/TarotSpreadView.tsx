'use client';

import React from 'react';
import { useTarotStore } from '../store/useTarotStore';
import { CardDeck } from './CardDeck';
import { FollowUpSection } from './FollowUpSection';
import { CardDetailModal } from './CardDetailModal';
import { Sparkles, Compass, CheckCircle2, RotateCcw, Share2, Layers, Eye, BookOpen } from 'lucide-react';

export const TarotSpreadView: React.FC = () => {
  const { readingResult, question, resetReading, step } = useTarotStore();

  if (step === 'home') return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 text-zinc-900 flex flex-col items-center">
      {/* Question Header Pill */}
      <div className="max-w-3xl w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-600 font-mono mb-3 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-purple-600" />
          <span>INQUIRY TARGET</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 italic">
          &quot;{question || '나의 성장과 올바른 선택을 위한 지혜와 조언'}&quot;
        </h2>
      </div>

      {/* 3D Spread Deck Component */}
      <CardDeck />

      {/* 종합 리딩 결과 창 (카드 공개 후 생성) */}
      {readingResult && (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* 1. 종합 테마 & 요약 카드 */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>SYNTHESIS · 종합 리딩 및 원소 에너지 분석</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 mb-4">
              {readingResult.coreTheme}
            </h3>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-normal mb-6">
              {readingResult.summary}
            </p>

            {/* 원소 조화도 박스 */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-start gap-3">
              <Layers className="w-4 h-4 text-purple-600 mt-1 shrink-0" />
              <div>
                <div className="text-xs font-bold text-purple-900 uppercase tracking-wider mb-1">
                  4원소 역학 및 상호작용
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {readingResult.elementalHarmony}
                </p>
              </div>
            </div>
          </div>

          {/* 2. 핵심 섹션: [관찰, 행동, 해석 조언] (사용자 요청 타이틀 적용) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-base font-serif font-bold text-zinc-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>관찰, 행동, 해석 조언</span>
              </h4>
              <span className="text-xs text-purple-700 font-medium bg-purple-100 px-2.5 py-0.5 rounded-full">
                질문 맞춤형 대화형 가이드
              </span>
            </div>

            {readingResult.cardReadings.map((r, idx) => (
              <div
                key={r.cardId + idx}
                className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-md hover:border-purple-300 transition-all space-y-4"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs flex items-center justify-center font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 font-medium">
                      [{r.positionName}]
                    </span>
                    <span className="text-base font-serif font-bold text-zinc-900">
                      {r.cardName}
                    </span>
                  </div>

                  <div>
                    {r.isReversed ? (
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        역방향 (에너지 내면화/지연)
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        정방향 (능동적 추진)
                      </span>
                    )}
                  </div>
                </div>

                {/* 3 Step Breakdown: 관찰 / 해석 / 행동 조언 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Step 1: 관찰 */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-zinc-200 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-purple-600" />
                        <span>1. 관찰 (Observation)</span>
                      </div>
                      <p className="text-zinc-600 leading-relaxed font-normal">
                        {r.observation}
                      </p>
                    </div>
                  </div>

                  {/* Step 2: 해석 */}
                  <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-200/60 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-zinc-800 mb-2 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                        <span>2. 해석 (Interpretation)</span>
                      </div>
                      <p className="text-zinc-700 leading-relaxed font-normal mb-2.5">
                        {r.interpretation}
                      </p>
                      <div className="p-2.5 rounded-lg bg-white border border-purple-200 text-[11px] text-purple-900 font-medium">
                        <strong>질문 밀착 조언:</strong> {r.personalInsight}
                      </div>
                    </div>
                  </div>

                  {/* Step 3: 행동 조언 */}
                  <div className="p-4 rounded-xl bg-zinc-950 text-white flex flex-col justify-between shadow-sm">
                    <div>
                      <div className="font-bold text-purple-300 mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                        <span>3. 행동 조언 (Action Advice)</span>
                      </div>
                      <p className="text-zinc-200 font-medium leading-relaxed">
                        {r.actionAdvice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 3. Follow-Up Clarifier Card Section */}
          <FollowUpSection />

          {/* Action Buttons: Reset & Share */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-6 pb-12">
            <button
              onClick={resetReading}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-zinc-300 text-zinc-800 hover:bg-zinc-100 text-xs font-semibold shadow-sm transition-all"
            >
              <RotateCcw className="w-4 h-4 text-zinc-600" />
              <span>새로운 질문으로 다시 리딩하기</span>
            </button>

            <button
              onClick={() => {
                if (navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert('리딩 링크가 클립보드에 복사되었습니다.');
                }
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-700 text-white hover:bg-purple-800 text-xs font-semibold shadow-md shadow-purple-600/20 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>리딩 결과 보관 및 공유</span>
            </button>
          </div>
        </div>
      )}

      {/* Shared Layout Card Detail Modal */}
      <CardDetailModal />
    </div>
  );
};
