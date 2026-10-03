'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type Locale = 'ar' | 'en';
type Dict = Record<string, string>;

const ar: Dict = {
  'brand.name': 'أبو محمد',
  'brand.short': 'أبو محمد',
  'brand.trade': 'ديكور • جبس • تشطيبات',
  'brand.city': 'المدينة المنورة',

  'nav.home': 'الرئيسية',
  'nav.services': 'الخدمات',
  'nav.projects': 'الأعمال',
  'nav.about': 'عن المهندس',
  'nav.process': 'خطوات العمل',
  'nav.contact': 'تواصل معنا',
  'nav.contactBtn': 'ابدأ مشروعك',

  'hero.kicker': 'تصميم وتنفيذ الديكورات الداخلية',
  'hero.title.1': 'نصنع المساحة',
  'hero.title.2': 'التي تستحق أن تُرى.',
  'hero.subtitle':
    'تنفيذ احترافي لأعمال الجبس والديكور والتشطيبات، بتفاصيل مدروسة تجمع بين جمال التصميم ودقة التنفيذ لتمنح كل مساحة شخصية خاصة بها.',
  'hero.cta1': 'شاهد أعمالنا',
  'hero.cta2': 'تواصل مباشرة',
  'hero.whatsapp': 'واتساب',
  'hero.call': 'اتصل الآن',
  'hero.location': 'المدينة المنورة — المملكة العربية السعودية',
  'hero.coverage': 'خدمة متاحة لمختلف مناطق المملكة',
  'hero.scroll': 'مرّر لاكتشاف التفاصيل',
  'hero.englishEyebrow': 'ENGINEERED INTERIORS',
  'hero.englishLine': 'GYPSUM • DECOR • FINISHING',
  'hero.signature': 'Abu Mohamed',
  'hero.feature': 'تفاصيل محسوبة. تنفيذ نظيف. نتيجة تليق بالمكان.',

  'ticker.1': 'أسقف جبسية',
  'ticker.2': 'إضاءة مخفية',
  'ticker.3': 'ديكورات جدارية',
  'ticker.4': 'تشطيبات داخلية',
  'ticker.5': 'تصميم وتنفيذ',

  'services.eyebrow': 'الخدمات',
  'services.title': 'حلول متكاملة من الفكرة حتى اللمسة الأخيرة',
  'services.subtitle':
    'نختار التكوينات والخامات والإضاءة بما يناسب طبيعة المكان، ثم ننفذها بعناية للوصول إلى نتيجة متوازنة ومتماسكة.',
  'services.s1.title': 'أسقف جبسية وإضاءة مخفية',
  'services.s1.desc':
    'تكوينات سقفية حديثة وكلاسيكية، مستويات متعددة وخطوط إضاءة مدروسة تضيف عمقًا وأناقة للمساحة.',
  'services.s2.title': 'ديكورات الجدران',
  'services.s2.desc':
    'بانوهات وزخارف وتفاصيل جدارية تضبط نسب المكان وتمنحه حضورًا معماريًا واضحًا.',
  'services.s3.title': 'جدران الشاشة',
  'services.s3.desc':
    'تصميمات متكاملة تجمع بين الكسوات والجبس والإضاءة والتخزين بما يخدم الشكل والاستخدام.',
  'services.s4.title': 'التشطيبات الداخلية',
  'services.s4.desc':
    'تنسيق وتنفيذ التشطيبات واللمسات النهائية بصورة دقيقة ونظيفة من أول تفصيلة حتى التسليم.',
  'services.s5.title': 'الديكورات الكلاسيكية',
  'services.s5.desc':
    'كرانيش وأعمدة وزخارف كلاسيكية بنسب متوازنة تمنح الفراغ فخامة من دون مبالغة.',
  'services.s6.title': 'التصميمات التجارية',
  'services.s6.desc':
    'حلول بصرية للممرات والمحلات والمساحات التجارية تعتمد على هوية قوية وتكرار منظم للعناصر.',

  'projects.eyebrow': 'مختارات من الأعمال',
  'projects.title': 'كل مشروع له إيقاعه الخاص',
  'projects.subtitle':
    'هذه نماذج مختارة فقط من أعمال أبو محمد. أخبرنا بما تتخيله لمساحتك، وننفّذه بما يناسب المكان وذوقك.',
  'projects.view': 'عرض الصورة',
  'projects.close': 'إغلاق',
  'projects.prev': 'السابق',
  'projects.next': 'التالي',
  'projects.group1': 'مجلس عصري — أسقف وإضاءة',
  'projects.group2': 'كسوات خشبية وجدار شاشة',
  'projects.group3': 'تفاصيل جدارية وكسوات',
  'projects.group4': 'ممر تجاري بهوية لونية',
  'projects.group5': 'أسقف هندسية معاصرة',
  'projects.group6': 'طابع كلاسيكي وزخارف',
  'projects.detail': 'لقطات من المشروع',

  'beforeafter.eyebrow': 'قبل وبعد',
  'beforeafter.title': 'من التنفيذ الأولي إلى التشطيب النهائي',
  'beforeafter.subtitle':
    'صورتان لنفس العنصر قبل التشطيب وبعده، مع إظهار الصورتين كاملتين من دون قص.',
  'beforeafter.before': 'قبل',
  'beforeafter.after': 'بعد',
  'beforeafter.caption': 'معالجة زخرفية وتشطيب نهائي للتفاصيل الجدارية',

  'about.eyebrow': 'عن المهندس',
  'about.title': 'أبو محمد — جودة تُرى في التفاصيل',
  'about.p1':
    'العمل الجيد لا يعتمد على كثرة الزخارف، بل على اختيار التفصيلة المناسبة للمكان وتنفيذها بإتقان. لهذا يبدأ كل مشروع بفهم المساحة واحتياج العميل قبل التنفيذ.',
  'about.p2':
    'من الأسقف والحوائط إلى الإضاءة واللمسات النهائية، الهدف واحد: نتيجة مرتبة، متناسقة وقابلة للعيش، مع متابعة دقيقة لكل مرحلة من مراحل العمل.',
  'about.points.1': 'تصميمات تناسب طبيعة كل مساحة',
  'about.points.2': 'تنفيذ دقيق واهتمام بالتشطيب',
  'about.points.3': 'تنسيق الجبس والإضاءة والكسوات',
  'about.points.4': 'متابعة من المعاينة حتى التسليم',
  'about.quote': 'التفاصيل ليست إضافة إلى التصميم؛ التفاصيل هي التصميم.',

  'area.eyebrow': 'نطاق الخدمة',
  'area.title': 'من المدينة المنورة إلى مختلف مناطق المملكة',
  'area.subtitle':
    'يمكن مناقشة المشروع وتحديد متطلباته ثم ترتيب المعاينة والتنفيذ بحسب الموقع وطبيعة العمل.',
  'area.base': 'المدينة المنورة',
  'area.baseLabel': 'مقر العمل',
  'area.coverage': 'خدمة لمختلف مناطق المملكة',

  'process.eyebrow': 'خطوات العمل',
  'process.title': 'رحلة واضحة من أول اتصال حتى التسليم',
  'process.subtitle': 'خطوات بسيطة تحافظ على وضوح الفكرة وجودة التنفيذ.',
  'process.s1.title': 'التواصل',
  'process.s1.desc': 'نستمع إلى فكرتك ونحدد نوع العمل والمساحة والاحتياج الأساسي.',
  'process.s2.title': 'المعاينة',
  'process.s2.desc': 'مراجعة الموقع والمقاسات والعناصر المؤثرة في التصميم والتنفيذ.',
  'process.s3.title': 'التصور',
  'process.s3.desc': 'اقتراح الاتجاه الأنسب وتحديد التكوينات والخامات والتفاصيل الرئيسية.',
  'process.s4.title': 'التنفيذ',
  'process.s4.desc': 'تنفيذ منظم مع متابعة التفاصيل وجودة التشطيب في كل مرحلة.',
  'process.s5.title': 'التسليم',
  'process.s5.desc': 'مراجعة اللمسات النهائية وتسليم المساحة بصورة متكاملة ونظيفة.',

  'contact.eyebrow': 'لنتحدث عن مشروعك',
  'contact.title': 'عندك مساحة وتريد أن ترى أفضل ما يمكن أن تصبح عليه؟',
  'contact.subtitle':
    'تواصل مباشرة مع أبو محمد لمناقشة الفكرة، المعاينة وخطوات التنفيذ.',
  'contact.phone': '0530858304',
  'contact.call': 'اتصل الآن',
  'contact.whatsapp': 'واتساب',
  'contact.facebook': 'فيسبوك',
  'contact.location': 'المدينة المنورة، المملكة العربية السعودية',
  'contact.serviceNote': 'خدمة متاحة لمختلف مناطق المملكة بحسب طبيعة المشروع.',

  'floating.call': 'اتصال',
  'floating.whatsapp': 'واتساب',

  'footer.about':
    'أعمال ديكور وجبس وتشطيبات داخلية بإشراف أبو محمد، مع عناية خاصة بالتكوين والإضاءة وجودة التنفيذ.',
  'footer.nav': 'روابط سريعة',
  'footer.contact': 'تواصل',
  'footer.social': 'تابع الأعمال',
  'footer.location': 'المدينة المنورة، المملكة العربية السعودية',
  'footer.rights': 'جميع الحقوق محفوظة',
  'footer.facebook': 'صفحة فيسبوك',

  'lang.switch': 'English',
  'common.imagePlaceholder': 'صورة من الأعمال',
};

