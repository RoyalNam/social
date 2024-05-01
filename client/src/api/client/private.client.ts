import axios, { AxiosRequestHeaders } from 'axios';
import queryString from 'query-string';

// export const baseURL = 'https://social-api-blush.vercel.app';
export const baseURL = 'http://localhost:5000';
export const clientBaseURL = 'http://localhost:3000';

const privateClient = axios.create({
    baseURL: `${baseURL}/api`,
    paramsSerializer: (params) => queryString.stringify(params),
});

privateClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
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
