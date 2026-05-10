import { LOCALES, type Locale } from './types';
import { getStored } from './persist';

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getInitialLocale(): Locale {
  const stored = getStored();
  if (isLocale(stored)) return stored;
  if (typeof navigator === 'undefined') return 'es';
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  return isLocale(nav) ? (nav as Locale) : 'es';
}
