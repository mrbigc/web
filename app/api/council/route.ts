import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const members = await sql`
      SELECT id, name, position, grade, image, bio, achievements, email, phone
      FROM council_members 
      ORDER BY created_at ASC
    `

    return NextResponse.json(
      members.map((member) => ({
        ...member,
        achievements: Array.isArray(member.achievements) ? member.achievements : [],
      })),
    )
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch council members from database." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, position, grade, image, bio, achievements, email, phone } = body

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      INSERT INTO council_members (name, position, grade, image, bio, achievements, email, phone)
      VALUES (${name}, ${position}, ${grade}, ${image || "/placeholder.svg?height=300&width=300"}, ${bio}, ${JSON.stringify(achievements || [])}, ${email}, ${phone})
      RETURNING id, name, position, grade, image, bio, achievements, email, phone
    `

    return NextResponse.json({
      ...result[0],
      achievements: Array.isArray(result[0].achievements) ? result[0].achievements : [],
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create council member in database." }, { status: 500 })
  }
}
