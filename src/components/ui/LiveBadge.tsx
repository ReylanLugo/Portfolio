type Props = {
  accentRgb: string;
  label?: string;
};

export function LiveBadge({ accentRgb, label = 'live' }: Props) {
  return (
    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
      <span
        className="h-1.5 w-1.5 animate-pulseGlow rounded-full"
        style={{ background: `rgb(${accentRgb})` }}
      />
      {label}
    </div>
  );
}
