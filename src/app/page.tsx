import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { HeroSection } from '@/components/sections/hero';
import { ProblemSection } from '@/components/sections/problem';
import { HowItWorksSection } from '@/components/sections/how-it-works';
import { FeaturesSection } from '@/components/sections/features';
import { MetricsSection } from '@/components/sections/metrics';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { PricingSection } from '@/components/sections/pricing';
import { FaqSection } from '@/components/sections/faq';
import { CtaFinalSection } from '@/components/sections/cta-final';

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MetricsSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <CtaFinalSection />
      </main>
      <Footer />
    </>
  );
}
