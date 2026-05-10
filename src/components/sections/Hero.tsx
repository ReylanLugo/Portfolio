import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { ScrambleText } from '@/components/ui/ScrambleText';
import { site } from '@/data/site';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { HeroDeck } from '@/components/deck/HeroDeck';
import {
  GhostButton,
  IconButton,
  PrimaryButton,
  PulseDot,
} from '@/components/ui';
import { useT } from '@/i18n';

function HeroStatusPill() {
  const t = useT();
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-700/70 bg-ink-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-dim backdrop-blur"
    >
      <PulseDot size={6} />
      {t('hero.available')}
    </motion.p>
  );
}

function HeroTitle() {
  const t = useT();
  return (
    <h1 className="font-display font-medium leading-[0.92] tracking-[-0.03em] text-balance">
      <span className="block text-[clamp(3rem,10vw,8.5rem)]">
        <ScrambleText text={t('hero.firstName')} trigger="cycle" cycleMs={9000} />
      </span>
      <span className="block text-[clamp(3rem,10vw,8.5rem)]">
        <ScrambleText text={t('hero.lastName')} trigger="cycle" cycleMs={11000} />
        <span className="text-accent">.</span>
      </span>
    </h1>
  );
}

function HeroFacts() {
  const t = useT();
  return (
    <motion.ul
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="mt-7 flex flex-wrap items-center gap-2"
    >
      {site.quickFacts.map((f) => {
        const label = t(`hero.facts.${f.id}`);
        const accent = 'accent' in f && f.accent;
        return (
          <li
            key={f.id}
            className={
              accent
                ? 'inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent'
                : 'inline-flex items-center gap-2 rounded-full border border-ink-700/70 bg-ink-900/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim backdrop-blur'
            }
          >
            {accent && <PulseDot size={6} />}
            {label}
          </li>
        );
      })}
    </motion.ul>
  );
}

function HeroCtas() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="mt-8 flex flex-wrap items-center gap-3"
    >
      <PrimaryButton href="#work">
        {t('hero.cta.deck')}
        <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
      </PrimaryButton>
      <GhostButton href={site.social.github} target="_blank" rel="noreferrer">
        <Github size={13} />
        {t('hero.cta.github')}
      </GhostButton>
      <IconButton href={site.social.linkedin} target="_blank" rel="noreferrer" label="LinkedIn">
        <Linkedin size={14} />
      </IconButton>
      <IconButton href={`mailto:${site.email}`} label="Email">
        <Mail size={14} />
      </IconButton>
    </motion.div>
  );
}

function ScrollHint() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-mute">
        {t('hero.scrollHint')}
      </div>
    </motion.div>
  );
}

function useMouseParallax(disabled: boolean) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (disabled) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [disabled]);
  return mouse;
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mouse = useMouseParallax(reduced);
  const t = useT();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden pt-24"
    >
      <div className="absolute inset-0 -z-10 bg-radial-glow" />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.5] [mask-image:radial-gradient(ellipse_at_50%_30%,#000_30%,transparent_75%)]" />
      <div className="absolute inset-0 -z-10 bg-noise opacity-[0.04] mix-blend-overlay" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-12 lg:px-12"
      >
        <div>
          <HeroStatusPill />
          <HeroTitle />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-8 max-w-xl text-base sm:text-lg text-bone-dim text-pretty"
          >
            {t('hero.tagline')}
          </motion.p>

          <HeroFacts />
          <HeroCtas />
        </div>

        <div className="relative mx-auto h-[380px] w-full max-w-[420px] sm:h-[440px] sm:max-w-[480px] lg:h-[480px] lg:max-w-none xl:h-[540px]">
          <HeroDeck mouseX={mouse.x} mouseY={mouse.y} />
        </div>
      </motion.div>

      <ScrollHint />
    </section>
  );
}
