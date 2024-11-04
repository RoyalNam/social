import { Router } from 'express';
import { FollowController } from '../controller/index.js';
import { authenticateToken } from '../utils/authMiddleware.js';

const router = Router();

router.post('/following/:followingId', authenticateToken, FollowController.followUser);
router.delete('/following/:followingId', authenticateToken, FollowController.unFollowUser);
router.get('/:userId/followers', FollowController.getFollowers);
router.get('/:userId/following', FollowController.getFollowing);

export default router;
