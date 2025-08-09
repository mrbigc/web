"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Users, Trophy, BookOpen, Heart, Star } from "lucide-react"

export function AboutSection() {
  const features = [
    {
      icon: GraduationCap,
      title: "การศึกษาคุณภาพ",
      description: "มุ่งเน้นการพัฒนาผู้เรียนให้มีความรู้ ความสามารถ และคุณธรรม",
      color: "from-blue-600 to-blue-700",
    },
    {
      icon: Users,
      title: "ชุมชนแห่งการเรียนรู้",
      description: "สร้างสภาพแวดล้อมที่เอื้อต่อการเรียนรู้และพัฒนาตนเอง",
      color: "from-red-600 to-red-700",
    },
    {
      icon: Trophy,
      title: "ความเป็นเลิศ",
      description: "ส่งเสริมให้นักเรียนมีความเป็นเลิศในด้านต่างๆ",
      color: "from-yellow-600 to-orange-600",
    },
    {
      icon: BookOpen,
      title: "การเรียนรู้ตลอดชีวิต",
      description: "ปลูกฝังนิสัยรักการอ่านและการเรียนรู้อย่างต่อเนื่อง",
      color: "from-green-600 to-green-700",
    },
    {
      icon: Heart,
      title: "คุณธรรมจริยธรรม",
      description: "พัฒนาผู้เรียนให้มีคุณธรรม จริยธรรม และจิตสาธารณะ",
      color: "from-pink-600 to-pink-700",
    },
    {
      icon: Star,
      title: "นวัตกรรมการศึกษา",
      description: "ใช้เทคโนโลยีและนวัตกรรมในการจัดการเรียนการสอน",
      color: "from-purple-600 to-purple-700",
    },
  ]

  return (
    <section className="py-16 px-4 bg-background shadow-inner">
      {" "}
      {/* Changed to bg-background */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">เกี่ยวกับโรงเรียน</h2>{" "}
          {/* Changed text color */}
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {" "}
            {/* Changed text color */}
            โรงเรียนเฉลิมพระเกียรติสมเด็จพระศรีนคริทร์หนองบัวลำภู มุ่งมั่นในการจัดการศึกษาที่มีคุณภาพ เพื่อพัฒนาผู้เรียนให้เป็นคนดี คนเก่ง และมีความสุข
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg bg-card" // Changed to bg-card
              >
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-4 rounded-full bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="h-8 w-8" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {" "}
                    {/* Changed text color */}
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-center leading-relaxed">
                    {" "}
                    {/* Changed text color */}
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">1,200+</div>
            <div className="text-muted-foreground">นักเรียน</div> {/* Changed text color */}
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">80+</div>
            <div className="text-muted-foreground">ครูและบุคลากร</div> {/* Changed text color */}
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">25+</div>
            <div className="text-muted-foreground">ปีแห่งความเป็นเลิศ</div> {/* Changed text color */}
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">100+</div>
            <div className="text-muted-foreground">รางวัลแห่งความภาคภูมิใจ</div> {/* Changed text color */}
          </div>
        </div>
      </div>
    </section>
  )
}
