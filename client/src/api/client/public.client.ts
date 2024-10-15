import axios, { AxiosRequestHeaders } from 'axios';
import queryString from 'query-string';
import { serverUrl } from '@/configs/config';

const publicClient = axios.create({
    baseURL: `${serverUrl}/api`,
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
