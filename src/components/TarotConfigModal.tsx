'use client';

import React from 'react';
import { X, Check, Shield, Shuffle, Layers, Sparkles } from 'lucide-react';
import { useTarotStore, DeckScope, ShuffleMethod, SpreadType } from '../store/useTarotStore';

export const TarotConfigModal: React.FC = () => {
  const {
    isConfigOpen,
    setIsConfigOpen,
    includeReversed,
    setIncludeReversed,
    deckScope,
    setDeckScope,
    shuffleMethod,
    setShuffleMethod,
    spreadType,
    setSpreadType
  } = useTarotStore();

  if (!isConfigOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-zinc-200 rounded-3xl w-full max-w-lg p-6 shadow-2xl relative text-zinc-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h2 className="text-base font-serif font-bold text-zinc-900">덱 및 리딩 조건 설정</h2>
          </div>
          <button
            onClick={() => setIsConfigOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-6 pt-5">
          {/* 1. 역방향(Reversed) 포함 여부 */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-zinc-200">
            <div>
              <div className="text-sm font-bold text-zinc-900">역방향(Reversed) 해석 포함</div>
              <p className="text-xs text-zinc-500 mt-0.5">
                지연, 내면화, 과잉/결핍, 관점 전환 4대 기준 적용
              </p>
            </div>
            <button
              onClick={() => setIncludeReversed(!includeReversed)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                includeReversed ? 'bg-purple-600' : 'bg-zinc-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  includeReversed ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 2. 덱 구성 범위 */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 mb-2.5">
              <Layers className="w-3.5 h-3.5" /> 덱 구성 범위
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'all', title: '전체 78장', desc: '완전한 대소 아르카나' },
                  { id: 'major', title: '메이저 22장', desc: '영적·핵심 전환기' },
                  { id: 'minor', title: '마이너 56장', desc: '일상과 실천 현실' }
                ] as { id: DeckScope; title: string; desc: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setDeckScope(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    deckScope === item.id
                      ? 'bg-purple-50 border-purple-400 text-purple-900 font-medium'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <div className="text-xs font-bold text-zinc-900 flex items-center justify-between">
                    {item.title}
                    {deckScope === item.id && <Check className="w-3 h-3 text-purple-600" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. 스프레드 방식 선택 */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 mb-2.5">
              <Shield className="w-3.5 h-3.5" /> 스프레드 방식
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'three', title: '3카드 스프레드', desc: '과거-현재-미래 / 조언' },
                  { id: 'single', title: '1카드 원포인트', desc: '오늘의 통찰과 단답' },
                  { id: 'celtic', title: '켈틱 크로스', desc: '10장 다차원 분석' }
                ] as { id: SpreadType; title: string; desc: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSpreadType(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    spreadType === item.id
                      ? 'bg-purple-50 border-purple-400 text-purple-900 font-medium'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <div className="text-xs font-bold text-zinc-900 flex items-center justify-between">
                    {item.title}
                    {spreadType === item.id && <Check className="w-3 h-3 text-purple-600" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. 셔플 방식 */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1.5 mb-2.5">
              <Shuffle className="w-3.5 h-3.5" /> 셔플 방식
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'cut', title: '기본 컷 셔플', desc: '전통 3단 컷 방식' },
                  { id: 'overhand', title: '오버핸드 셔플', desc: '손 안에서 넘겨 섞기' },
                  { id: 'riffle', title: '테이블 스프레드', desc: '원형으로 넓게 섞기' }
                ] as { id: ShuffleMethod; title: string; desc: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setShuffleMethod(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    shuffleMethod === item.id
                      ? 'bg-purple-50 border-purple-400 text-purple-900 font-medium'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                  }`}
                >
                  <div className="text-xs font-bold text-zinc-900 flex items-center justify-between">
                    {item.title}
                    {shuffleMethod === item.id && <Check className="w-3 h-3 text-purple-600" />}
                  </div>
                  <div className="text-[10px] text-zinc-500 mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-7 pt-4 border-t border-zinc-200 flex justify-end">
          <button
            onClick={() => setIsConfigOpen(false)}
            className="px-6 py-3 rounded-2xl bg-zinc-950 hover:bg-purple-700 text-white font-semibold text-xs shadow-md transition-all"
          >
            설정 적용 완료
          </button>
        </div>
      </div>
    </div>
  );
};
