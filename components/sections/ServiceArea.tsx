'use client';

import { MapPin } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';

gsap.registerPlugin(ScrollTrigger);

const dots = [
  [31, 34], [45, 26], [61, 32], [70, 45], [64, 61],
  [51, 70], [39, 58], [30, 50], [75, 38], [62, 73],
];

export function ServiceArea() {
  const { t } = useLanguage();
  const headerRef = useReveal<HTMLDivElement>({ stagger: 0.1, y: 34 });
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-area-dot]',
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: { trigger: map, start: 'top 72%' },
        }
      );
      gsap.fromTo(
        '[data-area-ring]',
        { scale: 0.65, opacity: 0.55 },
        { scale: 1.8, opacity: 0, duration: 2.3, repeat: -1, ease: 'power1.out' }
      );
    }, map);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-[#e9e3d8] py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10">
        <div ref={headerRef} className="grid lg:grid-cols-[.92fr_1.08fr] gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('area.eyebrow')}</span>
            </div>
            <h2 data-reveal className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.035em] text-charcoal">
              {t('area.title')}
            </h2>
          </div>
          <p data-reveal className="lg:max-w-xl lg:justify-self-end text-sm sm:text-base leading-8 text-charcoal/[0.58]">
            {t('area.subtitle')}
          </p>
        </div>

        <div ref={mapRef} className="relative overflow-hidden rounded-[1.4rem] bg-charcoal min-h-[520px] lg:min-h-[650px] text-ivory">
          <div className="absolute inset-0 opacity-[0.18] map-grid" />
          <div className="absolute -top-44 -end-32 w-[480px] h-[480px] rounded-full bg-brass/10 blur-3xl" />
          <div className="absolute -bottom-56 -start-40 w-[520px] h-[520px] rounded-full bg-white/[0.035] blur-3xl" />

          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 500 360" className="w-[92%] h-[82%] max-w-[980px]" fill="none" aria-hidden="true">
              <path
                d="M151 48L225 36L321 43L386 68L425 111L438 174L421 229L377 278L315 316L247 325L190 312L148 279L119 233L103 177L112 117Z"
                fill="rgba(201,153,84,.08)"
                stroke="rgba(201,153,84,.65)"
                strokeWidth="1.5"
              />
              <path d="M132 123C202 101 309 103 405 127" stroke="rgba(255,255,255,.09)" />
              <path d="M123 192C219 177 313 184 420 204" stroke="rgba(255,255,255,.09)" />
              <path d="M158 262C232 244 316 247 383 270" stroke="rgba(255,255,255,.09)" />
            </svg>
          </div>

          {dots.map(([left, top], index) => (
            <span
              key={index}
              data-area-dot
              className="absolute w-2 h-2 rounded-full bg-brass shadow-[0_0_22px_rgba(201,153,84,.55)]"
              style={{ left: `${left}%`, top: `${top}%` }}
            />
          ))}

          <div className="absolute left-[31%] top-[49%] -translate-x-1/2 -translate-y-1/2">
            <span data-area-ring className="absolute inset-0 rounded-full border border-brass" />
            <span className="relative w-5 h-5 rounded-full bg-brass border-[5px] border-charcoal flex" />
          </div>

          <div className="absolute start-5 sm:start-8 bottom-5 sm:bottom-8 rounded-[1rem] border border-white/[0.12] bg-black/20 backdrop-blur-xl px-5 py-4 max-w-[260px]">
            <div className="flex items-center gap-2 text-brass mb-1.5">
              <MapPin size={15} />
              <span className="text-sm font-semibold text-ivory">{t('area.base')}</span>
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-ivory/[0.42]">{t('area.baseLabel')}</div>
          </div>

          <div className="absolute end-5 sm:end-8 top-5 sm:top-8 rounded-full border border-white/[0.12] bg-black/20 backdrop-blur-xl px-4 py-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span className="text-[10px] sm:text-xs text-ivory/[0.65]">{t('area.coverage')}</span>
          </div>

          <div className="absolute end-7 sm:end-10 bottom-7 sm:bottom-10 hidden sm:block font-latin text-[clamp(4rem,10vw,10rem)] leading-none font-light text-white/[0.035] select-none">
            KSA
          </div>
        </div>
      </div>
    </section>
  );
}
