import isAuthenticated from '../utils/authMiddleware.mjs';
import { User } from '../mongoose/schemas/user.mjs';

class PostController {
    static async createPost(req, res) {
        try {
            const { image_url, caption } = req.body;
            isAuthenticated(req, res);

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
    }

    static async updatePost(req, res) {
        try {
            const postId = req.params.postId;
            const { image_url, caption } = req.body;

            isAuthenticated(req, res);

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
    }

    static async deletePost(req, res) {
        try {
            const postId = req.params.postId;

            isAuthenticated(req, res);

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
    }

    static async getPostByUser(req, res) {
        try {
            const { userId, postId } = req.params;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const post = user.posts.find((post) => post._id.toString() === postId);

            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            res.status(200).json({ message: 'Post retrieved successfully', post });
        } catch (error) {
            console.error('Error retrieving user post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async getRandomPosts(req, res) {
        try {
            let numberOfPostsToShow = 10;

            if (req.body && req.body.numberOfPostsToShow) {
                numberOfPostsToShow = req.body.numberOfPostsToShow;
            }

            const previousPostIds = req.previousPostIds || [];

            const posts = await User.aggregate([
                { $unwind: '$posts' },
                { $match: { 'posts._id': { $nin: previousPostIds } } },
                { $sample: { size: numberOfPostsToShow } },
                {
                    $project: {
                        _id: '$posts._id',
                        author: {
                            _id: '$_id',
                            name: '$name',
                            avatar: '$avatar',
                        },
                        post: '$posts',
                    },
                },
            ]);

            const newPostIds = posts.map((post) => post._id);
            req.previousPostIds = [...previousPostIds, ...newPostIds];

            res.status(200).json({ message: 'Random posts retrieved successfully', posts });
        } catch (error) {
            console.error('Error retrieving random posts:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async likePost(req, res) {
        try {
            const { userId, postId } = req.params;
            isAuthenticated(req, res);
            const currentUser = req.user;

            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const post = user.posts.find((post) => post._id.toString() === postId);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const isLiked = post.likes.includes(currentUser._id);

            if (isLiked) post.likes = post.likes.filter((like) => like.toString() !== currentUser._id.toString());
            else post.likes.push(currentUser._id);

            await user.save();

            res.status(200).json({
                message: !isLiked ? 'Post has been liked' : 'Post has not been liked',
                isLiked: !isLiked,
            });
        } catch (error) {
            console.error('Error updating post:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default PostController;
