import { WindowDots } from '@/components/ui';

type Props = {
  title: string;
  accentRgb: string;
  variant?: 'default' | 'terminal';
};

export function WindowChrome({ title, accentRgb, variant = 'default' }: Props) {
  return (
    <div className="flex items-center gap-2 border-b border-ink-700/60 px-4 py-2.5">
      <WindowDots variant={variant} accentRgb={accentRgb} />
      <span className="ml-3 truncate font-mono text-[10px] uppercase tracking-[0.18em] text-bone-mute">
        {title}
      </span>
    </div>
  );
}
