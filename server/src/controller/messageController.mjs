import { getReceiverSocketId, io } from '../socket/socket.mjs';
import { Message } from '../mongoose/schemas/user.mjs';
import { Conversation } from '../mongoose/schemas/user.mjs';

class MessageController {
    static async getMessages(req, res) {
        try {
            const { id: userToChatId } = req.params;
            const senderId = req.user._id;

            const conversation = await Conversation.findOne({
                participants: { $all: [senderId, userToChatId] },
            }).populate('messages'); // NOT REFERENCE BUT ACTUAL MESSAGES

            if (!conversation) return res.status(200).json([]);

            const messages = conversation.messages;

            res.status(200).json(messages);
        } catch (error) {
            console.log('Error in getMessages controller: ', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async sendMessages(req, res) {
        try {
            const { message } = req.body;
            const { id: receiverId } = req.params;
            const senderId = req.user._id;

            let conversation = await Conversation.findOne({
                participants: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                conversation = await Conversation.create({
                    participants: [senderId, receiverId],
                });
            }

            const newMessage = new Message({
                senderId,
                receiverId,
                message,
            });

            if (newMessage) {
                conversation.messages.push(newMessage._id);
            }

            // await conversation.save();
            // await newMessage.save();

            // this will run in parallel
            await Promise.all([conversation.save(), newMessage.save()]);

            // SOCKET IO FUNCTIONALITY WILL GO HERE
            const receiverSocketId = getReceiverSocketId(receiverId);
            if (receiverSocketId) {
                // io.to(<socket_id>).emit() used to send events to specific client
                io.to(receiverSocketId).emit('newMessage', newMessage);
            }

            res.status(201).json(newMessage);
        } catch (error) {
            console.log('Error in sendMessage controller: ', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getUsersChat(req, res) {
        try {
            const senderId = req.user._id;
            console.log('sendid', senderId);
            // Find conversations where the senderId is a participant
            const conversations = await Conversation.find({
                participants: senderId,
            });

            if (!conversations || conversations.length === 0) {
                return res.status(200).json([]);
            }

            // Extract participant IDs from all conversations
            let participantIds = [];
            conversations.forEach((conversation) => {
                conversation.participants.forEach((participant) => {
                    // Ensure the participantId is not the senderId (logged-in user)
                    if (String(participant._id) !== String(senderId)) {
                        participantIds.push(participant._id);
                    }
                });
            });

            // Return the unique participant IDs
            res.status(200).json(participantIds);
        } catch (error) {
            console.log('Error in getUsersChat controller: ', error.message);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default MessageController;
