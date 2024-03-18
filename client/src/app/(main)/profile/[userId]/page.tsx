'use client';
import CreatePost from '@/components/CreatePost';
import { POST_DATA, USERS_DATA } from '@/data';
import React, { useState } from 'react';
import {
    BsBookmark,
    BsCamera,
    BsCameraFill,
    BsChat,
    BsChatDots,
    BsHeart,
    BsPersonWorkspace,
    BsPlayCircle,
    BsPlayCircleFill,
    BsPlus,
    BsTags,
    BsTagsFill,
    BsThreeDots,
} from 'react-icons/bs';

interface TabProps {
    icon: React.ReactNode;
    tit: string;
    actIcon: React.ReactNode;
}
const Profile = () => {
    const [tab, setTab] = useState('Posts');
    const [isShowCreatePost, setShowCreatePost] = useState(false);
    const USERS = USERS_DATA[0];

    const renderTap = (tabItem: TabProps) => (
        <button
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
    const TABS = [
        {
            icon: <BsCamera />,
            tit: 'Posts',
            actIcon: <BsCameraFill />,
        },
        {
            icon: <BsPlayCircle />,
            tit: 'Reels',
            actIcon: <BsPlayCircleFill />,
        },
        {
            icon: <BsTags />,
            tit: 'Tagged',
            actIcon: <BsTagsFill />,
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
    const handleCreate = () => {};
    return (
        <div>
            <div className="flex gap-8 border-b border-white/20 flex-col md:flex-row">
                <img src={USERS.avatar} alt="" className="hidden md:block w-36 h-36 rounded-full" />
                <div className="flex-1">
                    <div>
                        <div className="flex gap-3 justify-between">
                            <div className="flex gap-3">
                                <img src={USERS.avatar} alt="" className="block md:hidden w-12 h-12 rounded-full" />
                                <div>
                                    <h5>{USERS.name}</h5>
                                    <h4 className="text-sm cursor-pointer hover:underline">@{USERS.username}</h4>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center text-sm">
                                <button className="bg-white text-pink-500 px-5 py-2 font-semibold rounded-md">
                                    Follow
                                </button>
                                <button className="bg-pink-500 px-5 py-2 font-semibold rounded-md">Message</button>
                                <button title="More" className="p-2 rounded-md bg-slate-400">
                                    <BsThreeDots />
                                </button>
                            </div>
                        </div>
                        <pre className="text-sm my-2">{USERS.bio}</pre>
                    </div>
                    <ul className="flex gap-6 md:justify-start justify-around mt-8">
                        {renderInfo('posts', USERS.post_count)}
                        {renderInfo('following', USERS.following_count)}
                        {renderInfo('follower', USERS.follower_count)}
                    </ul>
                    <div className="flex my-8">
                        <div
                            className="text-center flex flex-col gap-1 cursor-pointer"
                            onClick={() => setShowCreatePost(true)}
                        >
                            <span className="p-1 border rounded-full text-black/30 dark:text-white/30">
                                <BsPlus className="text-5xl" />
                            </span>
                            <span>New</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="flex justify-center">{TABS.map((item) => renderTap(item))}</div>
                {tab == 'Posts' &&
                    (false ? (
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
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                                {POST_DATA.map((item) => (
                                    <div key={item.post_id} className="relative group">
                                        <img src={item.media_url} alt="" className="aspect-square object-cover" />
                                        <div className="absolute inset-0 hidden group-hover:flex items-center justify-center gap-3 bg-black/30 font-semibold">
                                            <div className="flex items-center gap-1">
                                                <BsHeart />
                                                <span>{item.like_count}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <BsChatDots />
                                                <span>{item.comment_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                {tab == 'Reels' && (
                    <div>
                        {renderEmptyInfoTab(
                            <BsPersonWorkspace />,
                            'Photos of you',
                            "When people tag you in photos, they'll appear here.",
                        )}
                    </div>
                )}
                {tab == 'Tagged' && (
                    <div>
                        {renderEmptyInfoTab(
                            <BsBookmark />,
                            'Save',
                            "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.",
                        )}
                    </div>
                )}
            </div>
            <CreatePost show={isShowCreatePost} setShow={() => setShowCreatePost(false)} />
        </div>
    );
};

export default Profile;
