import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider" // Import ThemeProvider

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู",
  description: "เว็บไซต์โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู - มุ่งสู่ความเป็นเลิศทางการศึกษา",
  keywords: "โรงเรียน, หนองบัวลำภู, การศึกษา, สภานักเรียน, กิจกรรม",
  authors: [{ name: "โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู" }],
  openGraph: {
    title: "โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู",
    description: "มุ่งสู่ความเป็นเลิศทางการศึกษา เพื่ออนาคตที่สดใส",
    type: "website",
    locale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู",
    description: "มุ่งสู่ความเป็นเลิศทางการศึกษา เพื่ออนาคตที่สดใส",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
