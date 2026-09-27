'use client';

import { CheckCircle2, MessageCircle, PencilRuler, Ruler, Wrench } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/lib/language-context';
import { useReveal } from '@/hooks/use-reveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { key: 's1', icon: MessageCircle },
  { key: 's2', icon: Ruler },
  { key: 's3', icon: PencilRuler },
  { key: 's4', icon: Wrench },
  { key: 's5', icon: CheckCircle2 },
];

export function Process() {
  const { t, dir } = useLanguage();
  const headerRef = useReveal<HTMLDivElement>({ stagger: 0.1, y: 34 });
  const processRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = processRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const line = root.querySelector('[data-process-line]');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: dir === 'rtl' ? 'right center' : 'left center' },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.inOut',
            scrollTrigger: { trigger: root, start: 'top 72%' },
          }
        );
      }
      gsap.fromTo(
        root.querySelectorAll('[data-process-step]'),
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: { trigger: root, start: 'top 75%' },
        }
      );
    }, root);

    return () => ctx.revert();
  }, [dir]);

  return (
    <section id="process" className="relative bg-ivory py-24 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 sm:px-7 lg:px-10">
        <div ref={headerRef} className="grid lg:grid-cols-[1fr_.9fr] gap-8 lg:gap-16 items-end mb-16 lg:mb-24">
          <div>
            <div data-reveal className="flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-brass" />
              <span className="text-[11px] font-semibold tracking-[0.22em] uppercase text-brass">{t('process.eyebrow')}</span>
            </div>
            <h2 data-reveal className="text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.1] tracking-[-0.035em] text-charcoal">
              {t('process.title')}
            </h2>
          </div>
          <div data-reveal className="lg:max-w-lg lg:justify-self-end">
            <p className="text-sm sm:text-base leading-8 text-charcoal/[0.58]">{t('process.subtitle')}</p>
            <div className="mt-6 font-latin text-[10px] tracking-[0.24em] text-charcoal/[0.35] uppercase">04 / PROCESS</div>
          </div>
        </div>

        <div ref={processRef} className="relative">
          <div className="hidden lg:block absolute top-[46px] start-[9%] end-[9%] h-px bg-charcoal/[0.12]">
            <div data-process-line className="absolute inset-0 bg-brass" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <article
                  key={step.key}
                  data-process-step
                  className="group relative rounded-[1.05rem] border border-charcoal/10 bg-white/[0.45] px-6 py-7 lg:px-5 lg:py-8 transition-all duration-500 hover:-translate-y-2 hover:border-brass/[0.45] hover:shadow-xl hover:shadow-charcoal/[0.05]"
                >
                  <div className="relative z-10 mb-7 flex items-center justify-between lg:block">
                    <div className="w-[92px] h-[92px] lg:mx-auto rounded-full border border-charcoal/[0.12] bg-ivory flex items-center justify-center transition-all duration-500 group-hover:border-brass group-hover:bg-brass group-hover:text-white text-charcoal">
                      <Icon size={27} strokeWidth={1.4} />
                    </div>
                    <span className="lg:absolute lg:-top-2 lg:end-0 font-latin text-xs tracking-[0.18em] text-brass">0{index + 1}</span>
                  </div>
                  <div className="lg:text-center">
                    <h3 className="text-lg font-semibold text-charcoal mb-3">{t(`process.${step.key}.title`)}</h3>
                    <p className="text-xs sm:text-sm leading-7 text-charcoal/[0.55]">{t(`process.${step.key}.desc`)}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
