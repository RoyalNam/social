import express from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import { PostController } from '../controller/index.js';

const router = express.Router();

router.post('/posts', authenticateToken, PostController.createPost);
router.get('/posts/random', PostController.getRandomPosts);
router.get('/posts/:postId', PostController.GetPostById);
router.put('/posts/:postId', authenticateToken, PostController.updatePost);
router.delete('/posts/:postId', authenticateToken, PostController.deletePost);
router.get('/:userId/posts/:postId', PostController.getPostByUser);
router.post('/posts/save', authenticateToken, PostController.savePost);
router.post('/posts/:postId/like', authenticateToken, PostController.likePost);

export default router;
