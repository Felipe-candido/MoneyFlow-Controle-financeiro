"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "@/src/context/AuthContext";
// Componentes da UI e Ícones
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, Settings, LogOut, User } from "lucide-react";
import firebase_app from "@/lib/firebase";

const auth = getAuth(firebase_app);

export function DashboardHeader() {
  const { user } = useAuth();
  const router = useRouter();
  
  // 1. Estado para controlar a visibilidade do menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Função de logout completa
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  // Efeito para fechar o menu ao clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <DollarSign className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">MoneyFlow</h1>
              <p className="text-sm text-muted-foreground">Gerenciamento de finanças pessoais</p>
            </div>
          </div>

          {/* Renderiza o perfil do usuário apenas se o usuário existir */}
          {user && (
            <div className="relative flex items-center space-x-4" ref={menuRef}>
              {/* 2. O Gatilho (Trigger) que alterna o estado do menu */}
              <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.displayName || "Usuário"}
                  </p>
                </div>
              </div>
              
              <Button
                onClick={() => setMenuOpen(!menuOpen)}
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || undefined} alt="User Avatar" />
                  <AvatarFallback>
                    {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>

              {/* 3. O conteúdo do menu, renderizado condicionalmente */}
              {menuOpen && (
                <div className="absolute top-12 right-0 w-56 bg-card border rounded-md shadow-lg z-50">
                  <div className="p-2">
                    <div className="px-2 py-1">
                      <p className="text-sm font-medium">{user.displayName || "Usuário"}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <hr className="my-2 border-border" />
                    <button className="w-full text-left flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted">
                      <User className="mr-2 h-4 w-4" />
                      <span>Perfil</span>
                    </button>
                    <button className="w-full text-left flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Configurações</span>
                    </button>
                    <hr className="my-2 border-border" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}