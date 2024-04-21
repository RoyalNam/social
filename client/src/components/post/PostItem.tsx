import React, { useState } from 'react';
import { BsBookmark, BsChat, BsHeartFill, BsSend, BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { countComments, formatNumber } from '@/utils';
import { timeAgoFromPast } from '@/utils';
import Modal from '../Modal';
import { MinimalUser, PostProps } from '@/types';

interface PostItemProps {
    postData: PostProps;
    isShowImg?: boolean;
    setSelectedPost: () => void;
}

const PostItem: React.FC<PostItemProps> = ({ postData, isShowImg = true, setSelectedPost }) => {
    const { author, post } = postData;
    return (
        post && (
            <div className="border-b border-black/30 dark:border-white/20 py-4">
                <div>
                    <UserInfo minimalUser={author} post_date={new Date(post.post_date)} />
                    {isShowImg && <img src={post.image_url} alt="" loading="lazy" className="w-full max-h my-2" />}
                    <pre className="text-wrap font-sans leading-5">{post.caption}</pre>
                    <div className="text-2xl flex justify-between mt-2">
                        <div className="flex gap-4">
                            <div className="flex gap-1">
                                {/* <BsHeart /> */}
                                <BsHeartFill className="text-red-600" />
                                <span className="text-base">{formatNumber(post.likes.length)}</span>
                            </div>
                            <div className="flex gap-1">
                                <button title="Comment" onClick={setSelectedPost}>
                                    <BsChat />
                                </button>
                                <span className="text-base">{formatNumber(countComments(post.comments))}</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <button title="Share">
                                <BsSend />
                            </button>
                            <button title="Save">
                                <BsBookmark />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

const UserInfo = ({ minimalUser, post_date }: { minimalUser: MinimalUser; post_date: Date }) => {
    const router = useRouter();
    const [isShowMores, setShowMores] = useState(false);

    const redirectUserProfile = (userId: string) => router.push(`/profile/${userId}`);
    const MORES = [
        {
            tit: 'Follow',
            onclick: () => setShowMores(false),
        },
        {
            tit: 'Go to post',
            onclick: () => setShowMores(false),
        },
        {
            tit: 'Share',
            onclick: () => setShowMores(false),
        },
        {
            tit: 'About this account',
            onclick: () => setShowMores(false),
        },
        {
            tit: 'Cancel',
            onclick: () => setShowMores(false),
        },
    ];
    return (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-start gap-2">
                    <img
                        src={minimalUser.avatar}
                        alt=""
                        className="w-12 rounded-full h-12 cursor-pointer"
                        onClick={() => redirectUserProfile(minimalUser._id)}
                    />
                    <div className="flex flex-col">
                        <div className="flex gap-4">
                            <h4
                                className="hover:underline cursor-pointer font-semibold"
                                onClick={() => redirectUserProfile(minimalUser._id)}
                            >
                                {minimalUser.name}
                            </h4>
                            <button className="text-blue-400 relative font-medium">
                                Follow
                                <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white"></span>
                            </button>
                        </div>
                        <span className="text-xs leading-3 opacity-75">{timeAgoFromPast(post_date)}</span>
                    </div>
                </div>
                <button title="More" className="p-2" onClick={() => setShowMores(true)}>
                    <BsThreeDots className="text-xl" />
                </button>
            </div>
            <Modal show={isShowMores} onClose={() => setShowMores(false)}>
                <div className="text-center flex flex-col w-[400px] rounded-xl z-30 bg-primary">
                    {MORES.map((item) => (
                        <button
                            onClick={item.onclick}
                            key={item.tit}
                            className="border-b border-black/300 dark:border-white/20 py-3 last:border-none"
                        >
                            {item.tit}
                        </button>
                    ))}
                </div>
            </Modal>
        </>
    );
};

export default PostItem;
