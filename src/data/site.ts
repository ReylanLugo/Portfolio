export const site = {
  name: 'Reylan Lugo',
  shortName: 'Reylan',
  role: 'Full stack developer',
  tagline: 'Construyo sistemas que respiran — interfaces tech-noir, APIs sólidas, código que envejece bien.',
  location: 'Remote · LATAM',
  email: 'reylan@avocadoblock.com',
  cvUrl: '/cv-reylan-lugo.pdf',
  social: {
    github: 'https://github.com/ReylanLugo',
    linkedin: 'https://www.linkedin.com/in/reylanlugo',
    x: 'https://x.com/reylanlugo',
  },
  quickFacts: [
    { label: 'OPEN · Q3 26', accent: true },
    { label: 'CARACAS / UTC-4' },
    { label: '~6 YRS' },
  ] as { label: string; accent?: boolean }[],
  metrics: [
    { label: 'años construyendo', value: 6, suffix: '+' },
    { label: 'proyectos en prod', value: 24, suffix: '' },
    { label: 'commits / año', value: 1800, suffix: '' },
    { label: 'cafés por sprint', value: 99, suffix: '' },
  ],
  nav: [
    { id: 'work', label: 'Work' },
    { id: 'stack', label: 'Stack' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ],
};

export type SiteData = typeof site;
