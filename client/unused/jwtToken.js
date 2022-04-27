
// Create token to send in a cookie
const sendToken = (user, statusCode, res, message) => {
    // create token
    const token = user.getJwtToken();

    // Options for cookie
    const options = {
        httpOnly : true,
        expires: new Date(Date.now() + 24*60*60*1000)
    };

    // send the token
    res.status(statusCode)
        .cookie('token', token ,options)
        .json({ token, message });
}

module.exports =  sendToken;