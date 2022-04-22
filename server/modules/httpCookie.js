// Create and send token and save in cookie 
const sendToken = (statusCode, res) => {
    // Options for cookie
    const options = {
        httpOnly : true,
        expires : new Date(Date.now() + 7 * 24*60*60*1000)
    };

    res.status(statusCode)
        .cookie('expiry','expiry',options).send();
}

module.exports =  sendToken;