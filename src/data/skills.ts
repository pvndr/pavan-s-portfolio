export interface SkillCluster {
  id: string;
  label: string;
  coordinate: string;
  description: string;
  skills: string[];
}

export const skillClusters: SkillCluster[] = [
  {
    id: 'ai-ml',
    coordinate: '01 / ML',
    label: 'AI & Machine Learning',
    description: 'Neural architectures, retrieval pipelines, and vector semantic spaces.',
    skills: [
      'Python',
      'Machine Learning',
      'Prompt Engineering',
      'ChromaDB',
      'Sentence Transformers',
      'Gemini API',
      'RAG Architecture',
    ],
  },
  {
    id: 'fullstack',
    coordinate: '02 / WEB',
    label: 'Full Stack Engineering',
    description: 'Modern reactive interfaces and robust persistent database systems.',
    skills: [
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Node.js',
      'HTML5',
      'CSS3',
      'MySQL',
      'PostgreSQL',
      'Prisma',
      'Supabase',
      'Git & GitHub',
    ],
  },
  {
    id: 'systems',
    coordinate: '03 / ENG',
    label: 'Core Systems & Architecture',
    description: 'Algorithmic foundations, object-oriented design, and API contracts.',
    skills: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'DBMS',
      'FastAPI',
      'REST APIs',
      'Responsive Web Design',
      'Problem Solving',
    ],
  },
];
