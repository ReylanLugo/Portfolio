import { StatTile } from './StatTile';

type Stat = { label: string; value: string };

type Props = {
  stats: readonly Stat[];
  accentRgb: string;
};

export function StatGrid({ stats, accentRgb }: Props) {
  if (!stats.length) return null;
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-ink-700/60 bg-ink-700/40">
      {stats.map((s) => (
        <StatTile key={s.label} label={s.label} value={s.value} accentRgb={accentRgb} />
      ))}
    </dl>
  );
}
