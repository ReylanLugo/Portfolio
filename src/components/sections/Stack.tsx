import { Section, Marquee, Chip } from '@/components/ui';
import { stackRowA, stackRowB } from '@/data/stack';

function StackChip({ label }: { label: string }) {
  return (
    <Chip bullet size="md">
      {label}
    </Chip>
  );
}

export function Stack() {
  return (
    <Section
      id="stack"
      label="Stack"
      title={
        <>
          Las herramientas <span className="text-accent">contundentes</span>{' '}
          que ya probé en producción.
        </>
      }
      description="No colecciono logos: este es el stack que uso a diario y por el que pondría las manos en el fuego."
    >
      <div className="space-y-4 sm:space-y-5">
        <Marquee
          items={stackRowA.map((s) => (
            <StackChip key={s} label={s} />
          ))}
          speed="slow"
        />
        <Marquee
          items={stackRowB.map((s) => (
            <StackChip key={s} label={s} />
          ))}
          reverse
          speed="normal"
        />
      </div>
    </Section>
  );
}
