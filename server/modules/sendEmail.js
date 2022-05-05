"use strict";
const nodemailer = require('nodemailer');
const getQuery = require('./getQuery');

// Function to send email
// Requires content = { email, subject, message }
const sendEmail = async content => {
    const transporter = nodemailer.createTransport({
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        secure : false,
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

// sending the email notification where sender = task_creator's email and task_name is the task name
async function sendNotif(sender,task_name){
    console.log('email',sender)
    const content = {
        email: sender,
        subject: `Team member completed task: ${task_name}`,
        message: `Hi, A team member has completed a task: "${task_name}" 
        \nPlease check and set the task to \'close\' to approve it.`
    };
    try {
        await sendEmail(content);
        return 'ok'
    } catch (err) {
        console.log('Error in sending email notification')
        console.log(err)
        return err
    }
}

module.exports = {
    sendEmail:sendEmail,
    sendNotif:sendNotif
};