export type ProjectAccent =
  | 'orange' | 'amber' | 'cyan' | 'violet' | 'green' | 'rose';

export type PreviewKind =
  | 'terminal' | 'editor' | 'browser' | 'mobile' | 'api' | 'graph' | 'gallery';

export type Preview =
  | { kind: 'terminal' }
  | { kind: 'editor' }
  | { kind: 'browser' }
  | { kind: 'mobile' }
  | {
      kind: 'api';
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      endpoint: string;
      status: number;
      latency: string;
    }
  | { kind: 'graph'; points: number[]; ticks?: string[] }
  | { kind: 'gallery'; tiles: { tone: number }[] };

export type Project = {
  id: string;
  index: string;
  stack: string[];
  year: string;
  href?: string;
  image?: string;
  accent?: ProjectAccent;
  preview?: Preview;
};

export const projects: Project[] = [
  {
    id: 'vault-os',
    index: '01',
    stack: ['React', 'Tauri', 'Rust', 'SQLite', 'CRDT'],
    year: '2025',
    accent: 'orange',
    preview: { kind: 'terminal' },
  },
  {
    id: 'atlas-api',
    index: '02',
    stack: ['Node', 'Postgres+PostGIS', 'Redis', 'Cloudflare Workers'],
    year: '2024',
    accent: 'amber',
    preview: { kind: 'editor' },
  },
  {
    id: 'ink-cms',
    index: '03',
    stack: ['Next.js', 'tRPC', 'Drizzle', 'Postgres', 'S3'],
    year: '2024',
    accent: 'cyan',
    preview: { kind: 'browser' },
  },
  {
    id: 'pulse-monitor',
    index: '04',
    stack: ['Go', 'NATS', 'ClickHouse', 'Svelte'],
    year: '2023',
    accent: 'violet',
    preview: { kind: 'mobile' },
  },
  {
    id: 'relay-gateway',
    index: '05',
    stack: ['Rust', 'Tokio', 'Axum', 'OpenTelemetry', 'Redis'],
    year: '2025',
    accent: 'green',
    preview: { kind: 'api', method: 'POST', endpoint: '/v1/checkout/sessions', status: 201, latency: '34ms' },
  },
  {
    id: 'tempo-analytics',
    index: '06',
    stack: ['TypeScript', 'ClickHouse', 'Rust', 'D3', 'WebGL'],
    year: '2024',
    accent: 'cyan',
    preview: {
      kind: 'graph',
      points: [
        88, 92, 84, 102, 110, 96, 124, 140, 132, 118, 126, 144, 158, 142, 130,
        118, 124, 138, 152, 146, 134, 128, 122, 128,
      ],
      ticks: ['00', '06', '12', '18', '24'],
    },
  },
  {
    id: 'mosaic-studio',
    index: '07',
    stack: ['Next.js', 'Postgres+pgvector', 'Python', 'CLIP', 'S3'],
    year: '2024',
    accent: 'rose',
    preview: {
      kind: 'gallery',
      tiles: [
        { tone: 0.85 }, { tone: 0.6 }, { tone: 0.4 },
        { tone: 0.75 }, { tone: 0.5 }, { tone: 0.65 },
        { tone: 0.3 }, { tone: 0.55 }, { tone: 0.45 },
      ],
    },
  },
];
