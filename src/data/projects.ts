export interface Project {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  role: string;
  stack: string[];
  architectureHighlight: string;
  outcome: string;
  highlights: string[];
  links: {
    live?: string;
    github?: string;
    caseStudy?: string;
  };
  featured: boolean;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'rag-assistant',
    title: 'RAG Knowledge Assistant',
    summary: 'Full-stack AI assistant with multi-document ingestion, semantic search via ChromaDB vector embeddings, and multi-provider LLM support.',
    problem: 'Information trapped in unstructured local documents (PDF, DOCX, TXT) is cumbersome to query, lacks citations, and exposes private API keys if poorly handled.',
    solution: 'Designed and built a full-stack retrieval-augmented generation engine with persistent ChromaDB vector storage, chunking pipelines, and encrypted per-user LLM key management.',
    role: 'Sole Engineer — System Architecture, Backend Pipeline, and React UI.',
    stack: ['React', 'TypeScript', 'FastAPI', 'ChromaDB', 'SQLite', 'Gemini API', 'Sentence Transformers', 'Pydantic'],
    architectureHighlight: 'Modular decoupled architecture separating document ingestion, embedding generation, vector querying, and streaming LLM responses with citations.',
    outcome: 'Seamless multi-document semantic question-answering with citation traceability and persistent chat sessions.',
    highlights: [
      'Multi-document knowledge base (PDF, DOCX, TXT ingestion)',
      'Semantic search with vector embeddings & ChromaDB vector store',
      'Multi-provider LLM support with secure per-user encrypted key management',
      'Structured AI responses with citations and metadata',
      'Conversation history and persistent chat sessions',
      'Clean architecture with separated application layers',
    ],
    links: {
      github: 'https://github.com/pvndr',
    },
    featured: true,
    tags: ['AI / ML', 'RAG', 'FastAPI', 'ChromaDB', 'React'],
  },
  {
    id: 'chronicle',
    title: 'Chronicle',
    summary: 'Full-stack daily journaling application designed for typographic clarity, persistence, and continuous reflection.',
    problem: 'Standard note applications introduce cognitive friction, cluttered interfaces, and complex sync mechanisms that distract from reflective writing.',
    solution: 'Engineered a minimalist, high-craft daily journal with a database layer powered by PostgreSQL and Prisma ORM, deployed live on Vercel.',
    role: 'Full Stack Engineer — Database Design, Frontend UI, and Supabase / Prisma Integration.',
    stack: ['Next.js', 'Prisma', 'PostgreSQL', 'Supabase', 'TypeScript', 'Tailwind CSS'],
    architectureHighlight: 'Prisma client abstractions connected to managed PostgreSQL on Supabase with zero-latency data persistence.',
    outcome: 'Shipped to production on Vercel; provides instantaneous entry dispatch and responsive journal layouts.',
    highlights: [
      'Structured daily journaling with clean typographic interface',
      'PostgreSQL database managed through Prisma ORM with Supabase integration',
      'Production deployment with zero-latency data persistence',
    ],
    links: {
      live: 'https://chronicle-app-tau.vercel.app',
      github: 'https://github.com/pvndr/chronicle-app',
    },
    featured: true,
    tags: ['Full Stack', 'Next.js', 'Prisma', 'PostgreSQL', 'Supabase'],
  },
  {
    id: 'cricshift',
    title: 'CricShift',
    summary: 'Machine learning approach for momentum shift detection and win probability prediction in cricket matches.',
    problem: 'Predicting live match outcomes in cricket is heavily volatile due to sudden momentum swings (wickets, high-scoring overs) that traditional run-rate metrics fail to capture.',
    solution: 'Developed a predictive analytics framework using ball-by-ball feature extraction, momentum indicators, and ML classification published in an international research journal.',
    role: 'Primary Researcher & ML Engineer — Dataset curation, feature engineering, model training, and paper authoring.',
    stack: ['Python', 'Machine Learning', 'Data Science', 'Pandas', 'Scikit-learn', 'Predictive Modeling'],
    architectureHighlight: 'Over-by-over swing quantification mapping historical run-rate variance against historical pressure benchmarks.',
    outcome: 'Research accepted and published in IJARCCE (May 2026, DOI: 10.17148/IJARCCE.2026.155194).',
    highlights: [
      'Novel quantitative methodology analyzing momentum shifts across match overs',
      'Published academic research paper indexed in IJARCCE',
      'Win probability prediction engine using ball-by-ball feature extraction',
    ],
    links: {
      caseStudy: '/research-paper.pdf',
    },
    featured: true,
    tags: ['Machine Learning', 'Data Science', 'Python', 'Research Publication'],
  },
  {
    id: 'labpad',
    title: 'LabPad',
    summary: 'Offline-first progressive web application for engineering lab notes, code snippets, and observation logging.',
    problem: 'Engineers working in connectivity-restricted environments (offline labs, transit) lose progress or face locked cloud editors.',
    solution: 'Created an offline-first PWA utilizing client-side IndexedDB for immediate disk-speed writes with background Supabase synchronization upon reconnect.',
    role: 'Frontend & PWA Developer — Storage architecture, service worker caching, and UI.',
    stack: ['React', 'TypeScript', 'IndexedDB', 'PWA', 'Supabase'],
    architectureHighlight: 'Local-first write strategy with IndexedDB state reconciliation and responsive mobile shell.',
    outcome: 'Live production deployment with installable desktop/mobile manifest and sub-millisecond local reads.',
    highlights: [
      'Offline-first persistence with IndexedDB and background Supabase sync',
      'Instant search across technical notes and code snippets',
      'Installable as native PWA across mobile and desktop',
    ],
    links: {
      live: 'https://project-d81ht.vercel.app/',
      github: 'https://github.com/pvndr/LabPad.git',
    },
    featured: false,
    tags: ['PWA', 'IndexedDB', 'React', 'Offline-First'],
  },
  {
    id: 'interactive-valentines',
    title: 'Interactive Valentine\'s Experience',
    summary: 'A playful interactive web experience featuring custom animations, dynamic sound effects, and responsive micro-interactions.',
    problem: 'Modern web experiences often rely on heavy external animation runtimes that bloat page loads.',
    solution: 'Crafted a zero-dependency interactive canvas application with procedural particle physics and synthetic audio micro-interactions.',
    role: 'Creative Web Developer — Custom physics shaders, canvas rendering, and Web Audio.',
    stack: ['Vanilla JavaScript', 'HTML5 Canvas', 'CSS3 Animations', 'Web Audio API'],
    architectureHighlight: 'Pure native Web APIs without external heavy dependencies for instantaneous execution.',
    outcome: 'Delightful 60 FPS responsive animations with dynamic audio synthesis.',
    highlights: [
      'Custom physics animations and particle effects',
      'Dynamic audio synthesis using Web Audio API',
      'Lightweight zero-dependency web architecture',
    ],
    links: {
      github: 'https://github.com/pvndr',
    },
    featured: false,
    tags: ['Creative Web', 'Canvas', 'JavaScript', 'Web Audio API'],
  },
];
