import { useT } from '@/i18n';
import { projects, type Project, type ProjectId } from '@/data/projects';
import type { Catalog } from '@/i18n/catalog';

type ProjectsCatalog = Catalog['projects'];
type LocalizedProjectI18n = ProjectsCatalog[ProjectId];

type LocalizedProject = Project & {
  name: string;
  tagline: string;
  description: string;
  highlights: readonly { label: string; value: string }[];
  preview: NonNullable<Project['preview']> & {
    title?: string;
    lines?: readonly string[];
    request?: readonly string[];
    response?: readonly string[];
    metric?: string;
    value?: string;
    delta?: string;
    tileLabels?: readonly string[];
  };
};

export function useProject(id: ProjectId): LocalizedProject | undefined {
  const t = useT();
  const meta = projects.find((p) => p.id === id);
  if (!meta) return undefined;

  const i18n: LocalizedProjectI18n = t.raw(`projects.${id}`);
  if (!i18n) return undefined;

  const previewI18n = 'preview' in i18n ? i18n.preview : undefined;
  const metaPreview = meta.preview;

  return {
    ...meta,
    name: i18n.name,
    tagline: i18n.tagline,
    description: i18n.description,
    highlights: i18n.highlights,
    preview: {
      ...(metaPreview ?? ({ kind: 'browser' } as const)),
      ...(previewI18n ?? {}),
    },
  } as LocalizedProject;
}
