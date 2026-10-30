import { TAROT_CARDS, TAROT_CARD_MAP, TarotCardData } from './tarotData';

// -------------------------------------------------------------
// 1. 8대 핵심 고민 분야 및 코퍼스 인터페이스
// -------------------------------------------------------------
export type QuestionDomain =
  | 'love'           // 1. [연애 & 애정운]
  | 'trauma'         // 2. [상처 극복 & 트라우마]
  | 'career'         // 3. [진로 & 직무 탐색]
  | 'exam'           // 4. [취업 & 시험]
  | 'business'       // 5. [사업 & 스타트업]
  | 'finance'        // 6. [금전 & 투자]
  | 'health'         // 7. [건강 & 심신 회복]
  | 'turning_point'  // 8. [미래 & 삶의 전환기]
  | 'general';       // 일반 종합 질문

export interface CorpusEntry {
  domain: QuestionDomain;
  domainName: string;
  subCategory: string;
  name: string;
  keywords: string[];
  psychologicalReading: string; // [1. 심리 리딩 (상황 해석)]
  actionAdvice: string;         // [2. 구체적 행동 조언 (실전 솔루션)]
  affirmation: string;          // [3. 온기 있는 확언 (힐링 확언 카드)]
}

export interface DrawnCard {
  card: TarotCardData;
  isReversed: boolean;
  positionName: string;
  positionMeaning: string;
}

export interface SingleCardBlockReading {
  cardId: string;
  cardName: string;
  isReversed: boolean;
  positionName: string;
  observation: string;           // 도상학적 관찰
  psychologicalReading: string;  // [1. 심리 리딩 (상황 해석)]
  actionAdvice: string;          // [2. 구체적 행동 조언]
  affirmation: string;           // [3. 온기 있는 확언]
  elementalSignificance: string; // 수트/원소별 상징 에너지
  // 하위 호환 필드
  interpretation: string;
  personalInsight: string;
}

export interface ReadingResult {
  summary: string;
  coreTheme: string;
  domain: QuestionDomain;
  domainName: string;
  subCategoryName: string;
  userQuestionHighlight: string;
  cardReadings: SingleCardBlockReading[];
  elementalHarmony: string;
  primaryAffirmation: string;
  clarifierReading?: {
    card: TarotCardData;
    isReversed: boolean;
    relationshipAnalysis: string;
    followUpAdvice: string;
    followUpAffirmation: string;
  };
}

