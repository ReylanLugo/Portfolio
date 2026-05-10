import { useT } from '@/i18n';
import { projects, type ProjectId } from '@/data/projects';
import type { Catalog } from '@/i18n/catalog';

type ProjectsCatalog = Catalog['projects'];
type LocalizedProjectI18n = ProjectsCatalog[ProjectId];

export function useProject(id: ProjectId) {
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
  };
}
