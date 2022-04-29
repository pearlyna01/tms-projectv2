// This file contains routes for tasks related
const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require('../modules/checkAuth');

const { doneTask } = require('../controllers/taskController');

router.route('/sendMail').put(doneTask);

module.exports = router;