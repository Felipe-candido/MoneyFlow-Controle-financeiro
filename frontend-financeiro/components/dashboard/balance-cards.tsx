import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@/src/context/AuthContext";
import { headers } from "next/headers";
import { formatCurrency } from "@/lib/formatters"

interface Balance{
  balance: number
  income: number
  expense: number
}


export function BalanceCards() {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long", year: "numeric" })
  const [ totalBalance, setTotalBalance ] = useState<Balance>()
  const { user } = useAuth()
  

  
  const fetchTotalBalance = async () => {
    try{
      const token = await user?.getIdToken()
      const response = await axios.get("http://localhost:3000/transactions/balance", {
        headers:{
          'Authorization': `Bearer ${token}`
        }
      })
      console.log("dados da busca do balanço: ", response.data)

      setTotalBalance(response.data)
    }
    catch (error){
      console.log('Erro ao buscar informações sobre balanço total', error)
    }
  }

  useEffect(() => {
    fetchTotalBalance()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo atual</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{ formatCurrency(totalBalance?.balance ?? 0) }</div>
          <p className="text-xs text-muted-foreground">+2.5% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastos {currentMonth}</CardTitle>
          <TrendingDown className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{ formatCurrency(totalBalance?.expense ?? 0) }</div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ganhos {currentMonth}</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-accent">{ formatCurrency(totalBalance?.income ?? 0) }</div>
          <p className="text-xs text-muted-foreground">+8% from last month</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Taxa de economia</CardTitle>
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
