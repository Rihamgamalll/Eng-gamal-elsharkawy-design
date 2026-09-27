'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Expand, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';

gsap.registerPlugin(ScrollTrigger);

const compareImages = [
  { src: '/D16.jpg', width: 551, height: 1280, key: 'beforeafter.before' },
  { src: '/D17.jpg', width: 551, height: 1280, key: 'beforeafter.after' },
];

export function BeforeAfter() {
  const { t, locale } = useLanguage();
  const headerRef = useReveal<HTMLDivElement>({ stagger: 0.12, y: 36 });
  const rootRef = useRef<HTMLElement>(null);
  const [openImage, setOpenImage] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-compare-card]',
        { opacity: 0, y: 70, rotateY: -5, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.15,
          stagger: 0.16,
          ease: 'power3.out',
          scrollTrigger: { trigger: '[data-compare-grid]', start: 'top 76%' },
        }
      );
      gsap.to('[data-compare-orbit]', {
        rotate: 360,
        duration: 18,
        ease: 'none',
        repeat: -1,
      });
    }, root);

    return () => ctx.revert();
  }, [locale]);

  useEffect(() => {
    if (openImage === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenImage(null);
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') setOpenImage((current) => (current === 0 ? 1 : 0));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [openImage]);

  return (
    <section ref={rootRef} className="relative bg-charcoal py-24 lg:py-36 text-ivory overflow-hidden">
      <div className="absolute -top-52 -end-32 w-[520px] h-[520px] rounded-full bg-brass/[0.07] blur-3xl" />
      <div className="absolute -bottom-56 -start-32 w-[560px] h-[560px] rounded-full border border-brass/[0.08]" />

      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10 relative">
        <div ref={headerRef} className="grid lg:grid-cols-[.72fr_1.28fr] gap-10 lg:gap-20 items-end mb-12 lg:mb-16">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('beforeafter.eyebrow')}</span>
            </div>
            <h2 data-reveal className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.12] tracking-[-0.035em]">
              {t('beforeafter.title')}
            </h2>
          </div>
          <p data-reveal className="max-w-2xl text-sm sm:text-base leading-8 text-ivory/[0.58] lg:justify-self-end">
            {t('beforeafter.subtitle')}
          </p>
        </div>

        <div data-compare-grid className="relative mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:gap-10 items-start">
          <div data-compare-orbit className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brass/30 lg:block">
            <span className="absolute left-1/2 -top-1 h-2 w-2 -translate-x-1/2 rounded-full bg-brass" />
          </div>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-charcoal/90 px-4 py-3 text-center font-latin text-[9px] tracking-[0.18em] text-brass lg:block">
            BEFORE<br />AFTER
          </div>

          {compareImages.map((item, index) => (
            <button
              key={item.src}
              data-compare-card
              type="button"
              onClick={() => setOpenImage(index)}
              className="group relative mx-auto w-full max-w-[430px] overflow-hidden rounded-[1.2rem] border border-white/[0.12] bg-[#181715] p-2.5 sm:p-3 text-start shadow-2xl shadow-black/20 transition-all duration-500 hover:-translate-y-2 hover:border-brass/45"
              aria-label={`${t('projects.view')}: ${t(item.key)}`}
              data-cursor-grow
            >
              <span className="relative block overflow-hidden rounded-[0.85rem] bg-black">
                <Image
                  src={item.src}
                  alt={`${t(item.key)} — ${t('beforeafter.caption')}`}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 640px) 92vw, 42vw"
                  className="block h-auto w-full object-contain transition-[filter] duration-500 group-hover:brightness-[0.94]"
                />
                <span className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent pointer-events-none" />
                <span className={`absolute top-4 start-4 rounded-full px-4 py-2 text-[10px] font-semibold tracking-[0.14em] ${index === 0 ? 'border border-white/15 bg-black/45 text-white' : 'bg-brass text-white'}`}>
                  {t(item.key)}
                </span>
                <span className="absolute bottom-4 end-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ivory text-charcoal opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand size={15} />
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {openImage !== null && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center bg-[#11100f]/96 p-4 backdrop-blur-xl"
          onClick={() => setOpenImage(null)}
        >
          <button
            type="button"
            onClick={() => setOpenImage(null)}
            className="absolute end-5 top-5 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/80 transition-colors hover:border-brass hover:text-white"
            aria-label={t('projects.close')}
          >
            <X size={20} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setOpenImage(openImage === 0 ? 1 : 0);
            }}
            className="relative h-[88svh] w-[92vw] max-w-5xl"
            aria-label={t(compareImages[openImage].key)}
          >
            <Image
              src={compareImages[openImage].src}
              alt={`${t(compareImages[openImage].key)} — ${t('beforeafter.caption')}`}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-2 text-[10px] tracking-[0.16em] text-brass backdrop-blur-md">
              {t(compareImages[openImage].key)}
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
