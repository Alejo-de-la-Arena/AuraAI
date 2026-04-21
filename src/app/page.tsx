import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { ProblemSection } from '@/components/sections/problem';
import { HowItWorksSection } from '@/components/sections/how-it-works';
import { FeaturesSection } from '@/components/sections/features';
import { MetricsSection } from '@/components/sections/metrics';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { PricingSection } from '@/components/sections/pricing';
import { CtaFinalSection } from '@/components/sections/cta-final';

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MetricsSection />
        <TestimonialsSection />
        <PricingSection />
        <CtaFinalSection />
      </main>
      <Footer />
    </>
  );
}
