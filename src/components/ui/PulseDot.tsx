import { cn } from '@/lib/cn';

type Props = {
  size?: number;
  className?: string;
  color?: string;
  blur?: boolean;
};

export function PulseDot({
  size = 6,
  className,
  color = '#f97316',
  blur = true,
}: Props) {
  return (
    <span
      className={cn('relative inline-flex', className)}
      style={{ width: size, height: size }}
    >
      <span
        className="absolute inset-0 rounded-full animate-pulseGlow"
        style={{ background: color }}
      />
      {blur && (
        <span
          className="absolute inset-0 rounded-full opacity-70 blur-sm animate-pulseGlow"
          style={{ background: color }}
        />
      )}
    </span>
  );
}
