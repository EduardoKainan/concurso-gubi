import { StudyEssayPrompt, StudyPlanDay, StudyPriorityTrailItem, StudyQuestionItem, StudySubjectProgress, StudySummary } from '../types';

export const studyQuestions: StudyQuestionItem[] = [
  {
    id: 101,
    subject: 'Administração Pública',
    topic: 'Planejamento, organização, direção e controle',
    level: 'Médio',
    statement: 'Em uma secretaria municipal, o gestor definiu metas trimestrais, distribuiu tarefas entre equipes, acompanhou indicadores e corrigiu desvios de execução. As ações descritas correspondem, respectivamente, às funções administrativas de',
    options: [
      'planejamento, organização, direção e controle.',
      'organização, planejamento, comando e avaliação.',
      'previsão, liderança, execução e auditoria.',
      'coordenação, direção, comando e responsabilização.'
    ],
    correctIndex: 0,
    explanation: 'O enunciado segue a sequência clássica das funções administrativas: planejar metas, organizar recursos, dirigir pessoas e controlar resultados.',
  },
  {
    id: 102,
    subject: 'Administração Pública',
    topic: 'Gestão por processos',
    level: 'Médio',
    statement: 'Ao mapear o fluxo de atendimento ao cidadão, a equipe identificou retrabalho, gargalos e etapas sem valor agregado. A medida mais aderente à gestão por processos é',
    options: [
      'substituir o fluxo atual por decisões informais das chefias.',
      'eliminar a necessidade de indicadores para ganhar agilidade.',
      'redesenhar o processo com foco em padronização, eficiência e entrega ao usuário.',
      'aumentar o número de assinaturas obrigatórias em todas as etapas.'
    ],
    correctIndex: 2,
    explanation: 'Na gestão por processos, o foco está em fluxo, melhoria contínua, eliminação de desperdícios e geração de valor ao usuário final.',
  },
  {
    id: 103,
    subject: 'Administração Pública',
    topic: 'Governança e accountability',
    level: 'Difícil',
    statement: 'No setor público, a accountability está diretamente relacionada à',
    options: [
      'dispensa de prestação de contas quando há delegação de competência.',
      'autonomia absoluta do gestor para decidir sem controle externo.',
      'obrigação de prestar contas, justificar resultados e sujeitar-se à responsabilização.',
      'substituição dos controles institucionais por confiança pessoal na chefia.'
    ],
    correctIndex: 2,
    explanation: 'Accountability envolve transparência, prestação de contas e possibilidade de responsabilização pelos atos e resultados da gestão.',
  },
  {
    id: 104,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'Quando a administração divulga critérios objetivos para seleção de fornecedores e veda favorecimentos pessoais, ela concretiza principalmente os princípios da',
    options: [
      'moralidade e impessoalidade.',
      'publicidade e supremacia privada.',
      'discricionariedade e autotutela.',
      'hierarquia e especialidade.'
    ],
    correctIndex: 0,
    explanation: 'A vedação de favorecimentos pessoais se conecta à impessoalidade, enquanto a conduta ética e proba se relaciona à moralidade administrativa.',
  },
  {
    id: 105,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'Um servidor praticou ato administrativo com finalidade diversa da prevista em lei, embora formalmente competente. Nessa hipótese, o vício recai sobre o elemento',
    options: [
      'forma.',
      'motivo.',
      'objeto.',
      'finalidade.'
    ],
    correctIndex: 3,
    explanation: 'Desvio de finalidade ocorre quando o agente busca fim diverso do previsto em lei, comprometendo o elemento finalidade do ato administrativo.',
  },
  {
    id: 106,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Difícil',
    statement: 'De acordo com a lógica da Lei nº 14.133/2021, a fase preparatória da contratação deve',
    options: [
      'ser dispensada quando o objeto for rotineiro.',
      'concentrar estudos técnicos, definição da necessidade e planejamento da contratação.',
      'ocorrer apenas após a assinatura do contrato administrativo.',
      'limitar-se à indicação verbal do setor requisitante.'
    ],
    correctIndex: 1,
    explanation: 'A nova lei reforça o planejamento como eixo da contratação pública, incluindo estudos técnicos, gestão de riscos e definição adequada do objeto.',
  },
  {
    id: 107,
    subject: 'Português',
    topic: 'Sentido vocabular no contexto',
    level: 'Fácil',
    statement: 'No período “a revisão cuidadosa evita retrabalho”, o verbo “evita” expressa ideia de',
    options: [
      'causa.',
      'prevenção.',
      'comparação.',
      'concessão.'
    ],
    correctIndex: 1,
    explanation: 'No contexto, “evitar” significa impedir previamente ou prevenir a ocorrência de algo.',
  },
  {
    id: 108,
    subject: 'Português',
    topic: 'Concordância verbal',
    level: 'Médio',
    statement: 'Assinale a alternativa em que a concordância verbal está de acordo com a norma-padrão.',
    options: [
      'Houveram atrasos na entrega dos relatórios finais.',
      'Fazem dois anos que o setor utiliza esse sistema.',
      'Existe medidas simples para reduzir falhas operacionais.',
      'Deve haver soluções viáveis para o problema apresentado.'
    ],
    correctIndex: 3,
    explanation: 'Com o verbo “haver” no sentido de existir, a construção correta é impessoal. Na locução, mantém-se “deve haver”.',
  },
  {
    id: 109,
    subject: 'Português',
    topic: 'Orações subordinadas',
    level: 'Difícil',
    statement: 'No trecho “A equipe confirmou que o cronograma precisaria ser revisto”, a oração destacada exerce função de',
    options: [
      'adjunto adnominal.',
      'objeto direto.',
      'predicativo do sujeito.',
      'aposto explicativo.'
    ],
    correctIndex: 1,
    explanation: 'A oração introduzida por “que” completa o sentido do verbo “confirmou”, funcionando como oração subordinada substantiva objetiva direta.',
  },
  {
    id: 110,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Fácil',
    statement: 'No Microsoft Excel, para somar os valores contidos nas células B2 até B10, a fórmula correta é',
    options: [
      '=SOMA(B2:B10)',
      '=SOMAR(B2;B10)',
      '=MEDIA(B2:B10)',
      '=ADICAO(B2..B10)'
    ],
    correctIndex: 0,
    explanation: 'Em Excel em português, a função padrão para soma é =SOMA(intervalo).',
  },
  {
    id: 111,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Médio',
    statement: 'Ao utilizar o Explorador de Arquivos no Windows, o usuário deseja renomear rapidamente um arquivo já selecionado, sem abrir menus contextuais. O atalho mais usual para essa ação é',
    options: [
      'F2.',
      'F5.',
      'Ctrl+R.',
      'Alt+F4.'
    ],
    correctIndex: 0,
    explanation: 'No Windows, F2 é o atalho tradicional para renomear o item selecionado.',
  },
  {
    id: 112,
    subject: 'Informática',
    topic: 'Correio eletrônico e boas práticas',
    level: 'Médio',
    statement: 'Em ambiente corporativo, uma boa prática de segurança no uso de e-mail é',
    options: [
      'abrir anexos de remetentes desconhecidos para verificar o conteúdo.',
      'reutilizar a mesma senha em serviços diferentes para facilitar o acesso.',
      'confirmar links suspeitos e remetentes antes de clicar ou baixar arquivos.',
      'desativar filtros antispam para evitar bloqueio de mensagens legítimas.'
    ],
    correctIndex: 2,
    explanation: 'A conferência de remetente, link e contexto da mensagem reduz risco de phishing e instalação de arquivos maliciosos.',
  },
  {
    id: 113,
    subject: 'Raciocínio Lógico',
    topic: 'Negação de condicional',
    level: 'Médio',
    statement: 'A negação da proposição “Se o processo foi instruído corretamente, então o pagamento será liberado” é',
    options: [
      'O processo foi instruído corretamente e o pagamento não será liberado.',
      'O processo não foi instruído corretamente e o pagamento será liberado.',
      'Se o pagamento não for liberado, então o processo não foi instruído corretamente.',
      'O processo foi instruído corretamente ou o pagamento não será liberado.'
    ],
    correctIndex: 0,
    explanation: 'A negação de uma condicional p → q é p e não q.',
  },
  {
    id: 114,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem',
    level: 'Fácil',
    statement: 'Um servidor executou 18 de 24 tarefas previstas para a semana. O percentual de tarefas concluídas foi de',
    options: [
      '65%.',
      '70%.',
      '75%.',
      '80%.'
    ],
    correctIndex: 2,
    explanation: '18 ÷ 24 = 0,75, o que corresponde a 75%.',
  },
  {
    id: 115,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências',
    level: 'Difícil',
    statement: 'Observe a sequência numérica: 3, 8, 18, 38, ... Mantido o padrão, o próximo termo é',
    options: [
      '68.',
      '76.',
      '78.',
      '80.'
    ],
    correctIndex: 2,
    explanation: 'A sequência dobra o termo anterior e soma 2: 3→8, 8→18, 18→38, então 38×2+2 = 78.',
  },
  {
    id: 116,
    subject: 'Administração Pública',
    topic: 'Gestão estratégica',
    level: 'Médio',
    statement: 'Em um órgão municipal, a definição de objetivos de longo prazo, indicadores e iniciativas prioritárias está mais diretamente relacionada ao conceito de',
    options: [
      'planejamento estratégico.',
      'controle corretivo.',
      'departamentalização funcional.',
      'descentralização patrimonial.'
    ],
    correctIndex: 0,
    explanation: 'Planejamento estratégico orienta objetivos de longo prazo, prioridades institucionais e indicadores de acompanhamento.',
  },
  {
    id: 117,
    subject: 'Administração Pública',
    topic: 'Estrutura organizacional',
    level: 'Fácil',
    statement: 'A divisão do trabalho por áreas como finanças, compras e recursos humanos caracteriza a departamentalização',
    options: [
      'por produto.',
      'funcional.',
      'geográfica.',
      'por clientela.'
    ],
    correctIndex: 1,
    explanation: 'Na departamentalização funcional, as unidades são agrupadas segundo funções ou especialidades semelhantes.',
  },
  {
    id: 118,
    subject: 'Administração Pública',
    topic: 'Qualidade no serviço público',
    level: 'Médio',
    statement: 'Uma prática coerente com a gestão da qualidade no serviço público é',
    options: [
      'avaliar resultados apenas pela percepção da chefia imediata.',
      'padronizar rotinas, monitorar falhas e buscar melhoria contínua.',
      'eliminar canais de feedback para reduzir demandas do usuário.',
      'substituir indicadores por decisões exclusivamente intuitivas.'
    ],
    correctIndex: 1,
    explanation: 'Qualidade envolve padronização, acompanhamento de desempenho, foco no usuário e melhoria contínua.',
  },
  {
    id: 119,
    subject: 'Administração Pública',
    topic: 'Tipos de planejamento',
    level: 'Médio',
    statement: 'O planejamento tático distingue-se do estratégico porque, em regra,',
    options: [
      'abrange toda a organização e horizonte mais amplo.',
      'traduz diretrizes gerais em metas setoriais de médio prazo.',
      'se restringe a rotinas diárias e tarefas operacionais.',
      'dispensa definição de recursos e responsáveis.'
    ],
    correctIndex: 1,
    explanation: 'O planejamento tático converte diretrizes estratégicas em ações e metas das áreas ou unidades.',
  },
  {
    id: 120,
    subject: 'Administração Pública',
    topic: 'Governabilidade e governança',
    level: 'Difícil',
    statement: 'Em análise organizacional, governança pública e governabilidade diferenciam-se porque a primeira enfatiza',
    options: [
      'mecanismos de direção, controle e integridade, enquanto a segunda se relaciona à capacidade política de implementar decisões.',
      'a hierarquia informal, enquanto a segunda trata exclusivamente de orçamento.',
      'a execução rotineira de tarefas, enquanto a segunda cuida apenas de tecnologia.',
      'a autonomia privada, enquanto a segunda elimina controles institucionais.'
    ],
    correctIndex: 0,
    explanation: 'Governança trata de estruturas, controles e direção institucional; governabilidade liga-se à capacidade de articulação e implementação.',
  },
  {
    id: 121,
    subject: 'Administração Pública',
    topic: 'Serviços públicos',
    level: 'Médio',
    statement: 'Ao reorganizar o atendimento presencial para reduzir filas e ampliar o acesso do cidadão, a administração atua com foco principal na',
    options: [
      'continuidade e adequação do serviço público.',
      'supremacia do interesse do servidor.',
      'revogação automática de atos administrativos.',
      'privatização compulsória da atividade administrativa.'
    ],
    correctIndex: 0,
    explanation: 'A melhoria do atendimento e do acesso do usuário está ligada à adequada prestação e continuidade dos serviços públicos.',
  },
  {
    id: 122,
    subject: 'Administração Pública',
    topic: 'Indicadores de desempenho',
    level: 'Médio',
    statement: 'Um indicador que mede o percentual de processos concluídos dentro do prazo legal avalia principalmente',
    options: [
      'tempestividade.',
      'amplitude hierárquica.',
      'centralização.',
      'especialização vertical.'
    ],
    correctIndex: 0,
    explanation: 'Tempestividade refere-se ao cumprimento de prazos e à entrega oportuna dos resultados.',
  },
  {
    id: 123,
    subject: 'Administração Pública',
    topic: 'Liderança e direção',
    level: 'Fácil',
    statement: 'No exercício da função de direção, o gestor público atua principalmente ao',
    options: [
      'motivar equipes, orientar execução e comunicar prioridades.',
      'definir apenas a estrutura formal do órgão.',
      'substituir o controle por confiança irrestrita.',
      'eliminar a necessidade de metas institucionais.'
    ],
    correctIndex: 0,
    explanation: 'Direção envolve liderança, comunicação, orientação das pessoas e alinhamento da execução às metas.',
  },
  {
    id: 124,
    subject: 'Administração Pública',
    topic: 'Mapeamento de processos',
    level: 'Difícil',
    statement: 'Em um redesenho de processo, a identificação de entradas, atividades, saídas e responsáveis permite principalmente',
    options: [
      'formalizar gargalos como etapa obrigatória.',
      'visualizar o fluxo de trabalho e atacar pontos críticos com maior precisão.',
      'eliminar a necessidade de padronização documental.',
      'substituir metas por relatos subjetivos dos usuários.'
    ],
    correctIndex: 1,
    explanation: 'O mapeamento explicita o fluxo e facilita detectar gargalos, responsabilidades e oportunidades de melhoria.',
  },
  {
    id: 125,
    subject: 'Administração Pública',
    topic: 'Controle administrativo',
    level: 'Médio',
    statement: 'Quando a chefia compara o resultado alcançado com a meta prevista e adota ações corretivas, está exercendo a função de',
    options: [
      'organização.',
      'controle.',
      'previsão normativa.',
      'delegação externa.'
    ],
    correctIndex: 1,
    explanation: 'Controle consiste em medir resultados, comparar com padrões e corrigir desvios.',
  },
  {
    id: 126,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Médio',
    statement: 'A prerrogativa de distribuir e escalonar funções entre órgãos e agentes, supervisionando sua atuação, decorre do poder',
    options: [
      'disciplinar.',
      'regulamentar.',
      'hierárquico.',
      'de polícia.'
    ],
    correctIndex: 2,
    explanation: 'O poder hierárquico permite ordenar, coordenar, delegar, avocar e fiscalizar atividades internas da administração.',
  },
  {
    id: 127,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atributos do ato administrativo',
    level: 'Difícil',
    statement: 'A possibilidade de a administração executar diretamente determinado ato, independentemente de autorização judicial prévia, relaciona-se ao atributo da',
    options: [
      'presunção de legitimidade.',
      'autoexecutoriedade.',
      'tipicidade.',
      'competência.'
    ],
    correctIndex: 1,
    explanation: 'Autoexecutoriedade é a possibilidade de execução direta de certos atos administrativos nos casos admitidos em lei.',
  },
  {
    id: 128,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Anulação e revogação',
    level: 'Médio',
    statement: 'Quando a administração extingue um ato válido por razões de conveniência e oportunidade, ocorre',
    options: [
      'cassação.',
      'anulação.',
      'revogação.',
      'convalidação.'
    ],
    correctIndex: 2,
    explanation: 'Revogação alcança ato válido, por motivo de mérito administrativo; anulação recai sobre ato ilegal.',
  },
  {
    id: 129,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípio da publicidade',
    level: 'Fácil',
    statement: 'O princípio da publicidade, no contexto administrativo, busca assegurar principalmente',
    options: [
      'sigilo como regra geral dos atos públicos.',
      'divulgação e transparência dos atos, ressalvadas hipóteses legais de restrição.',
      'substituição do controle social por controle privado.',
      'dispensa de motivação dos atos discricionários.'
    ],
    correctIndex: 1,
    explanation: 'Publicidade dá transparência à atuação administrativa, admitindo sigilo apenas nas hipóteses legais.',
  },
  {
    id: 130,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Agentes públicos',
    level: 'Médio',
    statement: 'Servidor que causa dano a terceiro no exercício da função pode gerar responsabilidade civil do Estado, assegurado a este o direito de',
    options: [
      'anistia automática.',
      'regresso contra o agente, nos casos cabíveis.',
      'dispensa de apuração administrativa.',
      'renúncia obrigatória ao ressarcimento.'
    ],
    correctIndex: 1,
    explanation: 'O Estado pode responder perante o terceiro e buscar ressarcimento do agente por ação regressiva, quando presentes os requisitos legais.',
  },
  {
    id: 131,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'Na contratação pública, o termo de referência ou projeto básico deve contribuir para',
    options: [
      'descrição precisa do objeto e definição dos requisitos da contratação.',
      'substituição integral do planejamento pela etapa de julgamento.',
      'escolha livre do objeto após a assinatura contratual.',
      'eliminação dos critérios objetivos de execução.'
    ],
    correctIndex: 0,
    explanation: 'Esses instrumentos estruturam a contratação, delimitando objeto, requisitos, critérios e resultados esperados.',
  },
  {
    id: 132,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitação e isonomia',
    level: 'Médio',
    statement: 'É incompatível com a lógica da licitação pública a cláusula que',
    options: [
      'estabelece critérios objetivos de habilitação.',
      'restringe indevidamente a competitividade sem justificativa técnica.',
      'define prazo para apresentação de propostas.',
      'prevê sanções contratuais pelo inadimplemento.'
    ],
    correctIndex: 1,
    explanation: 'A restrição injustificada à competição viola a isonomia e compromete a seleção da proposta mais vantajosa.',
  },
  {
    id: 133,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Controle da Administração',
    level: 'Difícil',
    statement: 'O controle exercido pela própria administração sobre seus atos, para corrigir ilegalidades e rever condutas, caracteriza o controle',
    options: [
      'judicial.',
      'externo legislativo.',
      'administrativo interno.',
      'popular extraordinário.'
    ],
    correctIndex: 2,
    explanation: 'Controle administrativo interno é a autotutela exercida pela própria administração sobre seus atos e agentes.',
  },
  {
    id: 134,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Médio',
    statement: 'Em processo administrativo, a motivação do ato decisório é relevante porque',
    options: [
      'dispensa o contraditório.',
      'expõe as razões da decisão e favorece controle e transparência.',
      'substitui a competência legal do agente.',
      'elimina a necessidade de formalização mínima.'
    ],
    correctIndex: 1,
    explanation: 'A motivação explicita fundamentos de fato e de direito, permitindo controle administrativo, judicial e social.',
  },
  {
    id: 135,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos',
    level: 'Fácil',
    statement: 'São bens de uso comum do povo aqueles destinados',
    options: [
      'ao serviço interno exclusivo da repartição.',
      'à utilização geral pela coletividade, como ruas e praças.',
      'à alienação imediata pelo poder público.',
      'ao patrimônio pessoal do agente público.'
    ],
    correctIndex: 1,
    explanation: 'Bens de uso comum do povo são fruíveis pela coletividade, como ruas, praças e rios, conforme o caso.',
  },
  {
    id: 136,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da licitação',
    level: 'Difícil',
    statement: 'A exigência de critérios objetivos de julgamento nas licitações visa reduzir principalmente',
    options: [
      'a formalização do procedimento.',
      'a discricionariedade arbitrária na escolha da proposta.',
      'a publicidade dos atos administrativos.',
      'a necessidade de planejamento da contratação.'
    ],
    correctIndex: 1,
    explanation: 'Critérios objetivos limitam escolhas arbitrárias e reforçam isonomia, transparência e segurança jurídica.',
  },
  {
    id: 137,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Médio',
    statement: 'No enunciado “A digitalização agilizou o protocolo, mas exigiu treinamento da equipe”, a relação estabelecida pela conjunção “mas” é de',
    options: [
      'adição.',
      'alternância.',
      'oposição.',
      'explicação.'
    ],
    correctIndex: 2,
    explanation: 'A conjunção “mas” introduz ideia de contraste entre a vantagem e a exigência apontadas.',
  },
  {
    id: 138,
    subject: 'Português',
    topic: 'Pontuação',
    level: 'Médio',
    statement: 'Assinale a alternativa em que a pontuação está de acordo com a norma-padrão.',
    options: [
      'Os servidores, analisaram os relatórios antes da reunião.',
      'Quando o sistema caiu os atendimentos foram interrompidos.',
      'A equipe revisou o documento, e enviou a versão final.',
      'Quando o sistema caiu, os atendimentos foram interrompidos.'
    ],
    correctIndex: 3,
    explanation: 'A oração subordinada adverbial deslocada pede vírgula: “Quando o sistema caiu, os atendimentos foram interrompidos”.',
  },
  {
    id: 139,
    subject: 'Português',
    topic: 'Regência verbal',
    level: 'Difícil',
    statement: 'Assinale a alternativa redigida de acordo com a norma-padrão de regência.',
    options: [
      'O servidor assistiu o treinamento sobre licitações.',
      'A chefia informou aos servidores sobre a nova rotina.',
      'A equipe preferiu mais o sistema antigo.',
      'Os candidatos obedeceram o regulamento interno.'
    ],
    correctIndex: 1,
    explanation: '“Informar algo a alguém” está correto. Nas demais, faltam preposição em “assistiu ao” e “obedeceram ao”, e “preferir” não admite “mais”.',
  },
  {
    id: 140,
    subject: 'Português',
    topic: 'Crase',
    level: 'Médio',
    statement: 'Assinale a alternativa em que o uso do acento indicativo de crase está correto.',
    options: [
      'O documento foi entregue à diretora do setor.',
      'Os servidores retornaram à trabalhar cedo.',
      'A reunião ocorrerá de 14h às 16h, e todos irão à pé.',
      'O atendimento ficou sujeito à atrasos frequentes.'
    ],
    correctIndex: 0,
    explanation: 'Há crase correta na fusão de preposição exigida pelo verbo com artigo feminino em “à diretora”.',
  },
  {
    id: 141,
    subject: 'Português',
    topic: 'Concordância nominal',
    level: 'Fácil',
    statement: 'Assinale a alternativa em que a concordância nominal está adequada.',
    options: [
      'Seguem anexo os comprovantes solicitados.',
      'Seguem anexas as planilhas solicitadas.',
      'É proibida entrada de pessoas sem crachá.',
      'Muito obrigadas, disse o servidor ao cidadão.'
    ],
    correctIndex: 1,
    explanation: '“Anexas” concorda com “planilhas”. Em “entrada de pessoas”, a expressão sem determinante costuma ficar invariável: “É proibido entrada...”.',
  },
  {
    id: 142,
    subject: 'Português',
    topic: 'Reescrita',
    level: 'Médio',
    statement: 'A reescrita que preserva o sentido de “Embora houvesse prazo, o setor não concluiu a análise” é',
    options: [
      'Como houvesse prazo, o setor não concluiu a análise.',
      'Ainda que houvesse prazo, o setor não concluiu a análise.',
      'Conforme houvesse prazo, o setor não concluiu a análise.',
      'Porque houvesse prazo, o setor não concluiu a análise.'
    ],
    correctIndex: 1,
    explanation: '“Embora” exprime concessão, assim como “ainda que”.',
  },
  {
    id: 143,
    subject: 'Informática',
    topic: 'Microsoft Word',
    level: 'Fácil',
    statement: 'No Microsoft Word, o atalho mais usual para salvar rapidamente o documento em edição é',
    options: [
      'Ctrl+B.',
      'Ctrl+S.',
      'Ctrl+P.',
      'Ctrl+N.'
    ],
    correctIndex: 1,
    explanation: 'Em atalhos padrão de aplicativos, Ctrl+S salva o arquivo em edição.',
  },
  {
    id: 144,
    subject: 'Informática',
    topic: 'Segurança da informação',
    level: 'Médio',
    statement: 'Uma senha considerada mais segura tende a ser aquela que',
    options: [
      'usa apenas sequência numérica simples e repetida.',
      'combina letras, números e símbolos sem relação óbvia com dados pessoais.',
      'repete o nome do usuário com o ano atual.',
      'é compartilhada entre colegas da mesma equipe para emergências.'
    ],
    correctIndex: 1,
    explanation: 'Senhas fortes combinam complexidade, imprevisibilidade e não devem ser compartilhadas.',
  },
  {
    id: 145,
    subject: 'Informática',
    topic: 'Internet e navegação',
    level: 'Médio',
    statement: 'Ao verificar se um site utiliza conexão criptografada, o usuário deve observar principalmente',
    options: [
      'a presença de HTTPS e do cadeado no navegador.',
      'o tamanho da fonte da página inicial.',
      'a quantidade de imagens no topo do site.',
      'a existência de janelas pop-up promocionais.'
    ],
    correctIndex: 0,
    explanation: 'HTTPS e o cadeado indicam uso de conexão criptografada, embora não eliminem outros cuidados de segurança.',
  },
  {
    id: 146,
    subject: 'Informática',
    topic: 'Compactação e backup',
    level: 'Difícil',
    statement: 'A compactação de arquivos é útil principalmente para',
    options: [
      'eliminar a necessidade de cópia de segurança.',
      'reduzir espaço ocupado e facilitar armazenamento ou envio.',
      'substituir softwares antivírus.',
      'garantir, por si só, a integridade permanente dos dados.'
    ],
    correctIndex: 1,
    explanation: 'Compactar reduz tamanho e facilita transferência, mas não substitui backup nem outras medidas de segurança.',
  },
  {
    id: 147,
    subject: 'Raciocínio Lógico',
    topic: 'Equivalência lógica',
    level: 'Difícil',
    statement: 'A proposição “Se o relatório foi revisado, então não há erro material” é logicamente equivalente a',
    options: [
      'Se há erro material, então o relatório foi revisado.',
      'Se há erro material, então o relatório não foi revisado.',
      'O relatório foi revisado e há erro material.',
      'O relatório não foi revisado ou não há erro material.'
    ],
    correctIndex: 3,
    explanation: 'A condicional p → q é equivalente a ~p ou q. Aqui: “não foi revisado ou não há erro material”.',
  },
  {
    id: 148,
    subject: 'Raciocínio Lógico',
    topic: 'Razão e proporção',
    level: 'Médio',
    statement: 'Em um setor, a razão entre processos concluídos e pendentes é de 5 para 3. Se há 40 processos concluídos, o número de pendentes é',
    options: [
      '18.',
      '20.',
      '24.',
      '25.'
    ],
    correctIndex: 2,
    explanation: 'Se 5 partes correspondem a 40, cada parte vale 8. Logo, 3 partes correspondem a 24.',
  },
  {
    id: 149,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Fácil',
    statement: 'Uma equipe arquivou 12 processos pela manhã e 18 à tarde. O total arquivado no dia foi de',
    options: [
      '28.',
      '30.',
      '32.',
      '36.'
    ],
    correctIndex: 1,
    explanation: '12 + 18 = 30 processos.',
  },
  {
    id: 150,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem',
    level: 'Médio',
    statement: 'O orçamento de um setor passou de R$ 20.000 para R$ 23.000. O aumento percentual foi de',
    options: [
      '10%.',
      '12%.',
      '15%.',
      '20%.'
    ],
    correctIndex: 2,
    explanation: 'O aumento foi de R$ 3.000. Como 3.000/20.000 = 0,15, o acréscimo foi de 15%.',
  },
  {
    id: 151,
    subject: 'Administração Pública',
    topic: 'Tomada de decisão',
    level: 'Médio',
    statement: 'Ao comparar alternativas, riscos e impacto sobre o cidadão antes de escolher uma medida administrativa, o gestor pratica',
    options: [
      'centralização patrimonial.',
      'processo decisório racional.',
      'mero controle burocrático.',
      'revogação tácita.'
    ],
    correctIndex: 1,
    explanation: 'O processo decisório racional envolve levantamento de alternativas, critérios, riscos e consequências.',
  },
  {
    id: 152,
    subject: 'Administração Pública',
    topic: 'Gestão de pessoas no setor público',
    level: 'Fácil',
    statement: 'Uma medida coerente com gestão de pessoas é',
    options: [
      'ignorar feedback da equipe.',
      'alinhar metas, capacitação e avaliação de desempenho.',
      'substituir treinamento por ordens verbais.',
      'eliminar comunicação interna.'
    ],
    correctIndex: 1,
    explanation: 'Gestão de pessoas exige alinhamento de objetivos, desenvolvimento e acompanhamento de desempenho.',
  },
  {
    id: 153,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Difícil',
    statement: 'A responsabilidade objetiva do Estado, em regra, exige demonstração de',
    options: [
      'culpa exclusiva do agente.',
      'dano e nexo causal.',
      'dolo da administração.',
      'sentença penal condenatória.'
    ],
    correctIndex: 1,
    explanation: 'Na responsabilidade objetiva, em regra, importa comprovar dano e nexo causal entre atuação estatal e prejuízo.',
  },
  {
    id: 154,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo licitatório',
    level: 'Médio',
    statement: 'A fase de julgamento das propostas deve respeitar sobretudo',
    options: [
      'critérios objetivos previamente definidos.',
      'preferências pessoais da comissão.',
      'ajustes informais pós-abertura.',
      'sigilo absoluto dos resultados.'
    ],
    correctIndex: 0,
    explanation: 'A objetividade do julgamento é base da isonomia e da transparência nas licitações.',
  },
  {
    id: 155,
    subject: 'Português',
    topic: 'Coesão textual',
    level: 'Médio',
    statement: 'Em texto administrativo, o uso de conectivos e retomadas pronominais contribui principalmente para',
    options: [
      'obscurecer o sentido.',
      'coesão e progressão textual.',
      'informalidade obrigatória.',
      'supressão de ideias centrais.'
    ],
    correctIndex: 1,
    explanation: 'Conectivos e retomadas criam ligação entre partes do texto, garantindo coesão.',
  },
  {
    id: 156,
    subject: 'Português',
    topic: 'Ortografia oficial',
    level: 'Fácil',
    statement: 'Assinale a alternativa grafada corretamente segundo a norma-padrão.',
    options: [
      'Paralização.',
      'Exceção.',
      'Beneficiente.',
      'Reinvindicação.'
    ],
    correctIndex: 1,
    explanation: '“Exceção” segue a grafia oficial. As demais apresentam desvios ortográficos.',
  },
  {
    id: 157,
    subject: 'Informática',
    topic: 'Planilhas e referências',
    level: 'Difícil',
    statement: 'Em uma planilha, a referência $A$1 é classificada como',
    options: [
      'relativa.',
      'mista.',
      'absoluta.',
      'oculta.'
    ],
    correctIndex: 2,
    explanation: 'Com cifrão em coluna e linha, a referência permanece fixa, sendo absoluta.',
  },
  {
    id: 158,
    subject: 'Informática',
    topic: 'Segurança em navegadores',
    level: 'Médio',
    statement: 'Uma prática recomendada ao usar computadores compartilhados é',
    options: [
      'salvar senhas automaticamente em qualquer navegador.',
      'encerrar sessão e limpar dados sensíveis ao sair.',
      'desativar autenticação em dois fatores.',
      'baixar extensões sem verificar origem.'
    ],
    correctIndex: 1,
    explanation: 'Encerrar sessão e limpar dados sensíveis reduz risco de acesso indevido em máquinas compartilhadas.',
  },
  {
    id: 159,
    subject: 'Raciocínio Lógico',
    topic: 'Tabela-verdade',
    level: 'Médio',
    statement: 'A conjunção entre duas proposições simples será verdadeira apenas quando',
    options: [
      'uma delas for verdadeira.',
      'ambas forem verdadeiras.',
      'ambas forem falsas.',
      'a segunda for falsa.'
    ],
    correctIndex: 1,
    explanation: 'A conjunção p ∧ q somente é verdadeira quando as duas proposições são verdadeiras.',
  },
  {
    id: 160,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória básica',
    level: 'Difícil',
    statement: 'Uma banca elaborará uma sequência com 3 questões distintas escolhidas entre 5 disponíveis. Considerando a ordem, o total de sequências possíveis é',
    options: [
      '10.',
      '20.',
      '60.',
      '125.'
    ],
    correctIndex: 2,
    explanation: 'Trata-se de arranjo simples: 5 × 4 × 3 = 60.',
  },
  {
    id: 161,
    subject: 'Administração Pública',
    topic: 'Planejamento governamental',
    level: 'Fácil',
    statement: 'No âmbito da gestão pública, o planejamento governamental contribui para',
    options: [
      'alinhar objetivos, recursos e prioridades institucionais.',
      'substituir integralmente os controles de execução.',
      'dispensar avaliação posterior dos resultados.',
      'eliminar a necessidade de indicadores.'
    ],
    correctIndex: 0,
    explanation: 'Planejamento governamental organiza prioridades, recursos e metas para orientar a ação administrativa.',
  },
  {
    id: 162,
    subject: 'Administração Pública',
    topic: 'Gestão por processos',
    level: 'Médio',
    statement: 'No mapeamento de processos, a identificação de gargalos serve para',
    options: [
      'aumentar exigências sem relação com o resultado final.',
      'substituir padrões por decisões casuísticas das chefias.',
      'eliminar registros que permitam acompanhamento.',
      'melhorar o fluxo com foco em eficiência e entrega ao usuário.'
    ],
    correctIndex: 3,
    explanation: 'Gestão por processos prioriza fluxo, eficiência, padronização e valor ao usuário.',
  },
  {
    id: 163,
    subject: 'Administração Pública',
    topic: 'Governança e integridade',
    level: 'Difícil',
    statement: 'Quando um órgão publica critérios, monitora riscos e define responsabilidades, ele fortalece',
    options: [
      'substituem a legalidade por conveniência política.',
      'permitem decisões sem supervisão.',
      'reduzem riscos e reforçam direção, controle e accountability.',
      'eliminam a necessidade de prestar contas.'
    ],
    correctIndex: 2,
    explanation: 'Governança e integridade estruturam controles, transparência e responsabilização.',
  },
  {
    id: 164,
    subject: 'Administração Pública',
    topic: 'Indicadores de desempenho',
    level: 'Fácil',
    statement: 'Indicadores de desempenho são úteis porque permitem',
    options: [
      'tornar desnecessária a prestação de contas.',
      'acompanhar resultados e apoiar decisões corretivas.',
      'dispensar metas e padrões de comparação.',
      'substituir totalmente a análise qualitativa.'
    ],
    correctIndex: 1,
    explanation: 'Indicadores permitem monitoramento, comparação com metas e correção de desvios.',
  },
  {
    id: 165,
    subject: 'Administração Pública',
    topic: 'Liderança e motivação',
    level: 'Médio',
    statement: 'Uma chefia que orienta, comunica prioridades e acompanha a equipe está atuando em',
    options: [
      'alinhe pessoas, comunicação e execução às metas do órgão.',
      'elimine feedbacks para evitar conflito.',
      'concentre todas as decisões operacionais sem diálogo.',
      'substitua planejamento por ordens imprecisas.'
    ],
    correctIndex: 0,
    explanation: 'Liderança envolve orientação, comunicação e alinhamento das pessoas aos objetivos institucionais.',
  },
  {
    id: 166,
    subject: 'Administração Pública',
    topic: 'Qualidade no serviço público',
    level: 'Difícil',
    statement: 'Um efeito esperado da melhoria contínua é',
    options: [
      'reduzir transparência para ganhar velocidade.',
      'eliminar toda mensuração de desempenho.',
      'substituir treinamento por improviso.',
      'padronizar processos e ampliar a satisfação do usuário.'
    ],
    correctIndex: 3,
    explanation: 'Qualidade envolve padronização, melhoria contínua e foco no usuário.',
  },
  {
    id: 167,
    subject: 'Administração Pública',
    topic: 'Estrutura organizacional',
    level: 'Fácil',
    statement: 'A departamentalização funcional é caracterizada por',
    options: [
      'eliminação de qualquer nível de coordenação.',
      'confusão entre autoridade e responsabilidade.',
      'agrupamento de atividades por função ou especialidade.',
      'separação de equipes exclusivamente por interesse pessoal.'
    ],
    correctIndex: 2,
    explanation: 'Departamentalização funcional agrupa atividades por especialidade ou função semelhante.',
  },
  {
    id: 168,
    subject: 'Administração Pública',
    topic: 'Controle administrativo',
    level: 'Médio',
    statement: 'A função de controle é indispensável para',
    options: [
      'evitar qualquer ajuste no curso da execução.',
      'identificar desvios e adotar medidas corretivas.',
      'dispensar planejamento inicial.',
      'substituir a direção de pessoas por rotinas automáticas.'
    ],
    correctIndex: 1,
    explanation: 'Controle mede resultados, compara com padrões e orienta correções.',
  },
  {
    id: 169,
    subject: 'Administração Pública',
    topic: 'Planejamento governamental',
    level: 'Difícil',
    statement: 'No ciclo gerencial, o planejamento governamental tem como efeito esperado',
    options: [
      'alinhar objetivos, recursos e prioridades institucionais.',
      'substituir integralmente os controles de execução.',
      'dispensar avaliação posterior dos resultados.',
      'eliminar a necessidade de indicadores.'
    ],
    correctIndex: 0,
    explanation: 'Planejamento governamental organiza prioridades, recursos e metas para orientar a ação administrativa.',
  },
  {
    id: 170,
    subject: 'Administração Pública',
    topic: 'Gestão por processos',
    level: 'Fácil',
    statement: 'Em um órgão que redesenha seu fluxo de protocolo para reduzir retrabalho, a providência mais aderente à gestão por processos é',
    options: [
      'aumentar exigências sem relação com o resultado final.',
      'substituir padrões por decisões casuísticas das chefias.',
      'eliminar registros que permitam acompanhamento.',
      'melhorar o fluxo com foco em eficiência e entrega ao usuário.'
    ],
    correctIndex: 3,
    explanation: 'Gestão por processos prioriza fluxo, eficiência, padronização e valor ao usuário.',
  },
  {
    id: 171,
    subject: 'Administração Pública',
    topic: 'Governança e integridade',
    level: 'Médio',
    statement: 'A adoção de controles internos, transparência e responsabilização reforça',
    options: [
      'substituem a legalidade por conveniência política.',
      'permitem decisões sem supervisão.',
      'reduzem riscos e reforçam direção, controle e accountability.',
      'eliminam a necessidade de prestar contas.'
    ],
    correctIndex: 2,
    explanation: 'Governança e integridade estruturam controles, transparência e responsabilização.',
  },
  {
    id: 172,
    subject: 'Administração Pública',
    topic: 'Indicadores de desempenho',
    level: 'Difícil',
    statement: 'No setor público, um indicador bem definido deve favorecer',
    options: [
      'tornar desnecessária a prestação de contas.',
      'acompanhar resultados e apoiar decisões corretivas.',
      'dispensar metas e padrões de comparação.',
      'substituir totalmente a análise qualitativa.'
    ],
    correctIndex: 1,
    explanation: 'Indicadores permitem monitoramento, comparação com metas e correção de desvios.',
  },
  {
    id: 173,
    subject: 'Administração Pública',
    topic: 'Liderança e motivação',
    level: 'Fácil',
    statement: 'No exercício da liderança, espera-se que o gestor público',
    options: [
      'alinhe pessoas, comunicação e execução às metas do órgão.',
      'elimine feedbacks para evitar conflito.',
      'concentre todas as decisões operacionais sem diálogo.',
      'substitua planejamento por ordens imprecisas.'
    ],
    correctIndex: 0,
    explanation: 'Liderança envolve orientação, comunicação e alinhamento das pessoas aos objetivos institucionais.',
  },
  {
    id: 174,
    subject: 'Administração Pública',
    topic: 'Qualidade no serviço público',
    level: 'Médio',
    statement: 'Quando o órgão revisa rotinas e corrige falhas recorrentes, está perseguindo',
    options: [
      'reduzir transparência para ganhar velocidade.',
      'eliminar toda mensuração de desempenho.',
      'substituir treinamento por improviso.',
      'padronizar processos e ampliar a satisfação do usuário.'
    ],
    correctIndex: 3,
    explanation: 'Qualidade envolve padronização, melhoria contínua e foco no usuário.',
  },
  {
    id: 175,
    subject: 'Administração Pública',
    topic: 'Estrutura organizacional',
    level: 'Difícil',
    statement: 'A especialização por áreas técnicas costuma favorecer',
    options: [
      'eliminação de qualquer nível de coordenação.',
      'confusão entre autoridade e responsabilidade.',
      'agrupamento de atividades por função ou especialidade.',
      'separação de equipes exclusivamente por interesse pessoal.'
    ],
    correctIndex: 2,
    explanation: 'Departamentalização funcional agrupa atividades por especialidade ou função semelhante.',
  },
  {
    id: 176,
    subject: 'Administração Pública',
    topic: 'Controle administrativo',
    level: 'Fácil',
    statement: 'No controle administrativo, a comparação entre resultado alcançado e meta prevista permite',
    options: [
      'evitar qualquer ajuste no curso da execução.',
      'identificar desvios e adotar medidas corretivas.',
      'dispensar planejamento inicial.',
      'substituir a direção de pessoas por rotinas automáticas.'
    ],
    correctIndex: 1,
    explanation: 'Controle mede resultados, compara com padrões e orienta correções.',
  },
  {
    id: 177,
    subject: 'Administração Pública',
    topic: 'Planejamento governamental',
    level: 'Médio',
    statement: 'Ao elaborar metas anuais compatíveis com objetivos institucionais, a administração busca',
    options: [
      'alinhar objetivos, recursos e prioridades institucionais.',
      'substituir integralmente os controles de execução.',
      'dispensar avaliação posterior dos resultados.',
      'eliminar a necessidade de indicadores.'
    ],
    correctIndex: 0,
    explanation: 'Planejamento governamental organiza prioridades, recursos e metas para orientar a ação administrativa.',
  },
  {
    id: 178,
    subject: 'Administração Pública',
    topic: 'Gestão por processos',
    level: 'Difícil',
    statement: 'Ao padronizar etapas críticas e medir tempo de atendimento, a equipe busca',
    options: [
      'aumentar exigências sem relação com o resultado final.',
      'substituir padrões por decisões casuísticas das chefias.',
      'eliminar registros que permitam acompanhamento.',
      'melhorar o fluxo com foco em eficiência e entrega ao usuário.'
    ],
    correctIndex: 3,
    explanation: 'Gestão por processos prioriza fluxo, eficiência, padronização e valor ao usuário.',
  },
  {
    id: 179,
    subject: 'Administração Pública',
    topic: 'Governança e integridade',
    level: 'Fácil',
    statement: 'Na governança pública, mecanismos de integridade são importantes porque',
    options: [
      'substituem a legalidade por conveniência política.',
      'permitem decisões sem supervisão.',
      'reduzem riscos e reforçam direção, controle e accountability.',
      'eliminam a necessidade de prestar contas.'
    ],
    correctIndex: 2,
    explanation: 'Governança e integridade estruturam controles, transparência e responsabilização.',
  },
  {
    id: 180,
    subject: 'Administração Pública',
    topic: 'Indicadores de desempenho',
    level: 'Médio',
    statement: 'Ao medir tempo médio de resposta e taxa de retrabalho, a gestão consegue',
    options: [
      'tornar desnecessária a prestação de contas.',
      'acompanhar resultados e apoiar decisões corretivas.',
      'dispensar metas e padrões de comparação.',
      'substituir totalmente a análise qualitativa.'
    ],
    correctIndex: 1,
    explanation: 'Indicadores permitem monitoramento, comparação com metas e correção de desvios.',
  },
  {
    id: 181,
    subject: 'Administração Pública',
    topic: 'Liderança e motivação',
    level: 'Difícil',
    statement: 'A motivação de equipes tende a melhorar quando a liderança',
    options: [
      'alinhe pessoas, comunicação e execução às metas do órgão.',
      'elimine feedbacks para evitar conflito.',
      'concentre todas as decisões operacionais sem diálogo.',
      'substitua planejamento por ordens imprecisas.'
    ],
    correctIndex: 0,
    explanation: 'Liderança envolve orientação, comunicação e alinhamento das pessoas aos objetivos institucionais.',
  },
  {
    id: 182,
    subject: 'Administração Pública',
    topic: 'Qualidade no serviço público',
    level: 'Fácil',
    statement: 'A gestão da qualidade no serviço público busca',
    options: [
      'reduzir transparência para ganhar velocidade.',
      'eliminar toda mensuração de desempenho.',
      'substituir treinamento por improviso.',
      'padronizar processos e ampliar a satisfação do usuário.'
    ],
    correctIndex: 3,
    explanation: 'Qualidade envolve padronização, melhoria contínua e foco no usuário.',
  },
  {
    id: 183,
    subject: 'Administração Pública',
    topic: 'Estrutura organizacional',
    level: 'Médio',
    statement: 'Em uma estrutura organizada por finanças, compras e pessoas, há predominância de',
    options: [
      'eliminação de qualquer nível de coordenação.',
      'confusão entre autoridade e responsabilidade.',
      'agrupamento de atividades por função ou especialidade.',
      'separação de equipes exclusivamente por interesse pessoal.'
    ],
    correctIndex: 2,
    explanation: 'Departamentalização funcional agrupa atividades por especialidade ou função semelhante.',
  },
  {
    id: 184,
    subject: 'Administração Pública',
    topic: 'Controle administrativo',
    level: 'Difícil',
    statement: 'Quando a chefia monitora execução e corrige desvios, está',
    options: [
      'evitar qualquer ajuste no curso da execução.',
      'identificar desvios e adotar medidas corretivas.',
      'dispensar planejamento inicial.',
      'substituir a direção de pessoas por rotinas automáticas.'
    ],
    correctIndex: 1,
    explanation: 'Controle mede resultados, compara com padrões e orienta correções.',
  },
  {
    id: 185,
    subject: 'Administração Pública',
    topic: 'Planejamento governamental',
    level: 'Fácil',
    statement: 'No âmbito da gestão pública, o planejamento governamental contribui para',
    options: [
      'alinhar objetivos, recursos e prioridades institucionais.',
      'substituir integralmente os controles de execução.',
      'dispensar avaliação posterior dos resultados.',
      'eliminar a necessidade de indicadores.'
    ],
    correctIndex: 0,
    explanation: 'Planejamento governamental organiza prioridades, recursos e metas para orientar a ação administrativa.',
  },
  {
    id: 186,
    subject: 'Administração Pública',
    topic: 'Gestão por processos',
    level: 'Médio',
    statement: 'No mapeamento de processos, a identificação de gargalos serve para',
    options: [
      'aumentar exigências sem relação com o resultado final.',
      'substituir padrões por decisões casuísticas das chefias.',
      'eliminar registros que permitam acompanhamento.',
      'melhorar o fluxo com foco em eficiência e entrega ao usuário.'
    ],
    correctIndex: 3,
    explanation: 'Gestão por processos prioriza fluxo, eficiência, padronização e valor ao usuário.',
  },
  {
    id: 187,
    subject: 'Administração Pública',
    topic: 'Governança e integridade',
    level: 'Difícil',
    statement: 'Quando um órgão publica critérios, monitora riscos e define responsabilidades, ele fortalece',
    options: [
      'substituem a legalidade por conveniência política.',
      'permitem decisões sem supervisão.',
      'reduzem riscos e reforçam direção, controle e accountability.',
      'eliminam a necessidade de prestar contas.'
    ],
    correctIndex: 2,
    explanation: 'Governança e integridade estruturam controles, transparência e responsabilização.',
  },
  {
    id: 188,
    subject: 'Administração Pública',
    topic: 'Indicadores de desempenho',
    level: 'Fácil',
    statement: 'Indicadores de desempenho são úteis porque permitem',
    options: [
      'tornar desnecessária a prestação de contas.',
      'acompanhar resultados e apoiar decisões corretivas.',
      'dispensar metas e padrões de comparação.',
      'substituir totalmente a análise qualitativa.'
    ],
    correctIndex: 1,
    explanation: 'Indicadores permitem monitoramento, comparação com metas e correção de desvios.',
  },
  {
    id: 189,
    subject: 'Administração Pública',
    topic: 'Liderança e motivação',
    level: 'Médio',
    statement: 'Uma chefia que orienta, comunica prioridades e acompanha a equipe está atuando em',
    options: [
      'alinhe pessoas, comunicação e execução às metas do órgão.',
      'elimine feedbacks para evitar conflito.',
      'concentre todas as decisões operacionais sem diálogo.',
      'substitua planejamento por ordens imprecisas.'
    ],
    correctIndex: 0,
    explanation: 'Liderança envolve orientação, comunicação e alinhamento das pessoas aos objetivos institucionais.',
  },
  {
    id: 190,
    subject: 'Administração Pública',
    topic: 'Qualidade no serviço público',
    level: 'Difícil',
    statement: 'Um efeito esperado da melhoria contínua é',
    options: [
      'reduzir transparência para ganhar velocidade.',
      'eliminar toda mensuração de desempenho.',
      'substituir treinamento por improviso.',
      'padronizar processos e ampliar a satisfação do usuário.'
    ],
    correctIndex: 3,
    explanation: 'Qualidade envolve padronização, melhoria contínua e foco no usuário.',
  },
  {
    id: 191,
    subject: 'Administração Pública',
    topic: 'Estrutura organizacional',
    level: 'Fácil',
    statement: 'A departamentalização funcional é caracterizada por',
    options: [
      'eliminação de qualquer nível de coordenação.',
      'confusão entre autoridade e responsabilidade.',
      'agrupamento de atividades por função ou especialidade.',
      'separação de equipes exclusivamente por interesse pessoal.'
    ],
    correctIndex: 2,
    explanation: 'Departamentalização funcional agrupa atividades por especialidade ou função semelhante.',
  },
  {
    id: 192,
    subject: 'Administração Pública',
    topic: 'Controle administrativo',
    level: 'Médio',
    statement: 'A função de controle é indispensável para',
    options: [
      'evitar qualquer ajuste no curso da execução.',
      'identificar desvios e adotar medidas corretivas.',
      'dispensar planejamento inicial.',
      'substituir a direção de pessoas por rotinas automáticas.'
    ],
    correctIndex: 1,
    explanation: 'Controle mede resultados, compara com padrões e orienta correções.',
  },
  {
    id: 193,
    subject: 'Administração Pública',
    topic: 'Planejamento governamental',
    level: 'Difícil',
    statement: 'No ciclo gerencial, o planejamento governamental tem como efeito esperado',
    options: [
      'alinhar objetivos, recursos e prioridades institucionais.',
      'substituir integralmente os controles de execução.',
      'dispensar avaliação posterior dos resultados.',
      'eliminar a necessidade de indicadores.'
    ],
    correctIndex: 0,
    explanation: 'Planejamento governamental organiza prioridades, recursos e metas para orientar a ação administrativa.',
  },
  {
    id: 194,
    subject: 'Administração Pública',
    topic: 'Gestão por processos',
    level: 'Fácil',
    statement: 'Em um órgão que redesenha seu fluxo de protocolo para reduzir retrabalho, a providência mais aderente à gestão por processos é',
    options: [
      'aumentar exigências sem relação com o resultado final.',
      'substituir padrões por decisões casuísticas das chefias.',
      'eliminar registros que permitam acompanhamento.',
      'melhorar o fluxo com foco em eficiência e entrega ao usuário.'
    ],
    correctIndex: 3,
    explanation: 'Gestão por processos prioriza fluxo, eficiência, padronização e valor ao usuário.',
  },
  {
    id: 195,
    subject: 'Administração Pública',
    topic: 'Governança e integridade',
    level: 'Médio',
    statement: 'A adoção de controles internos, transparência e responsabilização reforça',
    options: [
      'substituem a legalidade por conveniência política.',
      'permitem decisões sem supervisão.',
      'reduzem riscos e reforçam direção, controle e accountability.',
      'eliminam a necessidade de prestar contas.'
    ],
    correctIndex: 2,
    explanation: 'Governança e integridade estruturam controles, transparência e responsabilização.',
  },
  {
    id: 196,
    subject: 'Administração Pública',
    topic: 'Indicadores de desempenho',
    level: 'Difícil',
    statement: 'No setor público, um indicador bem definido deve favorecer',
    options: [
      'tornar desnecessária a prestação de contas.',
      'acompanhar resultados e apoiar decisões corretivas.',
      'dispensar metas e padrões de comparação.',
      'substituir totalmente a análise qualitativa.'
    ],
    correctIndex: 1,
    explanation: 'Indicadores permitem monitoramento, comparação com metas e correção de desvios.',
  },
  {
    id: 197,
    subject: 'Administração Pública',
    topic: 'Liderança e motivação',
    level: 'Fácil',
    statement: 'No exercício da liderança, espera-se que o gestor público',
    options: [
      'alinhe pessoas, comunicação e execução às metas do órgão.',
      'elimine feedbacks para evitar conflito.',
      'concentre todas as decisões operacionais sem diálogo.',
      'substitua planejamento por ordens imprecisas.'
    ],
    correctIndex: 0,
    explanation: 'Liderança envolve orientação, comunicação e alinhamento das pessoas aos objetivos institucionais.',
  },
  {
    id: 198,
    subject: 'Administração Pública',
    topic: 'Qualidade no serviço público',
    level: 'Médio',
    statement: 'Quando o órgão revisa rotinas e corrige falhas recorrentes, está perseguindo',
    options: [
      'reduzir transparência para ganhar velocidade.',
      'eliminar toda mensuração de desempenho.',
      'substituir treinamento por improviso.',
      'padronizar processos e ampliar a satisfação do usuário.'
    ],
    correctIndex: 3,
    explanation: 'Qualidade envolve padronização, melhoria contínua e foco no usuário.',
  },
  {
    id: 199,
    subject: 'Administração Pública',
    topic: 'Estrutura organizacional',
    level: 'Difícil',
    statement: 'A especialização por áreas técnicas costuma favorecer',
    options: [
      'eliminação de qualquer nível de coordenação.',
      'confusão entre autoridade e responsabilidade.',
      'agrupamento de atividades por função ou especialidade.',
      'separação de equipes exclusivamente por interesse pessoal.'
    ],
    correctIndex: 2,
    explanation: 'Departamentalização funcional agrupa atividades por especialidade ou função semelhante.',
  },
  {
    id: 200,
    subject: 'Administração Pública',
    topic: 'Controle administrativo',
    level: 'Fácil',
    statement: 'No controle administrativo, a comparação entre resultado alcançado e meta prevista permite',
    options: [
      'evitar qualquer ajuste no curso da execução.',
      'identificar desvios e adotar medidas corretivas.',
      'dispensar planejamento inicial.',
      'substituir a direção de pessoas por rotinas automáticas.'
    ],
    correctIndex: 1,
    explanation: 'Controle mede resultados, compara com padrões e orienta correções.',
  },
  {
    id: 201,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'atue sem favorecimentos pessoais e com foco no interesse público.',
      'substitua a legalidade por vontade do gestor.',
      'mantenha sigilo como regra geral.',
      'dispense motivação dos atos.'
    ],
    correctIndex: 0,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 202,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'forma, ainda que o procedimento esteja regular.',
      'objeto, independentemente do conteúdo do ato.',
      'competência, mesmo com investidura válida.',
      'finalidade, pois houve desvio em relação ao fim legal.'
    ],
    correctIndex: 3,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 203,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'afastar o devido processo em sanções.',
      'renunciar à proteção do interesse público.',
      'organizar, coordenar e fiscalizar atividades internas.',
      'editar leis em substituição ao Legislativo.'
    ],
    correctIndex: 2,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 204,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'sigilo irrestrito do procedimento.',
      'assegurar participação do interessado e controle da decisão.',
      'supressão da ciência do administrado.',
      'dispensa de formalização mínima.'
    ],
    correctIndex: 1,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 205,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'estruturar a contratação com planejamento, riscos e definição do objeto.',
      'ser dispensado em objetos habituais sem justificativa.',
      'substituir o julgamento das propostas.',
      'permitir descrição genérica e ambígua do objeto.'
    ],
    correctIndex: 0,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 206,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'define prazos compatíveis com a complexidade do objeto.',
      'explicita requisitos proporcionais de habilitação.',
      'prevê mecanismos de fiscalização da execução.',
      'restringe indevidamente a disputa sem justificativa técnica.'
    ],
    correctIndex: 3,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 207,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Fácil',
    statement: 'Em regra, a responsabilidade objetiva do Estado exige comprovação de',
    options: [
      'sentença penal prévia em qualquer hipótese.',
      'autorização administrativa para pleitear reparação.',
      'dano e nexo causal entre a atuação estatal e o prejuízo.',
      'culpa genérica da vítima como elemento obrigatório.'
    ],
    correctIndex: 2,
    explanation: 'Na responsabilidade objetiva do Estado, em regra, analisam-se dano e nexo causal.',
  },
  {
    id: 208,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos e controle',
    level: 'Médio',
    statement: 'O controle administrativo interno decorre da autotutela porque a administração pode',
    options: [
      'ao uso exclusivo de particulares escolhidos pela chefia.',
      'ao uso da coletividade e à proteção do interesse público.',
      'ao patrimônio privado do agente.',
      'à alienação automática sem procedimento.'
    ],
    correctIndex: 1,
    explanation: 'Bens públicos têm regime próprio, e a autotutela permite controle e revisão administrativa.',
  },
  {
    id: 209,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Improbidade e ética pública',
    level: 'Difícil',
    statement: 'Medidas de integridade na administração ajudam a',
    options: [
      'probidade, lealdade institucional e respeito ao interesse público.',
      'priorizar conveniências pessoais sobre normas.',
      'dispensar controles de prevenção.',
      'substituir deveres legais por critérios subjetivos.'
    ],
    correctIndex: 0,
    explanation: 'Ética pública e integridade reforçam probidade e proteção do interesse público.',
  },
  {
    id: 210,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'substitua a legalidade por vontade do gestor.',
      'mantenha sigilo como regra geral.',
      'dispense motivação dos atos.',
      'atue sem favorecimentos pessoais e com foco no interesse público.'
    ],
    correctIndex: 3,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 211,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'objeto, independentemente do conteúdo do ato.',
      'competência, mesmo com investidura válida.',
      'finalidade, pois houve desvio em relação ao fim legal.',
      'forma, ainda que o procedimento esteja regular.'
    ],
    correctIndex: 2,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 212,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'renunciar à proteção do interesse público.',
      'organizar, coordenar e fiscalizar atividades internas.',
      'editar leis em substituição ao Legislativo.',
      'afastar o devido processo em sanções.'
    ],
    correctIndex: 1,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 213,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'assegurar participação do interessado e controle da decisão.',
      'supressão da ciência do administrado.',
      'dispensa de formalização mínima.',
      'sigilo irrestrito do procedimento.'
    ],
    correctIndex: 0,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 214,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'ser dispensado em objetos habituais sem justificativa.',
      'substituir o julgamento das propostas.',
      'permitir descrição genérica e ambígua do objeto.',
      'estruturar a contratação com planejamento, riscos e definição do objeto.'
    ],
    correctIndex: 3,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 215,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'explicita requisitos proporcionais de habilitação.',
      'prevê mecanismos de fiscalização da execução.',
      'restringe indevidamente a disputa sem justificativa técnica.',
      'define prazos compatíveis com a complexidade do objeto.'
    ],
    correctIndex: 2,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 216,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Fácil',
    statement: 'Em regra, a responsabilidade objetiva do Estado exige comprovação de',
    options: [
      'autorização administrativa para pleitear reparação.',
      'dano e nexo causal entre a atuação estatal e o prejuízo.',
      'culpa genérica da vítima como elemento obrigatório.',
      'sentença penal prévia em qualquer hipótese.'
    ],
    correctIndex: 1,
    explanation: 'Na responsabilidade objetiva do Estado, em regra, analisam-se dano e nexo causal.',
  },
  {
    id: 217,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos e controle',
    level: 'Médio',
    statement: 'O controle administrativo interno decorre da autotutela porque a administração pode',
    options: [
      'ao uso da coletividade e à proteção do interesse público.',
      'ao patrimônio privado do agente.',
      'à alienação automática sem procedimento.',
      'ao uso exclusivo de particulares escolhidos pela chefia.'
    ],
    correctIndex: 0,
    explanation: 'Bens públicos têm regime próprio, e a autotutela permite controle e revisão administrativa.',
  },
  {
    id: 218,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Improbidade e ética pública',
    level: 'Difícil',
    statement: 'Medidas de integridade na administração ajudam a',
    options: [
      'priorizar conveniências pessoais sobre normas.',
      'dispensar controles de prevenção.',
      'substituir deveres legais por critérios subjetivos.',
      'probidade, lealdade institucional e respeito ao interesse público.'
    ],
    correctIndex: 3,
    explanation: 'Ética pública e integridade reforçam probidade e proteção do interesse público.',
  },
  {
    id: 219,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'mantenha sigilo como regra geral.',
      'dispense motivação dos atos.',
      'atue sem favorecimentos pessoais e com foco no interesse público.',
      'substitua a legalidade por vontade do gestor.'
    ],
    correctIndex: 2,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 220,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'competência, mesmo com investidura válida.',
      'finalidade, pois houve desvio em relação ao fim legal.',
      'forma, ainda que o procedimento esteja regular.',
      'objeto, independentemente do conteúdo do ato.'
    ],
    correctIndex: 1,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 221,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'organizar, coordenar e fiscalizar atividades internas.',
      'editar leis em substituição ao Legislativo.',
      'afastar o devido processo em sanções.',
      'renunciar à proteção do interesse público.'
    ],
    correctIndex: 0,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 222,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'supressão da ciência do administrado.',
      'dispensa de formalização mínima.',
      'sigilo irrestrito do procedimento.',
      'assegurar participação do interessado e controle da decisão.'
    ],
    correctIndex: 3,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 223,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'substituir o julgamento das propostas.',
      'permitir descrição genérica e ambígua do objeto.',
      'estruturar a contratação com planejamento, riscos e definição do objeto.',
      'ser dispensado em objetos habituais sem justificativa.'
    ],
    correctIndex: 2,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 224,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'prevê mecanismos de fiscalização da execução.',
      'restringe indevidamente a disputa sem justificativa técnica.',
      'define prazos compatíveis com a complexidade do objeto.',
      'explicita requisitos proporcionais de habilitação.'
    ],
    correctIndex: 1,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 225,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Fácil',
    statement: 'Em regra, a responsabilidade objetiva do Estado exige comprovação de',
    options: [
      'dano e nexo causal entre a atuação estatal e o prejuízo.',
      'culpa genérica da vítima como elemento obrigatório.',
      'sentença penal prévia em qualquer hipótese.',
      'autorização administrativa para pleitear reparação.'
    ],
    correctIndex: 0,
    explanation: 'Na responsabilidade objetiva do Estado, em regra, analisam-se dano e nexo causal.',
  },
  {
    id: 226,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos e controle',
    level: 'Médio',
    statement: 'O controle administrativo interno decorre da autotutela porque a administração pode',
    options: [
      'ao patrimônio privado do agente.',
      'à alienação automática sem procedimento.',
      'ao uso exclusivo de particulares escolhidos pela chefia.',
      'ao uso da coletividade e à proteção do interesse público.'
    ],
    correctIndex: 3,
    explanation: 'Bens públicos têm regime próprio, e a autotutela permite controle e revisão administrativa.',
  },
  {
    id: 227,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Improbidade e ética pública',
    level: 'Difícil',
    statement: 'Medidas de integridade na administração ajudam a',
    options: [
      'dispensar controles de prevenção.',
      'substituir deveres legais por critérios subjetivos.',
      'probidade, lealdade institucional e respeito ao interesse público.',
      'priorizar conveniências pessoais sobre normas.'
    ],
    correctIndex: 2,
    explanation: 'Ética pública e integridade reforçam probidade e proteção do interesse público.',
  },
  {
    id: 228,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'dispense motivação dos atos.',
      'atue sem favorecimentos pessoais e com foco no interesse público.',
      'substitua a legalidade por vontade do gestor.',
      'mantenha sigilo como regra geral.'
    ],
    correctIndex: 1,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 229,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'finalidade, pois houve desvio em relação ao fim legal.',
      'forma, ainda que o procedimento esteja regular.',
      'objeto, independentemente do conteúdo do ato.',
      'competência, mesmo com investidura válida.'
    ],
    correctIndex: 0,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 230,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'editar leis em substituição ao Legislativo.',
      'afastar o devido processo em sanções.',
      'renunciar à proteção do interesse público.',
      'organizar, coordenar e fiscalizar atividades internas.'
    ],
    correctIndex: 3,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 231,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'dispensa de formalização mínima.',
      'sigilo irrestrito do procedimento.',
      'assegurar participação do interessado e controle da decisão.',
      'supressão da ciência do administrado.'
    ],
    correctIndex: 2,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 232,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'permitir descrição genérica e ambígua do objeto.',
      'estruturar a contratação com planejamento, riscos e definição do objeto.',
      'ser dispensado em objetos habituais sem justificativa.',
      'substituir o julgamento das propostas.'
    ],
    correctIndex: 1,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 233,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'restringe indevidamente a disputa sem justificativa técnica.',
      'define prazos compatíveis com a complexidade do objeto.',
      'explicita requisitos proporcionais de habilitação.',
      'prevê mecanismos de fiscalização da execução.'
    ],
    correctIndex: 0,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 234,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Fácil',
    statement: 'Em regra, a responsabilidade objetiva do Estado exige comprovação de',
    options: [
      'culpa genérica da vítima como elemento obrigatório.',
      'sentença penal prévia em qualquer hipótese.',
      'autorização administrativa para pleitear reparação.',
      'dano e nexo causal entre a atuação estatal e o prejuízo.'
    ],
    correctIndex: 3,
    explanation: 'Na responsabilidade objetiva do Estado, em regra, analisam-se dano e nexo causal.',
  },
  {
    id: 235,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos e controle',
    level: 'Médio',
    statement: 'O controle administrativo interno decorre da autotutela porque a administração pode',
    options: [
      'à alienação automática sem procedimento.',
      'ao uso exclusivo de particulares escolhidos pela chefia.',
      'ao uso da coletividade e à proteção do interesse público.',
      'ao patrimônio privado do agente.'
    ],
    correctIndex: 2,
    explanation: 'Bens públicos têm regime próprio, e a autotutela permite controle e revisão administrativa.',
  },
  {
    id: 236,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Improbidade e ética pública',
    level: 'Difícil',
    statement: 'Medidas de integridade na administração ajudam a',
    options: [
      'substituir deveres legais por critérios subjetivos.',
      'probidade, lealdade institucional e respeito ao interesse público.',
      'priorizar conveniências pessoais sobre normas.',
      'dispensar controles de prevenção.'
    ],
    correctIndex: 1,
    explanation: 'Ética pública e integridade reforçam probidade e proteção do interesse público.',
  },
  {
    id: 237,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'atue sem favorecimentos pessoais e com foco no interesse público.',
      'substitua a legalidade por vontade do gestor.',
      'mantenha sigilo como regra geral.',
      'dispense motivação dos atos.'
    ],
    correctIndex: 0,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 238,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'forma, ainda que o procedimento esteja regular.',
      'objeto, independentemente do conteúdo do ato.',
      'competência, mesmo com investidura válida.',
      'finalidade, pois houve desvio em relação ao fim legal.'
    ],
    correctIndex: 3,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 239,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'afastar o devido processo em sanções.',
      'renunciar à proteção do interesse público.',
      'organizar, coordenar e fiscalizar atividades internas.',
      'editar leis em substituição ao Legislativo.'
    ],
    correctIndex: 2,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 240,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'sigilo irrestrito do procedimento.',
      'assegurar participação do interessado e controle da decisão.',
      'supressão da ciência do administrado.',
      'dispensa de formalização mínima.'
    ],
    correctIndex: 1,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 241,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'estruturar a contratação com planejamento, riscos e definição do objeto.',
      'ser dispensado em objetos habituais sem justificativa.',
      'substituir o julgamento das propostas.',
      'permitir descrição genérica e ambígua do objeto.'
    ],
    correctIndex: 0,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 242,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'define prazos compatíveis com a complexidade do objeto.',
      'explicita requisitos proporcionais de habilitação.',
      'prevê mecanismos de fiscalização da execução.',
      'restringe indevidamente a disputa sem justificativa técnica.'
    ],
    correctIndex: 3,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 243,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Fácil',
    statement: 'Em regra, a responsabilidade objetiva do Estado exige comprovação de',
    options: [
      'sentença penal prévia em qualquer hipótese.',
      'autorização administrativa para pleitear reparação.',
      'dano e nexo causal entre a atuação estatal e o prejuízo.',
      'culpa genérica da vítima como elemento obrigatório.'
    ],
    correctIndex: 2,
    explanation: 'Na responsabilidade objetiva do Estado, em regra, analisam-se dano e nexo causal.',
  },
  {
    id: 244,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos e controle',
    level: 'Médio',
    statement: 'O controle administrativo interno decorre da autotutela porque a administração pode',
    options: [
      'ao uso exclusivo de particulares escolhidos pela chefia.',
      'ao uso da coletividade e à proteção do interesse público.',
      'ao patrimônio privado do agente.',
      'à alienação automática sem procedimento.'
    ],
    correctIndex: 1,
    explanation: 'Bens públicos têm regime próprio, e a autotutela permite controle e revisão administrativa.',
  },
  {
    id: 245,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Improbidade e ética pública',
    level: 'Difícil',
    statement: 'Medidas de integridade na administração ajudam a',
    options: [
      'probidade, lealdade institucional e respeito ao interesse público.',
      'priorizar conveniências pessoais sobre normas.',
      'dispensar controles de prevenção.',
      'substituir deveres legais por critérios subjetivos.'
    ],
    correctIndex: 0,
    explanation: 'Ética pública e integridade reforçam probidade e proteção do interesse público.',
  },
  {
    id: 246,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'substitua a legalidade por vontade do gestor.',
      'mantenha sigilo como regra geral.',
      'dispense motivação dos atos.',
      'atue sem favorecimentos pessoais e com foco no interesse público.'
    ],
    correctIndex: 3,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 247,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'objeto, independentemente do conteúdo do ato.',
      'competência, mesmo com investidura válida.',
      'finalidade, pois houve desvio em relação ao fim legal.',
      'forma, ainda que o procedimento esteja regular.'
    ],
    correctIndex: 2,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 248,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'renunciar à proteção do interesse público.',
      'organizar, coordenar e fiscalizar atividades internas.',
      'editar leis em substituição ao Legislativo.',
      'afastar o devido processo em sanções.'
    ],
    correctIndex: 1,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 249,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'assegurar participação do interessado e controle da decisão.',
      'supressão da ciência do administrado.',
      'dispensa de formalização mínima.',
      'sigilo irrestrito do procedimento.'
    ],
    correctIndex: 0,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 250,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'ser dispensado em objetos habituais sem justificativa.',
      'substituir o julgamento das propostas.',
      'permitir descrição genérica e ambígua do objeto.',
      'estruturar a contratação com planejamento, riscos e definição do objeto.'
    ],
    correctIndex: 3,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 251,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'explicita requisitos proporcionais de habilitação.',
      'prevê mecanismos de fiscalização da execução.',
      'restringe indevidamente a disputa sem justificativa técnica.',
      'define prazos compatíveis com a complexidade do objeto.'
    ],
    correctIndex: 2,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 252,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Responsabilidade civil do Estado',
    level: 'Fácil',
    statement: 'Em regra, a responsabilidade objetiva do Estado exige comprovação de',
    options: [
      'autorização administrativa para pleitear reparação.',
      'dano e nexo causal entre a atuação estatal e o prejuízo.',
      'culpa genérica da vítima como elemento obrigatório.',
      'sentença penal prévia em qualquer hipótese.'
    ],
    correctIndex: 1,
    explanation: 'Na responsabilidade objetiva do Estado, em regra, analisam-se dano e nexo causal.',
  },
  {
    id: 253,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Bens públicos e controle',
    level: 'Médio',
    statement: 'O controle administrativo interno decorre da autotutela porque a administração pode',
    options: [
      'ao uso da coletividade e à proteção do interesse público.',
      'ao patrimônio privado do agente.',
      'à alienação automática sem procedimento.',
      'ao uso exclusivo de particulares escolhidos pela chefia.'
    ],
    correctIndex: 0,
    explanation: 'Bens públicos têm regime próprio, e a autotutela permite controle e revisão administrativa.',
  },
  {
    id: 254,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Improbidade e ética pública',
    level: 'Difícil',
    statement: 'Medidas de integridade na administração ajudam a',
    options: [
      'priorizar conveniências pessoais sobre normas.',
      'dispensar controles de prevenção.',
      'substituir deveres legais por critérios subjetivos.',
      'probidade, lealdade institucional e respeito ao interesse público.'
    ],
    correctIndex: 3,
    explanation: 'Ética pública e integridade reforçam probidade e proteção do interesse público.',
  },
  {
    id: 255,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios da Administração Pública',
    level: 'Fácil',
    statement: 'O princípio da impessoalidade exige que a administração',
    options: [
      'mantenha sigilo como regra geral.',
      'dispense motivação dos atos.',
      'atue sem favorecimentos pessoais e com foco no interesse público.',
      'substitua a legalidade por vontade do gestor.'
    ],
    correctIndex: 2,
    explanation: 'Impessoalidade, publicidade e moralidade orientam atuação objetiva, transparente e ética.',
  },
  {
    id: 256,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Atos administrativos',
    level: 'Médio',
    statement: 'A motivação do ato administrativo é relevante porque',
    options: [
      'competência, mesmo com investidura válida.',
      'finalidade, pois houve desvio em relação ao fim legal.',
      'forma, ainda que o procedimento esteja regular.',
      'objeto, independentemente do conteúdo do ato.'
    ],
    correctIndex: 1,
    explanation: 'Desvio de finalidade compromete o elemento finalidade do ato administrativo.',
  },
  {
    id: 257,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Poderes administrativos',
    level: 'Difícil',
    statement: 'No exercício do poder de polícia, a administração pode',
    options: [
      'organizar, coordenar e fiscalizar atividades internas.',
      'editar leis em substituição ao Legislativo.',
      'afastar o devido processo em sanções.',
      'renunciar à proteção do interesse público.'
    ],
    correctIndex: 0,
    explanation: 'O poder hierárquico disciplina relações internas de coordenação e fiscalização.',
  },
  {
    id: 258,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Processo administrativo',
    level: 'Fácil',
    statement: 'No processo administrativo, o contraditório e a ampla defesa servem para',
    options: [
      'supressão da ciência do administrado.',
      'dispensa de formalização mínima.',
      'sigilo irrestrito do procedimento.',
      'assegurar participação do interessado e controle da decisão.'
    ],
    correctIndex: 3,
    explanation: 'Contraditório, ampla defesa e motivação reforçam legalidade, transparência e controle.',
  },
  {
    id: 259,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    level: 'Médio',
    statement: 'O estudo técnico preliminar é importante porque',
    options: [
      'substituir o julgamento das propostas.',
      'permitir descrição genérica e ambígua do objeto.',
      'estruturar a contratação com planejamento, riscos e definição do objeto.',
      'ser dispensado em objetos habituais sem justificativa.'
    ],
    correctIndex: 2,
    explanation: 'A Lei nº 14.133/2021 reforça planejamento, ETP, termo de referência e gestão de riscos.',
  },
  {
    id: 260,
    subject: 'Direito Administrativo e Licitações',
    topic: 'Licitações e contratos',
    level: 'Difícil',
    statement: 'No contrato administrativo, sanções por inadimplemento buscam',
    options: [
      'prevê mecanismos de fiscalização da execução.',
      'restringe indevidamente a disputa sem justificativa técnica.',
      'define prazos compatíveis com a complexidade do objeto.',
      'explicita requisitos proporcionais de habilitação.'
    ],
    correctIndex: 1,
    explanation: 'A restrição injustificada à competitividade viola a isonomia e a seleção da proposta mais vantajosa.',
  },
  {
    id: 261,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Fácil',
    statement: 'No período “o sistema agilizou o fluxo, porém exigiu adaptação”, a conjunção destacada indica',
    options: [
      'oposição entre duas informações apresentadas.',
      'adição sem contraste.',
      'explicação causal obrigatória.',
      'conclusão definitiva do autor.'
    ],
    correctIndex: 0,
    explanation: 'Conjunções como “porém” introduzem contraste ou oposição.',
  },
  {
    id: 262,
    subject: 'Português',
    topic: 'Concordância verbal e nominal',
    level: 'Médio',
    statement: 'Na norma-padrão, em “deve haver medidas urgentes”, o verbo principal permanece no singular porque',
    options: [
      '“houveram atrasos relevantes no setor”.',
      '“segue anexo as planilhas revisadas”.',
      '“é proibida entrada sem autorização”, sem determinante.',
      'locuções com “haver” impessoal mantêm o verbo no singular.'
    ],
    correctIndex: 3,
    explanation: 'Com “haver” no sentido de existir, a construção é impessoal; a concordância nominal deve seguir a norma-padrão.',
  },
  {
    id: 263,
    subject: 'Português',
    topic: 'Regência e crase',
    level: 'Difícil',
    statement: 'Segundo a norma-padrão, é correto afirmar que',
    options: [
      '“assistiu o curso de capacitação”.',
      '“obedeceram o regulamento interno”.',
      'a fusão de preposição com artigo feminino ocorre quando exigida pelo termo regente.',
      '“os servidores voltaram à trabalhar cedo”.'
    ],
    correctIndex: 2,
    explanation: 'Crase depende da exigência de preposição somada ao artigo feminino; regência verbal também segue a norma-padrão.',
  },
  {
    id: 264,
    subject: 'Português',
    topic: 'Pontuação e reescrita',
    level: 'Fácil',
    statement: 'A vírgula está corretamente empregada em',
    options: [
      'eliminar a coesão textual em favor da brevidade.',
      'orações deslocadas e relações sintáticas mais claras.',
      'separar sujeito e verbo por pausa de leitura.',
      'substituir conectivos por fragmentação.'
    ],
    correctIndex: 1,
    explanation: 'Pontuação correta organiza o período e evita ambiguidades.',
  },
  {
    id: 265,
    subject: 'Português',
    topic: 'Coesão e coerência',
    level: 'Médio',
    statement: 'Conectivos adequados contribuem para',
    options: [
      'retomar ideias e organizar a progressão do texto.',
      'criar ambiguidades propositais.',
      'eliminar o encadeamento lógico.',
      'substituir o sentido global por frases isoladas.'
    ],
    correctIndex: 0,
    explanation: 'Coesão e coerência garantem progressão lógica e clareza textual.',
  },
  {
    id: 266,
    subject: 'Português',
    topic: 'Ortografia e semântica',
    level: 'Difícil',
    statement: 'A escolha lexical correta em textos formais ajuda a',
    options: [
      'valorizar informalidade excessiva.',
      'substituir precisão por expressões vagas.',
      'dispensar revisão final do texto.',
      'preservar clareza, precisão e adequação vocabular.'
    ],
    correctIndex: 3,
    explanation: 'Ortografia correta e sentido preciso fortalecem a comunicação administrativa.',
  },
  {
    id: 267,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Fácil',
    statement: 'No período “o sistema agilizou o fluxo, porém exigiu adaptação”, a conjunção destacada indica',
    options: [
      'explicação causal obrigatória.',
      'conclusão definitiva do autor.',
      'oposição entre duas informações apresentadas.',
      'adição sem contraste.'
    ],
    correctIndex: 2,
    explanation: 'Conjunções como “porém” introduzem contraste ou oposição.',
  },
  {
    id: 268,
    subject: 'Português',
    topic: 'Concordância verbal e nominal',
    level: 'Médio',
    statement: 'Na norma-padrão, em “deve haver medidas urgentes”, o verbo principal permanece no singular porque',
    options: [
      '“é proibida entrada sem autorização”, sem determinante.',
      'locuções com “haver” impessoal mantêm o verbo no singular.',
      '“houveram atrasos relevantes no setor”.',
      '“segue anexo as planilhas revisadas”.'
    ],
    correctIndex: 1,
    explanation: 'Com “haver” no sentido de existir, a construção é impessoal; a concordância nominal deve seguir a norma-padrão.',
  },
  {
    id: 269,
    subject: 'Português',
    topic: 'Regência e crase',
    level: 'Difícil',
    statement: 'Segundo a norma-padrão, é correto afirmar que',
    options: [
      'a fusão de preposição com artigo feminino ocorre quando exigida pelo termo regente.',
      '“os servidores voltaram à trabalhar cedo”.',
      '“assistiu o curso de capacitação”.',
      '“obedeceram o regulamento interno”.'
    ],
    correctIndex: 0,
    explanation: 'Crase depende da exigência de preposição somada ao artigo feminino; regência verbal também segue a norma-padrão.',
  },
  {
    id: 270,
    subject: 'Português',
    topic: 'Pontuação e reescrita',
    level: 'Fácil',
    statement: 'A vírgula está corretamente empregada em',
    options: [
      'separar sujeito e verbo por pausa de leitura.',
      'substituir conectivos por fragmentação.',
      'eliminar a coesão textual em favor da brevidade.',
      'orações deslocadas e relações sintáticas mais claras.'
    ],
    correctIndex: 3,
    explanation: 'Pontuação correta organiza o período e evita ambiguidades.',
  },
  {
    id: 271,
    subject: 'Português',
    topic: 'Coesão e coerência',
    level: 'Médio',
    statement: 'Conectivos adequados contribuem para',
    options: [
      'eliminar o encadeamento lógico.',
      'substituir o sentido global por frases isoladas.',
      'retomar ideias e organizar a progressão do texto.',
      'criar ambiguidades propositais.'
    ],
    correctIndex: 2,
    explanation: 'Coesão e coerência garantem progressão lógica e clareza textual.',
  },
  {
    id: 272,
    subject: 'Português',
    topic: 'Ortografia e semântica',
    level: 'Difícil',
    statement: 'A escolha lexical correta em textos formais ajuda a',
    options: [
      'dispensar revisão final do texto.',
      'preservar clareza, precisão e adequação vocabular.',
      'valorizar informalidade excessiva.',
      'substituir precisão por expressões vagas.'
    ],
    correctIndex: 1,
    explanation: 'Ortografia correta e sentido preciso fortalecem a comunicação administrativa.',
  },
  {
    id: 273,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Fácil',
    statement: 'No período “o sistema agilizou o fluxo, porém exigiu adaptação”, a conjunção destacada indica',
    options: [
      'oposição entre duas informações apresentadas.',
      'adição sem contraste.',
      'explicação causal obrigatória.',
      'conclusão definitiva do autor.'
    ],
    correctIndex: 0,
    explanation: 'Conjunções como “porém” introduzem contraste ou oposição.',
  },
  {
    id: 274,
    subject: 'Português',
    topic: 'Concordância verbal e nominal',
    level: 'Médio',
    statement: 'Na norma-padrão, em “deve haver medidas urgentes”, o verbo principal permanece no singular porque',
    options: [
      '“houveram atrasos relevantes no setor”.',
      '“segue anexo as planilhas revisadas”.',
      '“é proibida entrada sem autorização”, sem determinante.',
      'locuções com “haver” impessoal mantêm o verbo no singular.'
    ],
    correctIndex: 3,
    explanation: 'Com “haver” no sentido de existir, a construção é impessoal; a concordância nominal deve seguir a norma-padrão.',
  },
  {
    id: 275,
    subject: 'Português',
    topic: 'Regência e crase',
    level: 'Difícil',
    statement: 'Segundo a norma-padrão, é correto afirmar que',
    options: [
      '“assistiu o curso de capacitação”.',
      '“obedeceram o regulamento interno”.',
      'a fusão de preposição com artigo feminino ocorre quando exigida pelo termo regente.',
      '“os servidores voltaram à trabalhar cedo”.'
    ],
    correctIndex: 2,
    explanation: 'Crase depende da exigência de preposição somada ao artigo feminino; regência verbal também segue a norma-padrão.',
  },
  {
    id: 276,
    subject: 'Português',
    topic: 'Pontuação e reescrita',
    level: 'Fácil',
    statement: 'A vírgula está corretamente empregada em',
    options: [
      'eliminar a coesão textual em favor da brevidade.',
      'orações deslocadas e relações sintáticas mais claras.',
      'separar sujeito e verbo por pausa de leitura.',
      'substituir conectivos por fragmentação.'
    ],
    correctIndex: 1,
    explanation: 'Pontuação correta organiza o período e evita ambiguidades.',
  },
  {
    id: 277,
    subject: 'Português',
    topic: 'Coesão e coerência',
    level: 'Médio',
    statement: 'Conectivos adequados contribuem para',
    options: [
      'retomar ideias e organizar a progressão do texto.',
      'criar ambiguidades propositais.',
      'eliminar o encadeamento lógico.',
      'substituir o sentido global por frases isoladas.'
    ],
    correctIndex: 0,
    explanation: 'Coesão e coerência garantem progressão lógica e clareza textual.',
  },
  {
    id: 278,
    subject: 'Português',
    topic: 'Ortografia e semântica',
    level: 'Difícil',
    statement: 'A escolha lexical correta em textos formais ajuda a',
    options: [
      'valorizar informalidade excessiva.',
      'substituir precisão por expressões vagas.',
      'dispensar revisão final do texto.',
      'preservar clareza, precisão e adequação vocabular.'
    ],
    correctIndex: 3,
    explanation: 'Ortografia correta e sentido preciso fortalecem a comunicação administrativa.',
  },
  {
    id: 279,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Fácil',
    statement: 'No período “o sistema agilizou o fluxo, porém exigiu adaptação”, a conjunção destacada indica',
    options: [
      'explicação causal obrigatória.',
      'conclusão definitiva do autor.',
      'oposição entre duas informações apresentadas.',
      'adição sem contraste.'
    ],
    correctIndex: 2,
    explanation: 'Conjunções como “porém” introduzem contraste ou oposição.',
  },
  {
    id: 280,
    subject: 'Português',
    topic: 'Concordância verbal e nominal',
    level: 'Médio',
    statement: 'Na norma-padrão, em “deve haver medidas urgentes”, o verbo principal permanece no singular porque',
    options: [
      '“é proibida entrada sem autorização”, sem determinante.',
      'locuções com “haver” impessoal mantêm o verbo no singular.',
      '“houveram atrasos relevantes no setor”.',
      '“segue anexo as planilhas revisadas”.'
    ],
    correctIndex: 1,
    explanation: 'Com “haver” no sentido de existir, a construção é impessoal; a concordância nominal deve seguir a norma-padrão.',
  },
  {
    id: 281,
    subject: 'Português',
    topic: 'Regência e crase',
    level: 'Difícil',
    statement: 'Segundo a norma-padrão, é correto afirmar que',
    options: [
      'a fusão de preposição com artigo feminino ocorre quando exigida pelo termo regente.',
      '“os servidores voltaram à trabalhar cedo”.',
      '“assistiu o curso de capacitação”.',
      '“obedeceram o regulamento interno”.'
    ],
    correctIndex: 0,
    explanation: 'Crase depende da exigência de preposição somada ao artigo feminino; regência verbal também segue a norma-padrão.',
  },
  {
    id: 282,
    subject: 'Português',
    topic: 'Pontuação e reescrita',
    level: 'Fácil',
    statement: 'A vírgula está corretamente empregada em',
    options: [
      'separar sujeito e verbo por pausa de leitura.',
      'substituir conectivos por fragmentação.',
      'eliminar a coesão textual em favor da brevidade.',
      'orações deslocadas e relações sintáticas mais claras.'
    ],
    correctIndex: 3,
    explanation: 'Pontuação correta organiza o período e evita ambiguidades.',
  },
  {
    id: 283,
    subject: 'Português',
    topic: 'Coesão e coerência',
    level: 'Médio',
    statement: 'Conectivos adequados contribuem para',
    options: [
      'eliminar o encadeamento lógico.',
      'substituir o sentido global por frases isoladas.',
      'retomar ideias e organizar a progressão do texto.',
      'criar ambiguidades propositais.'
    ],
    correctIndex: 2,
    explanation: 'Coesão e coerência garantem progressão lógica e clareza textual.',
  },
  {
    id: 284,
    subject: 'Português',
    topic: 'Ortografia e semântica',
    level: 'Difícil',
    statement: 'A escolha lexical correta em textos formais ajuda a',
    options: [
      'dispensar revisão final do texto.',
      'preservar clareza, precisão e adequação vocabular.',
      'valorizar informalidade excessiva.',
      'substituir precisão por expressões vagas.'
    ],
    correctIndex: 1,
    explanation: 'Ortografia correta e sentido preciso fortalecem a comunicação administrativa.',
  },
  {
    id: 285,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Fácil',
    statement: 'No período “o sistema agilizou o fluxo, porém exigiu adaptação”, a conjunção destacada indica',
    options: [
      'oposição entre duas informações apresentadas.',
      'adição sem contraste.',
      'explicação causal obrigatória.',
      'conclusão definitiva do autor.'
    ],
    correctIndex: 0,
    explanation: 'Conjunções como “porém” introduzem contraste ou oposição.',
  },
  {
    id: 286,
    subject: 'Português',
    topic: 'Concordância verbal e nominal',
    level: 'Médio',
    statement: 'Na norma-padrão, em “deve haver medidas urgentes”, o verbo principal permanece no singular porque',
    options: [
      '“houveram atrasos relevantes no setor”.',
      '“segue anexo as planilhas revisadas”.',
      '“é proibida entrada sem autorização”, sem determinante.',
      'locuções com “haver” impessoal mantêm o verbo no singular.'
    ],
    correctIndex: 3,
    explanation: 'Com “haver” no sentido de existir, a construção é impessoal; a concordância nominal deve seguir a norma-padrão.',
  },
  {
    id: 287,
    subject: 'Português',
    topic: 'Regência e crase',
    level: 'Difícil',
    statement: 'Segundo a norma-padrão, é correto afirmar que',
    options: [
      '“assistiu o curso de capacitação”.',
      '“obedeceram o regulamento interno”.',
      'a fusão de preposição com artigo feminino ocorre quando exigida pelo termo regente.',
      '“os servidores voltaram à trabalhar cedo”.'
    ],
    correctIndex: 2,
    explanation: 'Crase depende da exigência de preposição somada ao artigo feminino; regência verbal também segue a norma-padrão.',
  },
  {
    id: 288,
    subject: 'Português',
    topic: 'Pontuação e reescrita',
    level: 'Fácil',
    statement: 'A vírgula está corretamente empregada em',
    options: [
      'eliminar a coesão textual em favor da brevidade.',
      'orações deslocadas e relações sintáticas mais claras.',
      'separar sujeito e verbo por pausa de leitura.',
      'substituir conectivos por fragmentação.'
    ],
    correctIndex: 1,
    explanation: 'Pontuação correta organiza o período e evita ambiguidades.',
  },
  {
    id: 289,
    subject: 'Português',
    topic: 'Coesão e coerência',
    level: 'Médio',
    statement: 'Conectivos adequados contribuem para',
    options: [
      'retomar ideias e organizar a progressão do texto.',
      'criar ambiguidades propositais.',
      'eliminar o encadeamento lógico.',
      'substituir o sentido global por frases isoladas.'
    ],
    correctIndex: 0,
    explanation: 'Coesão e coerência garantem progressão lógica e clareza textual.',
  },
  {
    id: 290,
    subject: 'Português',
    topic: 'Ortografia e semântica',
    level: 'Difícil',
    statement: 'A escolha lexical correta em textos formais ajuda a',
    options: [
      'valorizar informalidade excessiva.',
      'substituir precisão por expressões vagas.',
      'dispensar revisão final do texto.',
      'preservar clareza, precisão e adequação vocabular.'
    ],
    correctIndex: 3,
    explanation: 'Ortografia correta e sentido preciso fortalecem a comunicação administrativa.',
  },
  {
    id: 291,
    subject: 'Português',
    topic: 'Interpretação de texto',
    level: 'Fácil',
    statement: 'No período “o sistema agilizou o fluxo, porém exigiu adaptação”, a conjunção destacada indica',
    options: [
      'explicação causal obrigatória.',
      'conclusão definitiva do autor.',
      'oposição entre duas informações apresentadas.',
      'adição sem contraste.'
    ],
    correctIndex: 2,
    explanation: 'Conjunções como “porém” introduzem contraste ou oposição.',
  },
  {
    id: 292,
    subject: 'Português',
    topic: 'Concordância verbal e nominal',
    level: 'Médio',
    statement: 'Na norma-padrão, em “deve haver medidas urgentes”, o verbo principal permanece no singular porque',
    options: [
      '“é proibida entrada sem autorização”, sem determinante.',
      'locuções com “haver” impessoal mantêm o verbo no singular.',
      '“houveram atrasos relevantes no setor”.',
      '“segue anexo as planilhas revisadas”.'
    ],
    correctIndex: 1,
    explanation: 'Com “haver” no sentido de existir, a construção é impessoal; a concordância nominal deve seguir a norma-padrão.',
  },
  {
    id: 293,
    subject: 'Português',
    topic: 'Regência e crase',
    level: 'Difícil',
    statement: 'Segundo a norma-padrão, é correto afirmar que',
    options: [
      'a fusão de preposição com artigo feminino ocorre quando exigida pelo termo regente.',
      '“os servidores voltaram à trabalhar cedo”.',
      '“assistiu o curso de capacitação”.',
      '“obedeceram o regulamento interno”.'
    ],
    correctIndex: 0,
    explanation: 'Crase depende da exigência de preposição somada ao artigo feminino; regência verbal também segue a norma-padrão.',
  },
  {
    id: 294,
    subject: 'Português',
    topic: 'Pontuação e reescrita',
    level: 'Fácil',
    statement: 'A vírgula está corretamente empregada em',
    options: [
      'separar sujeito e verbo por pausa de leitura.',
      'substituir conectivos por fragmentação.',
      'eliminar a coesão textual em favor da brevidade.',
      'orações deslocadas e relações sintáticas mais claras.'
    ],
    correctIndex: 3,
    explanation: 'Pontuação correta organiza o período e evita ambiguidades.',
  },
  {
    id: 295,
    subject: 'Português',
    topic: 'Coesão e coerência',
    level: 'Médio',
    statement: 'Conectivos adequados contribuem para',
    options: [
      'eliminar o encadeamento lógico.',
      'substituir o sentido global por frases isoladas.',
      'retomar ideias e organizar a progressão do texto.',
      'criar ambiguidades propositais.'
    ],
    correctIndex: 2,
    explanation: 'Coesão e coerência garantem progressão lógica e clareza textual.',
  },
  {
    id: 296,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Fácil',
    statement: 'No Explorador de Arquivos do Windows, a organização por pastas ajuda a',
    options: [
      'localizar, classificar e manter documentos com maior controle.',
      'dispensar backup periódico.',
      'substituir permissões de acesso por nomes aleatórios.',
      'eliminar toda padronização de armazenamento.'
    ],
    correctIndex: 0,
    explanation: 'Gerenciamento de arquivos envolve organização, localização e boas práticas de armazenamento.',
  },
  {
    id: 297,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Médio',
    statement: 'Ao usar referências absolutas, o usuário busca',
    options: [
      'substituir completamente a conferência dos dados.',
      'dispensar formatação e revisão.',
      'ocultar resultados para evitar interpretação.',
      'automatizar cálculos e reduzir erros operacionais.'
    ],
    correctIndex: 3,
    explanation: 'Excel apoia automação de cálculos, organização e análise de dados.',
  },
  {
    id: 298,
    subject: 'Informática',
    topic: 'Microsoft Word e editores',
    level: 'Difícil',
    statement: 'Em editores de texto, a revisão ortográfica auxilia na',
    options: [
      'substituir a clareza das ideias pelo visual.',
      'dispensar controle de versões.',
      'produzir documentos padronizados e reduzir falhas de edição.',
      'eliminar a necessidade de leitura final.'
    ],
    correctIndex: 2,
    explanation: 'Editores de texto ajudam na padronização, revisão e segurança do documento.',
  },
  {
    id: 299,
    subject: 'Informática',
    topic: 'Internet e segurança',
    level: 'Fácil',
    statement: 'Ao verificar se um site é mais seguro, o usuário deve observar',
    options: [
      'desativar alertas do navegador para ganhar velocidade.',
      'HTTPS, contexto do link e comportamento cauteloso do usuário.',
      'clicar em qualquer pop-up de atualização.',
      'reaproveitar a mesma senha em todos os serviços.'
    ],
    correctIndex: 1,
    explanation: 'Segurança na navegação envolve HTTPS, análise do contexto e cautela com links e anexos.',
  },
  {
    id: 300,
    subject: 'Informática',
    topic: 'Correio eletrônico e backup',
    level: 'Médio',
    statement: 'Backups periódicos são recomendados porque',
    options: [
      'proteger dados e facilitar envio ou recuperação quando necessário.',
      'dispensar antivírus e outras camadas de proteção.',
      'substituir políticas de acesso.',
      'garantir sozinha a autenticidade do remetente.'
    ],
    correctIndex: 0,
    explanation: 'E-mail seguro, backup e compactação fazem parte de uma rotina básica de proteção da informação.',
  },
  {
    id: 301,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Difícil',
    statement: 'Uma boa prática ao gerenciar arquivos institucionais é',
    options: [
      'dispensar backup periódico.',
      'substituir permissões de acesso por nomes aleatórios.',
      'eliminar toda padronização de armazenamento.',
      'localizar, classificar e manter documentos com maior controle.'
    ],
    correctIndex: 3,
    explanation: 'Gerenciamento de arquivos envolve organização, localização e boas práticas de armazenamento.',
  },
  {
    id: 302,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Fácil',
    statement: 'No Excel, fórmulas e funções são importantes porque permitem',
    options: [
      'dispensar formatação e revisão.',
      'ocultar resultados para evitar interpretação.',
      'automatizar cálculos e reduzir erros operacionais.',
      'substituir completamente a conferência dos dados.'
    ],
    correctIndex: 2,
    explanation: 'Excel apoia automação de cálculos, organização e análise de dados.',
  },
  {
    id: 303,
    subject: 'Informática',
    topic: 'Microsoft Word e editores',
    level: 'Médio',
    statement: 'Salvar periodicamente um documento é importante para',
    options: [
      'dispensar controle de versões.',
      'produzir documentos padronizados e reduzir falhas de edição.',
      'eliminar a necessidade de leitura final.',
      'substituir a clareza das ideias pelo visual.'
    ],
    correctIndex: 1,
    explanation: 'Editores de texto ajudam na padronização, revisão e segurança do documento.',
  },
  {
    id: 304,
    subject: 'Informática',
    topic: 'Internet e segurança',
    level: 'Difícil',
    statement: 'No uso de navegadores, recomenda-se',
    options: [
      'HTTPS, contexto do link e comportamento cauteloso do usuário.',
      'clicar em qualquer pop-up de atualização.',
      'reaproveitar a mesma senha em todos os serviços.',
      'desativar alertas do navegador para ganhar velocidade.'
    ],
    correctIndex: 0,
    explanation: 'Segurança na navegação envolve HTTPS, análise do contexto e cautela com links e anexos.',
  },
  {
    id: 305,
    subject: 'Informática',
    topic: 'Correio eletrônico e backup',
    level: 'Fácil',
    statement: 'No ambiente corporativo, uma prática adequada no uso de e-mail é',
    options: [
      'dispensar antivírus e outras camadas de proteção.',
      'substituir políticas de acesso.',
      'garantir sozinha a autenticidade do remetente.',
      'proteger dados e facilitar envio ou recuperação quando necessário.'
    ],
    correctIndex: 3,
    explanation: 'E-mail seguro, backup e compactação fazem parte de uma rotina básica de proteção da informação.',
  },
  {
    id: 306,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Médio',
    statement: 'Ao renomear rapidamente um arquivo selecionado, o atalho usual é útil para',
    options: [
      'substituir permissões de acesso por nomes aleatórios.',
      'eliminar toda padronização de armazenamento.',
      'localizar, classificar e manter documentos com maior controle.',
      'dispensar backup periódico.'
    ],
    correctIndex: 2,
    explanation: 'Gerenciamento de arquivos envolve organização, localização e boas práticas de armazenamento.',
  },
  {
    id: 307,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Difícil',
    statement: 'Em planilhas, a função SOMA é utilizada para',
    options: [
      'ocultar resultados para evitar interpretação.',
      'automatizar cálculos e reduzir erros operacionais.',
      'substituir completamente a conferência dos dados.',
      'dispensar formatação e revisão.'
    ],
    correctIndex: 1,
    explanation: 'Excel apoia automação de cálculos, organização e análise de dados.',
  },
  {
    id: 308,
    subject: 'Informática',
    topic: 'Microsoft Word e editores',
    level: 'Fácil',
    statement: 'No Word, recursos de formatação e revisão contribuem para',
    options: [
      'produzir documentos padronizados e reduzir falhas de edição.',
      'eliminar a necessidade de leitura final.',
      'substituir a clareza das ideias pelo visual.',
      'dispensar controle de versões.'
    ],
    correctIndex: 0,
    explanation: 'Editores de texto ajudam na padronização, revisão e segurança do documento.',
  },
  {
    id: 309,
    subject: 'Informática',
    topic: 'Internet e segurança',
    level: 'Médio',
    statement: 'Uma boa prática contra phishing é',
    options: [
      'clicar em qualquer pop-up de atualização.',
      'reaproveitar a mesma senha em todos os serviços.',
      'desativar alertas do navegador para ganhar velocidade.',
      'HTTPS, contexto do link e comportamento cauteloso do usuário.'
    ],
    correctIndex: 3,
    explanation: 'Segurança na navegação envolve HTTPS, análise do contexto e cautela com links e anexos.',
  },
  {
    id: 310,
    subject: 'Informática',
    topic: 'Correio eletrônico e backup',
    level: 'Difícil',
    statement: 'A compactação de arquivos costuma ser útil para',
    options: [
      'substituir políticas de acesso.',
      'garantir sozinha a autenticidade do remetente.',
      'proteger dados e facilitar envio ou recuperação quando necessário.',
      'dispensar antivírus e outras camadas de proteção.'
    ],
    correctIndex: 2,
    explanation: 'E-mail seguro, backup e compactação fazem parte de uma rotina básica de proteção da informação.',
  },
  {
    id: 311,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Fácil',
    statement: 'No Explorador de Arquivos do Windows, a organização por pastas ajuda a',
    options: [
      'eliminar toda padronização de armazenamento.',
      'localizar, classificar e manter documentos com maior controle.',
      'dispensar backup periódico.',
      'substituir permissões de acesso por nomes aleatórios.'
    ],
    correctIndex: 1,
    explanation: 'Gerenciamento de arquivos envolve organização, localização e boas práticas de armazenamento.',
  },
  {
    id: 312,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Médio',
    statement: 'Ao usar referências absolutas, o usuário busca',
    options: [
      'automatizar cálculos e reduzir erros operacionais.',
      'substituir completamente a conferência dos dados.',
      'dispensar formatação e revisão.',
      'ocultar resultados para evitar interpretação.'
    ],
    correctIndex: 0,
    explanation: 'Excel apoia automação de cálculos, organização e análise de dados.',
  },
  {
    id: 313,
    subject: 'Informática',
    topic: 'Microsoft Word e editores',
    level: 'Difícil',
    statement: 'Em editores de texto, a revisão ortográfica auxilia na',
    options: [
      'eliminar a necessidade de leitura final.',
      'substituir a clareza das ideias pelo visual.',
      'dispensar controle de versões.',
      'produzir documentos padronizados e reduzir falhas de edição.'
    ],
    correctIndex: 3,
    explanation: 'Editores de texto ajudam na padronização, revisão e segurança do documento.',
  },
  {
    id: 314,
    subject: 'Informática',
    topic: 'Internet e segurança',
    level: 'Fácil',
    statement: 'Ao verificar se um site é mais seguro, o usuário deve observar',
    options: [
      'reaproveitar a mesma senha em todos os serviços.',
      'desativar alertas do navegador para ganhar velocidade.',
      'HTTPS, contexto do link e comportamento cauteloso do usuário.',
      'clicar em qualquer pop-up de atualização.'
    ],
    correctIndex: 2,
    explanation: 'Segurança na navegação envolve HTTPS, análise do contexto e cautela com links e anexos.',
  },
  {
    id: 315,
    subject: 'Informática',
    topic: 'Correio eletrônico e backup',
    level: 'Médio',
    statement: 'Backups periódicos são recomendados porque',
    options: [
      'garantir sozinha a autenticidade do remetente.',
      'proteger dados e facilitar envio ou recuperação quando necessário.',
      'dispensar antivírus e outras camadas de proteção.',
      'substituir políticas de acesso.'
    ],
    correctIndex: 1,
    explanation: 'E-mail seguro, backup e compactação fazem parte de uma rotina básica de proteção da informação.',
  },
  {
    id: 316,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Difícil',
    statement: 'Uma boa prática ao gerenciar arquivos institucionais é',
    options: [
      'localizar, classificar e manter documentos com maior controle.',
      'dispensar backup periódico.',
      'substituir permissões de acesso por nomes aleatórios.',
      'eliminar toda padronização de armazenamento.'
    ],
    correctIndex: 0,
    explanation: 'Gerenciamento de arquivos envolve organização, localização e boas práticas de armazenamento.',
  },
  {
    id: 317,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Fácil',
    statement: 'No Excel, fórmulas e funções são importantes porque permitem',
    options: [
      'substituir completamente a conferência dos dados.',
      'dispensar formatação e revisão.',
      'ocultar resultados para evitar interpretação.',
      'automatizar cálculos e reduzir erros operacionais.'
    ],
    correctIndex: 3,
    explanation: 'Excel apoia automação de cálculos, organização e análise de dados.',
  },
  {
    id: 318,
    subject: 'Informática',
    topic: 'Microsoft Word e editores',
    level: 'Médio',
    statement: 'Salvar periodicamente um documento é importante para',
    options: [
      'substituir a clareza das ideias pelo visual.',
      'dispensar controle de versões.',
      'produzir documentos padronizados e reduzir falhas de edição.',
      'eliminar a necessidade de leitura final.'
    ],
    correctIndex: 2,
    explanation: 'Editores de texto ajudam na padronização, revisão e segurança do documento.',
  },
  {
    id: 319,
    subject: 'Informática',
    topic: 'Internet e segurança',
    level: 'Difícil',
    statement: 'No uso de navegadores, recomenda-se',
    options: [
      'desativar alertas do navegador para ganhar velocidade.',
      'HTTPS, contexto do link e comportamento cauteloso do usuário.',
      'clicar em qualquer pop-up de atualização.',
      'reaproveitar a mesma senha em todos os serviços.'
    ],
    correctIndex: 1,
    explanation: 'Segurança na navegação envolve HTTPS, análise do contexto e cautela com links e anexos.',
  },
  {
    id: 320,
    subject: 'Informática',
    topic: 'Correio eletrônico e backup',
    level: 'Fácil',
    statement: 'No ambiente corporativo, uma prática adequada no uso de e-mail é',
    options: [
      'proteger dados e facilitar envio ou recuperação quando necessário.',
      'dispensar antivírus e outras camadas de proteção.',
      'substituir políticas de acesso.',
      'garantir sozinha a autenticidade do remetente.'
    ],
    correctIndex: 0,
    explanation: 'E-mail seguro, backup e compactação fazem parte de uma rotina básica de proteção da informação.',
  },
  {
    id: 321,
    subject: 'Informática',
    topic: 'Windows e gerenciamento de arquivos',
    level: 'Médio',
    statement: 'Ao renomear rapidamente um arquivo selecionado, o atalho usual é útil para',
    options: [
      'dispensar backup periódico.',
      'substituir permissões de acesso por nomes aleatórios.',
      'eliminar toda padronização de armazenamento.',
      'localizar, classificar e manter documentos com maior controle.'
    ],
    correctIndex: 3,
    explanation: 'Gerenciamento de arquivos envolve organização, localização e boas práticas de armazenamento.',
  },
  {
    id: 322,
    subject: 'Informática',
    topic: 'Microsoft Excel',
    level: 'Difícil',
    statement: 'Em planilhas, a função SOMA é utilizada para',
    options: [
      'dispensar formatação e revisão.',
      'ocultar resultados para evitar interpretação.',
      'automatizar cálculos e reduzir erros operacionais.',
      'substituir completamente a conferência dos dados.'
    ],
    correctIndex: 2,
    explanation: 'Excel apoia automação de cálculos, organização e análise de dados.',
  },
  {
    id: 323,
    subject: 'Informática',
    topic: 'Microsoft Word e editores',
    level: 'Fácil',
    statement: 'No Word, recursos de formatação e revisão contribuem para',
    options: [
      'dispensar controle de versões.',
      'produzir documentos padronizados e reduzir falhas de edição.',
      'eliminar a necessidade de leitura final.',
      'substituir a clareza das ideias pelo visual.'
    ],
    correctIndex: 1,
    explanation: 'Editores de texto ajudam na padronização, revisão e segurança do documento.',
  },
  {
    id: 324,
    subject: 'Informática',
    topic: 'Internet e segurança',
    level: 'Médio',
    statement: 'Uma boa prática contra phishing é',
    options: [
      'HTTPS, contexto do link e comportamento cauteloso do usuário.',
      'clicar em qualquer pop-up de atualização.',
      'reaproveitar a mesma senha em todos os serviços.',
      'desativar alertas do navegador para ganhar velocidade.'
    ],
    correctIndex: 0,
    explanation: 'Segurança na navegação envolve HTTPS, análise do contexto e cautela com links e anexos.',
  },
  {
    id: 325,
    subject: 'Informática',
    topic: 'Correio eletrônico e backup',
    level: 'Difícil',
    statement: 'A compactação de arquivos costuma ser útil para',
    options: [
      'dispensar antivírus e outras camadas de proteção.',
      'substituir políticas de acesso.',
      'garantir sozinha a autenticidade do remetente.',
      'proteger dados e facilitar envio ou recuperação quando necessário.'
    ],
    correctIndex: 3,
    explanation: 'E-mail seguro, backup e compactação fazem parte de uma rotina básica de proteção da informação.',
  },
  {
    id: 326,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Fácil',
    statement: 'A negação de uma proposição condicional ocorre quando',
    options: [
      'o antecedente é verdadeiro e o consequente é falso.',
      'o antecedente é falso e o consequente também.',
      'ambas as proposições são verdadeiras.',
      'há apenas uma proposição simples envolvida.'
    ],
    correctIndex: 0,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 327,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Médio',
    statement: 'Em uma razão 4 para 5, a primeira grandeza representa',
    options: [
      'o acréscimo é sempre igual a 20 unidades.',
      'o total passa automaticamente a ser 200%.',
      'a diferença absoluta dispensa cálculo proporcional.',
      'houve variação proporcional em relação ao valor inicial.'
    ],
    correctIndex: 3,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 328,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Difícil',
    statement: 'No estudo de padrões, é relevante observar',
    options: [
      'ignorar operações repetidas na série.',
      'buscar apenas a diferença absoluta final.',
      'testar regularidades entre termos consecutivos.',
      'assumir aleatoriedade desde o primeiro termo.'
    ],
    correctIndex: 2,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 329,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Fácil',
    statement: 'Em problemas de contagem, a ordem dos elementos importa quando',
    options: [
      'a repetição é obrigatória em toda contagem.',
      'a posição altera o resultado final da escolha.',
      'qualquer agrupamento produz o mesmo resultado.',
      'não existe diferença entre combinar e arranjar.'
    ],
    correctIndex: 1,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 330,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Médio',
    statement: 'Ao resolver uma situação envolvendo média simples, o cálculo básico consiste em',
    options: [
      'traduzir o enunciado em relações numéricas consistentes.',
      'substituir todos os dados por estimativas livres.',
      'dispensar conferência da unidade utilizada.',
      'ignorar a proporcionalidade descrita.'
    ],
    correctIndex: 0,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  },
  {
    id: 331,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Difícil',
    statement: 'A equivalência lógica de “se p, então q” pode ser expressa por',
    options: [
      'o antecedente é falso e o consequente também.',
      'ambas as proposições são verdadeiras.',
      'há apenas uma proposição simples envolvida.',
      'o antecedente é verdadeiro e o consequente é falso.'
    ],
    correctIndex: 3,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 332,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Fácil',
    statement: 'Se um valor aumenta 20%, isso significa que',
    options: [
      'o total passa automaticamente a ser 200%.',
      'a diferença absoluta dispensa cálculo proporcional.',
      'houve variação proporcional em relação ao valor inicial.',
      'o acréscimo é sempre igual a 20 unidades.'
    ],
    correctIndex: 2,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 333,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Médio',
    statement: 'Uma sequência lógica é resolvida com mais segurança quando',
    options: [
      'buscar apenas a diferença absoluta final.',
      'testar regularidades entre termos consecutivos.',
      'assumir aleatoriedade desde o primeiro termo.',
      'ignorar operações repetidas na série.'
    ],
    correctIndex: 1,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 334,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Difícil',
    statement: 'Para contar possibilidades sem repetição, o candidato deve',
    options: [
      'a posição altera o resultado final da escolha.',
      'qualquer agrupamento produz o mesmo resultado.',
      'não existe diferença entre combinar e arranjar.',
      'a repetição é obrigatória em toda contagem.'
    ],
    correctIndex: 0,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 335,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Fácil',
    statement: 'Em problemas aritméticos com repartição proporcional, é necessário',
    options: [
      'substituir todos os dados por estimativas livres.',
      'dispensar conferência da unidade utilizada.',
      'ignorar a proporcionalidade descrita.',
      'traduzir o enunciado em relações numéricas consistentes.'
    ],
    correctIndex: 3,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  },
  {
    id: 336,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Médio',
    statement: 'Uma condicional “se p, então q” será falsa somente se',
    options: [
      'ambas as proposições são verdadeiras.',
      'há apenas uma proposição simples envolvida.',
      'o antecedente é verdadeiro e o consequente é falso.',
      'o antecedente é falso e o consequente também.'
    ],
    correctIndex: 2,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 337,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Difícil',
    statement: 'Problemas de porcentagem e razão exigem',
    options: [
      'a diferença absoluta dispensa cálculo proporcional.',
      'houve variação proporcional em relação ao valor inicial.',
      'o acréscimo é sempre igual a 20 unidades.',
      'o total passa automaticamente a ser 200%.'
    ],
    correctIndex: 1,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 338,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Fácil',
    statement: 'Ao identificar um padrão em sequência numérica, o candidato deve',
    options: [
      'testar regularidades entre termos consecutivos.',
      'assumir aleatoriedade desde o primeiro termo.',
      'ignorar operações repetidas na série.',
      'buscar apenas a diferença absoluta final.'
    ],
    correctIndex: 0,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 339,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Médio',
    statement: 'Arranjos simples são aplicados quando',
    options: [
      'qualquer agrupamento produz o mesmo resultado.',
      'não existe diferença entre combinar e arranjar.',
      'a repetição é obrigatória em toda contagem.',
      'a posição altera o resultado final da escolha.'
    ],
    correctIndex: 3,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 340,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Difícil',
    statement: 'Questões aritméticas exigem principalmente',
    options: [
      'dispensar conferência da unidade utilizada.',
      'ignorar a proporcionalidade descrita.',
      'traduzir o enunciado em relações numéricas consistentes.',
      'substituir todos os dados por estimativas livres.'
    ],
    correctIndex: 2,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  },
  {
    id: 341,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Fácil',
    statement: 'A negação de uma proposição condicional ocorre quando',
    options: [
      'há apenas uma proposição simples envolvida.',
      'o antecedente é verdadeiro e o consequente é falso.',
      'o antecedente é falso e o consequente também.',
      'ambas as proposições são verdadeiras.'
    ],
    correctIndex: 1,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 342,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Médio',
    statement: 'Em uma razão 4 para 5, a primeira grandeza representa',
    options: [
      'houve variação proporcional em relação ao valor inicial.',
      'o acréscimo é sempre igual a 20 unidades.',
      'o total passa automaticamente a ser 200%.',
      'a diferença absoluta dispensa cálculo proporcional.'
    ],
    correctIndex: 0,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 343,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Difícil',
    statement: 'No estudo de padrões, é relevante observar',
    options: [
      'assumir aleatoriedade desde o primeiro termo.',
      'ignorar operações repetidas na série.',
      'buscar apenas a diferença absoluta final.',
      'testar regularidades entre termos consecutivos.'
    ],
    correctIndex: 3,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 344,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Fácil',
    statement: 'Em problemas de contagem, a ordem dos elementos importa quando',
    options: [
      'não existe diferença entre combinar e arranjar.',
      'a repetição é obrigatória em toda contagem.',
      'a posição altera o resultado final da escolha.',
      'qualquer agrupamento produz o mesmo resultado.'
    ],
    correctIndex: 2,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 345,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Médio',
    statement: 'Ao resolver uma situação envolvendo média simples, o cálculo básico consiste em',
    options: [
      'ignorar a proporcionalidade descrita.',
      'traduzir o enunciado em relações numéricas consistentes.',
      'substituir todos os dados por estimativas livres.',
      'dispensar conferência da unidade utilizada.'
    ],
    correctIndex: 1,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  },
  {
    id: 346,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Difícil',
    statement: 'A equivalência lógica de “se p, então q” pode ser expressa por',
    options: [
      'o antecedente é verdadeiro e o consequente é falso.',
      'o antecedente é falso e o consequente também.',
      'ambas as proposições são verdadeiras.',
      'há apenas uma proposição simples envolvida.'
    ],
    correctIndex: 0,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 347,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Fácil',
    statement: 'Se um valor aumenta 20%, isso significa que',
    options: [
      'o acréscimo é sempre igual a 20 unidades.',
      'o total passa automaticamente a ser 200%.',
      'a diferença absoluta dispensa cálculo proporcional.',
      'houve variação proporcional em relação ao valor inicial.'
    ],
    correctIndex: 3,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 348,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Médio',
    statement: 'Uma sequência lógica é resolvida com mais segurança quando',
    options: [
      'ignorar operações repetidas na série.',
      'buscar apenas a diferença absoluta final.',
      'testar regularidades entre termos consecutivos.',
      'assumir aleatoriedade desde o primeiro termo.'
    ],
    correctIndex: 2,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 349,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Difícil',
    statement: 'Para contar possibilidades sem repetição, o candidato deve',
    options: [
      'a repetição é obrigatória em toda contagem.',
      'a posição altera o resultado final da escolha.',
      'qualquer agrupamento produz o mesmo resultado.',
      'não existe diferença entre combinar e arranjar.'
    ],
    correctIndex: 1,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 350,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Fácil',
    statement: 'Em problemas aritméticos com repartição proporcional, é necessário',
    options: [
      'traduzir o enunciado em relações numéricas consistentes.',
      'substituir todos os dados por estimativas livres.',
      'dispensar conferência da unidade utilizada.',
      'ignorar a proporcionalidade descrita.'
    ],
    correctIndex: 0,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  },
  {
    id: 351,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Médio',
    statement: 'Uma condicional “se p, então q” será falsa somente se',
    options: [
      'o antecedente é falso e o consequente também.',
      'ambas as proposições são verdadeiras.',
      'há apenas uma proposição simples envolvida.',
      'o antecedente é verdadeiro e o consequente é falso.'
    ],
    correctIndex: 3,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 352,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Difícil',
    statement: 'Problemas de porcentagem e razão exigem',
    options: [
      'o total passa automaticamente a ser 200%.',
      'a diferença absoluta dispensa cálculo proporcional.',
      'houve variação proporcional em relação ao valor inicial.',
      'o acréscimo é sempre igual a 20 unidades.'
    ],
    correctIndex: 2,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 353,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Fácil',
    statement: 'Ao identificar um padrão em sequência numérica, o candidato deve',
    options: [
      'buscar apenas a diferença absoluta final.',
      'testar regularidades entre termos consecutivos.',
      'assumir aleatoriedade desde o primeiro termo.',
      'ignorar operações repetidas na série.'
    ],
    correctIndex: 1,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 354,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Médio',
    statement: 'Arranjos simples são aplicados quando',
    options: [
      'a posição altera o resultado final da escolha.',
      'qualquer agrupamento produz o mesmo resultado.',
      'não existe diferença entre combinar e arranjar.',
      'a repetição é obrigatória em toda contagem.'
    ],
    correctIndex: 0,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 355,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Difícil',
    statement: 'Questões aritméticas exigem principalmente',
    options: [
      'substituir todos os dados por estimativas livres.',
      'dispensar conferência da unidade utilizada.',
      'ignorar a proporcionalidade descrita.',
      'traduzir o enunciado em relações numéricas consistentes.'
    ],
    correctIndex: 3,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  },
  {
    id: 356,
    subject: 'Raciocínio Lógico',
    topic: 'Lógica proposicional',
    level: 'Fácil',
    statement: 'A negação de uma proposição condicional ocorre quando',
    options: [
      'ambas as proposições são verdadeiras.',
      'há apenas uma proposição simples envolvida.',
      'o antecedente é verdadeiro e o consequente é falso.',
      'o antecedente é falso e o consequente também.'
    ],
    correctIndex: 2,
    explanation: 'Na condicional, a única situação falsa é antecedente verdadeiro com consequente falso.',
  },
  {
    id: 357,
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem e razão',
    level: 'Médio',
    statement: 'Em uma razão 4 para 5, a primeira grandeza representa',
    options: [
      'a diferença absoluta dispensa cálculo proporcional.',
      'houve variação proporcional em relação ao valor inicial.',
      'o acréscimo é sempre igual a 20 unidades.',
      'o total passa automaticamente a ser 200%.'
    ],
    correctIndex: 1,
    explanation: 'Porcentagem e razão trabalham com comparação proporcional entre grandezas.',
  },
  {
    id: 358,
    subject: 'Raciocínio Lógico',
    topic: 'Sequências e padrões',
    level: 'Difícil',
    statement: 'No estudo de padrões, é relevante observar',
    options: [
      'testar regularidades entre termos consecutivos.',
      'assumir aleatoriedade desde o primeiro termo.',
      'ignorar operações repetidas na série.',
      'buscar apenas a diferença absoluta final.'
    ],
    correctIndex: 0,
    explanation: 'Sequências exigem observação do padrão de formação entre os termos.',
  },
  {
    id: 359,
    subject: 'Raciocínio Lógico',
    topic: 'Análise combinatória',
    level: 'Fácil',
    statement: 'Em problemas de contagem, a ordem dos elementos importa quando',
    options: [
      'qualquer agrupamento produz o mesmo resultado.',
      'não existe diferença entre combinar e arranjar.',
      'a repetição é obrigatória em toda contagem.',
      'a posição altera o resultado final da escolha.'
    ],
    correctIndex: 3,
    explanation: 'Quando a ordem importa, costuma-se trabalhar com arranjos ou permutações, conforme o caso.',
  },
  {
    id: 360,
    subject: 'Raciocínio Lógico',
    topic: 'Problemas aritméticos',
    level: 'Médio',
    statement: 'Ao resolver uma situação envolvendo média simples, o cálculo básico consiste em',
    options: [
      'dispensar conferência da unidade utilizada.',
      'ignorar a proporcionalidade descrita.',
      'traduzir o enunciado em relações numéricas consistentes.',
      'substituir todos os dados por estimativas livres.'
    ],
    correctIndex: 2,
    explanation: 'Problemas aritméticos dependem de interpretação correta e tradução adequada para operações matemáticas.',
  }
];

