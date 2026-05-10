import { type ReactNode, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function GhostButton({ children, className, ...rest }: Props) {
  return (
    <a
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink-700/70 bg-ink-900/60 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-bone-dim backdrop-blur transition hover:border-accent/60 hover:text-bone',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
