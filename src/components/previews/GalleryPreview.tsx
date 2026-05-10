import type { Preview } from '@/data/projects';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';

type Props = {
  preview: Extract<Preview, { kind: 'gallery' }>;
  accentRgb: string;
};

function GalleryTile({
  index,
  label,
  tone,
  accentRgb,
  highlighted,
}: {
  index: number;
  label: string;
  tone: number;
  accentRgb: string;
  highlighted: boolean;
}) {
  return (
    <div
      className="relative aspect-square overflow-hidden rounded-md border border-ink-700/60 bg-ink-900/70"
      style={{
        boxShadow: highlighted
          ? `0 0 0 1px rgba(${accentRgb}, 0.45), 0 8px 30px -10px rgba(${accentRgb}, 0.35)`
          : undefined,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, rgba(${accentRgb}, ${0.18 + tone * 0.4}), rgba(0,0,0,0.4) 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `linear-gradient(${index * 37}deg, rgba(232,230,223,${0.04 + tone * 0.06}) 0 1px, transparent 1px 6px)`,
          backgroundSize: `${6 + index}px ${6 + index}px`,
        }}
      />
      <div className="absolute inset-x-2 bottom-2 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-bone-dim">
        <span style={{ color: highlighted ? `rgb(${accentRgb})` : undefined }}>
          {label}
        </span>
        <span>{String(index + 1).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

export function GalleryPreview({ preview, accentRgb }: Props) {
  return (
    <PreviewFrame accentRgb={accentRgb}>
      <WindowChrome title={preview.title} accentRgb={accentRgb} />
      <div className="grid h-full grid-cols-3 gap-2 p-4 sm:p-5">
        {preview.tiles.map((t, i) => (
          <GalleryTile
            key={i}
            index={i}
            label={t.label}
            tone={t.tone}
            accentRgb={accentRgb}
            highlighted={i === 0}
          />
        ))}
      </div>
    </PreviewFrame>
  );
}
