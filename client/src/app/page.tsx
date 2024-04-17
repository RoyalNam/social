'use client';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import MainLayout from './(main)/layout';
import { Post, Story } from '@/types';
import { POSTS_DATA } from '@/test/posts';
import PostDetail from '@/components/PostDetail';
import { STORIES_DATA } from '@/test/stories';
import RenderPost from '@/components/Post';
import Slider from 'react-slick';
import Modal from '@/components/Modal';
import CreatePost from '@/components/CreatePost';
import { BsPlus } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import SummaryAPI from '@/api';

const Home = () => {
    const router = useRouter();
    const [postsData, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setPosts(POSTS_DATA);
        };

        fetchData();
    }, []);
    const handleLogin = () => {
        return router.push(SummaryAPI.accounts.google.url);
    };
    return (
        <MainLayout>
            <button className="bg-red-500 p-4" onClick={handleLogin}>
                LogIn
            </button>

            <Stories />
            <div className="max-w-[472px] w-full">
                {postsData.map((item) => (
                    <div key={item.post_id}>
                        <RenderPost post={item} setSelectedPost={() => setSelectedPost(item)} />
                    </div>
                ))}
            </div>
            {selectedPost && <PostDetail post={selectedPost} closePostDetail={() => setSelectedPost(null)} />}
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
                    display: `${activeSlide >= STORIES_DATA.length - slidesToShow ? 'none' : 'block'}`,
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

    const renderStory = ({ story }: { story: Story }) => (
        <div key={story.story_id} className="">
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
        slidesToShow: slidesToShow,
        slidesToScroll: 3,
        beforeChange: (current: number, next: number) => {
            setOldSlide(current);
            setActiveSlide(next);
        },
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };
    const settings1 = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // beforeChange: (current: number, next: number) => {
        //     setOldSlide(current);
        //     setActiveSlide(next);
        // },
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
                    {STORIES_DATA.map((story) => renderStory({ story: story }))}
                </Slider>
            </div>
            <CreatePost show={isShowCreatePost} onClose={() => setShowCreatePost(false)} />

            {/* <Modal onClose={() => {}} show={true}>
                <div key={1} className="z-50 h-[calc(100vh-64px)]">
                    <img src={STORIES_DATA[8].story_url} alt="" className="w-auto h-full" />
                </div>
            </Modal> */}
        </>
    );
};
