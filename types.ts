
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  CLIENT = 'client'
}

export interface Organization {
  id: string;
  name: string;
  slug?: string;
  created_at: string;
  meta_api_token?: string;
}

export interface UserProfile {
  id: string;
  organization_id: string;
  role: 'super_admin' | 'admin' | 'manager' | 'client';
  full_name?: string;
  email?: string;
}

export interface OrganizationInvite {
  id: string;
  organization_id: string;
  email: string;
  role: 'admin' | 'manager';
  created_at: string;
  status: 'pending' | 'accepted';
}

export interface AdminOrgMetric {
  id: string;
  name: string;
  created_at: string;
  total_users: number;
  total_clients: number;
  total_projects: number;
  status: 'active' | 'inactive';
}

export interface AdminUserMetric {
  id: string;
  email: string;
  full_name: string;
  role: string;
  organization_name: string;
  last_sign_in?: string;
}

export interface Client {
  id: string;
  organization_id?: string;
  name: string;
  company: string;
  email?: string;
  ad_account_id?: string;
  status: 'active' | 'churned' | 'paused';
  total_spend: number;
  total_revenue: number;
  total_leads?: number;
  roas: number;
  roi: number;
  last_updated: string;
  created_at?: string;
  target_roas?: number;
  target_cpa?: number;
  budget_limit?: number;
  crm_enabled?: boolean;
  current_balance?: number;
  is_prepaid?: boolean;
}

export interface ClientNote {
  id: string;
  client_id: string;
  organization_id?: string;
  title: string;
  content: string;
  date: string;
  created_at?: string;
  is_pinned?: boolean;
}

export interface Insight {
  id?: string;
  organization_id?: string;
  type: 'critical' | 'opportunity' | 'warning' | 'info';
  title: string;
  description: string;
  recommendation: string;
  created_at?: string;
}

export interface CommercialActivity {
  id: string;
  client_id: string;
  organization_id?: string;
  type: 'meeting' | 'proposal';
  date: string;
  prospect_name?: string;
  value?: number;
  notes?: string;
  quantity?: number;
  lead_quality_score?: number;
  created_at?: string;
}

export interface Campaign {
  id: string;
  organization_id?: string;
  name: string;
  status: 'ACTIVE' | 'PAUSED' | 'ARCHIVED';
  objective: string;
  spend: number;
  revenue: number;
  leads: number;
  purchases: number;
  roas: number;
  impressions: number;
  clicks: number;
}

export interface Contract {
  id: string;
  organization_id?: string;
  client_id: string;
  type: 'fixed' | 'commission' | 'hybrid';
  monthly_value: number;
  commission_percent: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  days_remaining?: number;
}

export interface DailyMetric {
  date: string;
  spend: number;
  revenue: number;
  leads: number;
  roas: number;
}

export interface Deal {
  id: string;
  organization_id?: string;
  client_id: string;
  date: string;
  description: string;
  quantity: number;
  unit_value: number;
  total_value: number;
  created_at: string;
}

export type TaskCategory = 'do_now' | 'schedule' | 'delegate' | 'delete';

export interface Task {
  id: string;
  organization_id?: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: TaskCategory;
  durationMinutes?: number;
  projectId?: string;
  dueDate?: string;
  clientId?: string;
  clientName?: string;
}

export interface Project {
  id: string;
  organization_id?: string;
  title: string;
  status: 'active' | 'paused' | 'completed';
  progress: number;
  deadline?: string;
}

export interface Goal {
  id: string;
  organization_id?: string;
  title: string;
  status: 'on_track' | 'at_risk' | 'completed';
}

export type ViewState = 'DASHBOARD' | 'CLIENT_DETAIL' | 'SETTINGS' | 'TASKS' | 'HELP' | 'SUPER_ADMIN' | 'REPORTS';

export type StudyViewKey = 'dashboard' | 'questoes' | 'plano' | 'evolucao' | 'discursivas';
export type StudyQuestionLevel = 'Fácil' | 'Médio' | 'Difícil';
export type StudyReviewStage = '24h' | '7d' | '14d';
export type StudyRecommendationPriority = 'alta' | 'media' | 'baixa';

