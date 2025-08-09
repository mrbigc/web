import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const activities = await sql`
      SELECT id, title, description, image, category, author, views, created_at as "createdAt"
      FROM activities 
      ORDER BY created_at DESC
    `

    return NextResponse.json(activities)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch activities from database." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, image, category, author } = body

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      INSERT INTO activities (title, description, image, category, author, views)
      VALUES (${title}, ${description}, ${image || "/placeholder.svg?height=300&width=400"}, ${category || "ทั่วไป"}, ${author || "ผู้ดูแลระบบ"}, 0)
      RETURNING id, title, description, image, category, author, views, created_at as "createdAt"
    `

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to create activity in database." }, { status: 500 })
  }
}
