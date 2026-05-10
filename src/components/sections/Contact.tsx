import { ArrowUpRight, Download, Github, Mail } from 'lucide-react';
import { Section, Reveal, EyebrowLabel, GhostButton, PrimaryButton, RichText } from '@/components/ui';
import { site } from '@/data/site';
import { useT } from '@/i18n';

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
  const t = useT();
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <PrimaryButton href={`mailto:${site.email}`} className="px-5 py-3">
        <Mail size={14} />
        {site.email}
        <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </PrimaryButton>
      <GhostButton href={site.cvUrl} download className="px-5 py-3">
        <Download size={14} />
        {t('contact.cv')}
      </GhostButton>
      <GhostButton href={site.social.github} target="_blank" rel="noreferrer" className="px-5 py-3">
        <Github size={14} />
        github.com/ReylanLugo
      </GhostButton>
    </div>
  );
}

export function Contact() {
  const t = useT();
  return (
    <Section id="contact" label={t('sections.contact.eyebrow')}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-900/70 px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-28">
          <ContactGlows />
          <EyebrowLabel>{t('contact.eyebrow')}</EyebrowLabel>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-balance">
            <RichText template={t('contact.title')} />
          </h2>
          <ContactCtas />
        </div>
      </Reveal>
    </Section>
  );
}
