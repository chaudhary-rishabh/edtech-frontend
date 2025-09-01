import HeroSection from "@/components/landing/hero-section"
import {CTASection} from "@/components/landing/cta-section"
import DemoSlider from "@/components/landing/demo-slider"
import ContentAbout from "@/components/landing/content-about"
import ContentAbout2 from "@/components/landing/content-about-2"
import FAQ from "@/components/landing/faq"
import EmailCTA from "@/components/landing/email-cta"
import TestimonialCarousel from "@/components/about/TestimonialCarousel"
import FeaturesSection from "@/components/landing/features-main"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <DemoSlider />
      <ContentAbout />
      <ContentAbout2 />
      <TestimonialCarousel />
      <FAQ />
      <EmailCTA />
    </div>
  )
}
