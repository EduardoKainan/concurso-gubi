# AdRoi Concurso MVP

## Rodar localmente

- `npm install`
- copie `.env.example` para `.env.local`
- `npm run dev`

## Variáveis

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Persistência

- O app tenta ler o banco de questões do Supabase nas tabelas `study_subjects`, `study_topics` e `study_questions`
- O progresso continua sendo salvo em `study_attempts` e `study_progress_summaries`
- Se as tabelas não existirem ou o acesso falhar, cai automaticamente para `localStorage` + seed local
- Scripts SQL:
  - `supabase/study_content_setup.sql` → matérias, tópicos e 50 questões
  - `supabase/study_progress_setup.sql` → tentativas e resumo de progresso
- Para regenerar o seed SQL a partir de `data/studySeed.ts`: `node scripts/generateStudyContentSql.mjs`
