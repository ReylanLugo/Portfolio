import type { Project } from '@/data/projects';

type Base = NonNullable<Project['preview']>;

export type TerminalPreviewData = Extract<Base, { kind: 'terminal' }> & {
  title?: string;
  lines?: string[];
};

export type EditorPreviewData = Extract<Base, { kind: 'editor' }> & {
  title?: string;
  lines?: string[];
};

export type BrowserPreviewData = Extract<Base, { kind: 'browser' }> & {
  title?: string;
  lines?: string[];
};

export type MobilePreviewData = Extract<Base, { kind: 'mobile' }> & {
  title?: string;
  lines?: string[];
};

export type ApiPreviewData = Extract<Base, { kind: 'api' }> & {
  title?: string;
  request?: string[];
  response?: string[];
};

export type GraphPreviewData = Extract<Base, { kind: 'graph' }> & {
  title?: string;
  metric?: string;
  value?: string;
  delta?: string;
};

export type GalleryPreviewData = Extract<Base, { kind: 'gallery' }> & {
  title?: string;
  tileLabels?: string[];
};
