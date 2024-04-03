import { COMMENTS_DATA } from '@/test/comments';
import { USERS_DATA } from '@/test/users';
import { Comment, User } from '@/types';

export const getUserInfoFromUserId = (user_id: number): User | undefined => {
    const userInfo = USERS_DATA.find((user) => user.user_id === user_id);
    return userInfo;
};
export const getCommentsFromPostId = (post_id: number): Comment[] => {
    const comments = COMMENTS_DATA.filter(
        (comment) => comment.post_id === post_id && comment.parent_comment_id == null,
    );
    return comments;
};
