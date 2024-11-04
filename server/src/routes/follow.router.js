import { Router } from 'express';
import { FollowController } from '../controller/index.js';

const router = Router();

router.post('/api/following/:followingId', FollowController.followUser);
router.delete('/api/following/:followingId', FollowController.unFollowUser);
router.get('/api/:userId/followers', FollowController.getFollowers);
router.get('/api/:userId/following', FollowController.getFollowing);

export default router;
