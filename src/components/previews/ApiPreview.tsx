import type { ApiPreviewData } from './types';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';

type Props = {
  preview: ApiPreviewData;
  accentRgb: string;
};

function StatusBadge({ status }: { status: number }) {
  const ok = status >= 200 && status < 300;
  return (
    <span
      className="ml-auto rounded-md border px-2 py-0.5 text-[10px]"
      style={{
        color: ok ? '#7ee788' : '#ff8b6b',
        borderColor: ok ? 'rgba(126,231,136,0.4)' : 'rgba(255,139,107,0.4)',
        background: ok ? 'rgba(126,231,136,0.08)' : 'rgba(255,139,107,0.08)',
      }}
    >
      {status} OK
    </span>
  );
}

function Pane({
  title,
  arrow,
  accentRgb,
  children,
}: {
  title: string;
  arrow: string;
  accentRgb: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-ink-950/85 p-4 sm:p-5">
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.22em] text-bone-mute">
        <span style={{ color: `rgb(${accentRgb})` }}>{arrow}</span> {title}
      </p>
      <pre className="font-mono text-[11px] leading-6 text-bone-dim">{children}</pre>
    </div>
  );
}

export function ApiPreview({ preview, accentRgb }: Props) {
  return (
    <PreviewFrame accentRgb={accentRgb}>
      <WindowChrome title={preview.title ?? ''} accentRgb={accentRgb} />

      <div className="border-b border-ink-700/40 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span
            className="rounded-md px-2 py-0.5 font-semibold"
            style={{
              background: `rgba(${accentRgb}, 0.16)`,
              color: `rgb(${accentRgb})`,
              border: `1px solid rgba(${accentRgb}, 0.3)`,
            }}
          >
            {preview.method}
          </span>
          <span className="truncate text-bone-dim">{preview.endpoint}</span>
          <StatusBadge status={preview.status} />
          <span className="font-mono text-[10px] text-bone-mute">{preview.latency}</span>
        </div>
      </div>

      <div className="grid h-full grid-rows-[auto_auto] gap-px bg-ink-700/40">
        {preview.request && (
          <Pane title="request body" arrow="›" accentRgb={accentRgb}>
            {preview.request.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </Pane>
        )}
        <Pane title="response · application/json" arrow="←" accentRgb={accentRgb}>
          {(preview.response ?? []).map((l, i) => (
            <div
              key={i}
              style={{
                color: /"[^"]+":/.test(l)
                  ? `rgb(${accentRgb})`
                  : 'rgba(232,230,223,0.9)',
              }}
            >
              {l}
            </div>
          ))}
        </Pane>
      </div>
    </PreviewFrame>
  );
}
