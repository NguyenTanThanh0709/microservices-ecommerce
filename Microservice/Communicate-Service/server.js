const express = require('express');
const connect = require('./database/database.js');
const eurekaHelper = require('./discover/eureka-helper.js');
const bodyParser = require('body-parser');
const http = require('http');



const chatRouter = require('./router/chatrouter.js');
const mailRouter = require('./router/mailRouter.js');
const ratingRouter = require('./router/ratingRouter.js');
const notificationRouter = require('./router/notificationRouter.js');

const app = express()
const server = http.createServer(app);

app.use(bodyParser.json());
const port = process.env.PORT || 5000


// Sử dụng router cho dịch vụ chat
app.use('/api/v1/communicate/chat', chatRouter);
app.use('/api/v1/communicate/noti', notificationRouter);
app.use('/api/v1/communicate/mail', mailRouter);
app.use('/api/v1/communicate/rating', ratingRouter);

app.listen(port, async() => {
    await connect()
    console.log(`listening on portt : ${port}`)
})

eurekaHelper.registerWithEureka('communicate-service', port);

