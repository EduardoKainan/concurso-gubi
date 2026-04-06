import { GoogleGenAI, Type } from '@google/genai';
import { StudyEssayDidacticResponse, StudyEssayPrompt } from '../types';

const getApiKey = () => {
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GOOGLE_API_KEY) {
      return (import.meta as any).env.VITE_GOOGLE_API_KEY as string;
    }
    if (typeof process !== 'undefined' && process.env?.API_KEY) {
      return process.env.API_KEY;
    }
  } catch {
    return '';
  }
  return '';
};

const API_KEY = getApiKey();

let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({ apiKey: API_KEY || 'dummy_key_to_prevent_crash' });
} catch {
  ai = null;
}

const cleanSentence = (value: string) => value.replace(/\s+/g, ' ').trim();

const buildLocalDidacticResponse = (prompt: StudyEssayPrompt): StudyEssayDidacticResponse => {
  const intro = `O tema exige relacionar ${prompt.topic.toLowerCase()} com ganhos concretos para a administração pública, mostrando causa, efeito e proposta viável.`;
  const thesis = `A resposta pode defender que ${prompt.topic.toLowerCase()} fortalece a eficiência estatal porque organiza decisões, reduz falhas operacionais e melhora a entrega ao cidadão.`;
  const argumentList = [
    `Primeiro, ${prompt.topic.toLowerCase()} melhora o diagnóstico do problema e evita decisões improvisadas.`,
    `Segundo, a aplicação prática desse eixo aumenta controle, previsibilidade e qualidade do serviço público.`,
  ];
  const suggestedStructure = [
    `Introdução: apresente o tema e feche com a tese central sobre ${prompt.subject.toLowerCase()}.`,
    `Desenvolvimento 1: explique o conceito principal e mostre seu impacto administrativo.`,
    `Desenvolvimento 2: conecte o tema a eficiência, controle, qualidade ou redução de retrabalho.`,
    'Conclusão: retome a tese e proponha medida objetiva, legal e executável.',
  ];
  const modelAnswer = [
    `Em contextos de alta cobrança por resultados, ${prompt.topic.toLowerCase()} assume papel estratégico na administração pública. Isso ocorre porque a atuação estatal demanda planejamento, organização e mecanismos capazes de transformar diretrizes abstratas em entregas concretas. Nesse cenário, defender esse instrumento significa reconhecer que eficiência não nasce do improviso, mas de processos estruturados e orientados por evidências.`,
    `Em primeiro lugar, a correta compreensão do tema permite identificar gargalos, definir prioridades e alinhar recursos às necessidades reais do órgão. Quando a gestão trabalha com critérios técnicos, o processo decisório se torna mais racional e reduz desperdícios, retrabalho e falhas de execução. Assim, a administração passa a atuar com maior previsibilidade e coerência institucional.`,
    `Além disso, o tema também contribui para elevar a qualidade do atendimento e fortalecer o controle dos resultados. Indicadores, rotinas padronizadas e acompanhamento contínuo favorecem correções rápidas e aumentam a capacidade de resposta do poder público. Com isso, o cidadão percebe mais clareza, agilidade e confiança na prestação do serviço.`,
    `Portanto, ${prompt.topic.toLowerCase()} deve ser tratado como ferramenta efetiva de modernização administrativa. Para isso, cabe aos gestores combinar capacitação das equipes, definição de métricas e revisão periódica dos fluxos internos, a fim de consolidar uma cultura de melhoria contínua e atendimento mais eficiente à sociedade.`,
  ].join('\n\n');

  return {
    provider: 'local',
    generatedAt: new Date().toISOString(),
    interpretation: intro,
    thesis,
    arguments: argumentList,
    suggestedStructure,
    modelAnswer,
    studyTips: [
      'Repare como a tese responde diretamente ao comando do enunciado.',
      'Use conectivos de progressão, como “em primeiro lugar”, “além disso” e “portanto”.',
      'Na conclusão, proponha medida concreta, evitando soluções genéricas.',
    ],
    steps: [
      {
        title: '1. Interpretação do tema',
        explanation: intro,
        bullets: [
          `Palavra-chave do tema: ${prompt.topic}.`,
          'Mostre impacto prático no serviço público ou no contexto exigido pelo enunciado.',
        ],
      },
      {
        title: '2. Tese central',
        explanation: thesis,
        bullets: [
          'A tese precisa ser afirmativa e defensável.',
          'Evite só repetir o tema, acrescente uma relação de causa e consequência.',
        ],
      },
      {
        title: '3. Argumentos de desenvolvimento',
        explanation: 'Separe dois blocos argumentativos, cada um com ideia, explicação e efeito prático.',
        bullets: argumentList,
      },
      {
        title: '4. Estrutura sugerida',
        explanation: 'Organize a redação para facilitar clareza, progressão lógica e fechamento propositivo.',
        bullets: suggestedStructure,
      },
      {
        title: '5. Resposta-modelo explicada',
        explanation: 'Use o texto abaixo como referência de construção, não como cola literal.',
        bullets: [
          'Observe a abertura contextualizada.',
          'Veja como cada parágrafo cumpre função específica.',
          'Na revisão, adapte vocabulário e exemplos ao seu repertório.',
        ],
      },
    ],
  };
};

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    interpretation: { type: Type.STRING },
    thesis: { type: Type.STRING },
    arguments: { type: Type.ARRAY, items: { type: Type.STRING } },
    suggestedStructure: { type: Type.ARRAY, items: { type: Type.STRING } },
    modelAnswer: { type: Type.STRING },
    studyTips: { type: Type.ARRAY, items: { type: Type.STRING } },
    steps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          explanation: { type: Type.STRING },
          bullets: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ['title', 'explanation', 'bullets'],
      },
    },
  },
  required: ['interpretation', 'thesis', 'arguments', 'suggestedStructure', 'modelAnswer', 'studyTips', 'steps'],
};

