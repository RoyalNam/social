import { Router } from 'express';
import { authenticateToken } from '../utils/authMiddleware.js';
import { CommentController } from '../controller/index.js';
const router = Router();

router.post('/api/posts/:postId/comments', authenticateToken, CommentController.addComment);
router.put('/api/posts/:postId/comments/:commentId', authenticateToken, CommentController.updateComment);
router.delete('/api/posts/:postId/comments/:commentId', authenticateToken, CommentController.deleteComment);
router.post('/api/posts/:postId/comments/:commentId/replies', authenticateToken, CommentController.addReply);
// router.post('/api/posts/:postId/comments/:commentId/replies/:parentId/replies', CommentController.addNestedReply);

export default router;
