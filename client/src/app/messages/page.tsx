'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsCameraVideo, BsChatDots, BsInfoCircle, BsPencilSquare, BsSend, BsTelephone, BsX } from 'react-icons/bs';
import Modal from '@/components/Modal';
import { Message, MinimalUser } from '@/types';
import { fetchUsersBasicInfoById, getMessages, getUsersChat, sendMessage } from '@/api';
import { useAuthContextProvider } from '@/context/user';

const Messages = () => {
    const { user: userAuth } = useAuthContextProvider();
    const router = useRouter();
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isShowChatModel, setShowChatModel] = useState(false);
    const [usersToChat, setUsersToChat] = useState<MinimalUser[]>([]);
    const [userToChat, setUserToChat] = useState<MinimalUser | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersToChatData: string[] = await getUsersChat();
                if (usersToChatData && usersToChatData.length > 0) {
                    const userData = await fetchUsersBasicInfoById(usersToChatData);
                    if (userData && userData.length > 0)
                        setUsersToChat(userData.filter((user) => user !== null) as MinimalUser[]);
                }
            } catch (err) {
                throw err;
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userToChat) {
                    const messagesResp = await getMessages({ userToChatId: userToChat._id });
                    if (messagesResp) setMessages(messagesResp);
                }
            } catch (err) {
                throw err;
            }
        };
        fetchData();
    }, [userToChat]);

    const handleSendMessage = async () => {
        try {
            if (inputRef.current && inputRef.current.value.trim() != '' && userToChat) {
                const sendMsg = await sendMessage({ receiverId: userToChat._id, message: inputRef.current.value });
                if (sendMsg) {
                    setMessages((prev) => [...prev, sendMsg]);
                    inputRef.current.value = '';
                }
            }
        } catch (err) {
            throw err;
        }
    };

    const redirectUserProfile = (userId: string) => {
        router.push(`/profile/${userId}`);
    };
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
                usersToChat &&
                usersToChat.length > 0 && (
                    <div className="overflow-y-scroll scroll_thin h-full pb-8">
                        <div className="flex flex-col mt-4 items-center lg:items-start">
                            {usersToChat.map((item) => (
                                <div
                                    className="flex px-3 py-1.5 gap-2 hover:bg-black/20 dark:hover:bg-white/20 items-center cursor-pointer"
                                    key={item._id}
                                    onClick={() => setUserToChat(item)}
                                >
                                    <img
                                        src={item.avatar && '/user.png'}
                                        alt={item.name}
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
                )
            )}
        </div>
    );
    const renderContent = () => (
        <div className="flex-1 flex border-l">
            {!userToChat ? (
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
                            <img src={userToChat.avatar} alt="" className="rounded-full w-12 h-12 cursor-pointer" />
                            <div className="leading-4 ml-2 mt-2">
                                <h5 className="font-semibold">{userToChat.name}</h5>
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
                            <img src={userToChat.avatar} alt="" className="rounded-full w-16 h-16 cursor-pointer" />
                            <h5 className="font-semibold mt-1">{userToChat.name}</h5>
                            <button
                                className="font-semibold text-sm px-3 py-0.5 mt-2 bg-white/20 rounded"
                                onClick={() => redirectUserProfile(userToChat._id)}
                            >
                                View Profile
                            </button>
                        </div>
                        <div className="flex gap-6 flex-col justify-end">
                            {messages.map((message) => renderText(message))}
                        </div>
                    </div>

                    <div className="mb-4 relative mx-4 flex items-end rounded-3xl border dark:border-white/20 overflow-hidden">
                        <textarea
                            title="message input"
                            ref={inputRef}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSendMessage();
                                    e.preventDefault();
                                }
                            }}
                            onChange={(e) => {
                                const textarea = e.target;
                                if (textarea) {
                                    textarea.style.height = 'auto';
                                    textarea.style.height = textarea.scrollHeight + 'px';
                                }
                            }}
                            className="w-full pl-4 pr-8 py-1 scroll_thin max-h-24 bg-transparent outline-none"
                        ></textarea>

                        <button title="send" className="absolute right-2 p-2 bottom-3" onClick={handleSendMessage}>
                            <BsSend className="text-xl" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
    const renderText = (message: Message) => (
        <div key={message._id} className="flex">
            <pre
                className={`${
                    message.senderId == userAuth?._id ? 'ml-auto bg-blue-500' : 'mr-auto bg-black/10 dark:bg-white/20'
                } text-wrap leading-4 max-w-[60%] rounded-xl px-3 py-2`}
            >
                {message.message}
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
