import { Router } from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import { NotificationController } from '../controller/index.js';

const router = Router();

router.get('/:userId/notification', NotificationController.getNotifications);
router.post('/notification', authenticateToken, NotificationController.createNotification);
router.patch('/notification/:notificationId/read', authenticateToken, NotificationController.markAsRead);
router.patch('/:userId/notification/read-all', authenticateToken, NotificationController.markAllAsRead);
router.delete('/notification/:notificationId', authenticateToken, NotificationController.deleteNotificationById);
router.delete('/notification', authenticateToken, NotificationController.deleteNotification);

export default router;
