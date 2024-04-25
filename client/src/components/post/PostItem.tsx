import React, { useEffect, useState } from 'react';
import { BsBookmark, BsChat, BsHeart, BsHeartFill, BsSend, BsThreeDots } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { countComments, formatNumber } from '@/utils';
import { timeAgoFromPast } from '@/utils';
import Modal from '../Modal';
import { MinimalUser, PostProps } from '@/types';
import { useAuthContextProvider } from '@/context/user';
import { fetchUsersBasicInfoById, followUser, toggleLikePost, unFollower } from '@/api';
import PostDetail from './PostDetail';

interface PostItemProps {
    postData: PostProps;
    isShowImg?: boolean;
    updatePost: (post: PostProps) => void;
}

const PostItem: React.FC<PostItemProps> = ({ postData, isShowImg = true, updatePost }) => {
    const { user: userAuth, updateUser } = useAuthContextProvider();
    const { author, post } = postData;
    const router = useRouter();
    const [isShowMores, setShowMores] = useState(false);
    const [usersLike, setUsersLike] = useState<MinimalUser[]>([]);
    const [isShow, setShow] = useState(false);

    useEffect(() => {}, [userAuth]);

    const handleLikePost = async () => {
        try {
            if (postData) {
                const userLikePost = await toggleLikePost({ userId: author._id, postId: post._id });
                if (userLikePost) {
                    const updatedPost = {
                        ...post,
                        likes: userLikePost.isLiked
                            ? [...post.likes, author._id]
                            : post.likes.filter((id) => id !== author._id),
                    };
                    updatePost({ ...postData, post: updatedPost });
                }
            }
        } catch (err) {
            throw err;
        }
    };

    const handleFollowing = async () => {
        try {
            if (userAuth) {
                let following;

                if (userAuth?.following.includes(author._id))
                    following = await unFollower({ authId: userAuth._id, userId: author._id });
                else following = await followUser({ authId: userAuth._id, userId: author._id });
                const updatedUser = { ...userAuth };

                if (following.isFollowing) {
                    updatedUser.following.push(author._id);
                } else {
                    updatedUser.following = updatedUser.following.filter((id) => id !== author._id);
                }
                updateUser(updatedUser);
                setShowMores(false);
            }
        } catch (err) {
            throw err;
        }
    };
    const redirectUserProfile = () => router.push(`/profile/${author._id}`);

    const fetchUsersLike = async () => {
        const userData = await fetchUsersBasicInfoById(post.likes);
        if (userData && userData.length > 0) {
            setUsersLike(userData.filter((user) => user !== null) as MinimalUser[]);
        }
    };
    const MORES = [
        {
            tit: userAuth?.following.includes(author._id) ? 'UnFollow' : 'Follow',
            onclick: handleFollowing,
        },
        {
            tit: 'Go to post',
            onclick: () => {
                setShowMores(false);
                setShow(true);
            },
        },
        {
            tit: 'Share',
            onclick: () => setShowMores(false),
        },
        {
            tit: 'About this account',
            onclick: () => {
                setShowMores(false);
                redirectUserProfile();
            },
        },
        {
            tit: 'Cancel',
            onclick: () => setShowMores(false),
        },
    ];
    const renderUserInfo = (
        <>
            <div className="flex justify-between items-center">
                <div className="flex items-start gap-2">
                    <img
                        src={author.avatar ?? '/user.png'}
                        alt=""
                        className="w-12 rounded-full h-12 cursor-pointer"
                        onClick={redirectUserProfile}
                    />
                    <div className="flex flex-col">
                        <div className="flex gap-4">
                            <h4 className="hover:underline cursor-pointer font-semibold" onClick={redirectUserProfile}>
                                {author.name}
                            </h4>
                            {!userAuth?.following.includes(author._id) && (
                                <button className="text-blue-400 relative font-medium" onClick={handleFollowing}>
                                    Follow
                                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-white"></span>
                                </button>
                            )}
                        </div>
                        <span className="text-xs leading-3 opacity-75">
                            {timeAgoFromPast(new Date(post.post_date))}
                        </span>
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
                            className={`${
                                item.tit == 'UnFollow' && 'text-red-500'
                            } border-b border-black/300 dark:border-white/20 py-3 last:border-none`}
                        >
                            {item.tit}
                        </button>
                    ))}
                </div>
            </Modal>
        </>
    );
    return (
        post && (
            <>
                <div className="border-b border-black/30 dark:border-white/20 py-4">
                    <div>
                        {renderUserInfo}
                        {isShowImg && <img src={post.image_url} alt="" loading="lazy" className="w-full max-h my-2" />}
                        <pre className="text-wrap font-sans leading-5">{post.caption}</pre>
                        <div className="text-2xl flex justify-between mt-2">
                            <div className="flex gap-4">
                                <div className="flex gap-1">
                                    <button onClick={handleLikePost}>
                                        {userAuth && postData.post.likes.includes(userAuth?._id) ? (
                                            <BsHeartFill className="text-red-600" />
                                        ) : (
                                            <BsHeart />
                                        )}
                                    </button>
                                    <span className="text-base hover:underline" onClick={fetchUsersLike}>
                                        {formatNumber(post.likes.length)}
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <button title="Comment" onClick={() => setShow(true)}>
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
                <Modal show={usersLike.length > 0 && post.likes.length > 0} onClose={() => setUsersLike([])}>
                    <div className="w-96 z-50 flex flex-col bg-primary rounded overflow-hidden">
                        {usersLike &&
                            usersLike.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex gap-1 items-center py-1.5 px-2 hover:bg-white/15 cursor-pointer"
                                    onClick={() => router.push(`/profile/${item._id}`)}
                                >
                                    <img
                                        src={item.avatar ?? 'user.png'}
                                        alt=""
                                        className="w-8 h-8 rounded-full line-clamp-1"
                                    />
                                    <span className="">{item.name}</span>
                                </div>
                            ))}
                    </div>
                </Modal>
                {isShow && (
                    <PostDetail postData={postData} updatePost={updatePost} closePostDetail={() => setShow(false)} />
                )}
            </>
        )
    );
};

export default PostItem;
