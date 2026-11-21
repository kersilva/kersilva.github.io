/* ============================================================
   DADOS DO PORTFÓLIO — extraídos do relatório de análise
   (todas as informações do portfólio atual, remapeadas)
   Edite aqui para mudar conteúdo; não é preciso tocar na UI.
   ============================================================ */

export const pessoa = {
  nome: "Kelwin Felipe Rocha Silva",
  nomeCurto: "kelwin",
  titulo: {
    pt: "Desenvolvedor Web Full-Stack",
    en: "Full-Stack Web Developer",
  },
  localizacao: { pt: "São Paulo, Brasil", en: "São Paulo, Brazil" },
  github: "https://github.com/kersilva",
  githubFoto: "https://github.com/kersilva.png",
  linkedin: "https://linkedin.com/in/kersilva",
  email: "kelwinrocha5@gmail.com",
  curriculum:
    "https://drive.google.com/file/d/1Kk82ofHbdsqpudlx2uIZajN6bZfKExv2/view",
  marcaRodape: "© 2026 kelwin",
};

/* ------------------------------------------------------------------ */

type Nivel = "básico" | "autônomo" | "fluente";

export type ProjetoTipo =
  | "projeto_academico"
  | "profissional"
  | "pessoal"
  | "atividade_academica";

export type Projeto = {
  slug: string;
  nome: string;
  tipo: ProjetoTipo;
  instituicao?: string; // só para acadêmicos (FATEC)
  periodo: string; // ex.: "2025/2"
  empresaParceira?: string; // obrigatório nos acadêmicos (API), sem logo
  repositorioOriginal: string;
  repositorioPessoal?: string; // cópia na sua conta, para evitar quebra de link
  stack: string[];
  resumo: { pt: string; en: string };
  problema?: { pt: string; en: string }; // situação-problema, não "falta de sistema"
  solucao?: { pt: string; en: string };
  contribuicoes?: { pt: string; en: string }; // o que VOCÊ fez
  hardSkills?: { nome: string; nivel: Nivel }[];
  softSkills?: { pt: string[]; en: string[] };
  resultados?: { pt: string[]; en: string[] };
  demonstracao?: string; // print ou GIF, o PDF pede resultados visíveis
  capa: string;
  corCapa: string;
};

const imagemPublica = (arquivo: string) =>
  `${import.meta.env.BASE_URL}img/projetos/${arquivo}`;

