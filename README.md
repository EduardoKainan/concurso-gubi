# AdRoi Concurso MVP

## Rodar localmente

- `npm install`
- copie `.env.example` para `.env.local`
- `npm run dev`

## Variáveis

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Persistência

- O app tenta ler/gravar no Supabase nas tabelas `study_attempts` e `study_progress_summaries`
- Se as tabelas não existirem ou o acesso falhar, cai automaticamente para `localStorage`
- Script sugerido para criar as tabelas: `supabase/study_progress_setup.sql`
