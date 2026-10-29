# 변경 이력 (Changelog)

이 프로젝트는 [Semantic Versioning (유의적 버전 2.0.0)](https://semver.org/lang/ko/) 표준을 따릅니다.

---

## [1.2.0] - 2026-10-29

### ✦ Added & Enhanced
- **타로 상담 실전 대화 코퍼스 탑재 및 3-Block UI 전면 개편**:
  - **8대 고민 분야 23개 세부 상황 분류기**: 연애, 상처/트라우마, 진로/직무, 취업/시험, 사업/스타트업, 금전/투자, 건강/심신, 미래/전환기 질문에 대한 1:1 맞춤형 진단 알고리즘 구축.
  - **3-Block 실전 리딩 시퀀스 UI 구현**:
    - **[1. 심리 리딩 (상황 해석)]**: 내담자의 무의식과 심리 상태를 2~3문장으로 명쾌하게 짚어내는 객관적 통찰.
    - **[2. 구체적 행동 조언 (실전 솔루션)]**: 추상적 점괘를 배제하고 오늘 당장 실천할 수 있는 구체적 행동 지침 제시.
    - **[3. 온기 있는 확언 (힐링 확언 카드)]**: 화면 캡처 및 마음 치유에 적합한 따뜻한 한 줄 자존감 회복 확언(원클릭 복사 기능 탑재).
  - **수트/4원소 상징 에너지 결합**: 완드(열정), 컵(감정), 소드(이성), 펜타클(현실) 템플릿과 카드 정/역방향 상태를 유기적으로 결합한 동적 해석 도출.
  - 적용 파일: [TarotSpreadView.tsx](file:///c:/AI개발/타로/src/components/TarotSpreadView.tsx), [interpretationEngine.ts](file:///c:/AI개발/타로/src/lib/interpretationEngine.ts), [app.py](file:///c:/AI개발/타로/app.py), [index.html](file:///c:/AI개발/타로/index.html)
- **마이너 아르카나 4대 에이스 카드 AI 일러스트 신규 생성 및 적용**:
  - `tarot_wands_1.jpg` (Ace of Wands), `tarot_cups_1.jpg` (Ace of Cups), `tarot_swords_1.jpg` (Ace of Swords), `tarot_pentacles_1.jpg` (Ace of Pentacles) 생성 완료 및 정적 애셋 연동.

---

## [1.1.0] - 2026-10-29

### ✦ Added & Changed
- **AI 일러스트레이션 전체 웹앱 연동 및 렌더링 적용**:
  - [TarotCard.tsx](file:///c:/AI개발/타로/src/components/TarotCard.tsx): 고화질 AI 일러스트(`imageUrl`)가 있을 경우 실물 카드 아트를 직접 렌더링하도록 3D 카드 뷰 전면 개편.
  - [tarotData.ts](file:///c:/AI개발/타로/src/lib/tarotData.ts): 78장 전체 카드 데이터베이스(22장 메이저 + 56장 마이너) 동기화 및 메이저 아르카나 이미지 경로 연결.
  - [app.py](file:///c:/AI개발/타로/app.py): 로컬 HTTP 서버에 `/images/` 정적 파일(JPEG, PNG, SVG) 서빙 핸들러 추가 및 카드 데이터에 `imageUrl` 속성 추가.
  - [public/images/](file:///c:/AI개발/타로/public/images): Next.js 정적 애셋 서빙을 위한 이미지 디렉터리 동기화.

---

## [1.0.0] - 2026-10-29

### ✦ Initial Release (최초 릴리스)
- **Universal Tarot Web Application**:
  - Next.js 14, React 18, Tailwind CSS, Zustand 기반 웹 프론트엔드 구축.
  - 22장 메이저 아르카나 타로 일러스트 및 도감 열람 모달 구현.
  - Framer Motion을 활용한 3D 카드 셔플 및 플립 인터랙션.
  - Web Audio API 기반 오실레이터 사운드 신디사이저(BGM, 셔플음, 플립음).
  - 관찰/행동/해석 조언 3단계 대화형 타로 리딩 엔진.
- **로컬 단일 실행 지원**:
  - 무설치 초경량 Python 표준 라이브러리 서버 (`app.py`).
  - 자립형 단일 HTML 프론트엔드 (`index.html`).
  - 윈도우 원클릭 자동 실행 스크립트 (`run.bat`).
