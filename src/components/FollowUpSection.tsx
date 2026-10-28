'use client';

import React from 'react';
import { Sparkles, MessageCircleQuestion, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useTarotStore } from '../store/useTarotStore';
import { TarotCard } from './TarotCard';

export const FollowUpSection: React.FC = () => {
  const {
    followUpQuestion,
    setFollowUpQuestion,
    drawClarifierCard,
    clarifierCard,
    isClarifierLoading,
    readingResult
  } = useTarotStore();

  if (!readingResult) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpQuestion.trim() || isClarifierLoading) return;
    drawClarifierCard();
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-10 pt-8 border-t border-zinc-200 animate-in fade-in duration-500">
      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-semibold mb-2">
          <MessageCircleQuestion className="w-4 h-4 text-purple-600" />
          <span>FOLLOW-UP INQUIRY · 심층 리딩 및 연계 질문</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-900 mb-2">
          더 깊은 통찰이 필요한 부분이 있으신가요?
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 mb-6 font-normal">
          앞선 결과를 바탕으로 추가 고민을 남겨주시면, 기존 덱에서 새로운 <strong className="text-purple-700 font-semibold">보조 카드(Clarifier)</strong>를 뽑아 원소 대비 및 상관관계를 분석해 드립니다.
        </p>

        {/* Input Form */}
        {!clarifierCard && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={followUpQuestion}
                onChange={(e) => setFollowUpQuestion(e.target.value)}
                placeholder="예: 지금 제안받은 옵션 A를 선택할 때 어떤 심리적 저항을 주의해야 할까요?"
                className="w-full px-4 py-3.5 rounded-2xl bg-slate-50 border border-zinc-300 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 shadow-inner transition-all"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!followUpQuestion.trim() || isClarifierLoading}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 disabled:opacity-40 text-white font-semibold text-xs shadow-md shadow-purple-600/20 transition-all"
              >
                {isClarifierLoading ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin text-purple-200" />
                    <span>보조 카드 셔플 및 드로우 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-purple-200" />
                    <span>보조 카드 뽑고 심층 분석</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Clarifier Result Display */}
        {clarifierCard && readingResult.clarifierReading && (
          <div className="mt-4 p-6 rounded-2xl bg-purple-50/60 border border-purple-200 animate-in fade-in zoom-in-95 duration-500 flex flex-col md:flex-row items-center gap-6">
            <div className="shrink-0">
              <TarotCard
                card={clarifierCard.card}
                isReversed={clarifierCard.isReversed}
                isRevealed={true}
                size="sm"
                positionLabel="보조 카드 (Clarifier)"
                interactive={false}
              />
            </div>

            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-purple-200 text-xs font-mono font-medium text-purple-800 shadow-sm">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>연계 질문: &quot;{followUpQuestion}&quot;</span>
              </div>

              <h4 className="text-base font-serif font-bold text-zinc-900">
                {clarifierCard.card.nameKo} {clarifierCard.isReversed ? '(역방향)' : '(정방향)'}와의 원소 상호작용
              </h4>

              <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                {readingResult.clarifierReading.relationshipAnalysis}
              </p>

              <div className="p-3.5 rounded-xl bg-white border border-purple-200 text-xs text-purple-950 font-medium flex items-start gap-2 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                <span className="leading-relaxed">
                  {readingResult.clarifierReading.followUpAdvice}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
