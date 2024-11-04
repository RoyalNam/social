import { Notification } from '../models/index.js';

class NotificationController {
    static async getNotifications(req, res) {
        try {
            const { userId } = req.params;
            const notifications = await Notification.find({ receiverId: userId }).sort({ createdAt: -1 });
            res.status(200).json(notifications);
        } catch (error) {
            res.status(500).json({ error: 'Error fetching notifications' });
        }
    }

    static async createNotification(req, res, data = null) {
        const { type, senderId, receiverId, postId, commentId, message } = data || req.body;

        try {
            const notification = new Notification({
                type,
                senderId,
                receiverId,
                postId,
                commentId,
                message,
                isRead: false,
            });

            await notification.save();

            if (!data) {
                res.status(201).json(notification);
            } else {
                return notification;
            }
        } catch (error) {
            if (!data) {
                res.status(500).json({ error: 'Error creating notification' });
            } else {
                throw error;
            }
        }
    }

    static async markAsRead(req, res) {
        try {
            const { notificationId } = req.params;
            const notification = await Notification.findById(notificationId);

            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            notification.isRead = true;
            notification.updatedAt = new Date();
            await notification.save();

            res.status(200).json(notification);
        } catch (error) {
            res.status(500).json({ error: 'Error updating notification' });
        }
    }

    static async markAllAsRead(req, res) {
        try {
            const { userId } = req.params;
            await Notification.updateMany(
                { receiverId: userId, isRead: false },
                { $set: { isRead: true, updatedAt: new Date() } },
            );
            res.status(200).json({ message: 'All notifications marked as read' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating all notifications' });
        }
    }

    static async deleteNotificationById(req, res) {
        try {
            const { notificationId } = req.params;
            const notification = await Notification.findByIdAndDelete(notificationId);

            if (!notification) {
                return res.status(404).json({ error: 'Notification not found' });
            }

            res.status(200).json({ message: 'Notification successfully deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting notification' });
        }
    }

    static async deleteNotification(req, res) {
        const { senderId, receiverId, type } = req.body;

        try {
            const result = await Notification.deleteOne({ senderId, receiverId, type });

            if (result.deletedCount === 0) {
                return res.status(404).json({ error: 'No matching notification found to delete' });
            }

            res.status(200).json({ message: 'Notification successfully deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting notification' });
        }
    }
}

export default NotificationController;
