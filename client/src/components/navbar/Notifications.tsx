'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { timeAgoFromPast } from '@/utils';
import { IMinimalUser, INotification, IPost } from '@/types';
import { postApi, userApi } from '@/api/modules';
import PostDetail from '../post/PostDetail';

const Notifications = ({ notifications }: { notifications: INotification[] }) => {
    const router = useRouter();
    const [userMap, setUserMap] = useState<{ [userId: string]: IMinimalUser }>({});
    const [postMap, setPostMap] = useState<{ [postId: string]: IPost }>({});
    const [activePostId, setActivePostId] = useState<string | null>(null);

    const fetchUser = async (userId: string) => {
        if (!userMap[userId]) {
            const user = await userApi.getBasicInfoById(userId);
            setUserMap((prevMap) => ({ ...prevMap, [userId]: user }));
        }
    };

    const fetchPost = async (postId: string) => {
        if (!postMap[postId]) {
            const post = await postApi.getPostById(postId);
            setPostMap((prevMap) => ({ ...prevMap, [postId]: post }));
        }
    };

    const handleClick = async (notification: INotification) => {
        try {
            const noti = await userApi.markNotificationAsRead(notification._id);
            switch (notification.type) {
                case 'message':
                    router.push(`/messages/${notification.senderId}`);
                    break;
                case 'post':
                case 'comment':
                case 'like':
                    if (notification.postId) {
                        setActivePostId(notification.postId);
                        await fetchPost(notification.postId);
                    }
                    break;
                case 'follow':
                    router.push(`/profile/${notification.senderId}`);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error marking notification as read', error);
        }
    };

    useEffect(() => {}, [activePostId]);

    useEffect(() => {
        notifications.forEach((notification) => {
            if (!userMap[notification.senderId]) {
                fetchUser(notification.senderId);
            }
            if (
                (notification.type === 'comment' || notification.type === 'like' || notification.type === 'post') &&
                notification.postId
            ) {
                fetchPost(notification.postId);
            }
        });
    }, [notifications, userMap]);

    const renderNotification = (notification: INotification) => {
        const user = userMap[notification.senderId];

        return (
            <div
                key={notification._id}
                onClick={() => handleClick(notification)}
                className={`hover:bg-black/10 dark:hover:bg-white/30 flex gap-3 px-3 py-2 cursor-pointer rounded ${
                    notification.isRead ? '' : 'bg-black/5 dark:bg-white/20'
                }`}
            >
                {user ? (
                    <img src={user.avatar ?? '/user.png'} alt='' className='rounded-full w-12 h-12' />
                ) : (
                    <div className='w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full'></div>
                )}
                <div>
                    <span className='line-clamp-3'>{notification.message}</span>
                    <span className='text-blue-400 font-medium text-xs'>
                        {timeAgoFromPast(new Date(notification.updatedAt))}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className='h-full'>
            <h5 className='text-xl font-bold'>Notifications</h5>
            <div className='h-full overflow-y-auto text-sm my-3'>
                {notifications.length > 0 ? (
                    <div className='flex gap-2 flex-col pb-8'>
                        {notifications.map((notification) => renderNotification(notification))}
                    </div>
                ) : (
                    <div className='flex flex-col text-center justify-center items-center mt-12 gap-4'>
                        <span>Activity on your posts</span>
                        <span>When someone likes or comments on one of your posts, you&apos;ll see it here.</span>
                    </div>
                )}
            </div>

            {activePostId && postMap[activePostId] && (
                <PostDetail
                    postData={postMap[activePostId]}
                    updatePost={() => {}}
                    closePostDetail={() => {
                        setActivePostId(null);
                        console.log('PostDetail closed');
                    }}
                />
            )}
        </div>
    );
};

export default Notifications;
