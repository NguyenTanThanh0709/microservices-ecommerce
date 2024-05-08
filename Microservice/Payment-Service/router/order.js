const express = require('express');
const router = express.Router();
const { createPayment, returnPayment, refund } = require('../controller/PaymentMoney');

router.post('/create_payment_url', createPayment);
router.post('/refund', refund);
router.get('/vnpay_return/:universalURL', returnPayment);

module.exports = router;
