'use client';
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '@/api';
import { PostProps } from '@/types';
import PostTile from '@/components/post/PostTile';
import PostDetail from '@/components/post/PostDetail';

const Explore = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await fetchPosts();
                if (posts) {
                    setPosts(posts.posts);
                }
            } catch (err) {
                throw err;
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updatePost = async (post: PostProps) => {
        setPosts((prev) =>
            prev.map((item) => {
                if (item.post._id === post.post._id) return post;
                else return item;
            }),
        );
        setSelectedPost(post);
    };

    return !loading ? (
        <>
            <div className="w-full grid grid-cols-3 gap-1">
                {posts.map((item) => (
                    <div key={item.post._id}>
                        <PostTile post={item.post} setSelectedPost={() => setSelectedPost(item)} />
                    </div>
                ))}
            </div>
            {selectedPost && (
                <PostDetail
                    updatePost={updatePost}
                    postData={selectedPost}
                    closePostDetail={() => setSelectedPost(null)}
                />
            )}
        </>
    ) : null;
};

export default Explore;
