import React from 'react';
import { BookOpen, FileQuestion, FileText, LayoutDashboard, TrendingUp } from 'lucide-react';
import { StudyViewKey } from '../../types';

export const navItems: { key: StudyViewKey; label: string; shortLabel: string; icon: React.ComponentType<any> }[] = [
  { key: 'dashboard', label: 'Dashboard', shortLabel: 'Início', icon: LayoutDashboard },
  { key: 'questoes', label: 'Questões', shortLabel: 'Questões', icon: FileQuestion },
  { key: 'plano', label: 'Plano de estudos', shortLabel: 'Plano', icon: BookOpen },
  { key: 'evolucao', label: 'Evolução', shortLabel: 'Evolução', icon: TrendingUp },
  { key: 'discursivas', label: 'Discursivas', shortLabel: 'Texto', icon: FileText },
];

export const shellStyles = {
  app: 'min-h-screen bg-[#050816] text-slate-100',
  panel: 'rounded-[28px] border border-white/10 bg-white/[0.055] shadow-[0_20px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl',
  panelStrong: 'rounded-[30px] border border-white/10 bg-slate-950/70 shadow-[0_24px_90px_rgba(2,6,23,0.55)] backdrop-blur-2xl',
  pagePadding: 'px-4 sm:px-6 lg:px-8',
  input: 'min-h-[48px] w-full rounded-2xl border border-white/10 bg-slate-950/75 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300/40 focus:bg-slate-950/90',
  ghostButton: 'rounded-2xl border border-white/10 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/5 active:scale-[0.99]',
  primaryButton: 'rounded-2xl bg-gradient-to-r from-indigo-500 to-cyan-400 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/30 transition hover:from-indigo-400 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-60',
};
