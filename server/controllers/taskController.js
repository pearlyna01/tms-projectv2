const send_Email = require('../modules/sendEmail');

exports.doneTask = async (req,res) => {
    // notification message to send
    const Message = {
        email: process.env.SMTP_TO_EMAIL,
        subject: 'test notification',
        message: 'notification'
    };
    console.log(process.env.SMTP_TO_EMAIL);
    try {
        const test = await send_Email(Message);
        console.log('TESTING EMAIL RESPONSE========\n',test);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};