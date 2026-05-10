import { Section, Marquee, Chip, RichText } from '@/components/ui';
import { stackRowA, stackRowB } from '@/data/stack';
import { useT } from '@/i18n';

function StackChip({ label }: { label: string }) {
  return <Chip bullet size="md">{label}</Chip>;
}

export function Stack() {
  const t = useT();
  return (
    <Section
      id="stack"
      label={t('sections.stack.eyebrow')}
      title={<RichText template={t('sections.stack.title')} />}
      description={t('sections.stack.description')}
    >
      <div className="space-y-4 sm:space-y-5">
        <Marquee items={stackRowA.map((s) => <StackChip key={s} label={s} />)} speed="slow" />
        <Marquee items={stackRowB.map((s) => <StackChip key={s} label={s} />)} reverse speed="normal" />
      </div>
    </Section>
  );
}
