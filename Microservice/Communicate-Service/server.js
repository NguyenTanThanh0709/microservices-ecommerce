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
const ratingRouter = require('./router/ratingRouter.js');

const app = express()
const server = http.createServer(app);
const io = socketio(server);
app.use(bodyParser.json());
const port = process.env.PORT || 5000



// Sử dụng router cho dịch vụ chat
app.use('/api/v1/communicate/chat', chatRouter);
app.use('/api/v1/communicate/mail', mailRouter);
app.use('/api/v1/communicate/rating', ratingRouter);


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