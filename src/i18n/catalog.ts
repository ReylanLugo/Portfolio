import type { es } from './locales/es';

type DeepStringify<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly DeepStringify<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T;

export type Catalog = DeepStringify<typeof es>;
