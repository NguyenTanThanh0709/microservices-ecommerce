const express = require('express');
const router = express.Router();
const chatService = require('../controller/sendMailController');



// MAIL THANH TOÁN THÀNH CÔNG, MAIL NHẬN HÀNG , MAIL HỦY ĐƠN HÀNG, MAIL HOÀN TIỀN
router.post('/send-mail', async (req, res) => {
    const { To, Subject, Content } = req.body;
    try {
        // const savedChat = await chatService.sendMessage(senderId, receiverId, message);
        // res.json(savedChat);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
