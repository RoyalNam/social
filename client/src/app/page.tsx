'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MainLayout from './(main)/layout';
import { Post, Story } from '@/types';
import PostDetail from '@/components/PostDetail';
import RenderPost from '@/components/Post';
import Slider from 'react-slick';
import Modal from '@/components/Modal';
import CreatePost from '@/components/CreatePost';
import { BsPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import SummaryAPI from '@/api';
import Link from 'next/link';

const Home = () => {
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const postsRes = await axios.get('http://localhost:3000');
                setPosts(postsRes.data);
            } catch (err) {
                throw err;
            }
        };
        fetchData();
    }, []);

    return (
        <MainLayout>
            <Link href={SummaryAPI.accounts.facebook.url}>Login</Link>
            <Stories />

            {posts.length > 0 && (
                <div className="max-w-[472px] w-full">
                    {posts.map((item) => (
                        <div key={item._id}>
                            <RenderPost
                                post={item}
                                minimalUser={{
                                    _id: 'test',
                                    avatar: 'url',
                                    name: 'test',
                                }}
                                setSelectedPost={() => setSelectedPost(item)}
                            />
                        </div>
                    ))}
                </div>
            )}
            {selectedPost && (
                <PostDetail
                    post={selectedPost}
                    minimalUser={{
                        _id: 'test',
                        avatar: 'url',
                        name: 'test',
                    }}
                    closePostDetail={() => setSelectedPost(null)}
                />
            )}
        </MainLayout>
    );
};

export default Home;

const Stories = () => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const [slidesToShow, setSlidesToShow] = useState(0);
    const [oldSlide, setOldSlide] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [isShowCreatePost, setShowCreatePost] = useState(false);
    const [stories, setStories] = useState<Story[] | []>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storiesRes = await axios.get('http://localhost:3000');
                if (storiesRes) {
                    setStories(storiesRes.data);
                }
            } catch (error) {
                throw error;
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const sliderElement = sliderRef.current;
        const updateSlidesToShow = () => {
            if (sliderElement) {
                const slideWidth = sliderElement.offsetWidth;
                if (slideWidth) {
                    const calculatedSlidesToShow = Math.round(slideWidth / 90);
                    setSlidesToShow(calculatedSlidesToShow);
                }
            }
        };
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => {
            window.removeEventListener('resize', updateSlidesToShow);
        };
    }, []);

    const SampleNextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    display: `${activeSlide >= stories.length - slidesToShow ? 'none' : 'block'}`,
                }}
                onClick={onClick}
            />
        );
    };

    const SamplePrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: `${activeSlide === 0 ? 'none' : 'block'}` }}
                onClick={onClick}
            />
        );
    };

    const renderStory = (story: Story) => (
        <div key={story._id} className="">
            <div className="relative w-20 h-20 cursor-pointer shrink-0">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                <img src={story.story_url} alt="" className="rounded-full w-full h-full relative p-0.5" />
            </div>
        </div>
    );

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: Math.max(1, Math.min(slidesToShow, stories.length)),
        slidesToScroll: 3,
        beforeChange: (current: number, next: number) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    return (
        <>
            <div ref={sliderRef}>
                <Slider {...settings}>
                    <div>
                        <button
                            title="Create"
                            className="w-20 h-20 cursor-pointer border-2 dark:border-white border-black rounded-full flex items-center justify-center"
                            onClick={() => setShowCreatePost(true)}
                        >
                            <BsPlus className="text-5xl" />
                        </button>
                    </div>
                    {stories.length > 0 && stories.map((story) => renderStory(story))}
                </Slider>
            </div>
            <CreatePost show={isShowCreatePost} onClose={() => setShowCreatePost(false)} />
        </>
    );
};
