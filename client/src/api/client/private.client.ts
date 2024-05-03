import axios, { AxiosRequestHeaders } from 'axios';
import queryString from 'query-string';

export const baseURL = 'https://social-api-wiwb.onrender.com';

const privateClient = axios.create({
    baseURL: `${baseURL}/api`,
    paramsSerializer: (params) => queryString.stringify(params),
});

privateClient.interceptors.request.use(async (config) => {
    let token = localStorage.getItem('authToken');
    console.log('token', token);

    if (!token) {
        const cookie = document.cookie;
        const tokenCookie = cookie ? cookie.split('; ').find((row) => row.startsWith('x-auth-cookie=')) : null;
        token = tokenCookie ? tokenCookie.split('=')[1] : null;

        if (token) {
            localStorage.setItem('authToken', token);
        }
    }

    if (!token) {
        throw new Error('Authentication token not found');
    }
    console.log('endtoken', token);

    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders,
    };
});

privateClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        throw err;
    },
);

export default privateClient;
