interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    account: {
        type: string;
        account_id: string;
    };
    password: string;
    bio: string;
    join_date: Date;
    following: string[];
    followers: string[];
    posts: Post[];
    tags: string[];
    stories: Story[];
}
interface MinimalUser {
    _id: string;
    name: string;
    avatar: string;
}

interface Post {
    _id: string;
    image_url: string;
    caption: string;
    post_date: Date;
    comments: Comment[];
    likes: string[];
}

interface Comment {
    _id: string;
    user: string;
    comment_text: string;
    comment_date: string;
    replies: Comment[];
}

interface Story {
    _id: string;
    story_url: string;
    story_date: Date;
    viewers: string[];
}

interface Tag {
    _id: string;
    name: string;
}
export interface PostProps {
    author: MinimalUser;
    post: Post;
}
export interface CommentProps {
    comment: Comment;
    author: MinimalUser;
}

export type { MinimalUser, User, Post, Comment, Story, Tag };
