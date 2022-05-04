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

// Check group roles/ permissions 
exports.checkGrp = async (req, res) => {
    
};