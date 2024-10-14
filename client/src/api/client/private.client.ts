import axios, { AxiosRequestHeaders } from 'axios';
import queryString from 'query-string';

export const baseURL = 'http://localhost:8080';

const privateClient = axios.create({
    baseURL: `${baseURL}/api`,
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
