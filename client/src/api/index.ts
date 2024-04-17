const SERVER_DOMAIN = 'http://localhost:3000';

const SummaryAPI = {
    accounts: {
        facebook: {
            url: `${SERVER_DOMAIN}/auth/facebook/`,
            method: 'get',
        },
        google: {
            url: `${SERVER_DOMAIN}/auth/google/`,
            method: 'get',
        },
        local: {
            url: `${SERVER_DOMAIN}/auth/local/`,
            method: 'post',
        },
    },
};
export default SummaryAPI;
