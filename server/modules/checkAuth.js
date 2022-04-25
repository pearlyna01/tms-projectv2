// Middleware for checking roles and logging 

// Checks if user is authenticated or not 
exports.isAuthenticated = async(req, res, next) => {
    
    // Check if user is logged in
    if (!req.cookies) {
        console.log('User needs to log in');
        res.sendStatus(401);
    }

    next();
};

// Checks if it is authorised to enter route
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.roles)) {
            res.sendStatus(401);
        }
        
        next();
    }
}