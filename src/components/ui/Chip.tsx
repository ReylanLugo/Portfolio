import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  bullet?: boolean;
  className?: string;
  size?: 'sm' | 'md';
};

const sizes = {
  sm: 'px-3 py-1 text-[11px]',
  md: 'px-4 py-2 text-xs',
};

export function Chip({ children, bullet = false, className, size = 'sm' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink-700/80 bg-ink-900/70 font-mono text-bone-dim backdrop-blur',
        sizes[size],
        className,
      )}
    >
      {bullet && <span className="h-1 w-1 rounded-full bg-accent/80" />}
      {children}
    </span>
  );
}
