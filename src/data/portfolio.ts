// ═══════════════════════════════════════════════════════════
// SHUV0 / SYSTEM — Centralized Data Layer
// Source of truth for all portfolio content
// Strictly complies with the Verified Fact Sheet & TODO rules
// ═══════════════════════════════════════════════════════════

export const identity = {
  name: "Md. Shakir Ahmed",
  positioning: "Backend-focused Software Engineer",
  tagline: "APIs · Business Systems · SaaS · Identity · Microservices",
  systemName: "SHUV0",
  location: "Rajshahi, Bangladesh",
  status: "SYSTEM READY · WAITING FOR REQUEST",
  summary:
    "Backend-focused Software Engineer with 4+ years of hands-on experience engineering resilient APIs, high-throughput business systems, SaaS platforms, centralized identity & SSO topologies, and microservice architectures — backed by competitive programming foundations and applied machine learning experience.",
} as const;

export const social = {
  email: "shuvocsevu231@gmail.com",
  phone: "+8801714559978",
  linkedin: "https://www.linkedin.com/in/md-shakir-ahmed-shuvo-047129218/",
  github: "https://github.com/Md-Shakir-Ahmed",
  whatsapp: "https://wa.me/8801714559978",
  cvDownloadUrl: "/MD.Shakir-Ahmed.pdf",
} as const;

export type SystemStage = "CLIENT" | "API" | "IDENTITY" | "DATA" | "RESPONSE";

export interface SystemSection {
  stage: SystemStage;
  index: number;
  label: string;
  sectionId: string;
  sublabel: string;
}

export const systemSections: SystemSection[] = [
  { stage: "CLIENT", index: 0, label: "Hero", sectionId: "hero", sublabel: "Request Origin & Protocol" },
  { stage: "API", index: 1, label: "Engineering Identity", sectionId: "about", sublabel: "Core Philosophy & System Thinking" },
  { stage: "IDENTITY", index: 2, label: "Stack & Architecture", sectionId: "stack", sublabel: "Technical Constellation & Pipeline" },
  { stage: "DATA", index: 3, label: "Projects & Telemetry", sectionId: "projects", sublabel: "Interactive Node Graph & Case Studies" },
  { stage: "RESPONSE", index: 4, label: "Contact & Handshake", sectionId: "contact", sublabel: "Direct Connection & Dispatch" },
] as const;

// ─── Engineering Pipeline (How I Build) ─────────────────
export interface PipelineStep {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  deliverables: string[];
}

export const pipelineSteps: PipelineStep[] = [
  {
    id: "understand",
    number: "01",
    title: "UNDERSTAND",
    summary: "Domain decomposition & requirements modeling",
    description:
      "Deconstruct business logic, user workflows, edge cases, data lifecycles, and performance constraints into rigorous API contracts and domain models before writing a line of code.",
    deliverables: ["Domain Entity Models", "API Contracts (OpenAPI/REST)", "Constraint Specifications"],
  },
  {
    id: "architect",
    number: "02",
    title: "ARCHITECT",
    summary: "Schema design, auth topology & system boundaries",
    description:
      "Formulate normalized and indexed database schemas, define microservice/module boundaries, design centralized authentication gateways (Keycloak/OIDC), and specify caching strategies.",
    deliverables: ["Relational/NoSQL Schemas", "Auth & Token Architecture", "Cache Invalidation Rules"],
  },
  {
    id: "build",
    number: "03",
    title: "BUILD",
    summary: "Clean implementation with strict integrity",
    description:
      "Write type-safe, maintainable backend services with comprehensive input validation, relational integrity guarantees, error handling middleware, and query optimization.",
    deliverables: ["REST/GraphQL Endpoints", "Repository/Service Layer", "Middleware & Auth Handlers"],
  },
  {
    id: "integrate",
    number: "04",
    title: "INTEGRATE",
    summary: "Service composition & end-to-end verification",
    description:
      "Orchestrate external API gateways, third-party payment/messaging providers, single sign-on flows, and test inter-service communication under varied latency and load profiles.",
    deliverables: ["SSO & Token Introspection", "Third-Party Connectors", "End-to-End API Integration"],
  },
  {
    id: "deploy",
    number: "05",
    title: "DEPLOY",
    summary: "Containerization, telemetry & resilient runtime",
    description:
      "Containerize microservices with Docker, configure Nginx reverse proxies, establish structured JSON logging, set up health probes, and ensure zero-downtime execution.",
    deliverables: ["Docker Configurations", "Reverse Proxy Topologies", "Health Probes & Telemetry"],
  },
];