export const studyEssayCoachService = {
  async generateDidacticResponse(prompt: StudyEssayPrompt): Promise<StudyEssayDidacticResponse> {
    const fallback = buildLocalDidacticResponse(prompt);

    if (!API_KEY || !ai) return fallback;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: JSON.stringify(prompt),
        config: {
          temperature: 0.5,
          responseMimeType: 'application/json',
          responseSchema,
          systemInstruction: `Você é um professor de discursivas para concursos públicos no Brasil. Gere uma resposta didática em português do Brasil. A saída deve ensinar o aluno passo a passo e deixar claro que se trata de uma resposta-modelo explicada, não de um texto para copiar integralmente. Produza exatamente 5 passos: interpretação do tema, tese, argumentos, estrutura sugerida e resposta-modelo explicada.`,
        },
      });

      if (!response.text) return fallback;
      const parsed = JSON.parse(response.text) as Omit<StudyEssayDidacticResponse, 'provider' | 'generatedAt'>;

      return {
        provider: 'gemini',
        generatedAt: new Date().toISOString(),
        interpretation: cleanSentence(parsed.interpretation || fallback.interpretation),
        thesis: cleanSentence(parsed.thesis || fallback.thesis),
        arguments: (parsed.arguments || fallback.arguments).slice(0, 3).map(cleanSentence),
        suggestedStructure: (parsed.suggestedStructure || fallback.suggestedStructure).slice(0, 5).map(cleanSentence),
        modelAnswer: (parsed.modelAnswer || fallback.modelAnswer).trim(),
        studyTips: (parsed.studyTips || fallback.studyTips).slice(0, 4).map(cleanSentence),
        steps: (parsed.steps || fallback.steps).slice(0, 5).map((step, index) => ({
          title: cleanSentence(step?.title || fallback.steps[index]?.title || `Passo ${index + 1}`),
          explanation: cleanSentence(step?.explanation || fallback.steps[index]?.explanation || ''),
          bullets: (step?.bullets || fallback.steps[index]?.bullets || []).slice(0, 4).map(cleanSentence),
        })),
      };
    } catch {
      return fallback;
    }
  },
};
