import { type ReactNode, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export function PrimaryButton({ children, className, ...rest }: Props) {
  return (
    <a
      className={cn(
        'group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.18em] text-ink-950 shadow-glow transition-transform hover:scale-[1.03]',
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
