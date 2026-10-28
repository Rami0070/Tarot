import { create } from 'zustand';
import { TAROT_CARDS, TarotCardData } from '../lib/tarotData';
import {
  DrawnCard,
  ReadingResult,
  generateInterpretation,
  generateFollowUpReading
} from '../lib/interpretationEngine';
import { soundManager } from '../lib/soundManager';

export type DeckScope = 'all' | 'major' | 'minor';
export type ShuffleMethod = 'cut' | 'overhand' | 'riffle';
export type SpreadType = 'single' | 'three' | 'celtic';
export type StepType = 'home' | 'shuffling' | 'spread' | 'result';

interface TarotState {
  // 1. Config
  includeReversed: boolean;
  deckScope: DeckScope;
  shuffleMethod: ShuffleMethod;
  spreadType: SpreadType;
  isConfigOpen: boolean;

  // 2. Reading Flow
  step: StepType;
  question: string;
  isShuffling: boolean;
  drawnCards: DrawnCard[];
  revealedIndices: number[];
  selectedCardIndex: number | null; // 상세 모달용
  modalCardData: TarotCardData | null; // 도감/갤러리에서 직접 열람할 때 카드 데이터
  isModalReversed: boolean;
  readingResult: ReadingResult | null;

  // 3. Follow-up
  followUpQuestion: string;
  clarifierCard: DrawnCard | null;
  isClarifierLoading: boolean;

  // 4. Sound & Audio
  isMuted: boolean;
  bgmVolume: number;
  sfxVolume: number;
  isBgmPlaying: boolean;

  // 5. Deck Gallery Modal
  isGalleryOpen: boolean;
  galleryCategory: 'major' | 'minor' | 'all' | 'wands' | 'cups' | 'swords' | 'pentacles';

  // Actions
  setIncludeReversed: (val: boolean) => void;
  setDeckScope: (scope: DeckScope) => void;
  setShuffleMethod: (method: ShuffleMethod) => void;
  setSpreadType: (spread: SpreadType) => void;
  setIsConfigOpen: (open: boolean) => void;

  setQuestion: (q: string) => void;
  startReading: () => void;
  revealCard: (index: number) => void;
  revealAllCards: () => void;
  openCardDetail: (index: number) => void;
  openDirectCardDetail: (card: TarotCardData, isReversed?: boolean) => void;
  closeCardDetail: () => void;
  resetReading: () => void;

  // Follow-up action
  setFollowUpQuestion: (q: string) => void;
  drawClarifierCard: () => void;

  // Sound actions
  toggleMute: () => void;
  toggleBGM: () => void;
  setVolumes: (bgm: number, sfx: number) => void;

  // Gallery actions
  setIsGalleryOpen: (open: boolean) => void;
  setGalleryCategory: (cat: 'major' | 'minor' | 'all' | 'wands' | 'cups' | 'swords' | 'pentacles') => void;
}

const SPREAD_DEFINITIONS: Record<SpreadType, { name: string; meaning: string }[]> = {
  single: [
    { name: '원 카드 (현재의 조언)', meaning: '당면한 질문에 대한 직관적 관찰과 핵심 행동 처방' }
  ],
  three: [
    { name: '과거와 원인 (Past / Root)', meaning: '현재 상황을 촉발한 과거의 기저 원인과 축적된 경험' },
    { name: '현재와 직면 과제 (Present / Challenge)', meaning: '지금 이 순간 질문자님이 직접 다루어야 할 현실과 심리적 태도' },
    { name: '미래와 행동 조언 (Future / Outcome)', meaning: '의식적 실천을 통해 도달할 수 있는 가장 유력한 전환점과 결실' }
  ],
  celtic: [
    { name: '1. 현재 상황', meaning: '질문자의 현 상태와 중심 테마' },
    { name: '2. 당면 장애물', meaning: '성장을 방해하거나 극복해야 할 도전' },
    { name: '3. 잠재의식/뿌리', meaning: '무의식 깊은 곳의 동기와 근본 원인' }
  ]
};

