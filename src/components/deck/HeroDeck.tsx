import { useState } from 'react';
import { projects } from '@/data/projects';
import { useT } from '@/i18n';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useDeckCycle } from '@/hooks/useDeckCycle';
import { DECK_SLOT_OFFSETS, DECK_CYCLE_MS } from './deckSlots';
import { DeckCard } from './DeckCard';
import { DeckIndicator } from './DeckIndicator';

type Props = {
  mouseX: number;
  mouseY: number;
};

export function HeroDeck({ mouseX, mouseY }: Props) {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { cycle, advance } = useDeckCycle({ intervalMs: DECK_CYCLE_MS, paused });
  const t = useT();

  const deck = projects.slice(0, DECK_SLOT_OFFSETS.length);
  const total = deck.length;
  const front = deck[cycle % total];
  const frontName = front
    ? ((t.raw(`projects.${front.id}.name` as never) as string) ?? '')
    : '';

  const advanceFromKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      advance();
    }
  };

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ perspective: 1400 }}
    >
      <div
        className="relative h-full w-full cursor-pointer"
        style={{
          transform: reduced
            ? undefined
            : `translate3d(${mouseX * 10}px, ${mouseY * 10}px, 0)`,
          transition: 'transform 220ms ease-out',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onClick={advance}
        onKeyDown={advanceFromKeyboard}
        role="button"
        tabIndex={0}
        aria-label="Avanzar carta del deck"
      >
        {deck.map((project, projectIdx) => {
          const slot = (projectIdx - cycle + total * 1000) % total;
          return (
            <DeckCard
              key={project.id}
              project={project}
              slot={slot}
              total={total}
              projectIdx={projectIdx}
            />
          );
        })}
      </div>

      <DeckIndicator
        total={total}
        active={cycle % total}
        label={frontName.replace('.', ' ')}
      />
    </div>
  );
}
