'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';

gsap.registerPlugin(ScrollTrigger);

type ProjectGroup = {
  key: string;
  images: string[];
  featuredPair?: [string, string];
};

type ImageMeta = { width: number; height: number };

const imageMeta: Record<string, ImageMeta> = {
  '/D1.jpg': { width: 1223, height: 1086 },
  '/D2.jpg': { width: 1280, height: 960 },
  '/D3.jpg': { width: 963, height: 1280 },
  '/D4.jpg': { width: 960, height: 1280 },
  '/D5.jpg': { width: 960, height: 1280 },
  '/D6.jpg': { width: 960, height: 1280 },
  '/D7.jpg': { width: 1280, height: 1169 },
  '/D8.jpg': { width: 589, height: 1280 },
  '/D9.jpg': { width: 960, height: 1280 },
  '/D10.jpg': { width: 1280, height: 966 },
  '/D11.jpg': { width: 1280, height: 1169 },
  '/D12.jpg': { width: 960, height: 1280 },
  '/D13.jpg': { width: 960, height: 1280 },
  '/D14.jpg': { width: 960, height: 1280 },
  '/D15.jpg': { width: 962, height: 1280 },
  '/D18.jpg': { width: 961, height: 1280 },
  '/D19.jpg': { width: 962, height: 1280 },
  '/D20.jpg': { width: 961, height: 1280 },
  '/D21.jpg': { width: 1280, height: 1169 },
  '/D22.jpg': { width: 1280, height: 1169 },
  '/D23.jpg': { width: 1280, height: 962 },
  '/D25.jpg': { width: 1280, height: 1169 },
  '/D26.jpg': { width: 1166, height: 853 },
  '/D27.jpg': { width: 1280, height: 853 },
  '/D28.jpg': { width: 1280, height: 960 },
  '/D29.jpg': { width: 960, height: 1280 },
  '/D30.jpg': { width: 960, height: 1280 },
};

const groups: ProjectGroup[] = [
  {
    key: 'group1',
    images: ['/D22.jpg', '/D1.jpg', '/D2.jpg', '/D3.jpg', '/D5.jpg', '/D15.jpg', '/D21.jpg'],
  },
  {
    key: 'group2',
    featuredPair: ['/D7.jpg', '/D8.jpg'],
    images: ['/D7.jpg', '/D8.jpg', '/D11.jpg', '/D14.jpg', '/D23.jpg'],
  },
  {
    key: 'group3',
    featuredPair: ['/D12.jpg', '/D13.jpg'],
    images: ['/D12.jpg', '/D13.jpg', '/D18.jpg', '/D20.jpg', '/D4.jpg', '/D6.jpg', '/D9.jpg', '/D10.jpg', '/D19.jpg'],
  },
  {
    key: 'group4',
    images: ['/D26.jpg', '/D25.jpg', '/D27.jpg', '/D28.jpg', '/D29.jpg', '/D30.jpg'],
  },
];

