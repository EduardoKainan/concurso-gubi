import React, { useMemo, useState } from 'react';
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
  Flame,
  GraduationCap,
  Home,
  LayoutDashboard,
  Medal,
  Menu,
  PlayCircle,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  X,
} from 'lucide-react';

type ViewKey = 'dashboard' | 'questoes' | 'plano' | 'evolucao';

type SubjectProgress = {
  subject: string;
  progress: number;
  streak: number;
  accuracy: number;
  pendingReviews: number;
};

type QuestionItem = {
  id: number;
  subject: string;
  topic: string;
  level: 'Fácil' | 'Médio' | 'Difícil';
  statement: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type StudyPlanDay = {
  day: string;
  focus: string;
  goal: string;
  duration: string;
  status: 'done' | 'today' | 'next';
};

const subjectProgress: SubjectProgress[] = [
  { subject: 'Direito Constitucional', progress: 76, streak: 5, accuracy: 81, pendingReviews: 12 },
  { subject: 'Direito Administrativo', progress: 64, streak: 4, accuracy: 74, pendingReviews: 18 },
  { subject: 'Português', progress: 88, streak: 9, accuracy: 90, pendingReviews: 6 },
  { subject: 'Raciocínio Lógico', progress: 52, streak: 3, accuracy: 69, pendingReviews: 20 },
];

const questions: QuestionItem[] = [
  {
    id: 1,
    subject: 'Direito Constitucional',
    topic: 'Direitos e garantias fundamentais',
    level: 'Médio',
    statement: 'A liberdade de associação poderá ser compulsoriamente dissolvida por decisão administrativa, desde que exista interesse público relevante.',
    options: [
      'Certo, desde que haja motivação expressa.',
      'Errado, porque só decisão judicial pode dissolver compulsoriamente associação.',
      'Certo, se a associação não tiver fins lícitos.',
      'Errado, porque associações nunca podem ser dissolvidas.',
    ],
    correctIndex: 1,
    explanation: 'A Constituição exige decisão judicial transitada em julgado para dissolução compulsória de associação.',
  },
  {
    id: 2,
    subject: 'Português',
    topic: 'Crase',
    level: 'Fácil',
    statement: 'Assinale a alternativa em que o uso da crase está correto.',
    options: [
      'Entreguei o relatório à diretora ontem.',
      'Voltamos á empresa no fim do dia.',
      'A reunião ocorrerá as 14h.',
      'Escrevi à lápis durante a prova.',
    ],
    correctIndex: 0,
    explanation: 'Há crase em “à diretora” porque ocorre a fusão da preposição “a” com o artigo feminino “a”.',
  },
  {
    id: 3,
    subject: 'Raciocínio Lógico',
    topic: 'Proposições equivalentes',
    level: 'Difícil',
    statement: 'A negação de “Se estudo, então passo” é logicamente equivalente a:',
    options: [
      'Estudo e não passo.',
      'Não estudo e passo.',
      'Se não estudo, então não passo.',
      'Passo se e somente se estudo.',
    ],
    correctIndex: 0,
    explanation: 'A negação de uma condicional “p → q” é “p e não q”.',
  },
];

const studyPlan: StudyPlanDay[] = [
  { day: 'Segunda', focus: 'Português + Revisão 24h', goal: '40 questões + mapa mental', duration: '2h', status: 'done' },
  { day: 'Terça', focus: 'Constitucional', goal: 'Lei seca + 30 questões', duration: '2h30', status: 'done' },
  { day: 'Quarta', focus: 'Administrativo', goal: 'Poderes administrativos + revisão', duration: '2h', status: 'today' },
  { day: 'Quinta', focus: 'Raciocínio Lógico', goal: 'Listas comentadas + flashcards', duration: '1h30', status: 'next' },
  { day: 'Sexta', focus: 'Simulado direcionado', goal: '60 questões cronometradas', duration: '3h', status: 'next' },
];

const navItems: { key: ViewKey; label: string; icon: React.ComponentType<any> }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'questoes', label: 'Questões', icon: FileQuestion },
  { key: 'plano', label: 'Plano de estudos', icon: BookOpen },
  { key: 'evolucao', label: 'Evolução', icon: TrendingUp },
];

