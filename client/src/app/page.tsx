'use client';
import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';

import { Post } from '@/types';
import PostItem from '@/components/post/PostItem';
import SuggestedUsers from '@/components/SuggestedUsers';
import MainLayout from './MainLayout';
import { postApi } from '@/api/modules';

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        if (!fetchError) {
            getRandomPosts();
        }
    }, []);

    const getRandomPosts = async () => {
        try {
            setLoading(false);
            if (fetchingPosts || fetchError) return;

            setFetchingPosts(true);
            const previousPostIds = posts.map((post) => post._id);
            const newPosts = await postApi.getPosts(previousPostIds);
            if (newPosts && newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            }
        } catch (err) {
            console.error(err);
            setFetchError(true);
        } finally {
            setFetchingPosts(false);
            setLoading(true);
        }
    };

    const updatePost = async (post: Post) => {
        setPosts((prev) => prev.map((item) => (item._id === post._id ? post : item)));
    };

    return (
        <MainLayout fetchData={getRandomPosts}>
            <div className='flex gap-2'>
                <div className='max-w-[472px] w-full'>
                    {posts.length > 0 ? (
                        posts.map((item, idx) => (
                            <div key={idx}>
                                <PostItem postData={item} updatePost={updatePost} />
                            </div>
                        ))
                    ) : (
                        <div>No posts</div>
                    )}
                </div>
                <div className='flex-1 hidden lg:block'>
                    <SuggestedUsers />
                </div>
            </div>
        </MainLayout>
    );
};

export default Home;
