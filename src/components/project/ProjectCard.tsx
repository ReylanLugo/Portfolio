import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/projects';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollActive } from '@/hooks/useScrollActive';
import { useProject } from '@/hooks/useProject';
import { generateBlobs } from '@/lib/blob';
import { accentRgb } from '@/lib/accent';
import { cn } from '@/lib/cn';
import { StatGrid } from '@/components/ui';
import { BlobLayer } from './BlobLayer';
import { MetricLine } from './MetricLine';
import { ProjectPreview } from '@/components/previews';
import { Chip } from '@/components/ui';

type Props = {
  project: Project;
  index: number;
  total: number;
};

function CaseStudyLink({
  href,
  accentRgb,
}: {
  href: string;
  accentRgb: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-ink-700/70 bg-ink-950/70 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em]',
        'text-bone-dim transition hover:text-bone',
      )}
      style={{ borderColor: `rgba(${accentRgb}, 0.45)` }}
    >
      Case study
      <ArrowUpRight size={14} />
    </a>
  );
}

export function ProjectCard({ project, index, total }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const accent = accentRgb(project.accent);
  const blobs = useMemo(() => generateBlobs(project.id, 2), [project.id]);
  const localized = useProject(project.id);
  if (!localized) return null;
  const { name, tagline, description, highlights } = localized;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const isActive = useScrollActive(scrollYProgress);

  return (
    <div
      ref={ref}
      className="sticky top-24"
      style={{
        zIndex: index + 1,
        transform: reduced ? undefined : `translateY(${index * 12}px)`,
      }}
    >
      <motion.article
        style={{
          scale: reduced ? 1 : scale,
          transform: 'translateZ(0)',
          willChange: 'transform',
          contain: 'paint',
        }}
        className="group relative max-h-[80svh] overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-900/80 p-6 backdrop-blur-md sm:max-h-[84svh] sm:p-10 lg:max-h-none lg:p-14"
      >
        <BlobLayer
          blobs={blobs}
          accentRgb={accent}
          active={isActive}
          reduced={reduced}
          opacity={glow}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/[0.04]"
        />

        <div className="relative grid h-full gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12 lg:items-stretch">
          <div className="flex flex-col justify-between">
            <div>
              <MetricLine
                index={project.index}
                year={project.year}
                accentRgb={accent}
              />

              <h3 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-balance">
                {name}
              </h3>
              <p className="mt-3 max-w-xl font-display text-lg sm:text-xl text-bone-dim">
                {tagline}
              </p>
              <p className="mt-6 max-w-xl text-sm sm:text-base text-bone-dim/90 text-pretty">
                {description}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Chip>{s}</Chip>
                  </li>
                ))}
              </ul>

              {highlights && highlights.length > 0 && (
                <div className="mt-8">
                  <StatGrid stats={highlights} accentRgb={accent} />
                </div>
              )}
            </div>

            <div className="mt-8 flex items-center justify-between gap-6 lg:mt-12">
              <CaseStudyLink
                href={project.href ?? `#${project.id}`}
                accentRgb={accent}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-bone-mute">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>
          </div>

          <div className="relative min-h-[260px] sm:min-h-[380px] lg:min-h-[540px]">
            <ProjectPreview project={localized} accentRgb={accent} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}
