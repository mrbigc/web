"use client"

import { useState, useEffect } from "react"
import Image from "next/image" // Import Image component
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  School,
  Facebook,
  Instagram,
  Home,
  Users,
  Sparkles,
  GraduationCap,
  BookOpen,
  Trophy,
  Calendar,
} from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false) // Keep for scroll indicator, but not for background
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
  })
  const [schoolLogoFromDb, setSchoolLogoFromDb] = useState<string | null>(null) // State for school logo
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const loadData = async () => {
      try {
        const response = await fetch("/api/settings")
        if (response.ok) {
          const settings = await response.json()
          setSocialLinks({
            facebook: settings.facebookLink || "",
            instagram: settings.instagramLink || "",
          })
          setSchoolLogoFromDb(settings.schoolLogo || null) // Load school logo
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
      }
    }

    window.addEventListener("scroll", handleScroll)
    loadData()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      name: "หน้าหลัก",
      href: "/",
      icon: Home,
      description: "กลับสู่หน้าแรก",
    },
    {
      name: "กิจกรรม",
      href: "/activities",
      icon: Calendar,
      description: "ดูกิจกรรมและข่าวสาร",
    },
    {
      name: "สมาชิกสภานักเรียน",
      href: "/council",
      icon: Users,
      description: "ดูข้อมูลสมาชิกสภานักเรียน",
    },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 bg-gradient-to-r from-red-600 to-blue-600 shadow-lg`} // Always red-blue gradient
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 scale-110"></div>
              <div
                className={`relative p-2 rounded-full transition-all duration-500 group-hover:scale-110 bg-white/20 text-white backdrop-blur-sm`} // Always white/20 background
              >
                {schoolLogoFromDb ? (
                  <Image
                    src={schoolLogoFromDb || "/placeholder.svg"}
                    alt="School Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=32&width=32&text=Logo" // Fallback placeholder
                    }}
                  />
                ) : (
                  <School className="h-8 w-8" />
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg text-white`}>โรงเรียนเฉลิมพระเกียรติฯ</span> {/* Always white */}
              <span className={`text-xs text-red-200`}>หนองบัวลำภู</span> {/* Always red-200 */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const IconComponent = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 hover:scale-105 group ${
                    isActive
                      ? "bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg"
                      : "text-white hover:text-white hover:bg-white/20 backdrop-blur-sm" // Always white for non-active
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <IconComponent className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500"></div>
                  )}
                </Link>
              )
            })}
            {/* Decorative Icons */}
            <div className="flex items-center space-x-2 ml-4">
              <div className={`p-2 rounded-full transition-all duration-500 text-blue-200`}>
                {" "}
                {/* Always blue-200 */}
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className={`p-2 rounded-full transition-all duration-500 text-red-200`}>
                {" "}
                {/* Always red-200 */}
                <BookOpen className="h-5 w-5" />
              </div>
              <div className={`p-2 rounded-full transition-all duration-500 text-yellow-200`}>
                {" "}
                {/* Always yellow-200 */}
                <Trophy className="h-5 w-5" />
              </div>
            </div>
            {/* Social Links */}
            <div className="flex items-center space-x-2 ml-4 border-l border-white/20 pl-4">
              {" "}
              {/* Always white/20 border */}
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-all duration-500 hover:scale-110 text-white hover:bg-white/20 backdrop-blur-sm`} // Always white
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full transition-all duration-500 hover:scale-110 text-white hover:bg-white/20 backdrop-blur-sm`} // Always white
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              <div className={`p-2 rounded-full transition-all duration-500 text-purple-200`}>
                {" "}
                {/* Always purple-200 */}
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`md:hidden transition-all duration-500 rounded-full text-white hover:bg-white/20 backdrop-blur-sm`} // Always white
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-gradient-to-br from-red-500 to-blue-500 text-white" // Always gradient and white text
            >
              <div className="flex flex-col space-y-6 mt-8">
                <div className="text-center pb-4 border-b border-red-200">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-full text-white">
                      <School className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="font-bold text-white">โรงเรียนเฉลิมพระเกียรติฯ</h3>
                  <p className="text-sm text-red-200">หนองบัวลำภู</p>
                </div>

                {navItems.map((item) => {
                  const IconComponent = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 group ${
                        isActive ? "bg-white/20 text-white shadow-lg" : "text-white hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-full transition-transform duration-300 group-hover:scale-110 ${
                          isActive ? "bg-white/20 text-white" : "bg-white/10 text-white"
                        }`}
                      >
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className={`text-xs ${isActive ? "text-white/80" : "text-white/70"}`}>
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}

                {/* Mobile Social Links */}
                <div className="pt-4 border-t border-red-200">
                  <h4 className="font-semibold text-white mb-3">ติดตามเรา</h4>
                  <div className="flex items-center space-x-4">
                    {socialLinks.facebook && (
                      <a
                        href={socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        href={socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition-all duration-300 hover:scale-110"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="pt-4 border-t border-red-200">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}
