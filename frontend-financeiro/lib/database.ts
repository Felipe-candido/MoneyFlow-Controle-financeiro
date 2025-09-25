// Database utility functions for the financial management app
// This would typically connect to your actual database (Supabase, Neon, etc.)

export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  type: "income" | "expense"
  color: string
  created_at: string
}

export interface Transaction {
  id: number
  user_id: number
  category_id: number
  amount: number
  description: string | null
  transaction_date: string
  type: "income" | "expense"
  created_at: string
  updated_at: string
  category?: Category
}

export interface TransactionWithCategory extends Transaction {
  category: Category
}

// Mock data functions - replace with actual database calls
export async function getTransactionsByUserId(userId: number): Promise<TransactionWithCategory[]> {
  // This would be replaced with actual database query
  return []
}

export async function createTransaction(
  transaction: Omit<Transaction, "id" | "created_at" | "updated_at">,
): Promise<Transaction> {
  // This would be replaced with actual database insert
  return {
    ...transaction,
    id: Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

export async function getCategories(type?: "income" | "expense"): Promise<Category[]> {
  // This would be replaced with actual database query
  const mockCategories: Category[] = [
    { id: 1, name: "Salary", type: "income", color: "#10B981", created_at: new Date().toISOString() },
    { id: 2, name: "Freelance", type: "income", color: "#059669", created_at: new Date().toISOString() },
    { id: 3, name: "Food & Dining", type: "expense", color: "#EF4444", created_at: new Date().toISOString() },
    { id: 4, name: "Groceries", type: "expense", color: "#F97316", created_at: new Date().toISOString() },
    { id: 5, name: "Transportation", type: "expense", color: "#EAB308", created_at: new Date().toISOString() },
  ]

  return type ? mockCategories.filter((cat) => cat.type === type) : mockCategories
}

export async function getUserBalance(userId: number): Promise<number> {
  // This would calculate the actual balance from transactions
  return 12847.5
}

export async function getMonthlyExpenses(userId: number, year: number, month: number): Promise<number> {
  // This would calculate monthly expenses from transactions
  return 2847.3
}

export async function getMonthlyIncome(userId: number, year: number, month: number): Promise<number> {
  // This would calculate monthly income from transactions
  return 5200.0
}