// -------------------------------------------------------------
// 2. PDF 기반 타로 상담 실전 대화 코퍼스 (8대 고민 분야 23개 세부 상황)
// -------------------------------------------------------------
export const TAROT_COUNSELING_CORPUS: CorpusEntry[] = [
  // 1. [연애 & 애정운] 짝사랑·재회·권태·이별 불안
  {
    domain: 'love',
    domainName: '연애 & 애정운',
    subCategory: 'love_crush',
    name: '짝사랑 / 탐색',
    keywords: ['짝사랑', '썸', '호감', '그 사람', '그녀', '속마음', '좋아하', '관심', '태도', '탐색', '고백', '남친', '여친'],
    psychologicalReading: '상대방의 태도가 모호한 것은 거절이 아니라, 본인의 감정에 확신이 서지 않아 신중하게 관망하는 흐름입니다.',
    actionAdvice: '고백을 서두르기보다 사소한 일상 대화의 빈도를 늘려 편안함을 먼저 심어주세요.',
    affirmation: '당신의 온기는 이미 충분히 전해지고 있으니 조급해하지 마세요.'
  },
  {
    domain: 'love',
    domainName: '연애 & 애정운',
    subCategory: 'love_reunion',
    name: '재회 / 미련',
    keywords: ['재회', '미련', '다시 만', '헤어', '전남친', '전여친', '연락 올', '연락할', '이별 후', '돌아올', '다시 시작'],
    psychologicalReading: '상대방 역시 이별 후 공허함과 그리움을 느끼고 있지만, 과거의 해묵은 갈등과 자존심 탓에 멈춰 서 있습니다.',
    actionAdvice: '감정적인 연락은 방어벽을 높입니다. 갈등의 원인이 실질적으로 해결될 수 있는지 먼저 자문하세요.',
    affirmation: '닿을 인연이라면 더 단단해져 만날 것이고, 아니라면 더 귀한 사랑이 옵니다.'
  },
  {
    domain: 'love',
    domainName: '연애 & 애정운',
    subCategory: 'love_boredom',
    name: '권태 / 거리감',
    keywords: ['권태', '거리감', '식었', '변했', '소원', '지루', '무미건조', '싸움', '정체', '예전같지', '서운'],
    psychologicalReading: '애정이 식었다기보다 편안함이 지나쳐 관계에 필요한 상호 노력이 잠시 방전된 정체기입니다.',
    actionAdvice: '서운함을 침묵으로 풀지 말고, 익숙한 루틴을 벗어나 둘만의 낯선 경험과 배움을 시도하세요.',
    affirmation: '잔잔해진 파도는 끝이 아니라 더 깊은 바다로 함께 나아가는 과정입니다.'
  },
  {
    domain: 'love',
    domainName: '연애 & 애정운',
    subCategory: 'love_breakup',
    name: '이별 직후 / 상실',
    keywords: ['이별', '헤어짐', '끝났', '슬픔', '차였', '상실', '울적', '홀로', '혼자', '이별직후'],
    psychologicalReading: '마음의 중심이 무너져 내린 듯한 상실감 속에서 혼자만의 긴 터널을 지나고 계시는 형상입니다.',
    actionAdvice: '억지로 괜찮은 척 덮지 마세요. 슬픔을 충분히 애도해야 그 자리에 새살이 돋아납니다.',
    affirmation: '당신의 존재 가치는 누군가의 곁에 머물 때만 빛나는 것이 아닙니다.'
  },
  {
    domain: 'love',
    domainName: '연애 & 애정운',
    subCategory: 'love_attachment',
    name: '불안형 집착',
    keywords: ['집착', '불안', '연락 텀', '의심', '초조', '확인', '안절부절', '질투', '연락'],
    psychologicalReading: '연락 텀 하나에 일상이 흔들리는 것은 상대에 대한 사랑을 넘어 상처받기 두려운 방어기제입니다.',
    actionAdvice: '핸드폰을 내려놓고 나만의 성취감을 주는 1시간 루틴을 엄격하게 지켜내 보세요.',
    affirmation: '혼자서도 온전할 수 있을 때, 관계는 비로소 가장 자유롭고 아름다워집니다.'
  },

  // 2. [상처 극복 & 트라우마] 배신·가스라이팅·자책 치유
  {
    domain: 'trauma',
    domainName: '상처 극복 & 트라우마',
    subCategory: 'trauma_betrayal',
    name: '믿음의 배신 / 기만',
    keywords: ['배신', '기만', '바람', '거짓말', '속았', '상처', '가스라이팅', '사기', '이용당', '뒤통수'],
    psychologicalReading: '순수하게 주었던 마음이 기만당했다는 충격으로 인해 세상과 사람 전체에 대한 방어벽이 높아진 상태입니다.',
    actionAdvice: '상대의 부정직함은 상대의 몫입니다. 나의 선했던 진심까지 어리석었다고 폄하하지 마세요.',
    affirmation: '흙탕물이 튀었어도 당신이라는 원석의 본질은 조금도 훼손되지 않았습니다.'
  },
  {
    domain: 'trauma',
    domainName: '상처 극복 & 트라우마',
    subCategory: 'trauma_regret',
    name: '자책과 후회',
    keywords: ['자책', '후회', '내가 왜', '바보같', '죄책감', '실수', '과거', '자괴감', '내 탓', '괴로워'],
    psychologicalReading: '\'내가 왜 그랬을까\'라는 끊임없는 반추가 과거의 감옥에 스스로를 결박하고 있습니다.',
    actionAdvice: '그때의 당신은 당신이 가진 자원과 시야 안에서 최선을 다했습니다. 이제 스스로를 석방하세요.',
    affirmation: '지나간 과거를 바꿀 순 없지만, 그 기억을 대하는 오늘의 시선은 바꿀 수 있습니다.'
  },

  // 3. [진로 & 직무 탐색] 방향성 상실·안정 vs 도전·번아웃
  {
    domain: 'career',
    domainName: '진로 & 직무 탐색',
    subCategory: 'career_stability_challenge',
    name: '안정 vs 도전',
    keywords: ['안정', '도전', '리스크', '새로운 시도', '퇴사 고민', '도전할까', '안주', '모험', '선택'],
    psychologicalReading: '머리는 현실적인 안정을 계산하고 있지만, 심장은 도전하지 않았을 때 남을 후회를 경고하고 있습니다.',
    actionAdvice: '전부를 거는 올인 대신, 퇴근 후 작은 사이드 프로젝트나 스터디로 리스크 없이 가설을 검증하세요.',
    affirmation: '어떤 길을 가든 정답은 길 위에 있지 않고, 당신이 내딛는 발걸음이 정답을 만듭니다.'
  },
  {
    domain: 'career',
    domainName: '진로 & 직무 탐색',
    subCategory: 'career_aptitude',
    name: '적성 혼란 / 방향 상실',
    keywords: ['적성', '진로', '좋아하는 일', '잘하는 일', '꿈', '방향성', '혼란', '진로 고민', '길을 잃', '무엇을'],
    psychologicalReading: '내가 잘하는 것과 좋아하는 것, 그리고 돈이 되는 것 사이에서 기준점이 흔들려 에너지가 분산된 상태입니다.',
    actionAdvice: '거창한 꿈을 찾기보다, 하루 중 시간 가는 줄 모르고 몰입했던 30분의 순간들을 기록해 보세요.',
    affirmation: '남들의 속도에 맞추지 마세요. 당신만의 고유한 궤도가 만들어지는 중입니다.'
  },
  {
    domain: 'career',
    domainName: '진로 & 직무 탐색',
    subCategory: 'career_turnover',
    name: '이직 타이밍',
    keywords: ['이직', '회사', '퇴사', '새 직장', '연봉', '커리어', '이직 고민', '직장 옮기', '헤드헌터'],
    psychologicalReading: '현재의 터전에서는 배울 수 있는 자산과 성취가 한계에 다다라 무기력함이 껍질처럼 굳어지고 있습니다.',
    actionAdvice: '감정적으로 퇴사하기보다 내 역량을 숫자로 증명할 수 있는 포트폴리오부터 객관화하세요.',
    affirmation: '익숙한 항구를 벗어나는 용기가 더 광활한 바다의 보물을 마주하게 합니다.'
  },
  {
    domain: 'career',
    domainName: '진로 & 직무 탐색',
    subCategory: 'career_burnout',
    name: '직무 번아웃',
    keywords: ['번아웃', '소진', '지침', '야근', '과로', '무기력', '의욕', '업무 스트레스', '일하기 싫', '방전'],
    psychologicalReading: '책임감이 지나쳐 스스로의 소진 상태를 외면한 채 달려오다 엔진의 오일이 완전히 마른 모습입니다.',
    actionAdvice: '오늘 당장 생산성을 증명하려 하지 마세요. 완벽주의를 내려놓고 거절하는 연습을 시작하세요.',
    affirmation: '잠시 멈추어 숨을 고르는 것은 도태가 아니라 생존과 도약을 위한 지혜입니다.'
  },

  // 4. [취업 & 시험] 불합격 불안·면접 트라우마·장기 수험
  {
    domain: 'exam',
    domainName: '취업 & 시험',
    subCategory: 'exam_rejection',
    name: '서류 / 면접 탈락',
    keywords: ['불합격', '탈락', '낙방', '서류 탈락', '면접 탈락', '서탈', '면탈', '취업 실패', '광탈'],
    psychologicalReading: '역량의 부족이 아니라 회사의 타이밍과 조직 핏의 불일치인데, 존재 자체를 부정당한 듯 위축되어 있습니다.',
    actionAdvice: '탈락 결과에 감정을 섞지 말고 채용 전형의 문항과 답변을 객관적으로 복기해 핏을 재조정하세요.',
    affirmation: '이번 불합격은 실패가 아니라, 당신의 가치를 알아볼 더 알맞은 곳으로의 재배치입니다.'
  },
  {
    domain: 'exam',
    domainName: '취업 & 시험',
    subCategory: 'exam_slump',
    name: '수험 슬럼프',
    keywords: ['수험', '고시', '공시', '시험', '공부', '집중', '슬럼프', '합격', '수능', '자격증', '독서실'],
    psychologicalReading: '장기화된 고립 속에서 \'이번에도 안 되면 어쩌지\'라는 결과 중심적 공포가 집중력을 갉아먹고 있습니다.',
    actionAdvice: '최종 합격이라는 먼 산을 보지 말고, 오직 오늘 계획한 3시간 분량의 완결에만 시야를 좁히세요.',
    affirmation: '흙 속에 묻힌 씨앗이 어둠 속에서 뿌리를 내리듯, 성장은 보이지 않게 완성됩니다.'
  },
  {
    domain: 'exam',
    domainName: '취업 & 시험',
    subCategory: 'exam_interview',
    name: '면접 울렁증',
    keywords: ['면접', '울렁증', '긴장', '발표', '심사', '떨림', '말문', '면접관', '얼어붙'],
    psychologicalReading: '평가관의 시선을 \'심판관\'으로 인식하여 자신의 본래 기량 절반도 꺼내지 못하고 얼어붙는 형국입니다.',
    actionAdvice: '면접은 시험이 아니라 함께 일할 동료를 찾는 대화입니다. 완벽한 모범답안 대신 진정성을 보이세요.',
    affirmation: '떨림은 당신이 그만큼 이 일을 진심으로 원하고 있다는 열정의 또 다른 이름입니다.'
  },

  // 5. [사업 & 스타트업] 창업 리스크·매출 정체·동업 갈등
  {
    domain: 'business',
    domainName: '사업 & 스타트업',
    subCategory: 'business_early',
    name: '창업 초기 리스크',
    keywords: ['창업', '사업 시작', '스타트업', '초기', '창업 준비', '대표', '고립감', '자금 압박', '사업'],
    psychologicalReading: '화려한 성공 비전 이면에 모든 책임을 홀로 져야 한다는 고립감과 자금 압박의 중압감이 엿보입니다.',
    actionAdvice: '초기에는 거창한 외형 확장보다 단 한 명의 진성 고객을 만족시키는 제품 핏에 집중하세요.',
    affirmation: '모든 거대한 나무도 작은 씨앗에서 시작되었습니다. 당신의 통찰을 믿으세요.'
  },
  {
    domain: 'business',
    domainName: '사업 & 스타트업',
    subCategory: 'business_stagnation',
    name: '매출 부진 / 정체',
    keywords: ['매출', '부진', '적자', '판매', '수익성', '마케팅', '고객 이탈', '장사', '손님', '매출 정체'],
    psychologicalReading: '과거에 통했던 성공 방식의 관성에 갇혀 변화된 시장 트렌드와 고객의 목소리를 놓치고 있는 흐름입니다.',
    actionAdvice: '마케팅 비용만 늘리지 마시고 이탈 고객이 남긴 가장 아픈 피드백부터 수술대에 올리세요.',
    affirmation: '지표의 정체는 실패의 징조가 아니라, 비즈니스 모델을 견고히 다질 리빌딩의 기회입니다.'
  },
  {
    domain: 'business',
    domainName: '사업 & 스타트업',
    subCategory: 'business_partner',
    name: '동업자 갈등',
    keywords: ['동업', '파트너', '지분', '계약', '동업자', '의사결정', '섭섭', '갈등', '지분 싸움'],
    psychologicalReading: '신뢰라는 이름 아래 역할과 보상의 경계가 모호해져 오해와 섭섭함이 임계점에 달한 상태입니다.',
    actionAdvice: '친분 뒤에 숨지 마시고 지분, 업무 범위, 의사결정 권한을 명문화된 계약서로 재정립하세요.',
    affirmation: '투명한 원칙이야말로 가장 오래도록 건강한 파트너십을 지켜내는 방패입니다.'
  },

  // 6. [금전 & 투자] 투자 손실·빚/유동성 위기·충동 소비
  {
    domain: 'finance',
    domainName: '금전 & 투자',
    subCategory: 'finance_fomo',
    name: '투자 손실 / FOMO',
    keywords: ['주식', '코인', '투자', '손실', '물렸', '급등', 'fomo', '원금', '베팅', '물타기', '코인 손실'],
    psychologicalReading: '남들의 수익에 대한 조급함이 냉철한 분석을 압도하여 원금을 회복하려는 무리한 베팅으로 이어지는 양상입니다.',
    actionAdvice: '손실 확정의 공포를 직시하고 손절 기준을 기계적으로 세우세요. 시장을 떠나지 않는 것이 1원칙입니다.',
    affirmation: '계좌의 손실이 인생의 실패를 뜻하지 않습니다. 수업료를 치르고 더 지혜로운 투자자가 됩니다.'
  },
  {
    domain: 'finance',
    domainName: '금전 & 투자',
    subCategory: 'finance_liquidity',
    name: '빚 / 유동성 위기',
    keywords: ['빚', '대출', '채무', '유동성', '돌려막기', '카드값', '생활비', '파산', '회생', '이자', '돈 부족'],
    psychologicalReading: '돌려막기와 불확실한 수입 사이에서 하루하루 피가 마르는 긴장감을 버텨내고 계시는 모습입니다.',
    actionAdvice: '불필요한 고정 지출을 극단적으로 줄이고 채무 조정이나 공적 지원 창구를 즉시 확인하세요.',
    affirmation: '현금 흐름의 소나기는 지나갑니다. 움츠러든 지금의 절약이 단단한 기초 체력이 됩니다.'
  },
  {
    domain: 'finance',
    domainName: '금전 & 투자',
    subCategory: 'finance_stress_spending',
    name: '스트레스 충동 소비',
    keywords: ['소비', '충동구매', '쇼핑', '지출', '텅장', '잔고', '스트레스 해소', '돈 낭비', '시발비용'],
    psychologicalReading: '마음의 공허함과 분노를 물질의 구매로 채우려다 통장 잔고를 보며 다시 자책하는 악순환에 빠져 있습니다.',
    actionAdvice: '결제 버튼을 누르기 전 24시간 장바구니 보류 규칙을 두고, 감정의 허기를 산책이나 운동으로 달래세요.',
    affirmation: '물질이 채우지 못한 내면의 빈자리는 나 자신을 향한 따뜻한 관심으로 채워집니다.'
  },

  // 7. [건강 & 심신 회복] 만성 피로·불안/공황·불면증
  {
    domain: 'health',
    domainName: '건강 & 심신 회복',
    subCategory: 'health_lethargy',
    name: '만성 무기력 / 피로',
    keywords: ['피로', '무기력', '만성 피로', '방전', '기력', '체력', '몸살', '아침에 못', '지침', '건강'],
    psychologicalReading: '정신은 어떻게든 일어서려 하지만 몸이 방전 경고등을 켜고 모든 기능을 강제로 멈춰 세운 형상입니다.',
    actionAdvice: '게으름이 아닙니다. 자책을 즉시 중단하고 햇빛을 쬐며 10분 걷는 것 외엔 아무것도 강요하지 마세요.',
    affirmation: '쉬는 것 또한 치열한 삶의 연장선입니다. 회복을 허락할 자격이 당신에게 있습니다.'
  },
  {
    domain: 'health',
    domainName: '건강 & 심신 회복',
    subCategory: 'health_insomnia',
    name: '수면 장애 / 불면증',
    keywords: ['불면', '잠', '수면', '새벽', '악몽', '뒤척', '잠을 못', '잠이 안', '수면제'],
    psychologicalReading: '잠자리에 누워서도 뇌가 미래의 재앙 시나리오를 끝없이 검토하느라 깊은 잠의 영역으로 들어가지 못합니다.',
    actionAdvice: '잠들기 전 머릿속 걱정거리를 종이에 모조리 쏟아내 적어두고 물리적으로 덮어두세요.',
    affirmation: '밤은 고민을 해결하는 시간이 아닙니다. 밤새 내려놓아도 세상은 무너지지 않습니다.'
  },
  {
    domain: 'health',
    domainName: '건강 & 심신 회복',
    subCategory: 'health_panic',
    name: '불안 / 호흡 곤란 / 공황',
    keywords: ['공황', '가슴 답답', '호흡', '불안발작', '심장', '두근', '공포', '과호흡', '숨이 막'],
    psychologicalReading: '통제할 수 없는 일들에 대한 두려움이 교감신경을 과활성화시켜 가슴을 짓누르고 있습니다.',
    actionAdvice: '숨을 4초 들이쉬고 7초 멈춘 뒤 8초간 길게 내쉬는 호흡법으로 심박수를 안정시키세요.',
    affirmation: '이 불안은 지나가는 구름일 뿐 당신을 파괴할 수 없습니다. 당신은 지금 안전합니다.'
  },

  // 8. [미래 & 삶의 전환기] 인생의 방향·새로운 결단·영적 성장
  {
    domain: 'turning_point',
    domainName: '미래 & 삶의 전환기',
    subCategory: 'turning_cycle',
    name: '주기(Cycle) 전환 / 대변혁',
    keywords: ['변화', '주기', '운', '흐름', '새출발', '터닝포인트', '전환기', '패러다임', '새 시대', '운세'],
    psychologicalReading: '오랫동안 유지되던 묵은 환경이 정리되고 삶의 패러다임 자체가 바뀌는 커다란 변곡점에 서 있습니다.',
    actionAdvice: '떠나가는 것들을 억지로 붙잡지 마세요. 빈 공간이 생겨야 새로운 기회가 깃들 수 있습니다.',
    affirmation: '해체되는 것은 무너짐이 아니라, 더 웅장한 집을 짓기 위한 터 닦기입니다.'
  },
  {
    domain: 'turning_point',
    domainName: '미래 & 삶의 전환기',
    subCategory: 'turning_decision',
    name: '중대한 결단 / 기로',
    keywords: ['결정', '선택', '결단', '기로', '용기', '인생 방향', '미래', '어떤 선택', '중요한 결정'],
    psychologicalReading: '주변의 시선, 도덕적 잣대, 타인의 기대 속에서 진정한 내면의 목소리가 가려진 형상입니다.',
    actionAdvice: '10년 뒤의 내가 지금의 나를 돌아봤을 때 더 자랑스러워할 결단이 무엇인지 심장에 물으세요.',
    affirmation: '당신에게는 당신 삶의 선장이 되어 키를 잡을 권리와 힘이 충분히 있습니다.'
  },
  {
    domain: 'turning_point',
    domainName: '미래 & 삶의 전환기',
    subCategory: 'turning_spiritual',
    name: '영적 갈증 / 자아 성찰',
    keywords: ['의미', '공허', '자아', '인생', '영혼', '왜 사나', '가치', '성장', '깨달음', '성찰'],
    psychologicalReading: '물질적 조건은 갖추어졌으나 영혼의 공허함이 커져 진정한 삶의 의미를 탐색하는 시기입니다.',
    actionAdvice: '사회적 타이틀을 떼어낸 순수한 나 자신이 언제 진심으로 웃는지 관찰하고 기록하세요.',
    affirmation: '당신의 여정은 헛되지 않았으며, 이제 진정한 나를 만나는 순례가 시작됩니다.'
  }
];

