'use client';
import React, { useRef, useState } from 'react';
import { BsArrowLeft, BsImages, BsX } from 'react-icons/bs';
import { Post } from '@/types';
import { applyFilters } from '@/utils';
import Modal from './Modal';

interface RangeProps {
    tit: string;
    val: number;
}

const CreatePost = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [step, setStep] = useState<string[]>([]);
    const [stepsReverse, setStepsReverse] = useState(['caption', 'edit', 'upload_file']);
    const [isDiscard, setDiscard] = useState(false);
    const [post, setPost] = useState<Post>({
        user_id: 1,
        post_id: 1,
        caption: '',
        media_url: '',
        post_date: new Date(),
        like_count: 0,
        comment_count: 0,
    });
    const initialFilters = {
        brightness: 50,
        contrast: 50,
        saturate: 50,
        hue_rotate: 50,
        sepia: 0,
    };
    const [filters, setFilters] = useState(initialFilters);
    const FILTERS = [
        { tit: 'brightness', val: filters.brightness },
        { tit: 'contrast', val: filters.contrast },
        { tit: 'saturate', val: filters.saturate },
        { tit: 'hue rotate', val: filters.hue_rotate },
        { tit: 'sepia', val: filters.sepia },
    ];

    const handleIconClick = () => {
        if (!post?.media_url && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const mediaUrl = e.target.result as string;
                    setPost((prev) => ({
                        ...prev,
                        media_url: mediaUrl,
                    }));

                    const newStep = stepsReverse.pop();
                    if (newStep) setStep([newStep]);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleBack = () => {
        if (step[step.length - 1] === 'upload_file') setDiscard(true);
        else {
            const backStep = step.pop();
            setStep([...step]);
            stepsReverse.push(backStep || '');
        }
    };

    const handleNext = () => {
        const stepEnd = step[step.length - 1];
        if (stepEnd === 'caption') handleCreate();
        else {
            const newSteps = [...step, stepsReverse.pop() || ''];
            setStep(newSteps);
        }
    };

    const handleCreate = () => {
        if (post.media_url) {
            const filteredImgUrl = applyFilters(post.media_url, filters);
            setPost((prev) => ({ ...prev, media_url: filteredImgUrl }));
            console.log('post.media_url', post.media_url);
            console.log('filter', filters);
            handleResetDefaults();
        }
    };

    const handleResetSteps = () => {
        setFilters(initialFilters);
        const steps = step.reverse();
        setStepsReverse((prevStepsReverse) => [...prevStepsReverse, ...steps]);
        setStep([]);
        setPost((prev) => ({ ...prev, media_url: '' }));
    };
    const handleResetDefaults = () => {
        handleResetSteps();
        onClose();
    };
    const handleDiscardCreate = () => {
        setDiscard(false);
        handleResetDefaults();
    };

    const renderRange = ({ item }: { item: RangeProps }) => (
        <div key={item.tit} className="">
            <span className="capitalize font-extralight">{item.tit}</span>
            <input
                title={item.tit}
                type="range"
                name=""
                id=""
                className="w-full custom-range"
                max={100}
                min={0}
                value={item.val}
                onChange={(e) =>
                    setFilters((prev) => ({ ...prev, [item.tit.split(' ').join('_')]: Number(e.target.value) }))
                }
            />
        </div>
    );

    const stepsHandler = step.length > 1 && (
        <div className="w-full md:w-[300px]">
            {step[step.length - 1] === 'edit' && (
                <div className="p-4">
                    <strong className="py-2 block text-center text-xl">Filters</strong>
                    <div className="h-full flex gap-8 flex-col border-t py-6">
                        {FILTERS.map((item) => renderRange({ item: item }))}
                    </div>
                </div>
            )}
            {step[step.length - 1] === 'caption' && (
                <div className="p-3 bg-[#334155]">
                    <textarea
                        name=""
                        id=""
                        className="w-full min-h-[180px] max-h-[300px] bg-transparent outline-none"
                        placeholder="Write a caption..."
                    ></textarea>
                </div>
            )}
        </div>
    );

    return (
        <>
            <Modal
                show={show}
                onClose={() => {
                    post.media_url ? setDiscard(true) : onClose();
                }}
            >
                <div
                    className={`${
                        step.length > 1 ? 'w-full' : 'w-[615px]'
                    } max-w-[945px] m-4 z-40 bg-white dark:bg-primary flex flex-col rounded-xl overflow-hidden`}
                >
                    <div className="border-b border-black/30 dark:border-white/20 py-2 text-center flex justify-between px-4">
                        {post.media_url && (
                            <button title="Back" className="text-blue-400" onClick={handleBack}>
                                <BsArrowLeft className="text-xl" />
                            </button>
                        )}
                        {step.length < 2 ? (
                            <h5 className="flex-1">Upload Photo</h5>
                        ) : (
                            <h5 className="flex-1">{step[step.length - 1] === 'edit' ? 'Edit' : 'Permission'}</h5>
                        )}
                        {post.media_url && (
                            <button className="text-blue-400" onClick={handleNext}>
                                {step[step.length - 1] === 'caption' ? 'Share' : 'Next'}
                            </button>
                        )}
                    </div>
                    <div className="h-[640px]">
                        {post.media_url ? (
                            <div className="h-full flex flex-col md:flex-row">
                                <div className="flex-1 relative border-r border-black/30 dark:border-white/20">
                                    <img
                                        src={post.media_url}
                                        alt=""
                                        loading="lazy"
                                        style={{
                                            filter: `brightness(${filters.brightness / 100 + 0.5}) contrast(${
                                                filters.contrast / 100 + 0.5
                                            }) saturate(${filters.saturate + 50}%) hue-rotate(${
                                                (filters.hue_rotate - 50) * 3.6
                                            }deg) sepia(${filters.sepia}%)`,
                                        }}
                                        className="w-full h-full object-cover saturate-150"
                                    />
                                    <span
                                        className="absolute right-3 top-3 p-1 rounded-full bg-black/75 cursor-pointer"
                                        onClick={handleResetSteps}
                                    >
                                        <BsX className="text-2xl" />
                                    </span>
                                </div>
                                {stepsHandler}
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div
                                    onClick={handleIconClick}
                                    className="text-center flex items-center flex-col py-4 cursor-pointer"
                                >
                                    <BsImages className="text-4xl" />
                                    <button className="mt-8">Select from computer</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <input
                    type="file"
                    title="Media"
                    accept="image/*,video/*"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
            </Modal>
            <Modal show={isDiscard} onClose={() => setDiscard(false)}>
                <div className="z-50">
                    <div className="bg-primary w-96 text-center text-sm p-4 flex flex-col gap-2 rounded-xl">
                        <div className="py-4">
                            <h6 className="text-xl mb-1">Discard post?</h6>
                            <span>If you leave, your edits won't be saved.</span>
                        </div>
                        <button
                            className="text-red-500 py-3 border-y border-black/30 dark:border-white/20"
                            onClick={handleDiscardCreate}
                        >
                            Discard
                        </button>
                        <button className=" pt-1" onClick={() => setDiscard(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default CreatePost;
