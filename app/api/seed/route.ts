import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function POST() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)

    // Check if data already exists
    const existingActivities = await sql`SELECT COUNT(*) FROM activities`
    const existingMembers = await sql`SELECT COUNT(*) FROM council_members`
    const existingSettings = await sql`SELECT COUNT(*) FROM settings`

    if (
      Number(existingActivities[0].count) > 0 ||
      Number(existingMembers[0].count) > 0 ||
      Number(existingSettings[0].count) > 0
    ) {
      return NextResponse.json({ message: "Database already seeded" })
    }

    // Create initial activities
    await sql`
      INSERT INTO activities (title, description, image, category, author, views) VALUES
      ('งานวันกีฬาสี ประจำปี 2567', 'กิจกรรมงานวันกีฬาสีประจำปีของโรงเรียน เพื่อส่งเสริมความสามัคคีและการออกกำลังกายของนักเรียน', '/placeholder.svg?height=300&width=400', 'กิจกรรมกีฬา', 'ครูสมชาย', 245),
      ('โครงการปลูกป่าเฉลิมพระเกียรติ', 'นักเรียนร่วมกิจกรรมปลูกป่าเพื่อเฉลิมพระเกียรติและอนุรักษ์สิ่งแวดล้อม', '/placeholder.svg?height=300&width=400', 'สิ่งแวดล้อม', 'ครูสมหญิง', 189),
      ('การแข่งขันทักษะวิชาการ', 'นักเรียนเข้าร่วมการแข่งขันทักษะวิชาการระดับจังหวัด และได้รับรางวัลเหรียญทอง', '/placeholder.svg?height=300&width=400', 'วิชาการ', 'ครูสมศรี', 312)
    `

    // Create initial council members
    await sql`
      INSERT INTO council_members (name, position, grade, image, bio, achievements, email, phone) VALUES
      ('นางสาวสมใจ ใจดี', 'ประธานสภานักเรียน', 'มัธยมศึกษาปีที่ 6', '/placeholder.svg?height=300&width=300', 'เป็นนักเรียนที่มีความรับผิดชอบสูง มีความสามารถในการเป็นผู้นำ และมีผลการเรียนดีเยี่ยม', ${JSON.stringify(["รางวัลนักเรียนดีเด่นระดับจังหวัด", "รางวัลผู้นำเยาวชนดีเด่น", "เกรดเฉลี่ย 3.95"])}, 'somjai@school.ac.th', '081-234-5678'),
      ('นายสมศักดิ์ มานะดี', 'รองประธานสภานักเรียน', 'มัธยมศึกษาปีที่ 5', '/placeholder.svg?height=300&width=300', 'นักเรียนที่มีความคิดสร้างสรรค์ ชอบการทำงานเป็นทีม และมีความสามารถในการแก้ไขปัญหา', ${JSON.stringify(["รางวัลโครงงานวิทยาศาสตร์ระดับภาค", "รางวัลนักเรียนอาสาดีเด่น", "เกรดเฉลี่ย 3.87"])}, 'somsak@school.ac.th', '081-345-6789'),
      ('นางสาวสมหญิง รักเรียน', 'เลขานุการสภานักเรียน', 'มัธยมศึกษาปีที่ 5', '/placeholder.svg?height=300&width=300', 'มีความละเอียดรอบคอบ ชอบการจดบันทึก และมีความสามารถในการจัดการเอกสาร', ${JSON.stringify(["รางวัลนักเรียนมีระเบียบวินัยดีเด่น", "รางวัลการแข่งขันเรียงความ", "เกรดเฉลี่ย 3.92"])}, 'somying@school.ac.th', '081-456-7890'),
      ('นายสมชาย ขยันเรียน', 'เหรัญญิกสภานักเรียน', 'มัธยมศึกษาปีที่ 4', '/placeholder.svg?height=300&width=300', 'มีความสามารถในการคำนวณ มีความซื่อสัตย์ และรับผิดชอบในการจัดการเงิน', ${JSON.stringify(["รางวัลการแข่งขันคณิตศาสตร์", "รางวัลนักเรียนซื่อสัตย์ดีเด่น", "เกรดเฉลี่ย 3.85"])}, 'somchai@school.ac.th', '081-567-8901')
    `

    // Create initial settings (if not already present from create-tables.sql)
    await sql`
      INSERT INTO settings (key, value) VALUES 
        ('schoolLogo', ''),
        ('facebookLink', ''),
        ('instagramLink', '')
      ON CONFLICT (key) DO NOTHING;
    `

    return NextResponse.json({ message: "Database seeded successfully" })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json({ message: "Database seeding failed", error: (error as Error).message }, { status: 500 })
  }
}
