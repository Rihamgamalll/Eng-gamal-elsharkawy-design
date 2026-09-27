'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowLeft, ArrowRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const { t, locale, dir } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.set('[data-hero-reveal]', { yPercent: 110 });
      gsap.set('[data-hero-fade]', { opacity: 0, y: 24 });
      gsap.set('[data-hero-side]', { opacity: 0, x: dir === 'rtl' ? -30 : 30 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo(
        '[data-hero-bg]',
        { scale: 1.12 },
        { scale: 1, duration: 1.7, ease: 'power3.out' }
      )
        .to('[data-hero-reveal]', { yPercent: 0, duration: 1.05, stagger: 0.09 }, '-=1.15')
        .to('[data-hero-fade]', { opacity: 1, y: 0, duration: 0.8, stagger: 0.09 }, '-=0.7')
        .to('[data-hero-side]', { opacity: 1, x: 0, duration: 0.85 }, '-=0.65');

      gsap.to('[data-hero-bg]', {
        yPercent: 13,
        scale: 1.035,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to('[data-hero-main]', {
        y: -75,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: '20% top',
          end: '85% top',
          scrub: 1,
        },
      });

      gsap.to('[data-hero-orbit]', {
        rotate: 180,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        },
      });
    }, root);

    return () => ctx.revert();
  }, [locale, dir]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative min-h-[100svh] overflow-hidden bg-charcoal text-ivory"
    >
      <div data-hero-bg className="absolute -inset-[6%] will-change-transform">
        <Image
          src="/Hero-main.png"
          alt={locale === 'ar' ? 'مشروع ديكور داخلي من أعمال المهندس جمال الشرقاوي' : 'Interior project by Eng. Gamal Elsharkawy'}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center] sm:object-center"
        />
      </div>

      <div
        className="absolute inset-0"
        style={{
          background:
            dir === 'rtl'
              ? 'linear-gradient(270deg, rgba(20,18,16,.78) 0%, rgba(20,18,16,.48) 46%, rgba(20,18,16,.22) 76%, rgba(20,18,16,.42) 100%)'
              : 'linear-gradient(90deg, rgba(20,18,16,.76) 0%, rgba(20,18,16,.47) 46%, rgba(20,18,16,.22) 76%, rgba(20,18,16,.42) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/[0.35] via-transparent to-charcoal/[0.85]" />
      <div className="absolute inset-0 hero-noise opacity-[0.16] mix-blend-soft-light pointer-events-none" />

      <div className="absolute top-[18%] end-[6%] hidden xl:block pointer-events-none">
        <div data-hero-orbit className="relative w-40 h-40 rounded-full border border-ivory/[0.15]">
          <div className="absolute inset-3 rounded-full border border-brass/[0.35]" />
          <span className="absolute left-1/2 -top-1 w-2 h-2 -translate-x-1/2 rounded-full bg-brass" />
          <span className="absolute inset-0 flex items-center justify-center font-latin text-[10px] tracking-[0.3em] text-ivory/[0.55] text-center leading-loose">
            FORM<br />DETAIL<br />LIGHT
          </span>
        </div>
      </div>

      <div data-hero-main className="relative z-10 min-h-[100svh] flex items-center">
        <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 pt-28 pb-24 lg:pt-32">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_310px] gap-12 lg:gap-16 items-end">
            <div className="max-w-4xl">
              <div data-hero-fade className="mb-6 flex items-center gap-3 text-brass">
                <span className="w-10 lg:w-14 h-px bg-current" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.16em] uppercase">
                  {t('hero.kicker')}
                </span>
              </div>

              <h1 className="text-[clamp(3rem,7.6vw,7.7rem)] leading-[0.92] font-light tracking-[-0.045em] max-w-[1050px]">
                <span className="block overflow-hidden pb-[0.1em]">
                  <span data-hero-reveal className="block will-change-transform">{t('hero.title.1')}</span>
                </span>
                <span className="block overflow-hidden pb-[0.14em] text-brass-light">
                  <span data-hero-reveal className="block will-change-transform">{t('hero.title.2')}</span>
                </span>
              </h1>

              <p data-hero-fade className="mt-6 sm:mt-8 max-w-2xl text-sm sm:text-base lg:text-lg font-light leading-[1.95] text-ivory/[0.78]">
                {t('hero.subtitle')}
              </p>

              <div data-hero-fade className="lg:hidden mt-5 font-latin text-[10px] sm:text-xs tracking-[0.2em] uppercase text-brass-light">
                {t('hero.signature')} • {t('hero.englishEyebrow')}
              </div>

              <div data-hero-fade className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center">
                <a
                  href="#projects"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-brass px-7 text-sm font-semibold text-white transition-all duration-300 hover:bg-brass-dark hover:-translate-y-1"
                >
                  {t('hero.cta1')}
                  <Arrow size={17} className="transition-transform duration-300 group-hover:-translate-x-1 ltr:group-hover:translate-x-1" />
                </a>

                <a
                  href="https://wa.me/966530858304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-[#7ee6a8]/45 bg-[#168a53]/90 px-7 text-sm font-semibold text-white shadow-[0_12px_34px_rgba(22,138,83,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#1aa761] hover:shadow-[0_16px_42px_rgba(22,138,83,0.32)]"
                  aria-label={t('hero.whatsapp')}
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  {t('hero.whatsapp')}
                </a>

                <a
                  href="tel:+966530858304"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-ivory/45 bg-ivory/[0.12] px-7 text-sm font-semibold text-ivory shadow-[0_12px_34px_rgba(0,0,0,0.16)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-ivory hover:text-charcoal"
                  aria-label={t('hero.call')}
                >
                  <Phone size={18} aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-[-12deg]" />
                  {t('hero.call')}
                </a>
              </div>

              <div data-hero-fade className="mt-10 lg:mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[11px] sm:text-xs text-ivory/[0.58]">
                <span className="inline-flex items-center gap-2">
                  <MapPin size={14} className="text-brass" /> {t('hero.location')}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" /> {t('hero.coverage')}
                </span>
              </div>
            </div>

            <aside data-hero-side className="hidden lg:block border-s border-ivory/20 ps-7 pb-1">
              <p className="font-latin text-[10px] tracking-[0.32em] text-brass mb-4">
                {t('hero.englishEyebrow')}
              </p>
              <p className="font-latin text-2xl leading-tight text-ivory mb-4">
                {t('hero.signature')}
              </p>
              <p className="font-latin text-[10px] tracking-[0.18em] text-ivory/[0.48] mb-7">
                {t('hero.englishLine')}
              </p>
              <div className="w-8 h-px bg-brass mb-5" />
              <p className="text-xs leading-7 text-ivory/[0.58]">{t('hero.feature')}</p>
            </aside>
          </div>
        </div>
      </div>

      <a
        href="#services"
        className="absolute z-10 bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ivory/[0.55] hover:text-brass transition-colors"
      >
        <span>{t('hero.scroll')}</span>
        <span className="w-8 h-8 rounded-full border border-ivory/20 flex items-center justify-center">
          <ArrowDown size={13} className="animate-bounce" />
        </span>
      </a>
    </section>
  );
}
