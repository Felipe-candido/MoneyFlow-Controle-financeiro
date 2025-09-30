'use client'

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { BalanceCards } from "@/components/dashboard/balance-cards"
import { TransactionChart } from "@/components/dashboard/transaction-chart"
import { ExpenseBreakdownChart } from "@/components/dashboard/expense-breakdown-chart"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { useAuth } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "../login/page"


export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  

  useEffect(() => {
    if (!user) {
      // Se o usuário não estiver autenticado, redirecionar para a página de login
      router.push('/login')
    }
  }, [user, router]);
 
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <BalanceCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TransactionChart />
            <ExpenseBreakdownChart />
          </div>
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>
        <RecentTransactions />
      </main>
    </div>
  )
}
