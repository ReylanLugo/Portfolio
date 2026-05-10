import { LOCALES, type Locale } from './types';
import { getStored } from './persist';

function isLocale(value: string | null | undefined): value is Locale {
  if (!value) return false;
  return LOCALES.some((l) => l === value);
}

export function getInitialLocale(): Locale {
  const stored = getStored();
  if (isLocale(stored)) return stored;
  if (typeof navigator === 'undefined') return 'es';
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (isLocale(nav)) return nav;
  return 'es';
}