export const projetos: Projeto[] = [
  {
    slug: "radar-cidadao",
    nome: "radar cidadão",
    tipo: "projeto_academico",
    instituicao: "FATEC São José dos Campos",
    periodo: "2026/1",
    empresaParceira:
      "Professores Fernando Masanori Ashikaga e Jean Carlos Lourenço Costa (simulando o parceiro)",
    repositorioOriginal: "https://github.com/APILumina/API1_DSM_Lumina",
    repositorioPessoal: "https://github.com/kersilva/API1_DSM_Lumina",
    stack: [
      "Python",
      "Flask",
      "MariaDB",
      "AWS",
      "Docker",
      "JavaScript",
      "Tailwind",
      "HTML",
      "CSS",
    ],
    resumo: {
      pt: "Plataforma de transparência que avalia a atividade legislativa de deputados federais brasileiros com uma nota calculada a partir de dados públicos.",
      en: "Transparency platform that rates the legislative activity of Brazilian federal deputies with a score calculated from public data.",
    },
    problema: {
      pt: "É difícil para o cidadão saber como cada deputado federal atua, porque os dados públicos sobre atividade legislativa estão dispersos e não são apresentados de forma comparável.",
      en: "It is hard for citizens to know how each federal deputy performs, because public data on legislative activity is scattered and not presented in a comparable way.",
    },
    solucao: {
      pt: "Aplicação em Flask que consome dados públicos sobre deputados federais (cerca de 200 mil registros), armazena em MariaDB e calcula uma nota para cada deputado a partir desses dados, com consulta por deputado e por atividade. A nota considera projetos apresentados, projetos aprovados, presença e projetos por categorias relevantes. A aplicação roda em uma instância AWS EC2 e foi containerizada com Docker.",
      en: "Flask application that consumes public data about federal deputies (about 200 thousand records), stores it in MariaDB, and calculates a score for each deputy from that data, with queries by deputy and by activity. The score considers projects submitted, projects approved, attendance and projects in relevant categories. The application runs on an AWS EC2 instance and was containerized with Docker.",
    },
    contribuicoes: {
      pt: "Desenvolvimento das telas, das rotas da aplicação em Flask e da coleta dos dados públicos de deputados federais, dentro de um projeto em grupo.",
      en: "Development of the screens, the Flask application routes, and the collection of public data about federal deputies, within a group project.",
    },
    hardSkills: [
      { nome: "Flask", nivel: "básico" },
      { nome: "MariaDB", nivel: "autônomo" },
      { nome: "Docker", nivel: "básico" },
      { nome: "AWS EC2", nivel: "básico" },
    ],
    softSkills: {
      pt: [
        "Gestão de prazo sob pressão: o projeto teve atrasos, e precisei concluir parte do trabalho na madrugada que antecedeu a entrega. Depois disso, o ritmo do grupo melhorou e não houve novos atrasos.",
      ],
      en: [
        "Deadline management under pressure: the project had delays, and I had to finish part of the work overnight before the deadline. After that, the group's pace improved and there were no further delays.",
      ],
    },
    resultados: {
      pt: ["Consulta funcional de deputados e de atividade legislativa."],
      en: ["Functional query of deputies and legislative activity."],
    },
    capa: imagemPublica("radar-cidadao.png"),
    corCapa: "#f97316",
  },
  {
    slug: "fahren",
    nome: "fahren",
    tipo: "atividade_academica",
    instituicao:
      "Etec Prof. Ilza Nascimento Pintus (técnico em Desenvolvimento de Sistemas)",
    periodo: "2025",
    repositorioOriginal: "https://github.com/kersilva/TCC",
    repositorioPessoal: "https://github.com/kersilva/TCC",
    stack: ["PHP", "MySQL", "jQuery", "Bootstrap", "JavaScript", "HTML", "CSS"],
    resumo: {
      pt: "Plataforma premium de anúncios de veículos, inspirada no OLX, que conecta compradores e vendedores por meio de um chat interno.",
      en: "Premium vehicle listing platform, inspired by OLX, that connects buyers and sellers through an internal chat.",
    },
    problema: {
      pt: "Vendedores de veículos de maior valor não encontram, em plataformas generalistas como o OLX, um espaço que combine com o perfil do produto, porque o site é associado à venda de carros populares usados.",
      en: "Sellers of higher-value vehicles do not find, on general platforms like OLX, a space that matches the profile of their product, because the site is associated with selling used popular cars.",
    },
    solucao: {
      pt: "Plataforma em PHP e MySQL com cadastro, categorias, filtros, pesquisa e troca de foto de perfil. O vendedor publica o anúncio e o comprador conversa com ele pelo chat da própria plataforma. A proposta é uma versão premium de classificados de veículos.",
      en: "PHP and MySQL platform with registration, categories, filters, search and profile picture change. The seller publishes the listing and the buyer talks to the seller through the platform's own chat. The proposal is a premium version of a vehicle classifieds site.",
    },
    contribuicoes: {
      pt: "Desenvolvimento de cerca de 90% do projeto em uma equipe de quatro pessoas, incluindo cadastro, categorias, filtros, pesquisa, troca de foto de perfil e o front-end do chat. Também refiz telas feitas por outro integrante.",
      en: "Development of about 90% of the project in a four-person team, including registration, categories, filters, search, profile picture change, and the chat front end. I also rebuilt screens made by another team member.",
    },
    hardSkills: [
      { nome: "PHP", nivel: "básico" },
      { nome: "MySQL", nivel: "autônomo" },
      { nome: "JavaScript", nivel: "autônomo" },
      { nome: "jQuery", nivel: "autônomo" },
      { nome: "Bootstrap", nivel: "autônomo" },
    ],
    softSkills: {
      pt: [
        "Divisão de responsabilidades: no TCC, concentrei muitas tarefas e não deixei os outros integrantes assumirem partes do trabalho. Percebi o problema e passei a dividir melhor as tarefas.",
      ],
      en: [
        "Task delegation: in the TCC, I concentrated many tasks and did not let the other team members take on parts of the work. I recognized the problem and started to delegate better.",
      ],
    },
    resultados: {
      pt: [
        "Cadastro de usuários e troca de foto de perfil.",
        "Cadastro, categorias, filtros e pesquisa de veículos.",
        "Chat entre vendedor e comprador.",
      ],
      en: [
        "User registration and profile picture change.",
        "Vehicle listing, categories, filters and search.",
        "Chat between seller and buyer.",
      ],
    },
    capa: imagemPublica("tcc.png"),
    corCapa: "#38bdf8",
  },
  {
    slug: "hive",
    nome: "hive",
    tipo: "projeto_academico",
    instituicao: "FATEC Prof. Jessen Vidal",
    periodo: "2026/2",
    empresaParceira: "ALTAVE",
    repositorioOriginal:
      "https://github.com/leovmatiusso/API2_DSM_SprintingCheetahs",
    repositorioPessoal:
      "https://github.com/kersilva/API2_DSM_SprintingCheetahs",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MariaDB",
      "AWS",
      "Tailwind",
      "HTML",
      "CSS",
      "JavaScript",
    ],
    resumo: {
      pt: "Sistema de gestão de Ordens de Serviço para a ALTAVE, com hierarquia de permissões, divisão por setores, comunicação entre equipes e acompanhamento das OS.",
      en: "Service order management system for ALTAVE, with permission hierarchy, sector division, communication between teams and tracking of service orders.",
    },
    problema: {
      pt: "As equipes da ALTAVE tinham dificuldade de se comunicar e de gerenciar novos produtos e pedidos de manutenção, sem clareza sobre as etapas de andamento de cada atividade.",
      en: "ALTAVE's teams had difficulty communicating and managing new product requests and maintenance orders, with no clear view of the progress of each activity.",
    },
    solucao: {
      pt: "Sistema web para registrar, acompanhar e detalhar Ordens de Serviço, com hierarquia de permissões por função, divisão por setores, comunicação entre equipes e histórico de cada OS. O projeto segue a metodologia Scrum, com sprints de três semanas.",
      en: "Web system to register, track and detail service orders, with role-based permissions, sector division, communication between teams and a history for each order. The project follows Scrum, with three-week sprints.",
    },
    contribuicoes: {
      pt: "Desenvolvimento de telas e rotas como membro do Dev Team, com responsabilidade pela responsividade do sistema. Implementei as histórias de cadastro de usuários e vínculo com times, definição de papéis, solicitação de novo produto, anexo de laudos em PDF, edição de OS e notificações de novos projetos, mudanças relevantes e OS críticas.",
      en: "Development of screens and routes as a Dev Team member, with responsibility for the system's responsiveness. I implemented the stories for user registration and team assignment, role definition, new product requests, PDF report attachments, OS editing, and notifications for new projects, relevant changes and critical OS.",
    },
    hardSkills: [
      { nome: "React", nivel: "autônomo" },
      { nome: "TypeScript", nivel: "autônomo" },
      { nome: "Node.js / Express", nivel: "autônomo" },
      { nome: "MariaDB", nivel: "autônomo" },
      { nome: "Tailwind", nivel: "fluente" },
    ],
    softSkills: {
      pt: [
        "Comunicação em equipe: em um projeto com oito integrantes, houve problemas de comunicação. Para melhorar, a equipe passou a registrar no Discord tudo o que foi feito no dia.",
      ],
      en: [
        "Team communication: in a project with eight members, there were communication problems. To improve, the team started posting everything done each day on Discord.",
      ],
    },
    resultados: {
      pt: [
        "Telas e rotas das funcionalidades sob minha responsabilidade funcionando.",
        "Responsividade das telas, sob minha responsabilidade.",
      ],
      en: [
        "Screens and routes of the features under my responsibility working.",
        "Responsiveness of the screens, under my responsibility.",
      ],
    },
    capa: imagemPublica("hive.png"),
    corCapa: "#ffffff",
  },
  {
    slug: "notepad",
    nome: "notepad",
    tipo: "atividade_academica",
    instituicao: "FATEC São José dos Campos",
    periodo: "2026/1",
    repositorioOriginal: "https://github.com/kersilva/desafio4",
    repositorioPessoal: "https://github.com/kersilva/desafio4",
    stack: ["Python", "Flask", "MySQL"],
    resumo: {
      pt: "Versão aprimorada do notepad do invertexto.com: um código de acesso abre um ambiente com várias anotações, cada uma com título, edição e salvamento, persistidas em MySQL.",
      en: "An improved version of the invertexto.com notepad: an access code opens a space with several notes, each with a title, editing and saving, persisted in MySQL.",
    },
    problema: {
      pt: "No notepad do invertexto.com, cada código de acesso abre apenas uma área de texto. Quem quer organizar várias anotações precisa lembrar de vários códigos, o que dificulta encontrar e atualizar cada uma.",
      en: "On the invertexto.com notepad, each access code opens only one text area. Anyone who wants to organize several notes has to remember several codes, which makes it hard to find and update each one.",
    },
    solucao: {
      pt: "Aplicação em Flask em que um código de acesso abre um ambiente próprio para criar várias anotações, dar título, editar e salvar. As anotações ficam em MySQL, e as credenciais de conexão ficam em um arquivo .env.",
      en: "Flask application in which an access code opens its own space for creating several notes, giving them a title, editing and saving. Notes are stored in MySQL, and connection credentials are kept in a .env file.",
    },
    contribuicoes: {
      pt: "Desenvolvimento individual de todo o projeto: estrutura da aplicação em Flask com Blueprints, conexão com o MySQL, script SQL de criação do banco, configuração das variáveis de ambiente com python-dotenv e versionamento no Git.",
      en: "Individual development of the entire project: Flask application structure with Blueprints, MySQL connection, SQL script to create the database, environment variable setup with python-dotenv, and version control with Git.",
    },
    hardSkills: [
      { nome: "Flask", nivel: "básico" },
      { nome: "MySQL", nivel: "autônomo" },
      { nome: "Git / GitHub", nivel: "autônomo" },
    ],
    softSkills: { pt: [], en: [] },
    resultados: {
      pt: [
        "Criação de várias anotações dentro de um mesmo código de acesso.",
        "Título, edição e salvamento de cada anotação, persistidos em MySQL.",
        "Exclusão de anotações.",
      ],
      en: [
        "Creating several notes under the same access code.",
        "Title, editing and saving of each note, persisted in MySQL.",
        "Deleting notes.",
      ],
    },
    capa: imagemPublica("def4.png"),
    corCapa: "#f5f5f4",
  },
  {
    slug: "roteiro-cultural",
    nome: "roteiro cultural",
    tipo: "atividade_academica",
    instituicao:
      "Etec Prof. Ilza Nascimento Pintus (técnico em Desenvolvimento de Sistemas)",
    periodo: "2025/2",
    repositorioOriginal: "https://github.com/kelwin3ds/webapp",
    repositorioPessoal: "https://github.com/kersilva/roteiro-cultural",
    stack: ["JavaScript", "HTML", "CSS", "PHP", "jQuery"],
    resumo: {
      pt: "Plataforma para cadastrar e explorar eventos culturais, com criação de conta, login, página de detalhes de cada evento e mapa com a localização.",
      en: "Platform to register and explore cultural events, with account creation, login, a detail page for each event and a map showing its location.",
    },
    problema: {
      pt: "Projeto da disciplina para aprender a integrar APIs externas a um site.",
      en: "Course project to learn how to integrate external APIs into a website.",
    },
    solucao: {
      pt: "Aplicação com PHP, JavaScript e jQuery que permite criar conta, fazer login, cadastrar eventos e acessar a página de cada evento. Cada evento mostra sua localização em um mapa do Google Maps, carregado a partir da API externa.",
      en: "Application built with PHP, JavaScript and jQuery that lets users create an account, log in, register events and open each event's page. Each event shows its location on a Google Maps map, loaded from the external API.",
    },
    contribuicoes: {
      pt: "Desenvolvimento individual de todo o projeto: criação de conta, login, cadastro de eventos, páginas de detalhe e integração do mapa com a API externa.",
      en: "Individual development of the entire project: account creation, login, event registration, detail pages, and map integration with the external API.",
    },
    hardSkills: [
      { nome: "PHP", nivel: "básico" },
      { nome: "JavaScript", nivel: "autônomo" },
      { nome: "jQuery", nivel: "autônomo" },
    ],
    softSkills: { pt: [], en: [] },
    resultados: {
      pt: [
        "Criação de conta e login.",
        "Cadastro de eventos.",
        "Páginas de detalhe dos eventos.",
        "Mapa com a localização de cada evento.",
      ],
      en: [
        "Account creation and login.",
        "Event registration.",
        "Event detail pages.",
        "Map showing each event's location.",
      ],
    },
    capa: imagemPublica("webapp.png"),
    corCapa: "#c084fc",
  },
];

