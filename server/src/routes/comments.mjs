import express from 'express';
const router = express.Router();

// Endpoint for creating a comment on a post
router.post('/api/posts/:postId/comments', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { comment_text } = req.body;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            user: currentUser._id,
            comment_text,
        };

        post.comments.push(newComment);
        await currentUser.save();

        res.status(201).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint for updating a comment on a post
router.put('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const { comment_text } = req.body;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const commentToUpdate = post.comments.find((comment) => comment._id == commentId);

        if (!commentToUpdate) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        commentToUpdate.comment_text = comment_text;
        await currentUser.save();

        res.status(200).json({ message: 'Comment updated successfully', comment: commentToUpdate });
    } catch (error) {
        console.error('Error updating comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint for deleting a comment on a post
router.delete('/api/posts/:postId/comments/:commentId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const commentIndex = post.comments.findIndex((comment) => comment._id == commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        post.comments.splice(commentIndex, 1);
        await currentUser.save();

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint for adding a reply to a comment
router.post('/api/posts/:postId/comments/:commentId/replies', async (req, res) => {
    try {
        const postId = req.params.postId;
        const commentId = req.params.commentId;
        const { reply_text } = req.body;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const commentToUpdate = post.comments.find((comment) => comment._id == commentId);

        if (!commentToUpdate) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        const newReply = {
            user: currentUser._id,
            reply_text,
        };

        commentToUpdate.replies.push(newReply);
        await currentUser.save();

        res.status(201).json({ message: 'Reply added successfully', reply: newReply });
    } catch (error) {
        console.error('Error adding reply:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
