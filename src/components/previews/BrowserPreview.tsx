import type { BrowserPreviewData } from './types';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';

type Props = {
  preview: BrowserPreviewData;
  accentRgb: string;
};

function AddressBar({ url }: { url: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-ink-700/40 px-4 py-2">
      <div className="flex gap-1">
        <span className="font-mono text-[10px] text-bone-mute">←</span>
        <span className="font-mono text-[10px] text-bone-mute">→</span>
      </div>
      <div className="flex flex-1 items-center gap-2 rounded-md border border-ink-700/60 bg-ink-900/60 px-3 py-1">
        <span className="font-mono text-[10px] text-bone-mute">⌁</span>
        <span className="truncate font-mono text-[10px] text-bone-dim">
          https://{url}
        </span>
        <span className="ml-auto font-mono text-[9px] uppercase tracking-[0.2em] text-bone-mute">
          secure
        </span>
      </div>
    </div>
  );
}

function SiteNav({ accentRgb }: { accentRgb: string }) {
  return (
    <nav className="flex items-center gap-5 border-b border-ink-700/40 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
      <span className="font-display text-sm normal-case tracking-tight text-bone">
        ink<span style={{ color: `rgb(${accentRgb})` }}>.</span>
      </span>
      <span style={{ color: `rgb(${accentRgb})` }}>● issues</span>
      <span>writers</span>
      <span>archive</span>
      <span className="ml-auto">subscribe →</span>
    </nav>
  );
}

function Cover({ accentRgb }: { accentRgb: string }) {
  return (
    <div className="relative px-5 pt-4 sm:pt-5">
      <div
        className="relative h-24 overflow-hidden rounded-lg border border-ink-700/60 sm:h-28"
        style={{
          background: `linear-gradient(135deg, rgba(${accentRgb}, 0.35), rgba(${accentRgb}, 0.05) 60%, transparent), radial-gradient(circle at 80% 0%, rgba(${accentRgb},0.45), transparent 60%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, rgba(232,230,223,0.05) 0 1px, transparent 1px 8px)`,
          }}
        />
        <div className="absolute bottom-2 left-3 font-mono text-[9px] uppercase tracking-[0.22em] text-bone/80">
          cover · v3
        </div>
      </div>
    </div>
  );
}

export function BrowserPreview({ preview, accentRgb }: Props) {
  const lines = preview.lines ?? [];
  const eyebrow = lines[0] ?? '';
  const meta = lines[1] ?? '';
  const blocks = lines.slice(2);

  return (
    <PreviewFrame accentRgb={accentRgb}>
      <WindowChrome title={preview.title ?? ''} accentRgb={accentRgb} />
      <AddressBar url={preview.title ?? ''} />
      <SiteNav accentRgb={accentRgb} />
      <Cover accentRgb={accentRgb} />

      <div className="px-5 py-4">
        <p
          className="font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: `rgb(${accentRgb})` }}
        >
          {eyebrow.split('·')[0]?.trim() ?? 'Issue'}
        </p>
        <h4 className="mt-1 font-display text-xl font-medium leading-tight tracking-tight text-bone sm:text-2xl">
          {eyebrow.split('·').slice(1).join('·').trim() || 'The Quiet Web'}
        </h4>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
          {meta}
        </p>

        <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {blocks.map((b, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-md border border-ink-700/50 bg-ink-900/40 px-3 py-2"
            >
              <span
                className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: `rgba(${accentRgb}, 0.85)` }}
              />
              <span className="font-mono text-[10px] leading-snug text-bone-dim">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </PreviewFrame>
  );
}
