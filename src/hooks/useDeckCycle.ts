import { useEffect, useState } from 'react';
import { useReducedMotion } from './useReducedMotion';

type Options = {
  intervalMs?: number;
  paused?: boolean;
};

export function useDeckCycle({ intervalMs = 3500, paused = false }: Options = {}) {
  const [cycle, setCycle] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || paused) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), intervalMs);
    return () => clearInterval(id);
  }, [reduced, paused, intervalMs]);

  return { cycle, advance: () => setCycle((c) => c + 1) };
}
