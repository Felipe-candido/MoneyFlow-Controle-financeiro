"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight, ShoppingCart, Car, Home, Coffee, Icon } from "lucide-react"
import { useState, useEffect, AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react"
import { useAuth } from "@/src/context/AuthContext";
import axios from "axios"


interface Transaction {
  id: number,
  type: string,
  category: string,
  description: string,
  amount: number,
  date: string,
}

export function RecentTransactions() {
  const [mes, setMes] = useState<string | null>(null)
  const [transactionList, setTransactionList] = useState<Transaction[]>([])
  const { user } = useAuth();
  if (!user) return null; // Garantir que o usuário está autenticado antes de renderizar o componente



  useEffect(() => {
    const agora = new Date();
    const formatada = agora.toLocaleDateString("pt-BR", {
      month: "long",
    });
    setMes(formatada);
  }, []);

  const getTransactionsMes = async () => {
    const token = await user.getIdToken()
    try{
      const response = await axios.get("http://localhost:3000/transactions/month", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      setTransactionList(response.data as Transaction[])
      console.log("Transações do mês:", response.data)
    }
    catch (error){
      console.error("Erro ao buscar transaçõess:", error)
    }
  }

  useEffect(() => {
    getTransactionsMes()
  }, [])


  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Recent Transactions -  { mes }</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactionList?.map((transaction) => {
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
