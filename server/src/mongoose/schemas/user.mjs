import mongoose from 'mongoose';
const { Schema } = mongoose;

const commentSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment_text: { type: String },
    comment_date: { type: Date, default: Date.now },
});
commentSchema.add({
    replies: [commentSchema],
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
            comments: [commentSchema],
            likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        },
    ],
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
});

// Define Schema for Tag
const tagSchema = new Schema({
    name: { type: String, unique: true },
});

const messageSchema = new mongoose.Schema(
    {
      senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      // createdAt, updatedAt
    },
    { timestamps: true }
  );
  
  // Define Schema for Conversation
  const conversationSchema = new mongoose.Schema(
      {
          participants: [
              {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "User",
              },
          ],
          messages: [
              {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Message",
                  default: [],
              },
          ],
      },
      { timestamps: true }
  );

const User = mongoose.model("User", userSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Message = mongoose.model("Message", messageSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);

export { User, Tag, Message, Conversation};
