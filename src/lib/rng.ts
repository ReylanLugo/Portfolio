export type Rng = () => number;

export function makeRng(seed: number): Rng {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}
