import axios, { AxiosRequestHeaders } from 'axios';
import queryString from 'query-string';

export const baseURL = 'http://localhost:8080';

const publicClient = axios.create({
    baseURL: `${baseURL}/api`,
    paramsSerializer: (params) => queryString.stringify(params),
});

publicClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
        } as AxiosRequestHeaders,
    };
});

publicClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (err) => {
        throw err;
    },
);

export default publicClient;
