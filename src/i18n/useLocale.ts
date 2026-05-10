import { useContext } from 'react';
import { I18nContext } from './I18nProvider';
import { LOCALES } from './types';

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLocale must be used within <I18nProvider>');
  return { locale: ctx.locale, setLocale: ctx.setLocale, locales: LOCALES };
}
