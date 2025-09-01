import HeroSection from "@/components/about/HeroSection"
import InteractiveSwitcher from "@/components/about/InteractiveSwitcher"
import EmailCTA from "@/components/about/EmailCTA"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <InteractiveSwitcher />
      <EmailCTA />
    </div>
  )
}
