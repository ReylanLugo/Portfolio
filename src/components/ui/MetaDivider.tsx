import { cn } from '@/lib/cn';

type Props = {
  className?: string;
  width?: 'sm' | 'md';
};

const widths = { sm: 'w-4', md: 'w-8' };

export function MetaDivider({ className, width = 'md' }: Props) {
  return (
    <span className={cn('h-px shrink-0 bg-bone-mute/40', widths[width], className)} />
  );
}
