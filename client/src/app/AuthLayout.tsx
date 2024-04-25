'use client';
import React, { useEffect, useState } from 'react';
import { useAuthContextProvider } from '@/context/user';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { user: auth } = useAuthContextProvider();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (auth) setLoading(false);
    }, [auth]);

    return !loading ? children : null;
};

export default AuthLayout;
