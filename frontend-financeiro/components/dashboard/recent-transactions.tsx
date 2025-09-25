import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ShoppingCart, Car, Home, Coffee } from "lucide-react"

const transactions = [
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
]

export function RecentTransactions() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => {
            const Icon = transaction.icon
            const isIncome = transaction.type === "income"

            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      isIncome ? "bg-accent/10" : "bg-muted"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isIncome ? "text-accent" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(transaction.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={`font-semibold ${isIncome ? "text-accent" : "text-foreground"}`}>
                  {isIncome ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
