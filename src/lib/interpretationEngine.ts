import { TAROT_CARDS, TAROT_CARD_MAP, TarotCardData } from './tarotData';

export type QuestionDomain = 'love' | 'career' | 'finance' | 'growth' | 'choice' | 'general';

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
  positionName: string;
  positionMeaning: string;
}

export interface ReadingResult {
  summary: string;
  coreTheme: string;
  domain: QuestionDomain;
  userQuestionHighlight: string;
  cardReadings: {
    cardId: string;
    cardName: string;
    isReversed: boolean;
    positionName: string;
    observation: string; // [관찰]
    interpretation: string; // [해석]
    actionAdvice: string; // [행동 조언]
    personalInsight: string; // 질문자의 실제 고민과 1:1 맞물린 생생한 대화형 통찰
  }[];
  elementalHarmony: string;
  clarifierReading?: {
    card: TarotCardData;
    isReversed: boolean;
    relationshipAnalysis: string;
    followUpAdvice: string;
  };
}

export function analyzeUserQuestion(question: string): {
  domain: QuestionDomain;
  intent: string;
  keyConcern: string;
} {
  const q = question.toLowerCase();

  // 1. 연애/인간관계
  if (
    q.includes('연애') ||
    q.includes('이성') ||
    q.includes('사랑') ||
    q.includes('그 사람') ||
    q.includes('그녀') ||
    q.includes('연락') ||
    q.includes('결혼') ||
    q.includes('헤어') ||
    q.includes('마음') ||
    q.includes('재회') ||
    q.includes('친구') ||
    q.includes('관계')
  ) {
    return {
      domain: 'love',
      intent: '마음의 교감과 관계의 회복',
      keyConcern: '상대방과의 소통 방식과 내 감정의 진실성'
    };
  }

  // 2. 이직/커리어/취업/학습
  if (
    q.includes('이직') ||
    q.includes('취업') ||
    q.includes('회사') ||
    q.includes('시험') ||
    q.includes('공부') ||
    q.includes('프로젝트') ||
    q.includes('사업') ||
    q.includes('커리어') ||
    q.includes('직장') ||
    q.includes('승진') ||
    q.includes('퇴사')
  ) {
    return {
      domain: 'career',
      intent: '역량의 발휘와 새로운 기회의 포착',
      keyConcern: '현실적인 준비도와 결정적 실천 타이밍'
    };
  }

  // 3. 금전/재정/투자
  if (
    q.includes('돈') ||
    q.includes('투자') ||
    q.includes('재정') ||
    q.includes('금전') ||
    q.includes('매매') ||
    q.includes('주식') ||
    q.includes('부동산') ||
    q.includes('지출') ||
    q.includes('계약')
  ) {
    return {
      domain: 'finance',
      intent: '물질적 안정과 지속 가능한 번영',
      keyConcern: '위험 관리와 장기적인 가치에 대한 확신'
    };
  }

  // 4. 선택의 기로 / 갈등
  if (
    q.includes('선택') ||
    q.includes('갈등') ||
    q.includes('어떻게') ||
    q.includes('a') ||
    q.includes('b') ||
    q.includes('고민') ||
    q.includes('결정')
  ) {
    return {
      domain: 'choice',
      intent: '올바른 우선순위 정립과 명쾌한 결단',
      keyConcern: '미련을 털어내고 나다운 선택을 내리는 용기'
    };
  }

  // 5. 번아웃/자아성장/멘탈
  if (
    q.includes('번아웃') ||
    q.includes('불안') ||
    q.includes('우울') ||
    q.includes('지쳐') ||
    q.includes('성장') ||
    q.includes('자존감') ||
    q.includes('휴식')
  ) {
    return {
      domain: 'growth',
      intent: '내면 에너지의 회복과 자기 긍정',
      keyConcern: '나를 소진시키는 요인의 식별과 건강한 충전'
    };
  }

  return {
    domain: 'general',
    intent: '현재 상황에 대한 올바른 인식과 주도권 회복',
    keyConcern: '막연한 두려움을 걷어내고 시작할 수 있는 첫걸음'
  };
}

