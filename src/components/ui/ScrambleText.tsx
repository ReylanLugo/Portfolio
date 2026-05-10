import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SCRAMBLE_CHARS as CHARS } from '@/lib/constants';

type Props = {
  text: string;
  className?: string;
  trigger?: 'mount' | 'cycle';
  cycleMs?: number;
  duration?: number;
};

export function ScrambleText({
  text,
  className,
  trigger = 'mount',
  cycleMs = 8000,
  duration = 900,
}: Props) {
  const [output, setOutput] = useState(text);
  const reduced = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setOutput(text);
      return;
    }

    let cancelled = false;

    const run = () => {
      const start = performance.now();
      const len = text.length;
      const queue = Array.from({ length: len }, (_, i) => ({
        from: CHARS[Math.floor(Math.random() * CHARS.length)] ?? '_',
        to: text[i] ?? '',
        startAt: Math.random() * (duration * 0.4),
        endAt: duration * 0.4 + Math.random() * (duration * 0.6),
      }));

      const tick = (now: number) => {
        if (cancelled) return;
        const t = now - start;
        let result = '';
        let done = 0;
        for (const q of queue) {
          if (t >= q.endAt) {
            result += q.to;
            done++;
          } else if (t >= q.startAt) {
            const c = CHARS[Math.floor(Math.random() * CHARS.length)] ?? '_';
            result += `<span class="opacity-70 text-accent">${c}</span>`;
          } else {
            result += `<span class="opacity-30">${q.from}</span>`;
          }
        }
        setOutput(result);
        if (done < len) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    run();

    if (trigger === 'cycle') {
      const loop = () => {
        timeoutRef.current = window.setTimeout(() => {
          run();
          loop();
        }, cycleMs);
      };
      loop();
    }

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, trigger, cycleMs, duration, reduced]);

  return (
    <span
      className={className}
      aria-label={text}
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}
