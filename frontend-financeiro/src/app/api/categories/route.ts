import { type NextRequest, NextResponse } from "next/server"
import { getCategories } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type") as "income" | "expense" | null

    const categories = await getCategories(type || undefined)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
