const sendEmail = require('../modules/sendEmail');
const getQuery = require('../modules/getQuery');
const noteGen = require('../modules/noteGen');
const { checkUserPerm,userGrps } = require('../modules/checkAuth'); 

// Get what permits does the user have for the app
exports.getUserPerms = async(req, res) => {
    // query to get all the permissions 
    const query = `SELECT App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, 
    App_permit_Close, App_permit_CreateT, App_permit_CreateP FROM nodelogin.application 
    WHERE App_Acronym='${req.params.app}'`;

    try {
        //grpNames
        const userGroups = await userGrps(req.session.username, req.pool);
        const perms = await getQuery.processQuery(query,req.pool);
        
        let arr = {};
        for (let key in perms[0]) {
            const row = perms[0][key];
            const found = row.some(a => userGroups.includes(a));
            if (found) {
                arr[key] = true;
            } else { 
                arr[key] = false;
            }
        }
        console.log('user perms\n',arr)
        res.send(arr);
    } catch (error) {
        console.log('Something went wrong with getting the user permissions in app')
        console.log(error)
        res.sendStatus(500);
    }
};

// Get all plans of an App
exports.getAppPlans = async(req, res) => {
    const query = `SELECT Plan_MVP_name, Plan_startDate, Plan_endDate 
    FROM nodelogin.plan WHERE Plan_app_Acronym='${req.params.app}';`;
    try {
        let result = await getQuery.processQuery(query, req.pool);
        // modify to get only the dates
        let len = result.length;
        for (let i = 0; i < len; i++) {
            let sDate = new Date(result[i].Plan_startDate);
            result[i].Plan_startDate = sDate.toDateString();
            let eDate = new Date(result[i].Plan_endDate);
            result[i].Plan_endDate = eDate.toDateString();
        }
        
        res.send(result);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};

// Get all tasks of an App
// return data that is sorted into open, to-do, doing, done, close
// each state has their own array
// i.e { open: [{ task1_object}...], to-do: [{ task2_object }...],....}
exports.getAppTasks = async (req, res) => {
    const query = `SELECT * FROM nodelogin.task WHERE Task_app_Acronym='${req.params.app}' ORDER BY Task_state;`;
    try {
        let result = await getQuery.processQuery(query, req.pool);

        // sort data into the different states
        let arr = { open: [], to_do: [], doing: [], done: [], close: [] };
        result.forEach(el => {
            switch (el.Task_state) {
                case 'open':
                    arr['open'].push(el);
                    break;
                case 'to_do':
                    arr['to_do'].push(el);
                    break;
                case 'doing':
                    arr['doing'].push(el);
                    break;
                case 'done':
                    arr['done'].push(el);
                    break;
                case 'close':
                    arr['close'].push(el);
                    break;
                default:
                    break;
            }
        });
        res.send(arr);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};

// Get an App info [app description, start date, end date]
exports.getAppInfo = async(req, res) => {
    const query = `SELECT App_Description, App_startDate, App_endDate FROM nodelogin.application 
    WHERE App_Acronym='${req.params.app}';`;
    getQuery.processQuery(query, req.pool).then(data => {
        // modify to get only the dates
        let sDate = new Date(data[0].App_startDate);
        data[0].App_startDate = sDate.toDateString();
        let eDate = new Date(data[0].App_endDate);
        data[0].App_endDate = eDate.toDateString();

        res.send(data[0]);
    }).catch(e => res.sendStatus(500));
};

// Get all Apps info
exports.getAllApps = async (req, res) => {
    const query = `SELECT App_Acronym, App_Description, App_startDate, App_endDate
    FROM nodelogin.application;`;
    try {
        const result = await getQuery.processQuery(query,req.pool);
        res.send(result);
    } catch (error) {
        console.log('Failed to retrieve all apps info')
        res.sendStatus(500);
    }
};

// Admin: Create App
exports.createApp = async (req, res) => {
    
    const {
        acronym, desc,
        startDate, endDate, 
        pOpen, pToDo, pDoing, pDone, pClose,
        createT, createP
    } = req.body;
    console.log(pOpen)
    
    //let test = JSON.stringify(pOpen);

    const query = `INSERT INTO nodelogin.application(App_Acronym, App_Description, 
        App_startDate, App_endDate, 
        App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, App_permit_Close,
        App_permit_CreateT, App_permit_CreateP) VALUES 
        ('${acronym}','${desc}','${startDate}','${endDate}', 
        '${JSON.stringify(pOpen)}','${JSON.stringify(pToDo)}','${JSON.stringify(pDoing)}','${JSON.stringify(pDone)}',
        '${JSON.stringify(pClose)}','${JSON.stringify(createT)}','${JSON.stringify(createP)}'); `;

    getQuery.processQuery(query, req.pool).then( result => {
        // send error if app acronym already exists 
        if (result === "Duplicate") {
            res.status(400).send({ message: 'App already exist.'});
        } else {
            res.status(200).send({ message: "Application successfully created!"});
        }
    }).catch((err) => { 
        // send 500 status 
        console.log(err)
        res.status(500).send(); 
        // Throw async to escape the promise chain
        throw err;
    }); 
};

// ------- with checkPerm function---------------------
// Lead: Create Task
exports.createTask = async (req, res) => {
try {
    const checkVal = await checkUserPerm(req,'createTask');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {

    // parse user input
    const { name, desc, plan, owner, app } = req.body;

    // create initial audit 
    const note = noteGen.makeNote(owner,'open');
    console.log(note)
    
    try {
        // get the App_Rnumber and generate task_id
        const query1 = `SELECT App_Rnumber FROM nodelogin.application WHERE App_Acronym='${app}';`;
        const getAppId = await getQuery.processQuery(query1, req.pool);
        const taskId = `${app}_${getAppId[0].App_Rnumber}`;

        // increment the running number of the application
        const query3 = `UPDATE nodelogin.application SET App_Rnumber = App_Rnumber + 1 WHERE App_Acronym="${app}";`
        await getQuery.processQuery(query3, req.pool);

        // check if task is associated with plan, else add plan name afterwards
        let hasPlan = false;
        let planInsert = '';
        if (plan !== undefined || plan==='') {
            hasPlan = true;
            planInsert = `,'${plan}'`;
        }

        // insert new row to create task
        const query2 = `INSERT INTO nodelogin.task(Task_name, Task_description, Task_notes, Task_id, 
             Task_app_Acronym, Task_creator, Task_owner${(hasPlan) ? ',Task_plan': ''}) VALUES 
            ('${name}','${desc}','${note}','${taskId}','${app}','${owner}','${owner}' ${(hasPlan) ? planInsert : ''});`;
        const result = await getQuery.processQuery(query2, req.pool);
        
        // send error that task already exist, else send OK 200
        if (result === "Duplicate") {
            res.send("Task already exist.");
        } else {
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}   
};

// PM: Create Plan
exports.createPlan = async (req, res) => {
try {
    const checkVal = await checkUserPerm(req,'createPlan');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {
    
    const { name, startDate, endDate, app } = req.body;

    // queries
    const query1 = `SELECT EXISTS (SELECT App_Acronym FROM nodelogin.application WHERE App_Acronym='${app}');`;
    const query2 = `INSERT INTO nodelogin.plan VALUES ('${name}','${startDate}','${endDate}','${app}');`;

    try {
        // if app acronym exists and no duplicate plan name, insert. Else, send errors.
        const result1 = await getQuery.processQuery(query1, req.pool);
        if (result1 === 0) {
            res.sendStatus(400);
        } else {
            const result2 = await getQuery.processQuery(query2, req.pool);
            // send message if duplicate plan name found 
            if (result2==="Duplicate") {
                res.send("Plan with same name exist.");
            } else {
                res.sendStatus(200);
            }
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}   
};

// PM: approve new task/ set open->toDo
exports.setToDo = async(req, res) => {
try {
    const checkVal = await checkUserPerm(req,'createToDo');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {
    
    const { taskId } = req.body;
    const owner = req.session.username;

    // check if taskid is valid 
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to 'to-do'
            const note = noteGen.makeNote(owner, 'to-do');
            console.log(note)

            // Update the status of the task=to-do, audit trail, task_owner 
            const query2 = `UPDATE nodelogin.task SET Task_state='to_do', Task_notes=CONCAT('${note}',Task_notes)
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}  
};

// Team member: working on task/ toDo->Doing
exports.setDoing = async(req, res) => {
try {
    const checkVal = await checkUserPerm(req,'setDoing');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {

    const { taskId } = req.body;
    const owner = req.session.username;

    // check if taskid is valid
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to Doing
            const note = noteGen.makeNote(owner, 'doing');
            console.log(note)

            // Update the status of the task=doing, audit trail, task_owner
            const query2 = `UPDATE nodelogin.task SET Task_state='doing', Task_notes=CONCAT('${note}',Task_notes) 
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}  
};

// Team member: working on task/ toDo->Doing
exports.setDone = async(req, res) => {
try {
    const checkVal = await checkUserPerm(req,'setDone');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {

    const { taskId } = req.body;
    const owner = req.session.username;

    // check if taskid is valid
    const query1 = `SELECT Task_state,Task_creator,Task_name FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // get the email and send email to the task_creator 
            const query3 = `SELECT email FROM nodelogin.accounts WHERE username='${result[0].Task_creator}';`;
            const result2 = await getQuery.processQuery(query3,req.pool);
            if (result2.length==0) {
                console.log('no email')
            }
            await sendEmail.sendNotif(result2[0].email, result[0].Task_name);

            // make the note that task status is set to Done
            const note = noteGen.makeNote(owner, 'done');
            console.log(note)

           // Update the status of the task=done, audit trail, task_owner 
            const query2 = `UPDATE nodelogin.task SET Task_state='done', Task_notes=CONCAT('${note}',Task_notes)
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}  
};

// Lead: confirm the task to close
exports.setClose = async(req, res) => {
try {
    const checkVal = await checkUserPerm(req,'setClose');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {

    const { taskId } = req.body;
    const owner = req.session.username;

    // check if taskid is valid
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to close
            const note = noteGen.makeNote(owner, 'close');
            console.log(note)

            // Update the status of the task=close, audit trail, task_owner 
            const query2 = `UPDATE nodelogin.task SET Task_state='close', Task_notes=CONCAT('${note}',Task_notes)
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}  
};

// UNUSED function
// Team member: completes task
exports.doneTask = async (req,res) => {
    // notification message to send
    const Message = {
        email: process.env.SMTP_TO_EMAIL,
        subject: 'test notification',
        message: 'notification'
    };
    console.log(process.env.SMTP_TO_EMAIL);
    try {
        const test = await sendEmail.sendEmail(Message);
        console.log('TESTING EMAIL RESPONSE========\n',test);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};