// ─── Technology Constellation (Stack) ───────────────────
export type TechCategory =
  | "Backend Core"
  | "Databases & Cache"
  | "Identity & Security"
  | "Architecture & Distributed"
  | "Infrastructure & DevOps"
  | "Applied ML & Data";

export interface TechItem {
  name: string;
  category: TechCategory;
  level: "Primary" | "Advanced" | "Core";
  description: string;
  verified: boolean;
}

export const techStack: TechItem[] = [
  // Backend Core
  { name: "PHP", category: "Backend Core", level: "Primary", description: "Modern PHP 8+ object-oriented backend development with strict typing.", verified: true },
  { name: "Laravel", category: "Backend Core", level: "Primary", description: "Enterprise applications, queue workers, Eloquent optimization, and robust REST APIs.", verified: true },
  { name: "Python", category: "Backend Core", level: "Primary", description: "High-performance API services, scripting, automation, and data engineering.", verified: true },
  { name: "FastAPI", category: "Backend Core", level: "Advanced", description: "Asynchronous REST services with OpenAPI documentation and Pydantic validation.", verified: true },
  { name: "RESTful APIs", category: "Backend Core", level: "Core", description: "Clean resource modeling, idempotent verbs, structured error payloads, and versioning.", verified: true },
  { name: "C / C++", category: "Backend Core", level: "Core", description: "Algorithmic problem-solving foundation, memory awareness, and competitive programming.", verified: true },

  // Databases & Cache
  { name: "MySQL", category: "Databases & Cache", level: "Primary", description: "Complex relational schemas, indexing strategies, transactions, and query optimization.", verified: true },
  { name: "PostgreSQL", category: "Databases & Cache", level: "Advanced", description: "Advanced relational modeling, ACID guarantees, JSONB documents, and spatial indexing.", verified: true },
  { name: "Redis", category: "Databases & Cache", level: "Advanced", description: "In-memory caching, rate limiting, session storage, and queue dispatching.", verified: true },
  { name: "Query Optimization", category: "Databases & Cache", level: "Primary", description: "EXPLAIN plan analysis, index tuning, avoiding N+1 queries, and database profiling.", verified: true },

  // Identity & Security
  { name: "Keycloak", category: "Identity & Security", level: "Primary", description: "Centralized IAM, OpenID Connect, user federation, client roles, and SSO integration.", verified: true },
  { name: "OAuth 2.0 / OIDC", category: "Identity & Security", level: "Primary", description: "Authorization code grant with PKCE, client credentials, and access delegation.", verified: true },
  { name: "JWT Architecture", category: "Identity & Security", level: "Primary", description: "Cryptographically signed tokens, claims verification, stateless authorization, and refresh rotation.", verified: true },
  { name: "RBAC & ABAC", category: "Identity & Security", level: "Primary", description: "Fine-grained permission structures, role hierarchies, and resource protection middleware.", verified: true },

  // Architecture & Distributed
  { name: "Microservice Concepts", category: "Architecture & Distributed", level: "Primary", description: "Service boundary isolation, decoupled domain logic, and independent deployability.", verified: true },
  { name: "API Gateways", category: "Architecture & Distributed", level: "Advanced", description: "Reverse proxying, centralized authentication, routing, and header enrichment.", verified: true },
  { name: "Event-Driven & Queues", category: "Architecture & Distributed", level: "Advanced", description: "Asynchronous task execution, background jobs, and decoupled system workflows.", verified: true },

  // Infrastructure & DevOps
  { name: "Docker", category: "Infrastructure & DevOps", level: "Advanced", description: "Multi-stage containerization, service orchestration, and reproducible development environments.", verified: true },
  { name: "Linux / Shell", category: "Infrastructure & DevOps", level: "Primary", description: "Server administration, process monitoring, bash automation, and file permissions.", verified: true },
  { name: "Nginx", category: "Infrastructure & DevOps", level: "Advanced", description: "Reverse proxy configuration, SSL termination, rate limiting, and static serving.", verified: true },
  { name: "Git & CI/CD", category: "Infrastructure & DevOps", level: "Core", description: "Trunk-based and feature branching, semantic release management, and pipeline automation.", verified: true },

  // Applied ML & Data
  { name: "Applied Machine Learning", category: "Applied ML & Data", level: "Advanced", description: "Integrating predictive models into live production backend pipelines.", verified: true },
  { name: "Data Processing Pipelines", category: "Applied ML & Data", level: "Advanced", description: "Preprocessing, feature extraction, tabular data transformations, and batch jobs.", verified: true },
];

