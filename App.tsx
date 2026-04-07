import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  FileQuestion,
  FileText,
  Filter,
  Flame,
  GraduationCap,
  Home,
  LayoutDashboard,
  Menu,
  PlayCircle,
  RefreshCcw,
  Search,
  Signal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { analystPriorityTrail, studyPlan, studyQuestions as localQuestions } from './data/studySeed';
import { studyService } from './services/studyService';
import { StudyDashboardData, StudyEssayDidacticResponse, StudyEssayDraft, StudyEssayEntry, StudyEssayPrompt, StudyQuestionItem, StudyReviewItem, StudyViewKey } from './types';

const navItems: { key: StudyViewKey; label: string; icon: React.ComponentType<any> }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'questoes', label: 'Questões', icon: FileQuestion },
  { key: 'plano', label: 'Plano de estudos', icon: BookOpen },
  { key: 'evolucao', label: 'Evolução', icon: TrendingUp },
  { key: 'discursivas', label: 'Discursivas', icon: FileText },
];

const appShell = 'min-h-screen bg-slate-950 text-slate-100';
const panel = 'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-slate-950/30';
const mobileSafePadding = 'px-4 sm:px-6 lg:px-8';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<StudyViewKey>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [questionBank, setQuestionBank] = useState<StudyQuestionItem[]>(localQuestions);
  const [selectedQuestion, setSelectedQuestion] = useState(localQuestions[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastRecordedQuestionId, setLastRecordedQuestionId] = useState<number | null>(null);
  const [dashboardData, setDashboardData] = useState<StudyDashboardData | null>(null);
  const [essayPrompts, setEssayPrompts] = useState<StudyEssayPrompt[]>([]);
  const [essayHistory, setEssayHistory] = useState<StudyEssayEntry[]>([]);
  const [selectedPromptId, setSelectedPromptId] = useState('');
  const [essayDraft, setEssayDraft] = useState('');
  const [draftMeta, setDraftMeta] = useState<StudyEssayDraft | null>(null);
  const [didacticResponse, setDidacticResponse] = useState<StudyEssayDidacticResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingEssay, setSavingEssay] = useState(false);
  const [generatingDidactic, setGeneratingDidactic] = useState(false);
  const [subjectFilter, setSubjectFilter] = useState('Todas');
  const [levelFilter, setLevelFilter] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const loadedQuestions = await studyService.getQuestionBank();
      const data = await studyService.getDashboardData(loadedQuestions);
      const prompts = studyService.getEssayPrompts();
      const history = await studyService.getEssayHistory();
      const savedDraft = studyService.getEssayDraft();

      setQuestionBank(loadedQuestions);
      setSelectedQuestion(loadedQuestions[0] || localQuestions[0]);
      setDashboardData(data);
      setEssayPrompts(prompts);
      setSelectedPromptId(savedDraft?.promptId || prompts[0]?.id || '');
      setEssayDraft(savedDraft?.answer || '');
      setDraftMeta(savedDraft);
      setEssayHistory(history);
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (!selectedPromptId) return;
    const timer = window.setTimeout(async () => {
      const nextDraft = await studyService.saveEssayDraft(selectedPromptId, essayDraft);
      setDraftMeta(nextDraft);
    }, 500);

    return () => window.clearTimeout(timer);
  }, [essayDraft, selectedPromptId]);

  const overallProgress = useMemo(() => {
    if (!dashboardData || !dashboardData.subjectProgress.length) return 0;
    return Math.round(dashboardData.subjectProgress.reduce((sum, item) => sum + item.progress, 0) / dashboardData.subjectProgress.length);
  }, [dashboardData]);

  const averageAccuracy = dashboardData?.summary.accuracy ?? 0;
  const totalReviews = dashboardData?.summary.pendingReviews ?? 0;
  const recommendation = dashboardData?.recommendation;
  const topWeakness = dashboardData?.topicPerformance?.[0];
  const reviewDueNow = dashboardData?.reviewQueue.filter((item) => item.status !== 'scheduled') || [];
  const currentViewLabel = navItems.find((item) => item.key === currentView)?.label || 'Dashboard';

  const subjectOptions = useMemo(() => ['Todas', ...Array.from(new Set(questionBank.map((item) => item.subject)))], [questionBank]);
  const levelOptions = ['Todas', 'Fácil', 'Médio', 'Difícil'];

  const filteredQuestions = useMemo(() => {
    return questionBank.filter((question) => {
      const matchesSubject = subjectFilter === 'Todas' || question.subject === subjectFilter;
      const matchesLevel = levelFilter === 'Todas' || question.level === levelFilter;
      const haystack = `${question.subject} ${question.topic} ${question.statement}`.toLowerCase();
      const matchesSearch = !searchTerm.trim() || haystack.includes(searchTerm.toLowerCase());
      return matchesSubject && matchesLevel && matchesSearch;
    });
  }, [questionBank, subjectFilter, levelFilter, searchTerm]);

  useEffect(() => {
    if (!filteredQuestions.length) return;
    const exists = filteredQuestions.some((item) => item.id === selectedQuestion?.id);
    if (!exists) {
      setSelectedQuestion(filteredQuestions[0]);
      setSelectedOption(null);
      setShowAnswer(false);
    }
  }, [filteredQuestions, selectedQuestion]);

  const selectedPrompt = useMemo(() => essayPrompts.find((item) => item.id === selectedPromptId) || essayPrompts[0], [essayPrompts, selectedPromptId]);

  useEffect(() => {
    if (!selectedPrompt && essayPrompts[0]) setSelectedPromptId(essayPrompts[0].id);
  }, [selectedPrompt, essayPrompts]);

  useEffect(() => {
    const historyMatch = essayHistory.find((item) => item.promptId === selectedPromptId && item.didacticResponse);
    setDidacticResponse(historyMatch?.didacticResponse || null);
  }, [essayHistory, selectedPromptId]);

  const goToNextQuestion = () => {
    if (!selectedQuestion || !filteredQuestions.length) return;
    const currentIndex = filteredQuestions.findIndex((item) => item.id === selectedQuestion.id);
    const nextQuestion = filteredQuestions[(currentIndex + 1) % filteredQuestions.length];
    setSelectedQuestion(nextQuestion);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const goToPreviousQuestion = () => {
    if (!selectedQuestion || !filteredQuestions.length) return;
    const currentIndex = filteredQuestions.findIndex((item) => item.id === selectedQuestion.id);
    const previousQuestion = filteredQuestions[(currentIndex - 1 + filteredQuestions.length) % filteredQuestions.length];
    setSelectedQuestion(previousQuestion);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const saveAttempt = async () => {
    if (selectedOption === null || showAnswer || saving) return;

    setSaving(true);
    const nextData = await studyService.recordAttempt(
      {
        question_id: selectedQuestion.id,
        subject: selectedQuestion.subject,
        topic: selectedQuestion.topic,
        selected_option: selectedOption,
        is_correct: selectedQuestion.correctIndex === selectedOption,
      },
      questionBank
    );

    setDashboardData(nextData);
    setLastRecordedQuestionId(selectedQuestion.id);
    setShowAnswer(true);
    setSaving(false);
  };

  const saveEssay = async () => {
    if (!selectedPrompt || !essayDraft.trim() || savingEssay) return;
    setSavingEssay(true);
    const history = await studyService.saveEssayEntry({
      promptId: selectedPrompt.id,
      title: selectedPrompt.title,
      subject: selectedPrompt.subject,
      topic: selectedPrompt.topic,
      answer: essayDraft.trim(),
      status: 'finished',
      didacticResponse: didacticResponse || undefined,
    });
    setEssayHistory(history);
    setEssayDraft('');
    setDraftMeta(null);
    setSavingEssay(false);
  };

  const generateDidacticEssay = async () => {
    if (!selectedPrompt || generatingDidactic) return;
    setGeneratingDidactic(true);
    const generated = await studyService.generateDidacticEssay(selectedPrompt.id);
    setDidacticResponse(generated);
    setGeneratingDidactic(false);
  };

  const renderDidacticResponse = (response: StudyEssayDidacticResponse) => (
    <div className="mt-5 space-y-4 rounded-3xl border border-cyan-400/20 bg-cyan-500/5 p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-cyan-200">Resposta-modelo explicada</p>
          <p className="text-xs text-slate-400">Didática passo a passo para estudar, não para copiar. Fonte: {response.provider === 'gemini' ? 'IA' : 'fallback local'}.</p>
        </div>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100">{new Date(response.generatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {response.steps.map((step) => (
          <div key={step.title} className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
            <h3 className="font-medium text-white">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-300">{step.explanation}</p>
            <ul className="mt-3 space-y-2 text-sm text-cyan-100">
              {step.bullets.map((bullet) => <li key={bullet}>• {bullet}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <h3 className="font-medium text-white">Resposta-modelo</h3>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-200">{response.modelAnswer}</p>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <MiniStat label="Tese" value="definida" />
        <MiniStat label="Argumentos" value={`${response.arguments.length}`} />
        <MiniStat label="Passos" value={`${response.steps.length}`} />
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <section className={`${panel} p-6 lg:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              <Flame size={16} /> Sequência de {dashboardData?.summary.currentStreak ?? 0} dias
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Treinador adaptativo</p>
              <h1 className="mt-2 text-3xl font-semibold text-white lg:text-5xl">Seu cockpit agora recomenda a próxima sessão sozinho.</h1>
            </div>
            <p className="text-slate-300">O motor cruza erros, revisões 24h/7d/14d, desempenho por tópico e histórico recente para priorizar o próximo passo.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setCurrentView('questoes')} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400">
                <PlayCircle size={18} /> Resolver bloco sugerido
              </button>
              <button onClick={() => setCurrentView('discursivas')} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                <FileText size={18} /> Treinar discursiva
              </button>
            </div>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-[430px]">
            <MetricCard icon={Target} label="Progresso total" value={`${overallProgress}%`} detail="Cobertura real do banco por disciplina" accent="from-indigo-500 to-cyan-400" />
            <MetricCard icon={Brain} label="Precisão média" value={`${averageAccuracy}%`} detail={`${dashboardData?.summary.totalCorrect ?? 0} acertos acumulados`} accent="from-fuchsia-500 to-pink-400" />
            <MetricCard icon={Clock3} label="Fila de revisão" value={`${totalReviews}`} detail={`${dashboardData?.summary.dueReviews ?? 0} vencendo agora`} accent="from-amber-500 to-orange-400" />
            <MetricCard icon={Trophy} label="Discursivas" value={`${essayHistory.length}`} detail="Com autosave e feedback rápido" accent="from-emerald-500 to-lime-400" />
          </div>
        </div>
      </section>

      {recommendation && (
        <section className={`${panel} overflow-hidden`}>
          <div className="grid gap-0 xl:grid-cols-[1.15fr,0.85fr]">
            <div className="border-b border-white/10 p-6 xl:border-b-0 xl:border-r xl:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Próxima sessão recomendada</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">{recommendation.title}</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm ${recommendation.priority === 'alta' ? 'bg-rose-500/10 text-rose-200' : recommendation.priority === 'media' ? 'bg-amber-500/10 text-amber-200' : 'bg-emerald-500/10 text-emerald-200'}`}>
                  Prioridade {recommendation.priority}
                </span>
              </div>
              <p className="mt-4 text-slate-300">{recommendation.reason}</p>
              <div className="mt-5 flex flex-wrap gap-2 text-sm text-slate-300">
                <Tag>{recommendation.subject}</Tag>
                <Tag>{recommendation.topic}</Tag>
                <Tag>{recommendation.targetQuestions} questões</Tag>
                <Tag>{recommendation.estimatedMinutes} min</Tag>
                <Tag>Modo {recommendation.focusMode}</Tag>
              </div>
            </div>
            <div className="p-6 xl:p-8">
              <h3 className="font-semibold text-white">Execução sugerida</h3>
              <div className="mt-4 space-y-3 text-sm text-slate-300">
                <ActionItem done={recommendation.reviewCount > 0} label={`Começar com ${recommendation.reviewCount} revisão(ões) pendentes`} />
                <ActionItem done={false} label={`Atacar ${recommendation.targetQuestions} questões de ${recommendation.subject}`} />
                <ActionItem done={false} label={`Fechar com leitura de justificativas em ${recommendation.topic}`} />
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
        <div className={`${panel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Disciplinas com momentum real</h2>
              <p className="text-sm text-slate-400">Precisão, carga de erro e cobertura do banco</p>
            </div>
            <button onClick={() => setCurrentView('evolucao')} className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">
              Ver análise profunda <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData?.subjectProgress.map((item) => (
              <div key={item.subject} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium text-white">{item.subject}</h3>
                    <p className="text-sm text-slate-400">{item.correct} acertos • {item.wrong} erros • {item.pendingReviews} revisões • momentum {item.studyMomentum}</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="rounded-full bg-white/5 px-3 py-1">🔥 {item.streak} dias</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{item.accuracy}%</span>
                  </div>
                </div>
                <div className="mt-4 h-3 rounded-full bg-white/5">
                  <div className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${panel} p-6`}>
            <div className="mb-4 flex items-center gap-3">
              <CalendarDays className="text-amber-300" />
              <div>
                <h2 className="font-semibold text-white">Fila temporal de revisão</h2>
                <p className="text-sm text-slate-400">24h, 7d e 14d baseados em erro</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {(dashboardData?.reviewQueue || []).slice(0, 4).map((item) => (
                <ReviewQueueCard key={item.id} item={item} />
              ))}
              {!(dashboardData?.reviewQueue || []).length && (
                <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                  Nenhuma revisão criada ainda. Os erros alimentam a fila automaticamente.
                </div>
              )}
            </div>
          </div>

          <div className={`${panel} p-6`}>
            <h2 className="font-semibold text-white">Radar do mentor</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <InsightCard title="Persistência ativa" description={dashboardData?.source === 'supabase' ? 'Tentativas e discursivas sincronizadas no Supabase quando as tabelas existem.' : 'Fallback local ativo para não travar o estudo.'} />
              <InsightCard title="Maior fragilidade" description={topWeakness ? `${topWeakness.subject} • ${topWeakness.topic} (${topWeakness.accuracy}% de precisão)` : 'Ainda sem massa crítica. Resolva mais questões para calibrar o motor.'} />
              <InsightCard title="Última atividade" description={dashboardData?.summary.lastAttemptAt ? new Date(dashboardData.summary.lastAttemptAt).toLocaleString('pt-BR') : 'Nenhuma tentativa salva nesta sessão ainda.'} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderQuestions = () => (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <div className={`${panel} p-4 sm:p-5`}>
        <div className="mb-4 flex items-center gap-2 text-white">
          <Filter size={18} />
          <h2 className="text-lg font-semibold">Resolver questões</h2>
        </div>
        <div className="grid gap-3 lg:grid-cols-[1.1fr,0.8fr,1.2fr]">
          <div>
            <label className="mb-2 block text-sm text-slate-400">Disciplina</label>
            <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="min-h-[48px] w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none">
              {subjectOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Dificuldade</label>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="min-h-[48px] w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none">
              {levelOptions.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Buscar</label>
            <div className="flex min-h-[48px] items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
              <Search size={16} className="text-slate-400" />
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tema, palavra-chave ou banca mental" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr,220px]">
          <div className="rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-100">
            {filteredQuestions.length} questões no recorte atual.
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Questão atual</label>
            <select
              value={selectedQuestion?.id ?? ''}
              onChange={(e) => {
                const nextQuestion = filteredQuestions.find((item) => item.id === Number(e.target.value));
                if (!nextQuestion) return;
                setSelectedQuestion(nextQuestion);
                setSelectedOption(null);
                setShowAnswer(false);
              }}
              className="min-h-[48px] w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
            >
              {filteredQuestions.map((question, index) => (
                <option key={question.id} value={question.id}>
                  {`#${index + 1} • ${question.subject}`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className={`${panel} overflow-hidden p-4 sm:p-6 lg:p-8`}>
        {selectedQuestion ? (
          <>
            <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Modo foco</p>
                <h1 className="mt-2 text-2xl font-semibold text-white">{selectedQuestion.subject}</h1>
                <p className="mt-2 text-slate-400">{selectedQuestion.topic}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm">
                <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-slate-300">
                  Questão {Math.max(filteredQuestions.findIndex((item) => item.id === selectedQuestion.id) + 1, 1)} de {filteredQuestions.length}
                </span>
                <span className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-slate-300">
                  Dificuldade: <span className="font-medium text-white">{selectedQuestion.level}</span>
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-slate-100 sm:p-6">
              <p className="text-base leading-8 sm:text-lg">{selectedQuestion.statement}</p>
            </div>

            <div className="mt-8 space-y-3">
              {selectedQuestion.options.map((option, index) => {
                const chosen = selectedOption === index;
                const correct = selectedQuestion.correctIndex === index;
                const revealedClass = showAnswer
                  ? correct
                    ? 'border-emerald-400 bg-emerald-500/10'
                    : chosen
                    ? 'border-rose-400 bg-rose-500/10'
                    : 'border-white/10 bg-white/5'
                  : chosen
                  ? 'border-indigo-400 bg-indigo-500/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10';

                return (
                  <button key={index} onClick={() => !showAnswer && setSelectedOption(index)} className={`w-full rounded-2xl border p-4 text-left transition active:scale-[0.99] sm:p-5 ${revealedClass}`}>
                    <div className="flex items-start gap-4 text-sm text-slate-200 sm:text-base">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={saveAttempt} disabled={selectedOption === null || saving} className="rounded-2xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? 'Salvando...' : 'Corrigir e salvar tentativa'}
              </button>
              <button onClick={() => { setSelectedOption(null); setShowAnswer(false); }} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                Limpar resposta
              </button>
              <button onClick={goToPreviousQuestion} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                Questão anterior
              </button>
              <button onClick={goToNextQuestion} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                Pular para próxima
              </button>
            </div>

            {showAnswer && (
              <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 sm:p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Feedback</p>
                  <p className="mt-3 text-slate-100">{selectedQuestion.explanation}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 sm:p-5">
                  {lastRecordedQuestionId === selectedQuestion.id ? 'Tentativa registrada com sucesso. Se errou, a revisão entra sozinha na fila temporal.' : 'Selecione uma alternativa para salvar o resultado.'}
                </div>
                <div className="flex flex-wrap gap-3">
                  <button onClick={goToNextQuestion} className="rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-white transition hover:bg-emerald-400">
                    Próxima questão
                  </button>
                  <button onClick={() => { setSelectedOption(null); setShowAnswer(false); }} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                    Refazer esta questão
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-white/10 p-6 text-slate-400">Ajuste os filtros para carregar um bloco.</div>
        )}
      </div>
    </div>
  );

  const renderPlan = () => (
    <div className="space-y-6">
      <section className={`${panel} p-6 lg:p-8`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Plano de estudos</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Trilha semanal com camada adaptativa em cima.</h1>
            <p className="mt-2 text-slate-400">O plano-base segue fixo, mas a recomendação diária muda conforme erros, revisões vencidas e matérias fracas.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniStat label="Horas previstas" value="11h" />
            <MiniStat label="Questões-meta" value={`${dashboardData?.summary.weeklyGoal ?? 0}`} />
            <MiniStat label="Feitas hoje" value={`${dashboardData?.summary.completedToday ?? 0}`} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <div className={`${panel} p-6`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Semana atual</h2>
          <div className="space-y-4">
            {studyPlan.map((item) => (
              <div key={item.day} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 h-3 w-3 rounded-full ${item.status === 'done' ? 'bg-emerald-400' : item.status === 'today' ? 'bg-indigo-400' : 'bg-slate-600'}`} />
                  <div>
                    <p className="text-sm text-slate-400">{item.day}</p>
                    <h3 className="font-medium text-white">{item.focus}</h3>
                    <p className="text-sm text-slate-400">{item.goal}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{item.duration}</span>
                  <span className={`rounded-full px-3 py-1 ${item.status === 'done' ? 'bg-emerald-500/10 text-emerald-300' : item.status === 'today' ? 'bg-indigo-500/10 text-indigo-300' : 'bg-white/5 text-slate-300'}`}>
                    {item.status === 'done' ? 'Concluído' : item.status === 'today' ? 'Hoje' : 'Próximo'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className={`${panel} p-6`}>
            <h2 className="mb-5 text-xl font-semibold text-white">Trilha prioritária, Analista Administrativo</h2>
            <div className="space-y-4">
              {analystPriorityTrail.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-indigo-300">{item.subject}</p>
                      <h3 className="font-medium text-white">{item.topic}</h3>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs ${item.priority === 'alta' ? 'bg-rose-500/10 text-rose-200' : 'bg-white/5 text-slate-300'}`}>{item.priority === 'alta' ? 'Alta prioridade' : 'Base de manutenção'}</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-400">{item.reason}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                    <span className="rounded-full bg-white/5 px-3 py-1">Meta: {item.targetQuestions} questões</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">Foco: {item.difficultyFocus}</span>
                  </div>
                  <div className="mt-4 rounded-2xl bg-indigo-500/10 p-3 text-sm text-indigo-100">{item.action}</div>
                </div>
              ))}
            </div>
          </div>
          <div className={`${panel} p-6`}>
            <h2 className="font-semibold text-white">Checklist do ciclo</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <ChecklistItem done label="Definir edital e peso por disciplina" />
              <ChecklistItem done label="Separar caderno de erros" />
              <ChecklistItem done={Boolean(dashboardData?.summary.lastAttemptAt)} label="Calibrar recomendação com tentativas reais" />
              <ChecklistItem done={essayHistory.length > 0} label="Registrar primeira discursiva" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      <section className={`${panel} p-6 lg:p-8`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Evolução</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Painel profundo por disciplina, tópico e revisão.</h1>
          </div>
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="rounded-full bg-white/5 px-4 py-2">Janela: acumulado local + Supabase</span>
            <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-300">Fonte: {dashboardData?.source === 'supabase' ? 'Supabase' : 'Fallback local'}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${panel} p-6 lg:col-span-2`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Precisão e cobertura por disciplina</h2>
          <div className="space-y-4">
            {(dashboardData?.subjectProgress || []).map((point) => (
              <div key={point.subject} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300">
                  <span>{point.subject}</span>
                  <span>{point.accuracy}% precisão • {point.progress}% cobertura</span>
                </div>
                <div className="h-3 rounded-full bg-white/5">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" style={{ width: `${point.accuracy}%` }} />
                </div>
                <div className="mt-3 grid gap-2 md:grid-cols-4">
                  <MiniPill label="Acertos" value={`${point.correct}`} />
                  <MiniPill label="Erros" value={`${point.wrong}`} />
                  <MiniPill label="Revisões" value={`${point.pendingReviews}`} />
                  <MiniPill label="Momentum" value={`${point.studyMomentum}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${panel} p-6`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Ranking por disciplina</h2>
          <div className="space-y-4">
            {[...(dashboardData?.subjectProgress || [])].sort((a, b) => b.accuracy - a.accuracy).map((item, index) => (
              <div key={item.subject} className="flex items-center justify-between rounded-2xl bg-white/5 p-4">
                <div>
                  <p className="text-sm text-slate-400">#{index + 1}</p>
                  <h3 className="font-medium text-white">{item.subject}</h3>
                </div>
                <span className="text-lg font-semibold text-white">{item.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
        <div className={`${panel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Fila de revisão inteligente</h2>
              <p className="text-sm text-slate-400">Baseada em erros com janelas 24h, 7d e 14d</p>
            </div>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-200">{reviewDueNow.length} urgentes</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {(dashboardData?.reviewQueue || []).map((item) => <ReviewQueueCard key={item.id} item={item} />)}
            {!(dashboardData?.reviewQueue || []).length && (
              <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">Nenhuma revisão montada ainda.</div>
            )}
          </div>
        </div>

        <div className={`${panel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Desempenho por tópico</h2>
              <p className="text-sm text-slate-400">Leitura granular para atacar assunto fraco</p>
            </div>
            <span className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-200">Top {dashboardData?.topicPerformance.length || 0}</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {(dashboardData?.topicPerformance || []).slice(0, 12).map((item) => (
              <div key={`${item.subject}-${item.topic}`} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-indigo-300">{item.subject}</p>
                    <h3 className="font-medium text-white">{item.topic}</h3>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs ${item.averageResponseLabel === 'crítico' ? 'bg-rose-500/10 text-rose-200' : item.averageResponseLabel === 'atenção' ? 'bg-amber-500/10 text-amber-200' : 'bg-emerald-500/10 text-emerald-200'}`}>
                    {item.averageResponseLabel}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm">
                  <MiniPill label="Tent." value={`${item.attempts}`} />
                  <MiniPill label="Acertos" value={`${item.correct}`} />
                  <MiniPill label="Erros" value={`${item.errors}`} />
                  <MiniPill label="Precisão" value={`${item.accuracy}%`} />
                </div>
                <p className="mt-3 text-xs text-slate-500">Última ocorrência: {item.lastAttemptAt ? new Date(item.lastAttemptAt).toLocaleString('pt-BR') : 'sem registro'}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const renderEssays = () => (
    <div className="grid gap-6 xl:grid-cols-[1fr,0.95fr]">
      <div className="space-y-6">
        <div className={`${panel} p-6`}>
          <div className="mb-4 flex items-center gap-3">
            <FileText className="text-cyan-300" />
            <div>
              <h1 className="text-2xl font-semibold text-white">Discursiva com autosave</h1>
              <p className="text-sm text-slate-400">Prompt guiado, rascunho persistido e resposta-modelo explicada para aprender a estrutura.</p>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Escolha um tema</label>
            <select value={selectedPromptId} onChange={(e) => setSelectedPromptId(e.target.value)} className="min-h-[48px] w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none">
              {essayPrompts.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}
            </select>
          </div>

          {selectedPrompt && (
            <>
              <div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/60 p-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="rounded-full bg-white/5 px-3 py-1">{selectedPrompt.subject}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1">{selectedPrompt.topic}</span>
                </div>
                <p className="mt-4 leading-7 text-slate-200">{selectedPrompt.prompt}</p>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-medium text-white">Estrutura sugerida</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {selectedPrompt.structure.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <h3 className="font-medium text-white">Critérios de avaliação</h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {selectedPrompt.evaluationCriteria.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <MiniStat label="Palavras" value={`${essayDraft.trim() ? essayDraft.trim().split(/\s+/).filter(Boolean).length : 0}`} />
                <MiniStat label="Status" value={draftMeta ? 'rascunho' : 'vazio'} />
                <MiniStat label="Últ. save" value={draftMeta?.updatedAt ? new Date(draftMeta.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'} />
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-sm text-slate-400">Seu rascunho</label>
                <textarea value={essayDraft} onChange={(e) => setEssayDraft(e.target.value)} rows={12} placeholder="Escreva aqui sua introdução, desenvolvimento e conclusão..." className="min-h-[320px] w-full rounded-3xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 sm:min-h-[360px]" />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={saveEssay} disabled={!essayDraft.trim() || savingEssay} className="rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
                  {savingEssay ? 'Salvando...' : 'Finalizar discursiva'}
                </button>
                <button onClick={generateDidacticEssay} disabled={generatingDidactic} className="inline-flex rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-100 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60">
                  <Sparkles size={18} className="mr-2" />
                  {generatingDidactic ? 'Gerando explicação...' : 'Gerar resposta didática com IA'}
                </button>
                <button onClick={() => { setEssayDraft(''); setDraftMeta(null); studyService.saveEssayDraft(selectedPromptId, ''); }} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                  Limpar rascunho
                </button>
              </div>

              {didacticResponse ? renderDidacticResponse(didacticResponse) : (
                <div className="mt-5 rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-500/5 p-5 text-sm text-slate-300">
                  Clique em <span className="font-medium text-cyan-200">Gerar resposta didática com IA</span> para ver interpretação do tema, tese, argumentos, estrutura sugerida e uma resposta-modelo explicada.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className={`${panel} p-6`}>
        <h2 className="text-xl font-semibold text-white">Histórico e feedback</h2>
        <p className="mt-1 text-sm text-slate-400">Fallback local ativo e sync com Supabase quando as tabelas existem.</p>
        <div className="mt-5 space-y-4">
          {essayHistory.map((item) => (
            <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.subject} • {item.topic}</p>
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
                <Tag>{item.wordCount} palavras</Tag>
                <Tag>{item.status}</Tag>
              </div>
              {item.feedback?.length ? (
                <ul className="mt-3 space-y-2 text-sm text-cyan-100">
                  {item.feedback.map((feedback) => <li key={feedback}>• {feedback}</li>)}
                </ul>
              ) : null}
              {item.didacticResponse ? (
                <div className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-4">
                  <p className="text-sm font-medium text-cyan-100">Resposta-modelo explicada salva</p>
                  <ul className="mt-2 space-y-1 text-sm text-slate-300">
                    <li>• Tese: {item.didacticResponse.thesis}</li>
                    <li>• Argumentos: {item.didacticResponse.arguments.join(' | ')}</li>
                  </ul>
                </div>
              ) : null}
              <p className="mt-3 whitespace-pre-wrap text-sm text-slate-300 line-clamp-5">{item.answer}</p>
            </div>
          ))}
          {!essayHistory.length && (
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">Nenhuma discursiva salva ainda. O rascunho já fica salvo automaticamente enquanto você escreve.</div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={appShell}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-slate-950/80 p-6 lg:flex lg:flex-col">
          <SidebarContent currentView={currentView} onChangeView={setCurrentView} source={dashboardData?.source ?? 'local'} recommendation={recommendation?.subject || 'Aguardando histórico'} />
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className={`flex items-start justify-between gap-4 py-4 ${mobileSafePadding}`}>
              <div className="flex items-start gap-3">
                <button onClick={() => setMenuOpen(true)} className="rounded-2xl border border-white/10 p-2 text-slate-200 lg:hidden">
                  <Menu size={20} />
                </button>
                <div>
                  <p className="text-xs text-slate-400 sm:text-sm">Agente mentor de concurso</p>
                  <h1 className="text-base font-semibold text-white sm:text-lg">MVP navegável do aluno Eduardo</h1>
                  <p className="mt-1 text-xs text-slate-500 lg:hidden">{currentViewLabel}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className={`hidden items-center gap-2 rounded-2xl border px-3 py-2 text-sm md:flex ${dashboardData?.source === 'supabase' ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' : 'border-amber-400/20 bg-amber-500/10 text-amber-200'}`}>
                  <Signal size={16} /> {dashboardData?.source === 'supabase' ? 'Supabase online' : 'Fallback local'}
                </div>
                <button className="rounded-2xl border border-white/10 p-3 text-slate-300"><Bell size={18} /></button>
                <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200"><User size={18} /></div>
                  <div>
                    <p className="text-sm font-medium text-white">Eduardo K.</p>
                    <p className="text-xs text-slate-400">Edital PM • 127 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className={`flex-1 py-6 pb-28 lg:pb-6 ${mobileSafePadding}`}>
            {loading || !dashboardData ? (
              <div className={`${panel} flex items-center gap-3 p-6 text-slate-300`}>
                <RefreshCcw size={18} className="animate-spin" /> Carregando progresso...
              </div>
            ) : (
              <>
                {currentView === 'dashboard' && renderDashboard()}
                {currentView === 'questoes' && renderQuestions()}
                {currentView === 'plano' && renderPlan()}
                {currentView === 'evolucao' && renderProgress()}
                {currentView === 'discursivas' && renderEssays()}
              </>
            )}
          </main>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-slate-950/70" onClick={() => setMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[88vw] max-w-80 border-r border-white/10 bg-slate-950 p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Mentor</p>
                <h2 className="text-xl font-semibold text-white">Concurso App</h2>
              </div>
              <button onClick={() => setMenuOpen(false)} className="rounded-2xl border border-white/10 p-2 text-slate-200">
                <X size={18} />
              </button>
            </div>
            <SidebarContent currentView={currentView} onChangeView={(view) => { setCurrentView(view); setMenuOpen(false); }} source={dashboardData?.source ?? 'local'} recommendation={recommendation?.subject || 'Aguardando histórico'} />
          </div>
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-2 py-2 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-5 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentView === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setCurrentView(item.key)}
                className={`flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition ${active ? 'bg-indigo-500 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}
              >
                <Icon size={18} />
                <span className="truncate">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {currentView === 'questoes' && selectedQuestion && (
        <div className="fixed inset-x-0 bottom-[84px] z-30 px-4 sm:hidden">
          <div className="rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <button onClick={saveAttempt} disabled={selectedOption === null || saving} className="flex-1 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? 'Salvando...' : 'Corrigir'}
              </button>
              <button onClick={() => { setSelectedOption(null); setShowAnswer(false); }} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-200">
                Limpar
              </button>
              {showAnswer && (
                <button onClick={goToNextQuestion} className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-medium text-white">
                  Próxima
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarContent = ({ currentView, onChangeView, source, recommendation }: { currentView: StudyViewKey; onChangeView: (view: StudyViewKey) => void; source: 'supabase' | 'local'; recommendation: string }) => (
  <>
    <div className="mb-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-900/30">
        <GraduationCap size={28} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white">Concurso Mentor</h2>
      <p className="mt-2 text-sm text-slate-400">Questões, revisão temporal, analytics por tópico e discursiva em um fluxo só.</p>
    </div>

    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentView === item.key;
        return (
          <button key={item.key} onClick={() => onChangeView(item.key)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/30' : 'text-slate-300 hover:bg-white/5'}`}>
            <Icon size={18} />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>

    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center gap-3">
        <Home className="text-emerald-300" size={18} />
        <p className="font-medium text-white">Alvo atual</p>
      </div>
      <p className="mt-3 text-sm text-slate-300">• Próxima disciplina: {recommendation}
        <br />• Revisão temporal automática
        <br />• Discursiva com autosave
      </p>
    </div>

    <div className="mt-auto rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
      <div className="flex items-center gap-3">
        <Star className="text-amber-300" size={18} />
        <p className="font-medium text-white">Status do MVP</p>
      </div>
      <p className="mt-3 text-sm text-slate-300">Persistência: {source === 'supabase' ? 'Supabase ativo' : 'Local fallback ativo'}.</p>
    </div>
  </>
);

const MetricCard = ({ icon: Icon, label, value, detail, accent }: { icon: React.ComponentType<any>; label: string; value: string; detail: string; accent: string }) => (
  <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
    <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${accent} p-3 text-white`}>
      <Icon size={18} />
    </div>
    <p className="text-sm text-slate-400">{label}</p>
    <h3 className="mt-2 text-3xl font-semibold text-white">{value}</h3>
    <p className="mt-2 text-sm text-slate-400">{detail}</p>
  </div>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center">
    <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
  </div>
);

const MiniPill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-white/5 px-2 py-3">
    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</p>
    <p className="mt-1 font-semibold text-white">{value}</p>
  </div>
);

const InsightCard = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <p className="font-medium text-white">{title}</p>
    <p className="mt-2 text-slate-400">{description}</p>
  </div>
);

const ChecklistItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
    {done ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} className="text-slate-500" />}
    <span className={done ? 'text-white' : 'text-slate-300'}>{label}</span>
  </div>
);

const ActionItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
    {done ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Circle size={16} className="text-slate-500" />}
    <span>{label}</span>
  </div>
);

const ReviewQueueCard = ({ item }: { item: StudyReviewItem }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-slate-400">{item.subject}</p>
        <h3 className="font-medium text-white">{item.topic}</h3>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs ${item.status === 'overdue' ? 'bg-rose-500/10 text-rose-200' : item.status === 'due_soon' ? 'bg-amber-500/10 text-amber-200' : 'bg-white/10 text-slate-300'}`}>
        {item.stage} • {item.status === 'overdue' ? 'atrasada' : item.status === 'due_soon' ? 'vence já' : 'agendada'}
      </span>
    </div>
    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300">
      <Tag>{item.errorCount} erro(s)</Tag>
      <Tag>Questão #{item.questionId}</Tag>
    </div>
    <p className="mt-3 text-xs text-slate-500">Revisar em {new Date(item.dueAt).toLocaleString('pt-BR')}</p>
  </div>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-white/5 px-3 py-1 text-sm text-slate-300">{children}</span>
);

export default App;
