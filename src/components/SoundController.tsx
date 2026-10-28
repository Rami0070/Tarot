'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Settings, Sliders, Sparkles, LayoutGrid } from 'lucide-react';
import { useTarotStore } from '../store/useTarotStore';

export const SoundController: React.FC = () => {
  const { isMuted, isBgmPlaying, bgmVolume, toggleMute, toggleBGM, setVolumes, setIsConfigOpen, setIsGalleryOpen } = useTarotStore();
  const [showVolumePopup, setShowVolumePopup] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200 px-4 py-3 flex items-center justify-between transition-all shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-md shadow-purple-500/20 text-white font-serif font-bold text-sm">
          ✦
        </div>
        <div>
          <h1 className="text-sm font-serif font-bold tracking-wide text-zinc-900 flex items-center gap-2">
            UNIVERSAL TAROT <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200 font-sans font-medium">INTEGRATED</span>
          </h1>
          <p className="text-[11px] text-zinc-500 hidden sm:block">관찰 · 행동 · 해석 조언의 대화형 타로 솔루션</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* [신규] 우측 상단 덱 디자인 펼쳐보기(도감) 버튼 */}
        <button
          onClick={() => setIsGalleryOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-300 hover:bg-purple-100 transition-all shadow-sm active:scale-95"
          title="유니버셜 덱 전체 카드 도감 펼쳐보기"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-purple-600" />
          <span>덱 펼쳐보기</span>
        </button>

        {/* BGM Toggle */}
        <button
          onClick={toggleBGM}
          title={isBgmPlaying ? '앰비언트 BGM 일시정지' : '앰비언트 BGM 재생'}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            isBgmPlaying
              ? 'bg-purple-100 text-purple-800 border border-purple-300 shadow-sm'
              : 'bg-zinc-100 text-zinc-600 border border-zinc-200 hover:bg-zinc-200'
          }`}
        >
          <Music className={`w-3.5 h-3.5 ${isBgmPlaying ? 'animate-pulse text-purple-600' : ''}`} />
          <span className="hidden md:inline">{isBgmPlaying ? 'BGM' : 'BGM'}</span>
        </button>

        {/* Mute Toggle */}
        <button
          onClick={toggleMute}
          title={isMuted ? '음소거 해제' : '음소거'}
          className="p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-purple-700 hover:border-purple-300 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Volume Slider Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowVolumePopup(!showVolumePopup)}
            title="볼륨 조절"
            className="p-2 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-purple-700 transition-all"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {showVolumePopup && (
            <div className="absolute right-0 top-12 w-48 bg-white border border-zinc-200 rounded-2xl p-3 shadow-xl backdrop-blur-xl animate-in fade-in zoom-in-95">
              <div className="text-xs font-medium text-zinc-700 mb-2 flex items-center justify-between">
                <span>앰비언트 볼륨</span>
                <span className="text-purple-600 font-bold">{Math.round(bgmVolume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={bgmVolume}
                onChange={(e) => setVolumes(parseFloat(e.target.value), 0.6)}
                className="w-full accent-purple-600 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Config Modal Button */}
        <button
          onClick={() => setIsConfigOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-900 text-xs text-white hover:bg-zinc-800 transition-all ml-1"
        >
          <Settings className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">설정</span>
        </button>
      </div>
    </header>
  );
};