export function ProjectGallery() {
  const { t, locale, dir } = useLanguage();
  const PrevIcon = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextIcon = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const headerRef = useReveal<HTMLDivElement>({ stagger: 0.11, y: 38 });
  const rootRef = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const flatImages = useMemo(
    () => groups.flatMap((group) => group.images.map((src) => ({ src, groupKey: group.key }))),
    []
  );

  const findFlatIndex = useCallback(
    (src: string) => flatImages.findIndex((item) => item.src === src),
    [flatImages]
  );

  const close = useCallback(() => setLightbox(null), []);
  const next = useCallback(
    () => setLightbox((current) => (current === null ? null : (current + 1) % flatImages.length)),
    [flatImages.length]
  );
  const prev = useCallback(
    () => setLightbox((current) => (current === null ? null : (current - 1 + flatImages.length) % flatImages.length)),
    [flatImages.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowRight') (dir === 'rtl' ? prev : next)();
      if (event.key === 'ArrowLeft') (dir === 'rtl' ? next : prev)();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, close, next, prev, dir]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-project-group]');
      sections.forEach((section) => {
        const title = section.querySelector('[data-project-group-title]');
        const cards = section.querySelectorAll('[data-project-card]');

        gsap.fromTo(
          title,
          { opacity: 0, x: locale === 'ar' ? 34 : -34 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 82%' },
          }
        );

        gsap.fromTo(
          cards,
          { opacity: 0, y: 48, rotate: -0.5 },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 0.95,
            stagger: 0.065,
            ease: 'power3.out',
            scrollTrigger: { trigger: section, start: 'top 76%' },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, [locale]);

  return (
    <section id="projects" ref={rootRef} className="relative bg-[#e9e3d8] py-24 lg:py-36 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-charcoal/10" />
      <div className="absolute top-[8%] -end-40 h-96 w-96 rounded-full bg-brass/[0.08] blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10 relative">
        <div ref={headerRef} className="grid lg:grid-cols-[1.05fr_.95fr] gap-8 lg:gap-16 items-end mb-14 lg:mb-20">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('projects.eyebrow')}</span>
            </div>
            <h2 data-reveal className="text-4xl sm:text-5xl lg:text-7xl font-light leading-[1.06] tracking-[-0.04em] text-charcoal">
              {t('projects.title')}
            </h2>
          </div>
          <div data-reveal className="lg:max-w-xl lg:justify-self-end">
            <p className="text-sm sm:text-base lg:text-lg leading-8 text-charcoal/[0.64]">{t('projects.subtitle')}</p>
          </div>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {groups.map((group, groupIndex) => {
            const pair = group.featuredPair;
            const remaining = pair
              ? group.images.filter((src) => !pair.includes(src as (typeof pair)[number]))
              : group.images;

            return (
              <article key={group.key} data-project-group>
                <div data-project-group-title className="mb-7 lg:mb-9 flex items-end justify-between gap-5 border-b border-charcoal/[0.12] pb-5">
                  <div className="flex items-end gap-4 sm:gap-5">
                    <span className="font-latin text-[10px] tracking-[0.25em] text-brass pb-1">0{groupIndex + 1}</span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light text-charcoal">{t(`projects.${group.key}`)}</h3>
                  </div>
                  <div className="hidden md:block text-[11px] text-charcoal/35">
                    {String(group.images.length).padStart(2, '0')} {t('projects.detail')}
                  </div>
                </div>

                {pair && (
                  <div className="grid sm:grid-cols-2 gap-4 lg:gap-5 items-start mb-4 lg:mb-5">
                    {pair.map((src, index) => (
                      <GalleryCard
                        key={src}
                        src={src}
                        alt={`${t(`projects.${group.key}`)} ${index + 1}`}
                        onClick={() => setLightbox(findFlatIndex(src))}
                        viewLabel={t('projects.view')}
                        featured
                      />
                    ))}
                  </div>
                )}

                <div className="columns-1 sm:columns-2 lg:columns-3 [column-gap:1rem] lg:[column-gap:1.25rem]">
                  {remaining.map((src, index) => (
                    <div key={src} className="mb-4 lg:mb-5 break-inside-avoid">
                      <GalleryCard
                        src={src}
                        alt={`${t(`projects.${group.key}`)} ${index + 1 + (pair ? 2 : 0)}`}
                        onClick={() => setLightbox(findFlatIndex(src))}
                        viewLabel={t('projects.view')}
                      />
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[140] bg-[#121110]/96 backdrop-blur-xl p-3 sm:p-6 lg:p-10 flex items-center justify-center"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute z-20 top-5 end-5 w-11 h-11 rounded-full border border-white/20 bg-black/20 text-white/75 hover:text-white hover:border-brass transition-colors flex items-center justify-center"
            aria-label={t('projects.close')}
          >
            <X size={20} />
          </button>

          <button
            onClick={(event) => { event.stopPropagation(); prev(); }}
            className="absolute z-20 start-3 sm:start-6 lg:start-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/25 border border-white/[0.15] text-white/80 hover:bg-brass hover:border-brass transition-all flex items-center justify-center"
            aria-label={t('projects.prev')}
          >
            <PrevIcon size={22} />
          </button>

          <div className="relative w-[calc(100%-5rem)] sm:w-[calc(100%-7rem)] max-w-6xl h-[82svh]" onClick={(event) => event.stopPropagation()}>
            <Image
              src={flatImages[lightbox].src}
              alt={t(`projects.${flatImages[lightbox].groupKey}`)}
              fill
              sizes="95vw"
              className="object-contain"
              priority
            />
            <div className="absolute bottom-2 start-1/2 -translate-x-1/2 rounded-full border border-white/15 bg-black/35 backdrop-blur-md px-4 py-2 text-[10px] tracking-[0.18em] text-white/60 font-latin">
              {String(lightbox + 1).padStart(2, '0')} / {String(flatImages.length).padStart(2, '0')}
            </div>
          </div>

          <button
            onClick={(event) => { event.stopPropagation(); next(); }}
            className="absolute z-20 end-3 sm:end-6 lg:end-10 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/25 border border-white/[0.15] text-white/80 hover:bg-brass hover:border-brass transition-all flex items-center justify-center"
            aria-label={t('projects.next')}
          >
            <NextIcon size={22} />
          </button>
        </div>
      )}
    </section>
  );
}

function GalleryCard({
  src,
  alt,
  onClick,
  viewLabel,
  featured = false,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  viewLabel: string;
  featured?: boolean;
}) {
  const meta = imageMeta[src] ?? { width: 1200, height: 900 };

  return (
    <button
      data-project-card
      type="button"
      onClick={onClick}
      className={`group relative block w-full overflow-hidden rounded-[1rem] border border-charcoal/[0.08] bg-[#f4efe7] p-2 sm:p-2.5 text-start shadow-[0_16px_45px_rgba(31,27,23,.07)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_70px_rgba(31,27,23,.14)] ${featured ? 'sm:p-3' : ''}`}
      aria-label={`${viewLabel}: ${alt}`}
      data-cursor-grow
    >
      <span className="relative block overflow-hidden rounded-[0.7rem] bg-[#1b1916]">
        <Image
          src={src}
          alt={alt}
          width={meta.width}
          height={meta.height}
          sizes={featured ? '(max-width: 640px) 100vw, 50vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
          className="block h-auto w-full object-contain transition-[filter] duration-500 group-hover:brightness-[0.96]"
        />
        <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
        <span className="absolute bottom-3 end-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-ivory/95 text-charcoal opacity-0 shadow-lg transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
          <Expand size={15} />
        </span>
      </span>
    </button>
  );
}
