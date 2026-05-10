export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Avocado Block',
    role: 'Senior Full Stack Engineer',
    period: '2024 — Now',
    location: 'Remote',
    bullets: [
      'Lidero la arquitectura de productos internos (Next.js + Postgres + tRPC) priorizando DX y reusabilidad.',
      'Reduje tiempo de bootstrap de nuevos servicios un 70% con un starter kit propio.',
      'Mentoring técnico a 4 ingenieros mid/jr en patrones React, testing y DDD ligero.',
    ],
  },
  {
    company: 'Independent',
    role: 'Contract Engineer',
    period: '2022 — 2024',
    location: 'LATAM · Remote',
    bullets: [
      'Diseñé y entregué APIs de geocoding edge para 3 clientes B2B (sub-30ms p95).',
      'Construí dashboards data-heavy con virtualización y streaming de datasets >1M rows.',
      'Migré 2 monolitos PHP a Node + Postgres sin downtime usando dual-write + shadow reads.',
    ],
  },
  {
    company: 'Stratos Labs',
    role: 'Full Stack Developer',
    period: '2020 — 2022',
    location: 'Hybrid',
    bullets: [
      'Construí la primera versión del producto (React + Rails) con foco en time-to-first-aha.',
      'Owned la pipeline de CI/CD (GitHub Actions + Fly.io), bajé el deploy de 18 a 4 min.',
      'Implementé feature flags y experimentación A/B internas.',
    ],
  },
  {
    company: 'Self-taught',
    role: 'Building things on the internet',
    period: '2018 — 2020',
    location: 'Bedroom HQ',
    bullets: [
      'Aprendí JS, Python, Linux y SQL construyendo proyectos públicos en GitHub.',
      'Primer freelance: landings, scrapers y bots para PyMEs locales.',
    ],
  },
];
