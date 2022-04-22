const argon2 = require('argon2');

// hashing a password
async function hashPassword(password) {
    try {
        // hashing password
        return await argon2.hash(password);
    } catch {
        console.log('Error: Unable to hash pass');
    }
}

// verifying hashed password
const verifyPass = async(test) => {
    try {
        // comparing the hash against the plaintext password
        if (await argon2.verify(test, "password")) {
            
            // password match
            console.log("Password matched! Successful login!");
        
        } else {
            
            // password did not match
            console.log("Password did not match.");
        
        }
    } catch (err) {
        // received error
        console.log(err);
    }
}

hashPassword('password').then((hashedPassword) => {
    
    // verifying the hash
    verifyPass(hashedPassword).then((ok) => {
        console.log('Done!');
    });
});

