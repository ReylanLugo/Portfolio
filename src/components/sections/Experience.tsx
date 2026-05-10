import { Section, Reveal, RichText } from '@/components/ui';
import { experience, type ExperienceItem } from '@/data/experience';
import { useT } from '@/i18n';

function TimelineDot() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink-950 ring-1 ring-accent/60 shadow-[0_0_12px_#f97316]"
    />
  );
}

function TimelineEntry({ item, delay }: { item: ExperienceItem; delay: number }) {
  const t = useT();
  const role = t(`experience.${item.id}.role` as 'experience.avocado-block.role');
  const rawBullets = t.raw(`experience.${item.id}.bullets` as never);
  const bullets: readonly string[] = Array.isArray(rawBullets) ? (rawBullets as readonly string[]) : [];
  return (
    <li className="relative pl-8 sm:pl-12 pb-12 last:pb-0">
      <TimelineDot />
      <Reveal delay={delay}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
            {item.company}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {item.period}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs text-bone-dim">
          {role} · {item.location}
        </p>
        <ul className="mt-4 space-y-2 text-bone-dim/95 max-w-2xl text-pretty">
          {bullets.map((b, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-bone-mute/50" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
}

export function Experience() {
  const t = useT();
  return (
    <Section
      id="experience"
      label={t('sections.experience.eyebrow')}
      title={<RichText template={t('sections.experience.title')} />}
      description={t('sections.experience.description')}
    >
      <ol className="relative ml-3 sm:ml-6 border-l border-ink-700/60">
        {experience.map((item, i) => (
          <TimelineEntry key={item.id} item={item} delay={i * 0.06} />
        ))}
      </ol>
    </Section>
  );
}
