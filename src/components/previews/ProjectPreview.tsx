import type { Project } from '@/data/projects';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';
import { TerminalPreview } from './TerminalPreview';
import { EditorPreview } from './EditorPreview';
import { BrowserPreview } from './BrowserPreview';
import { MobilePreview } from './MobilePreview';
import { ApiPreview } from './ApiPreview';
import { GraphPreview } from './GraphPreview';
import { GalleryPreview } from './GalleryPreview';

type Props = {
  project: Project;
  accentRgb: string;
};

export function ProjectPreview({ project, accentRgb }: Props) {
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-2xl border border-ink-700/60 bg-ink-950/60">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const preview = project.preview;
  if (!preview) {
    return (
      <PreviewFrame accentRgb={accentRgb}>
        <WindowChrome title={project.name} accentRgb={accentRgb} />
      </PreviewFrame>
    );
  }

  switch (preview.kind) {
    case 'terminal':
      return <TerminalPreview preview={preview} accentRgb={accentRgb} />;
    case 'editor':
      return <EditorPreview preview={preview} accentRgb={accentRgb} />;
    case 'browser':
      return <BrowserPreview preview={preview} accentRgb={accentRgb} />;
    case 'mobile':
      return <MobilePreview preview={preview} accentRgb={accentRgb} />;
    case 'api':
      return <ApiPreview preview={preview} accentRgb={accentRgb} />;
    case 'graph':
      return <GraphPreview preview={preview} accentRgb={accentRgb} />;
    case 'gallery':
      return <GalleryPreview preview={preview} accentRgb={accentRgb} />;
    default:
      return null;
  }
}
