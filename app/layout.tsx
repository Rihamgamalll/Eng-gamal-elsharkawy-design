import './globals.css';
import type { Metadata } from 'next';
import { Cairo, Cormorant_Garamond, Inter } from 'next/font/google';
import { LanguageProvider } from '@/lib/language-context';
import { LayoutClient } from '@/components/layout/LayoutClient';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-latin',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-latin-sans',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'المهندس جمال الشرقاوي | ديكور وجبس وتشطيبات داخلية',
  description:
    'أعمال ديكور وجبس وتشطيبات داخلية بإشراف المهندس جمال الشرقاوي في المدينة المنورة، مع خدمة لمختلف مناطق المملكة العربية السعودية.',
  keywords: [
    'جمال الشرقاوي',
    'ديكور',
    'جبس',
    'تشطيبات داخلية',
    'المدينة المنورة',
    'Gypsum',
    'Interior Decoration',
  ],
  openGraph: {
    title: 'المهندس جمال الشرقاوي | ديكور وجبس وتشطيبات',
    description:
      'تصميم وتنفيذ أعمال الديكور والجبس والتشطيبات الداخلية بعناية في التفاصيل وجودة التنفيذ.',
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: ['en_US'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${cormorant.variable} ${inter.variable}`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <LayoutClient>{children}</LayoutClient>
        </LanguageProvider>
      </body>
    </html>
  );
}