// ─── Projects & Interactive Node Graph ──────────────────
export type ProjectCategory =
  | "Government"
  | "Enterprise"
  | "Product"
  | "Identity"
  | "ML";

export interface Project {
  id: string;
  name: string;
  shortName: string;
  category: ProjectCategory;
  categoryLabel: string;
  confidential: boolean;
  summary: string;
  role: string;
  problem: string;
  architecture: string;
  technologies: string[];
  challenge: string;
  outcome: string;
  factsVerified: boolean;
  todoNotes: string;
  connectionIds: string[]; // for verified relationship drawing in node graph
  logo?: string;
}

export const projects: Project[] = [
  {
    id: "btrc-lims",
    name: "BTRC License Issuance & Management System (LIMS)",
    shortName: "BTRC LIMS",
    category: "Government",
    categoryLabel: "Professional Project — Selected Details",
    confidential: true,
    summary:
      "A national-scale regulatory licensing platform for the Bangladesh Telecommunication Regulatory Commission, managing regulatory license processing, verification, and multi-tier institutional approval workflows.",
    role: "Backend Engineer (Business Automation Limited)",
    problem:
      "Disparate legacy procedures and manual departmental verification created substantial administrative latency, compliance risk, and lack of verifiable audit trails for telecom licensing.",
    architecture:
      "Modular backend architecture with strict role-based access control, relational database transaction management, and secure regulatory API integrations.",
    technologies: ["PHP", "Laravel", "MySQL", "REST APIs", "RBAC", "Database Optimization"],
    challenge:
      "Engineering deterministic state machine transitions across multiple bureaucratic tiers while preventing race conditions during document verification.",
    outcome:
      "Delivered a centralized digital licensing framework that structured applicant workflows, automated approval validation, and established end-to-end auditability.",
    factsVerified: false,
    todoNotes: "",
    connectionIds: ["brcp-wenp", "ebs", "identicore"],
    logo: "/logos/btrc.jpg",
  },
  {
    id: "brcp-wenp",
    name: "BRCP Women Entrepreneurs Networking Platform (WENP)",
    shortName: "BRCP WENP",
    category: "Government",
    categoryLabel: "Professional Project — Selected Details",
    confidential: true,
    summary:
      "Digital networking, trade facilitation, and market linkage system under Bangladesh Regional Connectivity Project-1 connecting female entrepreneurs with suppliers, buyers, and institutional partners.",
    role: "Backend Engineer (Business Automation Limited)",
    problem:
      "Women-led enterprises across regional hubs lacked unified digital directory presence, institutional trade linkages, and access to verified commercial supply channels.",
    architecture:
      "RESTful service architecture supporting multi-stakeholder directory search, relational profile storage, and localized communication channels.",
    technologies: ["PHP", "Laravel", "MySQL", "RESTful APIs", "Relational Modeling"],
    challenge:
      "Ensuring robust responsiveness and intuitive categorization for diverse participants across variable regional network conditions.",
    outcome:
      "Empowered women entrepreneurs with direct commercial linkages, digital visibility, and institutional trade accessibility across Bangladesh.",
    factsVerified: false,
    todoNotes: "",
    connectionIds: ["btrc-lims", "ebs"],
    logo: "/logos/brcp.jpg",
  },
  {
    id: "ebs",
    name: "Enterprise Business Solution (EBS)",
    shortName: "EBS",
    category: "Enterprise",
    categoryLabel: "Professional Project — Selected Details",
    confidential: true,
    summary:
      "Comprehensive web-based enterprise resource management solution streamlining business processes, automated data processing, financial auditing, and multi-department coordination.",
    role: "Backend Engineer (Business Automation Limited)",
    problem:
      "Siloed departmental spreadsheets and uncoordinated business systems caused data discrepancies, slow financial reconciliations, and manual operational friction.",
    architecture:
      "Layered enterprise backend with optimized transaction isolation, query caching, automated reporting schedulers, and centralized permission policies.",
    technologies: ["PHP", "Laravel", "MySQL", "REST APIs", "Query Optimization", "Data Processing"],
    challenge:
      "Refactoring legacy relational queries to eliminate bottlenecks across multi-thousand row datasets and ensuring atomic integrity across accounting workflows.",
    outcome:
      "Consolidated enterprise operations into a unified high-performance platform, eliminating data discrepancies and automating operational reporting.",
    factsVerified: false,
    todoNotes: "",
    connectionIds: ["queuepro", "btrc-lims", "identicore"],
    logo: "/logos/ebs.jpg",
  },
  {
    id: "queuepro",
    name: "QueuePro",
    shortName: "QueuePro",
    category: "Enterprise",
    categoryLabel: "Professional Project — Selected Details",
    confidential: true,
    summary:
      "Enterprise smart queue management and customer flow dispatching solution engineered for high-footfall environments including banks, service counters, and healthcare facilities.",
    role: "Backend Engineer (Business Automation Limited)",
    problem:
      "Unmanaged customer influx and lack of real-time service point synchronization caused counter congestion, extended waiting times, and zero operational visibility into staff SLAs.",
    architecture:
      "Low-latency token allocation engine with state-synchronized counter dispatching, event-driven state transitions, and live administrative management dashboards.",
    technologies: ["PHP", "Laravel", "MySQL", "Event Architecture", "REST APIs"],
    challenge:
      "Ensuring zero state drift between multiple counter operators concurrently requesting next-in-line tokens under high burst arrival conditions.",
    outcome:
      "Transformed physical service queue routing, drastically cut perceived wait times, and gave facility management real-time SLA metrics.",
    factsVerified: false,
    todoNotes: "",
    connectionIds: ["ebs"],
    logo: "/logos/queuepro.jpg",
  },
  {
    id: "cricgeo",
    name: "CricGeo",
    shortName: "CricGeo",
    category: "Product",
    categoryLabel: "Personal / Product",
    confidential: false,
    summary:
      "Spatial cricket intelligence and match analytics platform transforming ball-by-ball match data into dynamic pitch maps, spatial wagon wheels, and predictive performance insights.",
    role: "Creator & Lead Architect",
    problem:
      "Conventional cricket analytics platforms show static aggregate tables that strip out vital spatial dimensions, release angles, trajectory clusters, and bowler-batter micro-matchups.",
    architecture:
      "FastAPI & Python backend processing spatial coordinate vectors, paired with relational event storage and analytical aggregation caches.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Spatial Coordinates", "REST APIs", "Data Pipelines"],
    challenge:
      "Structuring coordinate data schemas for fast spatial indexing and real-time trajectory calculation without degrading query responsiveness.",
    outcome:
      "Engineered an interactive spatial intelligence platform providing players, coaches, and analysts with visual pitch maps and tactical matchup breakdowns.",
    factsVerified: false,
    todoNotes: "",
    connectionIds: ["identicore", "applied-ml-pipeline"],
    logo: "/logos/cricgeo.jpg",
  },
  {
    id: "identicore",
    name: "IdentiCore",
    shortName: "IdentiCore",
    category: "Identity",
    categoryLabel: "Identity & Microservices",
    confidential: false,
    summary:
      "Centralized Identity & Single Sign-On (SSO) architectural engine integrating Keycloak, OpenID Connect, and token delegation across distributed microservices.",
    role: "System Architect & Engineer",
    problem:
      "Multi-service systems frequently duplicate auth logic, resulting in insecure token handling, inconsistent permission rules, and lack of centralized session revocation.",
    architecture:
      "Centralized identity hub leveraging Keycloak OIDC, issuing cryptographically verified JWTs, and providing lightweight token introspection middleware for microservices.",
    technologies: ["Keycloak", "OAuth 2.0 / OIDC", "JWT", "Microservices", "Docker", "Security Policies"],
    challenge:
      "Balancing stateless token validation for microsecond-fast service calls with the critical requirement for instantaneous revocation on user compromise.",
    outcome:
      "Eliminated auth duplication across distributed services, established unified single sign-on, and enforced strict zero-trust role-based access control.",
    factsVerified: false,
    todoNotes: "",
    connectionIds: ["btrc-lims", "ebs", "cricgeo"],
    logo: "/logos/identicore.jpg",
  },
  {
    id: "applied-ml-pipeline",
    name: "Applied Machine Learning & Predictive Systems",
    shortName: "Applied ML",
    category: "ML",
    categoryLabel: "Applied Research & Data Systems",
    confidential: false,
    summary:
      "Applied machine learning pipelines and inference service integrations bridging analytical models with production backend workflows.",
    role: "Backend & Applied ML Engineer",
    problem: "Integrating predictive models into high-throughput production backend architectures without introducing operational latency.",
    architecture: "FastAPI inference microservice orchestrating preprocessing, model evaluation, and structured prediction delivery via RESTful endpoints.",
    technologies: ["Python", "Applied ML", "FastAPI", "Data Modeling", "REST APIs"],
    challenge: "Minimizing inference latency and guaranteeing reproducible state transformations under concurrent API requests.",
    outcome: "Successfully deployed containerized inference service providing real-time analytical capabilities to backend workflows.",
    factsVerified: true,
    todoNotes: "",
    connectionIds: ["cricgeo"],
    logo: "/logos/appliedml.jpg",
  },
];

