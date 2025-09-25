// src/context/AuthContext.tsx
"use client"; // Este é um componente de cliente, pois usa hooks

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import firebase_app from '@/lib/firebase'; // Seu arquivo de config do Firebase


// Inicializa o serviço de autenticação do Firebase
const auth = getAuth(firebase_app);

// Define a "forma" do nosso contexto
interface AuthContextType {
    user: User | null;
}

// Cria o contexto com um valor inicial
export const AuthContext = createContext<AuthContextType>({ user: null });

// Cria um hook customizado para facilitar o uso do contexto
export const useAuth = () => useContext(AuthContext);

// Cria o componente "Provedor"
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged é um "ouvinte" do Firebase.
        // Ele executa a função callback sempre que o estado de auth muda (login, logout)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuário está logado
                setUser(user);
            } else {
                // Usuário está deslogado
                setUser(null);
            }
            // A verificação inicial terminou, podemos parar de mostrar o loading
            setLoading(false);
        });

        // Retorna a função de cleanup para "desligar" o ouvinte quando o componente for desmontado
        return () => unsubscribe();
    }, []);

    // Se estiver carregando, mostramos um spinner para evitar que a tela "pisque"
    // para a página de login antes da verificação terminar.
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading</div>;
    }

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}