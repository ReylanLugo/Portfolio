import { useT } from '@/i18n';
import { projects, type Project } from '@/data/projects';

type LocalizedProject = Project & {
  name: string;
  tagline: string;
  description: string;
  highlights: { label: string; value: string }[];
  preview: NonNullable<Project['preview']> & {
    title?: string;
    lines?: string[];
    request?: string[];
    response?: string[];
    metric?: string;
    value?: string;
    delta?: string;
    tileLabels?: string[];
  };
};

export function useProject(id: string): LocalizedProject | undefined {
  const t = useT();
  const meta = projects.find((p) => p.id === id);
  if (!meta) return undefined;

  const i18n = t.raw(`projects.${id}` as never) as Record<string, unknown> | undefined;
  if (!i18n) return undefined;

  const previewI18n = (i18n.preview ?? {}) as Record<string, unknown>;

  return {
    ...meta,
    name: i18n.name as string,
    tagline: i18n.tagline as string,
    description: i18n.description as string,
    highlights: i18n.highlights as { label: string; value: string }[],
    preview: {
      ...(meta.preview as NonNullable<Project['preview']>),
      ...previewI18n,
    } as LocalizedProject['preview'],
  };
}
