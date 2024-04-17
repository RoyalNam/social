export const NOTIFICATION_DATA = [
    {
        notification_id: 1,
        user_id: 1,
        type: 'friend_request',
        message: 'đã gửi yêu cầu kết bạn với bạn.',
        timestamp: '2024-04-13T08:00:00Z',
        destination: '/friend-requests',
    },
    {
        notification_id: 2,
        user_id: 2,
        type: 'like_post',
        message: 'đã thích bài viết của bạn.',
        timestamp: '2024-04-13T08:05:00Z',
        destination: '/posts/123',
    },
    {
        notification_id: 3,
        user_id: 3,
        type: 'comment_post',
        message: 'đã bình luận về bài viết của bạn.',
        timestamp: '2024-04-13T08:10:00Z',
        destination: '/posts/123#comments',
    },
    {
        notification_id: 4,
        user_id: 4,
        type: 'event_invite',
        message: 'đã mời bạn tham gia sự kiện.',
        timestamp: '2024-04-13T08:15:00Z',
        destination: '/events/456',
    },
    {
        notification_id: 5,
        user_id: 5,
        type: 'message',
        message: 'Bạn có một tin nhắn mới từ người dùng H.',
        timestamp: '2024-04-13T08:20:00Z',
        destination: '/messages',
    },
];

export interface Notification {
    notification_id: number;
    user_id: number;
    type: 'friend_request' | 'like_post' | 'comment_post' | 'event_invite' | 'message' | string;
    message: string;
    timestamp: Date;
    destination?: string;
}
