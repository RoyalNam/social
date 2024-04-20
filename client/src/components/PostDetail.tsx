import React, { useEffect, useState } from 'react';
import { BsArrowReturnRight, BsX } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import Modal from './Modal';
import RenderPost from './PostItem';
import axios from 'axios';
import { CommentProps, PostProps, Reply } from '@/types';

export interface PostDetailProps {
    postData: PostProps;
    closePostDetail: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ postData, closePostDetail }) => {
    const { author, post } = postData;
    const router = useRouter();
    const [comments, setComments] = useState<CommentProps[]>([]);

    const renderComment = (commentData: CommentProps) => {
        const { comment } = commentData;

        const renderReplies = (replies: Reply[]) => {
            if (!replies || replies.length === 0) return null;

            return replies.map((reply) => (
                <div className="ml-6" key={`${reply.user}-${reply.reply_text}`}>
                    <h4 className="font-semibold">{reply.user}</h4>
                    <p>{reply.reply_text}</p>
                    {/* Đệ quy để hiển thị các phản hồi của phản hồi */}
                    {renderReplies(reply.replies || [])}
                </div>
            ));
        };

        return (
            <div>
                <h4 className="font-semibold">{comment.user}</h4>
                <p>{comment.comment_text}</p>
                {renderReplies(comment.replies || [])}
            </div>
        );
    };

    return (
        postData && (
            <Modal show={postData != null} onClose={closePostDetail}>
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
                        <RenderPost postData={postData} setSelectedPost={() => {}} isShowImg={false} />
                        <div className="md:hidden flex items-center -mx-4">
                            <img
                                src={post.image_url}
                                alt=""
                                loading="lazy"
                                className="max-w-full max-h-full w-full h-auto object-cover"
                            />
                        </div>
                        {comments && (
                            <div className="border-b border-black/30 dark:border-white/20 py-4 my-3 flex-1 scroll_thin overflow-y-auto">
                                <div className="flex flex-col gap-4">{comments.map((item) => renderComment(item))}</div>
                            </div>
                        )}
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
        )
    );
};

export default PostDetail;
