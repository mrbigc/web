"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { LogOut, Plus, Edit, Trash2, Facebook, Instagram, Save, Eye, Upload, Database } from "lucide-react"

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

export default function AdminDashboard() {
  const router = useRouter()
  const [activities, setActivities] = useState<Activity[]>([])
  const [councilMembers, setCouncilMembers] = useState<CouncilMember[]>([])
  const [logoUrl, setLogoUrl] = useState("")
  const [facebookLink, setFacebookLink] = useState("")
  const [instagramLink, setInstagramLink] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isSeeding, setIsSeeding] = useState(false)

  // Activity form states
  const [activityForm, setActivityForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    author: "",
  })

  // Council member form states
  const [memberForm, setMemberForm] = useState({
    name: "",
    position: "",
    grade: "",
    image: "",
    bio: "",
    achievements: "", // Stored as string with newlines for textarea
    email: "",
    phone: "",
  })

  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [editingMember, setEditingMember] = useState<CouncilMember | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      // Load activities
      const activitiesResponse = await fetch("/api/activities")
      if (activitiesResponse.ok) {
        const activitiesData = await activitiesResponse.json()
        setActivities(activitiesData)
      }

      // Load council members
      const membersResponse = await fetch("/api/council")
      if (membersResponse.ok) {
        const membersData = await membersResponse.json()
        setCouncilMembers(membersData)
      }

      // Load settings
      const settingsResponse = await fetch("/api/settings")
      if (settingsResponse.ok) {
        const settingsData = await settingsResponse.json()
        setLogoUrl(settingsData.schoolLogo || "")
        setFacebookLink(settingsData.facebookLink || "")
        setInstagramLink(settingsData.instagramLink || "")
      }
    } catch (error) {
      console.error("Failed to load data:", error)
    }
  }

  const showSuccessAlert = (message: string) => {
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => setShowAlert(false), 3000)
  }

  const handleFileUpload = async (file: File, type: "logo" | "activity" | "member") => {
    if (!file) return null

    setIsUploading(true)
    try {
      const filename = `${type}-${Date.now()}-${file.name}`
      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: "POST",
        body: file,
      })

      if (response.ok) {
        const { url } = await response.json()
        return url
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      showSuccessAlert("เกิดข้อผิดพลาดในการอัพโหลดรูปภาพ")
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = await handleFileUpload(file, "logo")
    if (url) {
      setLogoUrl(url)
      showSuccessAlert("อัพโหลดโลโก้สำเร็จ!")
      handleSaveSettings() // Save settings immediately after logo upload
    }
  }

  const handleSeedDatabase = async () => {
    setIsSeeding(true)
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
      })

      if (response.ok) {
        const result = await response.json()
        showSuccessAlert(result.message)
        loadData() // Reload data after seeding
      } else {
        const error = await response.json()
        showSuccessAlert(`เกิดข้อผิดพลาด: ${error.error || response.statusText}`)
      }
    } catch (error) {
      console.error("Failed to seed database:", error)
      showSuccessAlert("เกิดข้อผิดพลาดในการสร้างข้อมูลตัวอย่าง")
    }
    setIsSeeding(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    router.push("/")
  }

  const handleAddActivity = async () => {
    if (!activityForm.title || !activityForm.description) return

    try {
      const response = await fetch("/api/activities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityForm),
      })

      if (response.ok) {
        const newActivity = await response.json()
        setActivities([newActivity, ...activities])
        setActivityForm({ title: "", description: "", image: "", category: "", author: "" })
        showSuccessAlert("เพิ่มกิจกรรมสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to add activity:", error)
    }
  }

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity)
    setActivityForm({
      title: activity.title,
      description: activity.description,
      image: activity.image,
      category: activity.category,
      author: activity.author,
    })
  }

  const handleUpdateActivity = async () => {
    if (!editingActivity) return

    try {
      const response = await fetch(`/api/activities/${editingActivity.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activityForm),
      })

      if (response.ok) {
        const updatedActivity = await response.json()
        setActivities(activities.map((activity) => (activity.id === editingActivity.id ? updatedActivity : activity)))
        setEditingActivity(null)
        setActivityForm({ title: "", description: "", image: "", category: "", author: "" })
        showSuccessAlert("แก้ไขกิจกรรมสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to update activity:", error)
    }
  }

  const handleDeleteActivity = async (id: string) => {
    try {
      const response = await fetch(`/api/activities/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setActivities(activities.filter((activity) => activity.id !== id))
        showSuccessAlert("ลบกิจกรรมสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to delete activity:", error)
    }
  }

  const handleAddMember = async () => {
    if (!memberForm.name || !memberForm.position || !memberForm.grade) return

    try {
      const memberData = {
        ...memberForm,
        achievements: memberForm.achievements.split("\n").filter((a) => a.trim()),
      }

      const response = await fetch("/api/council", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      })

      if (response.ok) {
        const newMember = await response.json()
        setCouncilMembers([...councilMembers, newMember])
        setMemberForm({ name: "", position: "", grade: "", image: "", bio: "", achievements: "", email: "", phone: "" })
        showSuccessAlert("เพิ่มสมาชิกสภานักเรียนสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to add member:", error)
    }
  }

  const handleEditMember = (member: CouncilMember) => {
    setEditingMember(member)
    setMemberForm({
      name: member.name,
      position: member.position,
      grade: member.grade,
      image: member.image,
      bio: member.bio,
      achievements: member.achievements.join("\n"),
      email: member.email || "",
      phone: member.phone || "",
    })
  }

  const handleUpdateMember = async () => {
    if (!editingMember) return

    try {
      const memberData = {
        ...memberForm,
        achievements: memberForm.achievements.split("\n").filter((a) => a.trim()),
      }

      const response = await fetch(`/api/council/${editingMember.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      })

      if (response.ok) {
        const updatedMember = await response.json()
        setCouncilMembers(councilMembers.map((member) => (member.id === editingMember.id ? updatedMember : member)))
        setEditingMember(null)
        setMemberForm({ name: "", position: "", grade: "", image: "", bio: "", achievements: "", email: "", phone: "" })
        showSuccessAlert("แก้ไขข้อมูลสมาชิกสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to update member:", error)
    }
  }

  const handleDeleteMember = async (id: string) => {
    try {
      const response = await fetch(`/api/council/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCouncilMembers(councilMembers.filter((member) => member.id !== id))
        showSuccessAlert("ลบสมาชิกสภานักเรียนสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to delete member:", error)
    }
  }

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schoolLogo: logoUrl,
          facebookLink: facebookLink,
          instagramLink: instagramLink,
        }),
      })

      if (response.ok) {
        showSuccessAlert("บันทึกการตั้งค่าสำเร็จ!")
      }
    } catch (error) {
      console.error("Failed to save settings:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-blue-600 shadow-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-white">ระบบจัดการเว็บไซต์โรงเรียน</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => window.open("/", "_blank")}
                className="flex items-center space-x-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <Eye className="h-4 w-4" />
                <span>ดูเว็บไซต์</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <LogOut className="h-4 w-4" />
                <span>ออกจากระบบ</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Alert */}
      {showAlert && (
        <div className="fixed top-20 right-4 z-50">
          <Alert className="bg-green-50 border-green-200 shadow-lg">
            <AlertDescription className="text-green-800">{alertMessage}</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="activities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card shadow-lg">
            <TabsTrigger value="activities">จัดการกิจกรรม</TabsTrigger>
            <TabsTrigger value="council">จัดการสมาชิกสภา</TabsTrigger>
            <TabsTrigger value="settings">ตั้งค่าเว็บไซต์</TabsTrigger>
            <TabsTrigger value="database">ฐานข้อมูล</TabsTrigger>
          </TabsList>

          {/* Database Tab */}
          <TabsContent value="database" className="space-y-6">
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>จัดการฐานข้อมูล</CardTitle>
                <CardDescription>สร้างข้อมูลตัวอย่างสำหรับเว็บไซต์</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">ข้อมูลปัจจุบัน:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="bg-card p-3 rounded border">
                      <div className="font-medium text-foreground">กิจกรรม</div>
                      <div className="text-2xl font-bold text-red-600">{activities.length}</div>
                    </div>
                    <div className="bg-card p-3 rounded border">
                      <div className="font-medium text-foreground">สมาชิกสภา</div>
                      <div className="text-2xl font-bold text-blue-600">{councilMembers.length}</div>
                    </div>
                    <div className="bg-card p-3 rounded border">
                      <div className="font-medium text-foreground">การตั้งค่า</div>
                      <div className="text-2xl font-bold text-green-600">3</div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSeedDatabase}
                  disabled={isSeeding}
                  className="w-full bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white"
                >
                  <Database className="h-4 w-4 mr-2" />
                  {isSeeding ? "กำลังสร้างข้อมูล..." : "สร้างข้อมูลตัวอย่าง"}
                </Button>

                <div className="text-sm text-muted-foreground bg-yellow-50 p-3 rounded border border-yellow-200">
                  <strong>หมายเหตุ:</strong> การสร้างข้อมูลตัวอย่างจะเพิ่มกิจกรรม สมาชิกสภานักเรียน และการตั้งค่าเริ่มต้น
                  หากมีข้อมูลอยู่แล้วจะไม่มีการเปลี่ยนแปลง
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>เพิ่มกิจกรรมใหม่</CardTitle>
                <CardDescription>เพิ่มข่าวสารและกิจกรรมของโรงเรียน</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">หัวข้อกิจกรรม</Label>
                    <Input
                      id="title"
                      value={activityForm.title}
                      onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
                      placeholder="ระบุหัวข้อกิจกรรม"
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">หมวดหมู่</Label>
                    <Input
                      id="category"
                      value={activityForm.category}
                      onChange={(e) => setActivityForm({ ...activityForm, category: e.target.value })}
                      placeholder="เช่น กีฬา, วิชาการ, สิ่งแวดล้อม"
                      className="bg-input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={activityForm.description}
                    onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
                    placeholder="รายละเอียดของกิจกรรม"
                    rows={3}
                    className="bg-input"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="image">URL รูปภาพ</Label>
                    <Input
                      id="image"
                      value={activityForm.image}
                      onChange={(e) => setActivityForm({ ...activityForm, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="author">ผู้เขียน</Label>
                    <Input
                      id="author"
                      value={activityForm.author}
                      onChange={(e) => setActivityForm({ ...activityForm, author: e.target.value })}
                      placeholder="ชื่อผู้เขียน"
                      className="bg-input"
                    />
                  </div>
                </div>
                <Button
                  onClick={editingActivity ? handleUpdateActivity : handleAddActivity}
                  className="w-full bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white"
                  disabled={isUploading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editingActivity ? "แก้ไขกิจกรรม" : "เพิ่มกิจกรรม"}
                </Button>
                {editingActivity && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingActivity(null)
                      setActivityForm({ title: "", description: "", image: "", category: "", author: "" })
                    }}
                    className="w-full"
                  >
                    ยกเลิกการแก้ไข
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Activities List */}
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>กิจกรรมทั้งหมด ({activities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-card/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{activity.title}</h3>
                          <Badge className="bg-gradient-to-r from-red-500 to-blue-500 text-white">
                            {activity.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {activity.author} • {new Date(activity.createdAt).toLocaleDateString("th-TH")} •{" "}
                          {activity.views} views
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditActivity(activity)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteActivity(activity.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {activities.length === 0 && <p className="text-center text-muted-foreground py-8">ยังไม่มีกิจกรรม</p>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Council Tab */}
          <TabsContent value="council" className="space-y-6">
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>เพิ่มสมาชิกสภานักเรียน</CardTitle>
                <CardDescription>เพิ่มข้อมูลสมาชิกสภานักเรียน</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">ชื่อ-นามสกุล</Label>
                    <Input
                      id="name"
                      value={memberForm.name}
                      onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                      placeholder="ชื่อ-นามสกุล"
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">ตำแหน่ง</Label>
                    <Input
                      id="position"
                      value={memberForm.position}
                      onChange={(e) => setMemberForm({ ...memberForm, position: e.target.value })}
                      placeholder="เช่น ประธานสภานักเรียน"
                      className="bg-input"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="grade">ชั้นที่ศึกษา</Label>
                    <Input
                      id="grade"
                      value={memberForm.grade}
                      onChange={(e) => setMemberForm({ ...memberForm, grade: e.target.value })}
                      placeholder="เช่น มัธยมศึกษาปีที่ 6"
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="memberImage">URL รูปภาพ</Label>
                    <Input
                      id="memberImage"
                      value={memberForm.image}
                      onChange={(e) => setMemberForm({ ...memberForm, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                      className="bg-input"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">ประวัติส่วนตัว</Label>
                  <Textarea
                    id="bio"
                    value={memberForm.bio}
                    onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                    placeholder="ประวัติและข้อมูลส่วนตัว"
                    rows={3}
                    className="bg-input"
                  />
                </div>
                <div>
                  <Label htmlFor="achievements">ผลงานและรางวัล (แยกบรรทัด)</Label>
                  <Textarea
                    id="achievements"
                    value={memberForm.achievements}
                    onChange={(e) => setMemberForm({ ...memberForm, achievements: e.target.value })}
                    placeholder={"รางวัลที่ 1\nรางวัลที่ 2\nรางวัลที่ 3"}
                    rows={3}
                    className="bg-input"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">อีเมล (ไม่บังคับ)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm({ ...memberForm, email: e.target.value })}
                      placeholder="email@school.ac.th"
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">เบอร์โทร (ไม่บังคับ)</Label>
                    <Input
                      id="phone"
                      value={memberForm.phone}
                      onChange={(e) => setMemberForm({ ...memberForm, phone: e.target.value })}
                      placeholder="081-234-5678"
                      className="bg-input"
                    />
                  </div>
                </div>
                <Button
                  onClick={editingMember ? handleUpdateMember : handleAddMember}
                  className="w-full bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white"
                  disabled={isUploading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {editingMember ? "แก้ไขข้อมูลสมาชิก" : "เพิ่มสมาชิก"}
                </Button>
                {editingMember && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditingMember(null)
                      setMemberForm({
                        name: "",
                        position: "",
                        grade: "",
                        image: "",
                        bio: "",
                        achievements: "",
                        email: "",
                        phone: "",
                      })
                    }}
                    className="w-full"
                  >
                    ยกเลิกการแก้ไข
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Council Members List */}
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>สมาชิกสภานักเรียนทั้งหมด ({councilMembers.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {councilMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-foreground">{member.name}</h3>
                          <Badge variant="secondary" className="bg-gradient-to-r from-blue-500 to-red-500 text-white">
                            {member.position}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{member.grade}</p>
                        <p className="text-xs text-muted-foreground">{member.bio}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteMember(member.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {councilMembers.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">ยังไม่มีสมาชิกสภานักเรียน</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>ตั้งค่าเว็บไซต์</CardTitle>
                <CardDescription>จัดการโลโก้และลิงก์โซเชียลมีเดีย</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="logo">โลโก้โรงเรียน</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <Input
                      id="logo"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://example.com/logo.png"
                      className="bg-input"
                    />
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={isUploading}
                      />
                      <Button
                        variant="outline"
                        disabled={isUploading}
                        className="flex items-center space-x-2 bg-transparent"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600"></div>
                            <span>กำลังอัพโหลด...</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            <span>อัพโหลด</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  {logoUrl && (
                    <div className="mt-4">
                      <p className="text-sm text-muted-foreground mb-2">ตัวอย่างโลโก้:</p>
                      <img
                        src={logoUrl || "/placeholder.svg"}
                        alt="โลโก้โรงเรียน"
                        className="w-20 h-20 object-cover rounded-full border shadow-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="facebook" className="flex items-center space-x-2">
                      <Facebook className="h-4 w-4 text-blue-600" />
                      <span>ลิงก์ Facebook</span>
                    </Label>
                    <Input
                      id="facebook"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      placeholder="https://facebook.com/yourschool"
                      className="bg-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="instagram" className="flex items-center space-x-2">
                      <Instagram className="h-4 w-4 text-pink-600" />
                      <span>ลิงก์ Instagram</span>
                    </Label>
                    <Input
                      id="instagram"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                      placeholder="https://instagram.com/yourschool"
                      className="bg-input"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleSaveSettings}
                  className="w-full bg-gradient-to-r from-red-500 to-blue-500 hover:from-red-600 hover:to-blue-600 text-white"
                  disabled={isUploading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกการตั้งค่า
                </Button>
              </CardContent>
            </Card>

            {/* Preview Settings */}
            <Card className="bg-card shadow-lg border-0">
              <CardHeader>
                <CardTitle>ตัวอย่างการตั้งค่า</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">โลโก้โรงเรียน:</h4>
                    {logoUrl ? (
                      <img
                        src={logoUrl || "/placeholder.svg"}
                        alt="โลโก้โรงเรียน"
                        className="w-16 h-16 object-cover rounded-full border shadow-lg"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                    ) : (
                      <p className="text-muted-foreground">ยังไม่ได้ตั้งค่าโลโก้</p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">ลิงก์โซเชียลมีเดีย:</h4>
                    <div className="flex space-x-4">
                      {facebookLink && (
                        <a
                          href={facebookLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                        >
                          <Facebook className="h-5 w-5" />
                          <span>Facebook</span>
                        </a>
                      )}
                      {instagramLink && (
                        <a
                          href={instagramLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-pink-600 hover:text-pink-700"
                        >
                          <Instagram className="h-5 w-5" />
                          <span>Instagram</span>
                        </a>
                      )}
                      {!facebookLink && !instagramLink && (
                        <p className="text-muted-foreground">ยังไม่ได้ตั้งค่าลิงก์โซเชียลมีเดีย</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
