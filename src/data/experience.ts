export interface TimelineEvent {
  id: string;
  title: string;
  organization: string;
  period: string;
  branch: string;
  description: string;
  badge?: string;
  type: 'education' | 'milestone';
}

export const educationTimeline: TimelineEvent[] = [
  {
    id: 'bachelors-cse',
    title: 'Bachelor of Engineering [B.E] in Computer Science & Engineering',
    organization: 'K.S. School of Engineering and Management',
    period: '2023 — Present',
    branch: "merge branch 'bachelors/cse'",
    description: 'Exploring core computing principles alongside emerging technologies like artificial intelligence, machine learning, and systems architecture. Maintaining a strong academic performance of 8.56 CGPA.',
    badge: 'CGPA: 8.56',
    type: 'education',
  },
  {
    id: 'pre-university',
    title: 'Science Student (Pre-University)',
    organization: 'Anubhava Mantapa',
    period: '2021 — 2023',
    branch: 'branch feature/science',
    description: 'Developed core analytical problem-solving skills through comprehensive study of fundamental physical sciences and mathematics, bridging the gap to applied technology and engineering.',
    badge: 'Class of 2023',
    type: 'education',
  },
  {
    id: 'high-school',
    title: 'High School Education',
    organization: 'Jain Vidyalaya',
    period: 'Class of 2021',
    branch: 'init repository',
    description: 'Early academic years focusing on core subjects, building strong academic discipline, and developing a foundational curiosity for science, mathematics, and computers.',
    badge: 'Foundations',
    type: 'education',
  },
];
