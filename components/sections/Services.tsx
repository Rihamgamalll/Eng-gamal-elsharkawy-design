'use client';

import { ArrowUpLeft, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';
import { ProjectImage } from '@/components/shared/ProjectImage';

const services = [
  { key: 's1', image: '/D22.jpg', className: 'lg:col-span-2 lg:row-span-2 min-h-[460px] lg:min-h-[650px]' },
  { key: 's2', image: '/D4.jpg', className: 'min-h-[360px] lg:min-h-[315px]' },
  { key: 's3', image: '/D11.jpg', className: 'min-h-[360px] lg:min-h-[315px]' },
  { key: 's4', image: '/D13.jpg', className: 'min-h-[360px] lg:min-h-[315px]' },
  { key: 's5', image: '/D19.jpg', className: 'min-h-[360px] lg:min-h-[315px]' },
  { key: 's6', image: '/D26.jpg', className: 'md:col-span-2 lg:col-span-4 min-h-[380px] lg:min-h-[430px]' },
];

export function Services() {
  const { t, dir } = useLanguage();
  const headerRef = useReveal<HTMLDivElement>({ stagger: 0.1, y: 32 });
  const gridRef = useReveal<HTMLDivElement>({ stagger: 0.09, y: 55 });
  const Arrow = dir === 'rtl' ? ArrowUpLeft : ArrowUpRight;

  return (
    <section id="services" className="relative bg-ivory py-24 lg:py-36 overflow-hidden">
      <div className="absolute top-0 end-0 w-[34vw] h-[34vw] min-w-[320px] min-h-[320px] rounded-full bg-brass/[0.045] blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10 relative">
        <div ref={headerRef} className="grid lg:grid-cols-[0.9fr_1.1fr] gap-7 lg:gap-16 items-end mb-14 lg:mb-20">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('services.eyebrow')}</span>
            </div>
            <h2 data-reveal className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.12] tracking-[-0.03em] text-charcoal">
              {t('services.title')}
            </h2>
          </div>
          <div data-reveal className="lg:max-w-xl lg:justify-self-end">
            <p className="text-sm sm:text-base leading-8 text-charcoal/[0.58]">{t('services.subtitle')}</p>
            <div className="mt-7 flex items-center gap-3 text-[10px] font-latin tracking-[0.24em] uppercase text-charcoal/[0.38]">
              <span>GAMAL ELSHARKAWY</span>
              <span className="w-9 h-px bg-charcoal/20" />
              <span>01 / SERVICES</span>
            </div>
          </div>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 auto-rows-auto">
          {services.map((service, index) => (
            <article
              key={service.key}
              data-reveal
              className={`group relative overflow-hidden rounded-[1.15rem] bg-charcoal ${service.className}`}
              data-cursor-grow
            >
              <ProjectImage
                src={service.image}
                alt={t(`services.${service.key}.title`)}
                className="absolute inset-0"
                imageClassName="transition-[filter] duration-500 group-hover:brightness-[0.88]"
                overlay
                sizes={index === 0 || index === 5 ? '(max-width: 1024px) 100vw, 60vw' : '(max-width: 768px) 100vw, 25vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal/[0.88]" />
              <div className="absolute top-5 start-5 w-10 h-10 rounded-full bg-black/20 backdrop-blur-md border border-white/[0.15] flex items-center justify-center">
                <span className="font-latin text-[10px] text-white/[0.78]">0{index + 1}</span>
              </div>
              <div className="absolute end-5 top-5 w-10 h-10 rounded-full bg-ivory/90 text-charcoal flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500">
                <Arrow size={16} />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-medium text-white leading-snug">{t(`services.${service.key}.title`)}</h3>
                <div className="grid transition-all duration-500 grid-rows-[0fr] group-hover:grid-rows-[1fr]">
                  <div className="overflow-hidden">
                    <p className="pt-3 max-w-xl text-xs sm:text-sm leading-7 text-white/[0.68]">{t(`services.${service.key}.desc`)}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
