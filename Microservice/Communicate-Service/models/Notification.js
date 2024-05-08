const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const NotificationSchema = new Schema({
    id: { type: ObjectId },
    description: {
        type: String,
        required: true,
    },
    seller: {
        type: Number,
        required: true,
    },
    customer: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: false,
        enum: ['TIN NHẮN', 'ĐƠN HÀNG'],
    },
    id_type: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        required: false,
        default: Date.now,
    },
});

module.exports = mongoose.model('Notification', NotificationSchema);
