"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to dashboard for now, later we'll check authentication
    router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-2">Loading...</h1>
        <p className="text-muted-foreground">Redirecting to your dashboard</p>
      </div>
    </div>
  )
}
