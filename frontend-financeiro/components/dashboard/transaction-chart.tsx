"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// Sample data for the last 30 days
const chartData = [
  { date: "Jan 1", income: 0, expenses: 45, balance: 12500 },
  { date: "Jan 2", income: 0, expenses: 23, balance: 12477 },
  { date: "Jan 3", income: 0, expenses: 67, balance: 12410 },
  { date: "Jan 4", income: 0, expenses: 89, balance: 12321 },
  { date: "Jan 5", income: 0, expenses: 34, balance: 12287 },
  { date: "Jan 6", income: 0, expenses: 56, balance: 12231 },
  { date: "Jan 7", income: 0, expenses: 78, balance: 12153 },
  { date: "Jan 8", income: 0, expenses: 45, balance: 12108 },
  { date: "Jan 9", income: 0, expenses: 123, balance: 11985 },
  { date: "Jan 10", income: 0, expenses: 67, balance: 11918 },
  { date: "Jan 11", income: 0, expenses: 89, balance: 11829 },
  { date: "Jan 12", income: 0, expenses: 34, balance: 11795 },
  { date: "Jan 13", income: 0, expenses: 101, balance: 11694 },
  { date: "Jan 14", income: 0, expenses: 45, balance: 11649 },
  { date: "Jan 15", income: 5200, expenses: 127, balance: 16722 },
  { date: "Jan 16", income: 0, expenses: 56, balance: 16666 },
  { date: "Jan 17", income: 0, expenses: 78, balance: 16588 },
  { date: "Jan 18", income: 0, expenses: 45, balance: 16543 },
  { date: "Jan 19", income: 0, expenses: 89, balance: 16454 },
  { date: "Jan 20", income: 0, expenses: 67, balance: 16387 },
  { date: "Jan 21", income: 0, expenses: 123, balance: 16264 },
  { date: "Jan 22", income: 0, expenses: 34, balance: 16230 },
  { date: "Jan 23", income: 0, expenses: 56, balance: 16174 },
  { date: "Jan 24", income: 0, expenses: 78, balance: 16096 },
  { date: "Jan 25", income: 0, expenses: 45, balance: 16051 },
  { date: "Jan 26", income: 0, expenses: 89, balance: 15962 },
  { date: "Jan 27", income: 0, expenses: 67, balance: 15895 },
  { date: "Jan 28", income: 0, expenses: 123, balance: 15772 },
  { date: "Jan 29", income: 0, expenses: 34, balance: 15738 },
  { date: "Jan 30", income: 0, expenses: 56, balance: 15682 },
]

export function TransactionChart() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Balance Overview</CardTitle>
        <CardDescription>Your account balance over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            balance: {
              label: "Balance",
              color: "hsl(var(--chart-1))",
            },
            income: {
              label: "Income",
              color: "hsl(var(--accent))",
            },
            expenses: {
              label: "Expenses",
              color: "hsl(var(--destructive))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
                className="text-muted-foreground"
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip
                content={<ChartTooltipContent />}
                formatter={(value, name) => [
                  `$${Number(value).toLocaleString()}`,
                  name === "balance" ? "Balance" : name === "income" ? "Income" : "Expenses",
                ]}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                fill="url(#balanceGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
