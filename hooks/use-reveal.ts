'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    stagger?: number;
  }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const items = el.querySelectorAll('[data-reveal]');
      if (items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: options?.y ?? 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 1,
            stagger: options?.stagger ?? 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: options?.y ?? 40 },
          {
            opacity: 1,
            y: 0,
            duration: options?.duration ?? 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [options?.y, options?.duration, options?.delay, options?.stagger]);

  return ref;
}
