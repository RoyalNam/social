'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const Register = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-4 text-center">
            <CusInput placeholder="Full name" />
            <CusInput placeholder="Username" />
            <CusInput type="email" placeholder="Email" />
            <CusInput type="password" placeholder="Password" />
            <CusInput type="password" placeholder="Password" />
            <span className="font-medium text-lg">Get started</span>

            <div>
                <span>
                    I have account -{' '}
                    <button className="opacity-50 hover:underline" onClick={() => router.push('/account/login')}>
                        Login
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Register;
const CusInput = ({
    type = 'text',
    placeholder,
}: {
    type?: 'text' | 'email' | 'password' | 'number';
    placeholder: string;
}) => (
    <input
        type={type}
        placeholder={placeholder}
        className="bg-transparent focus:border-blue-400 border px-4 py-2 rounded-md min-w-80 outline-none"
    />
);
