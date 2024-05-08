const Notification = require('../models/Notification');

// Controller functions
exports.addNotification = async (req, res) => {
    console.log(req.body);
    try {
        const notification = await Notification.create(req.body);
        res.status(201).json(notification);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNotificationsBySeller = async (req, res) => {
    try {
        const { seller } = req.params;
        const notifications = await Notification.find({ seller: seller });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNotificationsByCustomer = async (req, res) => {
    try {
        const { customer } = req.params;
        const notifications = await Notification.find({ customer: customer });
        res.status(200).json(notifications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