export function generateInterpretation(
  rawQuestion: string,
  drawnCards: DrawnCard[]
): ReadingResult {
  const question = rawQuestion.trim() || '나의 성장과 올바른 선택을 위한 지혜와 조언';
  const { domain, intent, keyConcern } = analyzeUserQuestion(question);

  const cardReadings = drawnCards.map((drawn, idx) => {
    const { card, isReversed, positionName } = drawn;
    const keywords = isReversed ? card.keywordsReversed : card.keywordsUpright;

    // 1. 관찰 (Observation): 유니버셜 덱의 구체적 도상과 상징
    const observation = `${card.observation} ${card.universalSymbol}`;

    // 2. 해석 (Interpretation): 유저 질문과 1:1 맞물리는 심도 있는 심리 분석
    let interpretation = '';
    let personalInsight = '';

    if (!isReversed) {
      interpretation = `질문자님께서 고민하시는 "${question}"의 맥락에서 이 카드는 [${positionName}]의 자리에서 가장 순수하고 건강한 '${keywords.slice(0, 3).join(', ')}'의 에너지가 열려 있음을 보여줍니다. 지금 마주한 과제는 남의 눈치를 보거나 억지로 참을 문제가 아니라, 도상에 나타난 인물처럼 내면의 확신을 당당하게 밖으로 드러낼 때 술술 풀려나갈 것입니다.`;

      personalInsight = domain === 'love'
        ? `상대방의 사소한 태도 하나하나에 의미를 부여하며 혼자 속앓이하기보다, 내 마음의 온도를 있는 그대로 맑고 담백하게 표현할 때 오해가 눈 녹듯 사라집니다.`
        : domain === 'career'
        ? `충분한 실력과 준비가 갖추어져 있습니다. '더 완벽해야 하지 않을까'라는 자기의심을 거두고, 결과물을 당당히 세상에 꺼내놓아 주도권을 잡으세요.`
        : domain === 'choice'
        ? `두려움 때문에 타협하는 쪽이 아니라, 질문자님의 핵심 가치관과 자존감을 가장 드높여주는 선택지에 베팅하세요.`
        : `외부 상황에 휘둘리지 않고 내가 스스로 조절할 수 있는 한 가지 핵심에 에너지를 집중할 때 가장 강력한 돌파구가 열립니다.`;
    } else {
      interpretation = `[${positionName}]의 자리에서 카드가 역방향으로 놓인 것은 실패를 뜻하는 것이 아니라, '${keywords.slice(0, 3).join(', ')}'의 에너지가 외부로 표현되지 못하고 내면에 정체되어 있음을 뜻합니다. 질문자님의 마음속에 "잘해내지 못하면 어쩌지"라는 불안이나 성급한 욕심이 앞서, 에너지가 부드럽게 흐르지 못하고 매듭지어져 있는 상태를 비춥니다.`;

      personalInsight = domain === 'love'
        ? `서운함이나 답답함을 침묵 속에 묻어두지 마세요. 혼자만의 상상으로 결론을 내리지 말고, 차분하게 감정의 응어리를 말로 풀어내야 할 타이밍입니다.`
        : domain === 'career'
        ? `일이 뜻대로 진척되지 않는다면 무작정 속도를 올릴 것이 아니라, 놓치고 있던 기본기나 동료들과의 조율 과정에 누락된 것은 없는지 한 템포 쉬어가야 합니다.`
        : domain === 'choice'
        ? `조급함에 떠밀려 내린 결정은 후회를 낳습니다. 결정을 24시간만 유예하고 마음속의 미련과 타인의 기대를 걷어내 보세요.`
        : `스스로에게 너무 가혹한 잣대를 들이대지 마세요. 지금의 멈춤은 더 큰 도약을 위해 숨을 고르는 값진 재충전의 기회입니다.`;
    }

    // 3. 행동 조언 (Action Advice): 즉각 실행 가능한 맞춤형 실천 처방
    const actionAdvice = isReversed
      ? `[실천 처방] ${card.adviceBase} 특히 내면의 지연을 풀기 위해: ${card.checklists[0]}`
      : `[실천 처방] ${card.adviceBase} 지금 바로 행동으로 옮길 한 가지: ${card.checklists[0]}`;

    return {
      cardId: card.id,
      cardName: card.nameKo,
      isReversed,
      positionName,
      observation,
      interpretation,
      actionAdvice,
      personalInsight
    };
  });

  // 4원소 조화도 분석
  const elements = drawnCards.map(d => d.card.element);
  let elementalHarmony = `배열된 카드들의 원소 에너지는 [${elements.join(', ')}]의 구성을 이룹니다. `;
  const fireCount = elements.filter(e => e.includes('불')).length;
  const waterCount = elements.filter(e => e.includes('물')).length;
  const airCount = elements.filter(e => e.includes('공기')).length;
  const earthCount = elements.filter(e => e.includes('흙')).length;

  if (fireCount > 0 && waterCount > 0) {
    elementalHarmony += '뜨거운 열정(불)과 섬세한 감수성(물)이 함께 작용하고 있어 내적 에너지가 매우 강렬합니다. 충동적으로 터뜨리기보다 따뜻한 온도로 조율해 나갈 때 최상의 결실을 맺습니다.';
  } else if (airCount > 0 && earthCount > 0) {
    elementalHarmony += '명석한 기획력(공기)과 단단한 현실 실행력(흙)이 손을 맞잡아, 고민하던 아이디어를 현실의 손에 잡히는 구체적 성과로 안착시키기에 최적의 조화입니다.';
  } else {
    elementalHarmony += '카드들이 한목소리로 한 방향을 가리키고 있어, 질문자님의 결단 하나로 상황을 주도적으로 뒤바꿀 수 있는 강력한 응집력을 보여줍니다.';
  }

  // 종합 요약
  const summary = `질문자님께서 물으신 "${question}"에 대해 카드가 건네는 가장 큰 위로이자 해답은 '결코 운명에 끌려다니지 말라'는 것입니다. ${drawnCards[0]?.card.nameKo}가 비추는 현재의 씨앗을 겸허히 바라보고, 스스로 바꿀 수 있는 명확한 한 걸음을 내딛을 때 삶의 매듭은 비로소 풀리기 시작합니다.`;

  const coreTheme = `${drawnCards.map(d => d.card.keywordsUpright[0]).join(' → ')}의 흐름을 통한 삶의 주도권 회복`;

  return {
    summary,
    coreTheme,
    domain,
    userQuestionHighlight: question,
    cardReadings,
    elementalHarmony
  };
}

// 심층 연계 질문(Clarifier) 리딩 함수
export function generateFollowUpReading(
  originalReading: ReadingResult,
  followUpQuestion: string,
  clarifierCard: TarotCardData,
  isReversed: boolean
) {
  const keywords = isReversed ? clarifierCard.keywordsReversed : clarifierCard.keywordsUpright;
  const relationshipAnalysis = `앞선 리딩의 핵심 테마인 [${originalReading.coreTheme}]에 비추어 추가 질문("${followUpQuestion}")을 살펴보면, 보조 카드 [${clarifierCard.nameKo}](${isReversed ? '역방향' : '정방향'})는 질문자님이 마음속 깊은 곳에서 놓치고 있던 '${keywords[0]}'의 소중한 감각을 일깨워줍니다. 이것은 단순한 외부 변수가 아니라, 질문자님 스스로 선택할 수 있는 가장 슬기로운 태도의 열쇠입니다.`;

  const followUpAdvice = `[보조 카드 조언] ${clarifierCard.adviceBase} 지금 바로 실천할 작은 행동: ${clarifierCard.checklists[1] || clarifierCard.checklists[0]}`;

  return {
    card: clarifierCard,
    isReversed,
    relationshipAnalysis,
    followUpAdvice
  };
}
