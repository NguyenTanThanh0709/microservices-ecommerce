const mongoose = require('mongoose');
const { Schema } = mongoose;

// Định nghĩa Schema cho Bảng Chat
const chatSchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    customer_id: { type: String, required: true }, // ID của người gửi tin nhắn
    seller_id: { type: String, required: true }, // ID của người nhận tin nhắn
    message: { type: String, required: true },
    type: {
        type: String,
        required: false,
        enum: ['seller', 'customer'],
    },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', chatSchema);