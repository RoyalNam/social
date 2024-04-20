import mongoose from 'mongoose';
const { Schema } = mongoose;

const replySchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    reply_text: { type: String },
});

replySchema.add({
    replies: [replySchema],
});

// Define Schema for User
const userSchema = new Schema({
    email: { type: String, unique: true },
    name: { type: String },
    avatar: { type: String },
    account: {
        type: {
            type: String,
            enum: ['facebook', 'google'],
        },
        account_id: { type: String },
    },
    password: { type: String },
    bio: { type: String },
    join_date: { type: Date, default: Date.now },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [
        {
            _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
            image_url: { type: String },
            caption: { type: String },
            post_date: { type: Date, default: Date.now },
            comments: [
                {
                    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
                    comment_text: { type: String },
                    replies: [replySchema],
                },
            ],
            likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
    ],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    stories: [
        {
            _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
            story_url: { type: String },
            story_date: { type: Date, default: Date.now },
            viewers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
    ],
});

// Define Schema for Tag
const tagSchema = new Schema({
    name: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema);
const Tag = mongoose.model('Tag', tagSchema);

export { User, Tag };
