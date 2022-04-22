'strict mode';
const Promise = require('promise');

module.exports = {
    // function to get a connection from connection pool, send query to database
    // and receive the result from the database
    // REQUIRES a string query and database connection pool 
    processQuery: (Query,dbConnPool) => {
        // return a promise to return the result
        return new Promise(function(resolve, reject) {
            // get connection from connection pool 
            dbConnPool.getConnection(function (err, connection) {
                // print error from unable to get connection
                if (err) {
                    console.log('Unable to get connection.\n',err);
                    throw err;
                }
                
                // get result from query
                connection.query(Query, function (err, rows) {
                    connection.release();
                    
                    console.log(rows);
                    
                    if (err) {  
                        // send a message that its duplicate error
                        if (err.errno === 1062) {
                            resolve("Duplicate");
                        }
                        reject(err);
                    }
                    
                    // return the result from the query
                    resolve(rows);
                });
            })
        });
    }
}

