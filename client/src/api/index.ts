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

export default SummaryAPI;