/* ------------------------------------------------------------------ */

export interface CategoriaSkill {
  id: string;
  /** rótulo em caixa alta exibido (mesma língua do site) */
  rotulo: { pt: string; en: string };
  skills: string[];
}

export const skills: CategoriaSkill[] = [
  {
    id: "frontend",
    rotulo: { pt: "FRONTEND", en: "FRONTEND" },
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "jQuery",
      "Tailwind",
      "Bootstrap",
    ],
  },
  {
    id: "backend",
    rotulo: { pt: "BACKEND", en: "BACKEND" },
    skills: ["PHP", "Python", "Flask", "Express.js", "Fastify", "Node.js"],
  },
  {
    id: "database",
    rotulo: { pt: "BANCO DE DADOS", en: "DATABASE" },
    skills: ["MySQL", "PostgreSQL", "MariaDB"],
  },
  {
    id: "tools",
    rotulo: { pt: "FERRAMENTAS", en: "TOOLS" },
    skills: ["Git", "Docker", "AWS", "XAMPP", "Figma"],
  },
];

/* ------------------------------------------------------------------ */

export interface ItemTimeline {
  titulo: string;
  instituicao: string;
  descricao: { pt: string; en: string };
  periodo?: string; // ← preencha quando souber (lacuna do relatório)
}

