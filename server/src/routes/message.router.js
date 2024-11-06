import { Router } from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import { MessageController } from '../controller/index.js';

const router = Router();

router.get('/message/conversations', authenticateToken, MessageController.getUsersChat);
router.get('/message/:id', authenticateToken, MessageController.getMessages);
router.post('/message/:id', authenticateToken, MessageController.sendMessages);
router.get('/activity/:id', MessageController.getUserActivity);

export default router;