// -------------------------------------------------------------
// 3. 카드 속성별 (원소/수트) 공통 매핑 키워드 및 조언 템플릿 (PDF Page 5)
// -------------------------------------------------------------
export const SUIT_ELEMENT_TEMPLATES: Record<string, {
  energy: string;
  reading: string;
  action: string;
}> = {
  wands: {
    energy: '불 / 열정·추진 (직관, 행동력, 에너지, 창의성, 성급함)',
    reading: '열정이 넘쳐나지만 방향성이 명확하지 않아 에너지가 사방으로 튀고 있는 흐름입니다.',
    action: '생각이 너무 많아지기 전에 일단 행동으로 부딪히며 현장에서 길을 수정하세요.'
  },
  cups: {
    energy: '물 / 감정·관계 (공감, 직관, 사랑, 연민, 감정 과잉)',
    reading: '이성적인 판단보다는 마음의 감정선과 관계의 서운함이 상황을 크게 지배하고 있습니다.',
    action: '옳고 그름을 따지지 말고, 억눌려온 내 솔직한 감정을 먼저 인정하고 표현하세요.'
  },
  swords: {
    energy: '공기 / 사고·결단 (이성, 분석, 스트레스, 단절, 결단)',
    reading: '머릿속 생각이 꼬리를 물며 과부하가 걸려 스스로 만든 걱정에 갇힌 상태입니다.',
    action: '감정을 배제하고 사실(Fact)과 상상을 분리하여 단호한 결단을 내려야 합니다.'
  },
  pentacles: {
    energy: '흙 / 현실·물질 (현실 감각, 안정, 돈, 인내, 신체 건강)',
    reading: '눈앞의 결과가 즉각 나오지 않더라도 오랜 시간 공들인 기반이 축적되는 단계입니다.',
    action: '일확천금을 바라지 말고 매일의 성실한 루틴과 현실적 지표 관리에 집중하세요.'
  }
};

