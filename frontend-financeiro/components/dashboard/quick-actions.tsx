"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react'
import { AddTransactionModal } from "./add-transaction-modal"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const [incomeModalOpen, setIncomeModalOpen] = useState(false)
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const router = useRouter()

  return (
    <>
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => setIncomeModalOpen(true)}
            className="w-full justify-start h-12 bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-accent-foreground/10 rounded-lg mr-3">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            Add Income
          </Button>

          <Button
            onClick={() => setExpenseModalOpen(true)}
            variant="outline"
            className="w-full justify-start h-12 border-destructive/20 hover:bg-destructive/5 bg-transparent"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-destructive/10 rounded-lg mr-3">
              <ArrowDownRight className="w-4 h-4 text-destructive" />
            </div>
            Add Expense
          </Button>

          <Button
            onClick={() => router.push("transactions")}
            variant="outline"
            className="w-full justify-start h-12"
          >
            <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-lg mr-3">
              <DollarSign className="w-4 h-4 text-accent" />
            </div>
            Todas as transações
          </Button>


        </CardContent>
      </Card>

      <AddTransactionModal
        isOpen={incomeModalOpen}
        onClose={() => setIncomeModalOpen(false)}
        type="income"
      />

      <AddTransactionModal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        type="expense"
      />
    </>
  )
}
