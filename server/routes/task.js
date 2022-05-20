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
    editTask, editApp, addComment, editPlan,
    setToDo, setDoing, setDone, setClose,
    getAppPlans, getAppTasks, getAppInfo, getTaskDetail, getOneAppInfo,
    getUserPerms 
} = require('../controllers/taskController');

// Get all plans of an app
router.route('/getAppPlans/:app').get( getAppPlans);

// Get all tasks of an app
router.route('/getAppTasks/:app').get( getAppTasks);

// Get details of a task of an app
router.route('/getAppTask/:taskID').get( getTaskDetail);

// Get an App info 
router.route('/getAppInfo/:app').get( getAppInfo);

// Get an App info (with permission details)
router.route('/getOneAppInfo/:app').get( getOneAppInfo);

// Get all Apps info
router.route('/getAllApps').get( getAllApps);

// Get user permissions in an App
router.route('/getPerms/:app').get( getUserPerms);

// Lead/user with create permit: create Task
router.route('/createTask').post(
    isAuthenticated,
    createTask
);
// Lead/user with create permit: edit task
router.route('/editTask').put( isAuthenticated, editTask);
// add comment to task
router.route('/addComment').put( isAuthenticated, addComment);
// PM: create Plan
router.route('/createPlan').post(
    isAuthenticated,
    createPlan
);
// PM: edit Plan
router.route('/editPlan').post(
    isAuthenticated,
    editPlan
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

// PM: create App
router.route('/createApp').post(
    isAuthenticated, 
    createApp
);
// PM: create App
router.route('/editApp').post(
    isAuthenticated, 
    editApp
);
module.exports = router;