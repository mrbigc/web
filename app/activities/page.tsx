import { Navbar } from "@/components/navbar"
import { ActivitySection } from "@/components/activity-section"
import { Footer } from "@/components/footer"

export default function ActivitiesPage() {
  return (
    <div className="min-h-screen">
      {" "}
      {/* Removed hardcoded gradient */}
      <Navbar />
      <ActivitySection />
      <Footer />
    </div>
  )
}
