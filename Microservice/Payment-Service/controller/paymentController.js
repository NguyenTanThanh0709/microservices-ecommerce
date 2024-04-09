const paymentService  = require('./payment_service');

// Controller to add a new payment
exports.addPayment = async (req, res) => {
    try {
        // Extract data from the request body
        const { amount, orderid, paymentMethod } = req.body;

        const payment = await paymentService.addPayment(amount, orderid, paymentMethod);
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

        // Find the payment by ID and update the payment status
        const payment = await paymentService.updatePaymentStatus(id, paymentStatus);

        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }

        // Return success response
        res.json({ success: true, message: 'Payment status updated successfully', data: payment });
    } catch (error) {
        // Handle errors
        console.error('Error updating payment status:', error);
        res.status(500).json({ success: false, message: 'Failed to update payment status', error: error.message });
    }
};
