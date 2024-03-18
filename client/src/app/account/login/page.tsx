'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    return (
        <div className="flex flex-col gap-4 text-center">
            <CusInput type="email" placeholder="Email" />
            <CusInput type="password" placeholder="Password" />
            <span className="font-medium text-lg">Sign In</span>

            <div>
                <span>
                    No account -{' '}
                    <button className="opacity-50 hover:underline" onClick={() => router.push('/account/register')}>
                        Join now
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Login;
const CusInput = ({
    type = 'text',
    placeholder,
}: {
    type: 'text' | 'email' | 'password' | 'number';
    placeholder: string;
}) => <input type={type} placeholder={placeholder} className="bg-transparent border px-4 py-2 rounded-md min-w-80" />;
