const mysql = require('mysql2');
const config = require('../config/dbconfig.json');

// creating a pool of connections
const dbConnPool = mysql.createPool(config);

module.exports = function(app) {
    
    // middleware for accessing sql database
    app.use(function (req, res, next) {
        req.pool = dbConnPool;
        next();
    });

}