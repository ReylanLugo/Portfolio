import { hashString } from './hash';
import { makeRng } from './rng';

export type Blob = {
  size: number;
  intensity: number;
  fade: number;
  duration: number;
  delay: number;
  x: string[];
  y: string[];
  scale: number[];
};

export function generateBlobs(seed: string, count = 2): Blob[] {
  const rng = makeRng(hashString(seed));
  return Array.from({ length: count }, (_, i) => {
    const steps = 5 + Math.floor(rng() * 2);
    const x: string[] = [];
    const y: string[] = [];
    const scale: number[] = [];

    for (let s = 0; s < steps; s++) {
      x.push(`${Math.round(8 + rng() * 84)}%`);
      y.push(`${Math.round(8 + rng() * 84)}%`);
      scale.push(0.85 + rng() * 0.4);
    }
    x.push(x[0]!);
    y.push(y[0]!);
    scale.push(scale[0]!);

    return {
      size: 32 + Math.round(rng() * 30) + i * 4,
      intensity: 0.32 + rng() * 0.25,
      fade: 60 + Math.round(rng() * 15),
      duration: 12 + rng() * 12,
      delay: rng() * 6,
      x,
      y,
      scale,
    };
  });
}