export const studyPlan: StudyPlanDay[] = [
  { day: 'Segunda', focus: 'Português + revisão 24h', goal: '20 questões + leitura de erros', duration: '1h30', status: 'done' },
  { day: 'Terça', focus: 'Informática + Raciocínio', goal: '2 blocos curtos + atalhos/planilhas', duration: '1h30', status: 'done' },
  { day: 'Quarta', focus: 'Direito Administrativo e Licitações', goal: 'Lei 14.133 + 15 questões', duration: '2h', status: 'today' },
  { day: 'Quinta', focus: 'Administração Pública', goal: 'Processos, governança e controle', duration: '2h', status: 'next' },
  { day: 'Sexta', focus: 'Simulado estilo Verbena', goal: '50 itens cronometrados + análise', duration: '3h', status: 'next' },
];

export const analystPriorityTrail: StudyPriorityTrailItem[] = [
  {
    id: 'trilha-1',
    subject: 'Administração Pública',
    topic: 'Planejamento, gestão estratégica e processos',
    reason: 'É o miolo do cargo e conversa direto com rotina administrativa.',
    action: 'Resolver bloco médio + revisar erros em 24h.',
    targetQuestions: 18,
    difficultyFocus: 'Misto',
    priority: 'alta',
  },
  {
    id: 'trilha-2',
    subject: 'Direito Administrativo e Licitações',
    topic: 'Princípios, atos, poderes e Lei 14.133/2021',
    reason: 'Alta incidência e muito ponto em detalhes de legalidade e procedimento.',
    action: 'Fechar mapa mental e 15 questões comentadas.',
    targetQuestions: 15,
    difficultyFocus: 'Difícil',
    priority: 'alta',
  },
  {
    id: 'trilha-3',
    subject: 'Português',
    topic: 'Interpretação, pontuação, regência e reescrita',
    reason: 'Matéria que sustenta nota e evita perda boba de pontos.',
    action: 'Bloco rápido de 12 questões + leitura de justificativas.',
    targetQuestions: 12,
    difficultyFocus: 'Médio',
    priority: 'alta',
  },
  {
    id: 'trilha-4',
    subject: 'Informática',
    topic: 'Excel, segurança e atalhos de produtividade',
    reason: 'Costuma cair de forma objetiva e é matéria para ganhar velocidade.',
    action: 'Revisão prática + 10 questões curtas.',
    targetQuestions: 10,
    difficultyFocus: 'Fácil',
    priority: 'media',
  },
  {
    id: 'trilha-5',
    subject: 'Raciocínio Lógico',
    topic: 'Porcentagem, proporcionalidade e lógica proposicional',
    reason: 'Aumenta nota líquida se houver rotina curta e frequente.',
    action: 'Treino de 10 questões e registro de pegadinhas.',
    targetQuestions: 10,
    difficultyFocus: 'Médio',
    priority: 'media',
  },
];

