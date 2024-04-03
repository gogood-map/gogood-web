import React, { createContext, useContext, useState } from 'react';

export type User = {
    name: string
    email: string
    picture: string
}

type AuthContextType = {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        return {
            user: null,
            login: () => { },
            logout: () => { },
        };
    }
    return context;
};

export function AuthProvider(props: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    const authContextValue: AuthContextType = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={authContextValue}>{props.children}</AuthContext.Provider>;
};