const express = require('express');
const router = express.Router();
const { addPayment, updatePaymentStatus } = require('../controller/paymentController');

// Route to add a new payment
router.post('/', addPayment);
router.put('/:id', updatePaymentStatus);

module.exports = router;
