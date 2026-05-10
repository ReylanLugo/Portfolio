import { Section, Reveal, GlowCard, EyebrowLabel, MetricStat, RichText } from '@/components/ui';
import { site } from '@/data/site';
import { useT } from '@/i18n';

function Bio() {
  const t = useT();
  const p1 = t('about.p1', { name: site.name });
  return (
    <div className="space-y-5 text-bone-dim text-pretty leading-relaxed">
      <p>
        {p1.split(site.name).flatMap((part, i, arr) =>
          i < arr.length - 1
            ? [<span key={`p${i}`}>{part}</span>, <span key={`n${i}`} className="text-bone">{site.name}</span>]
            : [<span key={`p${i}`}>{part}</span>],
        )}
      </p>
      <p>{t('about.p2')}</p>
      <p>{t('about.p3')}</p>
    </div>
  );
}

function Stats() {
  const t = useT();
  return (
    <GlowCard className="p-6 sm:p-8">
      <EyebrowLabel>{t('about.statsLabel')}</EyebrowLabel>
      <ul className="mt-6 grid grid-cols-2 gap-y-8 gap-x-6">
        {site.metrics.map((m) => (
          <li key={m.id}>
            <MetricStat
              label={t(`about.metricsLabels.${m.id}` as 'about.metricsLabels.yearsBuilding')}
              value={m.value}
              suffix={m.suffix}
            />
          </li>
        ))}
      </ul>
    </GlowCard>
  );
}

export function About() {
  const t = useT();
  return (
    <Section
      id="about"
      label={t('sections.about.eyebrow')}
      title={<RichText template={t('sections.about.title')} />}
      description={t('sections.about.description')}
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <Reveal>
          <Bio />
        </Reveal>
        <Reveal delay={0.1}>
          <Stats />
        </Reveal>
      </div>
    </Section>
  );
}
