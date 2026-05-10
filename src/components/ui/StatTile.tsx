type Props = {
  label: string;
  value: string;
  accentRgb: string;
};

export function StatTile({ label, value, accentRgb }: Props) {
  return (
    <div className="bg-ink-950/80 px-4 py-3 sm:px-5 sm:py-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
        {label}
      </dt>
      <dd
        className="mt-1 font-display text-xl sm:text-2xl font-medium tracking-tight text-bone"
        style={{ textShadow: `0 0 18px rgba(${accentRgb}, 0.25)` }}
      >
        {value}
      </dd>
    </div>
  );
}
