'use client';
import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
    BsBell,
    BsBellFill,
    BsCameraVideo,
    BsCameraVideoFill,
    BsChatDots,
    BsChatDotsFill,
    BsCompass,
    BsCompassFill,
    BsHouse,
    BsHouseFill,
    BsPersonCircle,
    BsPlusCircle,
    BsSearch,
} from 'react-icons/bs';
import Search from './Search';
import Notifications from './Notifications';
import CreatePost from '../CreatePost';
import { useAuthContextProvider } from '@/context/user';

interface NavProps {
    tit: string;
    to?: string;
    icon: React.ReactNode;
    actIcon?: React.ReactNode;
    onclick?: () => void;
}

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const user = useAuthContextProvider();
    const [isShowSearch, setShowSearch] = useState(false);
    const [isShowNotifications, setShowNotifications] = useState(false);
    const [isShowCreatePost, setShowCreatePost] = useState(false);
    const NAV_LINK: NavProps[] = [
        {
            tit: 'Home',
            to: '/',
            icon: <BsHouse />,
            actIcon: <BsHouseFill />,
        },
        {
            tit: 'Search',
            icon: <BsSearch />,
            onclick: () => {
                if (isShowNotifications) setShowNotifications(false);
                setShowSearch(!isShowSearch);
            },
        },
        {
            tit: 'Explore',
            to: '/explore',
            icon: <BsCompass />,
            actIcon: <BsCompassFill />,
        },
        {
            tit: 'Messages',
            to: '/messages',
            icon: <BsChatDots />,
            actIcon: <BsChatDotsFill />,
        },
        {
            tit: 'Reels',
            to: '/reels',
            icon: <BsCameraVideo />,
            actIcon: <BsCameraVideoFill />,
        },
        {
            tit: 'Notifications',
            icon: <BsBell />,
            actIcon: <BsBellFill />,
            onclick: () => {
                if (isShowSearch) setShowSearch(false);
                setShowNotifications(!isShowNotifications);
            },
        },
        {
            tit: 'Create',
            icon: <BsPlusCircle />,
            onclick: () => setShowCreatePost(true),
        },
        {
            tit: 'Profile',
            to: `/profile/${user?._id}`,
            icon: <img src={user?.avatar ?? '/user.png'} alt="" className="rounded-full w-6 h-6" />,
            actIcon: <img src={user?.avatar ?? '/user.png'} alt="" className="rounded-full w-6 h-6" />,
        },
    ];

    const handleCloseSidebar = () => {
        if (isShowNotifications) setShowNotifications(false);
        if (isShowSearch) setShowSearch(false);
    };
    const renderNavItem = (item: NavProps) => {
        const isAct =
            item.to && ((pathname === '/' && item.to === '/') || (pathname.startsWith(item.to) && item.to !== '/'));

        return (
            <button
                title={item.tit}
                key={item.tit}
                onClick={
                    item.onclick
                        ? item.onclick
                        : () => {
                              handleCloseSidebar();
                              router.push(item.to as string);
                          }
                }
                className="flex gap-2 items-center px-3 py-1 md:py-3 rounded-xl hover:bg-transparent md:hover:bg-black/10 dark:md:hover:bg-white/10"
            >
                <span className="text-2xl">{isAct ? item.actIcon : item.icon}</span>
                <span className={`lg:block hidden ${isShowSearch || isShowNotifications ? '!hidden' : ''}`}>
                    {item.tit}
                </span>
            </button>
        );
    };

    const RenderSidebar = ({ children }: { children: React.ReactNode }) => (
        <div className="fixed inset-x-0 bottom-0 md:left-16 top-[49px] z-20 md:top-0">
            <div className="absolute inset-0" onClick={handleCloseSidebar} />
            <div className="md:w-[400px] h-full border-r p-4 border-black/30 dark:border-white/10 min-h-[20vh bg-white dark:bg-primary w-full relative z-40">
                {children}
            </div>
        </div>
    );
    return (
        <div
            className={`relative lg:w-60 w-full md:w-16 p-2 flex flex-col md:block border-b md:border-r border-black/30 dark:border-white/10 ${
                isShowSearch || isShowNotifications ? 'md:!w-16 !w-full' : ''
            }`}
        >
            <div
                onClick={() => {
                    handleCloseSidebar();
                    router.push('/');
                }}
                className="hidden md:block mb-6 py-2"
            >
                <h2
                    className={`hidden lg:block font-mono py-2 italic text-2xl px-3 ${
                        isShowSearch || isShowNotifications ? '!hidden' : ''
                    }`}
                >
                    Social
                </h2>
                <img
                    src="/logo.jpg"
                    alt=""
                    className={`block lg:hidden w-12 h-12 rounded-full ${
                        isShowSearch || isShowNotifications ? '!block' : ''
                    }`}
                />
            </div>
            <div className="flex-1 select-none flex flex-row justify-around md:flex-col gap-0 md:gap-2">
                {NAV_LINK.map((item: NavProps) => renderNavItem(item))}
            </div>
            <div className="hidden md:block">Setting</div>
            {isShowSearch && (
                <RenderSidebar>
                    <Search />
                </RenderSidebar>
            )}
            {isShowNotifications && (
                <RenderSidebar>
                    <Notifications />
                </RenderSidebar>
            )}
            <CreatePost show={isShowCreatePost} onClose={() => setShowCreatePost(false)} />
        </div>
    );
};

export default Navbar;
