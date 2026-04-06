# Instituto Verbena/UFG, padrão de cobrança e seed inicial

## 1) Base do edital, Analista Administrativo, Senador Canedo

Fonte oficial do edital consolidado:
- https://sistemas.institutoverbena.ufg.br/2025/prefeitura-senador-canedo/sistema/arquivos/anexos/EDITAL_CONSOLIDADO_SENADOR_CANEDO_EC1-2026_1.pdf
- Página do concurso: https://sistemas.institutoverbena.ufg.br/2025/prefeitura-senador-canedo/

### Estrutura da prova objetiva, Grupo II, nível superior geral
Para Analista Administrativo, o edital distribui:
- Língua Portuguesa: 10 questões, peso 1
- Raciocínio Lógico-Matemático: 5 questões, peso 1
- Noções de Informática: 5 questões, peso 1
- Legislação aplicada ao Setor Público: 10 questões, peso 2
- Conhecimentos Específicos: 20 questões, peso 3
- Total: 50 questões

### Conteúdo programático extraído do edital para o cargo
#### Legislação aplicada ao Setor Público
- CF/88, Administração Pública, seções I e II
- Ética no setor público
- Noções de Direito Administrativo
- Princípios, poderes, atos, processo administrativo, controle e responsabilização
- Lei nº 14.133/2021
- Lei nº 13.019/2014
- Improbidade Administrativa
- PPA, LDO e LOA
- Controle interno e externo
- LAI
- LGPD
- Lei Orgânica do Município de Senador Canedo
- Lei nº 1.488/2010, servidores municipais

#### Conhecimentos específicos, Analista Administrativo
- Administração Pública
- Regime jurídico-administrativo, LINDB, princípios e poderes
- Planejamento, organização, direção e controle
- Gestão estratégica
- Serviços públicos
- Organização setorial e gestão de processos
- Atos administrativos
- Administração Indireta
- Órgãos Públicos
- Responsabilidade civil do Estado
- Bens públicos
- Excelência e qualidade no serviço público
- Controle da Administração Pública
- Orçamento público
- Governança, governabilidade e accountability
- Mecanismos e órgãos de controle interno e externo
- Lei nº 14.133/2021
- Lei nº 13.019/2014
- Lei Orgânica do Município de Senador Canedo

## 2) Padrão de cobrança observado na banca Instituto Verbena/UFG

### Fontes oficiais analisadas
- TAE UFG 2025, Administrador:
  - Prova: https://sistemas.institutoverbena.ufg.br/2025/concurso-tae-ufg/sistema/provas_gabaritos/prova/Administrador.pdf
  - Página de provas: https://sistemas.institutoverbena.ufg.br/2025/concurso-tae-ufg/sistema/provas_gabaritos/Provas_gabaritos_preliminares%20TAE_UFG_2025.html
- Câmara de Anápolis 2024, Analista Administrativo, Administração:
  - Prova: https://sistemas.institutoverbena.ufg.br/2023/concurso-camara-anapolis/sistema/provas_gabaritos/prova/CADERNO%20DE%20PROVA_Analista%20Administrativo%20_%20Administracao_Superior%20_%20Camara%20de%20Anapolis.pdf
  - Página de provas: https://sistemas.institutoverbena.ufg.br/2023/concurso-camara-anapolis/sistema/provas_gabaritos/Provas_gabaritos_preliminares%20CAMARA_ANAPOLIS.html

### Traços recorrentes do estilo
- Múltipla escolha com 4 alternativas
- Distribuição rígida por blocos de disciplina
- Português com textos curtos e médios, geralmente adaptados de portais jornalísticos ou textos de divulgação
- Português cobra interpretação, semântica, valor de expressões, concordância, regência e sintaxe de forma direta
- Raciocínio costuma mesclar lógica proposicional, porcentagem, probabilidade, sequências e problemas aritméticos cotidianos
- Informática cobra uso prático de Windows, Office, atalhos e segurança digital, com formulações objetivas
- Legislação e Administrativo combinam literalidade moderada da norma com aplicação prática em cenário organizacional
- Itens tendem a ser curtos, com enunciado limpo e uma única habilidade central por questão
- Nível predominante: fácil a médio, com algumas questões médias/difíceis em lógica e específicos

### Inferências úteis para o app
- Vale priorizar treino por microtema, com blocos curtos de 5 a 10 itens
- Explicações devem ser objetivas, porque o estilo da banca é pouco discursivo na objetiva
- Questões inéditas precisam parecer “secas”, sem floreio desnecessário
- Em Direito/Administração, funciona bem alternar questão conceitual e questão de aplicação administrativa

## 3) O que foi criado no projeto
- `data/studySeed.ts`
  - seed inicial de disciplinas/tópicos do edital
  - plano semanal alinhado ao cargo
  - 15 questões inéditas no estilo Verbena/UFG
  - seed de progresso por disciplina
- Integração do frontend para usar esse seed como base

## 4) Próximos passos recomendados
- Subir banco de questões em Supabase com tabelas `subjects`, `topics`, `questions`, `question_options`
- Adicionar filtro por disciplina e dificuldade na tela de questões
- Criar mais 35 questões para fechar um simulado inicial de 50 itens
- Separar especificamente legislação local de Senador Canedo em trilha própria
