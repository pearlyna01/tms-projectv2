const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require('../modules/checkAuth');
const { 
    
} = require('../controllers/authController');

// router.route('/login').post();