// ─── Experience (Career Journey) ────────────────────────
export interface Experience {
  id: string;
  company: string;
  title: string;
  dates: string;
  location: string;
  current: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  logo?: string;
  todoNotes: string;
}

export const experience: Experience[] = [
  {
    id: "varendra-university-se",
    company: "Varendra University",
    title: "Software Engineer",
    dates: "Present",
    location: "Rajshahi, Bangladesh",
    current: true,
    logo: "/logos/varendra-premium.jpg",
    summary:
      "Serving as Software Engineer designing, implementing, and maintaining institutional software infrastructure, internal portals, and digital administrative workflows.",
    responsibilities: [
      "Designing, developing, and deploying backend services and REST APIs for institutional web platforms.",
      "Architecting relational database schemas, optimizing complex SQL queries, and maintaining ACID consistency.",
      "Ensuring system uptime, performance monitoring, and secure role-based administrative workflows across university services.",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "REST APIs", "System Architecture"],
    todoNotes: "",
  },
  {
    id: "business-automation-limited",
    company: "Business Automation Limited",
    title: "Associate Software Engineer",
    dates: "03/2023 – 10/2025 (~3 Years)",
    location: "Rajshahi, Bangladesh",
    current: false,
    logo: "/logos/business-automation-premium.jpg",
    summary:
      "Contributed to high-impact enterprise business systems, national-scale government regulatory portals, and high-throughput queue platforms for a prominent ITES company serving over 300 clients globally.",
    responsibilities: [
      "Engineered backend modules, API integrations, and database optimizations for national regulatory portals (BTRC LIMS, BRCP WENP).",
      "Contributed to Enterprise Business Solution (EBS) backend development focusing on API architecture and transaction safety.",
      "Developed event-driven queue dispatching and state synchronization for the QueuePro high-traffic queue management system.",
      "Implemented secure authentication mechanisms, role-based access control (RBAC), and performance profiling.",
    ],
    technologies: ["PHP", "Laravel", "MySQL", "REST APIs", "Redis", "RBAC", "Linux"],
    todoNotes: "",
  },
];

