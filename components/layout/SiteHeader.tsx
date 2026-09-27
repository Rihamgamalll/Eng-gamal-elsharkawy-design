'use client';

import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone, ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useLanguage } from '@/lib/language-context';

const navItems = [
  { href: '#hero', key: 'nav.home' },
  { href: '#services', key: 'nav.services' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#about', key: 'nav.about' },
  { href: '#process', key: 'nav.process' },
  { href: '#contact', key: 'nav.contact' },
];

export function SiteHeader() {
  const { t, toggle, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(
        menuRef.current.querySelectorAll('[data-mobile-item]'),
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isLight = scrolled || menuOpen;
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        isLight
          ? 'bg-ivory/[0.92] backdrop-blur-xl border-b border-charcoal/10 shadow-[0_12px_40px_rgba(23,21,19,0.04)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10">
        <div className="h-[74px] lg:h-[86px] flex items-center justify-between gap-6">
          <a href="#hero" className="group flex items-center gap-3 min-w-0" aria-label={t('brand.name')}>
            <span
              className={`w-10 h-10 lg:w-11 lg:h-11 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-[-8deg] ${
                isLight ? 'border-brass/50 text-brass' : 'border-ivory/[0.35] text-ivory'
              }`}
            >
              <span className="font-latin text-lg">G</span>
            </span>
            <span className="min-w-0">
              <span
                className={`block text-sm lg:text-[15px] font-semibold truncate transition-colors duration-500 ${
                  isLight ? 'text-charcoal' : 'text-ivory'
                }`}
              >
                {t('brand.name')}
              </span>
              <span
                className={`block mt-1 text-[9px] lg:text-[10px] tracking-[0.18em] uppercase transition-colors duration-500 ${
                  isLight ? 'text-charcoal/[0.45]' : 'text-ivory/[0.55]'
                }`}
              >
                {t('brand.trade')}
              </span>
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`relative text-[13px] font-medium transition-colors duration-300 group ${
                  isLight ? 'text-charcoal/[0.65] hover:text-charcoal' : 'text-ivory/[0.72] hover:text-ivory'
                }`}
              >
                {t(item.key)}
                <span className="absolute -bottom-2 start-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggle}
              className={`h-10 px-3.5 rounded-full border text-[11px] font-semibold tracking-[0.12em] transition-all duration-300 ${
                isLight
                  ? 'border-charcoal/[0.15] text-charcoal hover:border-brass hover:text-brass'
                  : 'border-ivory/25 text-ivory hover:border-brass hover:text-brass-light'
              }`}
              aria-label="Switch language"
            >
              {t('lang.switch')}
            </button>

            <a
              href="tel:0530858304"
              className="hidden md:inline-flex h-10 items-center gap-2 rounded-full bg-brass px-5 text-[12px] font-semibold text-white transition-all duration-300 hover:bg-brass-dark hover:-translate-y-0.5"
            >
              <Phone size={14} />
              {t('nav.contactBtn')}
              <Arrow size={13} />
            </a>

            <button
              onClick={() => setMenuOpen((open) => !open)}
              className={`xl:hidden w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                isLight ? 'border-charcoal/[0.15] text-charcoal' : 'border-ivory/25 text-ivory'
              }`}
              aria-label="Menu"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div ref={menuRef} className="xl:hidden absolute inset-x-0 top-full h-[calc(100svh-74px)] lg:h-[calc(100svh-86px)] bg-ivory z-40 overflow-y-auto">
          <div className="min-h-full px-6 py-10 flex flex-col">
            <nav className="flex-1">
              {navItems.map((item, index) => (
                <a
                  data-mobile-item
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-5 border-b border-charcoal/10 text-2xl sm:text-3xl font-light text-charcoal group"
                >
                  <span>{t(item.key)}</span>
                  <span className="text-xs font-latin text-brass">0{index + 1}</span>
                </a>
              ))}
            </nav>
            <div data-mobile-item className="pt-8">
              <a
                href="tel:0530858304"
                className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-charcoal text-ivory px-6 py-4 text-sm font-semibold"
              >
                <Phone size={17} /> 0530858304
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
