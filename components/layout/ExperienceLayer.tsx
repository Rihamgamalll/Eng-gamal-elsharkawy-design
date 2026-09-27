'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceLayer() {
  const { t } = useLanguage();
  const progressRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const cleanupFns: Array<() => void> = [];

    if (progressRef.current) {
      gsap.set(progressRef.current, { transformOrigin: 'left center', scaleX: 0 });
      const progressTween = gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.2,
        },
      });
      cleanupFns.push(() => progressTween.kill());
    }

    if (!reduced && introRef.current) {
      const intro = introRef.current;
      const introTimeline = gsap.timeline({ defaults: { ease: 'power4.out' } });
      introTimeline
        .fromTo(
          intro.querySelector('[data-intro-mark]'),
          { opacity: 0, scale: 0.8, rotate: -8 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.55 }
        )
        .fromTo(
          intro.querySelector('[data-intro-name]'),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.45 },
          '-=0.25'
        )
        .to(intro, {
          yPercent: -100,
          duration: 0.75,
          delay: 0.2,
          ease: 'power4.inOut',
          onComplete: () => {
            intro.style.display = 'none';
          },
        });
      cleanupFns.push(() => introTimeline.kill());
    } else if (introRef.current) {
      introRef.current.style.display = 'none';
    }

    let removeCursorListeners: (() => void) | undefined;

    if (finePointer && !reduced && cursorRef.current) {
      const cursor = cursorRef.current;
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });

      const onMove = (event: MouseEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
      };
      const onOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest('a, button, [data-cursor-grow]')) {
          gsap.to(cursor, { scale: 1.8, opacity: 0.45, duration: 0.25 });
        }
      };
      const onOut = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (target.closest('a, button, [data-cursor-grow]')) {
          gsap.to(cursor, { scale: 1, opacity: 0.8, duration: 0.25 });
        }
      };

      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseover', onOver);
      document.addEventListener('mouseout', onOut);

      removeCursorListeners = () => {
        window.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseover', onOver);
        document.removeEventListener('mouseout', onOut);
      };
    }

    return () => {
      removeCursorListeners?.();
      cleanupFns.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[120] h-[2px] bg-transparent pointer-events-none">
        <div ref={progressRef} className="h-full w-full bg-brass" />
      </div>

      <div
        ref={cursorRef}
        aria-hidden="true"
        className="custom-cursor fixed left-0 top-0 z-[110] hidden lg:block w-6 h-6 -ml-3 -mt-3 rounded-full border border-brass bg-brass/10 pointer-events-none opacity-80"
      />

      <div
        ref={introRef}
        aria-hidden="true"
        className="fixed inset-0 z-[130] bg-charcoal flex items-center justify-center overflow-hidden"
      >
        <div className="text-center px-6">
          <div
            data-intro-mark
            className="mx-auto mb-5 w-16 h-16 rounded-full border border-brass/60 flex items-center justify-center text-brass font-latin text-2xl"
          >
            G
          </div>
          <p data-intro-name className="text-ivory text-lg sm:text-xl font-medium tracking-wide">
            {t('brand.name')}
          </p>
        </div>
      </div>
    </>
  );
}
