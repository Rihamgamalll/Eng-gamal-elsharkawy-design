'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: boolean;
}

export function ProjectImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  overlay = false,
}: ProjectImageProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const onEnter = () => {
    const image = wrapRef.current?.querySelector('img');
    if (!image) return;
    gsap.to(image, { scale: 1.055, duration: 0.8, ease: 'power3.out' });
  };

  const onLeave = () => {
    const image = wrapRef.current?.querySelector('img');
    if (!image) return;
    gsap.to(image, { scale: 1, duration: 0.9, ease: 'power3.out' });
  };

  return (
    <div
      ref={wrapRef}
      className={`overflow-hidden ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover will-change-transform ${imageClassName}`}
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/5 to-transparent" />}
    </div>
  );
}
