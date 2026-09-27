'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLanguage } from '@/lib/language-context';

export function BrandTicker() {
  const { t, dir } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const items = ['ticker.1', 'ticker.2', 'ticker.3', 'ticker.4', 'ticker.5'];
  const repeated = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const distance = track.scrollWidth / 3;
    const tween = gsap.fromTo(
      track,
      { x: dir === 'rtl' ? 0 : -distance },
      {
        x: dir === 'rtl' ? -distance : 0,
        duration: 24,
        repeat: -1,
        ease: 'none',
      }
    );

    return () => {
      tween.kill();
    };
  }, [dir]);

  return (
    <div className="bg-charcoal border-y border-ivory/10 overflow-hidden py-4 sm:py-5">
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {repeated.map((key, index) => (
          <div key={`${key}-${index}`} className="flex items-center shrink-0">
            <span className="mx-7 sm:mx-10 text-[10px] sm:text-xs font-semibold tracking-[0.16em] uppercase text-ivory/[0.62] whitespace-nowrap">
              {t(key)}
            </span>
            <span className="w-1.5 h-1.5 rotate-45 border border-brass" />
          </div>
        ))}
      </div>
    </div>
  );
}