// ─── Education & Academic Background ────────────────────
export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years?: string;
  status: string;
  department: string;
  highlights: string[];
  todoNotes: string;
}

export const education: EducationItem[] = [
  {
    id: "rajshahi-university-meng",
    degree: "Master of Engineering (M.Eng.) in Computer Science & Engineering",
    institution: "University of Rajshahi",
    status: "Completed",
    department: "Computer Science and Engineering",
    highlights: [
      "Graduate specialization in distributed systems, advanced algorithm design, and system architecture.",
      "Conducted graduate research focusing on distributed computing paradigms and applied software engineering.",
    ],
    todoNotes: "",
  },
  {
    id: "varendra-university-bsc",
    degree: "Bachelor of Science (B.Sc.) in Computer Science & Engineering",
    institution: "Varendra University",
    status: "Completed",
    department: "Computer Science and Engineering",
    highlights: [
      "Core focus and rigorous specialization in Data Structures, Algorithms, Relational Database Architecture, and Software Engineering.",
      "President, Varendra University Programming Club (01/2022 – 01/2023) — mentored junior competitive programmers and led university algorithmic initiatives.",
      "Champion, Intra University Programming Contest 2021 & Champion, IT QUIZ 2022.",
    ],
    todoNotes: "",
  },
];

// ─── Competitive Programming & Achievements ─────────────
export interface Achievement {
  category: string;
  title: string;
  detail: string;
  year?: string;
}

