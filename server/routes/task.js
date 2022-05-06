// This file contains routes for tasks related
const express = require('express');
const router = express.Router();

const { isAuthenticated, authorizeRoles } = require('../modules/checkAuth');

const { 
    createApp, getAllApps,
    createTask, createPlan,
    setToDo, setDoing, setDone, setClose,
    getAppPlans,
    doneTask 
} = require('../controllers/taskController');

// test sending email NEED TO REMOVE THIS
router.route('/sendMail').put(doneTask);

// get all plans of an app
router.route('/getAppPlans/:app').get( getAppPlans);

// Admin: get all Apps info
router.route('/getAllApps').get(getAllApps);
// Admin: create App
router.route('/createApp').post(
    isAuthenticated, 
    authorizeRoles(['Admin']), 
    createApp
);
// Lead/user with createT permit: create Task
router.route('/createTask').post(
    createTask
);
// PM/user with createP permit: create Plan
router.route('/createPlan').post(
    createPlan
);


// PM/user with todo permit: approve task/ open->toDo
router.route('/setToDo').put(
    setToDo
);
// TM/user with doing permit: to-do->doing
router.route('/setDoing').put(
    setDoing
);
// TM/user with doing permit: doing->done
router.route('/setDone').put(
    setDone
);
// TM/user with doing permit: done->close
router.route('/setClose').put(
    setClose
);
module.exports = router;