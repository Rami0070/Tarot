'use client';

import React from 'react';
import { Sparkles, Compass, HelpCircle, ArrowRight, BookOpen, Settings, SlidersHorizontal, Check } from 'lucide-react';
import { useTarotStore } from '../store/useTarotStore';

const QUESTION_PROMPTS = [
  '앞으로 3개월 내에 이직을 준비할 때 내가 가장 주도적으로 보완해야 할 역량과 태도는 무엇인가요?',
  '현재 상대방과의 관계에서 생겨난 침묵과 오해를 풀기 위해 내가 당장 실천할 수 있는 행동은 무엇인가요?',
  '새로운 프로젝트 런칭을 앞두고 간과하고 있는 현실적 리스크와 이를 해결할 전략은 무엇인가요?',
  '요즘 마음속 깊이 느껴지는 무기력과 번아웃을 건강하게 돌파할 수 있는 내면의 힘은 어디에 있나요?'
];

export const TarotHome: React.FC = () => {
  const { question, setQuestion, startReading, setIsConfigOpen, spreadType, deckScope, includeReversed } = useTarotStore();

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    startReading();
  };

  const spreadLabel = spreadType === 'three' ? '3카드 스프레드' : spreadType === 'single' ? '1카드 원포인트' : '켈틱 크로스';
  const scopeLabel = deckScope === 'all' ? '전체 78장' : deckScope === 'major' ? '메이저 22장' : '마이너 56장';

  return (
    <div className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center px-4 relative overflow-hidden bg-white text-zinc-900">
      {/* Clean Light Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Emblem */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono tracking-wide mb-5 shadow-sm">
          <span>✦</span>
          <span>UNIVERSAL TAROT · INTEGRATED EDITION</span>
          <span>✦</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-zinc-900 mb-3 leading-tight">
          내면을 비추는 사유의 거울,<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800">
            삶의 주도권을 되찾는 리딩
          </span>
        </h2>

        {/* Intro */}
        <p className="text-sm sm:text-base text-zinc-600 max-w-lg mb-6 font-normal leading-relaxed">
          운명론적 예언 대신 <strong className="text-zinc-900 font-semibold">객관적 관찰</strong>과 <strong className="text-zinc-900 font-semibold">심리적 해석</strong>, 그리고 지금 당장 실천할 수 있는 <strong className="text-purple-700 font-semibold">현실적 행동 조언</strong>을 제시합니다.
        </p>

        {/* [신규 요구사항] 제목 밑 중앙에 위치한 실제 물리 버튼 느낌의 입체적 덱 설정 버튼 */}
        <div className="mb-8 w-full flex justify-center">
          <button
            type="button"
            onClick={() => setIsConfigOpen(true)}
            className="group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-b from-white via-zinc-50 to-zinc-200 border border-zinc-300 border-b-4 border-b-zinc-400 text-zinc-800 font-semibold text-xs sm:text-sm shadow-lg shadow-zinc-300/40 hover:from-purple-50 hover:to-zinc-100 hover:border-purple-300 hover:border-b-purple-400 hover:text-purple-900 active:border-b-2 active:translate-y-[2px] transition-all cursor-pointer"
          >
            {/* Tactile Icon Hub */}
            <div className="w-7 h-7 rounded-xl bg-purple-100 border border-purple-300 flex items-center justify-center text-purple-700 shadow-inner group-hover:scale-105 transition-transform">
              <SlidersHorizontal className="w-3.5 h-3.5" />
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-zinc-900 group-hover:text-purple-900">덱 및 리딩 조건 설정</span>
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
              </div>
              <div className="text-[11px] text-zinc-500 font-normal">
                {spreadLabel} · {scopeLabel} · {includeReversed ? '역방향 ON' : '정방향만'}
              </div>
            </div>

            <span className="ml-2 text-xs font-mono font-bold text-purple-600 bg-purple-100/80 px-2 py-0.5 rounded-lg border border-purple-200">
              변경 ⚙️
            </span>
          </button>
        </div>

        {/* Question Form */}
        <form onSubmit={handleStart} className="w-full space-y-4">
          <div className="relative group text-left">
            <label className="text-xs font-semibold text-zinc-700 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                마음을 기울이고 있는 고민이나 질문을 적어주세요
              </span>
            </label>

            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="대상, 기간, 주제, 내가 조절할 수 있는 행동을 포함해 구체적으로 적어보세요..."
                rows={3}
                className="w-full px-4 py-3.5 rounded-2xl bg-white border border-zinc-300 text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 shadow-sm transition-all resize-none"
              />
            </div>

            {/* Guide Note */}
            <div className="mt-2.5 p-3.5 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
              <div className="text-xs text-zinc-600 leading-relaxed">
                <strong className="text-purple-800">좋은 질문 생성 문법:</strong> &quot;~가 될까요?&quot;라는 수동적 점괘 질문보다, <span className="text-zinc-900 font-medium">&quot;~를 이루기 위해 내가 어떤 태도로 무엇을 조절하고 실천해야 할까요?&quot;</span>처럼 능동적 행동 중심 질문을 작성할 때 가장 명쾌한 조언이 도출됩니다.
              </div>
            </div>
          </div>

          {/* Quick Prompt Chips */}
          <div className="text-left space-y-1.5 pt-2">
            <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono flex items-center gap-1 font-semibold">
              <BookOpen className="w-3 h-3 text-purple-600" /> 추천 질문 템플릿
            </span>
            <div className="flex flex-wrap gap-1.5">
              {QUESTION_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setQuestion(prompt)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-purple-800 hover:border-purple-300 hover:bg-purple-50 transition-all text-left"
                >
                  {prompt.slice(0, 36)}...
                </button>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-zinc-950 text-white font-medium text-sm sm:text-base shadow-xl shadow-zinc-900/20 hover:bg-purple-700 hover:shadow-purple-700/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-300" />
              <span>타로 리딩 시작하기</span>
              <ArrowRight className="w-4 h-4 text-purple-300 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
