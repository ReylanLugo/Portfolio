import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { GlowCard } from '@/components/ui/GlowCard';
import { site } from '@/data/site';
import { EyebrowLabel } from '@/components/ui';
import { MetricStat } from '@/components/ui';

function Bio() {
  return (
    <div className="space-y-5 text-bone-dim text-pretty leading-relaxed">
      <p>
        Soy <span className="text-bone">{site.name}</span>, full stack engineer
        especializado en producto. Me siento cómodo en el front (React, TS,
        motion) y en el back (Node, Postgres, infra simple que escala).
      </p>
      <p>
        Diseño antes de codear, pero no me casé con Figma: muchas veces el
        prototipo más útil es un branch con HMR encendido. Prefiero entregar
        vertical thin slices que mockups infinitos.
      </p>
      <p>
        Cuando no estoy en el editor: leyendo sci-fi, perdiéndome en synth
        hardware o pidiendo otro café.
      </p>
    </div>
  );
}

function Stats() {
  return (
    <GlowCard className="p-6 sm:p-8">
      <EyebrowLabel>stats</EyebrowLabel>
      <ul className="mt-6 grid grid-cols-2 gap-y-8 gap-x-6">
        {site.metrics.map((m) => (
          <li key={m.label}>
            <MetricStat label={m.label} value={m.value} suffix={m.suffix} />
          </li>
        ))}
      </ul>
    </GlowCard>
  );
}

export function About() {
  return (
    <Section
      id="about"
      label="About"
      title={
        <>
          Construyo software como{' '}
          <span className="text-accent">quien arma sintetizadores</span>: módulos
          chicos, conexiones claras, sonido grande.
        </>
      }
      description="Trabajo en remoto desde LATAM. Me obsesionan los detalles de DX, las animaciones que no estorban y los sistemas que envejecen sin dolor."
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
