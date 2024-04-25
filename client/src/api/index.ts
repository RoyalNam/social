import axios from 'axios';
const SERVER_DOMAIN = 'http://localhost:3000';

const SummaryAPI = {
    auth: {
        register: `${SERVER_DOMAIN}/api/users`,
        facebook: `${SERVER_DOMAIN}/auth/facebook/`,
        google: `${SERVER_DOMAIN}/auth/google/`,
        local: `${SERVER_DOMAIN}/auth/local/`,
        logout: `${SERVER_DOMAIN}/auth/logout/`,
    },
    user: `${SERVER_DOMAIN}/api/users`,
    post: `${SERVER_DOMAIN}/api/posts`,
    message: `${SERVER_DOMAIN}/api/message`,
    uploadImage: `${SERVER_DOMAIN}/api/uploadImage`,
};

const loginLocal = async (formData: { username: string; password: string }) => {
    try {
        await axios.post(SummaryAPI.auth.local, formData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return { success: true };
    } catch (error: any) {
        if (!error.response) {
            window.location.href = 'http://localhost:3001/';
            return;
        }
        return { success: false };
    }
};

const register = async (data: { name: string; email: string; password: string }) => {
    const registerResp = await axios.post(SummaryAPI.auth.register, data);
    return registerResp.data;
};

const fetchUserById = async (id: string) => {
    const resp = await axios.get(`${SummaryAPI.user}/${id}`);
    return resp.data;
};
const fetchUserBasicInfoById = async (id: string) => {
    const resp = await axios.get(`${SummaryAPI.user}/${id}/basic_info`);
    return resp.data;
};
const fetchUsersBasicInfoById = async (ids: string[]) => {
    const promises = ids.map(async (id) => {
        try {
            const user = await fetchUserBasicInfoById(id);
            return user;
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    });
    const userData = await Promise.all(promises);
    return userData;
};

const fetchPosts = async (numberOfPostsToShow = 10) => {
    const resp = await axios.get(`${SummaryAPI.post}?numberOfPostsToShow=${numberOfPostsToShow}`);
    return resp.data;
};

const createPost = async (data: any) => {
    const resp = await axios.post(SummaryAPI.post, data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return resp.data;
};

const fetchPostById = async (id: string) => {
    const resp = await axios.get(`${SummaryAPI.user}/${id}`);
    return resp.data;
};

const toggleLikePost = async ({ userId, postId }: { userId: string; postId: string }) => {
    const resp = await axios.post(`${SERVER_DOMAIN}/api/${userId}/posts/${postId}/like`, {}, { withCredentials: true });
    return resp.data;
};

const createComment = async ({ postId, data }: { postId: string; data: any }) => {
    const resp = await axios.post(`${SummaryAPI.post}/${postId}/comments/`, data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return resp.data;
};

const replyComment = async ({ postId, commentId, data }: { postId: string; commentId: string; data: any }) => {
    const resp = await axios.post(`${SummaryAPI.post}/${postId}/comments/${commentId}/replies`, data, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return resp.data;
};

const getUsersChat = async () => {
    const resp = await axios.get(SummaryAPI.message, { withCredentials: true });
    return resp.data;
};

const sendMessage = async ({ receiverId, message }: { receiverId: string; message: string }) => {
    const resp = await axios.post(
        `${SummaryAPI.message}/${receiverId}`,
        {
            message: message,
        },
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        },
    );
    return resp.data;
};
const getMessages = async ({ userToChatId }: { userToChatId: string }) => {
    const resp = await axios.get(`${SummaryAPI.message}/${userToChatId}`, {
        withCredentials: true,
    });
    return resp.data;
};

const uploadImage = async ({ formData }: { formData: FormData }) => {
    const resp = await axios.post(SummaryAPI.uploadImage, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return resp.data;
};

const addFollower = async ({ authId, userId }: { authId: string; userId: string }) => {
    const resp = await axios.post(`${SERVER_DOMAIN}/api/${authId}/followers/${userId}`);
    return resp.data;
};

const removeFollower = async ({ authId, userId }: { authId: string; userId: string }) => {
    const resp = await axios.delete(`${SERVER_DOMAIN}/api/${authId}/followers/${userId}`);
    return resp.data;
};

const followUser = async ({ authId, userId }: { authId: string; userId: string }) => {
    const resp = await axios.post(`${SERVER_DOMAIN}/api/${authId}/following/${userId}`, {}, { withCredentials: true });
    return resp.data;
};

const unFollower = async ({ authId, userId }: { authId: string; userId: string }) => {
    const resp = await axios.delete(`${SERVER_DOMAIN}/api/${authId}/following/${userId}`, { withCredentials: true });
    return resp.data;
};

export {
    loginLocal,
    register,
    fetchUserById,
    fetchPosts,
    createPost,
    fetchUserBasicInfoById,
    fetchUsersBasicInfoById,
    getUsersChat,
    sendMessage,
    getMessages,
    createComment,
    replyComment,
    uploadImage,
    toggleLikePost,
    addFollower,
    removeFollower,
    followUser,
    unFollower,
};

export default SummaryAPI;
