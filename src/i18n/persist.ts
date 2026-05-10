import type { Locale } from './types';

const KEY = 'locale';

export function getStored(): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(KEY) : null;
  } catch {
    return null;
  }
}

export function setStored(locale: Locale): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, locale);
  } catch {
    /* ignore: private mode, quota, etc. */
  }
}
