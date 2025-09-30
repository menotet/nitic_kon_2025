import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../types/User.d';

// Helper function to decode JWT
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT", e);
    return null;
  }
};


interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            const decodedUser = parseJwt(storedToken);
            if (decodedUser) {
                setUser(decodedUser);
            }
            setToken(storedToken);
        }
    }, []);

    const login = (newToken: string) => {
        const decodedUser = parseJwt(newToken);
        if (decodedUser) {
            setUser(decodedUser);
        }
        setToken(newToken);
        localStorage.setItem('authToken', newToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