export const studySubjectProgressSeed: StudySubjectProgress[] = [
  { subject: 'Administração Pública', progress: 18, streak: 2, accuracy: 0, pendingReviews: 10, attempts: 0, correct: 0, wrong: 0, totalQuestions: 0, studyMomentum: 52 },
  { subject: 'Direito Administrativo e Licitações', progress: 22, streak: 2, accuracy: 0, pendingReviews: 12, attempts: 0, correct: 0, wrong: 0, totalQuestions: 0, studyMomentum: 48 },
  { subject: 'Português', progress: 30, streak: 3, accuracy: 0, pendingReviews: 8, attempts: 0, correct: 0, wrong: 0, totalQuestions: 0, studyMomentum: 58 },
  { subject: 'Informática', progress: 16, streak: 1, accuracy: 0, pendingReviews: 9, attempts: 0, correct: 0, wrong: 0, totalQuestions: 0, studyMomentum: 46 },
  { subject: 'Raciocínio Lógico', progress: 20, streak: 2, accuracy: 0, pendingReviews: 11, attempts: 0, correct: 0, wrong: 0, totalQuestions: 0, studyMomentum: 50 },
];

export const studySummarySeed: StudySummary = {
  totalAttempts: 0,
  totalCorrect: 0,
  accuracy: 0,
  currentStreak: 3,
  pendingReviews: studySubjectProgressSeed.reduce((sum, item) => sum + item.pendingReviews, 0),
  completedToday: 0,
  simulatedExams: 0,
  weeklyGoal: 120,
  weakSubjects: [],
  dueReviews: 0,
};

