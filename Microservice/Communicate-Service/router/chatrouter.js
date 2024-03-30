const express = require('express');
const router = express.Router();
const chatService = require('../controller/chatController');

// Route để lấy tất cả các tin nhắn giữa hai bên dựa trên sender_id và receiver_id
router.get('/messages/:user1Id/:user2Id', async (req, res) => {
    const { user1Id, user2Id } = req.params;
    try {
        const chatMessages = await chatService.getChatMessages(user1Id, user2Id);
        res.json(chatMessages);
    } catch (error) {
        console.error('Error fetching chat messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route để gửi tin nhắn từ một người dùng đến người dùng khác
router.post('/send-message', async (req, res) => {
    const { senderId, receiverId, message } = req.body;
    try {
        const savedChat = await chatService.sendMessage(senderId, receiverId, message);
        res.json(savedChat);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
