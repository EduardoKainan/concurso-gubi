import { supabase } from '../lib/supabase';
import { StudyAttempt, StudyDashboardData, StudyQuestionItem, StudySubjectProgress, StudySummary } from '../types';

const ATTEMPTS_TABLE = 'study_attempts';
const SUMMARY_TABLE = 'study_progress_summaries';
const STORAGE_KEY = 'adroi.study.v1';
const SUMMARY_ID = 'public-demo';

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

const seedProgress: StudySubjectProgress[] = [
  { subject: 'Direito Constitucional', progress: 76, streak: 5, accuracy: 81, pendingReviews: 12, attempts: 14 },
  { subject: 'Direito Administrativo', progress: 64, streak: 4, accuracy: 74, pendingReviews: 18, attempts: 12 },
  { subject: 'Português', progress: 88, streak: 9, accuracy: 90, pendingReviews: 6, attempts: 18 },
  { subject: 'Raciocínio Lógico', progress: 52, streak: 3, accuracy: 69, pendingReviews: 20, attempts: 10 },
];

const seedSummary: StudySummary = {
  totalAttempts: 54,
  totalCorrect: 43,
  accuracy: 80,
  currentStreak: 9,
  pendingReviews: 56,
  completedToday: 18,
  simulatedExams: 12,
  weeklyGoal: 210,
};

const getStoredData = (): StudyDashboardData => {
  if (typeof window === 'undefined') {
    return { source: 'local', attempts: [], summary: seedSummary, subjectProgress: seedProgress };
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { source: 'local', attempts: [], summary: seedSummary, subjectProgress: seedProgress };
  }

  try {
    const parsed = JSON.parse(raw) as Omit<StudyDashboardData, 'source'>;
    return {
      source: 'local',
      attempts: parsed.attempts || [],
      summary: parsed.summary || seedSummary,
      subjectProgress: parsed.subjectProgress || seedProgress,
    };
  } catch {
    return { source: 'local', attempts: [], summary: seedSummary, subjectProgress: seedProgress };
  }
};

const persistLocal = (data: Omit<StudyDashboardData, 'source'>) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

const calculateDashboardData = (attempts: StudyAttempt[], questions: StudyQuestionItem[]): Omit<StudyDashboardData, 'source'> => {
  const bySubject = new Map<string, StudyAttempt[]>();
  const questionsBySubject = new Map<string, number>();

  questions.forEach((question) => {
    questionsBySubject.set(question.subject, (questionsBySubject.get(question.subject) || 0) + 1);
  });

  attempts.forEach((attempt) => {
    const list = bySubject.get(attempt.subject) || [];
    list.push(attempt);
    bySubject.set(attempt.subject, list);
  });

  const subjectProgress = seedProgress.map((seed) => {
    const subjectAttempts = bySubject.get(seed.subject) || [];
    if (subjectAttempts.length === 0) return seed;

    const correct = subjectAttempts.filter((item) => item.is_correct).length;
    const accuracy = Math.round((correct / subjectAttempts.length) * 100);
    const uniqueQuestions = new Set(subjectAttempts.map((item) => item.question_id)).size;
    const totalQuestions = questionsBySubject.get(seed.subject) || 1;
    const progress = Math.min(100, Math.max(seed.progress, Math.round((uniqueQuestions / totalQuestions) * 100)));
    const pendingReviews = Math.max(0, seed.pendingReviews - correct);

    const uniqueDays = Array.from(new Set(subjectAttempts.map((item) => new Date(item.attempted_at).toDateString()))).length;

    return {
      ...seed,
      attempts: seed.attempts + subjectAttempts.length,
      accuracy,
      progress,
      pendingReviews,
      streak: Math.max(seed.streak, uniqueDays),
    };
  });

  const totalAttempts = seedSummary.totalAttempts + attempts.length;
  const totalCorrect = seedSummary.totalCorrect + attempts.filter((item) => item.is_correct).length;
  const accuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : seedSummary.accuracy;
  const now = new Date();
  const completedToday = attempts.filter((item) => isSameDay(new Date(item.attempted_at), now)).length;
  const pendingReviews = subjectProgress.reduce((sum, item) => sum + item.pendingReviews, 0);
  const lastAttemptAt = attempts[0]?.attempted_at;

  return {
    attempts,
    subjectProgress,
    summary: {
      ...seedSummary,
      totalAttempts,
      totalCorrect,
      accuracy,
      pendingReviews,
      completedToday: seedSummary.completedToday + completedToday,
      currentStreak: Math.max(seedSummary.currentStreak, subjectProgress.reduce((max, item) => Math.max(max, item.streak), 0)),
      lastAttemptAt,
    },
  };
};

