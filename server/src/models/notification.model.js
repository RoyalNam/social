import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema(
    {
        type: {
            type: String,
            enum: ['like', 'comment', 'follow', 'mention', 'message'],
            required: true,
        },
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            default: null,
        },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null,
        },
        message: {
            type: String,
            default: '',
        },
        isRead: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
