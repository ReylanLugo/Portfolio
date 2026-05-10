import type { MobilePreviewData } from './types';
import { LiveBadge } from '@/components/ui';

type Props = {
  preview: MobilePreviewData;
  accentRgb: string;
};

export function MobilePreview({ preview, accentRgb }: Props) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        className="relative flex h-[88%] w-[44%] min-w-[220px] max-w-[280px] flex-col overflow-hidden rounded-[28px] border-[6px] border-ink-800 bg-ink-950"
        style={{
          boxShadow: `0 0 0 1px rgba(${accentRgb}, 0.18), 0 30px 80px -20px rgba(0,0,0,0.8)`,
        }}
      >
        <div className="absolute left-1/2 top-2 h-1 w-12 -translate-x-1/2 rounded-full bg-ink-800" />
        <div className="flex items-center justify-between px-4 pb-1 pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-mute">
            9:41
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-bone-mute">
            ●●●○
          </span>
        </div>
        <div className="border-t border-ink-800/60 px-4 pb-3 pt-3">
          <p className="font-display text-base font-medium text-bone">{preview.title ?? ''}</p>
          <LiveBadge accentRgb={accentRgb} />
        </div>
        <div className="flex flex-1 flex-col gap-2 overflow-hidden px-4 pb-4">
          {(preview.lines ?? []).map((l, i) => (
            <div
              key={i}
              className="rounded-md border border-ink-800 bg-ink-900/70 px-3 py-2 font-mono text-[10px] text-bone-dim"
              style={{
                borderColor:
                  i === 0 ? `rgba(${accentRgb}, 0.4)` : 'rgba(42,42,50,0.9)',
                background:
                  i === 0
                    ? `linear-gradient(135deg, rgba(${accentRgb}, 0.14), rgba(0,0,0,0))`
                    : undefined,
              }}
            >
              {l}
            </div>
          ))}
        </div>
        <div className="border-t border-ink-800/60 px-4 py-2">
          <div className="flex justify-around font-mono text-[8px] uppercase tracking-[0.2em] text-bone-mute">
            <span style={{ color: `rgb(${accentRgb})` }}>● status</span>
            <span>incidents</span>
            <span>settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
