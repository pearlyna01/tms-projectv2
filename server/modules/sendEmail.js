"use strict";
const nodemailer = require('nodemailer');

// Function to send email notification to 'Lead' when 'Team Member' has completed task
// Requires content = { email, subject, message }
const send_Email = async content => {
    const transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure: false,
        auth : {
            user : process.env.SMTP_EMAIL,
            pass : process.env.SMTP_PASSWORD
        }
    });

    const message = {
        from : ` sender email <${process.env.SMTP_EMAIL}>`,
        to:  content.email,
        subject : content.subject,
        text : content.message
    };

    // transporter.sendMail(message, function (error, info) {
    //     if (error) {
    //         return console.log(error);
    //     }

    //     return info.response;
    // });

    const test = await transporter.sendMail(message);
    console.log(nodemailer.getTestMessageUrl(test))
}

module.exports = send_Email;