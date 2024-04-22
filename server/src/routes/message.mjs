import { Router } from 'express';
import MessageController from '../controller/messageController.mjs';

const router = Router();

router.get('/api/get/:id', MessageController.getMessages);
router.post('/api/send/:id', MessageController.sendMessages);

export default router;
