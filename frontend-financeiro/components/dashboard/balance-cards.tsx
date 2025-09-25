import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"

export function BalanceCards() {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,847.50</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{currentMonth} Expenses</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">$2,847.30</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{currentMonth} Income</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">$5,200.00</div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">45.2%</div>
          <p className="text-xs text-muted-foreground">+3.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  )
}
