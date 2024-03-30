const express = require('express');
const connect = require('./database/database.js');
const eurekaHelper = require('./discover/eureka-helper.js');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');
const chatService = require('./controller/chatController');

// const kafkaCF = require('./kafka/kafkaCF.js');

const chatRouter = require('./router/chatrouter.js');
const mailRouter = require('./router/mailRouter.js');

const app = express()
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.json());
const port = process.env.PORT || 5000



// Sử dụng router cho dịch vụ chat
app.use('/api/v1/communicate/chat', chatRouter);
app.use('/api/v1/communicate/mail', mailRouter);


// Bắt sự kiện kết nối từ client
io.on('connection', (socket) => {
    console.log('New client connected');

    // Bắt sự kiện gửi tin nhắn từ client
    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
        try {
            // Lưu tin nhắn vào cơ sở dữ liệu
            const savedChat = await chatService.sendMessage(senderId, receiverId, message);
            
            // Gửi tin nhắn mới đến cả sender và receiver
            io.emit('newMessage', savedChat);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    });

    // Ngắt kết nối khi client rời đi
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});



app.listen(port, async() => {
    await connect()
    console.log(`listening on portt : ${port}`)
})

eurekaHelper.registerWithEureka('communicate-service', port);



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