export const studyEssayPrompts: StudyEssayPrompt[] = [
  {
    id: 'disc-1',
    title: 'Eficiência no atendimento ao cidadão',
    subject: 'Administração Pública',
    topic: 'Gestão por processos e qualidade',
    prompt: 'Explique como o mapeamento de processos e o uso de indicadores podem elevar a eficiência do atendimento ao cidadão em um órgão público. Apresente introdução, desenvolvimento com dois argumentos e conclusão propositiva.',
    structure: ['Introdução com tese', 'Argumento 1: gargalos e fluxo', 'Argumento 2: indicadores e melhoria contínua', 'Conclusão com proposta viável'],
    evaluationCriteria: ['Aderência ao tema', 'Clareza e coesão', 'Domínio do conteúdo administrativo', 'Proposta objetiva'],
  },
  {
    id: 'disc-2',
    title: 'Planejamento da contratação pública',
    subject: 'Direito Administrativo e Licitações',
    topic: 'Lei nº 14.133/2021',
    prompt: 'Redija texto dissertativo sobre a importância da fase preparatória da contratação pública, destacando estudo técnico preliminar, termo de referência e gestão de riscos.',
    structure: ['Contextualização da nova lógica legal', 'Papel do ETP', 'Importância do termo de referência e riscos', 'Fechamento'],
    evaluationCriteria: ['Base legal mínima', 'Organização de ideias', 'Vocabulário técnico adequado', 'Conclusão consistente'],
  },
  {
    id: 'disc-3',
    title: 'Comunicação oficial clara',
    subject: 'Português',
    topic: 'Coesão, pontuação e reescrita',
    prompt: 'Defenda a importância da clareza e da objetividade na comunicação oficial, relacionando coesão, pontuação e revisão textual à prevenção de retrabalho administrativo.',
    structure: ['Tese inicial', 'Desenvolvimento sobre clareza', 'Desenvolvimento sobre revisão e retrabalho', 'Conclusão'],
    evaluationCriteria: ['Norma-padrão', 'Argumentação', 'Coesão textual', 'Pertinência ao contexto administrativo'],
  },
];

