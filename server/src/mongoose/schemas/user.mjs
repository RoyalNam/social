import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define Schema for User
const userSchema = new Schema({
    username: { type: String, unique: true },
    name: { type: String },
    email: { type: String },
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
            _id: Schema.Types.ObjectId,
            image_url: { type: String },
            caption: { type: String },
            post_date: { type: Date, default: Date.now },
            comments: [
                {
                    _id: Schema.Types.ObjectId,
                    user: { type: Schema.Types.ObjectId, ref: 'User' },
                    comment_text: { type: String },
                    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }],
                },
            ],
            likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
    ],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    stories: [
        {
            _id: Schema.Types.ObjectId,
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

//Define model
const User = mongoose.model('User', userSchema);
const Tag = mongoose.model('Tag', tagSchema);

//Export
export { User, Tag };
