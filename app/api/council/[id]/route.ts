import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { name, position, grade, image, bio, achievements, email, phone } = body

    if (!process.env.DATABASE_URL) {
      // Mock response for v0 preview or local development without DB
      const updatedMember = {
        id: params.id,
        name,
        position,
        grade,
        image,
        bio,
        achievements: achievements || [],
        email,
        phone,
        createdAt: new Date().toISOString(),
      }
      return NextResponse.json(updatedMember)
    }

    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      UPDATE council_members
      SET name = ${name}, position = ${position}, grade = ${grade}, image = ${image}, bio = ${bio}, achievements = ${JSON.stringify(achievements || [])}::jsonb, email = ${email}, phone = ${phone}, updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING id, name, position, grade, image, bio, achievements, email, phone
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Council member not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...result[0],
      achievements: Array.isArray(result[0].achievements) ? result[0].achievements : [],
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update council member" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!process.env.DATABASE_URL) {
      // Mock response for v0 preview or local development without DB
      return NextResponse.json({ message: "Council member deleted successfully (development mode)" })
    }

    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      DELETE FROM council_members
      WHERE id = ${params.id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Council member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Council member deleted successfully" })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete council member" }, { status: 500 })
  }
}
