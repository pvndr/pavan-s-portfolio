export interface Publication {
  id: string;
  title: string;
  type: 'journal' | 'conference' | 'preprint';
  venue: string;
  date: string;
  doi?: string;
  abstract: string;
  links: {
    pdf?: string;
    certificate?: string;
    publisher?: string;
  };
  tags: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  pdfUrl?: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 'pub-cricket-ml',
    title: 'A Survey on Machine Learning Approach for Momentum Shift Detection and Win Prediction in Cricket Matches',
    type: 'journal',
    venue: 'International Journal of Advanced Research in Computer and Communication Engineering (IJARCCE)',
    date: 'May 2026',
    doi: '10.17148/IJARCCE.2026.155194',
    abstract: 'Investigating quantitative machine learning methodologies to detect critical momentum turning points and predict live match win probabilities across cricket match phases using dynamic feature modeling.',
    links: {
      pdf: '/research-paper.pdf',
      certificate: '/publication-certificate.pdf',
    },
    tags: ['Machine Learning', 'Predictive Modeling', 'Momentum Shift', 'IJARCCE', 'Research'],
  },
];

export const certifications: Certification[] = [
  {
    id: 'cert-publication',
    title: 'Certificate of Publication — IJARCCE',
    issuer: 'International Journal of Advanced Research in Computer and Communication Engineering',
    date: 'May 2026',
    pdfUrl: '/publication-certificate.pdf',
    tags: ['Peer-Reviewed Research', 'IJARCCE', 'DOI: 10.17148/IJARCCE.2026.155194'],
  },
  {
    id: 'cert-ibm',
    title: 'IBM SkillsBuild Hackathon-integrated Guided Learning Experience (GLE)',
    issuer: 'Edunet Foundation & IBM SkillsBuild',
    date: '2024',
    pdfUrl: '/ibm-skillsbuild-certificate.pdf',
    tags: ['Hackathon', 'Guided Learning', 'IBM SkillsBuild'],
  },
  {
    id: 'cert-infosys',
    title: 'Explore Machine Learning using Python',
    issuer: 'Infosys Springboard',
    date: 'April 13, 2026',
    pdfUrl: '/infosys-ml-certificate.pdf',
    tags: ['Machine Learning', 'Python', 'Infosys'],
  },
];
