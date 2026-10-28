import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
당신은 "라이더 웨이트 타로 해설서 (RWS TAROT / INTEGRATED EDITION)"의 체계와 원칙을 철저히 수호하는 전문 타로 분석가이자 조언자입니다.

[절대 원칙]
1. 단순 길흉화복 예언이나 단정적 운명론을 절대 금지합니다.
2. 타로는 미래를 점치는 미신이 아니라, 질문자의 무의식과 심리, 현재 역학을 비추는 '사유의 거울'이자 '행동의 도구'입니다.
3. 3단계 독해 틀을 반드시 준수하여 답변하세요:
   - 1단계 [그림 관찰 (Observation)]: 카드 속 인물의 시선, 손의 자세, 도구, 배경 지형 등 객관적 도상을 먼저 짚습니다.
   - 2단계 [해석/추론 (Interpretation)]: 해당 도상이 질문자의 고민 맥락에서 뜻하는 심리와 상황을 4대 역방향 기준(에너지 지연, 내면화, 과잉/결핍, 관점의 전환)과 함께 추론합니다.
   - 3단계 [현실적 행동 조언 (Action Advice)]: 질문자가 오늘/이번 주에 스스로 통제하고 실행할 수 있는 구체적인 '한 문장 실천 처방'을 제시합니다.
4. 문체는 차분하고 품격 있는 경어체를 사용하며, 질문자가 삶의 주도권을 쥘 수 있도록 격려합니다.
`;

export async function POST(req: Request) {
  try {
    const { question, drawnCards, provider = 'gemini', apiKey } = await req.json();

    if (!question || !drawnCards) {
      return NextResponse.json({ error: '필수 파라미터가 누락되었습니다.' }, { status: 400 });
    }

    const cardsDescription = drawnCards
      .map(
        (d: { positionName: string; card: { nameKo: string }; isReversed: boolean }, idx: number) =>
          `${idx + 1}. [${d.positionName}] - ${d.card.nameKo} (${d.isReversed ? '역방향' : '정방향'})`
      )
      .join('\n');

    const userPrompt = `
[질문자의 고민]
"${question}"

[스프레드에 배치된 카드]
${cardsDescription}

위 카드들과 질문자의 상황을 "RWS TAROT / INTEGRATED EDITION"의 3단계 독해 틀(그림 관찰 -> 해석/추론 -> 현실적 행동 조언)에 따라 깊이 있게 종합 분석해 주세요.
`;

    // 1. Google Gemini 연동
    if (provider === 'gemini' && (apiKey || process.env.GEMINI_API_KEY)) {
      const activeKey = apiKey || process.env.GEMINI_API_KEY;
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${activeKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${SYSTEM_PROMPT}\n\n${userPrompt}` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1500
            }
          })
        }
      );

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      return NextResponse.json({ reading: generatedText });
    }

    // 2. OpenAI 연동
    if (provider === 'openai' && (apiKey || process.env.OPENAI_API_KEY)) {
      const activeKey = apiKey || process.env.OPENAI_API_KEY;
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: userPrompt }
          ],
          temperature: 0.7
        })
      });

      const data = await response.json();
      const generatedText = data.choices?.[0]?.message?.content;
      return NextResponse.json({ reading: generatedText });
    }

    // API Key가 없을 경우 로컬 엔진 리턴 안내
    return NextResponse.json({
      message: 'API Key가 제공되지 않아 내장 정밀 RWS 인터프리테이션 엔진 결과가 적용되었습니다.'
    });
  } catch (error) {
    console.error('AI Reading Error:', error);
    return NextResponse.json({ error: '리딩 생성 중 오류가 발생했습니다.' }, { status: 500 });
  }
}
