import express from 'express';
import authRouter from './auth.router.js';
import commentRouter from './comment.router.js';
import followRouter from './follow.router.js';
import messageRouter from './message.router.js';
import postRouter from './post.router.js';
import uploadRouter from './upload.router.js';
import userRouter from './user.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(followRouter);
router.use(commentRouter);
router.use(messageRouter);
router.use(uploadRouter);

export default router;
