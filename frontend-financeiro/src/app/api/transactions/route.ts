import { type NextRequest, NextResponse } from "next/server"
import { createTransaction, getTransactionsByUserId } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    const transactions = await getTransactionsByUserId(Number.parseInt(userId))
    return NextResponse.json(transactions)
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, category_id, amount, description, transaction_date, type } = body

    if (!user_id || !category_id || !amount || !transaction_date || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const transaction = await createTransaction({
      user_id: Number.parseInt(user_id),
      category_id: Number.parseInt(category_id),
      amount: Number.parseFloat(amount),
      description: description || null,
      transaction_date,
      type,
    })

    return NextResponse.json(transaction, { status: 201 })
  } catch (error) {
    console.error("Error creating transaction:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
