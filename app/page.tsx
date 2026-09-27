import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FloatingContact } from '@/components/layout/FloatingContact';
import { Hero } from '@/components/sections/Hero';
import { BrandTicker } from '@/components/sections/BrandTicker';
import { Services } from '@/components/sections/Services';
import { ProjectGallery } from '@/components/sections/ProjectGallery';
import { BeforeAfter } from '@/components/sections/BeforeAfter';
import { About } from '@/components/sections/About';
import { ServiceArea } from '@/components/sections/ServiceArea';
import { Process } from '@/components/sections/Process';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BrandTicker />
        <Services />
        <ProjectGallery />
        <BeforeAfter />
        <About />
        <ServiceArea />
        <Process />
        <Contact />
      </main>
      <SiteFooter />
      <FloatingContact />
    </>
  );
}
