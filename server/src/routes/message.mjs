import { Router } from 'express';
import MessageController from '../controller/messageController.mjs';

const router = Router();

router.get('/api/message', MessageController.getUsersChat);
router.get('/api/message/:id', MessageController.getMessages);
router.post('/api/message/:id', MessageController.sendMessages);

export default router;
