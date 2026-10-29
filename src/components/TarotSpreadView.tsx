'use client';

import React from 'react';
import { useTarotStore } from '../store/useTarotStore';
import { CardDeck } from './CardDeck';
import { FollowUpSection } from './FollowUpSection';
import { CardDetailModal } from './CardDetailModal';
import { Sparkles, Compass, CheckCircle2, RotateCcw, Share2, Layers, Heart, Sparkle, Copy } from 'lucide-react';

export const TarotSpreadView: React.FC = () => {
  const { readingResult, question, resetReading, step } = useTarotStore();

  if (step === 'home') return null;

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 bg-slate-50 text-zinc-900 flex flex-col items-center">
      {/* Question Header Pill */}
      <div className="max-w-3xl w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-xs text-zinc-600 font-mono mb-3 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-purple-600" />
          <span>INQUIRY TARGET · 내담자 핵심 고민</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 italic">
          &quot;{question || '나의 성장과 올바른 선택을 위한 지혜와 조언'}&quot;
        </h2>
        {readingResult && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/80 border border-purple-200 text-xs font-medium text-purple-800">
            <Sparkle className="w-3 h-3 text-purple-600" />
            <span>고민 맞춤 분야: {readingResult.domainName} · {readingResult.subCategoryName}</span>
          </div>
        )}
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
              <span>SYNTHESIS · 3-BLOCK 실전 타로 상담 리딩</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 mb-3">
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

          {/* 2. 핵심 섹션: [3-Block 실전 리딩 시퀀스] */}
          {/*    [1. 심리 리딩 (상황 해석)] ➔ [2. 구체적 행동 조언 (실전 솔루션)] ➔ [3. 온기 있는 확언 (힐링 확언 카드)] */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h4 className="text-base font-serif font-bold text-zinc-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>카드별 3-Block 실전 리딩 (해석 ➔ 조언 ➔ 확언)</span>
              </h4>
              <span className="text-xs text-purple-700 font-medium bg-purple-100 px-2.5 py-0.5 rounded-full">
                8대 고민 코퍼스 1:1 바인딩
              </span>
            </div>

            {readingResult.cardReadings.map((r, idx) => (
              <div
                key={r.cardId + idx}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 shadow-md hover:shadow-lg transition-all space-y-5"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-zinc-950 text-white text-xs flex items-center justify-center font-mono font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 font-medium">
                      [{r.positionName}]
                    </span>
                    <span className="text-base sm:text-lg font-serif font-bold text-zinc-900">
                      {r.cardName}
                    </span>
                  </div>

                  <div>
                    {r.isReversed ? (
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        역방향 (에너지 내면화 / 지연)
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                        정방향 (능동적 추진 / 확산)
                      </span>
                    )}
                  </div>
                </div>

                {/* 도상 객관 관찰 요약 */}
                <div className="text-xs text-zinc-500 leading-relaxed bg-zinc-50 p-3.5 rounded-xl border border-zinc-200/70">
                  <strong className="text-zinc-700">✦ 도상 상징:</strong> {r.observation}
                </div>

                {/* 3-BLOCK UI GRID */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Block 1: [상단 심리 리딩 (상황 해석)] */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/70 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="font-bold text-indigo-950 mb-2 flex items-center gap-1.5 border-b border-indigo-200/60 pb-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                        <span className="text-xs">1. 심리 리딩 (상황 해석)</span>
                      </div>
                      <p className="text-zinc-800 leading-relaxed font-normal">
                        {r.psychologicalReading}
                      </p>
                    </div>
                    <div className="text-[11px] text-indigo-700 font-mono italic">
                      ✦ 내담자 무의식 상태 진단
                    </div>
                  </div>

                  {/* Block 2: [중단 실전 솔루션 (구체적 행동 조언)] */}
                  <div className="p-4 rounded-2xl bg-white border-2 border-purple-200 flex flex-col justify-between shadow-xs space-y-3">
                    <div>
                      <div className="font-bold text-purple-900 mb-2 flex items-center gap-1.5 border-b border-purple-100 pb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                        <span className="text-xs">2. 구체적 행동 조언 (실전 솔루션)</span>
                      </div>
                      <p className="text-zinc-800 leading-relaxed font-medium">
                        {r.actionAdvice}
                      </p>
                    </div>
                    <div className="text-[11px] text-purple-800 font-mono">
                      ✦ 오늘 당장 실천할 행동 지침
                    </div>
                  </div>

                  {/* Block 3: [하단 힐링 확언 카드 (온기 있는 확언)] */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-zinc-950 via-[#181024] to-zinc-900 text-white flex flex-col justify-between shadow-md space-y-3 border border-purple-900/40">
                    <div>
                      <div className="font-bold text-purple-300 mb-2 flex items-center gap-1.5 border-b border-zinc-800 pb-1.5">
                        <Heart className="w-3.5 h-3.5 text-pink-400" />
                        <span className="text-xs">3. 온기 있는 확언 (힐링 카드)</span>
                      </div>
                      <blockquote className="text-purple-100 font-serif italic text-xs sm:text-[13px] leading-relaxed pt-1">
                        &ldquo;{r.affirmation}&rdquo;
                      </blockquote>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-purple-400/80 font-mono">✦ 자존감 회복 & 축복</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(`"${r.affirmation}" - 유니버셜 타로 확언 카드`);
                            alert('확언 문구가 복사되었습니다.');
                          }
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-purple-900/60 hover:bg-purple-800 text-[10px] text-purple-200 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                        <span>문구 복사</span>
                      </button>
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
