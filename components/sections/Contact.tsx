'use client';

import Image from 'next/image';
import { ArrowUpLeft, ArrowUpRight, MapPin, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';

gsap.registerPlugin(ScrollTrigger);

const FACEBOOK_URL = 'https://www.facebook.com/share/19eSBxf8RE/?mibextid=wwXIfr';

export function Contact() {
  const { t, dir } = useLanguage();
  const rootRef = useRef<HTMLElement>(null);
  const contentRef = useReveal<HTMLDivElement>({ stagger: 0.09, y: 38 });
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-contact-bg]', {
        yPercent: 10,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={rootRef} className="relative min-h-[640px] lg:min-h-[700px] bg-charcoal text-ivory overflow-hidden flex items-center py-24 lg:py-32">
      <div data-contact-bg className="absolute -inset-[8%]">
        <Image src="/Contact-panorama.png" alt="" fill sizes="100vw" className="object-cover object-center" />
      </div>
      <div className="absolute inset-0 bg-charcoal/[0.76]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-charcoal/95 via-charcoal/58 to-brass/10" />
      <div className="absolute inset-0 hero-noise opacity-[0.12] mix-blend-soft-light" />

      <div className="mx-auto w-full max-w-[1500px] px-5 sm:px-7 lg:px-10 relative z-10">
        <div ref={contentRef} className="grid lg:grid-cols-[1.2fr_.8fr] gap-12 lg:gap-20 items-end">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('contact.eyebrow')}</span>
            </div>
            <h2 data-reveal className="max-w-5xl text-[clamp(2.8rem,6vw,6.6rem)] font-light leading-[1.02] tracking-[-0.045em]">
              {t('contact.title')}
            </h2>
            <p data-reveal className="mt-7 max-w-2xl text-sm sm:text-base lg:text-lg leading-8 text-ivory/[0.58]">
              {t('contact.subtitle')}
            </p>

            <a data-reveal href="tel:0530858304" className="group inline-block mt-9 sm:mt-12">
              <span className="font-latin text-[clamp(2.6rem,6.5vw,6.8rem)] leading-none font-light tracking-[-0.04em] text-brass transition-colors duration-300 group-hover:text-brass-light">
                0530858304
              </span>
            </a>
          </div>

          <div data-reveal className="lg:pb-2">
            <div className="rounded-[1.2rem] border border-white/[0.12] bg-black/20 backdrop-blur-xl p-5 sm:p-6">
              <a
                href="https://wa.me/966530858304"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 rounded-full bg-brass px-5 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-brass-dark hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-3"><MessageCircle size={18} /> {t('contact.whatsapp')}</span>
                <Arrow size={16} />
              </a>
              <a
                href="tel:0530858304"
                className="group mt-3 flex items-center justify-between gap-4 rounded-full border border-white/[0.15] px-5 py-4 text-sm font-semibold text-white/[0.82] transition-all duration-300 hover:bg-white hover:text-charcoal"
              >
                <span className="flex items-center gap-3"><Phone size={18} /> {t('contact.call')}</span>
                <Arrow size={16} />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 flex items-center justify-between gap-4 rounded-full border border-white/[0.15] px-5 py-4 text-sm font-semibold text-white/[0.82] transition-all duration-300 hover:border-brass hover:text-brass"
              >
                <span className="flex items-center gap-3"><span className="w-[18px] h-[18px] rounded-full border border-current flex items-center justify-center font-latin text-[11px] font-bold">f</span> {t('contact.facebook')}</span>
                <Arrow size={16} />
              </a>

              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="flex items-start gap-3 text-sm text-ivory/[0.62]">
                  <MapPin size={16} className="mt-1 shrink-0 text-brass" />
                  <div>
                    <p>{t('contact.location')}</p>
                    <p className="mt-1.5 text-xs leading-6 text-ivory/[0.38]">{t('contact.serviceNote')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
