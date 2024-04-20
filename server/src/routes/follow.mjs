import express from 'express';
import { User } from '../mongoose/schemas/user.mjs';

const router = express.Router();

// Add a follower
router.post('/api/:userId/followers/:followerId', async (req, res) => {
    const { userId, followerId } = req.params;
    try {
        const user = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!user || !follower) {
            return res.status(404).json({ message: 'User or follower not found' });
        }

        if (user.followers.includes(follower._id)) {
            return res.status(400).json({ message: 'Follower already exists' });
        }

        user.followers.push(follower._id);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Remove a follower
router.delete('/api/:userId/followers/:followerId', async (req, res) => {
    const { userId, followerId } = req.params;
    try {
        const user = await User.findById(userId);
        const follower = await User.findById(followerId);

        if (!user || !follower) {
            return res.status(404).json({ message: 'User or follower not found' });
        }

        if (!user.followers.includes(follower._id)) {
            return res.status(400).json({ message: 'Follower does not exist' });
        }

        user.followers = user.followers.filter((id) => id.toString() !== follower._id.toString());
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Follow a user
router.post('/api/:userId/following/:followingId', async (req, res) => {
    const { userId, followingId } = req.params;
    try {
        const user = await User.findById(userId);
        const followingUser = await User.findById(followingId);

        if (!user || !followingUser) {
            return res.status(404).json({ message: 'User or following user not found' });
        }

        if (user.following.includes(followingUser._id)) {
            return res.status(400).json({ message: 'User already follows this user' });
        }

        user.following.push(followingUser._id);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Unfollow a user
router.delete('/api/:userId/following/:followingId', async (req, res) => {
    const { userId, followingId } = req.params;
    try {
        const user = await User.findById(userId);
        const followingUser = await User.findById(followingId);

        if (!user || !followingUser) {
            return res.status(404).json({ message: 'User or following user not found' });
        }

        if (!user.following.includes(followingUser._id)) {
            return res.status(400).json({ message: 'User does not follow this user' });
        }

        user.following = user.following.filter((id) => id.toString() !== followingUser._id.toString());
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get followers of a user
router.get('/api/:userId/followers', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('followers', 'name email avatar');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get users followed by a specific user
router.get('/api/:userId/following', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId).populate('following', 'name email avatar');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.following);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
