import express from 'express';
const router = express.Router();

router.post('/api/posts', async (req, res) => {
    try {
        const { image_url, caption } = req.body;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;

        const newPost = {
            image_url,
            caption,
            user: currentUser._id,
        };

        currentUser.posts.push(newPost);

        await currentUser.save();

        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;
        const { image_url, caption } = req.body;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;
        const post = currentUser.posts.find((post) => post._id == postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.image_url = image_url || post.image_url;
        post.caption = caption || post.caption;

        await currentUser.save();

        res.status(200).json({ message: 'Post updated successfully', post });
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/api/posts/:postId', async (req, res) => {
    try {
        const postId = req.params.postId;

        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const currentUser = req.user;
        const postIndex = currentUser.posts.findIndex((post) => post._id == postId);

        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found' });
        }

        currentUser.posts.splice(postIndex, 1);

        await currentUser.save();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;
