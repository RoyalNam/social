import privateClient from '../client/private.client';

const followEndpoint = {
    follower: ({ followingId }: { followingId: string }) => `/followers/${followingId}`,
    following: ({ followingId }: { followingId: string }) => `/following/${followingId}`,
};

const followApi = {
    followUser: async ({ followingId }: { followingId: string }) => {
        const resp = await privateClient.post(followEndpoint.following({ followingId }));
        return resp.data;
    },
    unFollower: async ({ followingId }: { followingId: string }) => {
        const resp = await privateClient.delete(followEndpoint.following({ followingId }));
        return resp.data;
    },
};

export default followApi;
