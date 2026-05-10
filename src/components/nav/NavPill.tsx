import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { useT } from '@/i18n';

type Props = { active: string | null };

export function NavPill({ active }: Props) {
  const t = useT();
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-1 rounded-full border border-ink-700/70 bg-ink-900/60 p-1 backdrop-blur">
        {site.nav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={cn(
                  'relative block rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                  isActive ? 'text-bone' : 'text-bone-dim hover:text-bone',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-ink-700/80 ring-1 ring-accent/30"
                  />
                )}
                {t(`nav.${item.id}` as 'nav.work')}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