export const formacao: ItemTimeline[] = [
  {
    titulo: "Desenvolvimento de Sistemas",
    instituicao: "ETEC - Prof. Ilza Nascimento Pintus",
    descricao: {
      pt: "Formação técnica para analisar e projetar sistemas, desenvolver, documentar, testar e manter sistemas de informação, além de modelar e manter bancos de dados.",
      en: "Technical training in analyzing and designing systems, developing, documenting, testing, and maintaining information systems, as well as modeling and maintaining databases.",
    },
    periodo: "2024–2025",
  },
  {
    titulo: "Desenvolvimento de Software Multiplataforma (DSM)",
    instituicao: "FATEC São José dos Campos – Prof. Jessen Vidal",
    descricao: {
      pt: "Graduação tecnológica em construção de software para web e multiplataforma, com projetos práticos em equipe.",
      en: "Technologist degree in web and multiplatform software construction, with hands-on team projects.",
    },
    periodo: "2026–2028",
  },
];

export interface Certificado {
  id: string;
  titulo: { pt: string; en: string };
  emissor: string;
  ano: string;
  imagem: string;
  descricao: { pt: string; en: string };
}

const imagemCertificado = (arquivo: string) =>
  `${import.meta.env.BASE_URL}img/certificados/${arquivo}`;

