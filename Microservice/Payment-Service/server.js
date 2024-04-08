const express = require('express');
const connect = require('./database/database.js');
const eurekaHelper = require('./discover/eureka-helper.js');
const bodyParser = require('body-parser');
const paymentRouter = require('./router/paymentRouter.js');
const orderRouter = require('./router/order.js');
const cors = require('cors');

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



// const { Kafka } = require('kafkajs');

// // Create Kafka instance
// const kafka = new Kafka({
//   clientId: 'my-nodejs-app', // Client ID
//   brokers: ['localhost:29092'], // Kafka bootstrap servers
// });

// // Create Kafka producer
// const producer = kafka.producer();

// // Create Kafka consumer
// const consumer = kafka.consumer({ groupId: 'Product-groupId' });

// // Connect producer and consumer to Kafka
// async function connectToKafka() {
//   await producer.connect();
//   await consumer.connect();
// }

// // Function to send message to Kafka
// async function sendMessage(topic, message) {
//   await producer.send({
//     topic,
//     messages: [{ value: message }],
//   });
// }

// // Middleware to handle Kafka processing
// async function kafkaMiddleware(req, res, next) {
//   try {
//     // Process Kafka messages here if needed
//     await consumer.run({
//       eachMessage: async ({ topic, partition, message }) => {
//         console.log({
//           value: message.value.toString(), // Message value
//           topic,
//           partition,
//         });
//       },
//     });

//     // Pass control to the next middleware
//     next();
//   } catch (error) {
//     console.error('Error processing Kafka messages:', error);
//     next(error);
//   }
// }

// module.exports = {
//   connectToKafka,
//   sendMessage,
//   kafkaMiddleware,
// };

