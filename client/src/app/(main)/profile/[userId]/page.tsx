'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
    BsBookmark,
    BsBookmarkFill,
    BsCamera,
    BsCameraFill,
    BsChatDotsFill,
    BsHeartFill,
    BsPersonWorkspace,
    BsPlus,
    BsTags,
    BsTagsFill,
    BsThreeDots,
} from 'react-icons/bs';
import { formatNumber } from '@/utils';
import PostDetail from '@/components/PostDetail';
import CreatePost from '@/components/CreatePost';
import { useAuthContextProvider } from '@/context/user';
import { MinimalUser, Post, User } from '@/types';
import axios from 'axios';
import SummaryAPI from '@/api';

interface TabProps {
    icon: React.ReactNode;
    tit: string;
    actIcon: React.ReactNode;
}

const Profile = () => {
    const { userId } = useParams();
    const userAuth = useAuthContextProvider();
    const [tab, setTab] = useState('Posts');
    const [isShowCreatePost, setShowCreatePost] = useState(false);
    const [user, setUser] = useState<User | null>();
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            if (userId == userAuth?._id) {
                setUser(userAuth);
            } else {
                // const userRes = await axios.get(`${SummaryAPI.user}/${userId}`);
                const userRes = await axios.get(`${SummaryAPI.user}/6621d4b6b57a43c4720e705c`);
                if (userRes) setUser(userRes.data);
            }
        };
        fetchData();
    }, [userId, userAuth]);

    const renderTap = (tabItem: TabProps) => (
        <button
            key={tabItem.tit}
            className={`flex items-center gap-1 px-4 py-3 relative z-10 ${tab == tabItem.tit ? 'font-bold' : ''}`}
            onClick={() => setTab(tabItem.tit)}
        >
            <span className="text-2xl">{tab == tabItem.tit ? tabItem.actIcon : tabItem.icon}</span>
            <span>{tabItem.tit}</span>
            {tab == tabItem.tit && <span className="absolute inset-x-0 h-[1px] rounded-full top-0 bg-red-50"></span>}
        </button>
    );

    const renderInfo = (tit: string, count: number) => (
        <li className="inline-flex gap-1">
            <span className="font-semibold">{count}</span>
            <span>{tit}</span>
        </li>
    );
    const getMinimalUser = () => {
        if (user)
            return {
                _id: user._id,
                name: user.name,
                avatar: user.avatar,
            };
    };
    const TABS = [
        {
            icon: <BsCamera />,
            tit: 'Posts',
            actIcon: <BsCameraFill />,
        },
        {
            icon: <BsTags />,
            tit: 'Tagged',
            actIcon: <BsTagsFill />,
        },
        {
            icon: <BsBookmark />,
            tit: 'Saved',
            actIcon: <BsBookmarkFill />,
        },
    ];

    const renderEmptyInfoTab = (icon: React.ReactNode, tit: string, desc: string, onclick: () => void = () => {}) => (
        <div className="mx-12 mt-12">
            <div className="flex gap-4 flex-col items-center max-w-[380px] mx-auto">
                <div
                    className="text-4xl cursor-pointer rounded-full border p-4 border-current text-black/30 dark:text-white/30"
                    onClick={onclick}
                >
                    {icon}
                </div>
                <h5 className="text-3xl font-black">{tit}</h5>
                <span className="text-center text-sm">{desc}</span>
            </div>
        </div>
    );
    const handleCreate = () => setShowCreatePost(true);

    return (
        user && (
            <div>
                <div className="flex gap-8 border-b border-white/20 flex-col md:flex-row">
                    <img
                        src={user.avatar ?? '/user.png'}
                        alt=""
                        className="dark:bg-white hidden md:block w-36 h-36 rounded-full"
                    />
                    <div className="flex-1">
                        <div>
                            <div className="flex gap-3 justify-between">
                                <div className="flex gap-3">
                                    <img
                                        src={user.avatar ?? '/user.png'}
                                        alt=""
                                        className="dark:bg-white block md:hidden w-12 h-12 rounded-full"
                                    />
                                    <div>
                                        <h5>{user.name}</h5>
                                    </div>
                                </div>
                                {userId != userAuth?._id && (
                                    <div className="flex gap-4 items-center text-sm">
                                        <button className="bg-white text-pink-500 px-5 py-2 font-semibold rounded-md">
                                            Follow
                                        </button>
                                        <button className="bg-pink-500 px-5 py-2 font-semibold rounded-md">
                                            Message
                                        </button>
                                        <button title="More" className="p-2 rounded-md bg-slate-400">
                                            <BsThreeDots />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <pre className="text-sm my-2">{user.bio}</pre>
                        </div>
                        <ul className="flex gap-6 md:justify-start justify-around my-4">
                            {renderInfo('posts', user.posts.length)}
                            {renderInfo('following', user.following.length)}
                            {renderInfo('follower', user.followers.length)}
                        </ul>
                        {userId === userAuth?._id && (
                            <div className="flex mb-8">
                                <div className="text-center flex flex-col gap-1 cursor-pointer" onClick={handleCreate}>
                                    <span className="p-1 border rounded-full text-black/30 dark:text-white/30">
                                        <BsPlus className="text-5xl" />
                                    </span>
                                    <span>New</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <div className="flex justify-center">{TABS.map((item) => renderTap(item))}</div>
                    {tab == 'Posts' &&
                        (user.posts.length === 0 ? (
                            <div className="text-center mb-8">
                                {renderEmptyInfoTab(
                                    <BsCamera />,
                                    'Share photos',
                                    'When you share photos, they will appear on your profile.',
                                    handleCreate,
                                )}
                                <button className="text-blue-400 mt-4" onClick={handleCreate}>
                                    Share your first photo
                                </button>
                            </div>
                        ) : (
                            <div className="">
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-1">
                                    {user.posts.map((item) => (
                                        <div
                                            key={item._id}
                                            className="relative group cursor-pointer"
                                            onClick={() => setSelectedPost(item)}
                                        >
                                            <img
                                                src={item.image_url}
                                                alt=""
                                                loading="lazy"
                                                className="aspect-square object-cover"
                                            />
                                            <div className="absolute inset-0 hidden group-hover:flex items-center justify-center gap-3 bg-black/30 font-semibold">
                                                <div className="flex items-center gap-1">
                                                    <BsHeartFill />
                                                    <span>{formatNumber(item.likes.length)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <BsChatDotsFill />
                                                    <span>{formatNumber(item.comments.length)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    {tab == 'Tagged' && (
                        <div>
                            {renderEmptyInfoTab(
                                <BsPersonWorkspace />,
                                'Photos of you',
                                "When people tag you in photos, they'll appear here.",
                            )}
                        </div>
                    )}
                    {tab == 'Saved' && (
                        <div>
                            {renderEmptyInfoTab(
                                <BsBookmark />,
                                'Save',
                                "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.",
                            )}
                        </div>
                    )}
                </div>
                {selectedPost && (
                    <PostDetail
                        postData={{ post: selectedPost, author: getMinimalUser() as MinimalUser }}
                        closePostDetail={() => setSelectedPost(null)}
                    />
                )}
                <CreatePost show={isShowCreatePost} onClose={() => setShowCreatePost(false)} />
            </div>
        )
    );
};

export default Profile;