export const certificados: Certificado[] = [
  {
    id: "cuco-2023",
    titulo: {
      pt: "CUCO 2023 — Categoria Ouro",
      en: "CUCO 2023 — Gold Category",
    },
    emissor: "Competição USP de Conhecimentos e Oportunidades (CUCO)",
    ano: "2023",
    imagem: imagemCertificado("cuco-2023.jpg"),
    descricao: {
      pt: "Prêmio Destaque na Escola pelo melhor desempenho na 7ª edição da competição.",
      en: "School Highlight Award for the best performance in the competition's 7th edition.",
    },
  },
  {
    id: "cuco-2024",
    titulo: {
      pt: "CUCO 2024 — Categoria Ouro",
      en: "CUCO 2024 — Gold Category",
    },
    emissor: "Competição USP de Conhecimentos e Oportunidades (CUCO)",
    ano: "2024",
    imagem: imagemCertificado("cuco-2024.jpg"),
    descricao: {
      pt: "Prêmio Destaque na Escola pelo melhor desempenho na 8ª edição da competição.",
      en: "School Highlight Award for the best performance in the competition's 8th edition.",
    },
  },
  {
    id: "linguaskill",
    titulo: { pt: "Linguaskill General — B2", en: "Linguaskill General — B2" },
    emissor: "Cambridge English",
    ano: "2024",
    imagem: imagemCertificado("linguaskill.jpg"),
    descricao: {
      pt: "Relatório de teste de inglês com nível geral B2 no CEFR.",
      en: "English test report with an overall CEFR level of B2.",
    },
  },
  {
    id: "saga",
    titulo: { pt: "Curso Start 5.0", en: "Start 5.0 Course" },
    emissor: "SAGA São José",
    ano: "2022",
    imagem: imagemCertificado("saga.jpg"),
    descricao: {
      pt: "Formação com módulos de composição de imagens, arte vetorial, vídeo, animação, pintura digital e programação.",
      en: "Training with modules in image composition, vector art, video, animation, digital painting, and programming.",
    },
  },
  {
    id: "science-business-connection",
    titulo: {
      pt: "4º Science & Business Connection",
      en: "4th Science & Business Connection",
    },
    emissor: "Parque de Inovação Tecnológica de São José dos Campos",
    ano: "2026",
    imagem: imagemCertificado("science.jpg"),
    descricao: {
      pt: "Participação no evento, com carga horária total de 20 horas.",
      en: "Event attendance, with a total workload of 20 hours.",
    },
  },
];
