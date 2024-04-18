import React, { useEffect, useState } from 'react';
import { BsArrowReturnRight, BsX } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import RenderPost from './Post';
import { Comment, MinimalUser, Post, User } from '@/types';
import axios from 'axios';

interface PostDetailProps {
    post: Post;
    minimalUser: MinimalUser;
    closePostDetail: () => void;
}
const PostDetail: React.FC<PostDetailProps> = ({ post, minimalUser, closePostDetail }) => {
    const router = useRouter();

    const renderComment = (comment: Comment) => {
        const [user, setUser] = useState<User | null>();
        useEffect(() => {
            const getUserById = async () => {
                try {
                    const userRes = await axios.get(`http://localhost:3000/users/${comment.user}`);
                    console.log('user');

                    setUser(userRes.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setUser(null);
                }
            };
            getUserById();
        }, []);

        return (
            user && (
                <div className="flex gap-2" key={comment._id}>
                    <img
                        src={user.avatar}
                        onClick={() => router.push(`/profile/${user._id}`)}
                        alt=""
                        loading="lazy"
                        className="w-10 h-10 rounded-full cursor-pointer"
                    />
                    <div className="">
                        <h4
                            className="cursor-pointer font-semibold"
                            onClick={() => router.push(`/profile/${user._id}`)}
                        >
                            {user.name}
                        </h4>
                        <pre className="text-wrap">{comment.comment_text}</pre>
                        <div className="flex gap-2 text-xs">
                            <button>Like</button>
                            <button>Reply</button>
                        </div>
                        <button className="text-xs inline-flex gap-0.5 items-center">
                            <BsArrowReturnRight />
                            <span>See more</span>
                        </button>
                    </div>
                </div>
            )
        );
    };

    return (
        <Modal show={post != null} onClose={closePostDetail}>
            <div className="z-40 relative bg-primary h-[calc(100vh-64px)] w-[calc(100vw-84px)] flex rounded-xl">
                <div className="hidden md:flex flex-1 items-center border-r">
                    <img
                        src={post.image_url}
                        alt=""
                        loading="lazy"
                        className="max-w-full max-h-full w-full h-auto object-cover"
                    />
                </div>
                <div className="w-full md:w-[400px] h-full pt-5 pb-3 px-4 flex flex-col">
                    <RenderPost post={post} minimalUser={minimalUser} setSelectedPost={() => {}} isShowImg={false} />
                    <div className="md:hidden flex items-center -mx-4">
                        <img
                            src={post.image_url}
                            alt=""
                            loading="lazy"
                            className="max-w-full max-h-full w-full h-auto object-cover"
                        />
                    </div>
                    <div className="border-b border-black/30 dark:border-white/20 py-4 my-3 flex-1 scroll_thin overflow-y-auto">
                        <div className="flex flex-col gap-4">{post.comments.map((item) => renderComment(item))}</div>
                    </div>
                    <div className="py-2 border rounded">
                        <input
                            type="text"
                            title="x"
                            placeholder="comments.."
                            className="w-full py-1 px-2 bg-transparent outline-none"
                        />
                    </div>
                </div>
                <button
                    title="Close"
                    className="text-xl absolute right-1 top-1 cursor-pointer bg-white/10 hover:bg-white/15 rounded-full"
                    onClick={closePostDetail}
                >
                    <BsX className="text-4xl" />
                </button>
            </div>
        </Modal>
    );
};

export default PostDetail;
