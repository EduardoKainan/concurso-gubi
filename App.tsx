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
  Medal,
  Menu,
  PlayCircle,
  RefreshCcw,
  Search,
  Signal,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  X,
} from 'lucide-react';
import { analystPriorityTrail, studyPlan, studyQuestions as localQuestions } from './data/studySeed';
import { studyService } from './services/studyService';
import { StudyDashboardData, StudyEssayEntry, StudyEssayPrompt, StudyQuestionItem, StudyViewKey } from './types';

const navItems: { key: StudyViewKey; label: string; icon: React.ComponentType<any> }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'questoes', label: 'Questões', icon: FileQuestion },
  { key: 'plano', label: 'Plano de estudos', icon: BookOpen },
  { key: 'evolucao', label: 'Evolução', icon: TrendingUp },
  { key: 'discursivas', label: 'Discursivas', icon: FileText },
];

const appShell = 'min-h-screen bg-slate-950 text-slate-100';
const panel = 'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-slate-950/30';

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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingEssay, setSavingEssay] = useState(false);
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

      setQuestionBank(loadedQuestions);
      setSelectedQuestion(loadedQuestions[0] || localQuestions[0]);
      setDashboardData(data);
      setEssayPrompts(prompts);
      setSelectedPromptId(prompts[0]?.id || '');
      setEssayHistory(history);
      setLoading(false);
    };

    load();
  }, []);

  const overallProgress = useMemo(() => {
    if (!dashboardData) return 0;
    return Math.round(dashboardData.subjectProgress.reduce((sum, item) => sum + item.progress, 0) / dashboardData.subjectProgress.length);
  }, [dashboardData]);

  const averageAccuracy = dashboardData?.summary.accuracy ?? 0;
  const totalReviews = dashboardData?.summary.pendingReviews ?? 0;

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
    if (!selectedPrompt && essayPrompts[0]) {
      setSelectedPromptId(essayPrompts[0].id);
    }
  }, [selectedPrompt, essayPrompts]);

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
    });
    setEssayHistory(history);
    setEssayDraft('');
    setSavingEssay(false);
  };

  const topWeakness = dashboardData?.errorInsights?.[0];

  const renderDashboard = () => (
    <div className="space-y-6">
      <section className={`${panel} p-6 lg:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              <Flame size={16} /> Sequência de {dashboardData?.summary.currentStreak ?? 0} dias
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Mentor de Concurso</p>
              <h1 className="mt-2 text-3xl font-semibold text-white lg:text-5xl">Seu cockpit de aprovação ficou mais estratégico.</h1>
            </div>
            <p className="text-slate-300">Agora o app combina filtros de questões, leitura dos erros por assunto, trilha prioritária do Analista Administrativo e módulo inicial de discursiva.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setCurrentView('questoes')} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400">
                <PlayCircle size={18} /> Resolver bloco focado
              </button>
              <button onClick={() => setCurrentView('discursivas')} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                <FileText size={18} /> Treinar discursiva
              </button>
            </div>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-[420px]">
            <MetricCard icon={Target} label="Progresso total" value={`${overallProgress}%`} detail="Com base nas tentativas salvas" accent="from-indigo-500 to-cyan-400" />
            <MetricCard icon={Brain} label="Precisão média" value={`${averageAccuracy}%`} detail={`${dashboardData?.summary.totalCorrect ?? 0} acertos acumulados`} accent="from-fuchsia-500 to-pink-400" />
            <MetricCard icon={Clock3} label="Revisões pendentes" value={`${totalReviews}`} detail="Prioridade nas próximas 48h" accent="from-amber-500 to-orange-400" />
            <MetricCard icon={Trophy} label="Discursivas" value={`${essayHistory.length}`} detail="Rascunhos e respostas salvas" accent="from-emerald-500 to-lime-400" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr,0.95fr]">
        <div className={`${panel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Disciplinas prioritárias</h2>
              <p className="text-sm text-slate-400">Seed + desempenho salvo</p>
            </div>
            <button onClick={() => setCurrentView('evolucao')} className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">
              Ver evolução <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {dashboardData?.subjectProgress.map((item) => (
              <div key={item.subject} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium text-white">{item.subject}</h3>
                    <p className="text-sm text-slate-400">Precisão {item.accuracy}% • {item.pendingReviews} revisões pendentes • {item.attempts} tentativas</p>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="rounded-full bg-white/5 px-3 py-1">🔥 {item.streak} dias</span>
                    <span className="rounded-full bg-white/5 px-3 py-1">{item.progress}% concluído</span>
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
              <Medal className="text-amber-300" />
              <div>
                <h2 className="font-semibold text-white">Missão de hoje</h2>
                <p className="text-sm text-slate-400">Bloco pensado para 2h líquidas</p>
              </div>
            </div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"><CheckCircle2 size={16} className="text-emerald-400" /> Revisar {topWeakness?.topic || 'Português'} por 20 min</li>
              <li className="flex items-center gap-3 rounded-2xl bg-indigo-500/10 p-3"><Circle size={16} className="text-indigo-300" /> Resolver 15 questões da trilha prioritária</li>
              <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"><Circle size={16} className="text-slate-500" /> Escrever 1 discursiva curta</li>
            </ul>
          </div>
          <div className={`${panel} p-6`}>
            <h2 className="font-semibold text-white">Radar do mentor</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <InsightCard title="Persistência ativa" description={dashboardData?.source === 'supabase' ? 'Tentativas sincronizadas no Supabase.' : 'Fallback local ativo para não travar o estudo.'} />
              <InsightCard title="Principal gargalo" description={topWeakness ? `${topWeakness.subject} • ${topWeakness.topic} (${topWeakness.totalErrors} erros)` : 'Ainda sem massa crítica de erros. Resolva mais questões para montar o painel.'} />
              <InsightCard title="Última atividade" description={dashboardData?.summary.lastAttemptAt ? new Date(dashboardData.summary.lastAttemptAt).toLocaleString('pt-BR') : 'Nenhuma tentativa salva nesta sessão ainda.'} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderQuestions = () => (
    <div className="grid gap-6 xl:grid-cols-[340px,1fr]">
      <div className="space-y-6">
        <div className={`${panel} p-4`}>
          <div className="mb-4 flex items-center gap-2 text-white">
            <Filter size={18} />
            <h2 className="text-lg font-semibold">Filtros inteligentes</h2>
          </div>
          <div className="space-y-3">
            <div>
              <label className="mb-2 block text-sm text-slate-400">Disciplina</label>
              <select value={subjectFilter} onChange={(e) => setSubjectFilter(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none">
                {subjectOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Dificuldade</label>
              <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none">
                {levelOptions.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-400">Buscar no enunciado/tópico</label>
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3">
                <Search size={16} className="text-slate-400" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Ex.: licitações, Excel, crase" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500" />
              </div>
            </div>
          </div>
          <div className="mt-4 rounded-2xl bg-indigo-500/10 p-4 text-sm text-indigo-100">
            {filteredQuestions.length} questões no bloco atual.
          </div>
        </div>

        <div className={`${panel} p-4`}>
          <h2 className="mb-4 text-lg font-semibold text-white">Fila de questões</h2>
          <div className="max-h-[540px] space-y-3 overflow-auto pr-1">
            {filteredQuestions.map((question) => {
              const active = selectedQuestion.id === question.id;
              return (
                <button
                  key={question.id}
                  onClick={() => {
                    setSelectedQuestion(question);
                    setSelectedOption(null);
                    setShowAnswer(false);
                  }}
                  className={`w-full rounded-2xl border p-4 text-left transition ${active ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-white">{question.subject}</span>
                    <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-300">{question.level}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">{question.topic}</p>
                </button>
              );
            })}
            {!filteredQuestions.length && (
              <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-400">
                Nenhuma questão encontrada com esse recorte.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`${panel} p-6 lg:p-8`}>
        {selectedQuestion ? (
          <>
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Questão comentada</p>
                <h1 className="mt-2 text-2xl font-semibold text-white">{selectedQuestion.subject}</h1>
                <p className="mt-1 text-slate-400">{selectedQuestion.topic}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                Dificuldade: <span className="font-medium text-white">{selectedQuestion.level}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 text-slate-200">
              <p className="leading-7">{selectedQuestion.statement}</p>
            </div>

            <div className="mt-6 space-y-3">
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
                  <button key={index} onClick={() => !showAnswer && setSelectedOption(index)} className={`w-full rounded-2xl border p-4 text-left transition ${revealedClass}`}>
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-medium">{String.fromCharCode(65 + index)}</span>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={saveAttempt} disabled={selectedOption === null || saving} className="rounded-2xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? 'Salvando...' : 'Corrigir e salvar tentativa'}
              </button>
              <button onClick={() => { setSelectedOption(null); setShowAnswer(false); }} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                Limpar resposta
              </button>
            </div>

            {showAnswer && (
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Comentário do mentor</p>
                  <p className="mt-3 text-slate-100">{selectedQuestion.explanation}</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                  {lastRecordedQuestionId === selectedQuestion.id ? 'Tentativa registrada com sucesso.' : 'Selecione uma alternativa para salvar o resultado.'}
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
            <h1 className="mt-2 text-3xl font-semibold text-white">Trilha semanal + rota prioritária do Analista Administrativo.</h1>
            <p className="mt-2 text-slate-400">Planejamento mockado com foco em matérias de maior retorno para estudo real.</p>
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
              <ChecklistItem done={Boolean(dashboardData?.summary.lastAttemptAt)} label="Salvar primeiras tentativas" />
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
            <h1 className="mt-2 text-3xl font-semibold text-white">Desempenho por disciplina e mapa de erros por assunto.</h1>
          </div>
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="rounded-full bg-white/5 px-4 py-2">Janela: acumulado local + Supabase</span>
            <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-300">Fonte: {dashboardData?.source === 'supabase' ? 'Supabase' : 'Fallback local'}</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${panel} p-6 lg:col-span-2`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Precisão por disciplina</h2>
          <div className="space-y-4">
            {(dashboardData?.subjectProgress || []).map((point) => (
              <div key={point.subject}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{point.subject}</span>
                  <span>{point.accuracy}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/5">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" style={{ width: `${point.accuracy}%` }} />
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

      <section className={`${panel} p-6`}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Painel de erros por assunto</h2>
            <p className="text-sm text-slate-400">Baseado nas tentativas já salvas</p>
          </div>
          <span className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-200">Top {dashboardData?.errorInsights.length || 0}</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {(dashboardData?.errorInsights || []).map((item) => (
            <div key={`${item.subject}-${item.topic}`} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
              <p className="text-sm text-rose-200">{item.subject}</p>
              <h3 className="mt-1 font-medium text-white">{item.topic}</h3>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                <MiniPill label="Erros" value={`${item.totalErrors}`} />
                <MiniPill label="Tentativas" value={`${item.totalAttempts}`} />
                <MiniPill label="Precisão" value={`${item.accuracy}%`} />
              </div>
              <p className="mt-4 text-xs text-slate-500">Última ocorrência: {item.lastAttemptAt ? new Date(item.lastAttemptAt).toLocaleString('pt-BR') : 'sem registro'}</p>
            </div>
          ))}
          {!(dashboardData?.errorInsights || []).length && (
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">Ainda não há erros suficientes para montar o painel. Resolva algumas questões e volte aqui.</div>
          )}
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
              <h1 className="text-2xl font-semibold text-white">Módulo inicial de discursiva</h1>
              <p className="text-sm text-slate-400">Prompt guiado + estrutura + histórico básico persistido.</p>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-400">Escolha um tema</label>
            <select value={selectedPromptId} onChange={(e) => setSelectedPromptId(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none">
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

              <div className="mt-5">
                <label className="mb-2 block text-sm text-slate-400">Seu rascunho</label>
                <textarea value={essayDraft} onChange={(e) => setEssayDraft(e.target.value)} rows={12} placeholder="Escreva aqui sua introdução, desenvolvimento e conclusão..." className="w-full rounded-3xl border border-white/10 bg-slate-900/70 p-4 text-sm text-white outline-none placeholder:text-slate-500" />
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={saveEssay} disabled={!essayDraft.trim() || savingEssay} className="rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">
                  {savingEssay ? 'Salvando...' : 'Salvar discursiva'}
                </button>
                <button onClick={() => setEssayDraft('')} className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                  Limpar rascunho
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className={`${panel} p-6`}>
        <h2 className="text-xl font-semibold text-white">Histórico básico</h2>
        <p className="mt-1 text-sm text-slate-400">Fallback local ativo e tentativa de sync com Supabase se a tabela existir.</p>
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
              <p className="mt-3 line-clamp-5 text-sm text-slate-300 whitespace-pre-wrap">{item.answer}</p>
            </div>
          ))}
          {!essayHistory.length && (
            <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-slate-400">Nenhuma discursiva salva ainda. Use um prompt ao lado e registre seu primeiro texto.</div>
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
          <SidebarContent currentView={currentView} onChangeView={setCurrentView} source={dashboardData?.source ?? 'local'} />
        </aside>

        <div className="flex min-h-screen flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3">
                <button onClick={() => setMenuOpen(true)} className="rounded-2xl border border-white/10 p-2 text-slate-200 lg:hidden">
                  <Menu size={20} />
                </button>
                <div>
                  <p className="text-sm text-slate-400">Agente mentor de concurso</p>
                  <h1 className="text-lg font-semibold text-white">MVP navegável do aluno Eduardo</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`hidden items-center gap-2 rounded-2xl border px-3 py-2 text-sm md:flex ${dashboardData?.source === 'supabase' ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' : 'border-amber-400/20 bg-amber-500/10 text-amber-200'}`}>
                  <Signal size={16} /> {dashboardData?.source === 'supabase' ? 'Supabase online' : 'Fallback local'}
                </div>
                <button className="rounded-2xl border border-white/10 p-3 text-slate-300"><Bell size={18} /></button>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-200"><User size={18} /></div>
                  <div>
                    <p className="text-sm font-medium text-white">Eduardo K.</p>
                    <p className="text-xs text-slate-400">Edital PM • 127 dias</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
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
          <div className="absolute left-0 top-0 h-full w-80 border-r border-white/10 bg-slate-950 p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Mentor</p>
                <h2 className="text-xl font-semibold text-white">Concurso App</h2>
              </div>
              <button onClick={() => setMenuOpen(false)} className="rounded-2xl border border-white/10 p-2 text-slate-200">
                <X size={18} />
              </button>
            </div>
            <SidebarContent currentView={currentView} onChangeView={(view) => { setCurrentView(view); setMenuOpen(false); }} source={dashboardData?.source ?? 'local'} />
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarContent = ({ currentView, onChangeView, source }: { currentView: StudyViewKey; onChangeView: (view: StudyViewKey) => void; source: 'supabase' | 'local' }) => (
  <>
    <div className="mb-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-900/30">
        <GraduationCap size={28} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white">Concurso Mentor</h2>
      <p className="mt-2 text-sm text-slate-400">Questões, trilha, painel de erros e discursiva em um fluxo só.</p>
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
        <p className="font-medium text-white">Plano rápido de hoje</p>
      </div>
      <p className="mt-3 text-sm text-slate-300">• 1 bloco da trilha prioritária
        <br />• Revisar painel de erros
        <br />• 1 discursiva curta
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

export default App;
