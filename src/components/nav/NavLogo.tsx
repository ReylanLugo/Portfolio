import { PulseDot } from '@/components/ui';
import { cn } from '@/lib/cn';

type Props = {
  shortName: string;
  scrolled: boolean;
};

export function NavLogo({ shortName, scrolled }: Props) {
  return (
    <a
      href="#hero"
      className={cn(
        'group relative inline-flex items-center gap-2 rounded-full font-display text-sm font-medium tracking-tight',
        '[transition:padding_600ms_cubic-bezier(0.22,1,0.36,1)]',
        scrolled ? 'px-4 py-1.5' : 'px-0 py-0',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full border bg-ink-900/60 backdrop-blur',
          '[transition:opacity_500ms_cubic-bezier(0.22,1,0.36,1),border-color_500ms_cubic-bezier(0.22,1,0.36,1)]',
          scrolled
            ? 'border-ink-700/70 opacity-100'
            : 'border-transparent opacity-0',
        )}
      />
      <PulseDot size={8} />
      <span className="relative">{shortName}</span>
      <span className="relative text-accent">.</span>
    </a>
  );
}
