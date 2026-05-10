import type { ProjectAccent } from '@/data/projects';

export const accentMap: Record<ProjectAccent, string> = {
  orange: '249, 115, 22',
  amber: '245, 158, 11',
  cyan: '34, 211, 238',
  violet: '167, 139, 250',
  green: '74, 222, 128',
  rose: '244, 114, 182',
};

export function accentRgb(accent?: ProjectAccent): string {
  return accentMap[accent ?? 'orange'];
}

export function accentRgba(accent: ProjectAccent | undefined, alpha: number): string {
  return `rgba(${accentRgb(accent)}, ${alpha})`;
}
