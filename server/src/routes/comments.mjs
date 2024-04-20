import express from 'express';
const router = express.Router();

const handleUnauthorized = (req, res) => {
    return res.status(401).json({ message: 'Unauthorized' });
};

const handleNotFound = (res, item) => {
    return res.status(404).json({ message: `${item} not found` });
};

router.post('/api/posts/:postId/comments', async (req, res) => {
    try {
        const { postId } = req.params;
        const { comment_text } = req.body;
        if (!req.isAuthenticated()) return handleUnauthorized(req, res);
        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);
        if (!post) return handleNotFound(res, 'Post');
        const newComment = { user: currentUser._id, comment_text };
        post.comments.push(newComment);
        await currentUser.save();
        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { comment_text } = req.body;
        if (!req.isAuthenticated()) return handleUnauthorized(req, res);
        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);
        if (!post) return handleNotFound(res, 'Post');
        const commentToUpdate = post.comments.find((comment) => comment._id == commentId);
        if (!commentToUpdate) return handleNotFound(res, 'Comment');
        commentToUpdate.comment_text = comment_text;
        await currentUser.save();
        res.status(200).json({ message: 'Comment updated successfully', comment: commentToUpdate });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        if (!req.isAuthenticated()) return handleUnauthorized(req, res);
        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);
        if (!post) return handleNotFound(res, 'Post');
        const commentIndex = post.comments.findIndex((comment) => comment._id == commentId);
        if (commentIndex === -1) return handleNotFound(res, 'Comment');
        post.comments.splice(commentIndex, 1);
        await currentUser.save();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/api/posts/:postId/comments/:commentId/replies', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { reply_text } = req.body;
        if (!req.isAuthenticated()) return handleUnauthorized(req, res);
        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);
        if (!post) return handleNotFound(res, 'Post');
        const commentToUpdate = post.comments.find((comment) => comment._id == commentId);
        if (!commentToUpdate) return handleNotFound(res, 'Comment');
        const newReply = { user: currentUser._id, reply_text };
        commentToUpdate.replies.push(newReply);
        await currentUser.save();
        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/api/posts/:postId/comments/:commentId/replies/:id/replies', async (req, res) => {
    try {
        const { postId, commentId, id: parentReplyId } = req.params;
        const { reply_text } = req.body;
        if (!req.isAuthenticated()) return handleUnauthorized(req, res);
        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);
        if (!post) return handleNotFound(res, 'Post');
        const commentToUpdate = post.comments.find((comment) => comment._id == commentId);
        if (!commentToUpdate) return handleNotFound(res, 'Comment');

        const findParentReply = (replies) => {
            for (const reply of replies) {
                if (reply._id == parentReplyId) return reply;
                if (reply.replies.length > 0) {
                    const parentReply = findParentReply(reply.replies);
                    if (parentReply) return parentReply;
                }
            }
            return null;
        };

        const parentReplyToUpdate = findParentReply(commentToUpdate.replies);
        if (!parentReplyToUpdate) return handleNotFound(res, 'Parent reply');

        const newReply = { user: currentUser._id, reply_text };
        parentReplyToUpdate.replies.push(newReply);
        await currentUser.save();
        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
