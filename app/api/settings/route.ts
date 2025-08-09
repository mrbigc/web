import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)
    const settings = await sql`SELECT key, value FROM settings`

    const settingsObj = settings.reduce((acc: Record<string, string>, setting: any) => {
      acc[setting.key] = setting.value
      return acc
    }, {})

    return NextResponse.json(settingsObj)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch settings from database." }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Database URL is not configured." }, { status: 500 })
    }

    const sql = neon(process.env.DATABASE_URL)

    // Update or create settings
    for (const [key, value] of Object.entries(body)) {
      await sql`
        INSERT INTO settings (key, value) 
        VALUES (${key}, ${value as string})
        ON CONFLICT (key) 
        DO UPDATE SET value = ${value as string}
      `
    }

    return NextResponse.json({ message: "Settings updated successfully" })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update settings in database." }, { status: 500 })
  }
}
