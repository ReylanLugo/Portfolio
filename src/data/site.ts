export type NavId = 'work' | 'stack' | 'experience' | 'about' | 'contact';
export type QuickFactId = 'open' | 'location' | 'years';
export type MetricId =
  | 'yearsBuilding'
  | 'projectsInProd'
  | 'commitsPerYear'
  | 'coffeesPerSprint';

export const site = {
  name: 'Reylan Lugo',
  shortName: 'Reylan',
  email: 'reylan@avocadoblock.com',
  cvUrl: '/cv-reylan-lugo.pdf',
  social: {
    github: 'https://github.com/ReylanLugo',
    linkedin: 'https://www.linkedin.com/in/reylanlugo',
    x: 'https://x.com/reylanlugo',
  },
  metrics: [
    { id: 'yearsBuilding', value: 6, suffix: '+' },
    { id: 'projectsInProd', value: 24, suffix: '' },
    { id: 'commitsPerYear', value: 1800, suffix: '' },
    { id: 'coffeesPerSprint', value: 99, suffix: '' },
  ] as const satisfies readonly { id: MetricId; value: number; suffix: string }[],
  quickFacts: [
    { id: 'open', accent: true },
    { id: 'location' },
    { id: 'years' },
  ] as const satisfies readonly { id: QuickFactId; accent?: boolean }[],
  nav: [
    { id: 'work' },
    { id: 'stack' },
    { id: 'experience' },
    { id: 'about' },
    { id: 'contact' },
  ] as const satisfies readonly { id: NavId }[],
};

export type SiteData = typeof site;
