// Middleware for checking roles and logging 

// Checks if user is authenticated or not 
exports.isAuthenticated = async(req, res, next) => {
    // Check if user is logged in
    console.log(req.session)
    if (req.session.username) {
        next();
    } else {
        console.log('User needs to log in');
        res.sendStatus(401);
    }
};

// CHECK GROUP FUNCTION 
const mysql = require('mysql2');
const config = require('../config/dbconfig.json');
const Promise = require('promise');
async function checkGroup(username, groupName) {
    return new Promise(function(resolve,reject) {
        const con = mysql.createConnection(config);     // create connection
        con.connect((err) => {
            if (err) reject(err);
            console.log("Connected to database");
            const query = `SELECT json_arrayagg(groupName) AS grpNames FROM nodelogin.groups 
        WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="${username}" GROUP BY groupName)
        AND active='1'
        AND groupName in (
            SELECT groupName FROM nodelogin.groups 
            WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
            AND active='1');`;
            // query to database
            con.query(query, function (err, result) {
                if (err) throw err;
                console.log(result[0].grpNames)
                console.log(groupName)
                if (result[0]['grpNames'].includes(groupName)) {
                    console.log('found it')
                    resolve(true);
                } else {
                    console.log('not found it')
                    resolve(false);
                }
            });
        });
    });
}

exports.addReq = (toQuery) => {
    return (req,res,next) => { 
        req.session.toQuery = toQuery;
        next();
    }    
}

// check if user has the role group to enter route 
exports.checkUserGrp = (req,res,next) => {
    //console.log(req.session)
    checkGroup(req.session.username, req.session.toQuery).then(check => {
        if (check) {
            console.log(`User has the role ${req.session.toQuery}`)
            next();
        } else {
            console.log(`User don't have the role ${req.session.toQuery}`)
            res.sendStatus(403);
        }
    }).catch(err => {
        console.log('error encountered with checkUserGrp function.')
        console.log(err)
        res.sendStatus(500);
    });
};

// Checks if it is authorised to enter route
exports.authorizeRoles = (roles) => {
    return (req, res, next) => {
        let check = false;
        
        // for each authorisedRole, check if it exists in req.session.roles
        // if user don't have a role
        if (!req.session.roles) {
            console.log(`User do not have access to route. No roles`)
            res.status(403).json({ message: 'User dont have access.'});
        // if user have roles 
        } else {
            // If have roles check if it includes the authorized roles
            for (let index = 0; index < roles.length; index++) {
                console.log(roles[index])
                if (!req.session.roles.includes(roles[index])) {
                    console.log(`User do not have access to route`)
                    res.status(403).json({ message: 'User dont have access.'});
                }
            }  
            check = true;
        }
        
        // allow user to proceed to the next role if user is authorized
        if (check) {
            console.log(`User have access to route`)
            next();
        }
    }
};

// ------------- checking user permission based on app ---------------------------------------
const getQuery = require('./getQuery');
// get the list of user roles 
async function listGroups(username, pool) {
    return new Promise(function(resolve,reject) {
        const query = `SELECT json_arrayagg(groupName) AS grpNames FROM nodelogin.groups 
        WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="${username}" GROUP BY groupName)
        AND active='1'
        AND groupName in (
            SELECT groupName FROM nodelogin.groups 
            WHERE id IN (SELECT MAX(id) FROM nodelogin.groups WHERE username="desc" GROUP BY groupName)
            AND active='1');`;
        
        // query to database
        getQuery.processQuery(query, pool).then(result => {
            console.log('listgroups\n',result)
            resolve(result[0].grpNames);
        }).catch( err => reject(err) );
    });
}
// returns list of users in the permissions
// parameters : permmission type, application acronym, req.pool
async function checkPerm(permType, app, user, pool) {
    const query = `SELECT ${permType} FROM nodelogin.application WHERE App_Acronym='${app}';`;
    return new Promise(async function(resolve, reject) {
        try {
            // get the list of user roles 
            const groups = await listGroups(user, pool);
            const result = await getQuery.processQuery(query, pool);
            const len = result[0][permType].length;
            console.log('length',len)
            for (let i = 0; i < len; i++) {
                if (groups.includes(result[0][`${permType}`][i])) {
                    resolve(true);
                }
            }
            resolve(false);
        } catch (error) {
            reject(error);
        }
    });
}
// Check group roles/ permissions 
// i.e. if user has the permission to do this action under the app permission
exports.checkUserPerm = async (req, action) => {
    return new Promise(function(resolve, reject) {
        // route will continus if user has admin
        // if (req.session.roles.includes('Admin')) {
        //     next();
        // } else {
        switch (action) {
            case 'createTask':
                checkPerm('App_permit_CreateT', req.body.app, req.session.username, req.pool)
                    .then(result => {
                        if (result === true) { resolve(true); }
                        else { resolve(false); }
                    }).catch(err => {
                        console.log('error in checking permit\n', err);
                        reject(err);
                    });
                break;
            case 'createPlan':
                checkPerm('App_permit_CreateP', req.body.app, req.session.username, req.pool)
                    .then(result => {
                        if (result === true) { resolve(true); }
                        else { resolve(false); }
                    }).catch(err => {
                        console.log('error in checking permit\n', err);
                        reject(err);
                    });
                break;
            case 'setToDo':
                checkPerm('App_permit_ToDo', req.body.app, req.session.username, req.pool)
                    .then(result => {
                        if (result === true) { resolve(true); }
                        else { resolve(false); }
                    }).catch(err => {
                        console.log('error in checking permit\n', err);
                        reject(err);
                    });
                break;
            case 'setDoing':
                checkPerm('App_permit_Doing', req.body.app, req.session.username, req.pool)
                    .then(result => {
                        if (result === true) { resolve(true); }
                        else { resolve(false); }
                    }).catch(err => {
                        console.log('error in checking permit\n', err);
                        reject(err);
                    });
                break;
            case 'setDone':
                checkPerm('App_permit_Doing', req.body.app, req.session.username, req.pool)
                    .then(result => {
                        if (result === true) { resolve(true); }
                        else { resolve(false); }
                    }).catch(err => {
                        console.log('error in checking permit\n', err);
                        reject(err);
                    });
                break;
            case 'setClose':
                checkPerm('App_permit_Close', req.body.app, req.session.username, req.pool)
                    .then(result => {
                        if (result === true) { resolve(true); }
                        else { resolve(false); }
                    }).catch(err => {
                        console.log('error in checking permit\n', err);
                        reject(err);
                    });
                break;
            default:
                reject('error: no parameter to query');
        }
    });
};