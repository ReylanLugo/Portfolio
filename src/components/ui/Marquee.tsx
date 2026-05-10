import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  items: ReactNode[];
  reverse?: boolean;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
};

const speedClass = {
  slow: '[animation-duration:60s]',
  normal: '[animation-duration:40s]',
  fast: '[animation-duration:24s]',
};

export function Marquee({ items, reverse = false, speed = 'normal', className }: Props) {
  return (
    <div
      className={cn(
        'group/marquee relative w-full overflow-hidden mask-fade-x',
        className,
      )}
    >
      <div
        className={cn(
          'flex w-max gap-3 sm:gap-4 will-change-transform group-hover/marquee:[animation-play-state:paused]',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
          speedClass[speed],
        )}
        aria-hidden="true"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="shrink-0">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
