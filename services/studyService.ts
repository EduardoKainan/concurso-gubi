import { supabase } from '../lib/supabase';
import { studyEssayCoachService } from './studyEssayCoachService';
import {
  studyEssayPrompts,
  studyQuestions as studyQuestionsSeed,
  studySubjectProgressSeed,
  studySummarySeed,
} from '../data/studySeed';
import {
  StudyAttempt,
  StudyAttemptResult,
  StudyDashboardData,
  StudyEssayDraft,
  StudyEssayDidacticResponse,
  StudyEssayEntry,
  StudyEssayPrompt,
  StudyErrorInsight,
  StudyQuestionItem,
  StudyQuestionSessionState,
  StudyRecommendation,
  StudyReviewItem,
  StudySubjectProgress,
  StudySummary,
  StudyTopicPerformance,
} from '../types';

const ATTEMPTS_TABLE = 'study_attempts';
const SUMMARY_TABLE = 'study_progress_summaries';
const SUBJECTS_TABLE = 'study_subjects';
const TOPICS_TABLE = 'study_topics';
const QUESTIONS_TABLE = 'study_questions';
const QUESTION_SESSIONS_TABLE = 'study_question_sessions';
const ESSAYS_TABLE = 'study_essay_entries';
const ESSAY_DRAFTS_TABLE = 'study_essay_drafts';
const STORAGE_KEY = 'adroi.study.v3';
const QUESTION_SESSION_STORAGE_KEY = 'adroi.study.questionSession.v1';
const ESSAY_STORAGE_KEY = 'adroi.study.essays.v2';
const ESSAY_DRAFT_STORAGE_KEY = 'adroi.study.essayDraft.v1';
const SUMMARY_ID = 'public-demo';

const REVIEW_INTERVALS: Record<'24h' | '7d' | '14d', number> = {
  '24h': 24 * 60 * 60 * 1000,
  '7d': 7 * 24 * 60 * 60 * 1000,
  '14d': 14 * 24 * 60 * 60 * 1000,
};

const getClientSessionId = (): string => {
  if (typeof window === 'undefined') return SUMMARY_ID;
  const key = 'adroi.session.id';
  const existing = window.localStorage.getItem(key);
  if (existing) return existing;
  const next = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `session-${Date.now()}`;
  window.localStorage.setItem(key, next);
  return next;
};

const isAuthSessionMissingError = (error: unknown): boolean => {
  if (!error || typeof error !== 'object') return false;
  const message = 'message' in error ? String((error as { message?: unknown }).message || '') : '';
  return message.toLowerCase().includes('auth session missing');
};

const seedProgress: StudySubjectProgress[] = studySubjectProgressSeed.map((item) => ({
  ...item,
  correct: 0,
  wrong: 0,
  totalQuestions: 0,
  lastAttemptAt: undefined,
  studyMomentum: 50,
}));

const seedSummary: StudySummary = {
  ...studySummarySeed,
  weakSubjects: [],
  dueReviews: 0,
};

const getStoredData = (): StudyDashboardData => {
  const emptyRecommendation: StudyRecommendation = {
    title: 'Comece por um bloco curto de revisão',
    reason: 'Ainda não há histórico suficiente. Faça 10 questões para o motor adaptativo aprender.',
    subject: seedProgress[0]?.subject || 'Geral',
    topic: 'Mapear baseline',
    targetQuestions: 10,
    reviewCount: 0,
    estimatedMinutes: 30,
    focusMode: 'questoes',
    priority: 'media',
  };

  if (typeof window === 'undefined') {
    return {
      source: 'local',
      attempts: [],
      summary: seedSummary,
      subjectProgress: seedProgress,
      errorInsights: [],
      topicPerformance: [],
      reviewQueue: [],
      recommendation: emptyRecommendation,
    };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return {
      source: 'local',
      attempts: [],
      summary: seedSummary,
      subjectProgress: seedProgress,
      errorInsights: [],
      topicPerformance: [],
      reviewQueue: [],
      recommendation: emptyRecommendation,
    };
  }

  try {
    const parsed = JSON.parse(raw) as Omit<StudyDashboardData, 'source'>;
    return {
      source: 'local',
      attempts: parsed.attempts || [],
      summary: parsed.summary || seedSummary,
      subjectProgress: parsed.subjectProgress || seedProgress,
      errorInsights: parsed.errorInsights || [],
      topicPerformance: parsed.topicPerformance || [],
      reviewQueue: parsed.reviewQueue || [],
      recommendation: parsed.recommendation || emptyRecommendation,
    };
  } catch {
    return {
      source: 'local',
      attempts: [],
      summary: seedSummary,
      subjectProgress: seedProgress,
      errorInsights: [],
      topicPerformance: [],
      reviewQueue: [],
      recommendation: emptyRecommendation,
    };
  }
};