const getAttemptedAt = (row: any): string => row.attempted_at || row.answered_at || row.created_at || new Date().toISOString();

const toAttempt = (row: any): StudyAttempt => ({
  id: String(row.id),
  question_id: Number(row.question_id),
  subject: row.subject,
  topic: row.topic,
  selected_option: Number(row.selected_option),
  is_correct: Boolean(row.is_correct),
  attempted_at: getAttemptedAt(row),
});

export const studyService = {
  async getDashboardData(questions: StudyQuestionItem[]): Promise<StudyDashboardData> {
    const local = getStoredData();

    try {
      const sessionId = getClientSessionId();
      const [{ data: attemptsData, error: attemptsError }, { data: summaryData, error: summaryError }] = await Promise.all([
        supabase.from(ATTEMPTS_TABLE).select('*').eq('session_id', sessionId).order('answered_at', { ascending: false }).limit(200),
        supabase.from(SUMMARY_TABLE).select('*').eq('session_id', sessionId).maybeSingle(),
      ]);

      if (attemptsError) throw attemptsError;
      if (summaryError) throw summaryError;

      const attempts = (attemptsData || []).map(toAttempt);
      const calculated = calculateDashboardData(attempts, questions);

      const merged = summaryData
        ? {
            ...calculated,
            summary: {
              ...calculated.summary,
              totalAttempts: summaryData.total_attempts ?? calculated.summary.totalAttempts,
              totalCorrect: summaryData.total_correct ?? calculated.summary.totalCorrect,
              accuracy: summaryData.accuracy ?? calculated.summary.accuracy,
              pendingReviews: summaryData.pending_reviews ?? calculated.summary.pendingReviews,
              completedToday: summaryData.completed_today ?? summaryData.questions_answered_today ?? calculated.summary.completedToday,
              currentStreak: summaryData.current_streak ?? summaryData.streak_days ?? calculated.summary.currentStreak,
              lastAttemptAt: summaryData.last_attempt_at ?? calculated.summary.lastAttemptAt,
            },
          }
        : calculated;

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

  async recordAttempt(input: Omit<StudyAttempt, 'id' | 'attempted_at'>, questions: StudyQuestionItem[]): Promise<StudyDashboardData> {
    const attempt: StudyAttempt = {
      ...input,
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : String(Date.now()),
      attempted_at: new Date().toISOString(),
    };

    const localState = getStoredData();
    const nextAttempts = [attempt, ...localState.attempts];
    const nextData = calculateDashboardData(nextAttempts, questions);
    persistLocal(nextData);

    try {
      const { error } = await supabase.from(ATTEMPTS_TABLE).insert([
        {
          id: attempt.id,
          session_id: getClientSessionId(),
          question_id: attempt.question_id,
          subject: attempt.subject,
          topic: attempt.topic,
          selected_option: attempt.selected_option,
          is_correct: attempt.is_correct,
          answered_at: attempt.attempted_at,
        },
      ]);
      if (error) throw error;

      const { error: summaryUpsertError } = await supabase.from(SUMMARY_TABLE).upsert(
        [
          {
            id: getClientSessionId(),
            session_id: getClientSessionId(),
            total_attempts: nextData.summary.totalAttempts,
            total_correct: nextData.summary.totalCorrect,
            accuracy: nextData.summary.accuracy,
            pending_reviews: nextData.summary.pendingReviews,
            questions_answered_today: nextData.summary.completedToday,
            streak_days: nextData.summary.currentStreak,
            last_attempt_at: nextData.summary.lastAttemptAt,
            updated_at: new Date().toISOString(),
          },
        ],
        { onConflict: 'session_id' }
      );

      if (summaryUpsertError) {
        throw summaryUpsertError;
      }

      persistLocal(nextData);
      return { source: 'supabase', ...nextData };
    } catch (error) {
      if (isAuthSessionMissingError(error)) {
        console.info('Supabase recusou escrita por falta de sessão auth. Verifique RLS/policies públicas no projeto.');
      } else {
        console.warn('Falha ao persistir no Supabase, mantendo progresso local.', error);
      }
      return { source: 'local', ...nextData };
    }
  },
};
