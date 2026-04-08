import React from 'react';
import { CheckCircle2, Circle, Home, Star } from 'lucide-react';
import { StudyReviewItem, StudyViewKey } from '../../types';
import { navItems, shellStyles } from './config';

export const SectionHeader = ({ eyebrow, title, description, aside }: { eyebrow?: string; title: string; description?: string; aside?: React.ReactNode }) => (
  <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
    <div>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.32em] text-slate-500">{eyebrow}</p> : null}
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
      {description ? <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400 sm:text-base">{description}</p> : null}
    </div>
    {aside ? <div className="flex flex-wrap gap-3">{aside}</div> : null}
  </div>
);

export const MetricCard = ({ icon: Icon, label, value, detail, accent }: { icon: React.ComponentType<any>; label: string; value: string; detail: string; accent: string }) => (
  <div className="group rounded-[26px] border border-white/10 bg-slate-950/60 p-5 transition hover:border-white/15 hover:bg-slate-950/80">
    <div className={`mb-4 inline-flex rounded-2xl bg-gradient-to-br ${accent} p-3 text-white shadow-lg shadow-slate-950/20`}>
      <Icon size={18} />
    </div>
    <p className="text-sm text-slate-400">{label}</p>
    <h3 className="mt-2 text-3xl font-semibold text-white">{value}</h3>
    <p className="mt-2 text-sm leading-6 text-slate-400">{detail}</p>
  </div>
);

export const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-center">
    <p className="text-[10px] uppercase tracking-[0.24em] text-slate-500">{label}</p>
    <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
  </div>
);

export const MiniPill = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl border border-white/5 bg-white/[0.04] px-3 py-3">
    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-semibold text-white">{value}</p>
  </div>
);

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-sm text-slate-300">{children}</span>
);

export const InsightCard = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
    <p className="font-medium text-white">{title}</p>
    <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
  </div>
);

export const ChecklistItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.04] p-4">
    {done ? <CheckCircle2 size={18} className="text-emerald-400" /> : <Circle size={18} className="text-slate-500" />}
    <span className={done ? 'text-white' : 'text-slate-300'}>{label}</span>
  </div>
);

export const ActionItem = ({ done, label }: { done: boolean; label: string }) => (
  <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.04] p-3 text-sm text-slate-300">
    {done ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Circle size={16} className="text-slate-500" />}
    <span>{label}</span>
  </div>
);

export const ReviewQueueCard = ({ item }: { item: StudyReviewItem }) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
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

export const SidebarContent = ({ currentView, onChangeView, source, recommendation }: { currentView: StudyViewKey; onChangeView: (view: StudyViewKey) => void; source: 'supabase' | 'local'; recommendation: string }) => (
  <div className="flex h-full flex-col">
    <div className="mb-8 rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.28),transparent_45%),rgba(15,23,42,0.75)] p-5">
      <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-900/30">
        <Home size={24} />
      </div>
      <h2 className="mt-4 text-2xl font-semibold text-white">Concurso Mentor</h2>
      <p className="mt-2 text-sm leading-6 text-slate-300">Questões, revisão temporal, analytics por tópico e discursiva em um fluxo premium e direto.</p>
    </div>

    <nav className="space-y-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = currentView === item.key;
        return (
          <button key={item.key} onClick={() => onChangeView(item.key)} className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${active ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white shadow-lg shadow-indigo-900/30' : 'text-slate-300 hover:bg-white/5'}`}>
            <Icon size={18} />
            <span className="font-medium">{item.label}</span>
          </button>
        );
      })}
    </nav>

    <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-center gap-3">
        <Star className="text-amber-300" size={18} />
        <p className="font-medium text-white">Brief do ciclo</p>
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-300">• Próxima disciplina: {recommendation}<br />• Revisão temporal automática<br />• Discursiva com autosave</p>
    </div>

    <div className="mt-auto rounded-3xl border border-emerald-400/20 bg-emerald-500/10 p-5">
      <p className="font-medium text-white">Persistência</p>
      <p className="mt-2 text-sm text-slate-300">{source === 'supabase' ? 'Supabase ativo' : 'Fallback local ativo'}.</p>
    </div>
  </div>
);

export const EmptyStateCard = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-3xl border border-dashed border-white/10 p-6 text-sm text-slate-400">{children}</div>
);

export const shell = shellStyles;