const en: Dict = {
  'brand.name': 'Abu Mohamed',
  'brand.short': 'Abu Mohamed',
  'brand.trade': 'Decor • Gypsum • Finishing',
  'brand.city': 'Madinah',

  'nav.home': 'Home',
  'nav.services': 'Services',
  'nav.projects': 'Projects',
  'nav.about': 'About',
  'nav.process': 'Process',
  'nav.contact': 'Contact',
  'nav.contactBtn': 'Start a Project',

  'hero.kicker': 'Interior Design & Execution',
  'hero.title.1': 'Spaces made',
  'hero.title.2': 'to be remembered.',
  'hero.subtitle':
    'Professional gypsum, interior decoration, and finishing work shaped around thoughtful details, precise execution, and a strong architectural sense.',
  'hero.cta1': 'Explore Projects',
  'hero.cta2': 'Contact Directly',
  'hero.whatsapp': 'WhatsApp',
  'hero.call': 'Call Now',
  'hero.location': 'Madinah — Saudi Arabia',
  'hero.coverage': 'Available for projects across the Kingdom',
  'hero.scroll': 'Scroll to discover',
  'hero.englishEyebrow': 'ENGINEERED INTERIORS',
  'hero.englishLine': 'GYPSUM • DECOR • FINISHING',
  'hero.signature': 'Abu Mohamed',
  'hero.feature': 'Considered details. Clean execution. A finished space that feels complete.',

  'ticker.1': 'Gypsum Ceilings',
  'ticker.2': 'Concealed Lighting',
  'ticker.3': 'Wall Features',
  'ticker.4': 'Interior Finishing',
  'ticker.5': 'Design & Execution',

  'services.eyebrow': 'Services',
  'services.title': 'A complete approach from concept to final detail',
  'services.subtitle':
    'Materials, lighting, proportions, and details are selected around the space itself, then executed with care for a cohesive result.',
  'services.s1.title': 'Gypsum Ceilings & Lighting',
  'services.s1.desc':
    'Contemporary and classic ceiling compositions with layered forms and concealed lighting for depth and atmosphere.',
  'services.s2.title': 'Wall Decoration',
  'services.s2.desc':
    'Wall panels, mouldings, and decorative details that give the room stronger architectural proportions.',
  'services.s3.title': 'Screen Feature Walls',
  'services.s3.desc':
    'Integrated designs combining wall cladding, gypsum, lighting, and practical use in one composition.',
  'services.s4.title': 'Interior Finishing',
  'services.s4.desc':
    'Careful finishing and final detailing, coordinated from the first construction detail through handover.',
  'services.s5.title': 'Classic Detailing',
  'services.s5.desc':
    'Cornices, columns, and ornamental work balanced to create character without visual excess.',
  'services.s6.title': 'Commercial Interiors',
  'services.s6.desc':
    'Visual systems for corridors, shops, and commercial spaces with a clear identity and controlled repetition.',

  'projects.eyebrow': 'Selected Work',
  'projects.title': 'Every project has its own rhythm',
  'projects.subtitle':
    'A selected glimpse of Abu Mohamed’s work. Share what you imagine for your space, and we can execute it to suit the place and your taste.',
  'projects.view': 'View image',
  'projects.close': 'Close',
  'projects.prev': 'Previous',
  'projects.next': 'Next',
  'projects.group1': 'Contemporary Majlis — Ceilings & Lighting',
  'projects.group2': 'Timber Cladding & Screen Wall',
  'projects.group3': 'Wall Details & Cladding',
  'projects.group4': 'Commercial Corridor Identity',
  'projects.group5': 'Contemporary Geometric Ceilings',
  'projects.group6': 'Classic Details & Ornament',
  'projects.detail': 'Project views',

  'beforeafter.eyebrow': 'Before & After',
  'beforeafter.title': 'From the initial stage to the final finish',
  'beforeafter.subtitle':
    'The same feature before and after the final finish, shown in full without cropping.',
  'beforeafter.before': 'Before',
  'beforeafter.after': 'After',
  'beforeafter.caption': 'Decorative feature treatment and final wall finish',

  'about.eyebrow': 'About',
  'about.title': 'Abu Mohamed — quality you can see in the details',
  'about.p1':
    'Good interior work is not about adding more decoration. It starts with selecting the right detail for the room and executing it accurately after understanding the space and the client’s needs.',
  'about.p2':
    'From ceilings and wall features to lighting and final finishing, the goal is one coherent result: balanced, practical, and carefully executed from site visit to handover.',
  'about.points.1': 'Designs shaped around each space',
  'about.points.2': 'Precise execution and clean finishing',
  'about.points.3': 'Coordinated gypsum, lighting, and cladding',
  'about.points.4': 'Follow-up from site visit to handover',
  'about.quote': 'Details are not added to the design; details are the design.',

  'area.eyebrow': 'Service Area',
  'area.title': 'From Madinah to projects across the Kingdom',
  'area.subtitle':
    'Project requirements can be discussed first, followed by site visit and execution planning according to location and scope.',
  'area.base': 'Madinah',
  'area.baseLabel': 'Base of operations',
  'area.coverage': 'Projects across the Kingdom',

  'process.eyebrow': 'Process',
  'process.title': 'A clear journey from first call to handover',
  'process.subtitle': 'Simple stages that keep the concept clear and the execution controlled.',
  'process.s1.title': 'Contact',
  'process.s1.desc': 'We discuss the idea, scope, space, and your primary requirements.',
  'process.s2.title': 'Site Visit',
  'process.s2.desc': 'We review measurements, site conditions, and elements that affect the work.',
  'process.s3.title': 'Direction',
  'process.s3.desc': 'The suitable design direction, materials, and key details are proposed.',
  'process.s4.title': 'Execution',
  'process.s4.desc': 'The work is carried out with organized follow-up and attention to finish quality.',
  'process.s5.title': 'Handover',
  'process.s5.desc': 'Final details are reviewed before the space is handed over clean and complete.',

  'contact.eyebrow': 'Let’s discuss your project',
  'contact.title': 'Have a space and want to see what it could become?',
  'contact.subtitle':
    'Contact Abu Mohamed directly to discuss the idea, site visit, and execution steps.',
  'contact.phone': '0530858304',
  'contact.call': 'Call Now',
  'contact.whatsapp': 'WhatsApp',
  'contact.facebook': 'Facebook',
  'contact.location': 'Madinah, Saudi Arabia',
  'contact.serviceNote': 'Service availability across the Kingdom depends on project scope and location.',

  'floating.call': 'Call',
  'floating.whatsapp': 'WhatsApp',

  'footer.about':
    'Interior decoration, gypsum, and finishing work supervised by Abu Mohamed, with special focus on composition, lighting, and execution quality.',
  'footer.nav': 'Quick Links',
  'footer.contact': 'Contact',
  'footer.social': 'Follow the Work',
  'footer.location': 'Madinah, Saudi Arabia',
  'footer.rights': 'All rights reserved',
  'footer.facebook': 'Facebook Page',

  'lang.switch': 'العربية',
  'common.imagePlaceholder': 'Project image',
};

const dictionaries: Record<Locale, Dict> = { ar, en };

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (typeof window !== 'undefined'
      ? localStorage.getItem('locale')
      : null) as Locale | null;
    if (stored === 'ar' || stored === 'en') setLocaleState(stored);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    localStorage.setItem('locale', locale);
  }, [locale, mounted]);

  const setLocale = (next: Locale) => setLocaleState(next);
  const toggle = () => setLocaleState((current) => (current === 'ar' ? 'en' : 'ar'));
  const t = (key: string) => dictionaries[locale][key] ?? key;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ locale, setLocale, toggle, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error('useLanguage must be used within LanguageProvider');
  return value;
}
