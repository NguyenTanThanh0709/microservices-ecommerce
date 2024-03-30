// Import thư viện Nodemailer
const nodemailer = require('nodemailer');
const inlineBase64 = require('nodemailer-plugin-inline-base64');


const transporter = nodemailer.createTransport({
    service: 'smtp.gmail.com',
    auth: {
        user: 'lekhanhuyenn.12@gmail.com',
        pass: 'frbgrgcfqhhzxgva'
    }
});

// Sử dụng plugin inlineBase64
transporter.use('compile', inlineBase64());

// Hàm gửi email
const sendEmail = (to, subject, text) => {
    // Thông tin email
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    // Gửi email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

