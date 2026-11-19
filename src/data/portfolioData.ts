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

export type AlbumCategory =
  | 'All'
  | 'Awards & Events'
  | 'CNA Secretary'
  | 'Campus Life';

export const ALBUM_CATEGORIES: AlbumCategory[] = [
  'All',
  'Awards & Events',
  'CNA Secretary',
  'Campus Life',
];

export interface AlbumPhoto {
  id: string;
  title: string;
  caption: string;
  category: Exclude<AlbumCategory, 'All'>;
  date: string;
  location?: string;
  imageUrl: string;
  tag: string;
  color: string;
}

export const INITIAL_ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    "id": "photo-award-1",
    "title": "Department First Rank Felicitation",
    "caption": "Receiving the Department 1st Rank honor on stage at PSG Polytechnic College Auditorium for achieving a perfect 10.00 CGPA in Computer Networking.",
    "category": "Awards & Events",
    "date": "Academic Year 2025–26",
    "location": "PSG Polytechnic College Auditorium",
    "imageUrl": "/assets/album/awards/award-1st-rank.jpeg",
    "tag": "Academic Rank 1",
    "color": "#FCD34D"
  },
  {
    "id": "photo-award-2",
    "title": "INFINITUM '26 — On Stage Honor",
    "caption": "Receiving the 2nd Place award on stage in front of the grand LED backdrop at the INFINITUM '26 State Level Technical Symposium.",
    "category": "Awards & Events",
    "date": "January 22, 2026",
    "location": "CIT Sandwich Polytechnic College",
    "imageUrl": "/assets/album/awards/award-02.jpeg",
    "tag": "INFINITUM '26",
    "color": "#38BDF8"
  },
  {
    "id": "photo-award-3",
    "title": "Symposium Laurels with Principal Dr. B. Giriraj",
    "caption": "Presenting our INFINITUM '26 State Level Symposium certificates to Principal Dr. B. Giriraj in the Principal's Office.",
    "category": "Awards & Events",
    "date": "January 2026",
    "location": "Principal's Office, PSG Tech",
    "imageUrl": "/assets/album/awards/award-03.jpeg",
    "tag": "Principal Commendation",
    "color": "#34D399"
  },
  {
    "id": "photo-award-4",
    "title": "INTEROFEST-2K26 Certificate of Achievement",
    "caption": "Official Certificate of Achievement securing 3rd Place in Paper Presentation at the INTEROFEST-2K26 National Level Technical Symposium.",
    "category": "Awards & Events",
    "date": "February 28, 2026",
    "location": "Sree Sakthi Engineering College",
    "imageUrl": "/assets/album/awards/award-04.jpeg",
    "tag": "National Symposium",
    "color": "#C084FC"
  },
  {
    "id": "photo-award-5",
    "title": "Symposium Delegation & Co-Presenter Nikitha N",
    "caption": "Auditorium delegation selfie with co-presenter Nikitha N and DCN teammates holding our paper presentation credentials.",
    "category": "Awards & Events",
    "date": "February 2026",
    "location": "Symposium Auditorium Hall",
    "imageUrl": "/assets/album/awards/award-05.jpeg",
    "tag": "Symposium Delegation",
    "color": "#00D9FF"
  },
  {
    "id": "photo-award-6",
    "title": "INTEROFEST-2K26 Honors with Principal",
    "caption": "Commemorating our 3rd place National Level Paper Presentation finish alongside Principal Dr. B. Giriraj in the conference chamber.",
    "category": "Awards & Events",
    "date": "March 2026",
    "location": "Principal's Office, PSG Tech",
    "imageUrl": "/assets/album/awards/award-06.jpeg",
    "tag": "Paper Presentation",
    "color": "#F472B6"
  },
  {
    "id": "photo-award-7",
    "title": "Symposium Delegation Campus Group",
    "caption": "Group capture with the student delegation outside the academic complex after competitive technical paper presentations.",
    "category": "Awards & Events",
    "date": "2026",
    "location": "Coimbatore Campus Grounds",
    "imageUrl": "/assets/album/awards/award-07.jpeg",
    "tag": "DCN Team",
    "color": "#34D399"
  },
  {
    "id": "photo-award-8",
    "title": "SanTekFest-2K26 — 1st Prize Presentation",
    "caption": "Receiving the championship memento and certificate on stage from the Chief Guest at the SanTekFest-2K26 National Level Technical Symposium.",
    "category": "Awards & Events",
    "date": "August 20–21, 2026",
    "location": "Sankara Polytechnic College, Saravanampatty",
    "imageUrl": "/assets/album/awards/award-08.jpeg",
    "tag": "1st Prize Winner",
    "color": "#FCD34D"
  },
  {
    "id": "photo-award-9",
    "title": "SanTekFest 1st Prize Trophy & \"AI Ethics\" Paper",
    "caption": "Official 1st Prize memento, cash award envelope, and certificate for presenting research on \"AI Ethics and Bias\" with Nikitha N.",
    "category": "Awards & Events",
    "date": "August 21, 2026",
    "location": "Sankara Polytechnic College, Saravanampatty",
    "imageUrl": "/assets/album/awards/award-09.jpeg",
    "tag": "Championship Trophy",
    "color": "#38BDF8"
  },
  {
    "id": "photo-award-10",
    "title": "Official Certificate of Merit — 1st Rank",
    "caption": "Certificate of Merit awarded to Jayakrishna J (Diploma in Computer Networking 2nd Year) for securing First Rank in the Academic Year 2025–2026.",
    "category": "Awards & Events",
    "date": "Academic Year 2025–26",
    "location": "PSG Polytechnic College",
    "imageUrl": "/assets/album/awards/award-10.jpeg",
    "tag": "Department Rank 1",
    "color": "#00D9FF"
  },
  {
    "id": "photo-award-11",
    "title": "Official Statement of Grades — 10.00 CGPA",
    "caption": "Official Diploma Examinations Statement of Grades recording a flawless 10.00 CGPA with straight 'O' (Outstanding) grades across all theory & laboratory subjects.",
    "category": "Awards & Events",
    "date": "October 2025 Exams",
    "location": "Autonomous Exam Wing, PSG Tech",
    "imageUrl": "/assets/album/awards/award-11.jpeg",
    "tag": "Perfect 10 CGPA",
    "color": "#FCD34D"
  },
  {
    "id": "photo-award-12",
    "title": "INFINITUM '26 State Level 2nd Place Certificate",
    "caption": "Official Certificate of Appreciation won for securing 2nd Place in Paper Presentation at the INFINITUM '26 State Level Technical Symposium.",
    "category": "Awards & Events",
    "date": "January 22, 2026",
    "location": "CIT Sandwich Polytechnic College",
    "imageUrl": "/assets/album/awards/award-12.jpeg",
    "tag": "Paper Presentation 2nd",
    "color": "#C084FC"
  },
  {
    "id": "photo-sec-1",
    "title": "Students Union 2026–27 Inaugural Function",
    "caption": "Official inauguration ceremony on stage with Principal Dr. B. Giriraj, distinguished Chief Guests, and the elected Students Union 2026–27 office bearers.",
    "category": "CNA Secretary",
    "date": "Academic Year 2026–27",
    "location": "Main Auditorium, PSG Tech",
    "imageUrl": "/assets/album/secretary/secretary-01.jpeg",
    "tag": "Inaugural Ceremony",
    "color": "#38BDF8"
  },
  {
    "id": "photo-sec-2",
    "title": "Inaugural Ceremony — Seated at Dignitary Dais",
    "caption": "Seated on the main dais at the dignitary table with official desk nameplate \"JAYAKRISHNA J\" alongside HOD Dr. S. Brindha during the Inaugural Function.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Tech Auditorium Dais",
    "imageUrl": "/assets/album/secretary/secretary-02.jpeg",
    "tag": "Inaugural Dais",
    "color": "#00D9FF"
  },
  {
    "id": "photo-sec-3",
    "title": "Inaugural Ceremony — Dignitaries & Faculty on Stage",
    "caption": "On stage during the Inaugural Ceremony welcoming distinguished Chief Guests, Principal Dr. B. Giriraj, and academic faculty.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Tech Auditorium Dais",
    "imageUrl": "/assets/album/secretary/secretary-03.jpeg",
    "tag": "Inaugural Ceremony",
    "color": "#34D399"
  },
  {
    "id": "photo-sec-4",
    "title": "Official CNA Office Bearers Poster 2026–27",
    "caption": "Official publication of the Computer Networking Association (CNA) Office Bearers: Jayakrishna J (DCN Secretary) leading the executive council.",
    "category": "CNA Secretary",
    "date": "2026–2027 Term",
    "location": "PSG Polytechnic College",
    "imageUrl": "/assets/album/secretary/secretary-04.jpeg",
    "tag": "DCN Secretary",
    "color": "#C084FC"
  },
  {
    "id": "photo-sec-5",
    "title": "Inaugural Ceremony — DCN Secretary on Stage Dais",
    "caption": "Seated at the dignitary table on stage behind official desk nameplate \"Mr. JAYAKRISHNA J - SECRETARY\" during the Inaugural Ceremony at PSG Tech.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Tech Auditorium Dais",
    "imageUrl": "/assets/album/secretary/secretary-05.jpeg",
    "tag": "Inaugural Dais",
    "color": "#38BDF8"
  },
  {
    "id": "photo-sec-6",
    "title": "Inaugural Ceremony — Complete Dais Assembly",
    "caption": "Full view of the stage dais at the Inaugural Ceremony: Principal Dr. B. Giriraj, Chief Guest, HOD Dr. S. Brindha, Secretary Jayakrishna J, and Joint Secretary.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Tech Auditorium Dais",
    "imageUrl": "/assets/album/secretary/secretary-06.jpeg",
    "tag": "Inaugural Dais",
    "color": "#FCD34D"
  },
  {
    "id": "photo-sec-7",
    "title": "Inaugural Function — Address with Microphone at Podium",
    "caption": "Addressing the assembly into the microphone at the podium as DCN Secretary during the official Inaugural Function at PSG Tech.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Tech Auditorium Podium",
    "imageUrl": "/assets/album/secretary/secretary-07.jpeg",
    "tag": "Inaugural Address",
    "color": "#00D9FF"
  },
  {
    "id": "photo-sec-8",
    "title": "Inaugural Function — Escorting Chief Guests & HOD",
    "caption": "Leading the dignitary procession escorting Chief Guests and HOD Dr. S. Brindha into the auditorium for the Inaugural Ceremony.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Tech Academic Corridor",
    "imageUrl": "/assets/album/secretary/secretary-08.jpeg",
    "tag": "Inaugural Procession",
    "color": "#34D399"
  },
  {
    "id": "photo-sec-9",
    "title": "DCN Lab — QUIZZ?IT 2026 Scoring & Preparation",
    "caption": "Preparing quiz questions, score evaluation sheets, and rule sets on the laptop with Gokul and organizing committee.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Department of Computer Networking (DCN) Lab",
    "imageUrl": "/assets/album/secretary/secretary-09.jpeg",
    "tag": "QUIZZ?IT Prep",
    "color": "#C084FC"
  },
  {
    "id": "photo-sec-10",
    "title": "DCN Lab — Console Setup & Round Verification",
    "caption": "Finalizing live round timers, buzzer rules, and question database with student coordinators prior to QUIZZ?IT 2026.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Department of Computer Networking (DCN) Lab",
    "imageUrl": "/assets/album/secretary/secretary-10.jpeg",
    "tag": "Quiz Coordination",
    "color": "#38BDF8"
  },
  {
    "id": "photo-sec-11",
    "title": "QUIZZ?IT 2026 — Live Championship Console",
    "caption": "Managing the live technical quiz competition console for the Computer Networking Association (CNA) QUIZZ?IT 2026 Grand Finale.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "DCN Department Seminar Hall",
    "imageUrl": "/assets/album/secretary/secretary-11.jpeg",
    "tag": "QUIZZ?IT 2026",
    "color": "#34D399"
  },
  {
    "id": "photo-sec-12",
    "title": "QUIZZ?IT 2026 — DCN vs DAM Grand Finale",
    "caption": "Controlling quiz rounds, screen mirroring, and question timers alongside Gokul and Nikitha during the DCN Champion vs DAM Champion showdown.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "DCN Department Seminar Hall",
    "imageUrl": "/assets/album/secretary/secretary-12.jpeg",
    "tag": "Battle of Minds",
    "color": "#FCD34D"
  },
  {
    "id": "photo-sec-13",
    "title": "QUIZZ?IT 2026 — Quiz Master at Podium",
    "caption": "Conducting technical quiz questions from the podium as Quiz Master while options display on the projection screen.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "DCN Department Seminar Hall",
    "imageUrl": "/assets/album/secretary/secretary-13.jpeg",
    "tag": "Quiz Master",
    "color": "#00D9FF"
  },
  {
    "id": "photo-sec-14",
    "title": "Teachers Day Celebration & Joyful Moments",
    "caption": "Joyful celebration moments with close classmates and balloon during Teachers Day celebrations in the department.",
    "category": "CNA Secretary",
    "date": "September 5, 2026",
    "location": "PSG Polytechnic College Classroom",
    "imageUrl": "/assets/album/secretary/secretary-14.jpeg",
    "tag": "Teachers Day",
    "color": "#F472B6"
  },
  {
    "id": "photo-sec-15",
    "title": "TECHNO MEME 2026 in CN Lab",
    "caption": "Conducting the TECHNO MEME event (Code, Create, Meme, Make Tech Fun!) presented by CNA with students competing on lab workstations.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Computer Networking (CN) Lab",
    "imageUrl": "/assets/album/secretary/secretary-15.jpeg",
    "tag": "TECHNO MEME",
    "color": "#34D399"
  },
  {
    "id": "photo-sec-16",
    "title": "TECHNO MEME Event Coordination & Smartboard",
    "caption": "Explaining event rules and coordinating evaluation on the interactive smartboard during the TECHNO MEME competition.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Computer Networking (CN) Lab",
    "imageUrl": "/assets/album/secretary/secretary-16.jpeg",
    "tag": "Event Lead",
    "color": "#38BDF8"
  },
  {
    "id": "photo-sec-17",
    "title": "PolyFest 2026 — Discussion with Senior Faculty",
    "caption": "Discussing event arrangements and student participation with senior faculty coordinator during the PolyFest celebrations.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Department Academic Block",
    "imageUrl": "/assets/album/secretary/secretary-17.jpeg",
    "tag": "PolyFest 2026",
    "color": "#FCD34D"
  },
  {
    "id": "photo-sec-18",
    "title": "CNA Core Executive Committee & Organizers",
    "caption": "CNA Core Executive Committee and Student Organizers group photo in the DCN Lab in front of the Department Vision & Mission whiteboard.",
    "category": "CNA Secretary",
    "date": "Academic Year 2026–27",
    "location": "Department of Computer Networking (DCN) Lab",
    "imageUrl": "/assets/album/secretary/secretary-18.jpeg",
    "tag": "Executive Committee",
    "color": "#00D9FF"
  },
  {
    "id": "photo-sec-19",
    "title": "DCN Secretary Official Portrait",
    "caption": "Official portrait as Secretary of the Computer Networking Association wearing the college uniform and insignia badge.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "PSG Polytechnic College",
    "imageUrl": "/assets/album/secretary/secretary-19.jpeg",
    "tag": "Official Portrait",
    "color": "#C084FC"
  },
  {
    "id": "photo-sec-20",
    "title": "PolyFest 2026 — Faculty Coordination & Event Review",
    "caption": "Reviewing association activities and competition outcomes with department professors during PolyFest 2026.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Department Academic Block",
    "imageUrl": "/assets/album/secretary/secretary-20.jpeg",
    "tag": "Faculty Coordination",
    "color": "#38BDF8"
  },
  {
    "id": "photo-sec-21",
    "title": "PolyFest 2026 — CNA Organizing Squad",
    "caption": "Celebrating the successful execution of department competitions with the association organizing team.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Department Academic Block",
    "imageUrl": "/assets/album/secretary/secretary-21.jpeg",
    "tag": "Organizing Squad",
    "color": "#34D399"
  },
  {
    "id": "photo-sec-22",
    "title": "PolyFest 2026 — Chalkboard Commemoration",
    "caption": "Squad photo in front of the green chalkboard celebrating PSG Polytechnic College PolyFest 2026 and ECE/DCN Association Day.",
    "category": "CNA Secretary",
    "date": "2026",
    "location": "Department Classroom",
    "imageUrl": "/assets/album/secretary/secretary-22.jpeg",
    "tag": "PolyFest Milestone",
    "color": "#FCD34D"
  },
  {
    "id": "photo-col-1",
    "title": "Avinashi Road & PSG Tech Main Gate",
    "caption": "Evening stroll and moments with close friends near the PSG Tech main entrance and Avinashi Road flyover.",
    "category": "Campus Life",
    "date": "2025–2026",
    "location": "PSG Tech Main Gate & Avinashi Road Flyover",
    "imageUrl": "/assets/album/college/college-01.jpeg",
    "tag": "Campus Life",
    "color": "#38BDF8"
  },
  {
    "id": "photo-col-2",
    "title": "DCN Squad Outside Academic Complex",
    "caption": "Selfie with the Computer Networking squad outside the department academic block after theory lectures.",
    "category": "Campus Life",
    "date": "2025",
    "location": "PSG Polytechnic College Campus",
    "imageUrl": "/assets/album/college/college-02.jpeg",
    "tag": "DCN Batchmates",
    "color": "#00D9FF"
  },
  {
    "id": "photo-col-3",
    "title": "PDE Lab, I-Block — Study & Record Session",
    "caption": "Group study, lab circuit calculations, and practical record work with classmates inside the PDE Lab in I-Block.",
    "category": "Campus Life",
    "date": "2025",
    "location": "PDE Lab, I-Block, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-03.jpeg",
    "tag": "PDE Lab I-Block",
    "color": "#34D399"
  },
  {
    "id": "photo-col-4",
    "title": "PDE Lab — Laboratory Workbench",
    "caption": "Hands-on lab practicals and circuit experimentation sitting at the wooden workbench in the PDE Lab.",
    "category": "Campus Life",
    "date": "2025",
    "location": "PDE Lab, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-04.jpeg",
    "tag": "PDE Lab Workbench",
    "color": "#C084FC"
  },
  {
    "id": "photo-col-5",
    "title": "Analog & Digital Electronics Lecture",
    "caption": "Classroom lecture on ADC & DAC Converters (Sampling, Quantization, Encoding) with the professor and batchmates.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Classroom, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-05.jpeg",
    "tag": "Electronics Lecture",
    "color": "#FCD34D"
  },
  {
    "id": "photo-col-6",
    "title": "DCN Squad at Academic Block Staircase",
    "caption": "DCN batchmates squad taking a break on the marble staircase inside the department academic block.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Department Academic Block Staircase",
    "imageUrl": "/assets/album/college/college-06.jpeg",
    "tag": "Squad Hangout",
    "color": "#38BDF8"
  },
  {
    "id": "photo-col-7",
    "title": "Computer Networking & Systems Lab",
    "caption": "Smiling at the lab workstation surrounded by chart boards on network design, configuration, and connectivity.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Systems Lab, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-07.jpeg",
    "tag": "DCN Systems Lab",
    "color": "#34D399"
  },
  {
    "id": "photo-col-8",
    "title": "Microprocessor & Digital Systems Classroom",
    "caption": "Standing in college uniform in front of the green chalkboard with hex memory codes (15H, 55H, 355H) and 'Stay Positive'.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Classroom, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-08.jpeg",
    "tag": "Microprocessor Class",
    "color": "#00D9FF"
  },
  {
    "id": "photo-col-9",
    "title": "DCN Classroom I-413 — Friends & Study Moments",
    "caption": "Classroom selfie and learning camaraderie with benchmates in Classroom I-413.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Classroom I-413, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-09.jpeg",
    "tag": "Classroom I-413",
    "color": "#C084FC"
  },
  {
    "id": "photo-col-10",
    "title": "DCN Classroom I-413 — Lecture Interval Selfie",
    "caption": "Thumbs up and break-time moments with the squad at our desks in Classroom I-413.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Classroom I-413, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-10.jpeg",
    "tag": "Classroom I-413",
    "color": "#FCD34D"
  },
  {
    "id": "photo-col-11",
    "title": "DCN Lab Server Room — Rack & Infrastructure",
    "caption": "Exploring the server rack cabinet and high-speed networking switchgear in the DCN Lab Server Room.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Lab Server Room, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-11.jpeg",
    "tag": "Server Room",
    "color": "#38BDF8"
  },
  {
    "id": "photo-col-12",
    "title": "DCN Lab Server Room — Console Workstation",
    "caption": "At the dedicated server monitoring workstation by the server rack in the DCN Lab Server Room.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Lab Server Room, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-12.jpeg",
    "tag": "Server Console",
    "color": "#34D399"
  },
  {
    "id": "photo-col-13",
    "title": "DCN Systems Lab — Hands-on Engineering",
    "caption": "Focused hands-on engineering, web development, and network simulation on laptops at the lab workbench.",
    "category": "Campus Life",
    "date": "2025",
    "location": "DCN Systems Lab, PSG Polytechnic College",
    "imageUrl": "/assets/album/college/college-13.jpeg",
    "tag": "Systems Lab",
    "color": "#00D9FF"
  }
];
