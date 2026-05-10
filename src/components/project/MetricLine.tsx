import { MetaDivider } from '@/components/ui';

type Props = {
  index: string;
  year: string;
  role: string;
  accentRgb: string;
};

export function MetricLine({ index, year, role, accentRgb }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone-mute">
      <span style={{ color: `rgb(${accentRgb})` }}>{index}</span>
      <MetaDivider />
      <span>{year}</span>
      <MetaDivider />
      <span>{role}</span>
    </div>
  );
}
