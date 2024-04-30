'use client';
import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/navbar';
import AuthLayout from '../AuthLayout';

const MainLayout: React.FC<{ children: React.ReactNode; fetchData?: () => void }> = ({ children, fetchData }) => {
    const mainRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (fetchData) {
            const handleScroll = async () => {
                const mainElement = mainRef.current;
                if (!mainElement) return;

                const scrollHeight = mainElement.scrollHeight;
                const scrollTop = mainElement.scrollTop;
                const clientHeight = mainElement.clientHeight;

                if (scrollTop + clientHeight >= scrollHeight - 50) {
                    fetchData();
                }
            };

            const mainElement = mainRef.current;
            if (mainElement) {
                mainElement.addEventListener('scroll', handleScroll);
            }

            return () => {
                if (mainElement) {
                    mainElement.removeEventListener('scroll', handleScroll);
                }
            };
        }
    }, [fetchData]);

    return (
        <AuthLayout>
            <div className="flex h-screen flex-col md:flex-row select-none">
                <Navbar />
                <main ref={mainRef} className="flex-1 overflow-y-auto scroll_thin">
                    <div className="mx-auto max-w-[935px] py-10 px-6 h-full">{children}</div>
                </main>
            </div>
        </AuthLayout>
    );
};

export default MainLayout;
