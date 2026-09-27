'use client';

import { Check, Quote } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';
import { ProjectImage } from '@/components/shared/ProjectImage';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { t } = useLanguage();
  const contentRef = useReveal<HTMLDivElement>({ stagger: 0.1, y: 36 });
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = imageRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to('[data-about-main]', {
        yPercent: -7,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
      gsap.to('[data-about-small]', {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const points = [1, 2, 3, 4];

  return (
    <section id="about" className="relative bg-ivory py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10">
        <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-14 lg:gap-24 items-center">
          <div ref={imageRef} className="relative min-h-[580px] sm:min-h-[720px] lg:min-h-[780px] order-2 lg:order-1">
            <div data-about-main className="absolute start-0 top-10 w-[78%] h-[76%] rounded-[1.2rem] overflow-hidden shadow-2xl shadow-charcoal/10">
              <ProjectImage
                src="/D19.jpg"
                alt={t('about.title')}
                className="absolute inset-0"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>
            <div data-about-small className="absolute end-0 bottom-3 w-[48%] h-[47%] rounded-[1rem] overflow-hidden border-[8px] border-ivory shadow-2xl shadow-charcoal/10">
              <ProjectImage
                src="/D30.jpg"
                alt={t('projects.group4')}
                className="absolute inset-0"
                sizes="(max-width: 1024px) 50vw, 24vw"
              />
            </div>
            <div className="absolute start-[65%] top-0 hidden sm:block font-latin text-[10px] tracking-[0.3em] text-charcoal/[0.35] [writing-mode:vertical-rl] rotate-180">
              ENG. GAMAL ELSHARKAWY • MADINAH
            </div>
          </div>

          <div ref={contentRef} className="order-1 lg:order-2">
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('about.eyebrow')}</span>
            </div>
            <h2 data-reveal className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.035em] text-charcoal mb-8">
              {t('about.title')}
            </h2>
            <p data-reveal className="text-sm sm:text-base leading-8 text-charcoal/[0.62] mb-5">{t('about.p1')}</p>
            <p data-reveal className="text-sm sm:text-base leading-8 text-charcoal/[0.62] mb-9">{t('about.p2')}</p>

            <div data-reveal className="grid sm:grid-cols-2 gap-x-7 gap-y-4 mb-10">
              {points.map((point) => (
                <div key={point} className="flex items-start gap-3 border-t border-charcoal/10 pt-4">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-brass/[0.12] text-brass flex items-center justify-center shrink-0">
                    <Check size={13} />
                  </span>
                  <span className="text-sm leading-6 text-charcoal/70">{t(`about.points.${point}`)}</span>
                </div>
              ))}
            </div>

            <blockquote data-reveal className="relative rounded-[1rem] bg-charcoal text-ivory px-7 py-7 sm:px-9 sm:py-8 overflow-hidden">
              <Quote className="absolute -top-2 -end-1 w-24 h-24 text-brass/10" strokeWidth={1} />
              <p className="relative text-lg sm:text-xl leading-9 font-light">“{t('about.quote')}”</p>
              <div className="relative mt-5 flex items-center gap-3">
                <span className="w-8 h-px bg-brass" />
                <span className="font-latin text-[10px] tracking-[0.2em] text-brass">ENG. GAMAL ELSHARKAWY</span>
              </div>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
