import { type ReactNode, type AnchorHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  children: ReactNode;
  label: string;
  size?: 'sm' | 'md';
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'aria-label'>;

const sizes = {
  sm: 'h-9 w-9',
  md: 'h-10 w-10',
};

export function IconButton({
  children,
  label,
  size = 'md',
  className,
  ...rest
}: Props) {
  return (
    <a
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center rounded-full border border-ink-700/70 bg-ink-900/60 text-bone-dim backdrop-blur transition hover:border-accent/60 hover:text-accent',
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