const appShell = 'min-h-screen bg-slate-950 text-slate-100';
const panel = 'rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-slate-950/30';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewKey>('dashboard');
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const overallProgress = useMemo(
    () => Math.round(subjectProgress.reduce((sum, item) => sum + item.progress, 0) / subjectProgress.length),
    []
  );
  const averageAccuracy = useMemo(
    () => Math.round(subjectProgress.reduce((sum, item) => sum + item.accuracy, 0) / subjectProgress.length),
    []
  );
  const totalReviews = useMemo(() => subjectProgress.reduce((sum, item) => sum + item.pendingReviews, 0), []);

  const renderDashboard = () => (
    <div className="space-y-6">
      <section className={`${panel} p-6 lg:p-8`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              <Flame size={16} /> Sequência de 9 dias
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Mentor de Concurso</p>
              <h1 className="mt-2 text-3xl font-semibold text-white lg:text-5xl">Seu cockpit de aprovação, focado no que mais cai na prova.</h1>
            </div>
            <p className="text-slate-300">Mock inicial do MVP com visão geral, rotina da semana, questões comentadas e acompanhamento de evolução.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setCurrentView('questoes')} className="inline-flex items-center gap-2 rounded-2xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400">
                <PlayCircle size={18} /> Resolver bloco de questões
              </button>
              <button onClick={() => setCurrentView('plano')} className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5">
                <CalendarDays size={18} /> Ver plano da semana
              </button>
            </div>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 lg:w-[420px]">
            <MetricCard icon={Target} label="Progresso total" value={`${overallProgress}%`} detail="Meta de 80% até a prova" accent="from-indigo-500 to-cyan-400" />
            <MetricCard icon={Brain} label="Precisão média" value={`${averageAccuracy}%`} detail="+6 pts nos últimos 14 dias" accent="from-fuchsia-500 to-pink-400" />
            <MetricCard icon={Clock3} label="Revisões pendentes" value={`${totalReviews}`} detail="Prioridade nas próximas 48h" accent="from-amber-500 to-orange-400" />
            <MetricCard icon={Trophy} label="Simulados" value="12" detail="Melhor nota: 82/100" accent="from-emerald-500 to-lime-400" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr,1fr]">
        <div className={`${panel} p-6`}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Disciplinas prioritárias</h2>
              <p className="text-sm text-slate-400">Onde concentrar energia nesta semana</p>
            </div>
            <button onClick={() => setCurrentView('evolucao')} className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">
              Ver evolução <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {subjectProgress.map((item) => (
              <div key={item.subject} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-medium text-white">{item.subject}</h3>
                    <p className="text-sm text-slate-400">Precisão {item.accuracy}% • {item.pendingReviews} revisões pendentes</p>
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
              <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"><CheckCircle2 size={16} className="text-emerald-400" /> Revisão espaçada de Português</li>
              <li className="flex items-center gap-3 rounded-2xl bg-indigo-500/10 p-3"><Circle size={16} className="text-indigo-300" /> 30 questões de Administrativo</li>
              <li className="flex items-center gap-3 rounded-2xl bg-white/5 p-3"><Circle size={16} className="text-slate-500" /> Flashcards de constitucional</li>
            </ul>
          </div>
          <div className={`${panel} p-6`}>
            <h2 className="font-semibold text-white">Radar do mentor</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <InsightCard title="Ponto forte" description="Português já opera em faixa competitiva. Mantenha revisão curta, sem roubar tempo das matérias-meio." />
              <InsightCard title="Gargalo atual" description="Raciocínio Lógico está com menor retenção. Vale trocar teoria longa por listas guiadas e correção ativa." />
              <InsightCard title="Ajuste sugerido" description="Antecipar um mini simulado na quinta para medir transferência entre revisão e execução." />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderQuestions = () => (
    <div className="grid gap-6 xl:grid-cols-[320px,1fr]">
      <div className={`${panel} p-4`}>
        <h2 className="mb-4 text-lg font-semibold text-white">Fila de questões</h2>
        <div className="space-y-3">
          {questions.map((question) => {
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
        </div>
      </div>

      <div className={`${panel} p-6 lg:p-8`}>
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
              <button
                key={index}
                onClick={() => !showAnswer && setSelectedOption(index)}
                className={`w-full rounded-2xl border p-4 text-left transition ${revealedClass}`}
              >
                <div className="flex items-center gap-3 text-sm text-slate-200">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 font-medium">{String.fromCharCode(65 + index)}</span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => setShowAnswer(true)}
            className="rounded-2xl bg-indigo-500 px-5 py-3 font-medium text-white transition hover:bg-indigo-400"
          >
            Corrigir questão
          </button>
          <button
            onClick={() => {
              setSelectedOption(null);
              setShowAnswer(false);
            }}
            className="rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5"
          >
            Limpar resposta
          </button>
        </div>

        {showAnswer && (
          <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Comentário do mentor</p>
            <p className="mt-3 text-slate-100">{selectedQuestion.explanation}</p>
          </div>
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
            <h1 className="mt-2 text-3xl font-semibold text-white">Roteiro semanal com foco em consistência.</h1>
            <p className="mt-2 text-slate-400">Planejamento mockado para concurso público, com blocos curtos, revisão espaçada e simulado.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <MiniStat label="Horas previstas" value="11h" />
            <MiniStat label="Questões-meta" value="210" />
            <MiniStat label="Revisões-chave" value="18" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
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
            <h2 className="font-semibold text-white">Estratégia sugerida</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              <li className="rounded-2xl bg-white/5 p-4">1. Começar o bloco mais difícil nos primeiros 25 minutos.</li>
              <li className="rounded-2xl bg-white/5 p-4">2. Revisão curta obrigatória 24h após cada matéria nova.</li>
              <li className="rounded-2xl bg-white/5 p-4">3. Fechar sexta com simulado e análise de erro, não só nota.</li>
            </ul>
          </div>
          <div className={`${panel} p-6`}>
            <h2 className="font-semibold text-white">Checklist do ciclo</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <ChecklistItem done label="Definir edital e peso por disciplina" />
              <ChecklistItem done label="Separar caderno de erros" />
              <ChecklistItem done={false} label="Programar revisões de 7 e 30 dias" />
              <ChecklistItem done={false} label="Agendar simulado completo de sábado" />
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
            <h1 className="mt-2 text-3xl font-semibold text-white">Acompanhe desempenho, retenção e ritmo.</h1>
          </div>
          <div className="flex gap-3 text-sm text-slate-300">
            <span className="rounded-full bg-white/5 px-4 py-2">Janela: 30 dias</span>
            <span className="rounded-full bg-emerald-500/10 px-4 py-2 text-emerald-300">Tendência positiva</span>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className={`${panel} p-6 lg:col-span-2`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Linha de evolução</h2>
          <div className="space-y-4">
            {[
              { label: 'Semana 1', value: 48 },
              { label: 'Semana 2', value: 57 },
              { label: 'Semana 3', value: 66 },
              { label: 'Semana 4', value: 74 },
              { label: 'Semana 5', value: 79 },
            ].map((point) => (
              <div key={point.label}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                  <span>{point.label}</span>
                  <span>{point.value}%</span>
                </div>
                <div className="h-3 rounded-full bg-white/5">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" style={{ width: `${point.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${panel} p-6`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Ranking por disciplina</h2>
          <div className="space-y-4">
            {[...subjectProgress].sort((a, b) => b.accuracy - a.accuracy).map((item, index) => (
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
    </div>
  );

  return (
    <div className={appShell}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.25),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(45,212,191,0.12),_transparent_30%)]" />
      <div className="relative flex min-h-screen">
        <aside className="hidden w-80 shrink-0 border-r border-white/10 bg-slate-950/80 p-6 lg:flex lg:flex-col">
          <SidebarContent currentView={currentView} onChangeView={setCurrentView} />
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
            {currentView === 'dashboard' && renderDashboard()}
            {currentView === 'questoes' && renderQuestions()}
            {currentView === 'plano' && renderPlan()}
            {currentView === 'evolucao' && renderProgress()}
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
            <SidebarContent currentView={currentView} onChangeView={(view) => { setCurrentView(view); setMenuOpen(false); }} />
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarContent = ({ currentView, onChangeView }: { currentView: ViewKey; onChangeView: (view: ViewKey) => void }) => (
  <>
    <div className="mb-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-900/30">
        <GraduationCap size={28} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white">Concurso Mentor</h2>
      <p className="mt-2 text-sm text-slate-400">Frontend adaptado com foco em progresso, prática e planejamento.</p>
    </div>

    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentView === item.key;
        return (
          <button
            key={item.key}
            onClick={() => onChangeView(item.key)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-900/30' : 'text-slate-300 hover:bg-white/5'}`}
          >
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
      <p className="mt-3 text-sm text-slate-300">• 2 blocos de teoria
        <br />• 30 questões comentadas
        <br />• 15 min de revisão final
      </p>
    </div>

    <div className="mt-auto rounded-3xl border border-amber-400/20 bg-amber-500/10 p-5">
      <div className="flex items-center gap-3">
        <Star className="text-amber-300" size={18} />
        <p className="font-medium text-white">Status do MVP</p>
      </div>
      <p className="mt-3 text-sm text-slate-300">Dados mockados, navegação pronta e base preparada para conectar backend depois.</p>
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
