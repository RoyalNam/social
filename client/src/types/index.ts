export interface Post {
    post_id: number;
    user_id: number;
    caption: string;
    post_date: Date;
    media_url: string;
    like_count: number;
    comment_count: number;
}
export interface Story {
    story_id: number;
    user_id: number;
    story_url: string;
    story_date: string;
}
export interface Comment {
    comment_id: number;
    post_id: number;
    parent_comment_id: number | null;
    comment_text: string;
    comment_date: Date;
}
export interface User {
    user_id: number;
    username: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    bio: string;
    join_date: Date;
    following_count: number;
    follower_count: number;
    post_count: number;
}
