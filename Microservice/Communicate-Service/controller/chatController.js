const Chat = require('../models/chats'); // Import model của Bảng Chat

// Function để lấy tất cả các tin nhắn giữa hai bên dựa trên sender_id và receiver_id
async function getChatMessages(user1Id, user2Id) {
    try {
        const chatMessages = await Chat.find({
            $or: [
                { sender_id: user1Id, receiver_id: user2Id },
                { sender_id: user2Id, receiver_id: user1Id }
            ]
        }).sort({ created_at: 1 }); // Sắp xếp theo thời gian tạo tin nhắn (tăng dần)

        return chatMessages;
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        throw error;
    }
}


async function sendMessage(senderId, receiverId, message) {
    try {
        const newChat = new Chat({
            sender_id: senderId,
            receiver_id: receiverId,
            message: message
        });

        const savedChat = await newChat.save();
        return savedChat;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

module.exports = {
    sendMessage,
    getChatMessages
}
