"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users } from "lucide-react"

export function HeroSection() {
  const [logoUrl, setLogoUrl] = useState("")

  useEffect(() => {
    const loadLogo = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const settings = await response.json()
          setLogoUrl(settings.schoolLogo || "")
        }
      } catch (error) {
        console.error("Failed to load logo:", error)
      }
    }

    loadLogo()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image with Fade */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="https://fth1.com/uppic/39100169/news/39100169_0_20250718-101927.jpg" // เปลี่ยนตรงนี้
          alt="School Building"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient Overlay - Kept as specific design for hero */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-500/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto py-20">
        {/* School Logo */}
        {logoUrl && (
          <div className="mb-8 flex justify-center animate-fade-in-up">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl bg-white/10 backdrop-blur-sm">
              <Image
                src={logoUrl || "/placeholder.svg"}
                alt="โลโก้โรงเรียน"
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                }}
              />
            </div>
          </div>
        )}

        {/* Subtitle */}
        <p
          className="text-xl md:text-2xl mb-8 text-gray-300 font-semibold tracking-wider uppercase backdrop-blur-md rounded-md bg-gray-900/20 px-4 py-2 transform rotate animate-fade-in-up delay-300"
        >
          มุ่งสู่ความเป็นเลิศทางการศึกษา เพื่ออนาคตที่สดใส
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-500">
          <Link href="/activities">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <Calendar className="mr-2 h-5 w-5" />
              ดูกิจกรรมล่าสุด
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/council">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105 shadow-xl backdrop-blur-sm"
            >
              <Users className="mr-2 h-5 w-5" />
              สมาชิกสภานักเรียน
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
