type Props = {
  variant?: 'default' | 'terminal';
  accentRgb?: string;
};

export function WindowDots({ variant = 'default', accentRgb = '249, 115, 22' }: Props) {
  const close =
    variant === 'terminal' ? `rgba(${accentRgb}, 0.6)` : 'rgba(255,95,86,.85)';
  return (
    <div className="flex items-center gap-1.5">
      <span className="h-2.5 w-2.5 rounded-full" style={{ background: close }} />
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: 'rgba(255,189,46,.7)' }}
      />
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ background: 'rgba(40,201,64,.7)' }}
      />
    </div>
  );
}
