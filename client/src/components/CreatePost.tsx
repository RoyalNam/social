'use client';
import React, { useRef, useState } from 'react';
import { BsImages } from 'react-icons/bs';

const CreatePost = ({ show = false, setShow }: { show: boolean; setShow: () => void }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [mediaURL, setMediaURL] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);

    const handleIconClick = () => {
        if (!mediaURL && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };
    const handleInput = (e: React.SyntheticEvent<HTMLDivElement>) => {
        const content = e.currentTarget.innerText;
        setContent(content);
    };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const selectedFile = event.target.files[0];
            const reader = new FileReader();
            console.log(event.target.files);

            reader.onload = (e) => {
                if (e.target) {
                    const imageUrl = e.target.result as string;
                    setMediaURL(imageUrl);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    return (
        show && (
            <div className="fixed inset-0 flex items-center justify-center z-20">
                <div onClick={setShow} className="absolute inset-0 z-10 bg-black/60 " />
                <div className="w-[450px] h-[560px] z-40 bg-primary flex flex-col py-2 px-4 rounded-xl">
                    <div className="border-b py-1 text-center relative">
                        <h5>Upload Photo</h5>
                        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-blue-400 font-bold hover:opacity-80">
                            Next
                        </button>
                    </div>
                    <div
                        onClick={handleIconClick}
                        className="flex-1 w-full flex items-center justify-center flex-col gap-2 cursor-pointer"
                    >
                        <BsImages className="text-4xl" />
                        <button>Select from computer</button>
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
            </div>
        )
    );
};

export default CreatePost;
