// testing mysql using promise 
const config = require('./config/dbconfig.json');

async function example1 () {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection(config);
    let [rows, fields] = await conn.execute('SELECT * FROM accounts');
    
    console.log(rows);
  }

example1();