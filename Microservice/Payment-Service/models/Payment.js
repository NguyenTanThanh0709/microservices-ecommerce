const mongoose = require('mongoose');

// Define the schema
const paymentSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    orderid: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['COD', 'PAYPAL', 'VNPAY'], required: true },
    paymentStatus: { type: String, enum: ['PENDING', 'COMPLETED', 'CANCELLED'], required: true },
    createdOn: { type: Date, default: Date.now },
    lastModifiedOn: { type: Date, default: Date.now }
});

// Create the model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
