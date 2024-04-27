'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { User } from '@/types';

interface AuthContextType {
    authUser: User | null;
    isAuthenticated: boolean;
    updateAuthUser: (updateAuthUser: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const memoizedUser = useMemo(() => authUser, [authUser]);

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
                        setAuthUser(response.data.user);
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

    const updateAuthUser = (updatedUser: User) => {
        setAuthUser(updatedUser);
    };

    const contextValue: AuthContextType = {
        authUser: memoizedUser,
        isAuthenticated,
        updateAuthUser,
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
