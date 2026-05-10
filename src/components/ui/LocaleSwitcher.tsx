import { motion } from 'framer-motion';
import { useLocale, useT } from '@/i18n';
import { cn } from '@/lib/cn';

export function LocaleSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const t = useT();

  return (
    <ul
      aria-label={t('a11y.languageSwitcher')}
      className="flex items-center gap-1 rounded-full border border-ink-700/70 bg-ink-900/60 p-1 backdrop-blur"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <li key={l} className="relative">
            <button
              type="button"
              onClick={() => {
                if (!active) setLocale(l);
              }}
              aria-pressed={active}
              className={cn(
                'relative px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors',
                active ? 'text-bone' : 'text-bone-dim hover:text-bone',
              )}
            >
              {active && (
                <motion.span
                  layoutId="locale-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-full bg-ink-700/80 ring-1 ring-accent/30"
                />
              )}
              {l.toUpperCase()}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