export interface StudyQuestionItem {
  id: number;
  subject: string;
  topic: string;
  level: StudyQuestionLevel;
  statement: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudyPlanDay {
  day: string;
  focus: string;
  goal: string;
  duration: string;
  status: 'done' | 'today' | 'next';
}

export interface StudyPriorityTrailItem {
  id: string;
  subject: string;
  topic: string;
  reason: string;
  action: string;
  targetQuestions: number;
  difficultyFocus: StudyQuestionLevel | 'Misto';
  priority: 'alta' | 'media';
}

export interface StudyAttempt {
  id: string;
  question_id: number;
  subject: string;
  topic: string;
  selected_option: number;
  is_correct: boolean;
  attempted_at: string;
}

export interface StudyErrorInsight {
  topic: string;
  subject: string;
  totalErrors: number;
  totalAttempts: number;
  accuracy: number;
  lastAttemptAt?: string;
}

export interface StudySubjectProgress {
  subject: string;
  progress: number;
  streak: number;
  accuracy: number;
  pendingReviews: number;
  attempts: number;
  correct: number;
  wrong: number;
  totalQuestions: number;
  lastAttemptAt?: string;
  studyMomentum: number;
}

export interface StudyTopicPerformance {
  subject: string;
  topic: string;
  attempts: number;
  correct: number;
  errors: number;
  accuracy: number;
  averageResponseLabel: 'forte' | 'atenção' | 'crítico';
  lastAttemptAt?: string;
}

export interface StudyReviewItem {
  id: string;
  questionId: number;
  subject: string;
  topic: string;
  stage: StudyReviewStage;
  dueAt: string;
  errorCount: number;
  lastAttemptAt: string;
  status: 'overdue' | 'due_soon' | 'scheduled';
}

export interface StudyRecommendation {
  title: string;
  reason: string;
  subject: string;
  topic: string;
  targetQuestions: number;
  reviewCount: number;
  estimatedMinutes: number;
  focusMode: 'revisao' | 'questoes' | 'misto';
  priority: StudyRecommendationPriority;
}

export interface StudySummary {
  totalAttempts: number;
  totalCorrect: number;
  accuracy: number;
  currentStreak: number;
  pendingReviews: number;
  completedToday: number;
  simulatedExams: number;
  weeklyGoal: number;
  lastAttemptAt?: string;
  weakSubjects: string[];
  dueReviews: number;
}

export interface StudyEssayPrompt {
  id: string;
  title: string;
  subject: string;
  topic: string;
  prompt: string;
  structure: string[];
  evaluationCriteria: string[];
}

export interface StudyEssayDidacticStep {
  title: string;
  explanation: string;
  bullets: string[];
}

export interface StudyEssayDidacticResponse {
  provider: 'gemini' | 'local';
  generatedAt: string;
  interpretation: string;
  thesis: string;
  arguments: string[];
  suggestedStructure: string[];
  modelAnswer: string;
  studyTips: string[];
  steps: StudyEssayDidacticStep[];
}

export interface StudyEssayEntry {
  id: string;
  promptId: string;
  title: string;
  subject: string;
  topic: string;
  answer: string;
  createdAt: string;
  updatedAt?: string;
  wordCount: number;
  score?: number;
  status: 'draft' | 'finished';
  feedback?: string[];
  didacticResponse?: StudyEssayDidacticResponse;
}

export interface StudyEssayDraft {
  promptId: string;
  answer: string;
  updatedAt: string;
  wordCount: number;
}

export interface StudyDashboardData {
  source: 'supabase' | 'local';
  attempts: StudyAttempt[];
  summary: StudySummary;
  subjectProgress: StudySubjectProgress[];
  errorInsights: StudyErrorInsight[];
  topicPerformance: StudyTopicPerformance[];
  reviewQueue: StudyReviewItem[];
  recommendation: StudyRecommendation;
}
