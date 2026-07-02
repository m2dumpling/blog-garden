'use client';

import { getFeaturedModules } from '@/lib/modules/registry';
import HeroSection from '@/components/home/hero';
import AreasSection from '@/components/home/areas';
import CTASection from '@/components/home/cta-section';
import { ModuleSection } from '@/components/home/module-section';

export default function HomePage() {
  const featuredModules = getFeaturedModules();

  return (
    <main className="flex-1">
      <div className="bg-noise" />
      <HeroSection />
      <AreasSection />
      {featuredModules.map((mod) => (
        <ModuleSection
          key={mod.name}
          module={mod}
          pages={mod.source.getPages().slice(0, mod.homepage!.maxItems)}
        />
      ))}
      <CTASection />
    </main>
  );
}
