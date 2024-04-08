const express = require('express');
const router = express.Router();
const { createPayment, returnPayment } = require('../controller/PaymentMoney');
router.post('/create_payment_url', createPayment);
router.get('/vnpay_return', returnPayment);


module.exports = router;
