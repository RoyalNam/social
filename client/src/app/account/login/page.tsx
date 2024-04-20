'use client';
import React, { useEffect, useState } from 'react';
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
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const resp = await axios.post('http://localhost:3000/api/users', {
    //             name: 'John Doe',
    //             email: 'johnx1234@example.com',
    //             avatar: 'https://i.pinimg.com/564x/85/f0/55/85f055dbe68bf317b09dbc5d4ec89bd9.jpg',
    //             password: 'hashedpassword123',
    //             bio: 'Hello, I am John Doe!',
    //         });
    //         console.log(resp);
    //     };
    //     fetchData();
    // }, []);
    const handleInputChange = (name: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErr(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(SummaryAPI.auth.local, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } catch (error: any) {
            if (!error.response) window.location.href = 'http://localhost:3001/';
            setErr(true);
        }
    };
    const redirectToRegister = () => {
        router.push('/account/register');
    };
    return (
        <div className="flex flex-col gap-4">
            <button className="bg-red-500 p-4">HELLO</button>
            <div className="flex items-center flex-col gap-4">
                <form action="" method="post" onSubmit={handleSubmit} className="flex flex-col gap-8">
                    <InputCus
                        item={{
                            type: 'email',
                            placeholder: 'Email',
                            value: formData.username,
                            onChange: (value) => handleInputChange('username', value),
                        }}
                    />
                    <InputCus
                        item={{
                            type: 'password',
                            placeholder: 'Password',
                            value: formData.password,
                            onChange: (value) => handleInputChange('password', value),
                        }}
                    />
                    <button className="underline font-medium text-lg my-2 transition ease-in-out scale-100 hover:scale-105">
                        Log In
                    </button>
                </form>
                <span className="text-sm">OR</span>
                <div className="flex justify-center gap-2">
                    <Link href={SummaryAPI.auth.google}>
                        <img src="/icons8-google.svg" alt="" className="w-10" />
                    </Link>
                    <Link href={SummaryAPI.auth.facebook}>
                        <img src="/icons8-facebook.svg" alt="" className="w-10" />
                    </Link>
                </div>
                {isErr && (
                    <span className="text-red-500 text-sm">
                        Sorry, an error occurred during login. Please try again later.
                    </span>
                )}
            </div>
            <div className="text-center">
                <span>
                    No account -{' '}
                    <button className="opacity-50 hover:underline" onClick={redirectToRegister}>
                        Join now
                    </button>
                </span>
            </div>
        </div>
    );
};

export default Login;
