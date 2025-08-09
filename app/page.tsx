import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {" "}
      {/* Removed hardcoded gradient */}
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Footer />
    </div>
  )
}
