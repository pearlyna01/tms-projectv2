// a backlog of code that i did not use

/* function to get query result from database */
// function test(Query,dbConnPool) {
//     dbConnPool.getConnection(async function (err, connection) {
//         // print error from unable to connect to database
//         if (err) {\][[[\;;\\\\\\;;\\\\\\\\\\\\\\\\\\\\\\]]]
//             console.log('Unable to connect to database\n',err);
//             return;
//         }
        
//         // connection.query(Query, async function (err, rows) {
//         //     if (err) console.log('Unable to query\n',err); 
//         //     console.log(rows)
//         //     const result = await rows;
//         //     return result;
//         // })
//         const query = util.promisify(connection.query).bind(connection);
//         var rows;
//         try {
//             rows = await query(Query);
//             console.log(rows);
            
//         } finally {
//             connection.release();
//         }
//         return rows;
//     });
// }

// getQuery.processQuery(query, req.pool).then((data) => {
        //   res.send(data);
        // });
    
// result1.then((Result)=>{
//     console.log('query result', Result);
    
// });


// getLastRecord('name_record').then(function(rows) {
//     // now you have your rows, you can see if there are <20 of them
// }).catch((err) => setImmediate(() => { throw err; })); 

// ANOTHER GOOD BACKUP

// getQuery.processQuery(query, req.pool).then((rows) => {
        //     // print if received the password
        //     console.log('Password received from database: ',rows);
            
        //     // user do not exist, send status 401
        //     if (rows.length === 0) {
        //         res.sendStatus(401);
        //     }

        //     // verify the password based on the password input
        //     verifyPwd.verifyPass(rows[0].password, req.body.password).then((stat) => {
        //         console.log('Verifying Done!');

        //         // store user's session
        //         if (stat === 200) {
        //             req.session.username = req.body.username;
        //         }
                
        //         res.sendStatus(stat);
        //     // catch error in verifying password
        //     }).catch((err) => { 
        //         res.sendStatus(stat); 
        //         throw err;
        //     });
        // }).catch((err) => { 
        //     // send 500 status 
        //     res.status(500).send(); 
        //     // Throw async to escape the promise chain
        //     throw err;
        // }); 