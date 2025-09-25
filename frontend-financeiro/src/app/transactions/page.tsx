"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AddTransactionModal } from "@/components/dashboard/add-transaction-modal"
import { Plus, Search, Filter, ArrowUpRight, ShoppingCart, Car, Home, Coffee } from "lucide-react"

const allTransactions = [
  {
    id: 1,
    type: "expense",
    category: "Groceries",
    description: "Whole Foods Market",
    amount: -127.5,
    date: "2024-01-15",
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: "income",
    category: "Salary",
    description: "Monthly Salary",
    amount: 5200.0,
    date: "2024-01-15",
    icon: ArrowUpRight,
  },
  {
    id: 3,
    type: "expense",
    category: "Transportation",
    description: "Gas Station",
    amount: -45.2,
    date: "2024-01-14",
    icon: Car,
  },
  {
    id: 4,
    type: "expense",
    category: "Utilities",
    description: "Electric Bill",
    amount: -89.3,
    date: "2024-01-13",
    icon: Home,
  },
  {
    id: 5,
    type: "expense",
    category: "Food & Dining",
    description: "Coffee Shop",
    amount: -12.5,
    date: "2024-01-13",
    icon: Coffee,
  },
  {
    id: 6,
    type: "expense",
    category: "Groceries",
    description: "Target",
    amount: -89.99,
    date: "2024-01-12",
    icon: ShoppingCart,
  },
  {
    id: 7,
    type: "expense",
    category: "Transportation",
    description: "Uber",
    amount: -23.45,
    date: "2024-01-11",
    icon: Car,
  },
  {
    id: 8,
    type: "income",
    category: "Freelance",
    description: "Web Design Project",
    amount: 850.0,
    date: "2024-01-10",
    icon: ArrowUpRight,
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"income" | "expense">("expense")

  const filteredTransactions = allTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleAddTransaction = (type: "income" | "expense") => {
    setModalType(type)
    setAddModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-balance">All Transactions</h1>
            <p className="text-muted-foreground">Manage and track your financial transactions</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button onClick={() => handleAddTransaction("income")} className="bg-accent hover:bg-accent/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Income
            </Button>
            <Button
              onClick={() => handleAddTransaction("expense")}
              variant="outline"
              className="border-destructive/20 hover:bg-destructive/5"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expenses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const Icon = transaction.icon
                const isIncome = transaction.type === "income"

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-lg ${
                          isIncome ? "bg-accent/10" : "bg-muted"
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${isIncome ? "text-accent" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {transaction.category}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-lg font-semibold ${isIncome ? "text-accent" : "text-foreground"}`}>
                      {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>

      <AddTransactionModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} type={modalType} />
    </div>
  )
}
