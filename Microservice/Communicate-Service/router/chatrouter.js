const express = require('express');
const router = express.Router();
const { sendMessage, getMessageList } =  require('../controller/chatController');

// Route để gửi tin nhắn mới
router.post('/send', sendMessage);

// Route để lấy danh sách tin nhắn theo customer_id và seller_id
router.get('/list', getMessageList);

module.exports = router;
