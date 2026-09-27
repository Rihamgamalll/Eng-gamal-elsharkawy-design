'use client';

import { ReactNode, useEffect } from 'react';
import { useLanguage } from '@/lib/language-context';
import { ExperienceLayer } from '@/components/layout/ExperienceLayer';

export function LayoutClient({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();

  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  return (
    <>
      <ExperienceLayer />
      {children}
    </>
  );
}
