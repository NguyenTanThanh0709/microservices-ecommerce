const paypal = require('paypal-rest-sdk')
const paymentService  = require('./payment_service');
const KafkaProducerService  = require('../kafka/KafkaProducerService')

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AbNkSMoLhh9Y0eCaTJgGFR6ObFO2y46U9fO__pca8IbZO0os0s6WdLyJNNQFQ2oFizmXLe35-JEyhMNa',
    'client_secret': 'EB-C-zIDC9Xnc7yQlp2hLREMYNMG-BZSHhoPqonRFvHJ2gfXy_uzfkej_a7XdV0WmofDTaWBUlD3LlCH'
});

exports.addPaymentVNPAY = async (req, res) => {
    try {
        const data = req.body;
        const money = (data.amount / 23000).toFixed(2).toString();
        const vnp_OrderInfo = data.orderid + '_' + data.paymentMethod + '_' + data.dataupdate;

        const create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8222/api/v1/payments/pay-pal?money="  + money+"&vnp_OrderInfo=" + vnp_OrderInfo,
                "cancel_url": "http://localhost:3000/payment-result?vnp_ResponseCode=01&vnp_TransactionStatus=01&vnp_OrderInfo=" + vnp_OrderInfo
            },
            "transactions": [{
                "item_list": {
                    "items": [{
                        "name": "Học phí",
                        "sku": "001",
                        "price": money,
                        "currency": "USD",
                        "quantity": 1
                    }]
                },
                "amount": {
                    "currency": "USD",
                    "total": money
                },
                "description": "Thanh toán mua hàng với order: " + data.orderid
            }]
        };

        paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                for (let i = 0; i < payment.links.length; i++) {
                    if (payment.links[i].rel === 'approval_url') {
                        return res.json({ link: payment.links[i].href })
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error adding payment via VNPAY:', error);
        res.status(500).json({ success: false, message: 'Failed to add payment via VNPAY', error: error.message });
    }
}

exports.result = async (req, res) => {
    try {
        const money = req.query.money;
        const vnp_OrderInfo = req.query.vnp_OrderInfo;
        const payerId = req.query.PayerID;
        const paymentId = req.query.paymentId;
        const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": money
                }
            }]
        };

        paypal.payment.execute(paymentId, execute_payment_json, async  function (error, payment) {
            if (error) {
                let data =  vnp_OrderInfo.split('_');
                let orderid = parseInt(data[0]);
                let paymentMethod = data[1];
                let dataupdate = data[2];
                const payment = await paymentService.addPayment(money, orderid, 'PAYPAL', 'CANCELLED', 'paypal', 'paypal');
                if(payment){
                  res.redirect(`http://localhost:3000/payment-result?vnp_ResponseCode=01&vnp_TransactionStatus=01&vnp_OrderInfo=${vnp_OrderInfo}`);
                }
            } else {
                console.log(vnp_OrderInfo)
                let data =  vnp_OrderInfo.split('_');
                let orderid = parseInt(data[0]);
                let paymentMethod = data[1];
                let dataupdate = data[2];

                // Update the payment status in the database or perform any
                const payment = await paymentService.addPayment(money, orderid, 'PAYPAL', 'COMPLETED', 'paypal', 'paypal');
                if(payment){
                    const producerService = new KafkaProducerService();
                    producerService.connectProducer()
                    .then(() => {
                        // Gửi message tới topic 'payment-topic'
                        const topic = 'payment-topic';
                        const message = 'Hello Kafka!';
                        producerService.sendMessage(topic, dataupdate);
                    console.log('oko1')
    
                    })
                    .catch(error => {
                        console.error('Error connecting to Kafka:', error);
                    });
    
                    console.log('oko')

                    res.redirect(`http://localhost:3000/payment-result?vnp_ResponseCode=00&vnp_TransactionStatus=00&vnp_OrderInfo=${vnp_OrderInfo}`);
                }
            }
        });
    } catch (error) {
        console.error('Error processing payment result:', error);
        res.status(500).json({ success: false, message: 'Failed to process payment result', error: error.message });
    }
}
