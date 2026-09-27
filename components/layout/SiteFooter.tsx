'use client';

import { ArrowUp, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

const FACEBOOK_URL = 'https://www.facebook.com/share/19eSBxf8RE/?mibextid=wwXIfr';

const navItems = [
  { href: '#hero', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#about', key: 'nav.about' },
  { href: '#process', key: 'nav.process' },
  { href: '#contact', key: 'nav.contact' },
];

export function SiteFooter() {
  const { t, toggle } = useLanguage();

  return (
    <footer className="bg-[#151412] text-ivory border-t border-white/[0.07]">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-[1.35fr_.65fr_.65fr_.65fr] gap-10 lg:gap-14">
          <div>
            <a href="#hero" className="inline-flex items-center gap-3 mb-6">
              <span className="w-11 h-11 rounded-full border border-brass/50 text-brass flex items-center justify-center font-latin text-lg">G</span>
              <span>
                <span className="block text-base font-semibold">{t('brand.name')}</span>
                <span className="block mt-1 text-[10px] tracking-[0.18em] uppercase text-ivory/[0.38]">{t('brand.trade')}</span>
              </span>
            </a>
            <p className="max-w-lg text-sm leading-7 text-ivory/[0.44]">{t('footer.about')}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2.5 text-xs text-ivory/[0.65] hover:border-brass hover:text-brass transition-all"
              >
                <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center font-latin text-[11px] font-bold">f</span>
                {t('footer.facebook')}
              </a>
              <button
                onClick={toggle}
                className="rounded-full border border-white/[0.12] px-4 py-2.5 text-xs text-ivory/[0.65] hover:border-brass hover:text-brass transition-all"
              >
                {t('lang.switch')}
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-brass mb-5">{t('footer.nav')}</h3>
            <ul className="space-y-3.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-ivory/[0.45] hover:text-ivory transition-colors">{t(item.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] tracking-[0.22em] uppercase text-brass mb-5">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:0530858304" className="flex items-center gap-3 text-sm text-ivory/[0.45] hover:text-ivory transition-colors">
                  <Phone size={15} className="text-brass shrink-0" />
                  <span className="font-latin">0530858304</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/966530858304" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-ivory/[0.45] hover:text-ivory transition-colors">
                  <MessageCircle size={15} className="text-brass shrink-0" />
                  {t('contact.whatsapp')}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm leading-6 text-ivory/[0.45]">
                <MapPin size={15} className="mt-1 text-brass shrink-0" />
                {t('footer.location')}
              </li>
            </ul>
          </div>

          <div className="flex lg:justify-end lg:items-start">
            <a
              href="#hero"
              className="group w-24 h-24 rounded-full border border-white/[0.12] flex flex-col items-center justify-center gap-2 text-ivory/[0.55] hover:text-brass hover:border-brass transition-all duration-300"
              aria-label="Back to top"
            >
              <ArrowUp size={18} className="transition-transform group-hover:-translate-y-1" />
              <span className="font-latin text-[9px] tracking-[0.18em] uppercase">TOP</span>
            </a>
          </div>
        </div>

        <div className="mt-14 lg:mt-20 pt-7 border-t border-white/[0.07] flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <p className="text-[11px] text-ivory/[0.28]">© {new Date().getFullYear()} {t('brand.name')} — {t('footer.rights')}</p>
          <p className="font-latin text-[9px] tracking-[0.22em] uppercase text-ivory/[0.22]">DETAIL • LIGHT • PROPORTION • EXECUTION</p>
        </div>
      </div>
    </footer>
  );
}
