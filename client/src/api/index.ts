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

export {
    loginLocal,
    register,
    fetchUserById,
    fetchPosts,
    createPost,
    fetchUserBasicInfoById,
    createComment,
    replyComment,
};

export default SummaryAPI;
