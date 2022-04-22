"use strict";
var nodemailer = require('nodemailer');
// link https://nodemailer.com/smtp/testing/
// Create the transporter with the required configuration for Outlook
// change the user and pass !
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
       ciphers:'SSLv3'
    },
    auth: {
        user: '',
        pass: ''
    }
});


// setup e-mail data
const mailOptions = {
    from: '"Our Code World 2" <littlemisswallflower@outlook.com>', // sender address (who sends)
    to: 'pearlyna_lim@hotmail.com', // list of receivers (who receives)
    subject: 'Hello', // Subject line
    text: 'Hello world ', // plaintext body
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});