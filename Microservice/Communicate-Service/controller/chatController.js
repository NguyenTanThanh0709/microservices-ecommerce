const Chat = require('../models/chats'); // Import model của Bảng Chat

// Function để lấy tất cả các tin nhắn giữa hai bên dựa trên sender_id và receiver_id


// Controller để gửi tin nhắn mới
const sendMessage = async (req, res) => {
    try {
        const { customer_id, seller_id, message } = req.body;
        console.log(req.body)
        const newMessage = new Chat({
            customer_id,
            seller_id,
            message
        });
        await newMessage.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Error sending message' });
    }
};

// Controller để lấy danh sách tin nhắn theo customer_id và seller_id, sắp xếp theo created_at
const getMessageList = async (req, res) => {
    try {
        const { customer_id, seller_id } = req.query;
        const messages = await Chat.find({ $or: [{ customer_id, seller_id }, { customer_id: seller_id, seller_id: customer_id }] })
                                    .sort({ created_at: 1 });
        res.json(messages);
    } catch (error) {
        console.error('Error getting message list:', error);
        res.status(500).json({ error: 'Error getting message list' });
    }
};

module.exports = { sendMessage, getMessageList };