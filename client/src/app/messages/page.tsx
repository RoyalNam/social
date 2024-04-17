'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsCameraVideo, BsChatDots, BsInfoCircle, BsPencilSquare, BsTelephone, BsX } from 'react-icons/bs';
import Modal from '@/components/Modal';
import { USERS_DATA } from '@/test/users';

const Messages = () => {
    const router = useRouter();
    const [isShowChatModel, setShowChatModel] = useState(false);
    const CHAT_EXAMPLE = [
        {
            username: 'Alice',
            txt: 'Chào bạn! Bạn đã làm gì trong ngày hôm nay?',
            chat_date: new Date('2024-04-08T08:00:00'),
        },
        {
            username: 'Bob',
            txt: 'Chào Alice! Tôi đã đi làm và sau đó đi dạo trong công viên. Còn bạn?',
            chat_date: new Date('2024-04-08T08:05:00'),
        },
        {
            username: 'Alice',
            txt: 'Ân nhưng tôi đã ở nhà và làm việc từ xa. Có một số vấn đề cần giải quyết.',
            chat_date: new Date('2024-04-08T08:10:00'),
        },
        {
            username: 'Bob',
            txt: 'Hy vọng bạn sẽ giải quyết được chúng. Nếu bạn cần sự giúp đỡ, đừng ngần ngại nói với tôi.',
            chat_date: new Date('2024-04-08T08:15:00'),
        },
        {
            username: 'Alice',
            txt: 'Cảm ơn bạn. Tôi sẽ nhớ điều đó.',
            chat_date: new Date('2024-04-08T08:20:00'),
        },
        {
            username: 'Bob',
            txt: 'Không có vấn đề gì. Tôi luôn sẵn lòng giúp đỡ.',
            chat_date: new Date('2024-04-08T08:25:00'),
        },
        {
            username: 'Alice',
            txt: 'Điều này thực sự làm cho tôi cảm thấy yên tâm.',
            chat_date: new Date('2024-04-08T08:30:00'),
        },
        {
            username: 'Bob',
            txt: 'Đừng lo lắng. Chúng ta luôn ở đây để hỗ trợ lẫn nhau. Đừng lo lắng. Chúng ta luôn ở đây để hỗ trợ lẫn nhau. Đừng lo lắng. Chúng ta luôn ở đây để hỗ trợ lẫn nhau.',
            chat_date: new Date('2024-04-08T08:35:00'),
        },
    ];

    const renderSidebar = () => (
        <div className="w-28 lg:w-96 flex flex-col mt-8 select-none">
            <div className="inline-flex justify-between items-center px-4">
                <h4 className="font-bold hidden lg:block">Messages</h4>
                <button title="Create" className="p-2 mx-auto lg:mx-0" onClick={() => setShowChatModel(true)}>
                    <BsPencilSquare className="text-2xl" />
                </button>
            </div>
            {false ? (
                <div className="flex-1 flex justify-center items-center mr-2">
                    <span className="text-center text-sm">No messages found.</span>
                </div>
            ) : (
                <div className="overflow-y-scroll scroll_thin h-full pb-8">
                    <div className="flex flex-col mt-4 items-center lg:items-start">
                        {USERS_DATA.map((item) => (
                            <div
                                className="flex px-3 py-1.5 gap-2 hover:bg-black/20 dark:hover:bg-white/20 items-center cursor-pointer"
                                key={item.user_id}
                            >
                                <img
                                    src={item.avatar}
                                    alt={item.username}
                                    className="rounded-full w-14 h-14 object-cover"
                                />
                                <div className="hidden lg:block">
                                    <h5 className="font-semibold">{item.name}</h5>
                                    <span className="text-sm font-extralight line-clamp-1">
                                        Private photos and messages to a friend or group.
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
    const renderContent = () => (
        <div className="flex-1 flex border-l">
            {false ? (
                <div className="flex-1 flex h-full flex-col gap-2 justify-center items-center">
                    <span className="p-5 border-2 rounded-full block mb-6">
                        <BsChatDots className="text-5xl" />
                    </span>
                    <h5 className="font-semibold text-xl">Your messages</h5>
                    <span className="font-extralight text-sm text-center">
                        Private photos and messages to a friend or group.
                    </span>
                    <button
                        className="bg-blue-500 text-white font-medium text-sm px-4 py-1 rounded-md mt-2"
                        onClick={() => setShowChatModel(true)}
                    >
                        Send message
                    </button>
                </div>
            ) : (
                <div className=" flex-1 flex flex-col">
                    <div className="border-b border-black/30 dark:border-white/20 flex items-center justify-between px-4 py-2">
                        <div className="flex">
                            <img
                                src={USERS_DATA[0].avatar}
                                alt=""
                                className="rounded-full w-12 h-1w-12 cursor-pointer"
                            />
                            <div className="leading-4 ml-2 mt-2">
                                <h5 className="font-semibold">{USERS_DATA[0].name}</h5>
                                <span className="text-sm font-extralight">{'1h ago'}</span>
                            </div>
                        </div>
                        <div className="text-2xl flex">
                            <button title="Call" className="p-2">
                                <BsTelephone />
                            </button>
                            <button title="Call" className="p-2">
                                <BsCameraVideo />
                            </button>
                            <button title="Info" className="p-2">
                                <BsInfoCircle />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 p-4 overflow-y-scroll scroll_thin">
                        <div className="flex flex-col items-center text-center mb-8">
                            <img
                                src={USERS_DATA[0].avatar}
                                alt=""
                                className="rounded-full w-16 h-1w-16 cursor-pointer"
                            />
                            <div className="leading-4 mt-2">
                                <h5 className="font-semibold">{USERS_DATA[0].name}</h5>
                                <span className="text-sm font-extralight">@{USERS_DATA[0].username}</span>
                            </div>
                            <button
                                className="font-semibold text-sm px-3 py-0.5 mt-2 bg-white/20 rounded"
                                onClick={() => router.push(`profile/${USERS_DATA[0].username}`)}
                            >
                                View Profile
                            </button>
                        </div>
                        <div className="flex gap-6 flex-col justify-end">
                            {CHAT_EXAMPLE.map((item, idx) => renderText(idx, item.username == 'Bob', item.txt))}
                        </div>
                    </div>

                    <div className="mb-4 mx-4 rounded-3xl p-3 border dark:border-white/20 overflow-hidden">
                        <div
                            contentEditable={true}
                            className="resize-y w-full whitespace-pre-wrap break-words text-wrap scroll_thin overflow-y-auto max-h-32 bg-transparent outline-none"
                        />
                    </div>
                </div>
            )}
        </div>
    );
    const renderText = (idx: number, isMe: boolean, txt: string) => (
        <div key={idx} className="flex">
            <pre
                className={`${
                    isMe ? 'ml-auto bg-blue-500' : 'mr-auto bg-black/10 dark:bg-white/20'
                } text-wrap leading-4 max-w-[60%] rounded-xl px-3 py-2`}
            >
                {txt}
            </pre>
        </div>
    );

    return (
        <div className="flex h-full">
            {renderSidebar()}
            {renderContent()}
            <Modal show={isShowChatModel} onClose={() => setShowChatModel(false)}>
                <div className="z-50 rounded bg-primary w-[548px] h-[530px] flex flex-col p-4">
                    <div className="relative">
                        <h5 className="text-center pb-2 font-bold">New message</h5>
                        <button
                            title="Close"
                            className="absolute -right-2 top-1/2 -translate-y-1/2"
                            onClick={() => setShowChatModel(false)}
                        >
                            <BsX className="text-4xl" />
                        </button>
                    </div>
                    <div className="border-y dark:border-white/20 border-black/30 flex items-center -mx-3 px-3">
                        <span>To:</span>
                        <input
                            type="text"
                            title="To"
                            placeholder="Search..."
                            className="py-2 px-3 bg-transparent text-sm outline-none flex-1"
                        />
                    </div>
                    <div className="flex-1 overflow-y-scroll scroll_thin my-3">
                        <div className="h-screen">No account found</div>
                    </div>
                    <button className="bg-blue-500 w-full rounded-full py-2 font-semibold opacity-60">Chat</button>
                </div>
            </Modal>
        </div>
    );
};

export default Messages;
