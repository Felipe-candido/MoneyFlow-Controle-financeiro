"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const expenseData = [
  { category: "Food & Dining", amount: 847, color: "hsl(var(--chart-1))" },
  { category: "Groceries", amount: 623, color: "hsl(var(--chart-2))" },
  { category: "Transportation", amount: 456, color: "hsl(var(--chart-3))" },
  { category: "Utilities", amount: 289, color: "hsl(var(--chart-4))" },
  { category: "Entertainment", amount: 234, color: "hsl(var(--chart-5))" },
  { category: "Other", amount: 398, color: "hsl(var(--muted-foreground))" },
]

export function ExpenseBreakdownChart() {
  const total = expenseData.reduce((sum, item) => sum + item.amount, 0)

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Expense Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="flex-1">
            <ChartContainer
              config={{
                amount: {
                  label: "Amount",
                },
              }}
              className="h-[200px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={<ChartTooltipContent />}
                    formatter={(value, name, props) => [`$${Number(value).toLocaleString()}`, props.payload.category]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="flex-1 space-y-2">
            {expenseData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.category}</span>
                </div>
                <div className="text-sm font-medium">
                  ${item.amount.toLocaleString()} ({((item.amount / total) * 100).toFixed(1)}%)
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
