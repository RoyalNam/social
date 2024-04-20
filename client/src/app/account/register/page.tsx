'use client';
import React, { FormEvent, useState } from 'react';
import InputCus, { InputProps } from '@/components/InputCus';
import axios from 'axios';
import SummaryAPI from '@/api';
import { useRouter } from 'next/navigation';

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
    const [err, setErr] = useState(false);
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
                    password: validatePassword(value),
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isFormValid = validateForm();
        if (isFormValid) {
            const data = {
                name: formData.fullName,
                email: formData.email,
                password: formData.password,
            };
            try {
                const create = await axios.post(SummaryAPI.auth.register, data);
                if (create.status === 201) {
                    redirectToLogin();
                } else {
                    setErr(true);
                }
            } catch (err) {
                setErr(true);
            }
        } else setErr(true);
    };

    const validateForm = () => {
        const fullNameError = validateFullName(formData.fullName);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

        setInputErrors({
            fullName: fullNameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError,
        });

        return !fullNameError && !emailError && !passwordError && !confirmPasswordError;
    };

    const validateFullName = (value: string) => {
        return value.length < 8 ? 'Full name must be at least 8 characters long' : '';
    };

    const validateEmail = (value: string) => {
        // Add email validation logic here
        return ''; // Placeholder
    };

    const validatePassword = (value: string) => {
        return value.length < 8 ? 'Password must be at least 8 characters long' : '';
    };

    const validateConfirmPassword = (value: string, password: string) => {
        return value !== password ? 'Passwords do not match' : '';
    };

    const handleBlur = (name: string, value: string) => {
        switch (name) {
            case 'fullName':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    fullName: validateFullName(value),
                }));
                break;
            case 'password':
                setInputErrors((prevErrors) => ({
                    ...prevErrors,
                    password: validatePassword(value),
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

    const redirectToLogin = () => {
        router.push('/account/login');
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
            <div>
                <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-8">
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
                {err && (
                    <span className="max-w-80 block text-red-500 text-sm text-center mb-4">
                        Sorry, there was an error processing your request. Please make sure all the information is
                        correct and try again.
                    </span>
                )}
            </div>

            <div>
                I have an account -{' '}
                <button className="opacity-50 hover:underline" onClick={redirectToLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Register;
