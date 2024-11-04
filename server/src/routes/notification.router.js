import { Router } from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import { NotificationController } from '../controller/index.js';

const router = Router();

router.get('/api/:userId/notification', NotificationController.getNotifications);
router.post('/api/notification', authenticateToken, NotificationController.createNotification);
router.patch('/api/notification/:notificationId/read', authenticateToken, NotificationController.markAsRead);
router.patch('/api/:userId/notification/read-all', authenticateToken, NotificationController.markAllAsRead);
router.delete('/api/notification/:notificationId', authenticateToken, NotificationController.deleteNotificationById);
router.delete('/api/notification', authenticateToken, NotificationController.deleteNotification);

export default router;