export const editalSubjects = [
  {
    subject: 'Língua Portuguesa',
    topics: [
      'Compreensão e interpretação de textos',
      'Sentido vocabular e relações semânticas',
      'Morfossintaxe e classes gramaticais',
      'Concordância, regência e crase',
      'Pontuação e reescrita',
    ],
  },
  {
    subject: 'Raciocínio Lógico-Matemático',
    topics: [
      'Proposições e conectivos',
      'Equivalências e negações',
      'Porcentagem, razão e proporção',
      'Problemas aritméticos',
      'Sequências e análise de padrões',
    ],
  },
  {
    subject: 'Noções de Informática',
    topics: [
      'Windows e gerenciamento de arquivos',
      'Word, Excel e PowerPoint',
      'Backup, impressão e compactação',
      'Aplicativos corporativos e comunicação',
      'Navegação web e segurança em e-mail',
    ],
  },
  {
    subject: 'Legislação aplicada ao Setor Público',
    topics: [
      'CF/88, arts. 37 a 41',
      'Ética no setor público',
      'Princípios, poderes, atos e processo administrativo',
      'Lei nº 14.133/2021 e Lei nº 13.019/2014',
      'Improbidade administrativa',
      'PPA, LDO e LOA',
      'Controle interno e externo',
      'LAI e LGPD',
      'Lei Orgânica e Estatuto dos Servidores de Senador Canedo',
    ],
  },
  {
    subject: 'Conhecimentos Específicos, Analista Administrativo',
    topics: [
      'Administração Pública e regime jurídico-administrativo',
      'Planejamento, organização, direção e controle',
      'Gestão estratégica e tipos de planejamento',
      'Serviços públicos e organização setorial',
      'Mapeamento, melhoria e modelagem de processos',
      'Atos administrativos, administração indireta e órgãos públicos',
      'Responsabilidade civil do Estado e bens públicos',
      'Excelência, qualidade, governança e governabilidade',
      'Accountability e mecanismos de controle',
      'Lei nº 14.133/2021, Lei nº 13.019/2014 e Lei Orgânica local',
    ],
  },
];
