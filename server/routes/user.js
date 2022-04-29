// This file contains routes for common user routes and admin routes
const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require('../modules/checkAuth');
const { 
    loginUser, logoutUser, createUser,
    getEmail,
    updateEmail, updatePassword,
    getUserEmail,
    updateUserEmail, updateUserPassword,
    enableUser, disableUser,
    getGrpNames, getGrpNamesByUser, getUsersList, getUserListByRole,
    createRoleGroup, deleteRoleGroup,
    addUserRoleGroup, removeUserRoleGroup
} = require('../controllers/userController');

// COMMON USER ROUTES
router.route('/loginUser').post(loginUser);
router.route('/logoutUser').post(isAuthenticated, logoutUser);
router.route('/getEmail').get(isAuthenticated, getEmail);
router.route('/updateEmail').post(isAuthenticated, updateEmail);
router.route('/updatePassword').post(isAuthenticated, updatePassword);

// ADMIN ROUTES 
router.route('/createUser').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    createUser
);
router.route('/getEmail/:user').get(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    getUserEmail
);
router.route('/updateEmail/:user').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    updateUserEmail
);
router.route('/updatePassword/:user').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    updateUserPassword
);
router.route('/updatePassword/:user').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    updateUserPassword
);
router.route('/enableUser/:user').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    enableUser
);
router.route('/disableUser/:user').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    disableUser
);
router.route('/getGrpNames').get(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    getGrpNames
);
router.route('/getGrpNames/:username').get(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    getGrpNamesByUser
);
router.route('/getUsersList').get(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    getUsersList
);
router.route('/getUsersList/searchRole').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    getUserListByRole
);
router.route('/createRoleGrp').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    createRoleGroup
);
router.route('/removeRoleGrp').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    deleteRoleGroup
);
router.route('/assignUserRole').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    addUserRoleGroup
);
router.route('/removeUserRole').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    removeUserRoleGroup
);


module.exports = router;