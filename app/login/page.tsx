"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { School } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simple authentication (in real app, use proper authentication)
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true")
      router.push("/admin")
    } else {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4"> {/* Changed to bg-background */}
      <Card className="w-full max-w-md bg-card shadow-2xl border-0"> {/* Changed to bg-card */}
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-blue-500 rounded-full">
              <School className="h-12 w-12 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">เข้าสู่ระบบผู้ดูแล</CardTitle> {/* Changed text color */}
          <CardDescription className="text-muted-foreground">โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู</CardDescription> {/* Changed text color */}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="กรุณาใส่ชื่อผู้ใช้"
                className="bg-input" {/* Changed to bg-input */}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <Input
                id="password"
                type="password"
                value={password}\
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="กรุณาใส่รหัสผ่าน"
                className="bg-input" {/* Changed to bg-input */}
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button
              type="submit"
              className=\"w-full bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground"> {/* Changed text color */}
            <p>สำหรับทดสอบ: admin / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
