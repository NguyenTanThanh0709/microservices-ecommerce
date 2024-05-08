const express = require('express');
const router = express.Router();
const { addPayment, updatePaymentStatus, getPaymentByOrderId } = require('../controller/paymentController');

// Route to add a new payment
router.get('/:orderId', getPaymentByOrderId);
router.post('/', addPayment);
router.put('/:id', updatePaymentStatus);
// Route to get payment by order ID


module.exports = router;
