const paymentService  = require('./payment_service');

// Controller to add a new payment
exports.addPayment = async (req, res) => {
    try {
        // Extract data from the request body
        const { amount, orderid, paymentMethod, paymentStatus } = req.body;

        const payment = await paymentService.addPayment(orderid, paymentMethod, paymentStatus,'','');
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


// Controller to get payment by order ID
exports.getPaymentByOrderId = async (req, res) => {
    try {
        const { orderId } = req.params;

        console.log(orderId);
        
        // Call the service function to get payment by order ID
        const payment = await paymentService.getPaymentByOrderId(orderId);

        if (!payment) {
            // If payment not found, return error response
            return res.status(404).json({ error: 'Payment not found' });
        }

        // If payment found, return success response with the payment object
        return res.status(200).json(payment);
    } catch (error) {
        // If any error occurs, return error response
        console.error('Error getting payment by order ID:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
