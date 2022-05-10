// This file contains routes for tasks related
const express = require('express');
const router = express.Router();

const { 
    isAuthenticated, 
    authorizeRoles,
    addReq, checkUserGrp, checkUserPerm
} = require('../modules/checkAuth');

const { 
    createApp, getAllApps,
    createTask, createPlan,
    setToDo, setDoing, setDone, setClose,
    getAppPlans, getAppTasks, getAppInfo,
    getUserPerms,
    doneTask 
} = require('../controllers/taskController');

// test sending email NEED TO REMOVE THIS
// router.route('/sendMail').put(doneTask);

// Get all plans of an app
router.route('/getAppPlans/:app').get( getAppPlans);

// Get all tasks of an app
router.route('/getAppTasks/:app').get( getAppTasks);

// Get an App info 
router.route('/getAppInfo/:app').get( getAppInfo);

// Get all Apps info
router.route('/getAllApps').get( getAllApps);

// Get user permissions in an App
router.route('/getPerms/:app').get( getUserPerms);

// Lead/user with createT permit: create Task
router.route('/createTask').post(
    isAuthenticated,
    createTask
);
// PM/user with createP permit: create Plan
router.route('/createPlan').post(
    isAuthenticated,
    createPlan
);


// PM/user with todo permit: approve task/ open->toDo
router.route('/setToDo').put(
    isAuthenticated,
    setToDo
);
// TM/user with doing permit: to-do->doing
router.route('/setDoing').put(
    isAuthenticated,
    setDoing
);
// TM/user with doing permit: doing->done
router.route('/setDone').put(
    isAuthenticated,
    setDone
);
// TM/user with doing permit: done->close
router.route('/setClose').put(
    isAuthenticated,
    setClose
);

// ------------ADMIN ROUTES-------------
// Admin: create App
router.route('/createApp').post(
    isAuthenticated, 
    //authorizeRoles(['Admin']), 
    addReq('Admin'),
    checkUserGrp,
    createApp
);

module.exports = router;