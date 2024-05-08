const express = require('express');
const { addNotification, getNotificationsBySeller, getNotificationsByCustomer } = require('../controller/notificationController');

const router = express.Router();

// Routes
router.post('/', addNotification);
router.get('/seller/:seller', getNotificationsBySeller);
router.get('/customer/:customer', getNotificationsByCustomer);

module.exports = router;
