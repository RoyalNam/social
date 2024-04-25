'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { User } from '@/types';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const memoizedUser = useMemo(() => user, [user]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isAuthenticated) {
                    const response = await axios.get('http://localhost:3000/auth/login/success', {
                        withCredentials: true,
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                    });
                    if (response.status === 200) {
                        console.log('User logged in:', response.data.user);
                        setUser(response.data.user);
                        setIsAuthenticated(true);
                    } else {
                        router.push('/account/login');
                        throw new Error('Authentication failed!');
                    }
                }
            } catch (error) {
                router.push('/account/login');
            }
        };

        fetchData();
    }, []);

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const contextValue: AuthContextType = {
        user: memoizedUser,
        isAuthenticated,
        updateUser,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

const useAuthContextProvider = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContextProvider must be used within an AuthContextProvider');
    }
    return context;
};

export { AuthContextProvider, useAuthContextProvider };
