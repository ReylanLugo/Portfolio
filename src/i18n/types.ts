import type { Catalog } from './catalog';

export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

type Prev = [never, 0, 1, 2, 3, 4];

export type Path<T, D extends number = 4> = D extends 0
  ? never
  : T extends string
    ? never
    : T extends readonly unknown[]
      ? never
      : T extends Record<string, unknown>
        ? {
            [K in keyof T & string]: T[K] extends string
              ? K
              : T[K] extends Record<string, unknown>
                ? `${K}.${Path<T[K], Prev[D]>}`
                : K;
          }[keyof T & string]
        : never;

export type RawPath<T, D extends number = 5> = D extends 0
  ? never
  : T extends Record<string, unknown>
    ? {
        [K in keyof T & string]:
          | K
          | (T[K] extends Record<string, unknown> ? `${K}.${RawPath<T[K], Prev[D]>}` : never);
      }[keyof T & string]
    : never;

export type TKey = Path<Catalog>;
export type TRawKey = RawPath<Catalog>;

export type TParams = Record<string, string | number>;

export type TFunc = ((key: TKey, params?: TParams) => string) & {
  raw: <K extends TRawKey>(key: K) => unknown;
};