const persistLocal = (data: Omit<StudyDashboardData, 'source'>) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const getStoredQuestionSession = (): StudyQuestionSessionState | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(QUESTION_SESSION_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StudyQuestionSessionState;
  } catch {
    return null;
  }
};

const persistQuestionSessionLocal = (data: StudyQuestionSessionState) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(QUESTION_SESSION_STORAGE_KEY, JSON.stringify(data));
};

const getStoredEssays = (): StudyEssayEntry[] => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(ESSAY_STORAGE_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StudyEssayEntry[];
  } catch {
    return [];
  }
};

const persistEssaysLocal = (entries: StudyEssayEntry[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ESSAY_STORAGE_KEY, JSON.stringify(entries));
};

const getStoredEssayDraft = (): StudyEssayDraft | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(ESSAY_DRAFT_STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as StudyEssayDraft;
  } catch {
    return null;
  }
};

const persistEssayDraftLocal = (draft: StudyEssayDraft | null) => {
  if (typeof window === 'undefined') return;
  if (!draft) {
    window.localStorage.removeItem(ESSAY_DRAFT_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(ESSAY_DRAFT_STORAGE_KEY, JSON.stringify(draft));
};

const getAttemptedAt = (row: any): string => row.attempted_at || row.answered_at || row.created_at || new Date().toISOString();

const toQuestion = (row: any, topicsById: Map<string, string>, subjectsById: Map<string, string>): StudyQuestionItem => ({
  id: Number(row.id),
  subject: subjectsById.get(row.subject_id) || row.subject_name || row.subject || 'Sem matéria',
  topic: topicsById.get(row.topic_id) || row.topic_name || row.topic || 'Sem tópico',
  level: row.level,
  statement: row.statement,
  options: Array.isArray(row.options) ? row.options : [],
  correctIndex: Number(row.correct_index),
  explanation: row.explanation,
});

const toAttempt = (row: any): StudyAttempt => ({
  id: String(row.id),
  question_id: Number(row.question_id),
  subject: row.subject,
  topic: row.topic,
  selected_option: Number(row.selected_option),
  is_correct: Boolean(row.is_correct),
  attempted_at: getAttemptedAt(row),
});

const toEssayEntry = (row: any): StudyEssayEntry => {
  const answer = row.answer || '';
  const wordCount = Number(row.word_count) || answer.trim().split(/\s+/).filter(Boolean).length;
  return {
    id: String(row.id),
    promptId: String(row.prompt_id),
    title: row.title,
    subject: row.subject,
    topic: row.topic,
    answer,
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || row.created_at || new Date().toISOString(),
    wordCount,
    score: typeof row.score === 'number' ? row.score : undefined,
    status: row.status === 'draft' ? 'draft' : 'finished',
    feedback: Array.isArray(row.feedback) ? row.feedback : undefined,
    didacticResponse: row.didactic_response || undefined,
  };
};

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

const getReviewStage = (errorCount: number): '24h' | '7d' | '14d' => {
  if (errorCount <= 1) return '24h';
  if (errorCount === 2) return '7d';
  return '14d';
};

const calcWordCount = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

const buildEssayFeedback = (answer: string, prompt: StudyEssayPrompt | undefined): string[] => {
  const wordCount = calcWordCount(answer);
  const paragraphs = answer.split(/\n\s*\n/).filter((item) => item.trim().length > 0).length;
  const feedback: string[] = [];

  if (wordCount < 120) feedback.push('Texto curto. Tente passar de 120 palavras para sustentar melhor a argumentação.');
  else if (wordCount > 260) feedback.push('Texto robusto. Vale revisar concisão para não perder objetividade de prova.');

  if (paragraphs < 3) feedback.push('Estruture em pelo menos 3 parágrafos: introdução, desenvolvimento e conclusão.');
  else feedback.push('Estrutura base atendida, com boa separação visual de ideias.');

  if (prompt && prompt.structure.some((item) => answer.toLowerCase().includes(item.split(' ')[0].toLowerCase()))) {
    feedback.push('Você já acionou parte da estrutura sugerida pelo mentor.');
  } else if (prompt) {
    feedback.push(`Cheque se contemplou: ${prompt.structure.slice(0, 2).join(' + ')}.`);
  }

  return feedback.slice(0, 3);
};

const calculateErrorInsights = (attempts: StudyAttempt[]): StudyErrorInsight[] => {
  const byTopic = new Map<string, StudyAttempt[]>();

  attempts.forEach((attempt) => {
    const key = `${attempt.subject}::${attempt.topic}`;
    const list = byTopic.get(key) || [];
    list.push(attempt);
    byTopic.set(key, list);
  });

  return Array.from(byTopic.entries())
    .map(([key, topicAttempts]) => {
      const [subject, topic] = key.split('::');
      const ordered = [...topicAttempts].sort((a, b) => +new Date(b.attempted_at) - +new Date(a.attempted_at));
      const totalAttempts = ordered.length;
      const totalErrors = ordered.filter((item) => !item.is_correct).length;
      const correct = totalAttempts - totalErrors;
      const accuracy = totalAttempts > 0 ? Math.round((correct / totalAttempts) * 100) : 0;

      return {
        subject,
        topic,
        totalAttempts,
        totalErrors,
        accuracy,
        lastAttemptAt: ordered[0]?.attempted_at,
      };
    })
    .filter((item) => item.totalErrors > 0)
    .sort((a, b) => {
      if (b.totalErrors !== a.totalErrors) return b.totalErrors - a.totalErrors;
      return a.accuracy - b.accuracy;
    })
    .slice(0, 10);
};

const calculateTopicPerformance = (attempts: StudyAttempt[]): StudyTopicPerformance[] => {
  const byTopic = new Map<string, StudyAttempt[]>();

  attempts.forEach((attempt) => {
    const key = `${attempt.subject}::${attempt.topic}`;
    const list = byTopic.get(key) || [];
    list.push(attempt);
    byTopic.set(key, list);
  });

  return Array.from(byTopic.entries())
    .map(([key, topicAttempts]) => {
      const [subject, topic] = key.split('::');
      const ordered = [...topicAttempts].sort((a, b) => +new Date(b.attempted_at) - +new Date(a.attempted_at));
      const attemptsCount = ordered.length;
      const correct = ordered.filter((item) => item.is_correct).length;
      const errors = attemptsCount - correct;
      const accuracy = attemptsCount > 0 ? Math.round((correct / attemptsCount) * 100) : 0;
      const averageResponseLabel = accuracy >= 75 ? 'forte' : accuracy >= 50 ? 'atenção' : 'crítico';

      return {
        subject,
        topic,
        attempts: attemptsCount,
        correct,
        errors,
        accuracy,
        averageResponseLabel,
        lastAttemptAt: ordered[0]?.attempted_at,
      };
    })
    .sort((a, b) => {
      if (a.averageResponseLabel !== b.averageResponseLabel) {
        const order = { crítico: 0, atenção: 1, forte: 2 };
        return order[a.averageResponseLabel] - order[b.averageResponseLabel];
      }
      return a.accuracy - b.accuracy;
    });
};

const calculateReviewQueue = (attempts: StudyAttempt[]): StudyReviewItem[] => {
  const wrongAttempts = attempts.filter((item) => !item.is_correct);
  const byQuestion = new Map<number, StudyAttempt[]>();

  wrongAttempts.forEach((attempt) => {
    const list = byQuestion.get(attempt.question_id) || [];
    list.push(attempt);
    byQuestion.set(attempt.question_id, list);
  });

  const now = Date.now();

  return Array.from(byQuestion.entries())
    .map(([questionId, entries]) => {
      const ordered = [...entries].sort((a, b) => +new Date(b.attempted_at) - +new Date(a.attempted_at));
      const lastAttempt = ordered[0];
      const errorCount = ordered.length;
      const stage = getReviewStage(errorCount);
      const dueAtDate = new Date(new Date(lastAttempt.attempted_at).getTime() + REVIEW_INTERVALS[stage]);
      const diff = dueAtDate.getTime() - now;
      const status = diff <= 0 ? 'overdue' : diff <= 18 * 60 * 60 * 1000 ? 'due_soon' : 'scheduled';

      return {
        id: `${questionId}-${stage}`,
        questionId,
        subject: lastAttempt.subject,
        topic: lastAttempt.topic,
        stage,
        dueAt: dueAtDate.toISOString(),
        errorCount,
        lastAttemptAt: lastAttempt.attempted_at,
        status,
      };
    })
    .sort((a, b) => +new Date(a.dueAt) - +new Date(b.dueAt))
    .slice(0, 18);
};

const calculateRecommendation = (
  subjectProgress: StudySubjectProgress[],
  topicPerformance: StudyTopicPerformance[],
  reviewQueue: StudyReviewItem[]
): StudyRecommendation => {
  const dueReviews = reviewQueue.filter((item) => item.status !== 'scheduled');
  const weakestSubject = [...subjectProgress].sort((a, b) => a.accuracy - b.accuracy)[0];
  const weakestTopic = topicPerformance.find((item) => item.subject === weakestSubject?.subject) || topicPerformance[0];

  if (!weakestSubject) {
    return {
      title: 'Monte o baseline inicial',
      reason: 'Ainda não existe massa crítica de respostas. Resolva um bloco para calibrar a trilha adaptativa.',
      subject: 'Geral',
      topic: 'Diagnóstico inicial',
      targetQuestions: 10,
      reviewCount: 0,
      estimatedMinutes: 30,
      focusMode: 'questoes',
      priority: 'media',
    };
  }

  const focusMode = dueReviews.length >= 3 ? 'misto' : dueReviews.length > 0 ? 'revisao' : 'questoes';
  const targetQuestions = Math.max(8, Math.min(20, 6 + weakestSubject.pendingReviews + Math.round((100 - weakestSubject.accuracy) / 10)));
  const estimatedMinutes = focusMode === 'revisao' ? 35 : focusMode === 'misto' ? 50 : 45;

  return {
    title: dueReviews.length > 0 ? 'Próxima sessão recomendada: revisão + ataque ao ponto fraco' : 'Próxima sessão recomendada: bloco de recuperação',
    reason: dueReviews.length > 0
      ? `${dueReviews.length} revisão(ões) já venceram ou vencem em breve, com fragilidade maior em ${weakestSubject.subject}.`
      : `${weakestSubject.subject} é hoje a disciplina mais fraca, puxada por ${weakestTopic?.topic || 'tópicos recentes'}.`, 
    subject: weakestSubject.subject,
    topic: weakestTopic?.topic || 'Reforço dirigido',
    targetQuestions,
    reviewCount: dueReviews.length,
    estimatedMinutes,
    focusMode,
    priority: weakestSubject.accuracy < 55 || dueReviews.length >= 4 ? 'alta' : weakestSubject.accuracy < 70 ? 'media' : 'baixa',
  };
};

const calculateDashboardData = (attempts: StudyAttempt[], questions: StudyQuestionItem[]): Omit<StudyDashboardData, 'source'> => {
  const orderedAttempts = [...attempts].sort((a, b) => +new Date(b.attempted_at) - +new Date(a.attempted_at));
  const bySubject = new Map<string, StudyAttempt[]>();
  const questionsBySubject = new Map<string, number>();

  questions.forEach((question) => {
    questionsBySubject.set(question.subject, (questionsBySubject.get(question.subject) || 0) + 1);
  });

  orderedAttempts.forEach((attempt) => {
    const list = bySubject.get(attempt.subject) || [];
    list.push(attempt);
    bySubject.set(attempt.subject, list);
  });

  const reviewQueue = calculateReviewQueue(orderedAttempts);
  const topicPerformance = calculateTopicPerformance(orderedAttempts);

  const subjectProgress = seedProgress.map((seed) => {
    const subjectAttempts = bySubject.get(seed.subject) || [];
    const ordered = [...subjectAttempts].sort((a, b) => +new Date(b.attempted_at) - +new Date(a.attempted_at));
    const correct = ordered.filter((item) => item.is_correct).length;
    const wrong = ordered.length - correct;
    const accuracy = ordered.length > 0 ? Math.round((correct / ordered.length) * 100) : seed.accuracy;
    const uniqueQuestions = new Set(ordered.map((item) => item.question_id)).size;
    const totalQuestions = questionsBySubject.get(seed.subject) || 1;
    const progress = ordered.length > 0 ? Math.min(100, Math.max(seed.progress, Math.round((uniqueQuestions / totalQuestions) * 100))) : seed.progress;
    const pendingReviews = reviewQueue.filter((item) => item.subject === seed.subject).length;
    const uniqueDays = new Set(ordered.map((item) => new Date(item.attempted_at).toDateString())).size;
    const lastAttemptAt = ordered[0]?.attempted_at;
    const studyMomentum = ordered.length === 0 ? seed.studyMomentum : Math.max(20, Math.min(98, Math.round((accuracy * 0.6) + (progress * 0.4))));

    return {
      ...seed,
      attempts: ordered.length,
      accuracy,
      progress,
      pendingReviews,
      streak: Math.max(seed.streak, uniqueDays),
      correct,
      wrong,
      totalQuestions,
      lastAttemptAt,
      studyMomentum,
    };
  });

  const totalAttempts = orderedAttempts.length;
  const totalCorrect = orderedAttempts.filter((item) => item.is_correct).length;
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : seedSummary.accuracy;
  const now = new Date();
  const completedToday = orderedAttempts.filter((item) => isSameDay(new Date(item.attempted_at), now)).length;
  const weakSubjects = [...subjectProgress]
    .filter((item) => item.attempts > 0)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 3)
    .map((item) => item.subject);
  const recommendation = calculateRecommendation(subjectProgress, topicPerformance, reviewQueue);

  return {
    attempts: orderedAttempts,
    subjectProgress,
    errorInsights: calculateErrorInsights(orderedAttempts),
    topicPerformance,
    reviewQueue,
    recommendation,
    summary: {
      ...seedSummary,
      totalAttempts,
      totalCorrect,
      accuracy,
      pendingReviews: reviewQueue.length,
      completedToday,
      currentStreak: Math.max(seedSummary.currentStreak, subjectProgress.reduce((max, item) => Math.max(max, item.streak), 0)),
      lastAttemptAt: orderedAttempts[0]?.attempted_at,
      weakSubjects,
      dueReviews: reviewQueue.filter((item) => item.status !== 'scheduled').length,
    },
  };
};

const mergeSummaryData = (calculated: Omit<StudyDashboardData, 'source'>, summaryData: any) => ({
  ...calculated,
  summary: {
    ...calculated.summary,
    totalAttempts: summaryData?.total_attempts ?? calculated.summary.totalAttempts,
    totalCorrect: summaryData?.total_correct ?? calculated.summary.totalCorrect,
    accuracy: summaryData?.accuracy ?? calculated.summary.accuracy,
    pendingReviews: summaryData?.pending_reviews ?? calculated.summary.pendingReviews,
    completedToday: summaryData?.completed_today ?? summaryData?.questions_answered_today ?? calculated.summary.completedToday,
    currentStreak: summaryData?.current_streak ?? summaryData?.streak_days ?? calculated.summary.currentStreak,
    lastAttemptAt: summaryData?.last_attempt_at ?? calculated.summary.lastAttemptAt,
    dueReviews: summaryData?.due_reviews ?? calculated.summary.dueReviews,
  },
});

const normalizeQuestionIds = (value: unknown): number[] => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => Number(item))
    .filter((item, index, array) => Number.isFinite(item) && array.indexOf(item) === index);
};

