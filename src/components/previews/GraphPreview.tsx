import type { GraphPreviewData } from './types';
import { PreviewFrame } from './PreviewFrame';
import { WindowChrome } from './WindowChrome';

type Props = {
  preview: GraphPreviewData;
  accentRgb: string;
};

const W = 100;
const H = 100;

function buildPaths(points: number[]) {
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = Math.max(1, max - min);
  const step = W / (points.length - 1);
  const norm = (v: number) => H - ((v - min) / range) * H;

  const line = points
    .map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i * step).toFixed(2)} ${norm(v).toFixed(2)}`)
    .join(' ');

  const area = `${line} L ${W} ${H} L 0 ${H} Z`;

  return { line, area, step, norm };
}

export function GraphPreview({ preview, accentRgb }: Props) {
  const { line, area, step, norm } = buildPaths(preview.points);
  const last = preview.points.length - 1;
  const gradId = `g-${accentRgb.replace(/[^0-9]/g, '')}`;

  return (
    <PreviewFrame accentRgb={accentRgb}>
      <WindowChrome title={preview.title ?? ''} accentRgb={accentRgb} />
      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
              {preview.metric}
            </p>
            <p
              className="mt-1 font-display text-3xl sm:text-4xl font-medium tracking-tight text-bone"
              style={{ textShadow: `0 0 24px rgba(${accentRgb}, 0.35)` }}
            >
              {preview.value}
            </p>
          </div>
          {preview.delta && (
            <span
              className="rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{
                borderColor: `rgba(${accentRgb}, 0.4)`,
                color: `rgb(${accentRgb})`,
                background: `rgba(${accentRgb}, 0.08)`,
              }}
            >
              {preview.delta}
            </span>
          )}
        </div>

        <div className="relative mt-4 flex-1">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={`rgb(${accentRgb})`} stopOpacity={0.45} />
                <stop offset="100%" stopColor={`rgb(${accentRgb})`} stopOpacity={0} />
              </linearGradient>
            </defs>

            {[0.25, 0.5, 0.75].map((g) => (
              <line
                key={g}
                x1={0}
                x2={W}
                y1={H * g}
                y2={H * g}
                stroke="rgba(232,230,223,0.06)"
                strokeWidth={0.4}
              />
            ))}

            <path d={area} fill={`url(#${gradId})`} />
            <path
              d={line}
              fill="none"
              stroke={`rgb(${accentRgb})`}
              strokeWidth={1.4}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={last * step}
              cy={norm(preview.points[last]!)}
              r={1.6}
              fill={`rgb(${accentRgb})`}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        {preview.ticks && (
          <div className="mt-3 flex justify-between font-mono text-[9px] uppercase tracking-[0.22em] text-bone-mute">
            {preview.ticks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </PreviewFrame>
  );
}
