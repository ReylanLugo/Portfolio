import { useContext, useMemo } from 'react';
import { I18nContext } from './I18nProvider';
import { interpolate } from './interpolate';
import { es } from './locales/es';
import { en } from './locales/en';
import type { Catalog } from './catalog';
import type { Locale, TFunc, TKey, TParams, TRawKey } from './types';

const CATALOGS: Record<Locale, Catalog> = { es, en };

function getPath(obj: unknown, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined), obj);
}

export function useT(): TFunc {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used within <I18nProvider>');
  const catalog = CATALOGS[ctx.locale];

  return useMemo(() => {
    const fn = ((key: TKey, params?: TParams) => {
      const raw = getPath(catalog, key);
      if (typeof raw !== 'string') {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] missing string for key "${key}" in "${ctx.locale}"`);
        }
        return key;
      }
      return interpolate(raw, params);
    }) as TFunc;
    fn.raw = (<K extends TRawKey>(key: K) => getPath(catalog, key)) as TFunc['raw'];
    return fn;
  }, [catalog, ctx.locale]);
}
