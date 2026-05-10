import type { TerminalPreviewData } from './types';
import { LiveBadge } from '@/components/ui';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';

type Props = {
  preview: TerminalPreviewData;
  accentRgb: string;
};

export function TerminalPreview({ preview, accentRgb }: Props) {
  return (
    <PreviewFrame accentRgb={accentRgb}>
      <WindowChrome title={preview.title ?? ''} accentRgb={accentRgb} variant="terminal" />
      <div className="relative p-5 sm:p-6 font-mono text-xs sm:text-sm">
        {(preview.lines ?? []).map((l, i) => (
          <div
            key={i}
            className="leading-7"
            style={{
              color: l.startsWith('$')
                ? `rgb(${accentRgb})`
                : 'rgba(168,166,157,0.92)',
            }}
          >
            {l.startsWith('$') ? (
              <>
                <span className="text-bone-mute">›</span>{' '}
                <span style={{ color: `rgb(${accentRgb})` }}>
                  {l.slice(1).trim()}
                </span>
              </>
            ) : (
              l
            )}
          </div>
        ))}
        <div className="mt-4">
          <LiveBadge accentRgb={accentRgb} />
        </div>
      </div>
    </PreviewFrame>
  );
}
