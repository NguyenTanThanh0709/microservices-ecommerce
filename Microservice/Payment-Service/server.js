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