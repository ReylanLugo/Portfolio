import { Github, Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { IconButton } from '@/components/ui';
import { useT } from '@/i18n';

export function Footer() {
  const t = useT();
  return (
    <footer className="relative mt-24 border-t border-ink-700/50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-mute">
          {t('footer.rights', { year: new Date().getFullYear(), name: site.name })}
        </p>
        <div className="flex items-center gap-3">
          <IconButton href={site.social.github} target="_blank" rel="noreferrer" label="GitHub" size="sm">
            <Github size={15} />
          </IconButton>
          <IconButton href={site.social.linkedin} target="_blank" rel="noreferrer" label="LinkedIn" size="sm">
            <Linkedin size={15} />
          </IconButton>
          <IconButton href={`mailto:${site.email}`} label="Email" size="sm">
            <Mail size={15} />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
