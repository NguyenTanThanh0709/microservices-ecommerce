const Payment = require('../models/Payment');


// Service to add a new payment
exports.addPayment = async (req, res) => {
    try {
        // Extract data from the request body
        const { amount, paymentMethod } = req.body;

        // Call the service to add a new payment
        const payment = await paymentService.addPayment(amount, paymentMethod);

        // Return success response
        res.status(201).json({ success: true, message: 'Payment added successfully', data: payment });
    } catch (error) {
        // Handle errors
        console.error('Error adding payment:', error);
        res.status(500).json({ success: false, message: 'Failed to add payment', error: error.message });
    }
};

// Controller to update payment status
exports.updatePaymentStatus = async (req, res) => {
    try {
        // Extract data from the request body
        const { id } = req.params;
        const { paymentStatus } = req.body;

        // Call the service to update payment status by ID
        const updatedPayment = await paymentService.updatePaymentStatusById(id, paymentStatus);

        if (!updatedPayment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Return success response
        res.json({ success: true, message: 'Payment status updated successfully', data: updatedPayment });
    } catch (error) {
        // Handle errors
        console.error('Error updating payment status:', error);
        res.status(500).json({ success: false, message: 'Failed to update payment status', error: error.message });
    }
};