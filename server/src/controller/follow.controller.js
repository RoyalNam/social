import { User } from '../models/index.js';
import { getReceiverSocketId, io } from '../socket/socket.js';
import { NotificationController } from '../controller/index.js';

class FollowController {
    static async followUser(req, res) {
        const { followingId } = req.params;
        const currentUser = req.user;

        try {
            if (!currentUser || !currentUser._id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const followingUser = await User.findById(followingId);

            if (!followingUser) {
                return res.status(404).json({ message: 'Following user not found' });
            }

            const isFollowing = currentUser.following.includes(followingUser._id);
            if (isFollowing) {
                return res.status(400).json({ message: 'User already follows this user', isFollowing });
            }

            currentUser.following.push(followingUser._id);
            followingUser.followers.push(currentUser._id);
            await Promise.all([currentUser.save(), followingUser.save()]);

            const newNotification = await NotificationController.createNotification(null, null, {
                type: 'follow',
                senderId: currentUser._id,
                receiverId: followingUser._id,
            });

            const receiverSocketId = getReceiverSocketId(followingUser._id);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('newNotification', newNotification);
            }

            res.status(200).json({ isFollowing: true, notification: newNotification });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    static async unFollowUser(req, res) {
        const { followingId } = req.params;
        const currentUser = req.user;

        try {
            if (!currentUser || !currentUser._id) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const followingUser = await User.findById(followingId);

            if (!followingUser) {
                return res.status(404).json({ message: 'Following user not found' });
            }

            const isFollowing = currentUser.following.includes(followingUser._id);
            if (!isFollowing) {
                return res.status(400).json({ message: 'User does not follow this user', isFollowing });
            }

            currentUser.following = currentUser.following.filter(
                (id) => id.toString() !== followingUser._id.toString(),
            );
            followingUser.followers = followingUser.followers.filter(
                (id) => id.toString() !== currentUser._id.toString(),
            );
            await Promise.all([currentUser.save(), followingUser.save()]);
            res.status(200).json({ isFollowing: false });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server Error' });
        }
    }

    static async getFollowers(req, res) {
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
    }

    static async getFollowing(req, res) {
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
    }
}

export default FollowController;
