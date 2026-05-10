import { cn } from '@/lib/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  prefix?: string;
};

export function EyebrowLabel({ children, className, prefix = '//' }: Props) {
  return (
    <p
      className={cn(
        'font-mono text-[11px] uppercase tracking-[0.22em] text-accent/90',
        className,
      )}
    >
      <span className="mr-2 text-bone-mute">{prefix}</span>
      {children}
    </p>
  );
}
