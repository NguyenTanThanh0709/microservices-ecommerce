const config = require('config');
const moment = require('moment');
const querystring = require('qs');
const crypto = require('crypto');
const paymentService  = require('./payment_service');

// Your code here

exports.createPayment = async (req, res) => {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');
    
    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');
    let vnpUrl = config.get('vnp_Url');
    let returnUrl = config.get('vnp_ReturnUrl');
    let orderId = moment(date).format('DDHHmmss');

    let amount = req.body.amount;
    let paymentMethod = req.body.paymentMethod;
    let orderid = req.body.orderid;
    let bankCode = 'VNBANK';


    let locale = 'vn';
    if(locale === null || locale === ''){
        locale = 'vn';
    }
    let currCode = 'VND';
    
    
    
    let vnp_Params = {};
    if(bankCode !== null && bankCode !== ''){
        vnp_Params['vnp_BankCode'] = bankCode;
    }

    vnp_Params['vnp_OrderInfo'] = orderid  + '_' + paymentMethod;
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = locale;
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    

    vnp_Params = sortObject(vnp_Params);

    
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });
    res.status(200).json(vnpUrl);
};


exports.returnPayment = async (req, res) => {
    console.log(req)
    let vnp_Params = req.query;

    let secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);

    let tmnCode = config.get('vnp_TmnCode');
    let secretKey = config.get('vnp_HashSecret');

    
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     

    if(secureHash === signed){
        let responseCode = vnp_Params['vnp_ResponseCode'];
        let vnp_OrderInfo = vnp_Params['vnp_OrderInfo'];
        console.log(responseCode)
        console.log(vnp_OrderInfo)
        let data =  vnp_OrderInfo.split('_');
        let orderid = parseInt(data[0]);
        let paymentMethod = data[1];
        
        if(responseCode == '00') {
            // Giao dịch thành công, bạn có thể xử lý ở đây
            const payment = await paymentService.addPayment(0, orderid, paymentMethod, 'COMPLETED');
            console.log('Payment successful:', payment);
            if(payment){

                res.redirect(`http://localhost:3000/payment-result?vnp_ResponseCode=00&vnp_TransactionStatus=00&vnp_OrderInfo=${vnp_OrderInfo}`);
            }
            
        } else {

            // Giao dịch không thành công, chuyển hướng đến trang thông báo lỗi
            const payment = await paymentService.addPayment(0, orderid, paymentMethod, 'CANCELLED');
            console.log('Payment CANCELLED:', payment);

            if(payment){

                res.redirect(`http://localhost:3000/payment-result?vnp_ResponseCode=01&vnp_TransactionStatus=01&vnp_OrderInfo=${vnp_OrderInfo}`);
            }
            
        }
    } else{
        res.render('success', {code: '97'})
    }
};

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

