import { Router } from 'express';
import CommentController from '../controller/commentController.mjs';
const router = Router();

router.post('/api/posts/:postId/comments', CommentController.addComment);
router.put('/api/posts/:postId/comments/:commentId', CommentController.updateComment);
router.delete('/api/posts/:postId/comments/:commentId', CommentController.deleteComment);
router.post('/api/posts/:postId/comments/:commentId/replies', CommentController.addReply);
// router.post('/api/posts/:postId/comments/:commentId/replies/:parentId/replies', CommentController.addNestedReply);

export default router;
