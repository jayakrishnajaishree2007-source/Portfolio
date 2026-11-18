export interface AchievementItem {
  id: string;
  index: string;
  metric: string;
  numericTarget?: number;
  numericSuffix?: string;
  title: string;
  subtitle: string;
  detail?: string;
  accent: 'cyan' | 'chrome' | 'graphite';
}

export type ProjectVisualType = 'alumni' | 'student' | 'routine' | 'traffic-te';

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  highlights: string[];
  modules?: string[];
  technologies: string[];
  stackGroups?: { label: string; value: string }[];
  visualType: ProjectVisualType;
  architectureLabel: string;
  scopeNote?: string;
  githubUrl: string;
  metrics: { label: string; value: string }[];
  architectureSteps: { stage: string; detail: string }[];
}

export interface ExperienceMilestone {
  id: string;
  index: string;
  period: string;
  type: 'Education' | 'Internship' | 'Leadership' | 'Web Studio';
  role: string;
  organization: string;
  summary: string;
  highlights: string[];
  linkUrl?: string;
  linkLabel?: string;
}

export type SkillCategory =
  | 'All'
  | 'Programming'
  | 'Web Development'
  | 'Networking'
  | 'AI / Machine Learning'
  | 'Databases & Tools';

export interface SkillItem {
  name: string;
  category: Exclude<SkillCategory, 'All'>;
  context: string;
  accent: 'cyan' | 'chrome' | 'graphite';
}

export const PROFILE = {
  brand: 'JAYAKRISHNA®',
  shortMark: 'JK.',
  fullName: 'Jayakrishna J',
  heroDisplayName: 'JAYAKRISHNA',
  roleLine: 'Developer · Computer Networking · AI/ML',
  tagline: 'Engineering ideas into real-world systems.',
  footerTagline: 'Engineering Ideas. Building Possibilities.',
  heroIntro:
    'Diploma student in Computer Networking at PSG Polytechnic College building full-stack web platforms, relational database architectures, AI-assisted study systems, and Segment Routing traffic engineering workflows.',
  aboutBio1:
    'I am a Diploma student in Computer Networking at PSG Polytechnic College. I enjoy building practical software systems and exploring how artificial intelligence makes computer networks smarter, resilient, and more observable.',
  aboutBio2:
    'Across networking infrastructure, applied machine learning, and end-to-end web engineering, I focus on turning real institutional and technical constraints into clean, structured systems.',
  email: 'jayakrishnajaishree2007@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jayakrishna-j-340bb6361/',
  github: 'https://github.com/jayakrishnajaishree2007-source',
  servicesUrl: 'https://aethelontech.in',
  servicesDomain: 'aethelontech.in',
  education: {
    degree: 'Diploma in Computer Networking',
    institution: 'PSG Polytechnic College',
    period: 'June 2025 – May 2027',
  },
  currentRole: {
    title: 'Secretary — Computer Networking Association',
    period: '2026–27',
    organization: 'PSG Polytechnic College',
  },
  internship: {
    role: 'Full Stack Development Intern',
    company: 'Redback IT Solutions Private Limited',
    period: 'April 2026 – May 2026',
    highlights: [
      'Frontend and backend development',
      'Database integration',
      'Python-based web applications',
      'Software testing and refinement',
    ],
  },
};

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-rank1-sem3',
    index: '01',
    metric: '10',
    numericTarget: 10,
    title: 'First Rank — 3rd Semester',
    subtitle: '10 CGPA · Academic Excellence',
    detail:
      'Achieved 1st Rank in the 3rd Semester with a 10 CGPA in Diploma in Computer Networking at PSG Polytechnic College.',
    accent: 'cyan',
  },
  {
    id: 'ach-santekfest',
    index: '02',
    metric: '01st',
    numericTarget: 1,
    numericSuffix: 'st',
    title: 'National-Level Paper Presentation',
    subtitle: '1st Prize — SanTekFest 2K26',
    detail:
      'Awarded 1st Prize in the National-Level Technical Paper Presentation at SanTekFest 2K26.',
    accent: 'chrome',
  },
  {
    id: 'ach-state',
    index: '03',
    metric: '02nd',
    numericTarget: 2,
    numericSuffix: 'nd',
    title: 'State Level Paper Presentation',
    subtitle: '2nd Place Distinction',
    detail: 'Technical paper presentation recognized at state inter-collegiate level.',
    accent: 'graphite',
  },
  {
    id: 'ach-national',
    index: '04',
    metric: '03rd',
    numericTarget: 3,
    numericSuffix: 'rd',
    title: 'National Level Paper Presentation',
    subtitle: '3rd Place Distinction',
    detail: 'Presented applied technical research on intelligent systems at national level.',
    accent: 'cyan',
  },
  {
    id: 'ach-projects',
    index: '05',
    metric: '4+',
    numericTarget: 4,
    numericSuffix: '+',
    title: 'Major Engineering Systems',
    subtitle: 'Full-Stack, Database, AI & Networking',
    detail:
      'Alumni Management System, Student Module, AetherRoutine, and Predictive Traffic Engineering using Segment Routing.',
    accent: 'chrome',
  },
  {
    id: 'ach-secretary',
    index: '06',
    metric: '26–27',
    title: 'Department Secretary',
    subtitle: 'Computer Networking Association',
    detail: 'Leading student technical initiatives at PSG Polytechnic College.',
    accent: 'graphite',
  },
  {
    id: 'ach-focus',
    index: '07',
    metric: 'TE·SR',
    title: 'Primary Technical Focus',
    subtitle: 'AI/ML + Computer Networking',
    detail: 'Traffic engineering, Segment Routing topologies, and full-stack web architectures.',
    accent: 'cyan',
  },
];

