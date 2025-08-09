"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("adminLoggedIn") === "true"
      if (!isLoggedIn) {
        router.push("/login")
      } else {
        setIsAuthenticated(true)
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        {" "}
        {/* Changed to bg-background */}
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>{" "}
        {/* Changed border color */}
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {" "}
      {/* Changed to bg-background */}
      <AdminDashboard />
    </div>
  )
}
