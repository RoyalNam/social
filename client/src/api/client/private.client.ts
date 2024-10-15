import axios, { AxiosRequestHeaders } from 'axios';
import queryString from 'query-string';
import { serverUrl } from '@/configs/config';

const privateClient = axios.create({
    baseURL: `${serverUrl}/api`,
    paramsSerializer: (params) => queryString.stringify(params),
});

privateClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('authToken');
    console.log('token', token);

    if (!token) {
        throw new Error('Authentication token not found');
    }
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
