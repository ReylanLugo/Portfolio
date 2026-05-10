import { ArrowUpRight, Download, Github, Mail } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { site } from '@/data/site';
import { EyebrowLabel, GhostButton, PrimaryButton } from '@/components/ui';

function ContactGlows() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(249,115,22,0.22),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
    </>
  );
}

function ContactCtas() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <PrimaryButton href={`mailto:${site.email}`} className="px-5 py-3">
        <Mail size={14} />
        {site.email}
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </PrimaryButton>
      <GhostButton href={site.cvUrl} download className="px-5 py-3">
        <Download size={14} />
        Download CV
      </GhostButton>
      <GhostButton
        href={site.social.github}
        target="_blank"
        rel="noreferrer"
        className="px-5 py-3"
      >
        <Github size={14} />
        github.com/ReylanLugo
      </GhostButton>
    </div>
  );
}

export function Contact() {
  return (
    <Section id="contact" label="Contact">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-900/70 px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-28">
          <ContactGlows />
          <EyebrowLabel>let's build</EyebrowLabel>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-balance">
            ¿Tienes una idea?{' '}
            <span className="block text-bone-dim">
              La construimos <span className="text-accent">esta semana</span>.
            </span>
          </h2>
          <ContactCtas />
        </div>
      </Reveal>
    </Section>
  );
}
