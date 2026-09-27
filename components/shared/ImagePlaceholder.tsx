'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';

gsap.registerPlugin(ScrollTrigger);

interface ImagePlaceholderProps {
  label?: string;
  aspect?: string;
  className?: string;
  labelId?: string;
  labelParams?: Record<string, string | number>;
  rounded?: boolean;
  reveal?: boolean;
  parallax?: boolean;
}

export function ImagePlaceholder({
  label,
  aspect = 'aspect-[4/3]',
  className = '',
  labelId,
  rounded = true,
  reveal = true,
  parallax = false,
}: ImagePlaceholderProps) {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const displayLabel = label ?? t('common.imagePlaceholder');

  useEffect(() => {
    if (!reveal) return;
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      if (parallax && innerRef.current) {
        gsap.fromTo(
          innerRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.98 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [reveal, parallax]);

  return (
    <div
      ref={ref}
      className={`relative w-full ${aspect} overflow-hidden bg-stone/20 ${rounded ? 'rounded-sm' : ''} ${className}`}
    >
      <div
        ref={innerRef}
        className="absolute inset-0 placeholder-pattern bg-gradient-to-br from-stone/10 via-sand/20 to-stone/15"
        style={{ willChange: 'transform' }}
      />
      {/* Architectural frame elements */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        {/* Icon: picture frame outline */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          className="opacity-30"
          style={{ color: 'hsl(var(--charcoal))' }}
        >
          <rect
            x="6"
            y="8"
            width="36"
            height="32"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M6 30L16 22L24 28L34 18L42 26"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <circle cx="18" cy="16" r="2" fill="currentColor" />
        </svg>
        <span className="text-xs font-light tracking-wide text-charcoal/40 text-center px-4">
          {displayLabel}
        </span>
      </div>
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-brass/30" />
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-brass/30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-brass/30" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-brass/30" />
    </div>
  );
}
