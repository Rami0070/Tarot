#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
UNIVERSAL TAROT · INTEGRATED EDITION (로컬 단일 파일 실행 프로그램)
- 외부 라이브러리(pip install) 의존성 없음 (Python 3 표준 라이브러리만 사용)
- 실행 방법: python app.py 또는 run.bat 더블클릭
- 자동 브라우저 실행 및 로컬 웹 애플리케이션 서비스 제공
"""

import os
import sys
import json
import socket
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs

# -------------------------------------------------------------
# 1. 78장 타로 카드 데이터베이스 (유니버셜 웨이트 덱 기반)
# -------------------------------------------------------------
TAROT_CARDS = [
    {
        "id":  "major-0",
        "imageUrl": "images/tarot_0_fool.jpg",
        "number":  0,
        "nameEn":  "The Fool",
        "nameKo":  "0. 바보 (The Fool)",
        "arcana":  "major",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "새로운 시작",
                                "순수한 모험",
                                "자유로운 영혼",
                                "무한한 잠재력",
                                "열린 가능성"
                            ],
        "keywordsReversed":  [
                                 "무모한 충동",
                                 "준비 부족",
                                 "현실 외면",
                                 "방향성 상실",
                                 "경솔한 선택"
                             ],
        "observation":  "절벽 끝자락에 선 청년이 찬란한 태양빛 아래 하늘을 올려다보고 있습니다. 오른손에는 보따리 지팡이, 왼손에는 순결의 하얀 장미를 쥐고 발치에서 흰 개가 위험을 알립니다.",
        "universalSymbol":  "유니버셜 덱 특유의 화사한 태양과 낭떠러지의 대비. 과거의 계산과 두려움에 얽매이지 않고 순수한 영혼으로 새 출발을 내딛는 용기.",
        "adviceBase":  "과거의 실패나 주변의 불안 섞인 시선이라는 짐을 내려놓고, 백지상태의 마음으로 첫걸음을 내딛으세요.",
        "checklists":  [
                           "완벽한 계산에 집착하지 말고 오늘 시도할 수 있는 최소 단위의 첫 행동(MVP) 실행하기",
                           "주변 사람들의 두려움 섞인 참견과 내 가슴이 뛰는 진짜 호기심을 종이에 분리해 적어보기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5V14l-3 4h10l-3-4V9.5c1.2-.7 2-2 2-3.5a4 4 0 00-4-4z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M4 21c4-2 8-1 16-1\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/\u003e\u003cpath d=\"M14 6l6-4m-1 0a2 2 0 11-4 0 2 2 0 014 0z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-1",
        "imageUrl": "images/tarot_1_magician.jpg",
        "number":  1,
        "nameEn":  "The Magician",
        "nameKo":  "I. 마법사 (The Magician)",
        "arcana":  "major",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "창조력",
                                "실행력",
                                "자원의 활용",
                                "명료한 의도",
                                "주도적 해결"
                            ],
        "keywordsReversed":  [
                                 "재능의 낭비",
                                 "속임수",
                                 "준비 부족",
                                 "의지력 분산",
                                 "실행 지연"
                             ],
        "observation":  "오른손의 마법봉은 하늘을 찌르고 왼손은 땅을 가리키는 사제. 머리 위에는 무한대(∞) 기호가 선명하며, 제단 위에 4원소(완드, 컵, 소드, 펜타클)가 완벽히 갖추어져 있습니다.",
        "universalSymbol":  "영적 영감(하늘)을 현실의 구체적 성과(땅)로 구현하는 \u0027As above, so below\u0027의 실천적 연금술.",
        "adviceBase":  "외부의 기적이나 타인의 손길을 기다리지 마세요. 이미 당신 손안에 문제를 매듭지을 모든 재료와 도구가 갖추어져 있습니다.",
        "checklists":  [
                           "가용할 수 있는 내 자원 3가지를 메모지에 적고 최적의 조합 찾기",
                           "애매모호한 고민을 멈추고 뚜렷한 한마디 문장으로 내 의도를 주변에 공표하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M7 6c0-1.5 2-2.5 5-2.5s5 1 5 2.5-2 2.5-5 2.5-5-1-5-2.5z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 9v4m-3 7h6M6 20h12M9 13h6\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/\u003e\u003cpath d=\"M15 4l3-3m-9 14l-3 4\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-2",
        "imageUrl": "images/tarot_2_high_priestess.jpg",
        "number":  2,
        "nameEn":  "The High Priestess",
        "nameKo":  "II. 여사제 (The High Priestess)",
        "arcana":  "major",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "직관의 힘",
                                "내면의 통찰",
                                "비밀스러운 지혜",
                                "고요한 평정",
                                "본질의 파악"
                            ],
        "keywordsReversed":  [
                                 "표면적 판단",
                                 "감정적 억압",
                                 "직관 불신",
                                 "냉담함",
                                 "비밀의 폭로"
                             ],
        "observation":  "흑과 백의 두 기둥(B와 J) 사이에 정좌한 여사제. 석류 휘장 너머로 푸른 물결이 보이며, 품에는 TORA 두루마리를 안고 발치에는 초승달이 놓여 있습니다.",
        "universalSymbol":  "깊은 무의식의 호수 밑바닥에 가라앉은 참된 직관을 길어 올릴 때임을 상징.",
        "adviceBase":  "말을 앞세우거나 섣부른 결정을 내리지 마세요. 고요히 자신의 내면 목소리와 직관이 가리키는 곳에 귀를 기울이세요.",
        "checklists":  [
                           "중요한 결정에 대해 24시간 동안 외부 조언을 차단하고 사색 시간 갖기",
                           "문득 스치는 직관적 인상을 일기장에 담담히 기록하기"
                       ],
        "symbolSvg":  "\u003crect x=\"4\" y=\"5\" width=\"3\" height=\"15\" rx=\"0.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003crect x=\"17\" y=\"5\" width=\"3\" height=\"15\" rx=\"0.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M10 8a2 2 0 114 0c0 2-2 3-2 5v2\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M9 19c2 1 4 1 6 0\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-3",
        "imageUrl": "images/tarot_3_empress.jpg",
        "number":  3,
        "nameEn":  "The Empress",
        "nameKo":  "III. 여황제 (The Empress)",
        "arcana":  "major",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "풍요와 번영",
                                "따뜻한 보살핌",
                                "결실의 수확",
                                "창조적 모성",
                                "편안한 안식"
                            ],
        "keywordsReversed":  [
                                 "과잉보호",
                                 "게으름",
                                 "생산성 저하",
                                 "감정적 결핍",
                                 "자기방임"
                             ],
        "observation":  "황금빛 밀밭 한가운데 안락한 소파에 앉은 임산부 모습의 여황제. 열두 개 별의 왕관과 금성 하트 방패, 뒤편 폭포수가 흐릅니다.",
        "universalSymbol":  "억지로 결과를 쥐어짜내려 다그치지 않아도 때가 되면 자연스럽게 무르익어 열매를 맺는 대지의 풍요.",
        "adviceBase":  "스스로를 채찍질하지 말고, 지금 있는 그대로의 풍요로움을 충분히 누리고 주변을 따뜻하게 보살피세요.",
        "checklists":  [
                           "내가 가장 편안함을 느끼는 식사나 따뜻한 휴식을 오늘 하루 선물하기",
                           "결과를 다그치지 않고 진행 중인 프로젝트를 어머니의 마음으로 격려하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 8v6m-3-3h6\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-4",
        "imageUrl": "images/tarot_4_emperor.jpg",
        "number":  4,
        "nameEn":  "The Emperor",
        "nameKo":  "IV. 황제 (The Emperor)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "질서와 체계",
                                "책임감",
                                "현실적 통제력",
                                "안정된 기반",
                                "강인한 리더십"
                            ],
        "keywordsReversed":  [
                                 "독선과 고집",
                                 "경직됨",
                                 "통제력 상실",
                                 "융통성 결여",
                                 "권력의 남용"
                             ],
        "observation":  "숫양 머리가 새겨진 석조 옥좌에 앉은 엄숙한 황제. 철갑옷 위에 붉은 망토를 두르고 앙크 십자가 홀을 쥐고 정면을 응시합니다.",
        "universalSymbol":  "냉철한 이성과 현실적인 규율로 제국을 세우는 힘. 명확한 원칙과 경계선을 긋는 태도.",
        "adviceBase":  "감정적인 타협을 멈추고, 명확한 규칙과 경계선을 설정하여 상황의 주도권을 확고히 잡으세요.",
        "checklists":  [
                           "일과 삶의 경계선(거절해야 할 부탁, 종료 시간)을 명문화하여 선언하기",
                           "혼란스러운 일정이나 재정 지출 체계를 표로 정리해 규칙 부여하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M5 4h14l-2 15H7L5 4z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 2v4m-3-2h6\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"9\" cy=\"8\" r=\"1.5\" fill=\"currentColor\"/\u003e\u003ccircle cx=\"15\" cy=\"8\" r=\"1.5\" fill=\"currentColor\"/\u003e\u003cpath d=\"M8 14h8m-5 4h2\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-5",
        "imageUrl": "images/tarot_5_hierophant.jpg",
        "number":  5,
        "nameEn":  "The Hierophant",
        "nameKo":  "V. 교황 (The Hierophant)",
        "arcana":  "major",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "전통적 지혜",
                                "도덕적 지침",
                                "신뢰와 연대",
                                "멘토십",
                                "배움과 전수"
                            ],
        "keywordsReversed":  [
                                 "교조주의",
                                 "완고한 편견",
                                 "형식주의",
                                 "잘못된 조언",
                                 "기존 관습에 얽매임"
                             ],
        "observation":  "삼중관을 쓰고 삼중 십자가 홀을 쥔 교황이 두 명의 사제에게 축복과 가르침을 내립니다. 발치에는 천국의 열쇠 두 개가 교차해 놓여 있습니다.",
        "universalSymbol":  "검증된 역사와 지혜의 시스템. 혼자 끙끙 앓지 않고 앞선 선배나 스승의 지혜를 구하는 겸손함.",
        "adviceBase":  "독단적인 고집을 내려놓고, 검증된 모범 사례와 신뢰할 수 있는 멘토의 조언을 구하세요.",
        "checklists":  [
                           "해당 분야의 선배나 전문가에게 진솔하게 조언 요청 메일 보내기",
                           "지켜야 할 약속과 기본 원칙(기본기)으로 돌아가 점검하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 3v18M7 7h10M9 11h6M8 15h8\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"8\" cy=\"20\" r=\"1.5\" fill=\"none\" stroke=\"currentColor\"/\u003e\u003ccircle cx=\"16\" cy=\"20\" r=\"1.5\" fill=\"none\" stroke=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-6",
        "imageUrl": "images/tarot_6_lovers.jpg",
        "number":  6,
        "nameEn":  "The Lovers",
        "nameKo":  "VI. 연인 (The Lovers)",
        "arcana":  "major",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "진실한 교감",
                                "영혼의 결합",
                                "가치관의 선택",
                                "조화로운 파트너십",
                                "매력과 이끌림"
                            ],
        "keywordsReversed":  [
                                 "불협화음",
                                 "가치관의 충돌",
                                 "유혹에 굴복",
                                 "우유부단",
                                 "관계의 분열"
                             ],
        "observation":  "에덴동산의 아담과 이브 위에 대천사 라파엘이 구름 속에서 두 손을 펼쳐 축복합니다. 이브 뒤에는 선악과 나무와 뱀, 아담 뒤에는 열두 개의 불꽃 나무가 있습니다.",
        "universalSymbol":  "타인과의 깊은 사랑뿐 아니라, 내 인생에서 무엇을 진정으로 사랑하고 택할 것인가에 대한 실존적 선택.",
        "adviceBase":  "마음이 진정으로 가리키는 사랑과 가치를 선택하세요. 눈앞의 유혹보다 영혼의 일치에 충실하세요.",
        "checklists":  [
                           "선택의 기로에서 \u0027남의 시선\u0027 대신 \u0027내가 진심으로 사랑하는 쪽\u0027을 고르기",
                           "소중한 파트너나 동료에게 진심 어린 감사와 애정의 표현 전하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 2v4m-3-2h6\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-7",
        "imageUrl": "images/tarot_7_chariot.jpg",
        "number":  7,
        "nameEn":  "The Chariot",
        "nameKo":  "VII. 전차 (The Chariot)",
        "arcana":  "major",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "돌파력",
                                "의지력",
                                "승리와 전진",
                                "상반된 감정의 통제",
                                "목표 집중"
                            ],
        "keywordsReversed":  [
                                 "통제 불능",
                                 "충동적 폭주",
                                 "방향 감각 상실",
                                 "좌절",
                                 "자기 파괴"
                             ],
        "observation":  "별이 수놓인 천막 아래 전차를 탄 젊은 영웅. 고삐 없이 오직 의지력만으로 서로 다른 방향으로 가려는 흑백 스핑크스를 제어하며 전진합니다.",
        "universalSymbol":  "내면의 불안과 욕망을 하나로 결집시켜 목표를 향해 똑바로 밀어붙이는 승리의 에너지.",
        "adviceBase":  "주변의 잡음에 흔들리지 말고, 목표 하나만을 정조준하여 망설임 없이 전진을 밀어붙이세요.",
        "checklists":  [
                           "방해 요소와 스마트폰 알림을 끄고 핵심 과제에 1시간 동안 몰입하기",
                           "상반된 두 감정(불안과 욕망)을 목표 달성의 추진 연료로 전환하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M4 14h16v6H4z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"7\" cy=\"17\" r=\"2\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"17\" cy=\"17\" r=\"2\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M7 6l5-3 5 3v5H7V6z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e"
    },
    {
        "id":  "major-8",
        "imageUrl": "images/tarot_8_strength.jpg",
        "number":  8,
        "nameEn":  "Strength",
        "nameKo":  "VIII. 힘 (Strength)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "부드러운 용기",
                                "내면의 인내",
                                "욕망의 순화",
                                "자비로운 통제",
                                "흔들리지 않는 확신"
                            ],
        "keywordsReversed":  [
                                 "자기 의심",
                                 "분노와 폭력성",
                                 "나약함",
                                 "통제 상실",
                                 "조급한 강요"
                             ],
        "observation":  "흰 옷을 입고 머리 위에 무한대(∞) 기호를 얹은 여인이 맨손으로 사자의 턱을 부드럽게 쓰다듬으며 길들이고 있습니다. 들판에는 꽃줄기가 만발합니다.",
        "universalSymbol":  "거친 야수성을 폭력으로 억압하는 대신, 따뜻한 연민과 흔들리지 않는 끈기로 순화시키는 참된 영적 힘.",
        "adviceBase":  "힘으로 상대를 굴복시키려 하지 마세요. 따뜻한 인내와 부드러운 설득이 가장 거친 저항을 녹여냅니다.",
        "checklists":  [
                           "울컥 치솟는 분노나 초조함이 들 때 심호흡 3번 하고 1분간 침묵 지키기",
                           "스스로의 약점이나 두려움을 비난하지 말고 너그럽게 안아주기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"8\" cy=\"12\" r=\"3.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"16\" cy=\"12\" r=\"3.5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 9a4 4 0 000 6\" stroke=\"currentColor\" stroke-width=\"1.2\"/\u003e\u003cpath d=\"M4 19c4-1 12-1 16 0\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-9",
        "imageUrl": "images/tarot_9_hermit.jpg",
        "number":  9,
        "nameEn":  "The Hermit",
        "nameKo":  "IX. 은둔자 (The Hermit)",
        "arcana":  "major",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "내적 성찰",
                                "홀로서기",
                                "지혜의 등불",
                                "고독의 가치",
                                "본질 탐구"
                            ],
        "keywordsReversed":  [
                                 "사회적 고립",
                                 "외로움에 매몰",
                                 "고집불통",
                                 "현실 기피",
                                 "소통 거부"
                             ],
        "observation":  "눈 덮인 산봉우리 위, 회색 후드 망토를 두른 노인이 별빛 등불을 높이 들고 황금 지팡이를 짚으며 발밑을 비추고 있습니다.",
        "universalSymbol":  "등불은 온 세상이 아닌 바로 앞 한 걸음만을 비춥니다. 지금 당장 디뎌야 할 진실된 한 걸음에 집중하라는 지혜.",
        "adviceBase":  "세상의 시끄러운 소음에서 한 발짝 물러나 홀로 고요한 시간을 갖고, 내면의 참된 기준을 정립하세요.",
        "checklists":  [
                           "오늘 저녁 혼자만의 30분 산책이나 사색 시간을 갖고 머릿속 정리하기",
                           "타인의 인정보다 나 스스로에게 떳떳한 기준이 무엇인지 적어보기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 3v3m-3 4h6l-1 9H10l-1-9z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M16 8l3-1v4l-3-1\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-10",
        "imageUrl": "images/tarot_10_wheel_of_fortune.jpg",
        "number":  10,
        "nameEn":  "Wheel of Fortune",
        "nameKo":  "X. 운명의 수레바퀴 (Wheel of Fortune)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "인생의 전환점",
                                "뜻밖의 기회",
                                "순환과 변화",
                                "행운의 흐름",
                                "새로운 국면"
                            ],
        "keywordsReversed":  [
                                 "불운과 지연",
                                 "변화에 대한 저항",
                                 "악순환",
                                 "통제 밖의 사건",
                                 "타이밍 불일치"
                             ],
        "observation":  "구름 속에 떠 있는 거대한 신비의 바퀴. 스핑크스가 검을 쥐고 앉아 있고 아누비스와 뱀이 바퀴를 오르내리며 4대 천사가 둘러쌉니다.",
        "universalSymbol":  "영원히 고정된 불변은 없으며 오르막과 내리막이 순환함. 내면의 중심축을 유지하며 변화의 파도를 탈 것.",
        "adviceBase":  "변화의 물결을 거스르려 하지 말고 유연하게 몸을 맡기세요. 찾아온 예기치 않은 기회의 파도를 타세요.",
        "checklists":  [
                           "내가 통제할 수 없는 외부 변수를 억지로 바꾸려 하지 말고 인정하기",
                           "최근 일어난 뜻밖의 변화에서 숨겨진 긍정적 기회 요소를 찾아내기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"12\" cy=\"12\" r=\"3\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 4v5m0 6v5M4 12h5m6 0h5\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-11",
        "imageUrl": "images/tarot_11_justice.jpg",
        "number":  11,
        "nameEn":  "Justice",
        "nameKo":  "XI. 정의 (Justice)",
        "arcana":  "major",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "공평과 정의",
                                "인과응보",
                                "명확한 판단",
                                "책임의 수용",
                                "균형 감각"
                            ],
        "keywordsReversed":  [
                                 "불공정함",
                                 "편견과 왜곡",
                                 "책임 회피",
                                 "가혹한 판결",
                                 "자기 정당화"
                             ],
        "observation":  "붉은 로브를 입은 여신이 오른손에는 진실을 가르는 양날의 검을 곧게 세우고, 왼손에는 황금 저울을 완벽한 수평으로 들고 있습니다.",
        "universalSymbol":  "모든 행동에는 필연적인 결과가 따릅니다. 감정에 치우치지 않는 냉철하고 균형 잡힌 시선으로 진실을 대면할 것.",
        "adviceBase":  "주관적 감정이나 피해의식을 배제하고, 객관적 사실관계와 원칙에 입각하여 공정하게 판단하세요.",
        "checklists":  [
                           "양측의 입장과 객관적 팩트를 종이 좌우에 나란히 적어 대조해보기",
                           "내가 져야 할 정당한 몫의 책임을 회피하지 않고 인정하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 3v18M7 8h10M6 8l-2 5h4L6 8zm12 0l-2 5h4l-2-5z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-12",
        "imageUrl": "images/tarot_12_hanged_man.jpg",
        "number":  12,
        "nameEn":  "The Hanged Man",
        "nameKo":  "XII. 매달린 사람 (The Hanged Man)",
        "arcana":  "major",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "관점의 역전",
                                "자발적 헌신",
                                "깨달음의 정지",
                                "집착 내려놓기",
                                "새로운 시각"
                            ],
        "keywordsReversed":  [
                                 "무의미한 희생",
                                 "정체와 답답함",
                                 "피해자 코스프레",
                                 "고집스러운 집착"
                             ],
        "observation":  "살아 숨 쉬는 T자형 생명나무에 한쪽 발이 묶여 거꾸로 매달린 청년. 고통스러운 표정 대신 머리 뒤에서 성스러운 후광이 환하게 빛나고 있습니다.",
        "universalSymbol":  "세상의 통념을 거꾸로 뒤집어 바라볼 때 얻어지는 깊은 깨달음. 행동을 멈추고 관점을 전환하는 지혜.",
        "adviceBase":  "조급하게 버둥거리기를 멈추고 잠시 멈추어 서세요. 상황을 거꾸로 뒤집어 보면 완전히 새로운 해답이 보입니다.",
        "checklists":  [
                           "문제를 해결하려 안달복달하는 행동을 오늘 하루 완전히 멈춰보기",
                           "상대방의 입장에서 내 모습이 어떻게 보일지 거꾸로 시뮬레이션해보기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 3h12M12 3v6m0 0l3 4-3 4-3-4 3-4zm0 8v7m-3-4h6\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"19\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-13",
        "imageUrl": "images/tarot_13_death.jpg",
        "number":  13,
        "nameEn":  "Death",
        "nameKo":  "XIII. 죽음 (Death)",
        "arcana":  "major",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "낡은 것의 종결",
                                "새로운 탄생",
                                "근본적 쇄신",
                                "필연적 이별",
                                "재출발"
                            ],
        "keywordsReversed":  [
                                 "변화에 대한 완강한 거부",
                                 "썩은 관계의 연명",
                                 "미련",
                                 "고통스러운 지연"
                             ],
        "observation":  "검은 갑옷의 해골 기사가 백장미 깃발을 들고 백마를 타고 전진합니다. 저 멀리 지평선 두 탑 사이로 찬란한 태양이 떠오릅니다.",
        "universalSymbol":  "낡고 썩은 껍질이 벗겨져야 새로운 생명이 피어남. 지평선 너머 떠오르는 태양은 눈부신 새 출발을 약속합니다.",
        "adviceBase":  "수명을 다한 관계나 습관, 프로젝트를 미련 없이 떠나보내세요. 비워내야만 새로운 것이 채워집니다.",
        "checklists":  [
                           "오래 방치되었거나 활력을 주지 못하는 물건이나 관계 1가지 정리하기",
                           "과거에 대한 미련을 종이에 적고 찢어 작별 의식 치르기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"9\" r=\"4\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M10 12h4m-3 2h2m-6 3c2-2 4-2 6 0\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e\u003cpath d=\"M17 3l4 4-2 2-4-4 2-2z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e"
    },
    {
        "id":  "major-14",
        "imageUrl": "images/tarot_14_temperance.jpg",
        "number":  14,
        "nameEn":  "Temperance",
        "nameKo":  "XIV. 절제 (Temperance)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "절제와 균형",
                                "서로 다른 것의 융합",
                                "마음의 평정",
                                "중용의 지혜",
                                "치유"
                            ],
        "keywordsReversed":  [
                                 "불균형과 극단",
                                 "과도한 탐닉",
                                 "갈등의 심화",
                                 "조급함",
                                 "감정 과잉"
                             ],
        "observation":  "한 발은 물속에, 한 발은 대지 위에 디딘 대천사 미카엘이 두 개의 성배 사이로 생명수를 한 방울도 흘리지 않고 끊임없이 교류시킵니다.",
        "universalSymbol":  "이성과 감성, 물질과 정신이라는 상반된 에너지를 조화롭게 섞어내는 중용과 연금술적 결합.",
        "adviceBase":  "어느 한쪽 극단으로 치우치지 마세요. 양극단의 완충 지대를 찾고 감정의 온도를 평온하게 맞추세요.",
        "checklists":  [
                           "극단적인 흑백논리 대신 제3의 중도 절충안 도출하기",
                           "신체적 리듬을 깨뜨리는 습관 1가지 절제하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 7h12l-2 8H8L6 7z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 2v3m-5 14c3-1 7-1 10 0\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"11\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-15",
        "imageUrl": "images/tarot_15_devil.jpg",
        "number":  15,
        "nameEn":  "The Devil",
        "nameKo":  "XV. 악마 (The Devil)",
        "arcana":  "major",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "속박의 자각",
                                "물질적 집착",
                                "그림자의 직시",
                                "맹목적 유혹",
                                "자기 한계 극복"
                            ],
        "keywordsReversed":  [
                                 "사슬 끊기",
                                 "집착에서의 해방",
                                 "환상 깨어남",
                                 "회복",
                                 "자유의 쟁취"
                             ],
        "observation":  "뿔 달린 바포메트 악마의 제단 아래 알몸의 남녀가 쇠사슬에 묶여 있습니다. 하지만 목에 걸린 사슬은 느슨하여 원하기만 하면 언제든 벗어날 수 있습니다.",
        "universalSymbol":  "우리를 가두는 감옥은 외부의 강제가 아니라, \u0027어쩔 수 없다\u0027며 타협해버린 우리 자신의 두려움과 탐욕입니다.",
        "adviceBase":  "스스로를 옭아매고 있는 중독, 타성, 핑계를 직시하세요. 사슬을 쥐고 있는 손은 바로 당신 자신입니다.",
        "checklists":  [
                           "끊어내지 못하고 있는 해로운 습관이나 집착의 원인을 정직하게 고백하기",
                           "\u0027어쩔 수 없다\u0027는 핑계를 버리고 사슬을 벗어던질 단호한 결단 내리기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M8 4l4 4 4-4M12 8v6m-5 4c3-2 7-2 10 0\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"9\" cy=\"11\" r=\"1\" fill=\"currentColor\"/\u003e\u003ccircle cx=\"15\" cy=\"11\" r=\"1\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-16",
        "imageUrl": "images/tarot_16_tower.jpg",
        "number":  16,
        "nameEn":  "The Tower",
        "nameKo":  "XVI. 탑 (The Tower)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "거짓된 구조의 붕괴",
                                "충격적 각성",
                                "예상치 못한 급변",
                                "환상의 타파",
                                "자유의 돌파구"
                            ],
        "keywordsReversed":  [
                                 "위기 모면",
                                 "붕괴의 지연",
                                 "변화에 대한 공포",
                                 "필연적 파국의 회피"
                             ],
        "observation":  "바위산 위에 높이 솟은 오만한 탑의 왕관에 벼락이 내리쳐 화염이 솟구치고 사람들이 추락합니다. 거짓된 토대 위에 세운 바벨탑이 무너져 내립니다.",
        "universalSymbol":  "거짓과 위선 위에 위태롭게 세워졌던 껍데기가 부서져 참된 진실의 바닥으로 내려앉는 순간의 해방.",
        "adviceBase":  "갑작스러운 변화나 계획의 파탄에 당황하지 마세요. 곪았던 문제가 터진 것이며, 이제 튼튼한 진짜 기초를 놓을 기회입니다.",
        "checklists":  [
                           "예상치 못한 충격이나 실패를 겸허히 인정하고 거짓 방어기제 내려놓기",
                           "무너진 잔해 속에서 지켜내야 할 진짜 가치 1가지만 골라 챙기기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M7 21l2-16h6l2 16H7z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 2l-2 5h4l-3 4h4l-2 3\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003cpath d=\"M5 21h14\" stroke=\"currentColor\" stroke-width=\"1.5\"/\u003e"
    },
    {
        "id":  "major-17",
        "imageUrl": "images/tarot_17_star.jpg",
        "number":  17,
        "nameEn":  "The Star",
        "nameKo":  "XVII. 별 (The Star)",
        "arcana":  "major",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "빛나는 희망",
                                "마음의 치유",
                                "창의적 영감",
                                "순수한 낙관",
                                "재충전"
                            ],
        "keywordsReversed":  [
                                 "비관주의",
                                 "영감의 고갈",
                                 "자기 의심",
                                 "절망감",
                                 "기회의 외면"
                             ],
        "observation":  "맑은 밤하늘 거대한 팔각 별 아래 벌거벗은 여인이 두 개의 주전자로 대지와 연못에 생명수를 아낌없이 붓고 있습니다.",
        "universalSymbol":  "어두운 시련이 지나간 후 찾아오는 맑고 투명한 평화. 감출 것 없는 순수함으로 세상과 자신에게 생명력을 채워 넣는 힐링.",
        "adviceBase":  "어두운 밤은 지나갔습니다. 미래에 대한 낙관과 희망을 되찾고, 아낌없이 당신의 재능을 세상에 베푸세요.",
        "checklists":  [
                           "내가 진정으로 바라는 미래 비전을 시각화하거나 드림보드로 스케치하기",
                           "물과 자연이 있는 공간에서 평온한 휴식 취하기"
                       ],
        "symbolSvg":  "\u003cpolygon points=\"12,2 14.5,8 21,9 16,13.5 17.5,20 12,16.5 6.5,20 8,13.5 3,9 9.5,8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"12\" cy=\"11\" r=\"2\" fill=\"currentColor\"/\u003e\u003cpath d=\"M5 21c3-1 6-1 9 0\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e"
    },
    {
        "id":  "major-18",
        "imageUrl": "images/tarot_18_moon.jpg",
        "number":  18,
        "nameEn":  "The Moon",
        "nameKo":  "XVIII. 달 (The Moon)",
        "arcana":  "major",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "불안과 모호함",
                                "무의식의 그림자",
                                "환상과 착각",
                                "숨겨진 진실",
                                "직관적 통찰"
                            ],
        "keywordsReversed":  [
                                 "안개 걷힘",
                                 "진실의 발견",
                                 "불안의 해소",
                                 "두려움 극복",
                                 "명확한 시야"
                             ],
        "observation":  "눈물방울을 떨어뜨리는 달 아래 개와 늑대가 울부짖고, 깊은 연못에서 가재 한 마리가 기어 나옵니다. 두 개의 먼 탑 사이로 좁은 오솔길이 굽이쳐 있습니다.",
        "universalSymbol":  "어스름한 달빛 아래 만물이 왜곡되어 보이는 밤. 실체가 없는 막연한 공포와 상상 속 불안을 식별해야 할 시간.",
        "adviceBase":  "막연한 두려움과 상상의 불안에 휘둘리지 마세요. 사실과 상상을 분리하고, 날이 밝을 때까지 섣부른 결정을 보류하세요.",
        "checklists":  [
                           "밤늦은 시간에 중요한 결정을 내리지 말고 아침 햇살 아래로 미루기",
                           "머릿속 걱정 중 \u0027실제 사실\u0027과 \u0027상상의 불안\u0027을 분리하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a7 7 0 11-7.54-7.54C12.92 3.04 12.46 3 12 3z\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003ccircle cx=\"8\" cy=\"14\" r=\"1\" fill=\"currentColor\"/\u003e\u003ccircle cx=\"15\" cy=\"17\" r=\"1\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-19",
        "imageUrl": "images/tarot_19_sun.jpg",
        "number":  19,
        "nameEn":  "The Sun",
        "nameKo":  "XIX. 태양 (The Sun)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "명쾌한 성공",
                                "환희와 기쁨",
                                "생명력의 분출",
                                "순수한 행복",
                                "진실의 승리"
                            ],
        "keywordsReversed":  [
                                 "일시적 먹구름",
                                 "성공의 지연",
                                 "과도한 낙관",
                                 "활력 저하",
                                 "어린애 같은 응석"
                             ],
        "observation":  "찬란한 거대한 태양이 미소 짓는 아래 어린아이가 붉은 깃발을 들고 백마를 타며 환호하고 있습니다. 뒤편에는 해바라기가 활짝 피어 있습니다.",
        "universalSymbol":  "복잡한 계산을 내려놓고 어린아이와 같은 순수한 열정으로 삶을 긍정할 때 찾아오는 최고의 축복과 광명.",
        "adviceBase":  "모든 의심을 걷어내고 당당하게 햇빛 속으로 걸어 나오세요. 당신의 순수한 열정을 마음껏 표현하세요.",
        "checklists":  [
                           "오늘 하루 동안 감사한 일 세 가지를 떠올리며 스스로에게 환한 칭찬 건네기",
                           "숨기거나 주저하지 말고 내 아이디어를 세상에 공개하기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"5\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 2v3m0 14v3M2 12h3m14 0h3m-3.05-6.95l-2.12 2.12M7.17 16.83l-2.12 2.12m13.9 0l-2.12-2.12M7.17 7.17L5.05 5.05\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"12\" r=\"2\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-20",
        "imageUrl": "images/tarot_20_judgement.jpg",
        "number":  20,
        "nameEn":  "Judgement",
        "nameKo":  "XX. 심판 (Judgement)",
        "arcana":  "major",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "부활과 각성",
                                "최종적 결단",
                                "소명의 발견",
                                "과거의 청산",
                                "새로운 부름"
                            ],
        "keywordsReversed":  [
                                 "자기 비난",
                                 "과거에의 집착",
                                 "부름의 외면",
                                 "결정 장애",
                                 "후회와 미련"
                             ],
        "observation":  "구름 속에서 대천사 가브리엘이 황금 나팔을 불자 무덤에서 일어난 사람들이 두 팔을 벌려 새로운 생명을 환호로 맞이합니다.",
        "universalSymbol":  "과거의 낡은 삶에 영원한 종지부를 찍고, 더 높은 차원의 영적 소명과 참된 자아로 부활하는 각성의 순간.",
        "adviceBase":  "망설임을 끝내고 과감하게 새로운 차원으로 도약하세요. 내면의 양심과 소명이 부르는 소리에 응답하세요.",
        "checklists":  [
                           "오랫동안 미뤄왔던 숙원 과제에 대한 최종 마침표 찍기",
                           "과거의 과오를 자책하지 말고 배운 교훈만 취하고 털어내기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v8m-4-4h8M8 14h8v7H8z\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003cpath d=\"M5 21h14\" stroke=\"currentColor\" stroke-width=\"1.5\"/\u003e\u003ccircle cx=\"12\" cy=\"6\" r=\"2\" fill=\"none\" stroke=\"currentColor\"/\u003e"
    },
    {
        "id":  "major-21",
        "imageUrl": "images/tarot_21_world.jpg",
        "number":  21,
        "nameEn":  "The World",
        "nameKo":  "XXI. 세계 (The World)",
        "arcana":  "major",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "위대한 완성",
                                "통합과 조화",
                                "목표 달성",
                                "새로운 차원의 시작",
                                "완전한 자유"
                            ],
        "keywordsReversed":  [
                                 "미완의 과제",
                                 "마지막 문턱의 정체",
                                 "완벽주의의 덫",
                                 "교훈의 미흡"
                             ],
        "observation":  "월계수 화환 한가운데서 승리의 여인이 두 개의 마법봉을 쥐고 춤추고 있습니다. 네 모퉁이에는 4대 수호자(인간, 독수리, 사자, 황소)가 자리합니다.",
        "universalSymbol":  "0번 바보에서 시작된 머나먼 여정이 마침내 완전한 조화를 이루며 완결되는 순간이자 다음 차원의 관문.",
        "adviceBase":  "지금까지 걸어온 긴 여정의 결실을 축하하세요. 하나의 챕터를 아름답게 마무리하고 더 넓은 세상으로 나아가세요.",
        "checklists":  [
                           "이뤄낸 성취들을 돌아보고 스스로에게 진심 어린 축하와 보상 제공하기",
                           "미완으로 남겨둔 마지막 5%의 디테일을 정리하여 마침표 찍기"
                       ],
        "symbolSvg":  "\u003cellipse cx=\"12\" cy=\"12\" rx=\"7\" ry=\"9\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpath d=\"M12 6v12m-3-6h6\" stroke=\"currentColor\" stroke-width=\"1.2\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"5\" cy=\"5\" r=\"1.5\" fill=\"currentColor\"/\u003e\u003ccircle cx=\"19\" cy=\"5\" r=\"1.5\" fill=\"currentColor\"/\u003e\u003ccircle cx=\"5\" cy=\"19\" r=\"1.5\" fill=\"currentColor\"/\u003e\u003ccircle cx=\"19\" cy=\"19\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-1",
        "imageUrl": "images/tarot_wands_1.jpg",
        "number":  1,
        "nameEn":  "Ace of Wands",
        "nameKo":  "완드 에이스 (Ace of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "새로운 기회의 씨앗",
                                "순수한 영감",
                                "잠재력 발화",
                                "도약의 시작"
                            ],
        "keywordsReversed":  [
                                 "기회의 실기",
                                 "성급한 착수",
                                 "방향성 상실",
                                 "에너지 고갈"
                             ],
        "observation":  "구름 속에서 뻗어 나온 신성한 손이 싹이 움트는 거대한 완드를 힘차게 쥐고 있습니다. 배경의 푸른 산과 성채 위로 봄날의 생명력이 솟구칩니다.",
        "universalSymbol":  "완드(불)의 순수한 원초적 에너지. 무한한 잠재력과 창조적 영감, 새로운 모험의 첫 불씨를 상징합니다.",
        "adviceBase":  "마음속에 일어난 영감과 열정의 불씨를 주저 없이 현실의 첫 행동으로 연결해 보세요.",
        "checklists":  [
                           "30분 안에 시도할 수 있는 가장 작은 첫 단계를 오늘 즉시 실행하기",
                           "과도한 계산이나 망설임에 에너지를 낭비하지 않기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"5\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-2",
        "imageUrl": "images/tarot_wands_2.jpg",
        "number":  2,
        "nameEn":  "Two of Wands",
        "nameKo":  "완드 2 (Two of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "균형 잡힌 계획",
                                "선택의 기로",
                                "파트너십",
                                "전망의 확장"
                            ],
        "keywordsReversed":  [
                                 "우유부단",
                                 "불균형",
                                 "갈등의 씨앗",
                                 "예측 실패"
                             ],
        "observation":  "성벽 테라스 위에 선 인물이 오른손에 지구본을 쥐고 다른 손으로 고정된 지팡이를 잡은 채 먼 바다와 수평선을 응시하고 있습니다.",
        "universalSymbol":  "안전한 성벽 안의 성취에 안주하지 않고, 미지의 세계로 시야를 넓히며 주도적인 계획을 세우는 혜안을 상징합니다.",
        "adviceBase":  "현재에 안주하지 말고, 한 단계 높은 목표와 더 넓은 세상을 향한 구체적 계획을 세우세요.",
        "checklists":  [
                           "다음 단계로 도약하기 위해 필요한 핵심 자원과 일정 점검하기",
                           "선택의 기로에서 우유부단하게 시간을 끌지 않고 기준 세우기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"6\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-3",
        "imageUrl": "images/tarot_wands_3.jpg",
        "number":  3,
        "nameEn":  "Three of Wands",
        "nameKo":  "완드 3 (Three of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "최초의 성취",
                                "협력과 확장",
                                "도약의 발판",
                                "전망의 확립"
                            ],
        "keywordsReversed":  [
                                 "협력의 결여",
                                 "진척 지연",
                                 "실망스러운 소식",
                                 "고립"
                             ],
        "observation":  "바다를 향해 정립된 세 개의 완드 사이에 선 인물이 등 뒤를 보이며 황금빛 바다로 출항하는 배들을 지켜보고 있습니다.",
        "universalSymbol":  "초기 기획과 탐색이 결실을 맺어 본격적인 협력과 영역 확장의 궤도에 올랐음을 나타냅니다.",
        "adviceBase":  "이미 놓아둔 튼튼한 발판 위에서, 시야를 넓혀 장기적인 확장과 협력의 기회를 모색하세요.",
        "checklists":  [
                           "믿을 수 있는 동료나 파트너와 진행 상황을 공유하고 피드백 받기",
                           "결과가 나타나기까지 조급해하지 않고 신뢰를 바탕으로 기다리기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"7\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-4",
        "imageUrl": "images/tarot_wands_4.jpg",
        "number":  4,
        "nameEn":  "Four of Wands",
        "nameKo":  "완드 4 (Four of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "안정과 축하",
                                "견고한 기반",
                                "평화로운 휴식",
                                "체계의 정착"
                            ],
        "keywordsReversed":  [
                                 "과도한 안주",
                                 "불안정한 토대",
                                 "정체",
                                 "축하의 퇴색"
                             ],
        "observation":  "풍성한 꽃과 과일 화환으로 장식된 네 개의 거대한 지팡이 기둥 아래, 두 인물이 꽃다발을 흔들며 평화로운 축하의 잔치를 벌입니다.",
        "universalSymbol":  "노력 끝에 도달한 견고한 안정과 화합, 일상의 기쁨과 공동체의 축복을 상징합니다.",
        "adviceBase":  "지금까지 이뤄낸 성취를 축하하고, 함께한 사람들과 기쁨과 감사를 나누며 기반을 공고히 하세요.",
        "checklists":  [
                           "작은 성과라도 스스로 칭찬하고 함께 고생한 이들에게 감사의 마음 전하기",
                           "충분한 휴식을 통해 다음 도약을 위한 체력과 마음의 에너지 충전하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"8\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-5",
        "number":  5,
        "nameEn":  "Five of Wands",
        "nameKo":  "완드 5 (Five of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "건설적 경쟁",
                                "도전과 시련",
                                "성장의 진통",
                                "극복의 의지"
                            ],
        "keywordsReversed":  [
                                 "무의미한 소모전",
                                 "패배감",
                                 "내부분열",
                                 "갈등의 회피"
                             ],
        "observation":  "다섯 명의 젊은이들이 각자 지팡이를 쥐고 서로 다른 방향으로 부딪치며 혼전의 모의 전투를 벌이고 있습니다.",
        "universalSymbol":  "치명적 적대가 아닌 성장을 위한 역동적 경쟁, 다양한 관점이 충돌하며 새로운 질서를 찾아가는 과도기를 상징합니다.",
        "adviceBase":  "의견 차이나 경쟁을 두려워하지 말고, 다양한 관점을 수용하여 한층 발전하는 계기로 삼으세요.",
        "checklists":  [
                           "소모적인 감정 싸움 대신 객관적인 논리와 목표에 집중하여 대화하기",
                           "상대방의 의견에서 배울 점을 찾아 나의 계획을 정교하게 다듬기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"9\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-6",
        "imageUrl": "images/tarot_wands_6.jpg",
        "number":  6,
        "nameEn":  "Six of Wands",
        "nameKo":  "완드 6 (Six of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "승리와 조화",
                                "성공의 공인",
                                "나눔과 순항",
                                "과도기 극복"
                            ],
        "keywordsReversed":  [
                                 "자만심",
                                 "인정의 결핍",
                                 "지연된 보상",
                                 "불공정한 배분"
                             ],
        "observation":  "월계관을 쓴 기사가 승리의 월계수가 달린 지팡이를 높이 들고 백마를 탄 채 환호하는 군중 사이를 당당히 행진합니다.",
        "universalSymbol":  "고난을 극복하고 얻은 공개적 인정과 승리, 정당한 보상과 리더십의 확립을 상징합니다.",
        "adviceBase":  "당당하게 성취를 인정받고, 그에 걸맞은 겸손함과 리더십으로 주변 사람들을 따뜻하게 이끄세요.",
        "checklists":  [
                           "자신감을 갖고 나의 입장과 성과를 주변에 명확히 전달하기",
                           "자만심에 빠지지 않고 팀원들의 기여를 잊지 않고 챙기기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-7",
        "imageUrl": "images/tarot_wands_7.jpg",
        "number":  7,
        "nameEn":  "Seven of Wands",
        "nameKo":  "완드 7 (Seven of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "신념의 수호",
                                "독창적 전략",
                                "고투와 방어",
                                "인내의 시험"
                            ],
        "keywordsReversed":  [
                                 "압도당함",
                                 "포기와 후퇴",
                                 "불리한 위치",
                                 "우유부단"
                             ],
        "observation":  "높은 언덕 위에 선 한 인물이 아래쪽에서 솟구쳐 올라오는 여섯 개의 지팡이에 맞서 홀로 자신의 막대를 굳건히 겨누고 있습니다.",
        "universalSymbol":  "불리해 보이는 압박 속에서도 유리한 고지를 점하고 신념을 수호하는 결연한 용기와 저항력을 상징합니다.",
        "adviceBase":  "외부의 압박이나 반대에 굴하지 말고, 내가 믿는 원칙과 가치를 당당히 지켜내세요.",
        "checklists":  [
                           "나만의 핵심 입장과 타협할 수 없는 기준을 명확히 선 긋기",
                           "혼자서 무리하게 감당하려 하지 말고 체력 안배에 신경 쓰기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"11\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-8",
        "number":  8,
        "nameEn":  "Eight of Wands",
        "nameKo":  "완드 8 (Eight of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "빠른 전개",
                                "성실한 연마",
                                "숙련과 이동",
                                "목표 집중"
                            ],
        "keywordsReversed":  [
                                 "조급한 서두름",
                                 "정체와 지연",
                                 "방향성 혼란",
                                 "피로 누적"
                             ],
        "observation":  "푸른 들판과 맑은 하늘을 가로지르며 여덟 개의 완드가 일제히 사선으로 비행하듯 목적지를 향해 날아가고 있습니다.",
        "universalSymbol":  "지연되던 일들이 급물살을 타는 신속한 가속도, 거침없는 소통과 빠른 목표 도달을 상징합니다.",
        "adviceBase":  "상황이 빠르게 전개되고 있으니, 망설임 없이 기회를 포착하고 신속하게 의사를 결정하세요.",
        "checklists":  [
                           "핵심 메시지나 답변을 미루지 말고 오늘 안에 간결하게 전달하기",
                           "우선순위가 가장 높은 핵심 과제에 집중하여 일사천리로 처리하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"12\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-9",
        "number":  9,
        "nameEn":  "Nine of Wands",
        "nameKo":  "완드 9 (Nine of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "회복과 방어",
                                "마지막 인내",
                                "만족과 풍요",
                                "완성의 목전"
                            ],
        "keywordsReversed":  [
                                 "과도한 경계심",
                                 "탈진",
                                 "마지막 문턱의 좌절",
                                 "의심"
                             ],
        "observation":  "머리에 붕대를 감은 지친 전사가 뒤편의 견고한 여덟 개 완드 벽 앞에서 마지막 남은 지팡이를 꼭 쥐고 경계 태세를 유지합니다.",
        "universalSymbol":  "수많은 시련을 겪고도 끝까지 자리를 지키는 인내와 방어력, 최종 완주를 앞둔 마지막 끈기를 상징합니다.",
        "adviceBase":  "마지막 고비에 다다랐습니다. 지친 마음을 다독이며 경계를 늦추지 말고 끝까지 완주하세요.",
        "checklists":  [
                           "지금까지 잘 버텨온 나 자신을 격려하며 마지막 점검 완료하기",
                           "지나친 경계심이나 방어적 태도로 주변의 도움을 밀어내지 않기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"13\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-10",
        "number":  10,
        "nameEn":  "Ten of Wands",
        "nameKo":  "완드 10 (Ten of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "과제의 완수",
                                "책임과 성취",
                                "풍요의 극치",
                                "새 순환의 준비"
                            ],
        "keywordsReversed":  [
                                 "과중한 부담",
                                 "번아웃",
                                 "무너진 책임",
                                 "파탄"
                             ],
        "observation":  "무거운 열 개의 지팡이를 한 아름에 그러안은 인물이 허리를 굽힌 채 멀리 보이는 마을을 향해 힘겹게 걸어가고 있습니다.",
        "universalSymbol":  "과도한 책임감과 한계에 다다른 부담감, 목적지가 얼마 남지 않은 마지막 무게를 상징합니다.",
        "adviceBase":  "혼자 모든 짐을 짊어지려 하지 말고, 우선순위를 정해 불필요한 부담을 과감히 내려놓으세요.",
        "checklists":  [
                           "내가 직접 하지 않아도 될 일들을 위임하거나 일정을 재조정하기",
                           "책임감 때문에 건강을 해치지 않도록 강제 휴식 시간 배정하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"14\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-11",
        "imageUrl": "images/tarot_wands_11.jpg",
        "number":  11,
        "nameEn":  "Page of Wands",
        "nameKo":  "완드 시종 (Page of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "풋풋한 탐색",
                                "새로운 소식",
                                "배움의 열정",
                                "호기심 많은 시작"
                            ],
        "keywordsReversed":  [
                                 "미성숙함",
                                 "경솔한 판단",
                                 "실망스러운 전갈",
                                 "변덕"
                             ],
        "observation":  "화려한 도롱뇽 문양의 옷을 입은 젊은 시종이 두 손으로 세워 쥔 막대를 신기한 듯 진지하게 올려다보고 있습니다.",
        "universalSymbol":  "풋풋한 호기심과 순수한 열정, 새로운 소식과 아이디어에 눈을 반짝이는 배움의 시작을 상징합니다.",
        "adviceBase":  "풋풋한 호기심과 배움의 열정을 품고, 새로운 지식과 경험에 열린 마음으로 다가가세요.",
        "checklists":  [
                           "관심 있던 분야의 책이나 강좌를 찾아 첫걸음을 내딛기",
                           "경솔한 판단이나 변덕을 경계하고 끈기 있게 탐색 이어가기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"15\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-12",
        "imageUrl": "images/tarot_wands_12.jpg",
        "number":  12,
        "nameEn":  "Knight of Wands",
        "nameKo":  "완드 기사 (Knight of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "돌진하는 행동",
                                "역동적 추구",
                                "용기 있는 도전",
                                "목표를 향한 질주"
                            ],
        "keywordsReversed":  [
                                 "충동적 폭주",
                                 "조급한 경솔함",
                                 "불협화음",
                                 "에너지 낭비"
                             ],
        "observation":  "불타는 갈기를 가진 적토마를 탄 기사가 투구 깃털을 휘날리며 사막을 질주하듯 힘차게 지팡이를 뻗고 돌진합니다.",
        "universalSymbol":  "거침없는 추진력과 대담한 모험심, 목표를 향해 전속력으로 달려가는 뜨거운 활력을 상징합니다.",
        "adviceBase":  "뜨거운 열정과 추진력을 발휘하되, 충동적인 실수를 방지하기 위해 방향성을 점검하세요.",
        "checklists":  [
                           "목표를 향해 거침없이 전진하되 이동 경로와 준비물 재확인하기",
                           "성급함으로 인해 주변 사람들에게 상처를 주지 않도록 말씨 점검하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"16\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-13",
        "imageUrl": "images/tarot_wands_13.jpg",
        "number":  13,
        "nameEn":  "Queen of Wands",
        "nameKo":  "완드 여왕 (Queen of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "성숙한 포용",
                                "내적 통찰",
                                "풍부한 자애",
                                "자신감과 지혜"
                            ],
        "keywordsReversed":  [
                                 "감정의 과잉",
                                 "질투와 편견",
                                 "차가운 단절",
                                 "자기중심성"
                             ],
        "observation":  "해바라기와 사자 문양이 새겨진 왕좌에 앉은 여왕이 한 손에 완드를, 다른 손에 황금 해바라기를 들고 당당하게 정면을 응시합니다.",
        "universalSymbol":  "외향적 활력과 따뜻한 카리스마, 독립심과 풍부한 매력으로 주변을 이끄는 리더십을 상징합니다.",
        "adviceBase":  "따뜻한 카리스마와 긍정적인 활력으로 나 자신을 믿고 주변을 밝게 비추세요.",
        "checklists":  [
                           "나만의 매력과 직관을 신뢰하고 당당하게 의사를 표현하기",
                           "감정 기복에 휩쓸리지 않고 여유로운 미소로 상황 대처하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"17\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "wands-14",
        "imageUrl": "images/tarot_wands_14.jpg",
        "number":  14,
        "nameEn":  "King of Wands",
        "nameKo":  "완드 왕 (King of Wands)",
        "arcana":  "minor",
        "suit":  "wands",
        "element":  "불(Fire)",
        "keywordsUpright":  [
                                "노련한 리더십",
                                "권위와 성취",
                                "확고한 통제",
                                "완성된 지배력"
                            ],
        "keywordsReversed":  [
                                 "독선과 아집",
                                 "경직된 통제",
                                 "권력의 남용",
                                 "무책임"
                             ],
        "observation":  "불타는 도롱뇽 왕관을 쓴 왕이 꼿꼿한 자세로 지팡이를 쥐고 발치에 작은 도롱뇽을 둔 채 결연한 시선으로 앞을 바라봅니다.",
        "universalSymbol":  "성숙한 비전과 확고한 결단력, 자신의 열정을 다스려 조직과 프로젝트를 통솔하는 원숙한 지도자를 상징합니다.",
        "adviceBase":  "확고한 비전과 결단력으로 상황의 주도권을 쥐고, 사람들에게 신뢰할 수 있는 방향을 제시하세요.",
        "checklists":  [
                           "장기적인 비전을 세우고 확신에 찬 어조로 프로젝트 이끌기",
                           "독단적인 판단에 치우치지 않도록 동료들의 의견을 경청하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v20M9 6l3-3 3 3M7 10c1-1 3-1 3 1s-2 2-2 3M17 9c-1-1-3-1-3 1s2 2 2 3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"18\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-1",
        "imageUrl": "images/tarot_cups_1.jpg",
        "number":  1,
        "nameEn":  "Ace of Cups",
        "nameKo":  "컵 에이스 (Ace of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "새로운 기회의 씨앗",
                                "순수한 영감",
                                "잠재력 발화",
                                "도약의 시작"
                            ],
        "keywordsReversed":  [
                                 "기회의 실기",
                                 "성급한 착수",
                                 "방향성 상실",
                                 "에너지 고갈"
                             ],
        "observation":  "구름에서 뻗어 나온 신성한 손이 성체와 비둘기가 내려앉은 황금 성배를 받치고 있으며, 다섯 줄기 은혜의 물이 연못으로 넘쳐흐릅니다.",
        "universalSymbol":  "컵(물)의 순수한 원초적 감정. 마르지 않는 사랑과 연민, 영적 충만함과 치유의 시작을 상징합니다.",
        "adviceBase":  "마음속 깊은 곳에서 샘솟는 순수한 사랑과 감정을 솔직하게 인정하고 따뜻하게 수용하세요.",
        "checklists":  [
                           "내 안의 감정을 억누르지 않고 솔직하게 글이나 일기로 표현해 보기",
                           "가까운 이에게 따뜻한 진심과 감사의 마음을 가볍게 표현하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"2\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-2",
        "number":  2,
        "nameEn":  "Two of Cups",
        "nameKo":  "컵 2 (Two of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "균형 잡힌 계획",
                                "선택의 기로",
                                "파트너십",
                                "전망의 확장"
                            ],
        "keywordsReversed":  [
                                 "우유부단",
                                 "불균형",
                                 "갈등의 씨앗",
                                 "예측 실패"
                             ],
        "observation":  "화관을 쓴 젊은 남녀가 마주 서서 서로의 성배를 교환하며 서약을 맺고, 그 위로 카두세우스와 날개 달린 사자 머리가 축복합니다.",
        "universalSymbol":  "서로 다른 두 영혼의 동등하고 조화로운 결합, 깊은 공감대와 상호 존중을 바탕으로 한 신뢰를 상징합니다.",
        "adviceBase":  "서로를 향한 따뜻한 이해와 공감을 바탕으로, 진솔하고 깊이 있는 소통의 다리를 놓으세요.",
        "checklists":  [
                           "상대방의 입장에서 이야기를 끝까지 경청하고 맞장구쳐 주기",
                           "자존심을 내려놓고 솔직한 감정을 부드러운 어조로 고백하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-3",
        "number":  3,
        "nameEn":  "Three of Cups",
        "nameKo":  "컵 3 (Three of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "최초의 성취",
                                "협력과 확장",
                                "도약의 발판",
                                "전망의 확립"
                            ],
        "keywordsReversed":  [
                                 "협력의 결여",
                                 "진척 지연",
                                 "실망스러운 소식",
                                 "고립"
                             ],
        "observation":  "풍요로운 포도밭에서 세 명의 여인이 머리에 화환을 쓰고 성배를 높이 맞부딪치며 둥글게 춤을 추고 있습니다.",
        "universalSymbol":  "기쁨의 나눔과 우정, 창의적인 협력의 성공과 공동체가 함께 누리는 풍요로운 축배를 상징합니다.",
        "adviceBase":  "소중한 사람들과 함께 모여 기쁨을 나누고, 서로를 지지하는 유대감을 돈독히 하세요.",
        "checklists":  [
                           "마음 맞는 사람들과 가벼운 티타임이나 식사 자리를 만들어 웃음 나누기",
                           "지나친 유흥이나 과음 대신 진솔한 대화로 마음의 피로 풀기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-4",
        "number":  4,
        "nameEn":  "Four of Cups",
        "nameKo":  "컵 4 (Four of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "안정과 축하",
                                "견고한 기반",
                                "평화로운 휴식",
                                "체계의 정착"
                            ],
        "keywordsReversed":  [
                                 "과도한 안주",
                                 "불안정한 토대",
                                 "정체",
                                 "축하의 퇴색"
                             ],
        "observation":  "푸른 나무 아래 팔짱을 끼고 앉은 청년이 발앞의 성배 세 개를 무심하게 응시하고 있으며, 구름 속 손이 새로운 성배를 건네고 있습니다.",
        "universalSymbol":  "익숙함에 젖은 권태와 무기력, 눈앞에 건네진 새로운 기회와 호의를 알아보지 못하는 마음의 단절을 상징합니다.",
        "adviceBase":  "지나친 무기력과 권태에서 벗어나, 내 곁에 건네지고 있는 새로운 기회와 호의에 눈을 돌리세요.",
        "checklists":  [
                           "습관적인 불평을 멈추고 내 주변에 존재하는 소소한 감사거리 3가지 찾기",
                           "새로운 제안이나 모임에 마음을 열고 긍정적으로 응답해 보기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"1\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-5",
        "number":  5,
        "nameEn":  "Five of Cups",
        "nameKo":  "컵 5 (Five of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "건설적 경쟁",
                                "도전과 시련",
                                "성장의 진통",
                                "극복의 의지"
                            ],
        "keywordsReversed":  [
                                 "무의미한 소모전",
                                 "패배감",
                                 "내부분열",
                                 "갈등의 회피"
                             ],
        "observation":  "검은 망토를 두른 인물이 쓰러져 붉은 포도주가 쏟아진 세 개의 잔을 슬프게 바라보고 있으며, 뒤편에는 두 개의 잔이 온전히 서 있습니다.",
        "universalSymbol":  "상실과 후회에 매몰된 슬픔, 하지만 뒤돌아보면 여전히 나를 지탱하고 있는 소중한 희망이 남아있음을 상징합니다.",
        "adviceBase":  "이미 쏟아진 물에 대한 후회와 슬픔을 흘려보내고, 아직 내 곁에 온전히 남아 있는 가치들을 돌아보세요.",
        "checklists":  [
                           "과거의 상처나 아쉬움에 대한 집착을 인정하고 천천히 떠나보내기",
                           "뒤편에 여전히 서 있는 두 개의 잔처럼 내 곁을 지키는 사람들에게 집중하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"2\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-6",
        "number":  6,
        "nameEn":  "Six of Cups",
        "nameKo":  "컵 6 (Six of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "승리와 조화",
                                "성공의 공인",
                                "나눔과 순항",
                                "과도기 극복"
                            ],
        "keywordsReversed":  [
                                 "자만심",
                                 "인정의 결핍",
                                 "지연된 보상",
                                 "불공정한 배분"
                             ],
        "observation":  "고풍스러운 성 안뜰에서 어린 소년이 꽃이 가득 담긴 성배를 어린 소녀에게 정답게 건네고 있습니다.",
        "universalSymbol":  "순수했던 어린 시절의 기억과 무조건적인 온정, 그리운 인연과의 재회 및 순수한 동심의 회복을 상징합니다.",
        "adviceBase":  "순수했던 초심과 따뜻한 옛 추억을 되새기며, 순수한 동심의 마음으로 관계를 대하세요.",
        "checklists":  [
                           "어린 시절 내가 가장 순수하게 좋아했던 활동이나 취미를 잠깐이라도 해보기",
                           "오랜 친구나 고마운 지인에게 안부 연락을 건네며 온기 나누기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-7",
        "number":  7,
        "nameEn":  "Seven of Cups",
        "nameKo":  "컵 7 (Seven of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "신념의 수호",
                                "독창적 전략",
                                "고투와 방어",
                                "인내의 시험"
                            ],
        "keywordsReversed":  [
                                 "압도당함",
                                 "포기와 후퇴",
                                 "불리한 위치",
                                 "우유부단"
                             ],
        "observation":  "검은 실루엣의 인물 앞에 구름에 뜬 일곱 개의 성배 속에서 보석, 용, 승리의 관, 유령 등 온갖 유혹의 환영들이 피어오릅니다.",
        "universalSymbol":  "수많은 환상과 미혹, 비현실적인 공상과 결정 장애 속에서 진정한 본질을 가려내야 하는 시험을 상징합니다.",
        "adviceBase":  "비현실적인 환상이나 막연한 공상에서 벗어나, 명확한 기준을 세우고 가장 실질적인 선택지를 고르세요.",
        "checklists":  [
                           "머릿속에 떠도는 여러 옵션의 현실적 장단점을 종이에 차분히 적어보기",
                           "실현 불가능한 이상 대신 오늘 당장 할 수 있는 구체적 선택 1가지에 집중하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-8",
        "number":  8,
        "nameEn":  "Eight of Cups",
        "nameKo":  "컵 8 (Eight of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "빠른 전개",
                                "성실한 연마",
                                "숙련과 이동",
                                "목표 집중"
                            ],
        "keywordsReversed":  [
                                 "조급한 서두름",
                                 "정체와 지연",
                                 "방향성 혼란",
                                 "피로 누적"
                             ],
        "observation":  "붉은 옷과 망토를 입은 인물이 지팡이를 짚고 가지런히 쌓인 여덟 개의 성배를 등진 채 가파른 달밤의 산길로 홀로 떠나갑니다.",
        "universalSymbol":  "물질적·감정적으로 익숙했던 안락함을 뒤로하고, 더 높은 영적 가치와 진정한 의미를 찾아 결단하는 용기 있는 떠남을 상징합니다.",
        "adviceBase":  "더 이상 영혼을 채워주지 못하는 익숙한 집착을 뒤로하고, 더 높은 가치를 찾아 용기 있게 떠나세요.",
        "checklists":  [
                           "미련 때문에 끌고 왔던 습관이나 무의미한 관계와의 건강한 거리두기 실천하기",
                           "새로운 내면의 성장을 위해 조용히 나만의 시간을 확보하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"1\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-9",
        "number":  9,
        "nameEn":  "Nine of Cups",
        "nameKo":  "컵 9 (Nine of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "회복과 방어",
                                "마지막 인내",
                                "만족과 풍요",
                                "완성의 목전"
                            ],
        "keywordsReversed":  [
                                 "과도한 경계심",
                                 "탈진",
                                 "마지막 문턱의 좌절",
                                 "의심"
                             ],
        "observation":  "풍채 좋은 인물이 푸른 옷을 입고 팔짱을 낀 채, 아치형으로 진열된 아홉 개의 빛나는 황금 잔 앞에서 만족스러운 미소를 짓습니다.",
        "universalSymbol":  "소원의 성취와 감정적 포만감, 스스로 이룩한 행복에 대한 자부심과 삶의 풍요로운 축복을 상징합니다.",
        "adviceBase":  "마음의 평화와 소망의 성취를 온전히 누리며, 감사의 마음으로 나 자신을 아낌없이 대접하세요.",
        "checklists":  [
                           "스스로에게 수고했다는 위로와 함께 좋아하는 맛있는 식사나 선물 선물하기",
                           "물질적 만족에 안주하지 않고 내면의 깊은 충만함을 누리기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"2\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-10",
        "number":  10,
        "nameEn":  "Ten of Cups",
        "nameKo":  "컵 10 (Ten of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "과제의 완수",
                                "책임과 성취",
                                "풍요의 극치",
                                "새 순환의 준비"
                            ],
        "keywordsReversed":  [
                                 "과중한 부담",
                                 "번아웃",
                                 "무너진 책임",
                                 "파탄"
                             ],
        "observation":  "푸른 전원의 오두막 앞에서 서로 어깨를 감싸 안은 부부와 손을 잡고 춤추는 아이들 위로, 무지개 속에 열 개의 황금 성배가 빛납니다.",
        "universalSymbol":  "완전한 가족의 화합과 정서적 안정, 지속되는 영속적 사랑과 축복받은 삶의 평화를 상징합니다.",
        "adviceBase":  "가족 및 소중한 공동체 안에서 깊은 화합과 안정을 누리고, 서로의 행복을 축복하세요.",
        "checklists":  [
                           "가족이나 가장 소중한 이들에게 사랑한다는 따뜻한 표현 건네기",
                           "일상의 사소한 행복을 함께 축하하며 평화로운 분위기 만들기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-11",
        "imageUrl": "images/tarot_cups_11.jpg",
        "number":  11,
        "nameEn":  "Page of Cups",
        "nameKo":  "컵 시종 (Page of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "풋풋한 탐색",
                                "새로운 소식",
                                "배움의 열정",
                                "호기심 많은 시작"
                            ],
        "keywordsReversed":  [
                                 "미성숙함",
                                 "경솔한 판단",
                                 "실망스러운 전갈",
                                 "변덕"
                             ],
        "observation":  "물결무늬 옷을 입은 귀여운 시종이 손에 든 성배 속에서 고개를 빼꼼 내민 작은 물고기와 다정하게 눈을 맞추고 있습니다.",
        "universalSymbol":  "상상력이 풍부한 순수한 감수성, 예상치 못한 다정한 소식과 예술적 영감의 싹을 상징합니다.",
        "adviceBase":  "감수성과 직관에 귀를 기울이고, 마음을 움직이는 예술적 영감이나 다정한 제안을 반갑게 맞이하세요.",
        "checklists":  [
                           "마음에 닿는 음악이나 글을 감상하며 감성의 여유 누리기",
                           "지나친 예민함이나 감정의 소용돌이에 휘말리지 않도록 호흡 가다듬기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-12",
        "imageUrl": "images/tarot_cups_12.jpg",
        "number":  12,
        "nameEn":  "Knight of Cups",
        "nameKo":  "컵 기사 (Knight of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "돌진하는 행동",
                                "역동적 추구",
                                "용기 있는 도전",
                                "목표를 향한 질주"
                            ],
        "keywordsReversed":  [
                                 "충동적 폭주",
                                 "조급한 경솔함",
                                 "불협화음",
                                 "에너지 낭비"
                             ],
        "observation":  "날개 달린 투구를 쓴 우아한 기사가 잔잔한 개울을 건너며 성배를 소중히 받쳐 들고 부드러운 걸음으로 다가옵니다.",
        "universalSymbol":  "진심 어린 사랑의 전달과 정중한 초대, 감미로운 예술적 감성과 조화로운 평화의 사자를 상징합니다.",
        "adviceBase":  "진심 어린 로맨스와 따뜻한 온기를 품고, 진정성 있는 제안과 다정한 태도로 다가가세요.",
        "checklists":  [
                           "상대방의 마음을 편안하게 해주는 부드럽고 상냥한 표현 사용하기",
                           "환상에 치우쳐 현실적인 약속을 소홀히 하지 않도록 점검하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"1\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-13",
        "imageUrl": "images/tarot_cups_13.jpg",
        "number":  13,
        "nameEn":  "Queen of Cups",
        "nameKo":  "컵 여왕 (Queen of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "성숙한 포용",
                                "내적 통찰",
                                "풍부한 자애",
                                "자신감과 지혜"
                            ],
        "keywordsReversed":  [
                                 "감정의 과잉",
                                 "질투와 편견",
                                 "차가운 단절",
                                 "자기중심성"
                             ],
        "observation":  "바닷가 천사 조각 왕좌에 앉은 여왕이 천사들이 장식된 정교한 뚜껑 덮인 성배를 두 손으로 소중히 감싸 쥐고 응시합니다.",
        "universalSymbol":  "깊은 바다와 같은 모성적 공감력, 직관적 혜안과 타인의 아픔을 어루만지는 치유의 마스터를 상징합니다.",
        "adviceBase":  "깊은 직관과 바다 같은 포용력으로 타인의 아픔을 어루만지고, 나 자신의 감정도 소중히 품어 안으세요.",
        "checklists":  [
                           "판단하지 않고 상대의 말을 온전히 들어주는 힐러의 태도 취하기",
                           "타인의 감정 쓰레기통이 되지 않도록 건강한 심리적 경계 유지하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"2\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "cups-14",
        "imageUrl": "images/tarot_cups_14.jpg",
        "number":  14,
        "nameEn":  "King of Cups",
        "nameKo":  "컵 왕 (King of Cups)",
        "arcana":  "minor",
        "suit":  "cups",
        "element":  "물(Water)",
        "keywordsUpright":  [
                                "노련한 리더십",
                                "권위와 성취",
                                "확고한 통제",
                                "완성된 지배력"
                            ],
        "keywordsReversed":  [
                                 "독선과 아집",
                                 "경직된 통제",
                                 "권력의 남용",
                                 "무책임"
                             ],
        "observation":  "거센 파도가 이는 바다 한가운데 떠 있는 왕좌에 앉은 왕이 한 손에 홀을, 다른 손에 성배를 쥐고 고요한 평정심을 유지합니다.",
        "universalSymbol":  "격동하는 감정의 파도를 다스리는 지혜로운 자제력, 외유내강의 리더십과 관대한 포용력을 상징합니다.",
        "adviceBase":  "감정의 파도에 흔들리지 않는 내면의 지혜와 온화한 자비로 상황을 현명하게 중재하세요.",
        "checklists":  [
                           "갈등 상황에서 차분하고 평온한 태도를 유지하여 주변을 안심시키기",
                           "자신의 솔직한 감정을 억누르고 속으로만 삭이지 않도록 신뢰하는 이와 대화하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M6 6h12v4c0 3.3-2.7 6-6 6s-6-2.7-6-6V6z\" stroke=\"currentColor\" stroke-width=\"1.3\" fill=\"none\"/\u003e\u003cpath d=\"M12 16v5m-4 0h8\" stroke=\"currentColor\" stroke-width=\"1.3\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"10\" r=\"3\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-1",
        "imageUrl": "images/tarot_swords_1.jpg",
        "number":  1,
        "nameEn":  "Ace of Swords",
        "nameKo":  "소드 에이스 (Ace of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "새로운 기회의 씨앗",
                                "순수한 영감",
                                "잠재력 발화",
                                "도약의 시작"
                            ],
        "keywordsReversed":  [
                                 "기회의 실기",
                                 "성급한 착수",
                                 "방향성 상실",
                                 "에너지 고갈"
                             ],
        "observation":  "구름에서 뻗어 나온 흰 손이 올리브와 야자나무 가지가 걸린 황금 왕관을 꿰뚫은 거대한 양날의 검을 굳건히 치켜들고 있습니다.",
        "universalSymbol":  "검(공기)의 순수한 지성과 이성. 모든 환상을 가르는 명료한 진실과 정의, 결정적 승리와 새로운 통찰을 상징합니다.",
        "adviceBase":  "혼탁한 안개를 가르는 날카로운 통찰력으로 진실을 직시하고, 명확하고 단호한 결단을 내리세요.",
        "checklists":  [
                           "가장 모호했던 문제의 핵심 진실을 한 줄로 정의해 보기",
                           "감정적 동요를 배제하고 원칙에 입각한 명확한 기준 확립하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-2",
        "number":  2,
        "nameEn":  "Two of Swords",
        "nameKo":  "소드 2 (Two of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "균형 잡힌 계획",
                                "선택의 기로",
                                "파트너십",
                                "전망의 확장"
                            ],
        "keywordsReversed":  [
                                 "우유부단",
                                 "불균형",
                                 "갈등의 씨앗",
                                 "예측 실패"
                             ],
        "observation":  "흰 옷을 입고 눈을 가린 여인이 잔잔한 바다 바위 위에 앉아 가슴 앞에서 두 자루의 무거운 장검을 교차한 채 균형을 잡고 있습니다.",
        "universalSymbol":  "외부 정보를 차단하고 내면의 균형을 유지하는 방어적 평화, 피할 수 없는 선택의 기로에서 느끼는 긴장을 상징합니다.",
        "adviceBase":  "마음의 눈을 가리고 있는 두려움을 걷어내고, 미루어 두었던 선택의 순간을 정면으로 마주하세요.",
        "checklists":  [
                           "회피하고 싶었던 양자택일의 문제를 종이에 적고 직시하기",
                           "두 가지 선택지 사이에서 내 가치관에 더 부합하는 쪽을 과감히 선택하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-3",
        "number":  3,
        "nameEn":  "Three of Swords",
        "nameKo":  "소드 3 (Three of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "최초의 성취",
                                "협력과 확장",
                                "도약의 발판",
                                "전망의 확립"
                            ],
        "keywordsReversed":  [
                                 "협력의 결여",
                                 "진척 지연",
                                 "실망스러운 소식",
                                 "고립"
                             ],
        "observation":  "어두운 먹구름과 폭우가 쏟아지는 하늘 아래, 붉은 심장이 세 자루의 날카로운 검에 관통당해 있습니다.",
        "universalSymbol":  "뼈아픈 상처와 이별, 냉정한 진실 앞에서 겪는 비애와 심리적 고통의 정화를 상징합니다.",
        "adviceBase":  "가슴 아픈 상처와 이별의 슬픔을 억지로 외면하지 말고, 충분히 아파하되 치유의 여정을 시작하세요.",
        "checklists":  [
                           "마음속 응어리진 슬픔을 눈물이나 일기로 마음껏 배출하기",
                           "상처 준 사람이나 사건에 대한 원망을 내려놓고 내 마음 치료에 집중하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-4",
        "number":  4,
        "nameEn":  "Four of Swords",
        "nameKo":  "소드 4 (Four of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "안정과 축하",
                                "견고한 기반",
                                "평화로운 휴식",
                                "체계의 정착"
                            ],
        "keywordsReversed":  [
                                 "과도한 안주",
                                 "불안정한 토대",
                                 "정체",
                                 "축하의 퇴색"
                             ],
        "observation":  "기도하듯 두 손을 모은 기사의 조각상이 석관 위에 누워 안식을 취하고 있으며, 벽에는 세 자루의 검이, 아래에는 한 자루의 검이 놓여 있습니다.",
        "universalSymbol":  "치열한 전투 후의 고요한 휴식과 회복, 스트레스와 소음을 차단하고 영혼을 재충전하는 안식처를 상징합니다.",
        "adviceBase":  "지친 두뇌와 마음에 휴식을 선물하고, 외부 소음을 차단한 채 고요한 재충전의 시간을 가지세요.",
        "checklists":  [
                           "스마트폰과 SNS를 잠시 끄고 1시간 이상 조용한 명상이나 숙면 취하기",
                           "무리한 일정 추진을 멈추고 신체와 정신의 회복을 최우선에 두기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-5",
        "number":  5,
        "nameEn":  "Five of Swords",
        "nameKo":  "소드 5 (Five of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "건설적 경쟁",
                                "도전과 시련",
                                "성장의 진통",
                                "극복의 의지"
                            ],
        "keywordsReversed":  [
                                 "무의미한 소모전",
                                 "패배감",
                                 "내부분열",
                                 "갈등의 회피"
                             ],
        "observation":  "비열한 미소를 띤 남자가 땅에 떨어진 검 세 자루를 챙기고 있으며, 패배한 두 사람은 어깨를 떨구며 멀리 바닷가로 걸어갑니다.",
        "universalSymbol":  "상처뿐인 영광과 자존심 싸움의 허망함, 이기적인 승리가 남긴 쓰라린 고립과 관계의 파탄을 상징합니다.",
        "adviceBase":  "상처뿐인 영광을 좇는 무의미한 자존심 싸움을 멈추고, 손실을 인정하며 지혜롭게 물러서세요.",
        "checklists":  [
                           "이겨도 남는 것이 없는 소모적인 논쟁에서 먼저 한 발 물러서기",
                           "상대방을 굴복시키려는 이기적인 욕심을 내려놓고 관계의 평화 지키기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-6",
        "number":  6,
        "nameEn":  "Six of Swords",
        "nameKo":  "소드 6 (Six of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "승리와 조화",
                                "성공의 공인",
                                "나눔과 순항",
                                "과도기 극복"
                            ],
        "keywordsReversed":  [
                                 "자만심",
                                 "인정의 결핍",
                                 "지연된 보상",
                                 "불공정한 배분"
                             ],
        "observation":  "사공이 배를 저어 어머니와 아이를 태우고 거친 물결을 벗어나 잔잔하고 고요한 건너편 물가로 나아가고 있습니다.",
        "universalSymbol":  "고난과 슬픔의 터널을 통과하는 조용한 이행, 더 안전하고 평온한 환경을 향해 점진적으로 회복되는 치유를 상징합니다.",
        "adviceBase":  "거친 풍파가 이는 자리를 벗어나, 잔잔하고 안전한 새로운 강변으로 천천히 이동하세요.",
        "checklists":  [
                           "갈등이 심한 환경이나 스트레스 요인에서 물리적·심리적 거리 두기",
                           "과거의 짐을 가볍게 덜어내고 앞으로 나아갈 준비하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-7",
        "number":  7,
        "nameEn":  "Seven of Swords",
        "nameKo":  "소드 7 (Seven of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "신념의 수호",
                                "독창적 전략",
                                "고투와 방어",
                                "인내의 시험"
                            ],
        "keywordsReversed":  [
                                 "압도당함",
                                 "포기와 후퇴",
                                 "불리한 위치",
                                 "우유부단"
                             ],
        "observation":  "적진 막사에서 한 남자가 다섯 자루의 검을 몰래 안고 뒤를 힐끔 돌아보며 발끝을 세워 빠져나가고 있습니다.",
        "universalSymbol":  "정면 승부를 피하는 편법과 은밀한 술책, 비밀스러운 계획과 도덕적 딜레마를 상징합니다.",
        "adviceBase":  "정직하지 못한 편법이나 눈속임의 유혹을 경계하고, 떳떳하고 투명한 방법으로 실리를 챙기세요.",
        "checklists":  [
                           "비밀스럽거나 편법적인 진행 방식 대신 정공법으로 투명하게 진행하기",
                           "중요한 정보나 문서가 누설되지 않도록 꼼꼼하게 보안 점검하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-8",
        "number":  8,
        "nameEn":  "Eight of Swords",
        "nameKo":  "소드 8 (Eight of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "빠른 전개",
                                "성실한 연마",
                                "숙련과 이동",
                                "목표 집중"
                            ],
        "keywordsReversed":  [
                                 "조급한 서두름",
                                 "정체와 지연",
                                 "방향성 혼란",
                                 "피로 누적"
                             ],
        "observation":  "눈이 가려지고 온몸이 헐겁게 묶인 여인이 진흙탕 땅에 꽂힌 여덟 개의 검 울타리 안에 홀로 서 있습니다.",
        "universalSymbol":  "스스로 만들어낸 생각의 감옥과 무기력, 사실은 언제든 끈을 풀고 빠져나올 수 있는 착각의 속박을 상징합니다.",
        "adviceBase":  "스스로를 옭아매고 있는 피해의식과 자기 한계의 틀을 깨고, 언제든 빠져나올 수 있는 자유를 자각하세요.",
        "checklists":  [
                           "'나는 어쩔 수 없다'는 부정적인 생각의 안대를 스스로 벗어던지기",
                           "내가 지금 당장 자유롭게 움직일 수 있는 작은 행동 1가지 찾기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-9",
        "number":  9,
        "nameEn":  "Nine of Swords",
        "nameKo":  "소드 9 (Nine of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "회복과 방어",
                                "마지막 인내",
                                "만족과 풍요",
                                "완성의 목전"
                            ],
        "keywordsReversed":  [
                                 "과도한 경계심",
                                 "탈진",
                                 "마지막 문턱의 좌절",
                                 "의심"
                             ],
        "observation":  "한밤중 침대에서 일어난 인물이 두 손으로 얼굴을 감싼 채 오열하고 있으며, 검은 벽에는 아홉 자루의 검이 나란히 걸려 있습니다.",
        "universalSymbol":  "한밤중을 엄습하는 불면과 극심한 악몽, 꼬리를 무는 상상 속 불안과 내면의 자책감을 상징합니다.",
        "adviceBase":  "한밤중의 뜬눈으로 키워낸 막연한 걱정과 공포는 대부분 환상일 뿐임을 깨닫고, 불면의 고리를 끊으세요.",
        "checklists":  [
                           "머릿속을 괴롭히는 최악의 시나리오가 실제로 일어날 확률을 이성적으로 계산해 보기",
                           "따뜻한 차 한 잔과 함께 깊은 심호흡으로 뇌의 과열 식히기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-10",
        "number":  10,
        "nameEn":  "Ten of Swords",
        "nameKo":  "소드 10 (Ten of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "과제의 완수",
                                "책임과 성취",
                                "풍요의 극치",
                                "새 순환의 준비"
                            ],
        "keywordsReversed":  [
                                 "과중한 부담",
                                 "번아웃",
                                 "무너진 책임",
                                 "파탄"
                             ],
        "observation":  "어두운 바닷가 땅에 엎드린 인물의 등 뒤로 열 자루의 검이 꽂혀 있으며, 먼 수평선 너머로 검은 구름이 걷히고 황금빛 여명이 밝아옵니다.",
        "universalSymbol":  "오랜 고통과 시련의 완전한 종결, 가장 깊은 어둠의 바닥을 치고 비로소 새롭게 시작되는 새벽을 상징합니다.",
        "adviceBase":  "어두운 밤의 끝에 이미 새벽빛이 밝아오고 있습니다. 끝난 것에 대한 미련을 완전히 털고 새 삶을 시작하세요.",
        "checklists":  [
                           "이미 바닥을 쳤음을 인정하고 이제는 올라갈 일만 남았음을 선언하기",
                           "오래된 고통의 매듭을 매듭짓고 새 도화지에 새로운 하루 그리기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-11",
        "imageUrl": "images/tarot_swords_11.jpg",
        "number":  11,
        "nameEn":  "Page of Swords",
        "nameKo":  "소드 시종 (Page of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "풋풋한 탐색",
                                "새로운 소식",
                                "배움의 열정",
                                "호기심 많은 시작"
                            ],
        "keywordsReversed":  [
                                 "미성숙함",
                                 "경솔한 판단",
                                 "실망스러운 전갈",
                                 "변덕"
                             ],
        "observation":  "바람이 부는 언덕 위에 선 젊은 시종이 두 손으로 검을 높이 치켜들고 경계 어린 예리한 시선으로 주변을 두리번거립니다.",
        "universalSymbol":  "날카로운 관찰력과 지적 호기심, 진실을 파헤치는 탐색과 경계 태세를 상징합니다.",
        "adviceBase":  "호기심 어린 탐구심과 예리한 관찰력으로 정보를 수집하되, 지나친 의심이나 공격성을 다스리세요.",
        "checklists":  [
                           "사실에 기반한 객관적인 정보와 자료를 면밀히 조사하기",
                           "말 한마디에 가시를 품지 않도록 차분하고 신중한 언어 선택하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-12",
        "imageUrl": "images/tarot_swords_12.jpg",
        "number":  12,
        "nameEn":  "Knight of Swords",
        "nameKo":  "소드 기사 (Knight of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "돌진하는 행동",
                                "역동적 추구",
                                "용기 있는 도전",
                                "목표를 향한 질주"
                            ],
        "keywordsReversed":  [
                                 "충동적 폭주",
                                 "조급한 경솔함",
                                 "불협화음",
                                 "에너지 낭비"
                             ],
        "observation":  "사나운 폭풍 속에서 은빛 갑옷을 입은 기사가 장검을 앞으로 겨눈 채 전속력으로 말을 몰아 적진을 향해 돌진합니다.",
        "universalSymbol":  "주저함 없는 결단력과 번개 같은 스피드, 목표를 향해 저돌적으로 돌파하는 단호한 용기를 상징합니다.",
        "adviceBase":  "단호한 결단력과 빠른 스피드로 목표를 향해 돌진하되, 주변을 살피는 주의력을 잃지 마세요.",
        "checklists":  [
                           "지체하지 말고 핵심 안건을 빠르고 명확하게 처리하기",
                           "과격한 언행이나 독선적인 태도로 주변 사람에게 상처 주지 않기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-13",
        "imageUrl": "images/tarot_swords_13.jpg",
        "number":  13,
        "nameEn":  "Queen of Swords",
        "nameKo":  "소드 여왕 (Queen of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "성숙한 포용",
                                "내적 통찰",
                                "풍부한 자애",
                                "자신감과 지혜"
                            ],
        "keywordsReversed":  [
                                 "감정의 과잉",
                                 "질투와 편견",
                                 "차가운 단절",
                                 "자기중심성"
                             ],
        "observation":  "나비와 아기 천사 조각이 새겨진 높은 돌 왕좌에 앉은 여왕이 한 손에 수직으로 곧게 선 검을 쥐고 다른 손을 앞으로 뻗어 단호한 판단을 내립니다.",
        "universalSymbol":  "모든 위선을 꿰뚫어 보는 투명한 명석함, 슬픔을 이겨낸 단단한 지혜와 공정한 분별력을 상징합니다.",
        "adviceBase":  "공정하고 명석한 지혜로 사리분별을 분명히 하되, 차가운 냉정함 뒤에 따뜻한 공감을 잊지 마세요.",
        "checklists":  [
                           "감정에 휩쓸리지 않고 객관적인 팩트에 근거하여 공정한 결정 내리기",
                           "비판적인 시각을 부드럽고 건설적인 조언의 형태로 전달하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "swords-14",
        "imageUrl": "images/tarot_swords_14.jpg",
        "number":  14,
        "nameEn":  "King of Swords",
        "nameKo":  "소드 왕 (King of Swords)",
        "arcana":  "minor",
        "suit":  "swords",
        "element":  "공기(Air)",
        "keywordsUpright":  [
                                "노련한 리더십",
                                "권위와 성취",
                                "확고한 통제",
                                "완성된 지배력"
                            ],
        "keywordsReversed":  [
                                 "독선과 아집",
                                 "경직된 통제",
                                 "권력의 남용",
                                 "무책임"
                             ],
        "observation":  "자주색 망토를 두른 위엄 있는 왕이 오른손에 장검을 똑바로 세우고 정면을 응시하며 흔들림 없는 법과 정의를 집행합니다.",
        "universalSymbol":  "최고의 지적 권위와 냉철한 판단력, 사사로운 감정에 흔들리지 않는 공정무사한 원칙을 상징합니다.",
        "adviceBase":  "최고의 전문성과 논리적인 권위로 문제를 통솔하며, 확고한 원칙과 윤리의식으로 올바른 길을 안내하세요.",
        "checklists":  [
                           "원칙과 규정을 엄격히 준수하며 공정하게 상황 지휘하기",
                           "자신의 논리만 옳다고 고집하지 않고 상대방의 반론도 경청하기"
                       ],
        "symbolSvg":  "\u003cpath d=\"M12 2v17m-4-13h8m-5 13h2m-1 0v3\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\"/\u003e\u003ccircle cx=\"12\" cy=\"4\" r=\"1.5\" fill=\"currentColor\"/\u003e"
    },
    {
        "id":  "pentacles-1",
        "imageUrl": "images/tarot_pentacles_1.jpg",
        "number":  1,
        "nameEn":  "Ace of Pentacles",
        "nameKo":  "펜타클 에이스 (Ace of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "새로운 기회의 씨앗",
                                "순수한 영감",
                                "잠재력 발화",
                                "도약의 시작"
                            ],
        "keywordsReversed":  [
                                 "기회의 실기",
                                 "성급한 착수",
                                 "방향성 상실",
                                 "에너지 고갈"
                             ],
        "observation":  "구름에서 뻗어 나온 신성한 손이 풍요로운 백합과 장미 정원 위에서 거대한 황금 동전을 받쳐 들고 있습니다.",
        "universalSymbol":  "펜타클(흙)의 순수한 물질적 에너지. 구체적인 번영의 씨앗과 새로운 재정적·현실적 기회의 도래를 상징합니다.",
        "adviceBase":  "새롭게 주어진 실질적인 기회의 씨앗을 소중히 받아들이고, 튼튼한 토양에 차분히 뿌리를 내리세요.",
        "checklists":  [
                           "현실적인 이익과 가치를 가져다줄 구체적인 첫 실행 단계 시작하기",
                           "뜬구름 잡는 이상보다 눈앞에 보이는 현실적 자원과 일정 챙기기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-2",
        "number":  2,
        "nameEn":  "Two of Pentacles",
        "nameKo":  "펜타클 2 (Two of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "균형 잡힌 계획",
                                "선택의 기로",
                                "파트너십",
                                "전망의 확장"
                            ],
        "keywordsReversed":  [
                                 "우유부단",
                                 "불균형",
                                 "갈등의 씨앗",
                                 "예측 실패"
                             ],
        "observation":  "모자를 쓴 어릿광대 풍의 청년이 무한대(∞) 리본으로 연결된 두 개의 동전을 저글링하며 춤추듯 균형을 잡고 있습니다.",
        "universalSymbol":  "변화무쌍한 삶의 파도 속에서 유연하게 자원을 순환시키고 조율하는 유쾌한 균형 감각을 상징합니다.",
        "adviceBase":  "삶의 여러 변화와 다양한 역할 사이에서 유연하게 균형을 잡으며, 흐름을 즐기듯 조율하세요.",
        "checklists":  [
                           "일과 휴식, 지출과 수입 사이의 균형을 점검하고 우선순위 배분하기",
                           "지나친 스트레스 대신 유쾌한 마음가짐으로 변화에 유연하게 대처하기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-3",
        "number":  3,
        "nameEn":  "Three of Pentacles",
        "nameKo":  "펜타클 3 (Three of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "최초의 성취",
                                "협력과 확장",
                                "도약의 발판",
                                "전망의 확립"
                            ],
        "keywordsReversed":  [
                                 "협력의 결여",
                                 "진척 지연",
                                 "실망스러운 소식",
                                 "고립"
                             ],
        "observation":  "석공이 높은 성당 회랑에서 작업 도구를 들고 서 있으며, 수도사와 설계도를 든 건축가가 경청하며 협의하고 있습니다.",
        "universalSymbol":  "서로 다른 역량을 지닌 전문가들의 숙련된 협업, 기술의 인정과 견고한 품질의 완성을 상징합니다.",
        "adviceBase":  "서로 다른 역량을 지닌 전문가들과 적극적으로 협력하여, 견고하고 완성도 높은 결과물을 만들어내세요.",
        "checklists":  [
                           "동료의 전문성을 존중하고 협업 과정에서 피드백을 열린 마음으로 수용하기",
                           "나만의 기술과 역량을 더욱 갈고닦아 퀄리티를 한 단계 높이기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-4",
        "number":  4,
        "nameEn":  "Four of Pentacles",
        "nameKo":  "펜타클 4 (Four of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "안정과 축하",
                                "견고한 기반",
                                "평화로운 휴식",
                                "체계의 정착"
                            ],
        "keywordsReversed":  [
                                 "과도한 안주",
                                 "불안정한 토대",
                                 "정체",
                                 "축하의 퇴색"
                             ],
        "observation":  "왕관을 쓴 남자가 머리 위, 가슴 앞, 그리고 양발 아래로 네 개의 동전을 빈틈없이 움켜쥐고 도시를 등진 채 앉아 있습니다.",
        "universalSymbol":  "자신의 소유물에 대한 완강한 집착과 안전에 대한 강박, 통제 욕구와 인색함의 경계를 상징합니다.",
        "adviceBase":  "가진 것을 지나치게 틀어쥐고 움켜쥐려는 인색함을 내려놓고, 건강한 순환을 위해 마음을 여세요.",
        "checklists":  [
                           "상실에 대한 과도한 불안을 버리고 적절한 나눔과 투자 실천하기",
                           "변화를 거부하고 기존 방식에만 갇혀 있지 않은지 점검하기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-5",
        "number":  5,
        "nameEn":  "Five of Pentacles",
        "nameKo":  "펜타클 5 (Five of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "건설적 경쟁",
                                "도전과 시련",
                                "성장의 진통",
                                "극복의 의지"
                            ],
        "keywordsReversed":  [
                                 "무의미한 소모전",
                                 "패배감",
                                 "내부분열",
                                 "갈등의 회피"
                             ],
        "observation":  "눈보라가 몰아치는 길거리에서 목발을 짚은 부상자와 헐벗은 빈자가 따뜻한 오색 스테인드글라스 창문 아래를 힘겹게 지나칩니다.",
        "universalSymbol":  "일시적인 물질적 결핍과 고립감, 하지만 바로 곁에 피난처와 온정이 있음을 미처 보지 못하는 시련을 상징합니다.",
        "adviceBase":  "차가운 눈보라 속에서도 가까운 곳에 따뜻한 불빛의 성소가 있음을 기억하고, 주저 없이 도움을 청하세요.",
        "checklists":  [
                           "혼자서 끙끙 앓지 말고 믿을 수 있는 기관이나 조력자에게 도움 요청하기",
                           "일시적인 결핍에 낙담하지 않고 내면의 자존감을 지켜내기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-6",
        "number":  6,
        "nameEn":  "Six of Pentacles",
        "nameKo":  "펜타클 6 (Six of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "승리와 조화",
                                "성공의 공인",
                                "나눔과 순항",
                                "과도기 극복"
                            ],
        "keywordsReversed":  [
                                 "자만심",
                                 "인정의 결핍",
                                 "지연된 보상",
                                 "불공정한 배분"
                             ],
        "observation":  "풍요로운 상인이 한 손에 공평한 저울을 들고, 무릎 꿇은 두 사람에게 금화를 정성껏 나누어주고 있습니다.",
        "universalSymbol":  "자비롭고 공정한 나눔과 후원, 베풂과 감사가 아름답게 순환하는 관대한 번영을 상징합니다.",
        "adviceBase":  "주는 이와 받는 이 모두가 존엄을 잃지 않는 공평하고 따뜻한 나눔을 실천하며 덕을 쌓으세요.",
        "checklists":  [
                           "내가 받은 도움에 감사하고, 나 역시 여유가 있는 부분에서 온정 베풀기",
                           "일방적인 희생이나 불공정한 거래가 없는지 관계의 균형 살피기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-7",
        "number":  7,
        "nameEn":  "Seven of Pentacles",
        "nameKo":  "펜타클 7 (Seven of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "신념의 수호",
                                "독창적 전략",
                                "고투와 방어",
                                "인내의 시험"
                            ],
        "keywordsReversed":  [
                                 "압도당함",
                                 "포기와 후퇴",
                                 "불리한 위치",
                                 "우유부단"
                             ],
        "observation":  "농부가 지팡이에 턱을 괴고 서서, 풍성한 포도 덩굴에 주렁주렁 매달린 일곱 개의 동전을 골똘히 바라보고 있습니다.",
        "universalSymbol":  "땀 흘려 가꾼 수확물을 돌아보며 장기적인 결실을 가늠하는 인내, 앞으로의 방향을 재평가하는 휴지기를 상징합니다.",
        "adviceBase":  "지금까지 일궈온 결실을 차분히 돌아보며, 앞으로 더 풍성한 수확을 위해 전략을 점검하고 보완하세요.",
        "checklists":  [
                           "조급하게 열매를 따려 하지 말고 수확의 적기를 인내심 있게 기다리기",
                           "그동안 쏟은 노력의 효율성을 냉정히 평가하고 개선점 찾기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-8",
        "number":  8,
        "nameEn":  "Eight of Pentacles",
        "nameKo":  "펜타클 8 (Eight of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "빠른 전개",
                                "성실한 연마",
                                "숙련과 이동",
                                "목표 집중"
                            ],
        "keywordsReversed":  [
                                 "조급한 서두름",
                                 "정체와 지연",
                                 "방향성 혼란",
                                 "피로 누적"
                             ],
        "observation":  "나무 벤치에 앉은 장인이 망치와 끌로 여덟 번째 동전을 정성껏 조각하고 있으며, 이미 완성된 동전들이 기둥에 가지런히 걸려 있습니다.",
        "universalSymbol":  "반복된 훈련을 통해 실력을 갈고닦는 장인 정신, 성실한 집중과 전문성 축적의 보람을 상징합니다.",
        "adviceBase":  "성실한 장인의 마음으로 한 땀 한 땀 정성을 쏟아, 디테일의 완성도를 높이며 역량을 축적하세요.",
        "checklists":  [
                           "잡념을 버리고 눈앞의 일에 깊이 몰입하여 묵묵히 연습 이어가기",
                           "사소한 디테일까지 꼼꼼하게 챙기며 완성도 있는 작품 만들기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-9",
        "number":  9,
        "nameEn":  "Nine of Pentacles",
        "nameKo":  "펜타클 9 (Nine of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "회복과 방어",
                                "마지막 인내",
                                "만족과 풍요",
                                "완성의 목전"
                            ],
        "keywordsReversed":  [
                                 "과도한 경계심",
                                 "탈진",
                                 "마지막 문턱의 좌절",
                                 "의심"
                             ],
        "observation":  "포도 덩굴이 우거진 정원에서 고급스러운 옷을 입은 여인이 손목에 길들여진 매를 얹고 풍요로운 과실 사이를 산책합니다.",
        "universalSymbol":  "스스로의 규율과 노력으로 쟁취한 경제적 자립, 우아하고 여유로운 품격과 풍요로운 완성을 상징합니다.",
        "adviceBase":  "스스로의 노력으로 이룩한 독립과 풍요로움을 당당히 누리며, 우아하고 품격 있는 여유를 즐기세요.",
        "checklists":  [
                           "타인에게 의존하지 않고 스스로 이룬 성과에 자긍심 갖기",
                           "잘 가꾸어진 정원에서 휴식을 취하듯 나를 위한 힐링의 시간 만끽하기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-10",
        "number":  10,
        "nameEn":  "Ten of Pentacles",
        "nameKo":  "펜타클 10 (Ten of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "과제의 완수",
                                "책임과 성취",
                                "풍요의 극치",
                                "새 순환의 준비"
                            ],
        "keywordsReversed":  [
                                 "과중한 부담",
                                 "번아웃",
                                 "무너진 책임",
                                 "파탄"
                             ],
        "observation":  "고풍스러운 아치 성문 아래 할아버지와 부부, 어린아이와 두 마리의 반려견이 평화롭게 모여 있으며, 열 개의 금화가 생명의 나무 형태로 배열되어 있습니다.",
        "universalSymbol":  "세대를 이어 전해지는 가문의 영속적 번영과 유산, 가장 안전하고 풍요로운 삶의 완성을 상징합니다.",
        "adviceBase":  "대를 이어 전해질 견고한 전통과 번영의 기반을 다지고, 가족과 공동체 전체의 영속적인 안정을 도모하세요.",
        "checklists":  [
                           "장기적인 자산 계획과 가족의 안전을 위한 실질적 대책 마련하기",
                           "세대를 아우르는 화합과 소통으로 든든한 울타리 가꾸기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-11",
        "imageUrl": "images/tarot_pentacles_11.jpg",
        "number":  11,
        "nameEn":  "Page of Pentacles",
        "nameKo":  "펜타클 시종 (Page of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "풋풋한 탐색",
                                "새로운 소식",
                                "배움의 열정",
                                "호기심 많은 시작"
                            ],
        "keywordsReversed":  [
                                 "미성숙함",
                                 "경솔한 판단",
                                 "실망스러운 전갈",
                                 "변덕"
                             ],
        "observation":  "들판에 선 젊은 시종이 두 손으로 황금 동전을 경건하게 받쳐 들고, 그 신비로운 가치에 완전히 매료되어 깊이 응시하고 있습니다.",
        "universalSymbol":  "실용적 지식을 향한 성실한 배움, 새로운 자격이나 기술을 차근차근 익혀나가는 충실한 시작을 상징합니다.",
        "adviceBase":  "배움에 대한 성실한 자세와 실용적인 호기심으로, 작은 지식 하나도 차근차근 현실에 적용해 보세요.",
        "checklists":  [
                           "실질적인 도움이 되는 자격증이나 기술 공부를 성실하게 시작하기",
                           "책상머리 지식에 머물지 않고 일상에서 직접 테스트해 보기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-12",
        "imageUrl": "images/tarot_pentacles_12.jpg",
        "number":  12,
        "nameEn":  "Knight of Pentacles",
        "nameKo":  "펜타클 기사 (Knight of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "돌진하는 행동",
                                "역동적 추구",
                                "용기 있는 도전",
                                "목표를 향한 질주"
                            ],
        "keywordsReversed":  [
                                 "충동적 폭주",
                                 "조급한 경솔함",
                                 "불협화음",
                                 "에너지 낭비"
                             ],
        "observation":  "쟁기질된 밭 위에 무거운 흑마를 탄 기사가 정지해 서서, 손바닥 위에 올린 황금 동전을 묵직하게 바라보고 있습니다.",
        "universalSymbol":  "느리지만 결코 멈추지 않는 꾸준함과 책임감, 약속을 반드시 지켜내는 신뢰할 수 있는 실행력을 상징합니다.",
        "adviceBase":  "느리더라도 흔들림 없는 꾸준함과 책임감으로, 약속한 바를 묵묵히 완수하며 신뢰를 쌓으세요.",
        "checklists":  [
                           "눈앞의 빠른 요행을 바라지 않고 매일 정해진 루틴을 철저히 지키기",
                           "맡은 임무를 끝까지 책임지고 마무리하여 확고한 평판 다지기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-13",
        "imageUrl": "images/tarot_pentacles_13.jpg",
        "number":  13,
        "nameEn":  "Queen of Pentacles",
        "nameKo":  "펜타클 여왕 (Queen of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "성숙한 포용",
                                "내적 통찰",
                                "풍부한 자애",
                                "자신감과 지혜"
                            ],
        "keywordsReversed":  [
                                 "감정의 과잉",
                                 "질투와 편견",
                                 "차가운 단절",
                                 "자기중심성"
                             ],
        "observation":  "꽃과 천사로 장식된 돌 왕좌에 앉은 여왕이 무릎 위에 황금 동전을 온화하게 품어 안고, 곁에는 아기 토끼가 평화롭게 뛰놀고 있습니다.",
        "universalSymbol":  "대지의 풍요로움과 모성애, 일상을 아늑하고 넉넉하게 돌보는 현실적인 지혜와 보살핌을 상징합니다.",
        "adviceBase":  "대지의 어머니처럼 넉넉한 품으로 주변을 따뜻하게 보살피고, 일상생활을 아늑하고 풍요롭게 가꾸세요.",
        "checklists":  [
                           "영양가 있는 따뜻한 밥을 챙겨 먹고 주변 환경을 청결하고 포근하게 정돈하기",
                           "현실적인 경제 감각을 발휘하여 알뜰하고 풍요로운 살림 꾸리기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    },
    {
        "id":  "pentacles-14",
        "imageUrl": "images/tarot_pentacles_14.jpg",
        "number":  14,
        "nameEn":  "King of Pentacles",
        "nameKo":  "펜타클 왕 (King of Pentacles)",
        "arcana":  "minor",
        "suit":  "pentacles",
        "element":  "흙(Earth)",
        "keywordsUpright":  [
                                "노련한 리더십",
                                "권위와 성취",
                                "확고한 통제",
                                "완성된 지배력"
                            ],
        "keywordsReversed":  [
                                 "독선과 아집",
                                 "경직된 통제",
                                 "권력의 남용",
                                 "무책임"
                             ],
        "observation":  "황소 머리 조각이 새겨진 덩굴 왕좌에 포도 넝쿨 옷을 입은 왕이 한 손에 홀을, 다른 손에 황금 동전을 얹고 성채를 내려다봅니다.",
        "universalSymbol":  "물질적 성공의 정점에 오른 현실의 마스터, 탄탄한 재정력과 후한 관대함으로 사람들을 보호하는 안정을 상징합니다.",
        "adviceBase":  "현실 세계의 든든한 마스터로서 축적된 부와 경험을 현명하게 운용하고, 사람들에게 든든한 버팀목이 되어주세요.",
        "checklists":  [
                           "장기적이고 안정적인 투자와 자산 관리 원칙을 견고하게 유지하기",
                           "물질적 성공에 집착하여 인간미를 잃지 않도록 주변에 온정 베풀기"
                       ],
        "symbolSvg":  "\u003ccircle cx=\"12\" cy=\"12\" r=\"8\" stroke=\"currentColor\" stroke-width=\"1.2\" fill=\"none\"/\u003e\u003cpolygon points=\"12,6 13.8,10.2 18,10.2 14.6,12.8 15.8,17 12,14.4 8.2,17 9.4,12.8 6,10.2 10.2,10.2\" stroke=\"currentColor\" stroke-width=\"1\" fill=\"none\"/\u003e"
    }
]

# -------------------------------------------------------------
# 2. 파이썬 기반 독해 & 인터프리테이션 엔진
# -------------------------------------------------------------
CORPUS_8_DOMAINS = [
    {
        "domain": "love", "domain_name": "연애 & 애정운", "sub": "짝사랑 / 탐색",
        "keywords": ["짝사랑", "썸", "호감", "그 사람", "그녀", "속마음", "좋아하", "관심", "태도", "탐색", "고백"],
        "reading": "상대방의 태도가 모호한 것은 거절이 아니라, 본인의 감정에 확신이 서지 않아 신중하게 관망하는 흐름입니다.",
        "action": "고백을 서두르기보다 사소한 일상 대화의 빈도를 늘려 편안함을 먼저 심어주세요.",
        "affirmation": "당신의 온기는 이미 충분히 전해지고 있으니 조급해하지 마세요."
    },
    {
        "domain": "love", "domain_name": "연애 & 애정운", "sub": "재회 / 미련",
        "keywords": ["재회", "미련", "다시 만", "헤어", "전남친", "전여친", "연락 올", "돌아올"],
        "reading": "상대방 역시 이별 후 공허함과 그리움을 느끼고 있지만, 과거의 해묵은 갈등과 자존심 탓에 멈춰 서 있습니다.",
        "action": "감정적인 연락은 방어벽을 높입니다. 갈등의 원인이 실질적으로 해결될 수 있는지 먼저 자문하세요.",
        "affirmation": "닿을 인연이라면 더 단단해져 만날 것이고, 아니라면 더 귀한 사랑이 옵니다."
    },
    {
        "domain": "trauma", "domain_name": "상처 극복 & 트라우마", "sub": "믿음의 배신 / 자책 치유",
        "keywords": ["배신", "기만", "바람", "거짓말", "가스라이팅", "자책", "후회", "내가 왜", "실수"],
        "reading": "순수하게 주었던 마음이 기만당했다는 충격과 자책으로 스스로를 과거의 감옥에 결박하고 있습니다.",
        "action": "상대의 부정직함은 상대의 몫입니다. 그때의 당신은 최선을 다했으니 스스로를 석방하세요.",
        "affirmation": "흙탕물이 튀었어도 당신이라는 원석의 본질은 조금도 훼손되지 않았습니다."
    },
    {
        "domain": "career", "domain_name": "진로 & 직무 탐색", "sub": "안정 vs 도전 / 이직·번아웃",
        "keywords": ["진로", "적성", "이직", "퇴사", "번아웃", "도전", "안정", "직장", "커리어", "회사"],
        "reading": "현재의 터전에서 성취가 한계에 다다르고 머리와 심장의 신호가 엇갈려 에너지가 소진된 형상입니다.",
        "action": "감정적으로 퇴사하기보다 리스크 없이 작은 사이드 검증을 시도하고 내 역량을 객관화하세요.",
        "affirmation": "남들의 속도에 맞추지 마세요. 당신만의 고유한 궤도가 만들어지는 중입니다."
    },
    {
        "domain": "exam", "domain_name": "취업 & 시험", "sub": "불합격 불안 / 장기 수험 슬럼프",
        "keywords": ["취업", "시험", "공부", "합격", "불합격", "탈락", "면접", "수험", "슬럼프"],
        "reading": "장기화된 고립 속에서 '이번에도 안 되면 어쩌지'라는 결과 중심적 공포가 집중력을 갉아먹고 있습니다.",
        "action": "최종 합격이라는 먼 산을 보지 말고, 오직 오늘 계획한 3시간 분량의 완결에만 시야를 좁히세요.",
        "affirmation": "이번 불합격은 실패가 아니라, 당신의 가치를 알아볼 더 알맞은 곳으로의 재배치입니다."
    },
    {
        "domain": "business", "domain_name": "사업 & 스타트업", "sub": "창업 리스크 / 매출 정체·동업",
        "keywords": ["창업", "사업", "스타트업", "매출", "적자", "동업", "고객", "마케팅"],
        "reading": "화려한 비전 이면에 모든 책임을 홀로 져야 하는 고립감과 과거 관성으로 시장의 변화를 놓치고 있는 흐름입니다.",
        "action": "거창한 외형 확장 대신 단 한 명의 진성 고객을 만족시키는 제품 핏과 명문화된 원칙에 집중하세요.",
        "affirmation": "모든 거대한 나무도 작은 씨앗에서 시작되었습니다. 당신의 통찰을 믿으세요."
    },
    {
        "domain": "finance", "domain_name": "금전 & 투자", "sub": "투자 손실 / 유동성 위기·소비",
        "keywords": ["돈", "투자", "주식", "코인", "손실", "빚", "대출", "카드값", "충동구매", "소비"],
        "reading": "남들의 수익에 대한 조급함이 냉철한 분석을 압도하거나, 불확실한 수입 사이에서 피가 마르는 긴장을 버텨내는 모습입니다.",
        "action": "손실 확정의 공포를 직시하고 손절 기준을 기계적으로 세우며, 불필요한 고정 지출을 극단적으로 줄이세요.",
        "affirmation": "계좌의 손실이 인생의 실패를 뜻하지 않습니다. 현금 흐름의 소나기는 지나갑니다."
    },
    {
        "domain": "health", "domain_name": "건강 & 심신 회복", "sub": "만성 피로 / 불면·공황",
        "keywords": ["피로", "무기력", "수면", "잠", "불면", "공황", "호흡", "불안", "가슴 답답", "건강"],
        "reading": "몸이 방전 경고등을 켜고 모든 기능을 강제로 멈춰 세웠으며, 뇌가 재앙 시나리오를 검토하느라 깊은 잠에 들지 못합니다.",
        "action": "자책을 즉시 중단하고 햇빛 쬐며 10분 걷기와 4-7-8 호흡법으로 심박수를 안정시키세요.",
        "affirmation": "쉬는 것 또한 치열한 삶의 연장선입니다. 회복을 허락할 자격이 당신에게 있습니다."
    },
    {
        "domain": "turning_point", "domain_name": "미래 & 삶의 전환기", "sub": "주기 전환 / 중대한 결단",
        "keywords": ["선택", "결정", "변화", "운", "미래", "영혼", "방향", "인생", "어떻게"],
        "reading": "오랫동안 유지되던 묵은 환경이 정리되고 삶의 패러다임 자체가 바뀌는 커다란 변곡점에 서 있습니다.",
        "action": "10년 뒤의 내가 지금의 나를 돌아봤을 때 더 자랑스러워할 결단이 무엇인지 심장에 물으세요.",
        "affirmation": "해체되는 것은 무너짐이 아니라, 더 웅장한 집을 짓기 위한 터 닦기입니다."
    }
]

def analyze_question(question: str):
    q = question.lower()
    for item in CORPUS_8_DOMAINS:
        if any(k in q for k in item["keywords"]):
            return item["domain"], item["reading"], item["action"], item["affirmation"], item["domain_name"], item["sub"]
    item = CORPUS_8_DOMAINS[-1]
    return item["domain"], item["reading"], item["action"], item["affirmation"], item["domain_name"], item["sub"]

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

class TarotRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/" or parsed.path == "/index.html":
            # 같은 폴더의 index.html이 있으면 읽어서 반환, 없으면 내장 템플릿 반환
            html_path = os.path.join(BASE_DIR, "index.html")
            if os.path.exists(html_path):
                with open(html_path, "rb") as f:
                    content = f.read()
            else:
                content = "<h1>UNIVERSAL TAROT App Running</h1>".encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(content)))
            self.end_headers()
            self.wfile.write(content)
        elif parsed.path.startswith("/images/"):
            # 정적 이미지 파일 서빙
            rel_path = parsed.path.lstrip("/").replace("/", os.sep)
            file_path = os.path.join(BASE_DIR, rel_path)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                content_type = "image/jpeg"
                if file_path.lower().endswith(".png"):
                    content_type = "image/png"
                elif file_path.lower().endswith(".svg"):
                    content_type = "image/svg+xml"
                elif file_path.lower().endswith(".webp"):
                    content_type = "image/webp"
                with open(file_path, "rb") as f:
                    img_data = f.read()
                self.send_response(200)
                self.send_header("Content-Type", content_type)
                self.send_header("Content-Length", str(len(img_data)))
                self.send_header("Cache-Control", "public, max-age=86400")
                self.end_headers()
                self.wfile.write(img_data)
            else:
                self.send_response(404)
                self.end_headers()
        elif parsed.path == "/api/cards":
            data = json.dumps(TAROT_CARDS, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode('utf-8')
        try:
            req_data = json.loads(body) if body else {}
        except Exception:
            req_data = {}

        if parsed.path == "/api/analyze":
            question = req_data.get("question", "")
            domain, reading, action, affirmation, domain_name, sub = analyze_question(question)
            res = {
                "domain": domain,
                "domainName": domain_name,
                "subCategory": sub,
                "intent": reading,
                "psychologicalReading": reading,
                "actionAdvice": action,
                "affirmation": affirmation
            }
            data = json.dumps(res, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        # 불필요한 로그 콘솔 출력 억제
        pass

# -------------------------------------------------------------
# 4. 가용 포트 자동 검색 및 로컬 서버 실행
# -------------------------------------------------------------
def find_available_port(start_port=8000, max_attempts=50):
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(('127.0.0.1', port))
                return port
            except OSError:
                continue
    return start_port

def main():
    port = find_available_port(8000)
    server_address = ('127.0.0.1', port)
    httpd = HTTPServer(server_address, TarotRequestHandler)
    url = f"http://localhost:{port}"

    print("=" * 64)
    print("  ✦ UNIVERSAL TAROT · INTEGRATED EDITION (로컬 프로그램) ✦")
    print("=" * 64)
    print(f"  [1] 로컬 웹 서버가 성공적으로 시작되었습니다.")
    print(f"  [2] 접속 주소: {url}")
    print(f"  [3] 브라우저 창이 자동으로 열립니다.")
    print(f"  [4] 프로그램을 종료하려면 터미널에서 Ctrl + C 를 누르세요.")
    print("=" * 64)

    # 기본 브라우저 자동 오픈
    try:
        webbrowser.open(url)
    except Exception as e:
        print(f"브라우저 자동 실행 중 알림: {e}")

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n타로 프로그램을 안전하게 종료합니다.")
        httpd.server_close()
        sys.exit(0)

if __name__ == "__main__":
    main()
