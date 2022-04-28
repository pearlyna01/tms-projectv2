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

// Admin: get the list of users details with role
// exports.getUserList = (req,res) => {
//     const query = `SELECT nodelogin.accounts.username, nodelogin.accounts.inactive,
//     nodelogin.accounts.email,
//     JSON_ARRAYAGG(nodelogin.groups.groupName) AS roles
//     FROM nodelogin.accounts 
//     LEFT JOIN nodelogin.groups
//     ON nodelogin.groups.username = nodelogin.accounts.username
//     GROUP BY nodelogin.accounts.username;`;

//     // update the database to set inactive to false
//     getQuery.processQuery(query, req.pool).then((rows) => {
//         // print if received the password
//         console.log('Retrieved list of users.');
        
//         res.send(rows);
//     }).catch((err) => { 
//         // send 500 status 
//         res.status(500).send(); 
//         // Throw async to escape the promise chain
//         throw err;
//     }); 
// };

// Admin: create role group
// exports.createRoleGroup = (req,res) => {
//         const query = `INSERT INTO nodelogin.groups(username,groupName) VALUES ('desc','${req.body.groupName}');`;
        
//         // query to insert a role group
//         getQuery.processQuery(query, req.pool).then((rows) => {
//             if (rows === "Duplicate") {
//                 res.send("Duplicate role group");
//             } else {
//                 // print if created role group
//                 console.log('Created role group:',req.body.groupName);
//             }
    
//             res.status(200).send("Done");
//         }).catch((err) => { 
//             // send 500 status 
//             res.status(500).send(); 
//             // Throw async to escape the promise chain
//             throw err;
//         });
//     };

// Admin: delete role group 
// exports.deleteRoleGroup = (req,res) => {
//         const query = `UPDATE nodelogin.groups SET active='0' WHERE groupName="${req.body.groupName}";`;
    
//         // query to delete a role group
//         getQuery.processQuery(query, req.pool).then((rows) => {
//             // print if removed role group
//             console.log('Removed role group:',req.body.groupName);
            
//             res.status(200).send();
//         }).catch((err) => { 
//             // send 500 status 
//             res.status(500).send(); 
//             // Throw async to escape the promise chain
//             throw err;
//         });
//     };