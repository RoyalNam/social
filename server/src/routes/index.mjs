import { Router } from "express";
import usersRouter from "./users.mjs";
import postsRouter from './posts.mjs'
import facebookUserRouter from './facebook-user.mjs'
import googleUserRouter from './google-user.mjs'

const router = Router();

router.use(usersRouter)
router.use(postsRouter)
router.use(facebookUserRouter)
router.use(googleUserRouter)


export default router;