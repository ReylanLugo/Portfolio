import type { Preview } from '@/data/projects';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';

type Props = {
  preview: Extract<Preview, { kind: 'editor' }>;
  accentRgb: string;
};

function lineColor(line: string, accentRgb: string): string {
  const trimmed = line.trim();
  if (trimmed.startsWith('//')) return 'rgba(168,166,157,0.55)';
  if (trimmed.startsWith('import ') || trimmed.startsWith('await ')) {
    return `rgb(${accentRgb})`;
  }
  return 'rgba(232,230,223,0.92)';
}

export function EditorPreview({ preview, accentRgb }: Props) {
  const lines = preview.lines ?? [];
  return (
    <PreviewFrame accentRgb={accentRgb}>
      <WindowChrome title={preview.title} accentRgb={accentRgb} />
      <div className="relative grid grid-cols-[auto_1fr] font-mono text-xs sm:text-sm">
        <div className="select-none border-r border-ink-700/40 px-3 py-5 text-right text-bone-mute/70">
          {lines.map((_, i) => (
            <div key={i} className="leading-7">
              {String(i + 1).padStart(2, '0')}
            </div>
          ))}
        </div>
        <div className="px-4 py-5 sm:px-5">
          {lines.map((l, i) => (
            <div
              key={i}
              className="leading-7"
              style={{ color: lineColor(l, accentRgb) }}
            >
              {l || ' '}
            </div>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
