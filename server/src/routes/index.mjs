import '../config/passport.mjs';
import express from 'express';
import postRouter from './posts.mjs';
import authRouter from './auth.mjs';
import userRouter from './users.mjs';
import followRouter from './follow.mjs';
import commentRouter from './comments.mjs';

const router = express.Router();

router.use('/auth', authRouter);
router.use(userRouter);
router.use(postRouter);
router.use(followRouter);
router.use(commentRouter);

export default router;
