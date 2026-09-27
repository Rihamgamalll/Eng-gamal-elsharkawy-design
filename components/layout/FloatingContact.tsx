'use client';

import { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
// Positioned via dir-aware utility: rtl:left-6 ltr:right-6

export function FloatingContact() {
  const { t, dir } = useLanguage();
  const [visible, setVisible] = useState(false);

  const phone = '0530858304';
  const phoneIntl = '966530858304';
  const whatsappUrl = `https://wa.me/${phoneIntl}`;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 z-40 flex flex-col gap-3 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8 pointer-events-none'
      } ${
        dir === 'rtl' ? 'left-6' : 'right-6'
      }`}
    >
      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 bg-brass text-ivory rounded-full shadow-lg hover:bg-brass-dark transition-all duration-300"
        style={{ flexDirection: 'row' }}
        aria-label={t('floating.whatsapp')}
      >
        <span className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <MessageCircle size={22} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium group-hover:max-w-[120px] group-hover:pr-5 transition-all duration-300">
          {t('floating.whatsapp')}
        </span>
      </a>

      {/* Call */}
      <a
        href={`tel:${phone}`}
        className="group flex items-center gap-2 bg-charcoal text-ivory rounded-full shadow-lg hover:bg-charcoal/80 transition-all duration-300"
        aria-label={t('floating.call')}
      >
        <span className="w-12 h-12 flex items-center justify-center flex-shrink-0">
          <Phone size={20} />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium group-hover:max-w-[100px] group-hover:pr-5 transition-all duration-300">
          {t('floating.call')}
        </span>
      </a>
    </div>
  );
}
