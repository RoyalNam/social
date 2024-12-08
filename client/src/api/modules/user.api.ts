import axios from 'axios';
import publicClient from '../client/public.client';
import { serverUrl } from '@/configs/config';
import privateClient from '../client/private.client';

export const userEndpoint = {
    auth: {
        facebook: `${serverUrl}/api/auth/facebook/`,
        google: `${serverUrl}/api/auth/google/`,
        logout: `${serverUrl}/api/auth/logout/`,
        local: `${serverUrl}/api/auth/local/`,
        login_success: `${serverUrl}/api/auth/login/success`,
        register: '/users',
    },
    user: ({ id }: { id: string }) => `/${id}`,
    basic_info: ({ id }: { id: string }) => `${userEndpoint.user({ id })}/basic_info`,
    suggested_user: ({ id }: { id: string }) => `${userEndpoint.user({ id })}/suggested_user`,
    notifications: ({ id }: { id: string }) => `${id}/notification`,
    markNotificationAsRead: ({ notiId }: { notiId: string }) => `/notification/${notiId}/read`,
    search: ({ val }: { val: string }) => `/users?filter=name&value=${val}`,
};
const userApi = {
    loginLocal: async (formData: { email: string; password: string }) => {
        try {
            const response = await publicClient.post(userEndpoint.auth.local, formData);
            if (response?.data?.token) {
                const userRes = await userApi.loginSuccess(response.data.token);
                if (userRes?.data) {
                    return { success: true, user: userRes.data };
                }
            }
            console.error('Invalid response structure or missing token.');
            return { success: false };
        } catch (error) {
            console.error('Error logging in locally:', error);
            return { success: false, error };
        }
    },
    logout: async () => {
        const resp = await publicClient.post(userEndpoint.auth.logout, {});
        return resp.data;
    },
    loginSuccess: async (token: string) => {
        try {
            localStorage.setItem('authToken', token);
            const resp = await axios.get(userEndpoint.auth.login_success, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            return resp;
        } catch (error) {
            console.error('Error in login success:', error);
            throw error;
        }
    },
    register: async (data: { name: string; email: string; password: string }) => {
        const resp = await publicClient.post(userEndpoint.auth.register, data);
        return resp.data;
    },
    getUserById: async (id: string) => {
        const resp = await publicClient.get(userEndpoint.user({ id }));
        return resp.data;
    },
    updateUser: async (id: string, data: any) => {
        const resp = await publicClient.put(userEndpoint.user({ id }), data);
        return resp.data;
    },
    deleteUser: async (id: string) => {
        const resp = await publicClient.delete(userEndpoint.user({ id }));
        return resp.data;
    },
    getBasicInfoById: async (id: string) => {
        const resp = await publicClient.get(userEndpoint.basic_info({ id }));
        return resp.data;
    },
    getBasicInfoByIds: async (ids: string[]) => {
        const promises = ids.map(async (id) => {
            try {
                const user = await userApi.getBasicInfoById(id);
                return user;
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        });
        const userData = await Promise.all(promises);
        return userData;
    },
    getSuggestedUsers: async (id: string) => {
        const resp = await publicClient.get(userEndpoint.suggested_user({ id }));
        return resp.data;
    },
    getNotifications: async (id: string) => {
        const resp = await publicClient.get(userEndpoint.notifications({ id }));
        return resp.data;
    },
    markNotificationAsRead: async (notiId: string) => {
        const resp = await privateClient.patch(userEndpoint.markNotificationAsRead({ notiId }));
        return resp.data;
    },
    searchUsers: async (val: string) => {
        const resp = await publicClient.get(userEndpoint.search({ val }));
        return resp.data;
    },
};

export default userApi;
