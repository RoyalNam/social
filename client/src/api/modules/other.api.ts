import axios from 'axios';
import publicClient from '../client/public.client';
import { serverUrl } from '@/configs/config';

const endpoint = {
    user_activity: ({ userId }: { userId: string }) => `/activity/${userId}`,
    uploadImage: `${serverUrl}/api/uploadImage`,
};

const otherApi = {
    getUserActivity: async ({ userId }: { userId: string }) => {
        const resp = await publicClient.get(endpoint.user_activity({ userId }));
        return resp.data;
    },
    getUsersActivity: async (ids: string[]) => {
        const promises = ids.map(async (userId) => {
            try {
                const user = await otherApi.getUserActivity({ userId });
                return user;
            } catch (error) {
                console.error('Error fetching user data:', error);
                return null;
            }
        });
        const usersActivity = await Promise.all(promises);
        return usersActivity;
    },
    uploadImage: async ({ formData }: { formData: FormData }) => {
        const resp = await axios.post(endpoint.uploadImage, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return resp.data;
    },
};

export default otherApi;
