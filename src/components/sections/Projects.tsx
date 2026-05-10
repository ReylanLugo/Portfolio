import { Section } from '@/components/ui/Section';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/project';

export function Projects() {
  return (
    <Section
      id="work"
      label="The Deck — work"
      title={
        <>
          Cuatro proyectos, una <span className="text-accent">obsesión</span>:
          herramientas que se sienten vivas.
        </>
      }
      description="Cada card es un sistema en producción o cerca. Scrollea para apilarlas como un mazo — la que está al frente cuenta su historia."
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
