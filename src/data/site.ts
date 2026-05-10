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
  ] as const,
  quickFacts: [
    { id: 'open', accent: true },
    { id: 'location' },
    { id: 'years' },
  ] as const,
  nav: [
    { id: 'work' as const },
    { id: 'stack' as const },
    { id: 'experience' as const },
    { id: 'about' as const },
    { id: 'contact' as const },
  ],
};

export type SiteData = typeof site;
