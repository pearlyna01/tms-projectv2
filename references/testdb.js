const mysql = require('mysql2');

// creating One connection
// const dbConn = mysql.createConnection({
//     host: 'localhost',
//     port: 3306,
//     user: 'root',
//     password: '002300',
//     database: 'nodelogin'
// });

// creating a pool of connections
const dbConnPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '002300',
    database: 'nodelogin'
});

// getting a pool of connections
dbConnPool.getConnection(function(err,connection){
    // print error from unable to connect to database
    if(err){
      console.log(err);
      return;
    }

    connection.query('SELECT * FROM accounts',function(err,rows,fields){
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

    // close the pool of connections not necessary
    dbConnPool.end();
});