export const EXPERIENCE_TIMELINE: ExperienceMilestone[] = [
  {
    id: 'exp-dcn',
    index: '01',
    period: 'June 2025 – May 2027',
    type: 'Education',
    role: 'Diploma in Computer Networking',
    organization: 'PSG Polytechnic College',
    summary:
      'Foundational and applied coursework in routing, switching, network engineering, Linux environments, and software development.',
    highlights: [
      'Routing & switching topology labs',
      'Access connectivity & diagnostics',
      'Structured relational database design',
    ],
  },
  {
    id: 'exp-internship',
    index: '02',
    period: 'April 2026 – May 2026',
    type: 'Internship',
    role: 'Full Stack Development Intern',
    organization: 'Redback IT Solutions Private Limited',
    summary:
      'Contributed directly to production-oriented Python web applications, backend logic, and database integrations.',
    highlights: [
      'Frontend and backend development',
      'Database integration',
      'Python-based web applications',
      'Software testing and refinement',
    ],
  },
  {
    id: 'exp-secretary',
    index: '03',
    period: '2026–27 Term',
    type: 'Leadership',
    role: 'Secretary — Computer Networking Association',
    organization: 'PSG Polytechnic College',
    summary:
      'Coordinating departmental technical events, peer workshops, and networking research showcases.',
    highlights: [
      'Technical workshop coordination',
      'Departmental knowledge exchange',
      'Student engineering representation',
    ],
  },
  {
    id: 'exp-aethelon',
    index: '04',
    period: 'Official Platform',
    type: 'Web Studio',
    role: 'Official Website Building Studio',
    organization: 'aethelontech.in',
    summary:
      'My official website building platform dedicated to designing and engineering custom, responsive websites and interactive modern web experiences.',
    highlights: [
      'Custom Website Design & Frontend Engineering',
      'Interactive 3D & Modern Web Experiences',
      'Full-Stack Web Platforms & Deployment',
    ],
    linkUrl: 'https://aethelontech.in',
    linkLabel: 'aethelontech.in',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'alumni-management-system',
    number: '01',
    title: 'Alumni Management System',
    category: 'Full-Stack Web Application · Express REST API & MySQL',
    summary:
      'A full-stack alumni management platform designed to manage alumni records, registrations and administrative operations through a structured web application.',
    description:
      'A full-stack alumni management platform designed to manage alumni records, registrations and administrative operations through a structured web application.',
    highlights: [
      'Alumni registration and approval workflow',
      'Admin session management',
      'Registration request rate limiting',
      'Base64 profile-picture processing',
      'Alumni record management',
      'Audit logs and historical records',
      'Settings management',
      'Static asset serving through Express',
    ],
    technologies: [
      'HTML',
      'CSS',
      'Vanilla JavaScript',
      'Node.js',
      'Express.js',
      'MySQL',
      'REST APIs',
      'Asynchronous Fetch',
    ],
    stackGroups: [
      { label: 'Frontend', value: 'HTML, CSS, Vanilla JavaScript' },
      { label: 'Backend', value: 'Node.js, Express.js' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Communication', value: 'REST APIs, asynchronous Fetch' },
    ],
    visualType: 'alumni',
    architectureLabel: 'Frontend → Express REST API → MySQL Database',
    githubUrl: 'https://github.com/jayakrishnajaishree2007-source/alumni-management-system',
    metrics: [
      { label: 'Frontend', value: 'HTML / CSS / JS' },
      { label: 'Backend', value: 'Node.js + Express' },
      { label: 'Database', value: 'MySQL' },
      { label: 'Protocol', value: 'REST · Fetch' },
    ],
    architectureSteps: [
      {
        stage: '01. Frontend Client Layer',
        detail:
          'HTML, CSS, and Vanilla JavaScript interfaces communicate via asynchronous Fetch requests and process Base64 profile pictures.',
      },
      {
        stage: '02. Express REST API & Security',
        detail:
          'Node.js and Express.js manage admin sessions, registration request rate limiting, approval workflows, and static asset serving.',
      },
      {
        stage: '03. MySQL Relational Storage',
        detail:
          'Structured MySQL schema persisting alumni records, historical audit logs, and administrative settings.',
      },
    ],
  },
  {
    id: 'student-module',
    number: '02',
    title: 'Student Module: AI-Powered Student Management System',
    category: 'Database Architecture · MySQL InnoDB & RBAC',
    summary:
      'An integrated student management platform designed to manage institutional records, academic operations, student services and AI-powered academic support.',
    description:
      'An integrated student management platform designed to manage institutional records, academic operations, student services and AI-powered academic support.',
    highlights: [
      '42 relational database tables',
      '13 sequential SQL migration files',
      'Structured relational database architecture',
      'Role-based access control',
      'Secure administrator initialization',
    ],
    modules: [
      'Identity, authentication and permissions',
      'Department, course, semester and batch management',
      'Faculty and workload allocation',
      'Student enrollment and parent relationships',
      'Curriculum and subject allocation',
      'Timetable and scheduling',
      'Attendance management',
      'Examinations and marks',
      'Assignments and submissions',
      'Fee management and payments',
      'Library and student documents',
      'Notifications and audit logs',
      'AI mentorship, study plans and performance insights',
    ],
    technologies: ['MySQL', 'InnoDB', 'Node.js MySQL2 Driver', 'UTF-8 (utf8mb4)'],
    stackGroups: [
      { label: 'Database', value: 'MySQL' },
      { label: 'Storage Engine', value: 'InnoDB' },
      { label: 'Backend Driver', value: 'Node.js MySQL2 driver' },
      { label: 'Character Set', value: 'UTF-8 (utf8mb4)' },
    ],
    visualType: 'student',
    architectureLabel: '13 Sequential SQL Migrations → 42 InnoDB Tables → Role-Based Institutional Core',
    scopeNote:
      'Structured as a relational database architecture and student management system across 13 academic and institutional modules.',
    githubUrl: 'https://github.com/jloganjerry-arch/Student_Module',
    metrics: [
      { label: 'Tables', value: '42 Relational' },
      { label: 'Migrations', value: '13 Sequential SQL' },
      { label: 'Engine', value: 'MySQL InnoDB' },
      { label: 'Charset', value: 'utf8mb4' },
    ],
    architectureSteps: [
      {
        stage: '01. Sequential SQL Migrations',
        detail:
          '13 ordered SQL migration files establishing foreign-key integrity under the InnoDB storage engine and utf8mb4 encoding.',
      },
      {
        stage: '02. 42-Table Relational Schema',
        detail:
          'Interconnected institutional schemas spanning identity, departments, faculty workload, enrollment, attendance, exams, fees, library, and audit logs.',
      },
      {
        stage: '03. RBAC & Node.js MySQL2 Layer',
        detail:
          'Role-based access control, secure administrator initialization, and AI mentorship/study-plan data structures connected via MySQL2.',
      },
    ],
  },
  {
    id: 'aether-routine',
    number: '03',
    title: 'AI Study Routine Manager (AetherRoutine)',
    category: 'AI Study Planning · React 18, FastAPI & Google Gemini AI',
    summary:
      'An AI-powered study planning and routine optimization system designed to help students organize learning schedules, improve productivity and manage academic workloads while reducing study fatigue.',
    description:
      'An AI-powered study planning and routine optimization system designed to help students organize learning schedules, improve productivity and manage academic workloads while reducing study fatigue.',
    highlights: [
      'AI-powered personalized study routine generation',
      'Dynamic break scheduling',
      'Spaced repetition scheduling',
      'Daily and weekly study plans',
      'Interactive progress analytics',
      'Subject mastery and study streak tracking',
      'Smart task and checklist management',
      'AI study assistant',
      'Academic dataset generation and Excel integration',
      'Secure JWT authentication',
    ],
    technologies: [
      'React 18',
      'Vite',
      'Tailwind CSS',
      'Python',
      'FastAPI',
      'Uvicorn',
      'SQLite / MySQL',
      'Google Gemini Generative AI',
      'JWT / Passlib / bcrypt',
      'Chart.js',
      'Pandas',
      'OpenPyXL',
    ],
    stackGroups: [
      { label: 'Frontend', value: 'React 18, Vite, Tailwind CSS' },
      { label: 'Backend', value: 'Python, FastAPI, Uvicorn' },
      { label: 'Database', value: 'SQLite / MySQL' },
      { label: 'AI Integration', value: 'Google Gemini Generative AI' },
      { label: 'Authentication', value: 'JWT, Passlib, bcrypt' },
      { label: 'Analytics & Data', value: 'Chart.js, Pandas, OpenPyXL' },
    ],
    visualType: 'routine',
    architectureLabel:
      'React Frontend → FastAPI REST API → SQLite / MySQL Database · Google Gemini AI → Personalized Study Recommendations',
    githubUrl: 'https://github.com/jayakrishnajaishree2007-source/ai-study-routine-manager',
    metrics: [
      { label: 'Frontend', value: 'React 18 + Vite' },
      { label: 'Backend', value: 'Python FastAPI' },
      { label: 'AI Engine', value: 'Google Gemini' },
      { label: 'Analytics', value: 'Chart.js · Pandas' },
    ],
    architectureSteps: [
      {
        stage: '01. React 18 Interactive Planner',
        detail:
          'Daily/weekly routine views, dynamic break intervals, smart checklists, and Chart.js progress analytics.',
      },
      {
        stage: '02. FastAPI & JWT Security Core',
        detail:
          'Python FastAPI with Uvicorn serving authenticated REST endpoints secured via JWT, Passlib, and bcrypt.',
      },
      {
        stage: '03. Gemini AI & Dataset Pipeline',
        detail:
          'Google Gemini Generative AI powers personalized study plans and spaced repetition, alongside Pandas/OpenPyXL Excel exports and SQLite/MySQL storage.',
      },
    ],
  },
  {
    id: 'predictive-te-sr',
    number: '04',
    title: 'Predictive Traffic Engineering using Segment Routing',
    category: 'Network Traffic Engineering · Containerlab, FRR & XGBoost',
    summary:
      'A network traffic engineering project exploring machine learning-based congestion prediction and Segment Routing-based traffic path optimization.',
    description:
      'A network traffic engineering project exploring machine learning-based congestion prediction and Segment Routing-based traffic path optimization.',
    highlights: [
      'Multi-router network topology',
      'Network traffic generation and monitoring',
      'Network telemetry collection',
      'Machine learning-based congestion prediction',
      'Alternative path evaluation',
      'Segment Routing-based traffic forwarding',
      'Predictive network traffic engineering',
    ],
    technologies: [
      'Containerlab',
      'FRRouting (FRR)',
      'IS-IS',
      'Python',
      'XGBoost',
      'Segment Routing',
      'Repetita Datasets',
    ],
    stackGroups: [
      { label: 'Network Emulation', value: 'Containerlab' },
      { label: 'Network OS', value: 'FRRouting (FRR)' },
      { label: 'Routing Protocol', value: 'IS-IS' },
      { label: 'Machine Learning', value: 'Python, XGBoost' },
      { label: 'Traffic Engineering', value: 'Segment Routing' },
      { label: 'Dataset', value: 'Repetita network optimization datasets' },
    ],
    visualType: 'traffic-te',
    architectureLabel:
      'Network Topology → Traffic Generation → Telemetry Collection → Congestion Prediction → Path Optimization → Segment Routing Forwarding',
    scopeNote:
      'Dedicated traffic engineering and Segment Routing path optimization exploration using Containerlab, FRR (IS-IS), XGBoost, and Repetita datasets.',
    githubUrl: 'https://github.com/jayakrishnajaishree2007-source/TE-SR',
    metrics: [
      { label: 'Emulation', value: 'Containerlab' },
      { label: 'NOS / IGP', value: 'FRR · IS-IS' },
      { label: 'ML Model', value: 'Python XGBoost' },
      { label: 'Forwarding', value: 'Segment Routing' },
    ],
    architectureSteps: [
      {
        stage: '01. Network Topology & Traffic Generation',
        detail:
          'Multi-router Containerlab topology running FRRouting (FRR) and IS-IS with controlled traffic generation and monitoring.',
      },
      {
        stage: '02. Telemetry Collection & Congestion Prediction',
        detail:
          'Link telemetry feeding Python and XGBoost models trained around Repetita network optimization datasets to anticipate link congestion.',
      },
      {
        stage: '03. Path Optimization & SR Forwarding',
        detail:
          'Alternative path evaluation guiding Segment Routing segment lists to steer traffic across non-congested links.',
      },
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  'All',
  'Programming',
  'Web Development',
  'Networking',
  'AI / Machine Learning',
  'Databases & Tools',
];

export const SKILLS: SkillItem[] = [
  { name: 'Python', category: 'Programming', context: 'FastAPI, XGBoost & ML Pipelines', accent: 'cyan' },
  { name: 'Java', category: 'Programming', context: 'Object-Oriented Systems', accent: 'chrome' },
  { name: 'JavaScript', category: 'Programming', context: 'Interactive Web & Node.js Logic', accent: 'graphite' },

  { name: 'HTML', category: 'Web Development', context: 'Semantic Structure', accent: 'chrome' },
  { name: 'CSS', category: 'Web Development', context: 'Responsive Layouts', accent: 'graphite' },
  { name: 'React', category: 'Web Development', context: 'React 18 Component Architecture', accent: 'cyan' },

  { name: 'Routing', category: 'Networking', context: 'IS-IS & Segment Routing', accent: 'cyan' },
  { name: 'Switching', category: 'Networking', context: 'LAN Segmentation & VLANs', accent: 'chrome' },
  {
    name: 'Network Engineering',
    category: 'Networking',
    context: 'Containerlab, FRR & Topology',
    accent: 'graphite',
  },
  {
    name: 'Access Connectivity',
    category: 'Networking',
    context: 'Endpoint & Edge Access',
    accent: 'cyan',
  },

  {
    name: 'Machine Learning',
    category: 'AI / Machine Learning',
    context: 'Congestion Prediction & Gemini AI',
    accent: 'cyan',
  },
  {
    name: 'XGBoost',
    category: 'AI / Machine Learning',
    context: 'Gradient Boosted Prediction',
    accent: 'chrome',
  },
  {
    name: 'Random Forest',
    category: 'AI / Machine Learning',
    context: 'Ensemble Classification',
    accent: 'graphite',
  },
  {
    name: 'MLP',
    category: 'AI / Machine Learning',
    context: 'Multi-Layer Perceptron',
    accent: 'cyan',
  },

  { name: 'MySQL', category: 'Databases & Tools', context: 'InnoDB Relational Modeling', accent: 'chrome' },
  { name: 'Git', category: 'Databases & Tools', context: 'Version Control Workflows', accent: 'graphite' },
  { name: 'Linux', category: 'Databases & Tools', context: 'Containerlab & Server CLI', accent: 'cyan' },
  {
    name: 'ERPNext',
    category: 'Databases & Tools',
    context: 'Enterprise Data Integration',
    accent: 'chrome',
  },
  {
    name: 'Docker',
    category: 'Databases & Tools',
    context: 'Containerized Environments',
    accent: 'graphite',
  },
];
