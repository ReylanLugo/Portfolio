import { type ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/cn';
import { EyebrowLabel } from '@/components/ui';

type Props = {
  id: string;
  label?: string;
  title?: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
  fullBleed?: boolean;
};

export const Section = forwardRef<HTMLElement, Props>(function Section(
  { id, label, title, description, children, className, fullBleed = false },
  ref,
) {
  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={title ? `${id}-title` : undefined}
      className={cn(
        'relative scroll-mt-20',
        fullBleed ? '' : 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12',
        className,
      )}
    >
      {(label || title || description) && (
        <header className="mb-10 sm:mb-14 lg:mb-20 max-w-3xl">
          {label && <EyebrowLabel className="mb-4">{label}</EyebrowLabel>}
          {title && (
            <h2
              id={`${id}-title`}
              className="font-display text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-balance"
            >
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-bone-dim text-base sm:text-lg max-w-2xl text-pretty">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </section>
  );
});
