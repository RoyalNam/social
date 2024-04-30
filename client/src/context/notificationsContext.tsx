import React, { useEffect, useState } from 'react';
import { useSocketContext } from './socketContext';

interface NotificationsContextType {}

const NotificationsContextProvider = () => {
    const { socket } = useSocketContext();
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const handleNotification = (newNotification: any) => {
            const sound = new Audio('/notification.mp3');
            sound.play();
            setNotifications((prev) => [...newNotification, prev]);
        };
    }, [socket, setNotifications, notifications]);
    
    const updateNotifications = (newNotification: any){
        
    }
    return <div>NotificationsContextProvider</div>;
};

export default NotificationsContextProvider;
