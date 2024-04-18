export const createUserValidationSchema = {
    email: {
        notEmpty: true,
        isEmail: true,
        errorMessage: 'Email không hợp lệ',
    },
    name: {
        optional: true,
    },
    password: {
        errorMessage: 'Password phải có ít nhất 6 ký tự',
        isLength: {
            options: { min: 6 },
        },
        notEmpty: true,
    },
    avatar: {
        optional: true,
    },
    bio: {
        optional: true,
    },
    join_date: {
        optional: true,
        isISO8601: true,
        toDate: true,
    },
    following: {
        optional: true,
        isArray: true,
    },
    followers: {
        optional: true,
        isArray: true,
    },
    'posts.*.image_url': {
        optional: true,
        isURL: true,
        errorMessage: 'URL hình ảnh không hợp lệ',
    },
    'posts.*.caption': {
        optional: true,
    },
    'posts.*.post_date': {
        optional: true,
        isISO8601: true,
        toDate: true,
    },
    'posts.*.comments.*.comment_text': {
        optional: true,
    },
    'posts.*.comments.*.replies.*.comment_text': {
        optional: true,
    },
    tags: {
        optional: true,
        isArray: true,
    },
    'stories.*.story_url': {
        optional: true,
        isURL: true,
        errorMessage: 'URL truyện không hợp lệ',
    },
    'stories.*.story_date': {
        optional: true,
        isISO8601: true,
        toDate: true,
    },
    'stories.*.viewers': {
        optional: true,
        isArray: true,
    },
};
