'use client';
import React, { useEffect, useState } from 'react';
import MainLayout from './(main)/layout';
import { PostProps } from '@/types';
import { fetchPosts } from '@/api';
import PostItem from '@/components/post/PostItem';
import SuggestedUsers from '@/components/SuggestedUsers';

const Home = () => {
    const [posts, setPosts] = useState<PostProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(false);

    useEffect(() => {
        getRandomPosts();
    }, []);

    const getRandomPosts = async () => {
        try {
            if (fetchingPosts) return;

            setFetchingPosts(true);
            const newPosts = await fetchPosts();
            console.log('new post', newPosts.posts);

            if (newPosts && newPosts.posts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts.posts]);
            }
        } catch (err) {
            throw err;
        } finally {
            setLoading(false);
            setFetchingPosts(false);
        }
    };

    const updatePost = async (post: PostProps) => {
        setPosts((prev) =>
            prev.map((item) => {
                if (item.post._id === post.post._id) return post;
                else return item;
            }),
        );
    };

    return (
        <MainLayout fetchData={getRandomPosts}>
            {!loading ? (
                <div className="flex">
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
                    <div className="flex-1 hidden lg:block">
                        <SuggestedUsers />
                    </div>
                </div>
            ) : null}
        </MainLayout>
    );
};

export default Home;
