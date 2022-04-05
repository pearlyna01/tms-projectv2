// This file contains functions for verifying and storing hashed passwords
const argon2 = require('argon2');

// hashing a password
const hashPass = async(password) => {
    try {
        // return hashed password (promise pending)
        return await argon2.hash(password);
    } catch (err) {
        // unable to hash password
        console.log('Unable to hash password');
    }
}

// verifying hashed password
const verifyPass = async(hashPass,inputPass) => {
    try {
        // comparing the hash against plaintext password
        if (await argon2.verify(hashPass, inputPass)) {
            // password match
            console.log("Password matched! Successful login!");
        } else {
            // password did not match
            console.log("Password did not match.");
        }
    } catch (err) {
        // received error
        console.log('Error in verifying password.')
    }
}

// exporting functions in module
module.exports = {
    hashPass:hashPass,
    verifyPass:verifyPass
}