export interface TarotCardData {
  id: string;
  number: number;
  nameEn: string;
  nameKo: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  element: '불(Fire)' | '물(Water)' | '공기(Air)' | '흙(Earth)';
  keywordsUpright: string[];
  keywordsReversed: string[];
  observation: string; // 유니버셜 덱 도상 관찰
  universalSymbol: string; // 유니버셜 덱 특유의 도상 상징 해설
  adviceBase: string; // 현실적 행동 조언
  checklists: string[]; // 실천 체크리스트
  symbolIcon: string;
  svgDrawing: string; // 유니버셜 웨이트 도상 벡터 드로잉
}

export const TAROT_CARDS: TarotCardData[] = [
  // ------------------ MAJOR ARCANA ------------------
  {
    id: 'major-0',
    number: 0,
    nameEn: 'The Fool',
    nameKo: '0. 바보 (The Fool)',
    arcana: 'major',
    element: '공기(Air)',
    keywordsUpright: ['새로운 시작', '순수한 모험', '자유로운 영혼', '무한한 잠재력', '열린 가능성'],
    keywordsReversed: ['무모한 충동', '준비 부족', '현실 외면', '방향성 상실', '경솔한 선택'],
    observation: '절벽 끝자락에 선 청년이 찬란한 태양빛 아래 하늘을 올려다보고 있습니다. 오른손에는 작은 보따리가 달린 지팡이를 어깨에 메고, 왼손에는 순결을 상징하는 하얀 장미를 쥐고 있습니다. 발치에서 흰 강아지가 폴짝거리며 위험을 알리고 뒤편에는 험준한 설산이 펼쳐져 있습니다.',
    universalSymbol: '유니버셜 덱 특유의 화사한 노란 태양과 낭떠러지의 극적인 대비. 벼랑 끝에서도 두려움 없이 하늘을 향한 시선은 과거의 실패나 계산에 얽매이지 않는 순수한 영혼의 용기를 상징합니다.',
    adviceBase: '과거의 실패나 주변의 불안 섞인 시선이라는 짐을 내려놓고, 백지상태의 마음으로 첫걸음을 내딛으세요.',
    checklists: [
      '완벽한 계산에 집착하지 말고 오늘 시도할 수 있는 최소 단위의 첫 행동(MVP) 실행하기',
      '주변 사람들의 두려움 섞인 참견과 내 가슴이 뛰는 진짜 호기심을 종이에 분리해 적어보기'
    ],
    symbolIcon: 'Sparkles',
    svgDrawing: `
      <path d="M12 2a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5V14l-3 4h10l-3-4V9.5c1.2-.7 2-2 2-3.5a4 4 0 00-4-4z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M4 21c4-2 8-1 16-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M14 6l6-4m-1 0a2 2 0 11-4 0 2 2 0 014 0z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
      <path d="M5 18c1-1 2-1 2 1" stroke="currentColor" stroke-width="1.2"/>
    `
  },
  {
    id: 'major-1',
    number: 1,
    nameEn: 'The Magician',
    nameKo: 'I. 마법사 (The Magician)',
    arcana: 'major',
    element: '공기(Air)',
    keywordsUpright: ['창조력', '실행력', '자원의 활용', '명료한 의도', '주도적 해결'],
    keywordsReversed: ['재능의 낭비', '속임수', '준비 부족', '의지력 분산', '실행 지연'],
    observation: '오른손의 마법봉은 하늘을 찌르고 왼손은 땅을 가리키는 사제. 머리 위에는 영원과 지혜를 뜻하는 무한대(∞) 기호가 선명하며, 붉은 장미와 순백의 백합이 흐드러진 정원의 제단 위에는 4대 상징물(완드, 컵, 소드, 펜타클)이 완벽히 갖추어져 있습니다.',
    universalSymbol: '유니버셜 덱의 붉은 로브와 흰 튜닉의 조화. 영적 영감(하늘)을 현실의 구체적 성과(땅)로 구현하는 "As above, so below"의 실천적 연금술을 나타냅니다.',
    adviceBase: '외부의 기적이나 타인의 손길을 기다리지 마세요. 이미 당신 손안에 문제를 매듭지을 모든 재료와 도구가 갖추어져 있습니다.',
    checklists: [
      '지금 당장 가용할 수 있는 내 자원(인맥, 지식, 도구) 3가지를 메모지에 적고 최적의 조합 찾기',
      '애매모호한 고민을 멈추고 뚜렷한 한마디 문장으로 내 의도를 주변에 공표하기'
    ],
    symbolIcon: 'Wand2',
    svgDrawing: `
      <path d="M7 6c0-1.5 2-2.5 5-2.5s5 1 5 2.5-2 2.5-5 2.5-5-1-5-2.5z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 3.5c-3 0-5 1.5-5 2.5s2 2.5 5 2.5 5-1.5 5-2.5-2-2.5-5-2.5z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 9v4m-3 7h6M6 20h12M9 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M15 4l3-3m-9 14l-3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `
  },
  {
    id: 'major-2',
    number: 2,
    nameEn: 'The High Priestess',
    nameKo: 'II. 여사제 (The High Priestess)',
    arcana: 'major',
    element: '물(Water)',
    keywordsUpright: ['직관의 힘', '내면의 통찰', '비밀스러운 지혜', '고요한 평정', '본질의 파악'],
    keywordsReversed: ['표면적 판단', '감정적 억압', '직관 불신', '냉담함', '비밀의 폭로'],
    observation: '빛과 어둠, 의식과 무의식을 상징하는 흑과 백의 두 기둥(B와 J) 사이에 정좌한 여사제. 석류와 야자나무가 수놓인 휘장 너머로 푸른 물결이 보이며, 품에는 율법의 두루마리(TORA)를 안고 발치에는 초승달이 놓여 있습니다.',
    universalSymbol: '유니버셜 덱 특유의 푸른빛 차분함과 고요. 세상의 시끄러운 참견과 조언을 잠시 멈추고, 깊은 무의식의 호수 밑바닥에 가라앉은 참된 직관을 길어 올릴 때임을 상징합니다.',
    adviceBase: '말을 앞세우거나 섣부른 결정을 내리지 마세요. 고요히 자신의 내면 목소리와 직관이 가리키는 곳에 귀를 기울이세요.',
    checklists: [
      '중요한 결정에 대해 24시간 동안 외부 조언을 차단하고 혼자만의 사색 시간 갖기',
      '문득 스치는 직관적 인상이나 꿈의 메시지를 일기장에 담담히 기록하기'
    ],
    symbolIcon: 'Moon',
    svgDrawing: `
      <rect x="4" y="5" width="3" height="15" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <rect x="17" y="5" width="3" height="15" rx="0.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M10 8a2 2 0 114 0c0 2-2 3-2 5v2" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M9 19c2 1 4 1 6 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
    `
  },
  {
    id: 'major-3',
    number: 3,
    nameEn: 'The Empress',
    nameKo: 'III. 여황제 (The Empress)',
    arcana: 'major',
    element: '흙(Earth)',
    keywordsUpright: ['풍요와 번영', '따뜻한 보살핌', '결실의 수확', '창조적 모성', '편안한 안식'],
    keywordsReversed: ['과잉보호', '게으름', '생산성 저하', '감정적 결핍', '자기방임'],
    observation: '황금빛으로 무르익은 밀밭 한가운데 안락한 소파에 기대앉은 임산부 모습의 여황제. 열두 개의 별로 장식된 왕관을 쓰고 발치에는 사랑의 여신 금성(♀)이 새겨진 하트 방패가 있으며 배경에 맑은 폭포수가 흐릅니다.',
    universalSymbol: '유니버셜 덱 특유의 풍요로운 자연주의. 억지로 결과를 쥐어짜내려 다그치지 않아도 때가 되면 자연스럽게 무르익어 열매를 맺는 대지의 생명력을 나타냅니다.',
    adviceBase: '스스로를 채찍질하지 말고, 지금 있는 그대로의 풍요로움을 충분히 누리고 주변을 따뜻하게 보살피세요.',
    checklists: [
      '내가 가장 편안함을 느끼는 식사나 따뜻한 휴식을 오늘 하루 자신에게 선물하기',
      '결과를 다그치지 않고 진행 중인 프로젝트를 어머니의 마음으로 격려하기'
    ],
    symbolIcon: 'Heart',
    svgDrawing: `
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 8v6m-3-3h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    `
  },
  {
    id: 'major-4',
    number: 4,
    nameEn: 'The Emperor',
    nameKo: 'IV. 황제 (The Emperor)',
    arcana: 'major',
    element: '불(Fire)',
    keywordsUpright: ['질서와 체계', '책임감', '현실적 통제력', '안정된 기반', '강인한 리더십'],
    keywordsReversed: ['독선과 고집', '경직됨', '통제력 상실', '융통성 결여', '권력의 남용'],
    observation: '붉은 산맥을 배경으로 숫양의 머리가 조각된 견고한 석조 옥좌에 앉은 엄숙한 황제. 철갑옷 위에 붉은 망토를 두르고 오른손에는 생명의 앙크 십자가 홀을, 왼손에는 황금 구(Orb)를 쥐고 정면을 응시합니다.',
    universalSymbol: '감정에 흔들리지 않고 냉철한 이성과 현실적인 규율로 제국을 세우는 아버지의 상징. 불안정한 상황 속에서 명확한 원칙과 경계선을 긋는 힘을 의미합니다.',
    adviceBase: '감정적인 타협을 멈추고, 명확한 규칙과 경계선을 설정하여 상황의 주도권을 확고히 잡으세요.',
    checklists: [
      '일과 삶의 경계선(거절해야 할 무리한 요구, 종료 시간)을 명문화하여 선언하기',
      '혼란스러운 일정이나 재정 지출 체계를 표로 정리해 규칙 부여하기'
    ],
    symbolIcon: 'Shield',
    svgDrawing: `
      <path d="M5 4h14l-2 15H7L5 4z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 2v4m-3-2h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="9" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="15" cy="8" r="1.5" fill="currentColor"/>
      <path d="M8 14h8m-5 4h2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    `
  },
  {
    id: 'major-7',
    number: 7,
    nameEn: 'The Chariot',
    nameKo: 'VII. 전차 (The Chariot)',
    arcana: 'major',
    element: '물(Water)',
    keywordsUpright: ['돌파력', '의지력', '승리와 전진', '상반된 감정의 통제', '목표 집중'],
    keywordsReversed: ['통제 불능', '충동적 폭주', '방향 감각 상실', '좌절', '자기 파괴'],
    observation: '별들이 수놓인 천막 아래 전차를 탄 젊은 장수. 물리적인 고삐 없이 오직 굳은 의지와 정신력만으로 서로 다른 방향으로 가려는 흑백의 두 스핑크스를 제어하며 성벽을 뒤로하고 힘차게 나아갑니다.',
    universalSymbol: '내면의 불안과 욕망, 두려움과 기대를 하나로 결집시켜 목표를 향해 똑바로 밀어붙이는 승리의 에너지. 타협 없는 집중을 뜻합니다.',
    adviceBase: '주변의 잡음에 흔들리지 말고, 목표 하나만을 정조준하여 망설임 없이 전진을 밀어붙이세요.',
    checklists: [
      '방해 요소와 스마트폰 알림을 끄고 핵심 과제에 1시간 동안 몰입하는 딥워크 시간 갖기',
      '상반된 두 감정(불안과 욕망)을 목표 달성의 추진 연료로 전환하기'
    ],
    symbolIcon: 'Compass',
    svgDrawing: `
      <path d="M4 14h16v6H4z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="7" cy="17" r="2" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="17" cy="17" r="2" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M7 6l5-3 5 3v5H7V6z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 11v3" stroke="currentColor" stroke-width="1.5"/>
    `
  },
  {
    id: 'major-9',
    number: 9,
    nameEn: 'The Hermit',
    nameKo: 'IX. 은둔자 (The Hermit)',
    arcana: 'major',
    element: '흙(Earth)',
    keywordsUpright: ['내적 성찰', '홀로서기', '지혜의 등불', '고독의 가치', '본질 탐구'],
    keywordsReversed: ['사회적 고립', '외로움에 매몰', '고집불통', '현실 기피', '소통 거부'],
    observation: '눈 덮인 산봉우리 위, 회색 후드 망토를 두른 노인이 한 손에는 육각별이 밝게 빛나는 등불을 높이 들고, 다른 손에는 황금빛 지팡이를 짚은 채 고개 숙여 자신의 발밑을 비추고 있습니다.',
    universalSymbol: '등불은 온 세상을 비추지 않고 오직 바로 앞 한 걸음만을 비춥니다. 먼 미래의 불안 대신 지금 당장 디뎌야 할 진실된 한 걸음에 집중하라는 지혜입니다.',
    adviceBase: '세상의 시끄러운 소음에서 한 발짝 물러나 홀로 고요한 시간을 갖고, 내면의 참된 기준을 정립하세요.',
    checklists: [
      '오늘 저녁 혼자만의 30분 산책이나 사색 시간을 갖고 머릿속 정리하기',
      '타인의 인정보다 나 스스로에게 떳떳한 기준이 무엇인지 적어보기'
    ],
    symbolIcon: 'Lamp',
    svgDrawing: `
      <path d="M12 3v3m-3 4h6l-1 9H10l-1-9z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M16 8l3-1v4l-3-1" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      <path d="M6 21c3-2 9-2 12 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `
  },
  {
    id: 'major-10',
    number: 10,
    nameEn: 'Wheel of Fortune',
    nameKo: 'X. 운명의 수레바퀴 (Wheel of Fortune)',
    arcana: 'major',
    element: '불(Fire)',
    keywordsUpright: ['인생의 전환점', '뜻밖의 기회', '순환과 변화', '행운의 흐름', '새로운 국면'],
    keywordsReversed: ['불운과 지연', '변화에 대한 저항', '악순환', '통제 밖의 사건', '타이밍 불일치'],
    observation: '구름 속에 떠 있는 신비로운 거대한 바퀴. 바퀴 둘레에는 히브리어와 연금술 기호가 새겨져 있고 꼭대기에는 검을 든 스핑크스가, 아래로는 아누비스와 뱀이 바퀴를 오르내립니다. 네 모퉁이에는 책을 든 4대 천사가 자리합니다.',
    universalSymbol: '영원히 고정된 불변은 없으며 오르막과 내리막이 쉼 없이 순환한다는 우주의 섭리. 바퀴의 중심축처럼 내면의 고요를 유지할 때 변화의 파도를 탈 수 있습니다.',
    adviceBase: '변화의 물결을 거스르려 하지 말고 유연하게 몸을 맡기세요. 찾아온 예기치 않은 기회의 파도를 타세요.',
    checklists: [
      '내가 통제할 수 없는 외부 변수를 억지로 바꾸려 하지 말고 기꺼이 인정하기',
      '최근 일어난 뜻밖의 변화에서 숨겨진 긍정적 기회 요소를 한 가지 찾아내기'
    ],
    symbolIcon: 'RotateCcw',
    svgDrawing: `
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 4v5m0 6v5M4 12h5m6 0h5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    `
  },
  {
    id: 'major-13',
    number: 13,
    nameEn: 'Death',
    nameKo: 'XIII. 죽음 (Death)',
    arcana: 'major',
    element: '물(Water)',
    keywordsUpright: ['낡은 것의 종결', '새로운 탄생', '근본적 쇄신', '필연적 이별', '재출발'],
    keywordsReversed: ['변화에 대한 완강한 거부', '썩은 관계의 연명', '미련', '고통스러운 지연'],
    observation: '검은 갑옷을 입은 해골 기사가 신비로운 순백의 신성 장미가 수놓인 깃발을 들고 백마를 타고 천천히 전진합니다. 왕과 사제, 여인과 아이가 맞이하며, 저 멀리 지평선 두 탑 사이로 찬란한 태양이 떠오릅니다.',
    universalSymbol: '파괴를 위한 파괴가 아닌, 낡고 썩은 껍질을 벗겨내어 새로운 싹을 틔우기 위한 필연적 탈바꿈. 지평선 너머 떠오르는 태양은 눈부신 새 출발을 약속합니다.',
    adviceBase: '수명을 다한 관계나 습관, 프로젝트를 미련 없이 떠나보내세요. 비워내야만 새로운 것이 채워집니다.',
    checklists: [
      '오래 방치되었거나 더 이상 나에게 활력을 주지 못하는 물건이나 관계 1가지 정리하기',
      '과거에 대한 미련을 종이에 적고 찢어 작별 의식 치르기'
    ],
    symbolIcon: 'Skull',
    svgDrawing: `
      <circle cx="12" cy="9" r="4" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="10.5" cy="8.5" r="1" fill="currentColor"/>
      <circle cx="13.5" cy="8.5" r="1" fill="currentColor"/>
      <path d="M10 12h4m-3 2h2m-6 3c2-2 4-2 6 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M17 3l4 4-2 2-4-4 2-2z" stroke="currentColor" stroke-width="1.2" fill="none"/>
    `
  },
  {
    id: 'major-17',
    number: 17,
    nameEn: 'The Star',
    nameKo: 'XVII. 별 (The Star)',
    arcana: 'major',
    element: '공기(Air)',
    keywordsUpright: ['빛나는 희망', '마음의 치유', '창의적 영감', '순수한 낙관', '재충전'],
    keywordsReversed: ['비관주의', '영감의 고갈', '자기 의심', '절망감', '기회의 외면'],
    observation: '맑은 밤하늘 거대한 황금 팔각 별과 일곱 개의 작은 별 아래, 벌거벗은 여인이 무릎을 꿇고 두 개의 주전자로 대지와 연못에 생명수를 아낌없이 붓고 있습니다. 뒤편 나뭇가지에는 영혼을 상징하는 따오기가 앉아 있습니다.',
    universalSymbol: '어두운 시련(탑)이 무너진 후 찾아오는 맑고 투명한 평화. 감출 것 없는 순수함으로 세상과 자신에게 생명의 활력을 채워 넣는 힐링의 정점입니다.',
    adviceBase: '어두운 밤은 지나갔습니다. 미래에 대한 낙관과 희망을 되찾고, 아낌없이 당신의 재능을 세상에 베푸세요.',
    checklists: [
      '내가 진정으로 바라는 미래의 비전을 시각화하거나 드림보드로 스케치해보기',
      '지친 몸과 마음을 위해 물과 자연이 있는 공간에서 평온한 휴식 취하기'
    ],
    symbolIcon: 'Star',
    svgDrawing: `
      <polygon points="12,2 14.5,8 21,9 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9 9.5,8" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <circle cx="12" cy="11" r="2" fill="currentColor"/>
      <path d="M5 21c3-1 6-1 9 0" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
    `
  },
  {
    id: 'major-19',
    number: 19,
    nameEn: 'The Sun',
    nameKo: 'XIX. 태양 (The Sun)',
    arcana: 'major',
    element: '불(Fire)',
    keywordsUpright: ['명쾌한 성공', '환희와 기쁨', '생명력의 분출', '순수한 행복', '진실의 승리'],
    keywordsReversed: ['일시적 먹구름', '성공의 지연', '과도한 낙관', '활력 저하', '어린애 같은 응석'],
    observation: '찬란한 미소를 짓는 거대한 태양이 대지를 비추는 아래, 만개한 해바라기 돌담 앞에서 벌거벗은 어린아이가 붉은 생명의 깃발을 들고 백마를 타며 기쁨의 환호를 지르고 있습니다.',
    universalSymbol: '의심과 어둠을 단번에 날려버리는 명료한 빛. 복잡한 계산을 내려놓고 어린아이와 같은 순수한 열정으로 삶을 긍정할 때 찾아오는 최고의 축복입니다.',
    adviceBase: '모든 의심을 걷어내고 당당하게 햇빛 속으로 걸어 나오세요. 당신의 순수한 열정을 마음껏 표현하세요.',
    checklists: [
      '오늘 하루 동안 감사한 일 세 가지를 떠올리며 스스로에게 환한 칭찬 건네기',
      '숨기거나 주저하지 말고 내 아이디어를 자신감 있게 세상에 공개하기'
    ],
    symbolIcon: 'Sun',
    svgDrawing: `
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.05-6.95l-2.12 2.12M7.17 16.83l-2.12 2.12m13.9 0l-2.12-2.12M7.17 7.17L5.05 5.05" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    `
  },
  {
    id: 'major-21',
    number: 21,
    nameEn: 'The World',
    nameKo: 'XXI. 세계 (The World)',
    arcana: 'major',
    element: '흙(Earth)',
    keywordsUpright: ['위대한 완성', '통합과 조화', '목표 달성', '새로운 차원의 시작', '완전한 자유'],
    keywordsReversed: ['미완의 과제', '마지막 문턱의 정체', '완벽주의의 덫', '교훈의 미흡'],
    observation: '타원형의 푸른 월계수 화환 한가운데서 보랏빛 천을 두르고 춤추는 승리의 여인. 양손에 마법봉을 쥐고 있으며, 네 모퉁이에는 4원소의 수호자(인간, 독수리, 사자, 황소)가 온전히 축복하고 있습니다.',
    universalSymbol: '0번 바보에서 시작된 머나먼 영웅의 여정이 마침내 완전한 조화를 이루며 완결되는 순간. 끝은 곧 더 높은 차원으로 진입하는 새로운 문입니다.',
    adviceBase: '지금까지 걸어온 긴 여정의 결실을 축하하세요. 하나의 챕터를 아름답게 마무리하고 더 넓은 세상으로 나아가세요.',
    checklists: [
      '지금까지 내가 이뤄낸 성취들을 돌아보고 스스로에게 진심 어린 축하와 보상 제공하기',
      '미완으로 남겨둔 마지막 5%의 디테일을 정리하여 프로젝트에 마침표 찍기'
    ],
    symbolIcon: 'Globe',
    svgDrawing: `
      <ellipse cx="12" cy="12" rx="7" ry="9" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 6v12m-3-6h6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="5" cy="5" r="1.5" fill="currentColor"/>
      <circle cx="19" cy="5" r="1.5" fill="currentColor"/>
      <circle cx="5" cy="19" r="1.5" fill="currentColor"/>
      <circle cx="19" cy="19" r="1.5" fill="currentColor"/>
    `
  },

  // ------------------ MINOR SUIT REPRESENTATIVES ------------------
  {
    id: 'wands-1',
    number: 1,
    nameEn: 'Ace of Wands',
    nameKo: '완드 에이스 (Ace of Wands)',
    arcana: 'minor',
    suit: 'wands',
    element: '불(Fire)',
    keywordsUpright: ['창조적 영감', '새로운 열정', '행동의 불꽃', '강인한 생명력', '의욕 충만'],
    keywordsReversed: ['열정의 지연', '의욕 상실', '방향성 부족', '성급한 착수', '에너지 방전'],
    observation: '신비로운 뭉게구름 속에서 뻗어 나온 신성한 손이 새싹 잎사귀가 돋아난 굵은 나무 지팡이를 굳게 쥐고 있습니다. 흩날리는 잎사귀들과 배경 언덕 위의 성벽이 보입니다.',
    universalSymbol: '불꽃처럼 타오르는 창조적 열정의 첫 발화. 공상에 머무르지 않고 현실에 뿌리를 내릴 수 있는 생생한 실천의 씨앗입니다.',
    adviceBase: '가슴속에서 타오르는 새로운 불꽃을 망설이지 말고 즉시 행동으로 점화하세요.',
    checklists: ['아이디어를 머릿속에만 두지 말고 오늘 1페이지 기획서로 옮기기', '새로운 프로젝트의 첫 번째 연락 취하기'],
    symbolIcon: 'Flame',
    svgDrawing: `
      <path d="M12 3v18M9 7l3-3 3 3M7 11c1-1 3-1 3 1s-2 2-2 3M17 10c-1-1-3-1-3 1s2 2 2 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    `
  },
  {
    id: 'cups-1',
    number: 1,
    nameEn: 'Ace of Cups',
    nameKo: '컵 에이스 (Ace of Cups)',
    arcana: 'minor',
    suit: 'cups',
    element: '물(Water)',
    keywordsUpright: ['사랑의 솟구침', '풍부한 감수성', '마음의 치유', '영적 은총', '진실한 교감'],
    keywordsReversed: ['감정의 고갈', '마음의 닫힘', '공허함', '서운함의 고임', '감정 낭비'],
    observation: '구름에서 나온 손이 다섯 줄기 생명수가 폭포처럼 넘쳐흐르는 황금 성배를 받쳐 들고 있습니다. 십자가 빵을 문 비둘기가 컵 안으로 내려앉으며 아래 연못에는 수련이 피어 있습니다.',
    universalSymbol: '가슴 깊은 곳에서 솟구치는 순수한 사랑과 평화. 가둬두지 않고 아낌없이 흘려보낼 때 더 맑고 풍요로워지는 마음의 샘물입니다.',
    adviceBase: '마음의 빗장을 열고 솔직한 감정과 사랑의 흐름을 세상에 표현하세요.',
    checklists: ['마음속에 품고 있던 따뜻한 진심을 한마디 언어로 건네기', '감정의 결을 어루만져 주는 예술 작품이나 음악 감상하기'],
    symbolIcon: 'Heart',
    svgDrawing: `
      <path d="M6 5h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V5z" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <path d="M12 15v5m-4 0h8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M8 8c1-1 2-1 2 0s-1 2-1 3m6-3c-1-1-2-1-2 0s1 2 1 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    `
  },
  {
    id: 'swords-1',
    number: 1,
    nameEn: 'Ace of Swords',
    nameKo: '소드 에이스 (Ace of Swords)',
    arcana: 'minor',
    suit: 'swords',
    element: '공기(Air)',
    keywordsUpright: ['지적 명료함', '진실의 돌파', '단호한 결단', '이성적 승리', '오해의 타파'],
    keywordsReversed: ['혼란스러운 사고', '날카로운 독설', '부당한 강요', '판단 착오', '망설임'],
    observation: '구름 속에서 뻗어 나온 강인한 손이 황금 왕관을 수직으로 꿰뚫은 양날의 검을 굳게 쥐고 있습니다. 왕관에는 올리브와 종려나무 가지가 걸려 있고 배경에는 차가운 산맥이 자리합니다.',
    universalSymbol: '온갖 모호함과 감정적 혼란을 단칼에 베어내는 명쾌한 진실의 힘. 감정에 휘둘리지 않는 냉철한 이성의 결단을 상징합니다.',
    adviceBase: '우유부단함을 멈추고 객관적 사실에 기반하여 단호하고 명쾌한 칼자루를 쥐세요.',
    checklists: ['모호하게 얽힌 문제의 핵심 이슈를 단 한 줄로 명문화하기', '감정적 미련을 배제하고 원칙에 따라 "NO"라고 분명히 말하기'],
    symbolIcon: 'Sword',
    svgDrawing: `
      <path d="M12 2v16m-4-12h8m-6 12h4m-2 0v4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="12" cy="4" r="1.5" fill="currentColor"/>
    `
  },
  {
    id: 'pentacles-1',
    number: 1,
    nameEn: 'Ace of Pentacles',
    nameKo: '펜타클 에이스 (Ace of Pentacles)',
    arcana: 'minor',
    suit: 'pentacles',
    element: '흙(Earth)',
    keywordsUpright: ['현실적 기회', '물질적 결실의 씨앗', '안정된 기반', '구체적 성과', '풍요의 약속'],
    keywordsReversed: ['기회의 실기', '재정적 불안정', '탐욕과 인색함', '부실한 토대', '낭비'],
    observation: '구름에서 나온 손이 별이 새겨진 황금빛 펜타클 주화를 소중히 받쳐 들고 있습니다. 아래에는 백합과 붉은 장미가 만발한 정원이 있고, 덩굴 아치문 너머로 굳건한 푸른 산맥이 보입니다.',
    universalSymbol: '머릿속 아이디어가 손에 만져지는 단단한 현실의 성과물로 안착하는 축복. 땅을 딛고 성실히 가꾸어나갈 구체적 기회입니다.',
    adviceBase: '머릿속의 생각을 손에 잡히는 구체적 형태(문서, 시제품, 재정 계획)로 실체화하세요.',
    checklists: ['실현하고 싶은 목표의 초기 예산이나 일정표를 숫자로 적어보기', '안정적인 미래를 위한 작은 저축이나 현실적 기반 마련하기'],
    symbolIcon: 'Coins',
    svgDrawing: `
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.2" fill="none"/>
      <polygon points="12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2" stroke="currentColor" stroke-width="1" fill="none"/>
    `
  }
];

export const TAROT_CARD_MAP = new Map<string, TarotCardData>(
  TAROT_CARDS.map(card => [card.id, card])
);
