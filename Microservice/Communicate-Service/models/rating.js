const mongoose = require('mongoose');
const { Schema } = mongoose;

// Định nghĩa Schema cho Bảng Đánh giá sản phẩm
const productRatingSchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    product_id: { type: String, required: true },
    user_id: { type: String, required: true },
    rating: { 
        type: Number, 
        required: true,
        min: 1,  // Giá trị tối thiểu là 1
        max: 5   // Giá trị tối đa là 5
    },
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

// Định nghĩa Schema cho Bảng Trả lời
const replySchema = new Schema({
    id: { type: Schema.Types.ObjectId, auto: true },
    parent_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: String, required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ProductRating', productRatingSchema);
module.exports = mongoose.model('Reply', replySchema);
