const verifyPwd = require('../modules/verifyPwd');
const getQuery = require('../modules/getQuery');

// Log in user
exports.loginUser = async (req,res) => {
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
};

// Log out user
exports.logoutUser = async (req,res) => {
    delete req.session;
    res.end();
};

// Create a user
exports.createUser = async (req,res) => {
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
        console.log('Transforming list of group values')
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
    console.log('values to insert into the groups table:\n ',str)
    
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
};

// Get user email
exports.getEmail = (req,res) => {
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
};

// Update email
exports.updateEmail = (req,res) => {
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
};

// Update password
exports.updatePassword = async (req,res) => {
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
};

// ---------------ADMIN ONLY------------------------
// Admin: get user's email
exports.getUserEmail = (req,res) => {
    const query = `SELECT email FROM accounts WHERE username=${req.params.user}`;

    // retrieve email from database
    getQuery.processQuery(query, req.pool).then((rows) => {
        // print if received the password
        console.log('Email received: ', rows);

        res.send(JSON.stringify(rows[0].email));
    }).catch((err) => {
        // send 500 status 
        res.status(500).send();
        // Throw async to escape the promise chain
        throw err;
    });
};

// Admin: update a user's email
exports.updateUserEmail = (req,res) => {
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
};

// Admin: update a user's password
exports.updateUserPassword = async (req,res) => {
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
};

// Admin: disable user
exports.disableUser = (req,res) => {
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
};

// Admin: enable user
exports.enableUser = (req,res) => {
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
};

// Admin: get list of group names/roles
exports.getGrpNames = async (req,res) => {
    const query = `SELECT JSON_ARRAYAGG(groupName) AS roles FROM nodelogin.groups WHERE username="desc" AND active='1'`;

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
};

// Admin: get the list of users details with role
exports.getUserList = (req,res) => {
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
};

// Admin: get the list of users BY ROLE
exports.getUserListByRole = (req,res) => {
    // query to get the users with the role
    const query1 = `SELECT nodelogin.groups.username FROM nodelogin.groups WHERE groupName='${req.body.roles}' AND active='1';`;
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
};

// Admin: create role group
exports.createRoleGroup = (req,res) => {
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
};

// Admin: delete role group 
exports.deleteRoleGroup = (req,res) => {
    const query = `UPDATE nodelogin.groups SET active='0' WHERE groupName="${req.body.groupName}";`;

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
};

// Admin: add user to a role group
exports.addUserRoleGroup = (req,res) => {
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
};

// Admin: remove user from role group
exports.removeUserRoleGroup = (req,res) => {
    const query = `DELETE FROM nodelogin.groups WHERE username="${req.body.user}" AND groupName="${req.body.groupName}";`;

    // update the database to remove a row where it match username and group name
    getQuery.processQuery(query, req.pool).then((rows) => {
        // print if received the password
        console.log('Removed user from:', req.body.user);

        res.status(200).send();
    }).catch((err) => {
        // send 500 status 
        res.status(500).send();
        // Throw async to escape the promise chain
        throw err;
    });
};