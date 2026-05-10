import { useContext, useMemo } from 'react';
import { I18nContext } from './I18nProvider';
import { interpolate } from './interpolate';
import { es } from './locales/es';
import { en } from './locales/en';
import type { Catalog } from './catalog';
import type { Locale, TFunc, TKey, TParams, TRawKey, ValueAt } from './types';

const CATALOGS: Record<Locale, Catalog> = { es, en };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function readPath(catalog: Catalog, key: string): unknown {
  let acc: unknown = catalog;
  for (const segment of key.split('.')) {
    if (!isRecord(acc)) return undefined;
    acc = acc[segment];
  }
  return acc;
}

export function useT(): TFunc {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used within <I18nProvider>');
  const catalog = CATALOGS[ctx.locale];

  return useMemo(() => {
    const translate = (key: TKey, params?: TParams): string => {
      const raw = readPath(catalog, key);
      if (typeof raw !== 'string') {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] missing string for key "${key}" in "${ctx.locale}"`);
        }
        return key;
      }
      return interpolate(raw, params);
    };

    function raw<K extends TRawKey>(key: K): ValueAt<Catalog, K> {
      return readPath(catalog, key) as ValueAt<Catalog, K>;
    }

    return Object.assign(translate, { raw });
  }, [catalog, ctx.locale]);
}