const pickNextQuestionId = (queueQuestionIds: number[], orderedQuestionIds: number[], referenceId?: number | null): number | null => {
  if (!queueQuestionIds.length) return null;
  if (!referenceId) return queueQuestionIds[0];

  const queueSet = new Set(queueQuestionIds);
  const referenceIndex = orderedQuestionIds.indexOf(referenceId);

  if (referenceIndex >= 0) {
    for (let index = referenceIndex + 1; index < orderedQuestionIds.length; index += 1) {
      if (queueSet.has(orderedQuestionIds[index])) return orderedQuestionIds[index];
    }
  }

  return queueQuestionIds[0];
};

const buildQuestionSessionState = (
  questions: StudyQuestionItem[],
  attempts: StudyAttempt[],
  reviewQueue: StudyReviewItem[],
  persistedState?: Partial<StudyQuestionSessionState> | null,
  overrideCurrentQuestionId?: number | null,
  referenceQuestionId?: number | null
): StudyQuestionSessionState => {
  const orderedQuestionIds = questions.map((question) => question.id);
  const answeredQuestionIds = orderedQuestionIds.filter((questionId) => attempts.some((attempt) => attempt.question_id === questionId));
  const unansweredQuestionIds = orderedQuestionIds.filter((questionId) => !answeredQuestionIds.includes(questionId));
  const reviewQuestionIds = reviewQueue.map((item) => item.questionId).filter((questionId, index, array) => array.indexOf(questionId) === index);

  let mode: StudyQuestionSessionState['mode'] = 'continuacao';
  let queueQuestionIds = unansweredQuestionIds;

  if (!queueQuestionIds.length && reviewQuestionIds.length) {
    mode = 'revisao';
    queueQuestionIds = reviewQuestionIds;
  } else if (!queueQuestionIds.length) {
    mode = 'reinicio';
    queueQuestionIds = orderedQuestionIds;
  }

  const preferredQuestionId = overrideCurrentQuestionId && queueQuestionIds.includes(overrideCurrentQuestionId)
    ? overrideCurrentQuestionId
    : null;
  const currentQuestionId = preferredQuestionId ?? pickNextQuestionId(
    queueQuestionIds,
    orderedQuestionIds,
    referenceQuestionId ?? persistedState?.currentQuestionId ?? persistedState?.lastAnsweredQuestionId ?? null
  );
  const currentIndex = currentQuestionId ? Math.max(queueQuestionIds.indexOf(currentQuestionId), 0) : 0;
  const completedQuestions = answeredQuestionIds.length;
  const remainingQuestions = Math.max(questions.length - completedQuestions, 0);
  const completedCycles = Number(persistedState?.completedCycles) || 0;

  return {
    currentQuestionId,
    currentIndex,
    queueQuestionIds,
    answeredQuestionIds,
    reviewQuestionIds,
    totalQuestions: questions.length,
    completedQuestions,
    remainingQuestions,
    completedCycles,
    mode,
    updatedAt: new Date().toISOString(),
    lastAnsweredQuestionId: persistedState?.lastAnsweredQuestionId,
  };
};

