'use client';
import React, { useEffect, useState } from 'react';
import MainLayout from './(main)/layout';
import { PostProps } from '@/types';
import PostDetail from '@/components/post/PostDetail';
import { fetchPosts } from '@/api';
import PostItem from '@/components/post/PostItem';

const Home = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [selectedPost, setSelectedPost] = useState<PostProps | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const posts = await fetchPosts();
                if (posts) setPosts(posts.posts);
            } catch (err) {
                throw err;
            }
        };
        fetchData();
    }, []);

    return (
        <MainLayout>
            {posts.length > 0 && (
                <div className="max-w-[472px] w-full">
                    {posts.map((item) => (
                        <div key={item.post._id}>
                            <PostItem
                                postData={{
                                    author: item.author,
                                    post: item.post,
                                }}
                                setSelectedPost={() => setSelectedPost(item)}
                            />
                        </div>
                    ))}
                </div>
            )}
            {selectedPost && <PostDetail postData={selectedPost} closePostDetail={() => setSelectedPost(null)} />}
        </MainLayout>
    );
};

export default Home;