// -------------------------------------------------------------
// 4. 질문 심층 분석 및 코퍼스 최적 매칭 알고리즘
// -------------------------------------------------------------
export function classifyUserConcern(rawQuestion: string): CorpusEntry {
  const q = rawQuestion.toLowerCase().trim();

  if (!q) {
    return TAROT_COUNSELING_CORPUS.find(c => c.subCategory === 'turning_decision')!;
  }

  let bestEntry = TAROT_COUNSELING_CORPUS[0];
  let maxScore = -1;

  for (const entry of TAROT_COUNSELING_CORPUS) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length >= 3 ? 3 : 2; // 구체적 키워드일수록 높은 가중치
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestEntry = entry;
    }
  }

  // 매칭된 키워드가 전혀 없을 경우 기본 분류
  if (maxScore <= 0) {
    if (q.includes('선택') || q.includes('어떻게') || q.includes('할까')) {
      return TAROT_COUNSELING_CORPUS.find(c => c.subCategory === 'turning_decision')!;
    }
    return TAROT_COUNSELING_CORPUS.find(c => c.subCategory === 'turning_cycle')!;
  }

  return bestEntry;
}

// 78장 카드별 고유 확언 사전
export const CARD_AFFIRMATIONS: Record<string, string> = {
  // Major Arcana (22)
  'the-fool': '과거의 두려움을 훌훌 털어내고, 나는 가벼운 발걸음으로 눈부신 새 출발을 향해 나아갑니다.',
  'the-magician': '내 안에는 원하는 현실을 능동적으로 창조해 낼 무한한 재능과 기회가 이미 깃들어 있습니다.',
  'the-high-priestess': '내면의 고요한 침묵 속에서 떠오르는 맑은 직관이 나에게 가장 바른 길을 환히 비춥니다.',
  'the-empress': '나는 삶이 건네는 풍요와 사랑을 온전히 누릴 자격이 있는 존귀하고 아름다운 존재입니다.',
  'the-emperor': '흔들리지 않는 책임감과 내면의 질서가 내 삶을 가장 든든하고 견고한 반석 위에 세웁니다.',
  'the-hierophant': '서로를 향한 존중과 따뜻한 소통 속에서, 나를 이끌어줄 깊은 지혜와 신뢰의 문이 열립니다.',
  'the-lovers': '내 영혼이 진정으로 가리키는 순수한 사랑과 선택을 믿으며, 평화로운 조화를 이룹니다.',
  'the-chariot': '어떤 시련 앞에서도 굴하지 않고, 나의 목표를 향해 흔들림 없이 당당하게 전진합니다.',
  'strength': '거친 파도보다 부드러운 인내와 자비로운 용기가 내 안의 모든 두려움을 온화하게 다스립니다.',
  'the-hermit': '외부의 소음을 잠시 끄고 내면의 등불을 밝힐 때, 비로소 진정한 내 삶의 이정표가 보입니다.',
  'wheel-of-fortune': '삶의 변화를 두려움 없이 기쁘게 맞이하며, 새로운 행운의 흐름을 주도적으로 탑니다.',
  'justice': '치우침 없는 정직하고 맑은 시선이 나에게 가장 공정하고 명쾌한 해답을 가져다줍니다.',
  'the-hanged-man': '잠시 멈춰 서서 시선을 전환할 때, 이전에는 보지 못했던 깊은 지혜와 자유를 얻습니다.',
  'death': '낡은 껍질을 미련 없이 벗어던질 때, 나는 한층 눈부시고 성숙한 새 생명으로 다시 태어납니다.',
  'temperance': '상반된 감정과 상황들을 유연하게 조화시키며, 내 삶에 고요하고 온전한 평안을 회복합니다.',
  'the-devil': '나를 옭아매던 불필요한 집착과 불안을 과감히 끊어내고, 온전한 내면의 자유를 누립니다.',
  'the-tower': '낡은 환상이 무너진 자리에 비로소 흔들리지 않는 진실과 단단한 새 희망이 피어납니다.',
  'the-star': '어둠이 짙을수록 나의 희망은 더욱 찬란하게 빛나며, 나를 가장 평화로운 길로 인도합니다.',
  'the-moon': '막연한 불안의 안개를 걷어내고, 내 안의 순수하고 고요한 직관의 빛을 신뢰합니다.',
  'the-sun': '나의 오늘은 기쁨과 생명력으로 충만하며, 나아가는 걸음마다 눈부신 축복이 함께합니다.',
  'judgement': '오랜 망설임의 잠에서 깨어나, 나의 진정한 가치와 가능성을 향해 힘차게 비상합니다.',
  'the-world': '하나의 긴 여정을 완성한 나 자신을 축복하며, 더 넓고 풍요로운 세상으로 도약합니다.',

  // Wands (14)
  'wands-1': '내 가슴속에 타오르는 열정의 불꽃은 언제나 새로운 길을 환하게 밝히는 시작입니다.',
  'wands-2': '더 넓은 세상을 바라보며, 나는 균형 잡힌 혜안으로 나의 미래를 주도적으로 설계합니다.',
  'wands-3': '내가 정성껏 띄워 보낸 희망의 배는 머지않아 값진 소식과 성장을 싣고 돌아옵니다.',
  'wands-4': '내가 이룬 작은 성취를 온 마음으로 축하하며, 든든하고 평화로운 안식처를 누립니다.',
  'wands-5': '다양한 의견과 도전 속에서 나는 한층 더 지혜롭고 단단한 내면으로 성장합니다.',
  'wands-6': '나의 노력과 진심은 마침내 빛을 발하며, 많은 이들의 인정과 승리의 기쁨을 맞이합니다.',
  'wands-7': '어떤 압박 속에서도 나의 신념과 자존감을 지켜내며, 꿋꿋하게 나의 자리를 수호합니다.',
  'wands-8': '막혔던 흐름이 시원하게 트이고, 긍정적인 소식과 추진력이 내 삶에 빠르게 깃듭니다.',
  'wands-9': '마지막 고비 앞에서도 나는 포기하지 않으며, 나에게는 끝까지 완주할 힘이 있습니다.',
  'wands-10': '불필요한 짐을 기꺼이 내려놓음으로써, 나는 다시 가볍고 자유로운 호흡을 되찾습니다.',
  'wands-11': '풋풋한 호기심과 순수한 배움의 열정으로, 새로운 도전의 문을 기쁘게 두드립니다.',
  'wands-12': '가슴 뛰는 열정과 거침없는 추진력으로, 나는 나의 꿈을 향해 용기 있게 질주합니다.',
  'wands-13': '따뜻한 활력과 당당한 자신감으로, 나는 나 자신을 사랑하고 세상을 밝게 비춥니다.',
  'wands-14': '확고한 비전과 지혜로운 리더십으로, 나는 상황을 주도하며 바른 길을 이끕니다.',

  // Cups (14)
  'cups-1': '마르지 않는 순수한 사랑과 치유의 샘이 내 마음 깊은 곳에서 맑게 솟아납니다.',
  'cups-2': '서로를 향한 따뜻한 이해와 존중이 세상에서 가장 단단하고 아름다운 다리가 됩니다.',
  'cups-3': '마음 맞는 소중한 이들과 기쁨을 함께 나누며, 내 삶은 풍요로운 유대감으로 물듭니다.',
  'cups-4': '지루함의 그늘을 걷어내고, 지금 내 곁에 조용히 건네지고 있는 축복에 눈을 엽니다.',
  'cups-5': '흘러간 슬픔을 담담히 배웅하고, 여전히 내 곁에 온전히 남아 있는 소중함을 안아줍니다.',
  'cups-6': '순수했던 어린 시절의 동심과 따뜻한 추억이 오늘 나에게 포근한 위로를 건넵니다.',
  'cups-7': '복잡한 미혹에서 벗어나, 내 가슴이 진정으로 원하는 가장 진실한 길을 선택합니다.',
  'cups-8': '더 큰 영혼의 성장을 위해, 나는 익숙하지만 낡은 집착을 담담하고 용기 있게 떠납니다.',
  'cups-9': '내 안의 소망이 아름답게 결실을 맺으며, 나는 온전한 만족과 감사를 누립니다.',
  'cups-10': '가족과 공동체 안에서 흐르는 사랑과 평화가 내 삶을 가장 따뜻하게 감싸 안아줍니다.',
  'cups-11': '섬세한 감수성과 직관을 소중히 여기며, 다정한 마음으로 세상의 아름다움을 느낍니다.',
  'cups-12': '진심 어린 따뜻한 고백과 정성으로, 나는 상대방의 마음에 부드럽게 가닿습니다.',
  'cups-13': '바다처럼 깊고 온화한 사랑으로 내 상처를 보듬고, 타인을 품어 안는 힐러가 됩니다.',
  'cups-14': '감정의 파도에 휩쓸리지 않고, 내면의 깊은 평정심과 지혜로 평화를 지켜냅니다.',

  // Swords (14)
  'swords-1': '맑고 투명한 진실의 검으로, 나는 모든 혼란을 명료하게 가르고 올바른 길을 선택합니다.',
  'swords-2': '두려움의 눈가리개를 벗고, 내 마음의 중심을 믿으며 단호하게 선택의 문을 엽니다.',
  'swords-3': '아픈 상처 속에서도 새로운 깨달음이 싹트며, 나의 가슴은 더 깊고 단단해집니다.',
  'swords-4': '지친 마음과 생각에 고요한 휴식을 선물하며, 나는 온전한 내면의 평온을 회복합니다.',
  'swords-5': '상처뿐인 승리보다 평화로운 공존을 택하며, 불필요한 자존심의 끈을 놓아줍니다.',
  'swords-6': '거친 파도를 지나 잔잔한 바다로 나아가듯, 내 삶은 더 평화롭고 안전한 곳으로 향합니다.',
  'swords-7': '눈앞의 편법 대신 정직하고 당당한 길을 걸을 때, 나의 앞길은 떳떳하고 안전합니다.',
  'swords-8': '스스로 만든 생각의 감옥을 부수고, 나는 언제든 자유롭게 날아오를 수 있음을 깨닫습니다.',
  'swords-9': '밤을 어지럽히던 두려움은 환상일 뿐이며, 나는 고요한 호흡으로 마음에 안식을 찾습니다.',
  'swords-10': '어둠의 밤이 완전히 지나가고, 내 삶의 지평선 위로 희망찬 새벽의 태양이 떠오릅니다.',
  'swords-11': '예리한 호기심과 날카로운 관찰력으로, 나는 세상을 바르게 분별하고 진실을 배웁니다.',
  'swords-12': '주저함 없는 용기와 신속한 결단으로, 나는 가로막힌 장벽을 시원하게 돌파합니다.',
  'swords-13': '감정에 치우치지 않는 명석한 지혜와 독립심으로, 나는 나의 삶을 주체적으로 이끕니다.',
  'swords-14': '공정하고 명쾌한 원칙과 정의로운 시선으로, 나는 가장 바른 결정을 내립니다.',

  // Pentacles (14)
  'pentacles-1': '내 손에 쥐어진 기회의 씨앗을 정성껏 심어, 풍요롭고 결실 있는 현실을 빚어냅니다.',
  'pentacles-2': '삶의 변화와 여러 과제들 속에서도, 나는 유연하고 즐거운 마음으로 균형을 유지합니다.',
  'pentacles-3': '서로의 역량을 존중하는 아름다운 협력을 통해, 우리는 더 위대한 가치를 완성합니다.',
  'pentacles-4': '가진 것에 감사하되 움켜쥔 손을 펴고, 풍요로운 삶의 순환을 흔쾌히 받아들입니다.',
  'pentacles-5': '가장 추운 순간에도 나를 지켜줄 따뜻한 안식처와 도움의 손길이 항상 곁에 있습니다.',
  'pentacles-6': '내가 받은 은혜에 감사하고 아낌없이 베풀 때, 더 큰 풍요와 축복이 내게로 흘러옵니다.',
  'pentacles-7': '조급함을 내려놓고 정성의 시간을 신뢰하며, 나는 인내로써 달콤한 열매를 기다립니다.',
  'pentacles-8': '매일의 성실한 몰입과 장인 정신이 내 실력을 날마다 더 깊고 눈부시게 단련합니다.',
  'pentacles-9': '나의 노력으로 일궈낸 자립과 풍요를 누리며, 나는 여유롭고 품격 있는 삶을 즐깁니다.',
  'pentacles-10': '대대로 이어질 든든한 기반과 축복 속에서, 우리 모두의 삶은 평안하고 넉넉합니다.',
  'pentacles-11': '겸손한 자세로 배움을 흡수하며, 나는 실용적인 지혜를 차근차근 내 것으로 만듭니다.',
  'pentacles-12': '느리지만 흔들림 없는 성실함과 끈기로, 나는 끝내 원하는 목표를 성취해 냅니다.',
  'pentacles-13': '대지처럼 넉넉하고 따뜻한 품으로, 나는 나와 내 주변을 아늑하고 풍요롭게 돌봅니다.',
  'pentacles-14': '풍부한 경험과 견고한 현실 감각으로, 나는 삶의 모든 영역을 안정되게 번영시킵니다.'
};

