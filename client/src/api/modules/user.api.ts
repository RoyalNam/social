import privateClient, { baseURL, clientBaseURL } from '../client/private.client';
import publicClient from '../client/public.client';

export const userEndpoint = {
    auth: {
        facebook: `${baseURL}/auth/facebook/`,
        google: `${baseURL}/auth/google/`,
        logout: `${baseURL}/auth/logout/`,
        local: `${baseURL}/auth/local/`,
        login_success: `${baseURL}/auth/login/success`,
        register: '/users',
    },
    user: ({ id }: { id: string }) => `/users/${id}`,
    basic_info: ({ id }: { id: string }) => `${userEndpoint.user({ id })}/basic_info`,
    suggested_user: ({ id }: { id: string }) => `${userEndpoint.user({ id })}/suggested_user`,
    notifications: ({ id }: { id: string }) => `${userEndpoint.user({ id })}/notifications`,
    search: ({ val }: { val: string }) => `/users?filter=name&value=${val}`,
};
const userApi = {
    loginLocal: async (formData: { username: string; password: string }) => {
        try {
            await privateClient.post(userEndpoint.auth.local, formData);
            return { success: true };
        } catch (error: any) {
            if (!error.response) {
                window.location.href = clientBaseURL;
                return;
            }
            return { success: false };
        }
    },
    loginSuccess: async () => {
        const resp = await privateClient.get(userEndpoint.auth.login_success);
        return resp;
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
    // pri
    getNotifications: async (id: string) => {
        const resp = await publicClient.get(userEndpoint.notifications({ id }));
        return resp.data;
    },
    searchUsers: async (val: string) => {
        const resp = await publicClient.get(userEndpoint.search({ val }));
        return resp.data;
    },
};

export default userApi;
