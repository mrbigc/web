import { Navbar } from "@/components/navbar"
import { CouncilSection } from "@/components/council-section"
import { Footer } from "@/components/footer"

export default function CouncilPage() {
  return (
    <div className="min-h-screen">
      {" "}
      {/* Removed hardcoded gradient */}
      <Navbar />
      <CouncilSection />
      <Footer />
    </div>
  )
}
