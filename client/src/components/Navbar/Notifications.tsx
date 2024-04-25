import React from 'react';
import { timeAgoFromPast } from '@/utils';
import { useRouter } from 'next/navigation';

const Notifications = () => {
    const router = useRouter();
    // const renderNotification = (notification: any) => {
    //     const USER = USERS_DATA[0];
    //     return (
    //         <div
    //             key={notification.notification_id}
    //             onClick={() => router.push(notification.destination as string)}
    //             className="hover:bg-white/30 flex gap-3 p-2 cursor-pointer rounded"
    //         >
    //             <img src={USER.avatar} alt="" className="rounded-full w-14 h-14" />
    //             <div>
    //                 <span className="line-clamp-3">{`${USER.username} ${notification.message}`}</span>
    //                 <span className="text-blue-400 font-medium text-xs">
    //                     {timeAgoFromPast(new Date(notification.timestamp))}
    //                 </span>
    //             </div>
    //         </div>
    //     );
    // };
    return (
        <div className="h-full">
            <h5 className="text-xl font-bold">Notifications</h5>
            <div className="h-full scroll_thin scroll_thin overflow-y-auto text-sm my-3">
                {false ? (
                    <div className="flex flex-col text-center justify-center items-center mt-12 gap-4">
                        <span>Activity on your posts</span>
                        <span>When someone likes or comments on one of your posts, you'll see it here.</span>
                    </div>
                ) : (
                    <div className="flex gap-4 flex-col pb-8">
                        {/* <div>
                            <h5 className="text-base font-medium">Today</h5>
                            <div>{NOTIFICATION_DATA.map((item) => renderNotification(item))}</div>
                        </div>
                        <div>
                            <h5 className="text-base font-medium">Before</h5>
                            <div>{NOTIFICATION_DATA.map((item) => renderNotification(item))}</div>
                        </div> */}
                        <span>None</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
