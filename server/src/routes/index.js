import express from 'express';
import authRouter from './auth.router';
import commentRouter from './comment.router';
import followRouter from './follow.router';
import messageRouter from './message.router';
import postRouter from './post.router';
import uploadRouter from './upload.router';
import userRouter from './user.router';

const router = express.Router();

router.use('/auth', authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(followRouter);
router.use(commentRouter);
router.use(messageRouter);
router.use(uploadRouter);

export default router;
