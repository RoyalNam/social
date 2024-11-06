interface IMinimalUser {
    _id: string;
    name: string;
    avatar: string;
}

interface IUser {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    account?: {
        type: 'facebook' | 'google';
        account_id?: string;
    };
    password?: string;
    bio?: string;
    following: string[];
    followers: string[];
    posts: string[];
    save_post: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface IComment {
    _id: string;
    user_id: string;
    comment_text: string;
    replies: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

interface IConversation {
    _id: string;
    participants: string[];
    messages: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface IMessage {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
}

interface INotification {
    _id: string;
    type: 'like' | 'comment' | 'follow' | 'mention' | 'message';
    senderId: string;
    receiverId: string;
    postId?: string | null;
    commentId?: string | null;
    message?: string;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
}

interface IPost {
    _id: string;
    user_id: string;
    image_url?: string;
    caption?: string;
    comments: IComment[];
    likes: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface IUserActivity {
    _id: string;
    user_id: string;
    last_active: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type { IMinimalUser, IUser, IComment, IConversation, IMessage, INotification, IPost, IUserActivity };
