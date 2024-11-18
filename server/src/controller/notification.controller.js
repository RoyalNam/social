import { Notification, User } from '../models/index.js';

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
            let notificationMessage = '';

            const sender = await User.findById(senderId).select('name');
            const senderName = sender ? sender.name : 'Someone';

            switch (type) {
                case 'like':
                    notificationMessage = `Your post received a new like.`;
                    break;
                case 'comment':
                    notificationMessage = `Your post received a new comment.`;
                    break;
                case 'follow':
                    notificationMessage = `${senderName} started following you.`;
                    break;
                case 'mention':
                    notificationMessage = `You were mentioned in a post.`;
                    break;
                case 'message':
                    notificationMessage = `${senderName} sent you a message.`;
                    break;
                case 'post':
                    notificationMessage = `${senderName} shared a new post.`;
                    break;
                default:
                    notificationMessage = `You have a new notification.`;
            }

            let existingNotification = null;

            if (type === 'message') {
                existingNotification = await Notification.findOne({
                    senderId,
                    receiverId,
                    type,
                });
            } else if (type === 'like' || type === 'comment') {
                existingNotification = await Notification.findOne({
                    receiverId,
                    type,
                    postId,
                });
            }

            if (existingNotification) {
                if (existingNotification.isRead) {
                    existingNotification.message = notificationMessage;
                } else {
                    const messageParts = existingNotification.message.split(' ');
                    const existingCount = parseInt(messageParts[3]) || 1;
                    const newMessage = `${messageParts[0]} ${messageParts[1]} ${messageParts[2]} ${
                        existingCount + 1
                    } new ${type}${existingCount + 1 > 1 ? 's' : ''}.`;
                    existingNotification.message = newMessage;
                }

                await existingNotification.save();

                if (res) {
                    return res.status(200).json(existingNotification);
                }
                return existingNotification;
            } else {
                const notification = new Notification({
                    type,
                    senderId,
                    receiverId,
                    postId,
                    commentId,
                    message: notificationMessage,
                    isRead: false,
                });
                await notification.save();

                if (res) {
                    return res.status(201).json(notification);
                }
                return notification;
            }
        } catch (error) {
            console.error(error);
            if (res) {
                res.status(500).json({ error: 'Error creating notification' });
            }
            throw new Error('Error creating notification');
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
