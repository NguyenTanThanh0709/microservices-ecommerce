const express = require('express');
const router = express.Router();
const { createPayment, returnPayment } = require('../controller/PaymentMoney');
const {addPaymentVNPAY, result}  = require('../controller/Vnpay')
router.post('/create_payment_url', createPayment);
router.get('/vnpay_return', returnPayment);

router.post('/pay-pal', addPaymentVNPAY)
router.get('/pay-pal', result)


module.exports = router;
