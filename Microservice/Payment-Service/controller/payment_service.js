const Payment = require('../models/Payment');


// Service to add a new payment
exports.addPayment = async (amount,orderid, paymentMethod ) => {
    try {
        // Call the service to add a new payment
        const payment = new Payment({
            amount,
            orderid,
            paymentMethod,
            paymentStatus: 'PENDING' // Default payment status
        });

        // Save the payment to the database
        await payment.save();
        return payment
    } catch (error) {
        return null
    }
};

// Controller to update payment status
exports.updatePaymentStatus = async (id, paymentStatus) => {
    try {
        // Call the service to update payment status by ID
        const payment = await Payment.findByIdAndUpdate(id, { paymentStatus }, { new: true });

        if (!payment) {
            return null;
        }

        // Return success response
        return payment
    } catch (error) {
        return null;
    }
};

