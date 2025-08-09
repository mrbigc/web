"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Eye } from "lucide-react"

interface Activity {
  id: string
  title: string
  description: string
  image: string
  createdAt: string
  author: string
  category: string
  views: number
}

export function ActivitySection() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch("/api/activities")
        if (response.ok) {
          const data = await response.json()
          setActivities(data)
        }
      } catch (error) {
        console.error("Failed to load activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()
  }, [])

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-background min-h-screen shadow-inner">
        {" "}
        {/* Changed to bg-background */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 pt-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">กิจกรรมและข่าวสาร</h1>{" "}
            {/* Changed text color */}
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {" "}
              {/* Changed text color */}
              ติดตามกิจกรรมและข่าวสารต่างๆ ของโรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="animate-pulse bg-card">
                {" "}
                {/* Changed to bg-card */}
                <div className="h-48 bg-muted rounded-t-lg"></div> {/* Changed to bg-muted */}
                <CardHeader>
                  <div className="h-4 bg-muted rounded w-3/4"></div> {/* Changed to bg-muted */}
                  <div className="h-3 bg-muted rounded w-1/2"></div> {/* Changed to bg-muted */}
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded w-full mb-2"></div> {/* Changed to bg-muted */}
                  <div className="h-3 bg-muted rounded w-2/3"></div> {/* Changed to bg-muted */}
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">กิจกรรมและข่าวสาร</h1>{" "}
          {/* Changed text color */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {" "}
            {/* Changed text color */}
            ติดตามกิจกรรมและข่าวสารต่างๆ ของโรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border-0 shadow-lg hover:shadow-red-200/50 bg-card" // Changed to bg-card
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={activity.image || "/placeholder.svg"}
                  alt={activity.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=300&width=400&text=รูปภาพ"
                  }}
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white">
                    {activity.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                  {" "}
                  {/* Changed text color */}
                  {activity.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">{activity.description}</CardDescription>{" "}
                {/* Changed text color */}
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  {" "}
                  {/* Changed text color */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{new Date(activity.createdAt).toLocaleDateString("th-TH")}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{activity.author}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{activity.views}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">ยังไม่มีกิจกรรมที่แสดง</p> {/* Changed text color */}
          </div>
        )}
      </div>
    </section>
  )
}
