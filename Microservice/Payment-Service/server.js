const express = require('express');
const connect = require('./database/database.js');
const eurekaHelper = require('./discover/eureka-helper.js');
const bodyParser = require('body-parser');
const paymentRouter = require('./router/paymentRouter.js');
const orderRouter = require('./router/order.js');
const cors = require('cors');
const paymentService  = require('./controller/payment_service');

const app = express()
app.use(bodyParser.json());
const port = process.env.PORT || 5000
app.use(cors({ origin: '*' }));


// Sử dụng router cho dịch vụ chat
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/payments', orderRouter);
// app.use('/api/v1/payments/mail', mailRouter);





app.listen(port, async() => {
    await connect()
    console.log(`listening on portt : ${port}`)
})

eurekaHelper.registerWithEureka('payment-service', port);


const { Kafka } = require('kafkajs');

// Tạo một client Kafka
const kafka = new Kafka({
    brokers: ['localhost:29092'], // Kafka bootstrap servers
    clientId: 'my-nodejs-app', // Client ID
});

// Tạo một consumer
const consumer = kafka.consumer({ groupId: 'my-group' });

// Kết nối consumer tới Kafka và bắt đầu nhận tin nhắn từ chủ đề "demokafka"
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'payment-cod', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
       let data = message.value.toString()
       console.log(data)
        const payment = await paymentService.addPayment( data, 'COD', 'PENDING', '','');
        console.log('Payment created:', payment);
    },
  });
};

run().catch(console.error);
