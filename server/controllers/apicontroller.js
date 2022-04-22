const bodyParser = require('body-parser');
const verifyPwd = require('../modules/verifyPwd');
const getQuery = require('../modules/getQuery');

module.exports = function(app) {
    // login
    // gets password -> verify password -> get roles -> set username & roles @ session
    app.post('/login', async (req,res) => {
        // lookup to retreive user's hashed pass 
        const query = `SELECT password FROM accounts WHERE username='${req.body.username}' AND inactive=0;`;
        console.log('request: ',req.body);
        
        // check if username and password is correct
        getQuery.processQuery(query, req.pool).then( result => {
            // print if received the password
            console.log('Password received from database: ',result);
            // user do not exist, send status 401
            if (result.length == 0) {
                res.sendStatus(401);
            }

            // verify the password based on the password input
            verifyPwd.verifyPass(result[0].password, req.body.password).then((stat) => {
                console.log('Verifying Done!');

                // retreive the roles for that user
                const query2  = `SELECT JSON_ARRAYAGG(groupName) AS roles FROM nodelogin.groups WHERE username="${req.body.username}";`;
                getQuery.processQuery(query2, req.pool).then((rows)=> {
                    // store username and roles in session
                    req.session.roles = rows[0].roles;
                    req.session.username = req.body.username;
                    req.session.isLoggedIn = true;
                    console.log(req.session)
                    res.status(200).send(req.session.roles);
                // failed to retrieve roles 
                }).catch((err) => { 
                    // send 500 status 
                    console.log(err)
                    res.status(500).send(); 
                    // Throw async to escape the promise chain
                    throw err;
                }); 
                
            // catch error in verifying password
            }).catch((err) => { 
                console.log('catched error in verifying password')
                res.sendStatus(stat); 
                throw err;
            });
        // catch error in getting the hashed password 
        }).catch (err => {
            console.log('catched error in querying password')
            res.sendStatus(500); 
            throw err;
        });
    });

    // logout user 
    app.post('/logout', (req,res) => {
        req.session.isLoggedIn = false;
        delete req.session;
        res.end();
    });

    // ALL USER ROUTES 
    // app.use((req,res,next) => {
    //     if (req.session.isLoggedIn) {
    //         console.log('user exists');
    //         next();
    //     }
        
    //     res.send("Need to login");
    // });

    // get session user's email
    app.get('/getEmail',(req,res) => {
        const query = `SELECT email FROM accounts WHERE username="${req.session.username}"`;

        // check if username and password is correct
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Email received: ',rows[0].email);
            
            res.send(rows[0].email);    
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });
    
    // update user's email
    app.post('/updateEmail', (req,res) => {
        // query to update email
        const query = `UPDATE accounts SET email="${req.body.email}" WHERE username="${req.session.username}"`;

        // update email in database
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Email updated. Response: ',rows);
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

     // update user's password
    app.post('/updatePassword', async (req,res) => {
        // hash new password
        const newPass = await verifyPwd.hashPass(req.body.password);

        // store new password
        const query = `UPDATE accounts SET password="${newPass}" WHERE username="${req.session.username}"`;

        // store password in database if username and password is correct
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Password updated. Response: ',rows);
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // ALL ADMIN ROUTES 
    // app.use((req,res,next) => {
    //     if (req.session.isLoggedIn) {
    //         console.log('user exists');
    //         next();
    //     }
        
    //     res.send("Need to login");
    // });

    // get a user's email (admin only)
    app.get('/getEmail/:user',(req,res) => {
        const query = `SELECT email FROM accounts WHERE username=${req.params.user}`;

        // retrieve email from database
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Email received: ',rows);
            
            res.send(JSON.stringify(rows[0].email));    
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // update a user's email (admin only)
    app.post('/updateEmail/:user', (req,res) => {
        // query to update email
        const query = `UPDATE accounts SET email="${req.body.email}" WHERE username="${req.params.user}"`;

        // update email in database
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Email updated. Response: ',rows);
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // update a user's password (admin only)
    app.post('/updatePassword/:user', async (req,res) => {
        // hash new password
        const newPass = await verifyPwd.hashPass(req.body.password);

        // store new password
        const query = `UPDATE accounts SET password="${newPass}" WHERE username="${req.params.user}"`;

        // store password in database if username and password is correct
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Password updated. Response: ',rows);
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // create user (admin only)
    app.post('/createUser', async (req,res) => {
        // hash password
        const hashNewPass = await verifyPwd.hashPass(req.body.password);

        // query to create a new user
        const query1 = `INSERT INTO accounts (username, password, email) 
        VALUES ("${req.body.username}", "${hashNewPass}", "${req.body.email}");`;

        // create a new account in the accounts table 
        getQuery.processQuery(query1, req.pool).then((rows) => {
            // print if user is successfully created
            console.log('User created. Response: ',rows);
            
            if (rows == "Duplicate") {
                res.send("User already exists");
            }

            res.status(200).send();
        }).catch((err) => { 
            console.log('Error received\n', err);
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 

        // create a string containing the VALUES
        // e.g. ('user1','groupname1'), ('user1','groupname2')
        const list = req.body.grp;
        var str = '';
        if ((list[0] != '')|| (list[0] != "")){
            console.log('reach here')
            for (let index = 0; index < list.length; index++) {
                const element = list[index];
                if (index == list.length-1) {
                    const value = `('${req.body.username}','${element}')`;
                    str = str.concat(value.toString());
                } else {
                    const value = `('${req.body.username}','${element}'),`;
                    str = str.concat(value.toString());
                }
            }
        }
        console.log('str: ',str)
        
        if (str !='') {
            // add the user to the group roles 
            const query2 = `INSERT INTO nodelogin.groups(username,groupName) VALUES ${str};`;
            console.log(query2)
            // create new rows in the groups table 
            getQuery.processQuery(query2, req.pool).then((rows) => {
                // print if user is successfully added to role groups
                console.log('New User created. Response: ',rows);
        
                res.status(200).send();
            }).catch((err) => { 
                console.log('Error received\n', err);
                // send 500 status 
                res.status(500).send(); 
                // Throw async to escape the promise chain
                throw err;
            });
        }
    });

    // disable a user (admin only) 
    app.post('/disableUser/:user', (req,res) => {
        const query = `UPDATE accounts SET inactive="1" WHERE username="${req.params.user}";`;

        // update the database to set inactive to false
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('User disabled.');
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // enable a user (admin only)
    app.post('/enableUser/:user',  (req,res) => {
        const query = `UPDATE accounts SET inactive="0" WHERE username="${req.params.user}";`;

        // update the database to set inactive to false
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('User enabled.');
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // send the list of group names (in a array) (admin only)
    app.get('/getGrpNames', async (req,res) => {
        const query = `SELECT JSON_ARRAYAGG(groupName) AS roles FROM nodelogin.groups WHERE username="desc"`;

        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Retrieved list of users.');
            
            res.send(rows);
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // OLD: get a list of username, their groups, active status (admin only)
    // app.get('/getUsers', (req,res) => {
    //     const query = `SELECT id,username,inactive,group_name FROM accounts WHERE NOT username="${req.session.username}"`;

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
    // });

    // get a list of username, their groups, active status (admin only)
    app.get('/getUsersList', (req,res) => {
        const query = `SELECT nodelogin.accounts.username, nodelogin.accounts.inactive,
        nodelogin.accounts.email,
        JSON_ARRAYAGG(nodelogin.groups.groupName) AS roles
        FROM nodelogin.accounts 
        LEFT JOIN nodelogin.groups
        ON nodelogin.groups.username = nodelogin.accounts.username
        GROUP BY nodelogin.accounts.username;`;

        // update the database to set inactive to false
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Retrieved list of users.');
            
            res.send(rows);
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // get a list of username, their groups, active status (admin only)
    // search by role 
    app.post('/getUsersList/searchRole', (req,res) => {
        // query to get the users with the role
        const query1 = `SELECT nodelogin.groups.username FROM nodelogin.groups WHERE groupName='${req.body.roles}';`;
        console.log('req: ',req.body, ",")
        
        // get the list of users that has the role from the database
        getQuery.processQuery(query1, req.pool).then((rows) => {
            // print if received the password
            console.log('Retrieved list of users with the role.');
            // arr = rows;
            
            // format the query in a string 
            const list = rows;
            var str = '(';
            if ((list[0] != '')|| (list[0] != "")){
                console.log('reach here')
                for (let index = 0; index < list.length; index++) {
                    const element = list[index].username;
                    if (element != 'desc') {
                        if (index == list.length-1) {
                            const value = `'${element}')`;
                            str = str.concat(value.toString());
                        } else {
                            const value = `'${element}',`;
                            str = str.concat(value.toString());
                        }
                    }
                }
            }
            console.log('str: ',str) 
            // return empty array if there is no user with the role
            if (str ==='(') {res.send([]);} 

            // query to get the users' details
            const query2 = `SELECT nodelogin.accounts.username, nodelogin.accounts.inactive,
            nodelogin.accounts.email,
            JSON_ARRAYAGG(nodelogin.groups.groupName) AS roles
            FROM nodelogin.accounts 
            LEFT JOIN nodelogin.groups
            ON nodelogin.groups.username = nodelogin.accounts.username
            WHERE nodelogin.accounts.username IN ${str}
            GROUP BY nodelogin.accounts.username;`;
            
            console.log('query2 ',query2)
            // get the list of users' details who has the role 
            getQuery.processQuery(query2, req.pool).then((rows) => {
                // print if received the password
                console.log('Retrieved list of users details.',rows);
                
                res.send(rows);
            }).catch((err) => { 
                // send 500 status 
                res.status(500).send(); 
                // Throw async to escape the promise chain
                throw err;
            }); 
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        }); 
    });

    // assign user to a group (admin only)
    app.post('/assignUserRole',(req,res) => {
        console.log(req.body)
        const query = `INSERT INTO nodelogin.groups(username,groupName) VALUES ("${req.body.user}","${req.body.groupName}");`;

        // update the database to set inactive to false
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Assigned user to:',req.body.groupName);
            
            res.send(rows);
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        });
    });

    // remove user from a role group (admin only)
    app.post('/removeUserRole',(req,res) => {
        const query = `DELETE FROM nodelogin.groups WHERE username="${req.body.user}" AND groupName="${req.body.groupName}";`;

        // update the database to remove a row where it match username and group name
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if received the password
            console.log('Removed user from:',req.body.user);
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        });
    });

    // create a role group (admin only)
    app.post('/createRoleGrp',(req,res) => {
        const query = `INSERT INTO nodelogin.groups(username,groupName) VALUES ('desc','${req.body.groupName}');`;
        
        // query to insert a role group
        getQuery.processQuery(query, req.pool).then((rows) => {
            if (rows === "Duplicate") {
                res.send("Duplicate role group");
            } else {
                // print if created role group
                console.log('Created role group:',req.body.groupName);
            }

            res.status(200).send("Done");
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        });
    });

    // delete a row group (admin only)
    app.post('/removeRoleGrp',(req,res) => {
        const query = `DELETE FROM nodelogin.groups WHERE groupName="${req.body.groupName}";`;

        // query to delete a role group
        getQuery.processQuery(query, req.pool).then((rows) => {
            // print if removed role group
            console.log('Removed role group:',req.body.groupName);
            
            res.status(200).send();
        }).catch((err) => { 
            // send 500 status 
            res.status(500).send(); 
            // Throw async to escape the promise chain
            throw err;
        });
    });
}