// -------------------------------------------------------------
// 5. 3-Block UI 맞춤형 해석 생성 엔진
//    [1. 심리 리딩 (상황 해석)] ➔ [2. 구체적 행동 조언] ➔ [3. 온기 있는 확언]
// -------------------------------------------------------------
export function generateInterpretation(
  rawQuestion: string,
  drawnCards: DrawnCard[]
): ReadingResult {
  const question = rawQuestion.trim() || '나의 성장과 삶의 올바른 선택을 위한 지혜와 조언';
  const matchedCorpus = classifyUserConcern(question);

  const cardReadings: SingleCardBlockReading[] = drawnCards.map((drawn) => {
    const { card, isReversed, positionName, positionMeaning } = drawn;
    const keywords = isReversed ? card.keywordsReversed : card.keywordsUpright;

    // 수트/원소별 매핑 정보 획득
    let suitKey = card.suit || '';
    if (!suitKey) {
      if (card.element.includes('불')) suitKey = 'wands';
      else if (card.element.includes('물')) suitKey = 'cups';
      else if (card.element.includes('공기')) suitKey = 'swords';
      else suitKey = 'pentacles';
    }
    const suitTemplate = SUIT_ELEMENT_TEMPLATES[suitKey] || SUIT_ELEMENT_TEMPLATES.wands;

    // 1. 관찰 (Observation): 유니버셜 덱 도상 객관 관찰
    const observation = `${card.observation} ${card.universalSymbol}`;

    // 2. [1. 심리 리딩 (상황 해석)]: 자리/시점 맥락에 맞춘 입체적 내면 해석 (문장 복제 방지)
    let slotType = 'present';
    const p = (positionName || '').toLowerCase();
    if (p.includes('과거') || p.includes('past') || p.includes('원인') || p.includes('뿌리') || p.includes('4.') || p.includes('3.')) {
      slotType = 'past';
    } else if (p.includes('미래') || p.includes('future') || p.includes('결실') || p.includes('6.') || p.includes('10.') || p.includes('결과')) {
      slotType = 'future';
    } else if (p.includes('도전') || p.includes('장애') || p.includes('challenge') || p.includes('2.')) {
      slotType = 'challenge';
    } else if (p.includes('목표') || p.includes('이상') || p.includes('crown') || p.includes('5.')) {
      slotType = 'goal';
    } else if (p.includes('태도') || p.includes('자신') || p.includes('self') || p.includes('7.')) {
      slotType = 'self';
    } else if (p.includes('환경') || p.includes('시선') || p.includes('environment') || p.includes('8.')) {
      slotType = 'environment';
    } else if (p.includes('희망') || p.includes('두려움') || p.includes('hope') || p.includes('9.')) {
      slotType = 'hopes_fears';
    }

    const up0 = card.keywordsUpright[0] || '균형';
    const up1 = card.keywordsUpright[1] || up0;
    const rev0 = card.keywordsReversed[0] || '혼란';
    const rev1 = card.keywordsReversed[1] || rev0;

    let psychologicalReading = '';
    if (slotType === 'past') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 지나온 시간 속에서 축적해 온 '${up0}'와(과) '${up1}'의 소중한 경험이 현재 상황을 떠받치는 단단한 바탕이 되었습니다. 과거에 기울였던 정성과 배움이 헛되지 않았음을 신뢰하세요.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 과거의 여정에서 겪었던 '${rev0}'이나 '${rev1}'에 대한 미련과 아쉬움이 여전히 마음 한구석에 무거운 잔상으로 머물러 있을 수 있습니다. 지나간 시간에 얽매이기보다 그 속에서 배운 교훈만 가볍게 취할 때입니다.`;
      }
    } else if (slotType === 'future') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 지금의 올바른 정성과 실천이 이어진다면, 머지않아 '${up0}'의 확고한 성취와 함께 '${up1}'의 풍요로운 결실을 맞이하게 됩니다. 상황은 막힘없이 순조로운 확장으로 나아가게 될 것입니다.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 앞으로 펼쳐질 과정에서 '${rev0}'이나 '${rev1}'와 같은 조급한 소모전을 각별히 경계해야 합니다. 눈앞의 성급한 결과에 매달리기보다 사전에 완급을 조절하며 내실을 다지는 지혜가 요구됩니다.`;
      }
    } else if (slotType === 'challenge') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 현재 넘어서야 할 핵심 과제는 '${up0}'의 균형을 온전히 회복하는 일입니다. 불필요한 두려움을 내려놓고 상황을 주도적으로 직시하세요.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 외부의 문제보다 내면에서 일어나는 '${rev0}'의 불안감과 망설임이 가장 큰 걸림돌입니다. 스스로에 대한 신뢰를 회복하고 내면의 호흡을 먼저 가다듬어야 합니다.`;
      }
    } else if (slotType === 'goal') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 질문자님의 의식과 가슴이 궁극적으로 바라는 지향점은 '${up0}'의 온전한 실현입니다. 이상을 향해 흔들림 없이 현실의 보폭을 맞춰가세요.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 이상과 현실 사이의 괴리나 '${rev0}'의 혼란이 시야를 흐리고 있을 수 있습니다. 목표의 우선순위를 차분히 재정렬하세요.`;
      }
    } else if (slotType === 'self') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 상황을 대하는 질문자님의 내면 스탠스는 '${up0}'의 당당한 진정성을 품고 있습니다. 자신의 잠재력을 믿고 주체적으로 국면을 이끌어갈 때입니다.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 스스로를 지나치게 다그치거나 '${rev0}'로 인해 위축되어 있을 수 있습니다. 타인의 기준에 휘둘리지 말고 나만의 고유한 리듬을 회복하세요.`;
      }
    } else if (slotType === 'environment') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 외부 환경과 주변 인연들은 '${up0}'의 긍정적인 파동으로 질문자님을 지지하고 있습니다. 주변의 호의와 기회를 열린 마음으로 받아들이세요.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 주변 분위기나 타인과의 관계에서 '${rev0}'의 미묘한 오해나 피로감이 감돌 수 있습니다. 불필요한 마찰에 휘말리지 않도록 건강한 심리적 경계를 유지하세요.`;
      }
    } else if (slotType === 'hopes_fears') {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 마음 한편에서는 '${up0}'의 성취를 간절히 바라면서도, 동시에 실패에 대한 염려가 교차하고 있습니다. 희망의 불씨에 더 많은 믿음과 온기를 불어넣어 주세요.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 무의식 깊은 곳에서 '${rev0}'에 대한 두려움이 앞서 방어벽을 높이고 있을 수 있습니다. 최악의 가정을 내려놓고 긍정적인 가능성에 시선을 맞추세요.`;
      }
    } else {
      if (!isReversed) {
        psychologicalReading = `[${positionName}] ${card.nameKo}(정방향) - 지금 이 순간 질문자님의 상황에서는 '${up0}'의 주도적 결단과 '${up1}'의 에너지를 적극적으로 전면에 세우는 것이 국면을 전환할 핵심 열쇠입니다. 머뭇거리던 망설임을 멈추고 당당히 첫걸음을 내딛으세요.`;
      } else {
        psychologicalReading = `[${positionName}] ${card.nameKo}(역방향) - 현재 마주한 지점에서는 '${rev0}'에 대한 조급함이나 '${rev1}'의 부담감이 에너지의 자연스러운 흐름을 가로막고 있습니다. 무리한 속도전보다 내면의 호흡을 가다듬고 생각의 매듭을 먼저 차분히 정리하는 것이 현명합니다.`;
      }
    }

    // 3. [2. 구체적 행동 조언 (실전 솔루션)]: 카드별 고유 솔루션 (반복 문구 제거)
    const chk0 = (card.checklists && card.checklists.length > 0) ? card.checklists[0] : card.adviceBase;
    const chk1 = (card.checklists && card.checklists.length > 1) ? card.checklists[1] : '마음의 속도를 늦추고 내면의 호흡 회복하기';
    let actionAdvice = '';
    if (!isReversed) {
      actionAdvice = `[실전 솔루션] ${card.adviceBase} 오늘 즉시 실천할 지침: "${chk0}"`;
    } else {
      actionAdvice = `[내면 처방] 결과를 재촉하지 말고 마음의 여유를 먼저 회복하세요. 오늘 실천할 정돈 지침: "${chk1}"`;
    }

    // 4. [3. 온기 있는 확언 (힐링 확언 카드)]: 78장 카드 고유의 개별 확언
    const affirmation = CARD_AFFIRMATIONS[card.id] || matchedCorpus.affirmation;

    return {
      cardId: card.id,
      cardName: card.nameKo,
      isReversed,
      positionName,
      observation,
      psychologicalReading,
      actionAdvice,
      affirmation,
      elementalSignificance: suitTemplate.energy,
      // 하위 호환 필드 연결
      interpretation: psychologicalReading,
      personalInsight: `${matchedCorpus.name} 관점: ${matchedCorpus.actionAdvice}`
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
    elementalHarmony += '열정(불)과 감정(물)의 역동적인 상호작용이 일어나는 국면입니다. 감정의 서운함에 휘둘리지 않고 따뜻한 진심으로 에너지를 승화시킬 때 가장 아름다운 전환점을 맞이합니다.';
  } else if (airCount > 0 && earthCount > 0) {
    elementalHarmony += '명석한 이성적 판단(공기)과 견고한 현실 기반(흙)이 손을 맞잡아, 고민하던 가설을 현실의 단단한 성과와 숫자로 안착시키기에 최적의 조화입니다.';
  } else if (fireCount > 0 && airCount > 0) {
    elementalHarmony += '새로운 아이디어(공기)에 강력한 추진력(불)이 붙어 상황을 주도적으로 돌파해 나갈 수 있는 활력이 최고조에 이른 상태입니다.';
  } else if (waterCount > 0 && earthCount > 0) {
    elementalHarmony += '깊은 내면의 직관(물)이 현실의 안전한 토양(흙)을 만나 안정적인 치유와 뿌리내림을 이뤄내는 온화한 흐름입니다.';
  } else {
    elementalHarmony += '카드들이 한목소리로 내담자의 주도적 결단을 지지하고 있어, 불필요한 번민을 끝내고 첫 발걸음을 뗄 수 있는 강력한 응집력을 보여줍니다.';
  }

  // 종합 요약 (3-Block UI 종합편)
  const summary = `질문자님의 고민("${question}")에 대한 [${matchedCorpus.domainName} · ${matchedCorpus.name}] 맞춤 진단입니다. ${matchedCorpus.psychologicalReading} 추상적인 점괘나 두려움에 기대지 마시고, 오늘 카드가 건네는 단 하나의 현실적 행동 솔루션을 실천할 때 삶의 주도권은 온전히 당신의 손으로 돌아옵니다.`;

  const coreTheme = `[${matchedCorpus.name}] ${drawnCards.map(d => d.card.keywordsUpright[0]).join(' → ')}의 흐름을 통한 주도권 회복`;

  return {
    summary,
    coreTheme,
    domain: matchedCorpus.domain,
    domainName: matchedCorpus.domainName,
    subCategoryName: matchedCorpus.name,
    userQuestionHighlight: question,
    cardReadings,
    elementalHarmony,
    primaryAffirmation: matchedCorpus.affirmation
  };
}

// 심층 연계 질문(Clarifier) 리딩 함수
export function generateFollowUpReading(
  originalReading: ReadingResult,
  followUpQuestion: string,
  clarifierCard: TarotCardData,
  isReversed: boolean
) {
  const q = followUpQuestion.trim();
  const matchedCorpus = classifyUserConcern(q || originalReading.userQuestionHighlight);
  const keywords = isReversed ? clarifierCard.keywordsReversed : clarifierCard.keywordsUpright;

  const relationshipAnalysis = `앞선 리딩([${originalReading.coreTheme}])과 추가 질문("${q}")을 심층 교차 분석한 결과, 보조 카드 [${clarifierCard.nameKo}](${isReversed ? '역방향' : '정방향'})는 ${matchedCorpus.psychologicalReading} 특히 '${keywords[0]}'의 에너지를 회복하는 것이 이번 문제의 핵심 열쇠임을 명확히 보여줍니다.`;

  const followUpAdvice = `[보조 카드 실천 지침] ${matchedCorpus.actionAdvice} ${clarifierCard.adviceBase} 오늘 바로 행할 최소 실천: ${clarifierCard.checklists[0]}`;

  return {
    card: clarifierCard,
    isReversed,
    relationshipAnalysis,
    followUpAdvice,
    followUpAffirmation: CARD_AFFIRMATIONS[clarifierCard.id] || matchedCorpus.affirmation
  };
}
