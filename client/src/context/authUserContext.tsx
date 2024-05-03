'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types';
import userApi from '@/api/modules/user.api';

interface AuthContextType {
    authUser: User | null;
    updateAuthUser: (updateAuthUser: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const router = useRouter();
    const memoizedUser = useMemo(() => authUser, [authUser]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await userApi.loginSuccess();
                if (response.status === 200) {
                    console.log('User logged in:', response.data.user);
                    setAuthUser(response.data.user);
                    router.push('/');
                } else {
                    router.push('/account/login');
                    throw new Error('Authentication failed!');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                router.push('/account/login');
            }
        };

        fetchData();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'authToken') {
                fetchData();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const updateAuthUser = (updatedUser: User) => {
        setAuthUser(updatedUser);
    };

    const contextValue: AuthContextType = {
        authUser: memoizedUser,
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
