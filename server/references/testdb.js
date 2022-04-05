const mysql = require('mysql2');

const dbConn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '002300',
    database: 'nodelogin'
});

dbConn.connect(err => {
    if (err) throw err;
    console.log('Connected!');
});