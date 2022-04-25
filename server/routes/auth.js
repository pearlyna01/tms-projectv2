const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require('../modules/checkAuth');
const { 
    logIn,
    loginOut,
    createUser
} = require('../controllers/authController');

// router.route('/login').post(logIn);
// router.route('/logout').post(logOut);

// router.route('/createUser').post(createUser);