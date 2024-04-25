'use client';
import React, { useEffect, useState } from 'react';
import MainLayout from './(main)/layout';
import { PostProps } from '@/types';
import PostDetail from '@/components/post/PostDetail';
import { fetchPosts } from '@/api';
import PostItem from '@/components/post/PostItem';

const Home = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await fetchPosts();
                if (posts) {
                    setPosts(posts.posts);
                    setLoading(false);
                }
            } catch (err) {
                throw err;
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
    };

    return (
        <MainLayout>
            {!loading ? (
                <div className="max-w-[472px] w-full">
                    {posts.map((item) => (
                        <div key={item.post._id}>
                            <PostItem
                                postData={{
                                    author: item.author,
                                    post: item.post,
                                }}
                                updatePost={updatePost}
                            />
                        </div>
                    ))}
                </div>
            ) : null}
        </MainLayout>
    );
};

export default Home;
