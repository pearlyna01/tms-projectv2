const bodyParser = require('body-parser');
const verifyPwd = require('../modules/verifyPwd');

module.exports = function(app) {
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // login
    app.post('/login', (req,res) => {
        console.log('reached /login');

        // lookup to retreive user's hashed pass 
        const dbPass = "QUACK";

        verifyPwd.hashPass('QUACK').then((hashedPassword) => {
            // verifying the hash
            verifyPwd.verifyPass(hashedPassword,req.query.pass).then(() => {
                console.log('Done!');
                res.end();
            });
        });
    });

    // create user
    app.post('/createUser', (req,res) => {
        console.log('reached /createUser');

        
    });

}