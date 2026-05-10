import { type ReactNode } from 'react';

type Props = {
  accentRgb: string;
  children: ReactNode;
};

export function PreviewFrame({ accentRgb, children }: Props) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-950/85 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(${accentRgb}, 0.5), transparent)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(232,230,223,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(232,230,223,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage:
            'radial-gradient(ellipse at 50% 30%, #000 30%, transparent 80%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full blur-3xl"
        style={{ background: `rgba(${accentRgb}, 0.35)` }}
      />
      {children}
    </div>
  );
}