const toQuestionSessionState = (row: any, questions: StudyQuestionItem[], attempts: StudyAttempt[], reviewQueue: StudyReviewItem[]): StudyQuestionSessionState => buildQuestionSessionState(
  questions,
  attempts,
  reviewQueue,
  {
    currentQuestionId: row?.current_question_id ? Number(row.current_question_id) : null,
    completedCycles: Number(row?.completed_cycles) || 0,
    lastAnsweredQuestionId: row?.last_answered_question_id ? Number(row.last_answered_question_id) : undefined,
    queueQuestionIds: normalizeQuestionIds(row?.queue_question_ids),
    answeredQuestionIds: normalizeQuestionIds(row?.answered_question_ids),
    reviewQuestionIds: normalizeQuestionIds(row?.review_question_ids),
  }
);

const persistQuestionSessionRemote = async (data: StudyQuestionSessionState) => {
  const { error } = await supabase.from(QUESTION_SESSIONS_TABLE).upsert([
    {
      session_id: getClientSessionId(),
      current_question_id: data.currentQuestionId,
      queue_question_ids: data.queueQuestionIds,
      answered_question_ids: data.answeredQuestionIds,
      review_question_ids: data.reviewQuestionIds,
      completed_cycles: data.completedCycles,
      last_answered_question_id: data.lastAnsweredQuestionId ?? null,
      mode: data.mode,
      updated_at: data.updatedAt,
    },
  ], { onConflict: 'session_id' });

  if (error) throw error;
};