export const achievements: Achievement[] = [
  {
    category: "Competitive Programming",
    title: "Codeforces",
    detail: "Pre-Rating 909, Max Rating 1370, participated in 50+ official contests.",
  },
  {
    category: "Online Judges",
    title: "150+ Problems Solved on URI / beecrowd",
    detail: "Rigorous algorithmic problem solving in C, C++, and Python.",
  },
  {
    category: "Online Judges",
    title: "70+ Problems Solved on UVa Online Judge & 60+ on LightOJ",
    detail: "Focused on graph theory, dynamic programming, and greedy algorithms.",
  },
  {
    category: "Onsite Contests",
    title: "ICPC Regional Contestant (4+ Onsite Competitions)",
    detail: "Represented university in ICPC 2020 and multiple national contest arenas.",
    year: "2020",
  },
  {
    category: "Leadership",
    title: "President, Varendra University Programming Club",
    detail: "Organized competitive programming training, intra-university workshops, and contest coaching.",
    year: "2022 - 2023",
  },
  {
    category: "Awards",
    title: "Champion, Intra University Programming Contest",
    detail: "First place among university competitive programming teams.",
    year: "2021",
  },
  {
    category: "Awards",
    title: "Champion, IT QUIZ 2022 & Project Showcase 2020",
    detail: "Won Virtual Tech Fest Project Showcase and IT Quiz at Varendra University.",
    year: "2020, 2022",
  },
];
