'use client';
import React, { useEffect, useState } from 'react';
import { useAuthContextProvider } from '@/context/authUserContext';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const { authUser } = useAuthContextProvider();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authUser) setLoading(false);
    }, [authUser]);

    return !loading ? children : null;
};

export default AuthLayout;