export const studyService = {
  async getQuestionBank(): Promise<StudyQuestionItem[]> {
    try {
      const [{ data: subjectsData, error: subjectsError }, { data: topicsData, error: topicsError }, { data: questionsData, error: questionsError }] = await Promise.all([
        supabase.from(SUBJECTS_TABLE).select('id, name').order('sort_order', { ascending: true }),
        supabase.from(TOPICS_TABLE).select('id, subject_id, name').order('sort_order', { ascending: true }),
        supabase.from(QUESTIONS_TABLE).select('id, subject_id, topic_id, level, statement, options, correct_index, explanation, sort_order').order('sort_order', { ascending: true }),
      ]);

      if (subjectsError) throw subjectsError;
      if (topicsError) throw topicsError;
      if (questionsError) throw questionsError;
      if (!questionsData?.length) return studyQuestionsSeed;

      const subjectsById = new Map((subjectsData || []).map((item) => [item.id, item.name]));
      const topicsById = new Map((topicsData || []).map((item) => [item.id, item.name]));

      return questionsData.map((row) => toQuestion(row, topicsById, subjectsById));
    } catch (error) {
      console.warn('Falha ao carregar banco de questões do Supabase, usando seed local.', error);
      return studyQuestionsSeed;
    }
  },

  async getDashboardData(questions: StudyQuestionItem[]): Promise<StudyDashboardData> {
    const local = getStoredData();

    try {
      const sessionId = getClientSessionId();
      const [{ data: attemptsData, error: attemptsError }, { data: summaryData, error: summaryError }] = await Promise.all([
        supabase.from(ATTEMPTS_TABLE).select('*').eq('session_id', sessionId).order('answered_at', { ascending: false }).limit(300),
        supabase.from(SUMMARY_TABLE).select('*').eq('session_id', sessionId).maybeSingle(),
      ]);

      if (attemptsError) throw attemptsError;
      if (summaryError) throw summaryError;

      const attempts = (attemptsData || []).map(toAttempt);
      const calculated = calculateDashboardData(attempts, questions);
      const merged = mergeSummaryData(calculated, summaryData);
      persistLocal(merged);
      return { source: 'supabase', ...merged };
    } catch (error) {
      if (isAuthSessionMissingError(error)) {
        console.info('Supabase sem sessão autenticada para leitura, mantendo fallback local público.');
      } else {
        console.warn('Supabase indisponível para estudos, usando fallback local.', error);
      }
      return { ...local, source: 'local' };
    }
  },

  async getQuestionSession(questions: StudyQuestionItem[], attempts: StudyAttempt[]): Promise<StudyQuestionSessionState> {
    const localSession = buildQuestionSessionState(
      questions,
      attempts,
      calculateReviewQueue(attempts),
      getStoredQuestionSession()
    );

    try {
      const { data, error } = await supabase
        .from(QUESTION_SESSIONS_TABLE)
        .select('*')
        .eq('session_id', getClientSessionId())
        .maybeSingle();

      if (error) throw error;

      const nextSession = toQuestionSessionState(data, questions, attempts, calculateReviewQueue(attempts));
      persistQuestionSessionLocal(nextSession);
      return nextSession;
    } catch (error) {
      console.info('Sessão de questões em fallback local.', error);
      persistQuestionSessionLocal(localSession);
      return localSession;
    }
  },

  async setCurrentQuestion(questionId: number, questions: StudyQuestionItem[], attempts: StudyAttempt[]): Promise<StudyQuestionSessionState> {
    const nextSession = buildQuestionSessionState(
      questions,
      attempts,
      calculateReviewQueue(attempts),
      getStoredQuestionSession(),
      questionId
    );

    persistQuestionSessionLocal(nextSession);

    try {
      await persistQuestionSessionRemote(nextSession);
      return nextSession;
    } catch (error) {
      console.info('Questão atual mantida localmente.', error);
      return nextSession;
    }
  },

  async recordAttempt(input: Omit<StudyAttempt, 'id' | 'attempted_at'>, questions: StudyQuestionItem[]): Promise<StudyAttemptResult> {
    const attempt: StudyAttempt = {
      ...input,
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      attempted_at: new Date().toISOString(),
    };

    const localState = getStoredData();
    const nextAttempts = [attempt, ...localState.attempts];
    const nextData = calculateDashboardData(nextAttempts, questions);
    const nextQuestionSession = buildQuestionSessionState(
      questions,
      nextAttempts,
      nextData.reviewQueue,
      {
        ...getStoredQuestionSession(),
        lastAnsweredQuestionId: attempt.question_id,
      },
      null,
      attempt.question_id
    );

    persistLocal(nextData);
    persistQuestionSessionLocal(nextQuestionSession);

    try {
      const sessionId = getClientSessionId();
      const { error } = await supabase.from(ATTEMPTS_TABLE).insert([
        {
          id: attempt.id,
          session_id: sessionId,
          question_id: attempt.question_id,
          subject: attempt.subject,
          topic: attempt.topic,
          selected_option: attempt.selected_option,
          is_correct: attempt.is_correct,
          answered_at: attempt.attempted_at,
          attempted_at: attempt.attempted_at,
        },
      ]);
      if (error) throw error;

      const { error: summaryUpsertError } = await supabase.from(SUMMARY_TABLE).upsert(
        [{
          id: sessionId,
          session_id: sessionId,
          total_attempts: nextData.summary.totalAttempts,
          total_correct: nextData.summary.totalCorrect,
          accuracy: nextData.summary.accuracy,
          pending_reviews: nextData.summary.pendingReviews,
          due_reviews: nextData.summary.dueReviews,
          questions_answered_today: nextData.summary.completedToday,
          completed_today: nextData.summary.completedToday,
          streak_days: nextData.summary.currentStreak,
          current_streak: nextData.summary.currentStreak,
          weak_subjects: nextData.summary.weakSubjects,
          last_attempt_at: nextData.summary.lastAttemptAt,
          updated_at: new Date().toISOString(),
        }],
        { onConflict: 'session_id' }
      );

      if (summaryUpsertError) throw summaryUpsertError;

      await persistQuestionSessionRemote(nextQuestionSession);

      return { dashboardData: { source: 'supabase', ...nextData }, questionSession: nextQuestionSession };
    } catch (error) {
      if (isAuthSessionMissingError(error)) {
        console.info('Supabase recusou escrita por falta de sessão auth. Verifique RLS/policies públicas no projeto.');
      } else {
        console.warn('Falha ao persistir no Supabase, mantendo progresso local.', error);
      }
      return { dashboardData: { source: 'local', ...nextData }, questionSession: nextQuestionSession };
    }
  },

  getEssayPrompts(): StudyEssayPrompt[] {
    return studyEssayPrompts;
  },

  getEssayDraft(): StudyEssayDraft | null {
    return getStoredEssayDraft();
  },

  async saveEssayDraft(promptId: string, answer: string): Promise<StudyEssayDraft | null> {
    const trimmed = answer.trim();
    if (!trimmed) {
      persistEssayDraftLocal(null);
      return null;
    }

    const draft: StudyEssayDraft = {
      promptId,
      answer,
      updatedAt: new Date().toISOString(),
      wordCount: calcWordCount(answer),
    };

    persistEssayDraftLocal(draft);

    try {
      const { error } = await supabase.from(ESSAY_DRAFTS_TABLE).upsert([
        {
          session_id: getClientSessionId(),
          prompt_id: draft.promptId,
          answer: draft.answer,
          word_count: draft.wordCount,
          updated_at: draft.updatedAt,
        },
      ], { onConflict: 'session_id' });
      if (error) throw error;
    } catch (error) {
      console.info('Rascunho de discursiva mantido localmente.', error);
    }

    return draft;
  },

  async getEssayHistory(): Promise<StudyEssayEntry[]> {
    const local = getStoredEssays();

    try {
      const { data, error } = await supabase
        .from(ESSAYS_TABLE)
        .select('*')
        .eq('session_id', getClientSessionId())
        .order('created_at', { ascending: false })
        .limit(30);

      if (error) throw error;
      const entries = (data || []).map(toEssayEntry);
      persistEssaysLocal(entries);
      return entries;
    } catch (error) {
      console.info('Histórico de discursivas em fallback local.', error);
      return local;
    }
  },

  async saveEssayEntry(input: Omit<StudyEssayEntry, 'id' | 'createdAt' | 'updatedAt' | 'wordCount' | 'feedback'>): Promise<StudyEssayEntry[]> {
    const prompt = studyEssayPrompts.find((item) => item.id === input.promptId);
    const entry: StudyEssayEntry = {
      ...input,
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: calcWordCount(input.answer),
      feedback: buildEssayFeedback(input.answer, prompt),
    };

    const localEntries = [entry, ...getStoredEssays()];
    persistEssaysLocal(localEntries);
    persistEssayDraftLocal(null);

    try {
      const { error } = await supabase.from(ESSAYS_TABLE).insert([
        {
          id: entry.id,
          session_id: getClientSessionId(),
          prompt_id: entry.promptId,
          title: entry.title,
          subject: entry.subject,
          topic: entry.topic,
          answer: entry.answer,
          word_count: entry.wordCount,
          status: entry.status,
          feedback: entry.feedback,
          didactic_response: entry.didacticResponse,
          created_at: entry.createdAt,
          updated_at: entry.updatedAt,
        },
      ]);

      if (error) throw error;
      return localEntries;
    } catch (error) {
      console.info('Supabase indisponível para discursiva, mantendo histórico local.', error);
      return localEntries;
    }
  },

  async generateDidacticEssay(promptId: string): Promise<StudyEssayDidacticResponse | null> {
    const prompt = studyEssayPrompts.find((item) => item.id === promptId);
    if (!prompt) return null;
    return studyEssayCoachService.generateDidacticResponse(prompt);
  },
};
