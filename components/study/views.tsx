import React from 'react';
import { CalendarDays, ChevronRight, Clock3, FileText, Flame, PlayCircle, Sparkles, Target, Brain, Trophy, ChevronLeft, CheckCircle2, RotateCcw } from 'lucide-react';
import { analystPriorityTrail, studyPlan } from '../../data/studySeed';
import { StudyDashboardData, StudyEssayDidacticResponse, StudyEssayDraft, StudyEssayEntry, StudyEssayPrompt, StudyQuestionItem, StudyQuestionSessionState, StudyViewKey } from '../../types';
import { shellStyles } from './config';
import { ActionItem, ChecklistItem, EmptyStateCard, InsightCard, MetricCard, MiniPill, MiniStat, ReviewQueueCard, SectionHeader, SidebarContent, Tag } from './ui';

const panel = shellStyles.panel;
const input = shellStyles.input;
const primaryButton = shellStyles.primaryButton;
const ghostButton = shellStyles.ghostButton;

export { SidebarContent };

export const DashboardView = ({ dashboardData, overallProgress, averageAccuracy, totalReviews, essayHistoryLength, recommendation, topWeakness, reviewDueNowCount, onChangeView }: { dashboardData: StudyDashboardData; overallProgress: number; averageAccuracy: number; totalReviews: number; essayHistoryLength: number; recommendation: StudyDashboardData['recommendation']; topWeakness?: StudyDashboardData['topicPerformance'][number]; reviewDueNowCount: number; onChangeView: (view: StudyViewKey) => void; }) => (
  <div className="space-y-6">
    <section className={`${panel} overflow-hidden p-6 lg:p-8`}>
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr] xl:items-center">
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300"><Flame size={16} /> Sequência de {dashboardData.summary.currentStreak} dias</div>
          <SectionHeader eyebrow="Treinador adaptativo" title="Seu cockpit agora decide o próximo sprint de estudo." description="Cruza erros, revisões 24h/7d/14d, desempenho por tópico e histórico recente para priorizar a próxima sessão sem fricção." />
          <div className="flex flex-wrap gap-3">
            <button onClick={() => onChangeView('questoes')} className={primaryButton}><PlayCircle size={18} className="mr-2 inline" />Resolver bloco sugerido</button>
            <button onClick={() => onChangeView('discursivas')} className={ghostButton}><FileText size={18} className="mr-2 inline" />Treinar discursiva</button>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <MetricCard icon={Target} label="Progresso total" value={`${overallProgress}%`} detail="Cobertura real do banco por disciplina" accent="from-indigo-500 to-cyan-400" />
          <MetricCard icon={Brain} label="Precisão média" value={`${averageAccuracy}%`} detail={`${dashboardData.summary.totalCorrect} acertos acumulados`} accent="from-fuchsia-500 to-pink-400" />
          <MetricCard icon={Clock3} label="Fila de revisão" value={`${totalReviews}`} detail={`${dashboardData.summary.dueReviews} vencendo agora`} accent="from-amber-500 to-orange-400" />
          <MetricCard icon={Trophy} label="Discursivas" value={`${essayHistoryLength}`} detail="Com autosave e feedback rápido" accent="from-emerald-500 to-lime-400" />
        </div>
      </div>
    </section>

    <section className={`${panel} overflow-hidden`}>
      <div className="grid gap-0 xl:grid-cols-[1.15fr,0.85fr]">
        <div className="border-b border-white/10 p-6 xl:border-b-0 xl:border-r xl:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Próxima sessão recomendada</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{recommendation.title}</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-sm ${recommendation.priority === 'alta' ? 'bg-rose-500/10 text-rose-200' : recommendation.priority === 'media' ? 'bg-amber-500/10 text-amber-200' : 'bg-emerald-500/10 text-emerald-200'}`}>Prioridade {recommendation.priority}</span>
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
          <div className="mt-4 space-y-3">
            <ActionItem done={recommendation.reviewCount > 0} label={`Começar com ${recommendation.reviewCount} revisão(ões) pendentes`} />
            <ActionItem done={false} label={`Atacar ${recommendation.targetQuestions} questões de ${recommendation.subject}`} />
            <ActionItem done={false} label={`Fechar com leitura de justificativas em ${recommendation.topic}`} />
          </div>
        </div>
      </div>
    </section>

    <section className="grid gap-6 xl:grid-cols-[1.25fr,0.75fr]">
      <div className={`${panel} p-6`}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-white">Disciplinas com momentum real</h2>
            <p className="text-sm text-slate-400">Precisão, carga de erro e cobertura do banco</p>
          </div>
          <button onClick={() => onChangeView('evolucao')} className="inline-flex items-center gap-2 text-sm text-indigo-300 hover:text-indigo-200">Ver análise profunda <ChevronRight size={16} /></button>
        </div>
        <div className="space-y-4">
          {dashboardData.subjectProgress.map((item) => (
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
              <div className="mt-4 h-3 rounded-full bg-white/5"><div className="h-3 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" style={{ width: `${item.progress}%` }} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className={`${panel} p-6`}>
          <div className="mb-4 flex items-center gap-3">
            <CalendarDays className="text-amber-300" />
            <div><h2 className="font-semibold text-white">Fila temporal de revisão</h2><p className="text-sm text-slate-400">24h, 7d e 14d baseados em erro</p></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {dashboardData.reviewQueue.slice(0, 4).map((item) => <ReviewQueueCard key={item.id} item={item} />)}
            {!dashboardData.reviewQueue.length && <EmptyStateCard>Nenhuma revisão criada ainda. Os erros alimentam a fila automaticamente.</EmptyStateCard>}
          </div>
        </div>
        <div className={`${panel} p-6`}>
          <h2 className="font-semibold text-white">Radar do mentor</h2>
          <div className="mt-4 space-y-3">
            <InsightCard title="Persistência ativa" description={dashboardData.source === 'supabase' ? 'Tentativas e discursivas sincronizadas no Supabase quando as tabelas existem.' : 'Fallback local ativo para não travar o estudo.'} />
            <InsightCard title="Maior fragilidade" description={topWeakness ? `${topWeakness.subject} • ${topWeakness.topic} (${topWeakness.accuracy}% de precisão)` : 'Ainda sem massa crítica. Resolva mais questões para calibrar o motor.'} />
            <InsightCard title="Última atividade" description={dashboardData.summary.lastAttemptAt ? new Date(dashboardData.summary.lastAttemptAt).toLocaleString('pt-BR') : 'Nenhuma tentativa salva nesta sessão ainda.'} />
            <InsightCard title="Urgência do ciclo" description={`${reviewDueNowCount} revisão(ões) pedindo ataque imediato no fluxo atual.`} />
          </div>
        </div>
      </div>
    </section>
  </div>
);

export const QuestionsView = ({ questionSession, selectedQuestion, selectedOption, showAnswer, saving, lastRecordedQuestionId, source, onSelectOption, onSaveAttempt, onResetAnswer, onPrevQuestion, onNextQuestion, onResumeRecommendedQuestion }: { questionSession: StudyQuestionSessionState | null; selectedQuestion?: StudyQuestionItem; selectedOption: number | null; showAnswer: boolean; saving: boolean; lastRecordedQuestionId: number | null; source: StudyDashboardData['source']; onSelectOption: (index: number) => void; onSaveAttempt: () => void; onResetAnswer: () => void; onPrevQuestion: () => void; onNextQuestion: () => void; onResumeRecommendedQuestion: () => void; }) => (
  <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
    <div className={`${panel} p-4 sm:p-5`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Sessão contínua</p>
          <h2 className="mt-2 text-lg font-semibold text-white">Fluxo puro de resolução</h2>
          <p className="mt-2 text-sm text-slate-400">Sem filtros. O app retoma de onde você parou e prioriza questões inéditas antes de reciclar revisões.</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          <Tag>{source === 'supabase' ? 'Sync Supabase' : 'Fallback local'}</Tag>
          <Tag>Modo {questionSession?.mode || 'continuacao'}</Tag>
          <Tag>{questionSession?.completedQuestions || 0}/{questionSession?.totalQuestions || 0} respondidas</Tag>
        </div>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        <MiniStat label="Na fila" value={`${questionSession?.queueQuestionIds.length || 0}`} />
        <MiniStat label="Restantes" value={`${questionSession?.remainingQuestions || 0}`} />
        <MiniStat label="Revisões" value={`${questionSession?.reviewQuestionIds.length || 0}`} />
        <MiniStat label="Último sync" value={questionSession?.updatedAt ? new Date(questionSession.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'} />
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
              <Tag>Questão #{selectedQuestion.id}</Tag>
              <Tag>Posição {Math.max((questionSession?.queueQuestionIds.indexOf(selectedQuestion.id) ?? 0) + 1, 1)} de {questionSession?.queueQuestionIds.length || 1}</Tag>
              <Tag>Dificuldade: <span className="font-medium text-white">{selectedQuestion.level}</span></Tag>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-slate-100 sm:p-6"><p className="text-base leading-8 sm:text-lg">{selectedQuestion.statement}</p></div>
          <div className="mt-8 space-y-3">
            {selectedQuestion.options.map((option, index) => {
              const chosen = selectedOption === index;
              const correct = selectedQuestion.correctIndex === index;
              const revealedClass = showAnswer ? correct ? 'border-emerald-400 bg-emerald-500/10' : chosen ? 'border-rose-400 bg-rose-500/10' : 'border-white/10 bg-white/5' : chosen ? 'border-indigo-400 bg-indigo-500/10' : 'border-white/10 bg-white/5 hover:bg-white/10';
              return (
                <button key={index} onClick={() => !showAnswer && onSelectOption(index)} className={`w-full rounded-2xl border p-4 text-left transition active:scale-[0.99] sm:p-5 ${revealedClass}`}>
                  <div className="flex items-start gap-4 text-sm text-slate-200 sm:text-base"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 font-semibold">{String.fromCharCode(65 + index)}</span><span>{option}</span></div>
                </button>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onSaveAttempt} disabled={selectedOption === null || saving} className={primaryButton}>{saving ? 'Salvando...' : 'Corrigir e salvar tentativa'}</button>
            <button onClick={onResetAnswer} className={ghostButton}>Limpar resposta</button>
            <button onClick={onPrevQuestion} className={ghostButton}><ChevronLeft size={16} className="mr-2 inline" />Questão anterior</button>
            <button onClick={onNextQuestion} className={ghostButton}>Pular para próxima <ChevronRight size={16} className="ml-2 inline" /></button>
            {showAnswer && <button onClick={onResumeRecommendedQuestion} className="inline-flex items-center rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-5 py-3 font-medium text-emerald-100 transition hover:bg-emerald-500/20"><RotateCcw size={16} className="mr-2" />Abrir próxima da sessão</button>}
          </div>
          {showAnswer ? (
            <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
              <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-4 sm:p-5"><p className="text-sm font-medium uppercase tracking-[0.2em] text-emerald-300">Feedback</p><p className="mt-3 text-slate-100">{selectedQuestion.explanation}</p></div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 sm:p-5">{lastRecordedQuestionId === selectedQuestion.id ? 'Tentativa registrada. A sessão já apontou a próxima questão para você continuar sem repetir bloco à toa.' : 'Selecione uma alternativa para salvar o resultado.'}</div>
              <div className="flex flex-wrap gap-3"><button onClick={onResumeRecommendedQuestion} className="rounded-2xl bg-emerald-500 px-5 py-3 font-medium text-white transition hover:bg-emerald-400">Próxima questão</button><button onClick={onResetAnswer} className={ghostButton}>Refazer esta questão</button></div>
            </div>
          ) : null}
        </>
      ) : <EmptyStateCard>Nenhuma questão disponível na sessão atual.</EmptyStateCard>}
    </div>
  </div>
);

export const PlanView = ({ dashboardData, essayHistoryLength }: { dashboardData: StudyDashboardData; essayHistoryLength: number }) => (
  <div className="space-y-6">
    <section className={`${panel} p-6 lg:p-8`}>
      <SectionHeader eyebrow="Plano de estudos" title="Trilha semanal com camada adaptativa em cima." description="O plano-base segue fixo, mas a recomendação diária muda conforme erros, revisões vencidas e matérias fracas." aside={<><MiniStat label="Horas previstas" value="11h" /><MiniStat label="Questões-meta" value={`${dashboardData.summary.weeklyGoal}`} /><MiniStat label="Feitas hoje" value={`${dashboardData.summary.completedToday}`} /></>} />
    </section>
    <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
      <div className={`${panel} p-6`}>
        <h2 className="mb-5 text-xl font-semibold text-white">Semana atual</h2>
        <div className="space-y-4">{studyPlan.map((item) => <div key={item.day} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-start gap-4"><div className={`mt-1 h-3 w-3 rounded-full ${item.status === 'done' ? 'bg-emerald-400' : item.status === 'today' ? 'bg-indigo-400' : 'bg-slate-600'}`} /><div><p className="text-sm text-slate-400">{item.day}</p><h3 className="font-medium text-white">{item.focus}</h3><p className="text-sm text-slate-400">{item.goal}</p></div></div><div className="flex items-center gap-3 text-sm"><span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">{item.duration}</span><span className={`rounded-full px-3 py-1 ${item.status === 'done' ? 'bg-emerald-500/10 text-emerald-300' : item.status === 'today' ? 'bg-indigo-500/10 text-indigo-300' : 'bg-white/5 text-slate-300'}`}>{item.status === 'done' ? 'Concluído' : item.status === 'today' ? 'Hoje' : 'Próximo'}</span></div></div>)}</div>
      </div>
      <div className="space-y-6">
        <div className={`${panel} p-6`}>
          <h2 className="mb-5 text-xl font-semibold text-white">Trilha prioritária, Analista Administrativo</h2>
          <div className="space-y-4">{analystPriorityTrail.map((item) => <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-indigo-300">{item.subject}</p><h3 className="font-medium text-white">{item.topic}</h3></div><span className={`rounded-full px-3 py-1 text-xs ${item.priority === 'alta' ? 'bg-rose-500/10 text-rose-200' : 'bg-white/5 text-slate-300'}`}>{item.priority === 'alta' ? 'Alta prioridade' : 'Base de manutenção'}</span></div><p className="mt-3 text-sm text-slate-400">{item.reason}</p><div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300"><Tag>Meta: {item.targetQuestions} questões</Tag><Tag>Foco: {item.difficultyFocus}</Tag></div><div className="mt-4 rounded-2xl bg-indigo-500/10 p-3 text-sm text-indigo-100">{item.action}</div></div>)}</div>
        </div>
        <div className={`${panel} p-6`}>
          <h2 className="font-semibold text-white">Checklist do ciclo</h2>
          <div className="mt-4 space-y-3"><ChecklistItem done label="Definir edital e peso por disciplina" /><ChecklistItem done label="Separar caderno de erros" /><ChecklistItem done={Boolean(dashboardData.summary.lastAttemptAt)} label="Calibrar recomendação com tentativas reais" /><ChecklistItem done={essayHistoryLength > 0} label="Registrar primeira discursiva" /></div>
        </div>
      </div>
    </section>
  </div>
);

export const ProgressView = ({ dashboardData, reviewDueNowCount }: { dashboardData: StudyDashboardData; reviewDueNowCount: number }) => (
  <div className="space-y-6">
    <section className={`${panel} p-6 lg:p-8`}>
      <SectionHeader eyebrow="Evolução" title="Painel profundo por disciplina, tópico e revisão." aside={<><Tag>Janela: acumulado local + Supabase</Tag><Tag>Fonte: {dashboardData.source === 'supabase' ? 'Supabase' : 'Fallback local'}</Tag></>} />
    </section>
    <section className="grid gap-6 lg:grid-cols-3">
      <div className={`${panel} p-6 lg:col-span-2`}><h2 className="mb-5 text-xl font-semibold text-white">Precisão e cobertura por disciplina</h2><div className="space-y-4">{dashboardData.subjectProgress.map((point) => <div key={point.subject} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-300"><span>{point.subject}</span><span>{point.accuracy}% precisão • {point.progress}% cobertura</span></div><div className="h-3 rounded-full bg-white/5"><div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-fuchsia-500" style={{ width: `${point.accuracy}%` }} /></div><div className="mt-3 grid gap-2 md:grid-cols-4"><MiniPill label="Acertos" value={`${point.correct}`} /><MiniPill label="Erros" value={`${point.wrong}`} /><MiniPill label="Revisões" value={`${point.pendingReviews}`} /><MiniPill label="Momentum" value={`${point.studyMomentum}`} /></div></div>)}</div></div>
      <div className={`${panel} p-6`}><h2 className="mb-5 text-xl font-semibold text-white">Ranking por disciplina</h2><div className="space-y-4">{[...dashboardData.subjectProgress].sort((a, b) => b.accuracy - a.accuracy).map((item, index) => <div key={item.subject} className="flex items-center justify-between rounded-2xl bg-white/5 p-4"><div><p className="text-sm text-slate-400">#{index + 1}</p><h3 className="font-medium text-white">{item.subject}</h3></div><span className="text-lg font-semibold text-white">{item.accuracy}%</span></div>)}</div></div>
    </section>
    <section className="grid gap-6 xl:grid-cols-[0.92fr,1.08fr]">
      <div className={`${panel} p-6`}><div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-semibold text-white">Fila de revisão inteligente</h2><p className="text-sm text-slate-400">Baseada em erros com janelas 24h, 7d e 14d</p></div><span className="rounded-full bg-amber-500/10 px-3 py-1 text-sm text-amber-200">{reviewDueNowCount} urgentes</span></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{dashboardData.reviewQueue.map((item) => <ReviewQueueCard key={item.id} item={item} />)}{!dashboardData.reviewQueue.length && <EmptyStateCard>Nenhuma revisão montada ainda.</EmptyStateCard>}</div></div>
      <div className={`${panel} p-6`}><div className="mb-5 flex items-center justify-between"><div><h2 className="text-xl font-semibold text-white">Desempenho por tópico</h2><p className="text-sm text-slate-400">Leitura granular para atacar assunto fraco</p></div><span className="rounded-full bg-rose-500/10 px-3 py-1 text-sm text-rose-200">Top {dashboardData.topicPerformance.length}</span></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">{dashboardData.topicPerformance.slice(0, 12).map((item) => <div key={`${item.subject}-${item.topic}`} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-indigo-300">{item.subject}</p><h3 className="font-medium text-white">{item.topic}</h3></div><span className={`rounded-full px-3 py-1 text-xs ${item.averageResponseLabel === 'crítico' ? 'bg-rose-500/10 text-rose-200' : item.averageResponseLabel === 'atenção' ? 'bg-amber-500/10 text-amber-200' : 'bg-emerald-500/10 text-emerald-200'}`}>{item.averageResponseLabel}</span></div><div className="mt-4 grid grid-cols-4 gap-2 text-center text-sm"><MiniPill label="Tent." value={`${item.attempts}`} /><MiniPill label="Acertos" value={`${item.correct}`} /><MiniPill label="Erros" value={`${item.errors}`} /><MiniPill label="Precisão" value={`${item.accuracy}%`} /></div><p className="mt-3 text-xs text-slate-500">Última ocorrência: {item.lastAttemptAt ? new Date(item.lastAttemptAt).toLocaleString('pt-BR') : 'sem registro'}</p></div>)}</div></div>
    </section>
  </div>
);

export const EssaysView = ({ essayPrompts, selectedPromptId, selectedPrompt, essayDraft, draftMeta, savingEssay, generatingDidactic, didacticResponse, essayHistory, onPromptChange, onEssayDraftChange, onSaveEssay, onGenerateDidacticEssay, onClearDraft, renderDidacticResponse }: { essayPrompts: StudyEssayPrompt[]; selectedPromptId: string; selectedPrompt?: StudyEssayPrompt; essayDraft: string; draftMeta: StudyEssayDraft | null; savingEssay: boolean; generatingDidactic: boolean; didacticResponse: StudyEssayDidacticResponse | null; essayHistory: StudyEssayEntry[]; onPromptChange: (value: string) => void; onEssayDraftChange: (value: string) => void; onSaveEssay: () => void; onGenerateDidacticEssay: () => void; onClearDraft: () => void; renderDidacticResponse: (response: StudyEssayDidacticResponse) => React.ReactNode; }) => (
  <div className="grid gap-6 xl:grid-cols-[1fr,0.95fr]">
    <div className="space-y-6">
      <div className={`${panel} p-6`}>
        <div className="mb-4 flex items-center gap-3"><FileText className="text-cyan-300" /><div><h1 className="text-2xl font-semibold text-white">Discursiva com autosave</h1><p className="text-sm text-slate-400">Prompt guiado, rascunho persistido e resposta-modelo explicada para aprender a estrutura.</p></div></div>
        <SelectField label="Escolha um tema" value={selectedPromptId} onChange={onPromptChange} options={essayPrompts.map((item) => ({ label: item.title, value: item.id }))} />
        {selectedPrompt ? <><div className="mt-5 rounded-3xl border border-white/10 bg-slate-900/60 p-5"><div className="flex flex-wrap items-center gap-2 text-xs text-slate-400"><Tag>{selectedPrompt.subject}</Tag><Tag>{selectedPrompt.topic}</Tag></div><p className="mt-4 leading-7 text-slate-200">{selectedPrompt.prompt}</p></div><div className="mt-5 grid gap-4 md:grid-cols-2"><ListCard title="Estrutura sugerida" items={selectedPrompt.structure} /><ListCard title="Critérios de avaliação" items={selectedPrompt.evaluationCriteria} /></div><div className="mt-5 grid gap-3 sm:grid-cols-3"><MiniStat label="Palavras" value={`${essayDraft.trim() ? essayDraft.trim().split(/\s+/).filter(Boolean).length : 0}`} /><MiniStat label="Status" value={draftMeta ? 'rascunho' : 'vazio'} /><MiniStat label="Últ. save" value={draftMeta?.updatedAt ? new Date(draftMeta.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : '--:--'} /></div><div className="mt-5"><label className="mb-2 block text-sm text-slate-400">Seu rascunho</label><textarea value={essayDraft} onChange={(e) => onEssayDraftChange(e.target.value)} rows={12} placeholder="Escreva aqui sua introdução, desenvolvimento e conclusão..." className="min-h-[320px] w-full rounded-3xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 sm:min-h-[360px]" /></div><div className="mt-4 flex flex-wrap gap-3"><button onClick={onSaveEssay} disabled={!essayDraft.trim() || savingEssay} className="rounded-2xl bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60">{savingEssay ? 'Salvando...' : 'Finalizar discursiva'}</button><button onClick={onGenerateDidacticEssay} disabled={generatingDidactic} className="inline-flex rounded-2xl border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 font-medium text-cyan-100 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"><Sparkles size={18} className="mr-2" />{generatingDidactic ? 'Gerando explicação...' : 'Gerar resposta didática com IA'}</button><button onClick={onClearDraft} className={ghostButton}>Limpar rascunho</button></div>{didacticResponse ? renderDidacticResponse(didacticResponse) : <div className="mt-5 rounded-2xl border border-dashed border-cyan-400/20 bg-cyan-500/5 p-5 text-sm text-slate-300">Clique em <span className="font-medium text-cyan-200">Gerar resposta didática com IA</span> para ver interpretação do tema, tese, argumentos, estrutura sugerida e uma resposta-modelo explicada.</div>}</> : null}
      </div>
    </div>
    <div className={`${panel} p-6`}><h2 className="text-xl font-semibold text-white">Histórico e feedback</h2><p className="mt-1 text-sm text-slate-400">Fallback local ativo e sync com Supabase quando as tabelas existem.</p><div className="mt-5 space-y-4">{essayHistory.map((item) => <div key={item.id} className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"><div className="flex items-start justify-between gap-3"><div><h3 className="font-medium text-white">{item.title}</h3><p className="text-sm text-slate-400">{item.subject} • {item.topic}</p></div><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{new Date(item.createdAt).toLocaleDateString('pt-BR')}</span></div><div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-300"><Tag>{item.wordCount} palavras</Tag><Tag>{item.status}</Tag></div>{item.feedback?.length ? <ul className="mt-3 space-y-2 text-sm text-cyan-100">{item.feedback.map((feedback) => <li key={feedback}>• {feedback}</li>)}</ul> : null}{item.didacticResponse ? <div className="mt-4 rounded-2xl border border-cyan-400/15 bg-cyan-500/5 p-4"><p className="text-sm font-medium text-cyan-100">Resposta-modelo explicada salva</p><ul className="mt-2 space-y-1 text-sm text-slate-300"><li>• Tese: {item.didacticResponse.thesis}</li><li>• Argumentos: {item.didacticResponse.arguments.join(' | ')}</li></ul></div> : null}<p className="mt-3 whitespace-pre-wrap text-sm text-slate-300 line-clamp-5">{item.answer}</p></div>)}{!essayHistory.length && <EmptyStateCard>Nenhuma discursiva salva ainda. O rascunho já fica salvo automaticamente enquanto você escreve.</EmptyStateCard>}</div></div>
  </div>
);

const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: Array<string | { label: string; value: string }>; }) => (
  <div>
    <label className="mb-2 block text-sm text-slate-400">{label}</label>
    <select value={value} onChange={(e) => onChange(e.target.value)} className={input}>{options.map((item) => typeof item === 'string' ? <option key={item} value={item}>{item}</option> : <option key={item.value} value={item.value}>{item.label}</option>)}</select>
  </div>
);

const ListCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><h3 className="font-medium text-white">{title}</h3><ul className="mt-3 space-y-2 text-sm text-slate-300">{items.map((item) => <li key={item}>• {item}</li>)}</ul></div>
);
