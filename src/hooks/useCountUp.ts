import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Options = {
  duration?: number;
  threshold?: number;
};

export function useCountUp(
  target: number,
  { duration = 1200, threshold = 0.4 }: Options = {},
) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setN(target);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let started = false;
    const observer = new IntersectionObserver(
      (entries) => {
        if (started || !entries[0]?.isIntersecting) return;
        started = true;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, threshold, reduced]);

  return { value: n, ref };
}
