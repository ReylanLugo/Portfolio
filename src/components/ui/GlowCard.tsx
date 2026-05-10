import {
  type ReactNode,
  type CSSProperties,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { cn } from '@/lib/cn';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Props = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
};

export function GlowCard({
  children,
  className,
  glowColor = '249, 115, 22',
  intensity = 0.55,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [vars, setVars] = useState<CSSProperties>({
    '--mx': '50%',
    '--my': '50%',
    '--glow-opacity': '0',
  } as CSSProperties);
  const reduced = useReducedMotion();

  const onMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setVars({
      '--mx': `${x}%`,
      '--my': `${y}%`,
      '--glow-opacity': String(intensity),
    } as CSSProperties);
  };

  const onLeave = () => {
    setVars((v) => ({ ...v, '--glow-opacity': '0' }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...vars, ['--glow-color' as never]: glowColor }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-900/60 shadow-card backdrop-blur-sm',
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(420px circle at var(--mx) var(--my), rgba(var(--glow-color), 0.18), transparent 55%)',
          opacity: 'var(--glow-opacity)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.04]"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
