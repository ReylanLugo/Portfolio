import { Section, RichText } from '@/components/ui';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/project';
import { useT } from '@/i18n';

export function Projects() {
  const t = useT();
  return (
    <Section
      id="work"
      label={t('sections.work.eyebrow')}
      title={<RichText template={t('sections.work.title')} />}
      description={t('sections.work.description')}
    >
      <div className="relative">
        <div className="space-y-[18vh] pb-[18vh] sm:space-y-[16vh] sm:pb-[16vh] lg:space-y-[18vh] lg:pb-[18vh]">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </Section>
  );
}
