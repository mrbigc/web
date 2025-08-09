"use client"

import { useEffect, useState } from "react"
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
  })

  useEffect(() => {
    const loadSocialLinks = async () => {
      try {
        const response = await fetch("/api/settings")
        const settings = await response.json()
        setSocialLinks({
          facebook: settings.facebookLink || "",
          instagram: settings.instagramLink || "",
        })
      } catch (error) {
        console.error("Failed to load social links:", error)
      }
    }

    loadSocialLinks()
  }, [])

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-red-900 to-blue-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* School Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>123 ถนนศรีนคริทร์ อำเภอเมือง จังหวัดหนองบัวลำภู 39000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>042-123-456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@school.ac.th</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">ลิงค์ด่วน</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-white transition-colors duration-300">
                  หน้าหลัก
                </a>
              </li>
              <li>
                <a href="/council" className="hover:text-white transition-colors duration-300">
                  สมาชิกสภานักเรียน
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  เกี่ยวกับโรงเรียน
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors duration-300">
                  ติดต่อเรา
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">ติดตามเรา</h3>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gradient-to-r from-pink-500 to-red-500 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
            <p className="text-gray-300 mt-4 text-sm">ติดตามข่าวสารและกิจกรรมของโรงเรียนได้ที่โซเชียลมีเดีย</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  )
}
