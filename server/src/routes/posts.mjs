import express from 'express';
import PostController from '../controller/postController.mjs';

const router = express.Router();

router.post('/api/posts', PostController.createPost);
router.put('/api/posts/:postId', PostController.updatePost);
router.get('/api/:userId/posts/:postId', PostController.getPostByUser);
router.delete('/api/posts/:postId', PostController.deletePost);
router.post('/api/posts/save', PostController.savePost);
router.get('/api/posts/', PostController.getRandomPosts);
router.post('/api/:userId/posts/:postId/like', PostController.likePost);

export default router;
