// This file helps to restart the admin password
const mysql = require('mysql2');
const verifyPwd = require('./modules/verifyPwd');

// creating a pool of connections
const dbConnPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '002300',
    database: 'nodelogin'
});

const hash = verifyPwd.hashPass('admin123!');

// getting a pool of connections
dbConnPool.getConnection(function(err,connection){
    // print error from unable to connect to database
    if(err){
      console.log(err);
      return;
    }

    hash.then((pass)=>{
        console.log(pass);
        console.log('no. of length:',pass.length);

        connection.query(`UPDATE accounts SET password = '${pass}' WHERE username='admin'`, function (err, rows, fields) {
            // release the connection from query
            connection.release();

            // print error from unable to query
            if (err) {
                console.log(err);
                return;
            }

            // console log the rows
            console.log(rows);
        });
    });
    

});

    