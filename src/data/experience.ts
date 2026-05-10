export type ExperienceId = 'avocado-block' | 'independent' | 'stratos-labs' | 'self-taught';

export type ExperienceItem = {
  id: ExperienceId;
  company: string;
  period: string;
  location: string;
};

export const experience: ExperienceItem[] = [
  { id: 'avocado-block', company: 'Avocado Block', period: '2024 — Now', location: 'Remote' },
  { id: 'independent', company: 'Independent', period: '2022 — 2024', location: 'LATAM · Remote' },
  { id: 'stratos-labs', company: 'Stratos Labs', period: '2020 — 2022', location: 'Hybrid' },
  { id: 'self-taught', company: 'Self-taught', period: '2018 — 2020', location: 'Bedroom HQ' },
];
