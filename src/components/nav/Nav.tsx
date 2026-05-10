import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '@/data/site';
import { useActiveSection } from '@/hooks/useActiveSection';
import { LocaleSwitcher } from '@/components/ui';
import { useT } from '@/i18n';
import { NavLogo } from './NavLogo';
import { NavPill } from './NavPill';
import { MobileDrawer } from './MobileDrawer';

const navIds = site.nav.map((n) => n.id);

function useScrolled(threshold = 16) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
}

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(navIds);
  const t = useT();

  useBodyScrollLock(open);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <NavLogo shortName={site.shortName} scrolled={scrolled} />

          <NavPill active={active} />

          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-950 shadow-glow transition-transform hover:scale-[1.03]"
            >
              {t('nav.hire')}
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-700/70 bg-ink-900/60 text-bone backdrop-blur"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
