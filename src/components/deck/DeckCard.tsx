import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { accentRgb as accentRgbOf } from '@/lib/accent';
import { useProject } from '@/hooks/useProject';
import { DECK_SLOT_OFFSETS, type DeckSlotOffset } from './deckSlots';
import { DeckCardMark } from './DeckCardMark';

type Props = {
  project: Project;
  slot: number;
  total: number;
  projectIdx: number;
};

function GoldChip() {
  return (
    <span
      aria-hidden="true"
      className="h-5 w-7 rounded-[3px] bg-gradient-to-br from-amber-200/90 via-amber-300/70 to-amber-500/40 ring-1 ring-amber-200/30"
      style={{
        boxShadow:
          'inset 0 0 0 1px rgba(0,0,0,0.25), inset 0 -2px 0 rgba(0,0,0,0.15)',
      }}
    />
  );
}

function CenterDiamond({
  accentRgb,
  isFront,
}: {
  accentRgb: string;
  isFront: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
    >
      <span
        className="block h-12 w-12 rotate-45 rounded-md border"
        style={{
          borderColor: `rgba(${accentRgb}, ${isFront ? 0.35 : 0.18})`,
          background: `rgba(${accentRgb}, ${isFront ? 0.04 : 0})`,
        }}
      />
    </div>
  );
}

function buildShadow(accentRgb: string, isFront: boolean): string {
  if (isFront) {
    return `0 0 0 1px rgba(${accentRgb}, 0.4), 0 40px 90px -25px rgba(${accentRgb}, 0.55), 0 10px 30px -10px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)`;
  }
  return '0 25px 60px -25px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.04)';
}

function buildAnimate(offset: DeckSlotOffset, isBack: boolean) {
  if (isBack) {
    return {
      x: `${offset.x}%`,
      y: [`-32%`, `${offset.y + 4}%`, `${offset.y}%`],
      rotate: [offset.rotate + 18, offset.rotate - 2, offset.rotate],
      scale: offset.scale,
      opacity: 1,
    };
  }
  return {
    x: `${offset.x}%`,
    y: `${offset.y}%`,
    rotate: offset.rotate,
    scale: offset.scale,
    opacity: 1,
  };
}

function buildTransition(isBack: boolean) {
  if (isBack) {
    return {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      times: [0, 0.7, 1] as [number, number, number],
    };
  }
  return {
    x: { type: 'spring' as const, stiffness: 90, damping: 20, mass: 1.1 },
    y: { type: 'spring' as const, stiffness: 90, damping: 20, mass: 1.1 },
    rotate: { type: 'spring' as const, stiffness: 70, damping: 18, mass: 1.1 },
    scale: { type: 'spring' as const, stiffness: 110, damping: 22 },
  };
}

export function DeckCard({ project, slot, total, projectIdx }: Props) {
  const offset = DECK_SLOT_OFFSETS[slot]!;
  const isFront = slot === 0;
  const isBack = slot === total - 1;
  const accent = accentRgbOf(project.accent);
  const localized = useProject(project.id);
  const name = localized?.name ?? project.id;
  const tagline = localized?.tagline ?? '';

  return (
    <motion.div
      animate={buildAnimate(offset, isBack)}
      transition={buildTransition(isBack)}
      style={{
        zIndex: total - slot,
        left: '14%',
        top: '8%',
        width: '54%',
        height: '78%',
        transformOrigin: 'bottom center',
      }}
      className="absolute"
    >
      <div
        className="relative h-full w-full overflow-hidden rounded-[20px] border bg-gradient-to-br from-ink-800/95 via-ink-900 to-ink-950"
        style={{
          borderColor: `rgba(${accent}, ${isFront ? 0.55 : 0.2})`,
          boxShadow: buildShadow(accent, isFront),
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 90% 60% at 50% -10%, rgba(${accent}, ${isFront ? 0.34 : 0.1}), transparent 60%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-white/[0.05]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-gradient-to-b from-white/[0.06] to-transparent"
        />

        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
              case_{project.index}
            </span>
            {isFront && <GoldChip />}
          </div>

          <CenterDiamond accentRgb={accent} isFront={isFront} />

          <div>
            <p
              className="font-display font-medium leading-[0.95] tracking-tight text-bone uppercase"
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)',
                textShadow: isFront ? `0 0 24px rgba(${accent}, 0.35)` : 'none',
              }}
            >
              {name.replace('.', ' ')}
            </p>
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-bone-mute">
              {tagline.split(/[—.,·]/)[0]?.toLowerCase().trim()} ·{' '}
              {project.year}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <DeckCardMark accentRgb={accent} glow={isFront} />
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-bone-mute">
                ···· {project.index}
                {String(projectIdx + 1).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-12 h-44 w-44 rounded-full blur-3xl"
          style={{ background: `rgba(${accent}, ${isFront ? 0.22 : 0.08})` }}
        />
      </div>
    </motion.div>
  );
}
