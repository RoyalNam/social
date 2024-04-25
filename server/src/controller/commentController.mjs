import isAuthenticated from '../utils/authMiddleware.mjs';
import { User } from '../mongoose/schemas/user.mjs';

const handleNotFound = (res, item) => {
    return res.status(404).json({ message: `${item} not found` });
};

class CommentController {
    static async addComment(req, res) {
        try {
            const { postId } = req.params;
            const { comment_text } = req.body;
            isAuthenticated(req, res);

            const currentUser = req.user;
            const post = await User.findOneAndUpdate(
                { 'posts._id': postId },
                { $push: { 'posts.$.comments': { $each: [{ user: currentUser._id, comment_text }], $position: 0 } } },
                { new: true },
            );
            if (!post) return handleNotFound(res, 'Post');

            const newComment = post.posts.find((post) => post._id.toString() === postId).comments[0];
            res.status(201).json({ message: 'Comment added successfully', comment: newComment });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async updateComment(req, res) {
        try {
            const { postId, commentId } = req.params;
            const { comment_text } = req.body;
            isAuthenticated(req, res);

            const currentUser = req.user;
            const post = await User.findOneAndUpdate(
                { 'posts._id': postId, 'posts.comments._id': commentId },
                { $set: { 'posts.$.comments.$[comment].comment_text': comment_text } },
                { new: true, arrayFilters: [{ 'comment._id': commentId }] },
            );
            if (!post) return handleNotFound(res, 'Post or Comment');

            const updatedComment = post.posts
                .find((post) => post._id.toString() === postId)
                .comments.find((comment) => comment._id.toString() === commentId);
            res.status(200).json({ message: 'Comment updated successfully', comment: updatedComment });
        } catch (error) {
            console.error('Error updating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async deleteComment(req, res) {
        try {
            const { postId, commentId } = req.params;
            isAuthenticated(req, res);

            const post = await User.findOneAndUpdate(
                { 'posts._id': postId },
                { $pull: { 'posts.$.comments': { _id: commentId } } },
                { new: true },
            );
            if (!post) return handleNotFound(res, 'Post or Comment');

            res.status(200).json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async addReply(req, res) {
        try {
            const { postId, commentId } = req.params;
            const { parentId, comment_text } = req.body;
            isAuthenticated(req, res);
            const currentUser = req.user;
            const user = await User.findOne({ 'posts._id': postId, 'posts.comments._id': commentId });
            if (!user) return handleNotFound(res, 'User not found');

            let targetPost, targetComment;
            for (const post of user.posts) {
                const comment = post.comments.find((comment) => comment._id.toString() === commentId);
                if (comment) {
                    targetPost = post;
                    targetComment = comment;
                    break;
                }
            }
            if (!targetPost || !targetComment) return handleNotFound(res, 'Post or Comment');

            let newReply;
            if (parentId) {
                const findParentReply = (replies) => {
                    for (const reply of replies) {
                        if (reply._id.toString() === parentId) return reply;
                        if (reply.replies && reply.replies.length > 0) {
                            const parentReply = findParentReply(reply.replies);
                            if (parentReply) return parentReply;
                        }
                    }
                    return null;
                };

                const parentReplyToUpdate = findParentReply(targetComment.replies);
                if (!parentReplyToUpdate) return handleNotFound(res, 'Parent reply');

                parentReplyToUpdate.replies.push({ user: currentUser._id, comment_text });
                newReply = parentReplyToUpdate.replies.slice(-1)[0];
            } else {
                targetComment.replies.push({ user: currentUser._id, comment_text });
                newReply = targetComment.replies.slice(-1)[0];
            }

            await user.save();

            res.status(201).json({
                message: parentId ? 'Nested reply added successfully' : 'Reply added successfully',
                reply: newReply,
            });
        } catch (error) {
            console.error('Error adding reply:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default CommentController;
