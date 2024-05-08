const express = require('express');
const router = express.Router();

const {addPaymentVNPAY, result}  = require('../controller/Vnpay')

router.post('/pay-pal', addPaymentVNPAY)
router.get('/pay-pal/:universalURL', result);


module.exports = router;
