const argon2 = require('argon2');

// hashing a password
async function hashPassword(password) {
    try {
        return await argon2.hash(password);
    } catch {
        console.log('Error');
    }
}

hashPassword('password').then((hashedPassword) => {
    // hashedPassword contains the hash
    console.log(hashedPassword);
});
