import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, description, image, category, author } = body

    if (!process.env.DATABASE_URL) {
      // Mock response for v0 preview or local development without DB
      const updatedActivity = {
        id: params.id,
        title,
        description,
        image,
        category,
        author,
        views: Math.floor(Math.random() * 500),
        createdAt: new Date().toISOString(),
      }
      return NextResponse.json(updatedActivity)
    }

    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      UPDATE activities
      SET title = ${title}, description = ${description}, image = ${image}, category = ${category}, author = ${author}, updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING id, title, description, image, category, author, views, created_at as "createdAt"
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update activity" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    if (!process.env.DATABASE_URL) {
      // Mock response for v0 preview or local development without DB
      return NextResponse.json({ message: "Activity deleted successfully (development mode)" })
    }

    const sql = neon(process.env.DATABASE_URL)
    const result = await sql`
      DELETE FROM activities
      WHERE id = ${params.id}
      RETURNING id
    `

    if (result.length === 0) {
      return NextResponse.json({ error: "Activity not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Activity deleted successfully" })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete activity" }, { status: 500 })
  }
}
