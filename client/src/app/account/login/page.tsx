'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputCus from '@/components/InputCus';

const Login = () => {
    const router = useRouter();
    const initialData = {
        email: '',
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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="text-center">
            <form action="" method="post" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <InputCus
                    item={{
                        type: 'email',
                        placeholder: 'Email',
                        value: formData.email,
                        err: inputErrors.email,
                        onChange: (value) => handleInputChange('email', value),
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
                <button className="font-medium text-lg my-2 transition ease-in-out scale-100 hover:scale-105">
                    Sign In
                </button>
            </form>
            <div className="">
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
