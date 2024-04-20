'use client';
import { User } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext<User | null>(null);

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

    return <AuthContext.Provider value={memoizedUser}>{children}</AuthContext.Provider>;
};

const useAuthContextProvider = (): User | null => {
    return useContext(AuthContext);
};

export { AuthContextProvider, useAuthContextProvider };
