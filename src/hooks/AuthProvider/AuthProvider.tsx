import React, { createContext, useContext, useState } from 'react'

export type User = {
    id: number
    token?: string
    name: string
    email: string
    gender: string
    birthdate: string
    picture?: string
}

type AuthContextType = {
    user: User | null
    login: (userData: User, persistData: boolean) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        return {
            user: null,
            login: () => { },
            logout: () => { },
        }
    }
    return context
}

export function AuthProvider(props: { children: React.ReactNode }) {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user') || null
    const [user, setUser] = useState<User | null>(storedUser ? JSON.parse(storedUser) : null)

    const login = (userData: User, persistData: boolean) => {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        if (persistData) {
            localStorage.setItem('user', JSON.stringify(userData))
        } else {
            sessionStorage.setItem('user', JSON.stringify(userData))
        }
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('user')
        sessionStorage.removeItem('user')
        setUser(null)
    }

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
    }

    return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>
}
