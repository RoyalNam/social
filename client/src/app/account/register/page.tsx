'use client';
import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import InputCus, { InputProps } from '@/components/InputCus';

const Register = () => {
    const router = useRouter();
    const initialData = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    };
    const [formData, setFormData] = useState(initialData);
    const [inputErrors, setInputErrors] = useState(initialData);

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        switch (name) {
            case 'fullName':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    fullName: validateFullName(value),
                }));
                break;

            case 'email':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    email: validateEmail(value),
                }));
                break;
            case 'password':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    password: '',
                }));
                break;
            case 'confirmPassword':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: '',
                }));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    };
    const validateFullName = (value: string) => {
        return '';
    };

    const validateEmail = (value: string) => {
        return '';
    };

    const validatePassword = (value: string) => {
        return '';
    };

    const validateConfirmPassword = (value: string, password: string) => {
        if (value != password) return 'Passwords do not match';
        return '';
    };
    const handleBlur = (name: string, value: string) => {
        switch (name) {
            case 'fullName':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    fullName: value.length < 8 ? 'FullName must be at least 8 characters long' : '',
                }));
                break;
            case 'password':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    password: value.length < 8 ? 'Password must be at least 8 characters long' : '',
                }));
                break;
            case 'confirmPassword':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: validateConfirmPassword(value, formData.password),
                }));
                break;

            default:
                break;
        }
    };

    const INPUTS: InputProps[] = [
        {
            placeholder: 'Full name',
            value: formData.fullName,
            err: inputErrors.fullName,
            onChange: (value) => handleInputChange('fullName', value),
            onBlur: () => handleBlur('fullName', formData.fullName),
        },
        {
            type: 'email',
            placeholder: 'Email',
            value: formData.email,
            err: inputErrors.email,
            onChange: (value) => handleInputChange('email', value),
        },
        {
            type: 'password',
            placeholder: 'Password',
            value: formData.password,
            err: inputErrors.password,
            onChange: (value) => handleInputChange('password', value),
            onBlur: () => handleBlur('password', formData.password),
        },
        {
            type: 'password',
            placeholder: 'Confirm Password',
            value: formData.confirmPassword,
            err: inputErrors.confirmPassword,
            onChange: (value) => handleInputChange('confirmPassword', value),
            onBlur: () => handleBlur('confirmPassword', formData.confirmPassword),
        },
    ];

    return (
        <div className="text-center">
            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4">
                {INPUTS.map((item, idx) => (
                    <InputCus key={idx} item={item} />
                ))}
                <button
                    type="submit"
                    className="font-medium text-lg my-2 transition ease-in-out scale-100 hover:scale-105"
                >
                    Get started
                </button>
            </form>
            <div>
                I have an account -{' '}
                <button className="opacity-50 hover:underline" onClick={() => router.push('/account/login')}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Register;
