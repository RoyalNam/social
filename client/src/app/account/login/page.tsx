'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputCus from '@/components/InputCus';
import Link from 'next/link';
import SummaryAPI from '@/api';
import axios from 'axios';

const Login = () => {
    const router = useRouter();
    const [isErr, setErr] = useState(false);
    const initialData = {
        username: '',
        password: '',
    };
    const [formData, setFormData] = useState(initialData);
    const [inputErrors, setInputErrors] = useState(initialData);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        if (name == 'password')
            setInputErrors((prevErrors) => ({
                ...prevErrors,
                password: '',
            }));
    };
    const handleBlur = (value: string) => {
        setInputErrors((prevErrors) => ({
            ...prevErrors,
            password: validatePassword(value),
        }));
    };

    const validatePassword = (value: string) => {
        if (value.length < 8) return 'Password must be at least 8 characters long';
        return '';
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('data', formData);

        try {
            const response = await axios.post(SummaryAPI.accounts.local.url, formData, {
                withCredentials: true,
            });
        } catch (error) {
            setErr(true);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center flex-col gap-4">
                <form action="" method="post" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputCus
                        item={{
                            type: 'email',
                            placeholder: 'Email',
                            value: formData.username,
                            err: inputErrors.username,
                            onChange: (value) => handleInputChange('username', value),
                        }}
                    />
                    <InputCus
                        item={{
                            type: 'password',
                            placeholder: 'Password',
                            value: formData.password,
                            err: inputErrors.password,
                            onChange: (value) => handleInputChange('password', value),
                            onBlur: () => handleBlur(formData.password),
                        }}
                    />
                    <button className="underline font-medium text-lg my-2 transition ease-in-out scale-100 hover:scale-105">
                        Log In
                    </button>
                </form>
                <span className="text-sm">OR</span>
                <div className="flex justify-center gap-2">
                    <Link href={SummaryAPI.accounts.google.url}>
                        <img src="/icons8-google.svg" alt="" className="w-10" />
                    </Link>
                    <Link href={SummaryAPI.accounts.facebook.url}>
                        <img src="/icons8-facebook.svg" alt="" className="w-10" />
                    </Link>
                </div>
                {isErr && (
                    <span className="text-red-500 text-sm">
                        Sorry, your password was incorrect. Please double-check your password.
                    </span>
                )}
            </div>
            <div className="text-center">
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
