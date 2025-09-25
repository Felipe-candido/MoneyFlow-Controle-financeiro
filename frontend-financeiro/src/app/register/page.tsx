"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, DollarSign } from "lucide-react"
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebase_app from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const auth = getAuth(firebase_app);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [ nome, setNome ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ error, setError ] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    try{
      // CADASTRAR NO FIREBASE AUTH
      console.log("Tentando cadastrar usuario no firebase auth")
      const userCredencial = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredencial.user;
      console.log("Usuário cadastrado no Firebase Auth:", user);
      
      // SALVAR PERFIL NO BACKEND (NO BANCO FIRESTORE)
      console.log("Tentando salvar perfil do usuario no Firestore via backend");
      // PEGA O TOKEN JWT DO USUARIO LOGADO
      const token = await user.getIdToken()
      
      const response = await axios.post("http://localhost:3000/users/profile", 
        { nome: nome},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )
      console.log("Perfil do usuário salvo no Firestore:", response.data);
      
      // REDIRECIONA PARA A PAGINA DE DASHBOARD
      router.push('/dashboard');
    }
    
    catch (err: any) {
      // Tratamento de Erros
      console.error("Erro durante o cadastro:", err);

      // Personaliza a mensagem de erro para o usuário
      if (err.code === 'auth/email-already-in-use') {
          setError('Este email já está em uso.');
      } else if (err.code === 'auth/weak-password') {
          setError('A senha deve ter no mínimo 6 caracteres.');
      } else {
          setError('Ocorreu um erro ao criar a conta. Tente novamente.');
      }
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-balance">Create your account</h1>
          <p className="text-muted-foreground mt-2">Start managing your finances today</p>
        </div>

        <Card className="border-border/50 shadow-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl">Sign up</CardTitle>
            <CardDescription>Create a new account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11">
                Criar conta
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Ja tem uma conta? </span>
              <Link href="/login" className="text-accent hover:text-accent/80 font-medium">
                Faça login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