export const useTarotStore = create<TarotState>((set, get) => ({
  includeReversed: true,
  deckScope: 'all',
  shuffleMethod: 'cut',
  spreadType: 'three',
  isConfigOpen: false,

  step: 'home',
  question: '',
  isShuffling: false,
  drawnCards: [],
  revealedIndices: [],
  selectedCardIndex: null,
  modalCardData: null,
  isModalReversed: false,
  readingResult: null,

  followUpQuestion: '',
  clarifierCard: null,
  isClarifierLoading: false,

  isMuted: false,
  bgmVolume: 0.35,
  sfxVolume: 0.6,
  isBgmPlaying: false,

  isGalleryOpen: false,
  galleryCategory: 'major',

  setIncludeReversed: (includeReversed) => set({ includeReversed }),
  setDeckScope: (deckScope) => set({ deckScope }),
  setShuffleMethod: (shuffleMethod) => set({ shuffleMethod }),
  setSpreadType: (spreadType) => set({ spreadType }),
  setIsConfigOpen: (isConfigOpen) => set({ isConfigOpen }),

  setQuestion: (question) => set({ question }),

  startReading: () => {
    const { deckScope, includeReversed, spreadType } = get();
    soundManager.playCardShuffle();

    // 1. 덱 필터링
    let pool: TarotCardData[] = [...TAROT_CARDS];
    if (deckScope === 'major') {
      pool = TAROT_CARDS.filter(c => c.arcana === 'major');
    } else if (deckScope === 'minor') {
      pool = TAROT_CARDS.filter(c => c.arcana === 'minor');
    }

    // 2. 셔플
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // 3. 드로우
    const spreadInfo = SPREAD_DEFINITIONS[spreadType];
    const drawn: DrawnCard[] = spreadInfo.map((pos, idx) => ({
      card: shuffled[idx % shuffled.length],
      isReversed: includeReversed ? Math.random() < 0.38 : false,
      positionName: pos.name,
      positionMeaning: pos.meaning
    }));

    set({
      step: 'shuffling',
      isShuffling: true,
      drawnCards: drawn,
      revealedIndices: [],
      selectedCardIndex: null,
      modalCardData: null,
      clarifierCard: null,
      followUpQuestion: ''
    });

    setTimeout(() => {
      set({
        step: 'spread',
        isShuffling: false
      });
    }, 1800);
  },

  revealCard: (index: number) => {
    const { revealedIndices, drawnCards, question } = get();
    if (revealedIndices.includes(index)) return;

    soundManager.playCardFlip();
    const nextRevealed = [...revealedIndices, index];
    set({ revealedIndices: nextRevealed });

    if (nextRevealed.length === drawnCards.length) {
      setTimeout(() => {
        const result = generateInterpretation(question || '나의 성장과 올바른 선택을 위한 지혜와 조언', drawnCards);
        set({
          readingResult: result,
          step: 'result'
        });
      }, 700);
    }
  },

  revealAllCards: () => {
    const { drawnCards, question } = get();
    soundManager.playCardFlip();
    const allIndices = drawnCards.map((_, i) => i);
    set({ revealedIndices: allIndices });

    setTimeout(() => {
      const result = generateInterpretation(question || '나의 성장과 올바른 선택을 위한 지혜와 조언', drawnCards);
      set({
        readingResult: result,
        step: 'result'
      });
    }, 600);
  },

  openCardDetail: (index: number) => {
    soundManager.playCardFocus();
    const drawn = get().drawnCards[index];
    set({
      selectedCardIndex: index,
      modalCardData: drawn ? drawn.card : null,
      isModalReversed: drawn ? drawn.isReversed : false
    });
  },

  openDirectCardDetail: (card: TarotCardData, isReversed: boolean = false) => {
    soundManager.playCardFocus();
    set({
      selectedCardIndex: null,
      modalCardData: card,
      isModalReversed: isReversed
    });
  },

  closeCardDetail: () => {
    set({ selectedCardIndex: null, modalCardData: null });
  },

  resetReading: () => {
    set({
      step: 'home',
      question: '',
      drawnCards: [],
      revealedIndices: [],
      selectedCardIndex: null,
      modalCardData: null,
      readingResult: null,
      followUpQuestion: '',
      clarifierCard: null
    });
  },

  setFollowUpQuestion: (followUpQuestion) => set({ followUpQuestion }),

  drawClarifierCard: () => {
    const { drawnCards, includeReversed, readingResult, followUpQuestion } = get();
    if (!readingResult || !followUpQuestion.trim()) return;

    soundManager.playCardShuffle();
    set({ isClarifierLoading: true });

    const usedIds = new Set(drawnCards.map(d => d.card.id));
    const availablePool = TAROT_CARDS.filter(c => !usedIds.has(c.id));

    const randomIndex = Math.floor(Math.random() * availablePool.length);
    const chosenCard = availablePool[randomIndex];
    const isReversed = includeReversed ? Math.random() < 0.35 : false;

    setTimeout(() => {
      soundManager.playCardFlip();
      const clarifierDrawn: DrawnCard = {
        card: chosenCard,
        isReversed,
        positionName: '보조 카드 (Clarifier Card)',
        positionMeaning: '메인 리딩의 테마를 심화하고 질문자의 추가 질문에 대한 결정적 실마리 제공'
      };

      const updatedReadingResult: ReadingResult = {
        ...readingResult,
        clarifierReading: generateFollowUpReading(
          readingResult,
          followUpQuestion,
          chosenCard,
          isReversed
        )
      };

      set({
        clarifierCard: clarifierDrawn,
        readingResult: updatedReadingResult,
        isClarifierLoading: false
      });
    }, 1200);
  },

  toggleMute: () => {
    const nextMute = !get().isMuted;
    soundManager.setMuted(nextMute);
    set({ isMuted: nextMute });
  },

  toggleBGM: () => {
    const { isBgmPlaying } = get();
    if (isBgmPlaying) {
      soundManager.stopAmbientBGM();
      set({ isBgmPlaying: false });
    } else {
      soundManager.startAmbientBGM();
      set({ isBgmPlaying: true });
    }
  },

  setVolumes: (bgmVolume, sfxVolume) => {
    soundManager.setVolume(bgmVolume, sfxVolume);
    set({ bgmVolume, sfxVolume });
  },

  setIsGalleryOpen: (isGalleryOpen) => set({ isGalleryOpen }),
  setGalleryCategory: (galleryCategory) => set({ galleryCategory })
}));
