"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { GraduationCap, Award, Mail, Phone } from "lucide-react"

interface CouncilMember {
  id: string
  name: string
  position: string
  grade: string
  image: string
  bio: string
  achievements: string[]
  email?: string
  phone?: string
}

export function CouncilSection() {
  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCouncilMembers = async () => {
      try {
        const response = await fetch("/api/council")
        if (response.ok) {
          const data = await response.json()
          setCouncilMembers(data)
        }
      } catch (error) {
        console.error("Failed to load council members:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCouncilMembers()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-background min-h-screen shadow-inner">
        {" "}
        {/* Changed to bg-background */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 pt-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">สมาชิกสภานักเรียน</h1>{" "}
            {/* Changed text color */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {" "}
              {/* Changed text color */}
              คณะสภานักเรียนที่ได้รับการเลือกตั้งจากนักเรียนทั้งโรงเรียน เพื่อเป็นตัวแทนในการดำเนินกิจกรรมต่างๆ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse bg-card">
                {" "}
                {/* Changed to bg-card */}
                <div className="h-64 bg-muted rounded-t-lg"></div> {/* Changed to bg-muted */}
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div> {/* Changed to bg-muted */}
                  <div className="h-3 bg-muted rounded w-1/2"></div> {/* Changed to bg-muted */}
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-full"></div> {/* Changed to bg-muted */}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 px-4 bg-background min-h-screen shadow-inner">
      {" "}
      {/* Changed to bg-background */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 pt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">สมาชิกสภานักเรียน</h1>{" "}
          {/* Changed text color */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {" "}
            {/* Changed text color */}
            คณะสภานักเรียนที่ได้รับการเลือกตั้งจากนักเรียนทั้งโรงเรียน เพื่อเป็นตัวแทนในการดำเนินกิจกรรมต่างๆ
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {councilMembers.map((member) => (
            <Card
              key={member.id}
              className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-card" // Changed to bg-card
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=300&width=300&text=สมาชิก"
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 text-white">
                    {member.position}
                  </Badge>
                </div>
              </div>

              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold text-foreground">{member.name}</CardTitle>{" "}
                {/* Changed text color */}
                <CardDescription className="text-muted-foreground">
                  {" "}
                  {/* Changed text color */}
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>{member.grade}</span>
                  </div>
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 group-hover:text-white transition-all duration-500 bg-transparent border-2 border-red-200 hover:border-transparent"
                    >
                      ดูข้อมูลเพิ่มเติม
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-card">
                    {" "}
                    {/* Changed to bg-card */}
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold text-foreground text-center">
                        {member.name}
                      </DialogTitle>{" "}
                      {/* Changed text color */}
                      <DialogDescription className="text-muted-foreground text-center">
                        {" "}
                        {/* Changed text color */}
                        {member.position} • {member.grade}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex justify-center">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          width={250}
                          height={250}
                          className="rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=250&width=250&text=สมาชิก"
                          }}
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">ประวัติส่วนตัว</h4> {/* Changed text color */}
                          <p className="text-muted-foreground text-sm">{member.bio}</p> {/* Changed text color */}
                        </div>

                        <div>
                          <h4 className="font-semibold text-foreground mb-2 flex items-center">
                            {" "}
                            {/* Changed text color */}
                            <Award className="h-4 w-4 mr-2" />
                            ผลงานและรางวัล
                          </h4>
                          <ul className="space-y-1">
                            {member.achievements.map((achievement, index) => (
                              <li key={index} className="text-muted-foreground text-sm flex items-start">
                                {" "}
                                {/* Changed text color */}
                                <span className="text-red-600 mr-2">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {(member.email || member.phone) && (
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">ติดต่อ</h4> {/* Changed text color */}
                            <div className="space-y-1">
                              {member.email && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  {" "}
                                  {/* Changed text color */}
                                  <Mail className="h-4 w-4 mr-2" />
                                  {member.email}
                                </div>
                              )}
                              {member.phone && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  {" "}
                                  {/* Changed text color */}
                                  <Phone className="h-4 w-4 mr-2" />
                                  {member.phone}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>

        {councilMembers.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">ยังไม่มีข้อมูลสมาชิกสภานักเรียน</p> {/* Changed text color */}
          </div>
        )}
      </div>
    </section>
  )
}
