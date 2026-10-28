'use client';

import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, BookOpen, Compass, Layers, Wind, Eye } from 'lucide-react';
import { useTarotStore } from '../store/useTarotStore';
import { TarotCard } from './TarotCard';

export const CardDetailModal: React.FC = () => {
  const { selectedCardIndex, drawnCards, modalCardData, isModalReversed, closeCardDetail, question } = useTarotStore();
  const [activeTab, setActiveTab] = useState<'position' | 'personal' | 'wr' | 'checklist'>('position');

  // 스프레드에서 열렸거나 도감(갤러리)에서 직접 열렸을 때 대응
  const currentDrawn = selectedCardIndex !== null && drawnCards[selectedCardIndex] ? drawnCards[selectedCardIndex] : null;
  const card = currentDrawn ? currentDrawn.card : modalCardData;
  const isReversed = currentDrawn ? currentDrawn.isReversed : isModalReversed;
  const positionName = currentDrawn ? currentDrawn.positionName : '도감 자유 열람';
  const positionMeaning = currentDrawn
    ? currentDrawn.positionMeaning
    : '유니버셜 덱 갤러리에서 직접 선택하여 열람 중인 카드의 본질적 상징과 가이드입니다.';

  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col md:flex-row shadow-2xl relative text-zinc-900">
        {/* Close Button */}
        <button
          onClick={closeCardDetail}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-600 hover:text-zinc-900 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* LEFT COLUMN: Black Card Art on Dark Chamber */}
        <div className="w-full md:w-5/12 bg-gradient-to-b from-zinc-950 via-[#0d0d12] to-black p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-800 relative overflow-hidden">
          {/* Cinemagraph Live Motion Dust & Aura */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl animate-pulse" />
            <div className="absolute w-2 h-2 rounded-full bg-purple-300/70 top-12 left-16 animate-ping duration-1000" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-300/60 top-1/3 right-12 animate-pulse" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-purple-200/50 bottom-16 left-20 animate-bounce duration-700" />
          </div>

          {/* Live Indicator Pill */}
          <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/50 text-[10px] font-mono text-purple-200 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            <Wind className="w-3 h-3 text-purple-300" />
            <span>LIVE CINEMAGRAPH ART</span>
          </div>

          {/* High-res Black Card Container */}
          <div className="transform scale-95 sm:scale-100 transition-transform">
            <TarotCard
              card={card}
              isReversed={isReversed}
              isRevealed={true}
              size="lg"
              interactive={false}
            />
          </div>

          <div className="mt-4 text-center">
            <div className="text-xs font-serif text-zinc-200 font-semibold">
              {positionName}
            </div>
            <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
              원소: {card.element} · {isReversed ? '역방향 (Reversed)' : '정방향 (Upright)'}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 4 Deep Analytical Tabs */}
        <div className="w-full md:w-7/12 flex flex-col bg-white p-6 overflow-y-auto">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-700 font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>UNIVERSAL TAROT DEEP INQUIRY</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-zinc-900 flex items-center gap-2">
              {card.nameKo}
              {isReversed && (
                <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  역방향
                </span>
              )}
            </h2>
            <p className="text-xs text-zinc-500 mt-1">
              {card.nameEn} · {card.arcana === 'major' ? '메이저 아르카나' : '마이너 아르카나'}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-zinc-200 gap-1 mb-5 overflow-x-auto pb-1">
            {[
              { id: 'position', label: '1. 도상 관찰 & 의미', icon: Layers },
              { id: 'personal', label: '2. 질문 밀착 독해', icon: Compass },
              { id: 'wr', label: '3. 유니버셜 도상 상징', icon: BookOpen },
              { id: 'checklist', label: '4. 실천 체크리스트', icon: CheckCircle2 }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
                    isActive
                      ? 'border-purple-600 text-purple-700 bg-purple-50'
                      : 'border-transparent text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB CONTENTS */}
          <div className="space-y-4 text-xs leading-relaxed text-zinc-700">
            {/* TAB 1 */}
            {activeTab === 'position' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80">
                  <div className="font-bold text-purple-900 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-purple-700" />
                    현재 위치: [{positionName}]
                  </div>
                  <p className="text-zinc-700 leading-relaxed">
                    {positionMeaning}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-purple-700" />
                    도상 객관적 관찰 (Observation)
                  </h4>
                  <p className="bg-slate-50 p-4 rounded-2xl border border-zinc-200 leading-relaxed font-normal">
                    {card.observation}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-zinc-800 uppercase tracking-wider mb-2">
                    핵심 키워드
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {(isReversed ? card.keywordsReversed : card.keywordsUpright).map((kw, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 font-medium"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2 */}
            {activeTab === 'personal' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                  <div className="text-[11px] font-mono text-purple-700 font-bold mb-1">
                    고민 맥락
                  </div>
                  <div className="text-sm font-semibold text-zinc-900 italic">
                    &quot;{question || '나의 성장과 올바른 선택을 위한 지혜와 조언'}&quot;
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-zinc-200 space-y-3">
                  <h4 className="font-bold text-zinc-900 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-purple-700" />
                    1:1 맞춤 상황 독해
                  </h4>
                  <p className="leading-relaxed font-normal text-zinc-700">
                    {isReversed ? (
                      <>
                        이 카드가 역방향으로 놓인 것은 질문자님의 고민 속에서 <strong>에너지의 내면화 또는 일시적 지연</strong>이 일어나고 있음을 암시합니다. 겉으로 드러난 상황보다 마음속의 불안이나 조급함이 진전을 가로막고 있을 수 있습니다.
                      </>
                    ) : (
                      <>
                        이 카드가 정방향으로 힘 있게 들어선 것은 질문자님의 상황에서 <strong>{card.keywordsUpright[0]}</strong>의 추진력이 가장 정직한 열쇠임을 의미합니다. 망설이지 말고 도상의 인물처럼 확고한 태도를 취하세요.
                      </>
                    )}
                  </p>
                  <p className="leading-relaxed font-medium text-purple-900 bg-white p-3 rounded-xl border border-purple-200">
                    {card.adviceBase}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 3 */}
            {activeTab === 'wr' && (
              <div className="space-y-3.5 animate-in fade-in duration-200">
                <div className="p-4 rounded-2xl bg-slate-50 border border-zinc-200">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs flex items-center justify-center font-bold">
                      ✦
                    </span>
                    <h4 className="font-bold text-zinc-900">
                      유니버셜 덱의 상징과 비의적 원리
                    </h4>
                  </div>
                  <p className="text-zinc-700 leading-relaxed font-normal">
                    {card.universalSymbol}
                  </p>
                </div>
              </div>
            )}

            {/* TAB 4 */}
            {activeTab === 'checklist' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-900 font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-700 shrink-0" />
                  <span>오늘 또는 이번 주에 즉시 실행할 수 있는 현실적 행동 가이드입니다.</span>
                </div>

                <div className="space-y-2.5">
                  {card.checklists.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-zinc-200 flex items-start gap-3 shadow-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                      <div className="text-zinc-800 font-medium leading-relaxed">
                        {item}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
