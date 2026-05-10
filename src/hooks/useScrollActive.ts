import { useEffect, useState } from 'react';
import { type MotionValue } from 'framer-motion';

export function useScrollActive(
  progress: MotionValue<number>,
  range: [number, number] = [0.12, 0.88],
): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const unsubscribe = progress.on('change', (v) => {
      const next = v > range[0] && v < range[1];
      setActive((prev) => (prev !== next ? next : prev));
    });
    return unsubscribe;
  }, [progress, range]);

  return active;
}
