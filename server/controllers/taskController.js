const sendEmail = require('../modules/sendEmail');
const getQuery = require('../modules/getQuery');
const noteGen = require('../modules/noteGen');
const { checkUserPerm, userGrps } = require('../modules/checkAuth'); 

// Get details of a task of a App
exports.getTaskDetail = async(req, res) => {
    const query = `SELECT * FROM nodelogin.task WHERE Task_id='${req.params.taskID}' ORDER BY Task_state;`;
    try {
        const result = await getQuery.processQuery(query, req.pool);
        res.send(result[0]);
    } catch (error) {
        console.log('Something went wrong with task details')
        console.log(error)
        res.sendStatus(500);
    }
};

// Get what permits does the user have for the app
exports.getUserPerms = async(req, res) => {
    // query to get all the permissions 
    const query = `SELECT App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, 
    App_permit_Close, App_permit_Create FROM nodelogin.application 
    WHERE App_Acronym='${req.params.app}'`;

    try {
        //grpNames
        const userGroups = await userGrps(req.session.username, req.pool);
        const perms = await getQuery.processQuery(query,req.pool);
        
        let arr = {};
        for (let key in perms[0]) {
            const found = userGroups.includes(perms[0][key]);
            if (found) {
                arr[key] = true;
            } else { 
                arr[key] = false;
            }
        }
        if (userGroups.includes("Project Manager")) {
            arr["App_permit_CreateP"] = true;
        } else {
            arr["App_permit_CreateP"] = false;
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

// Get ONE App info 
exports.getOneAppInfo = async(req, res) => {
    const query = `SELECT * FROM nodelogin.application WHERE App_Acronym='${req.params.app}';`;
    try {
        const result = await getQuery.processQuery(query,req.pool);
        res.send(result[0]);
    } catch (error) {
        console.log(`Failed to retrieve ${req.params.app} info`)
        res.sendStatus(500);
    }
};

// ------- with checkPerm function---------------------
// PM: Create App
exports.createApp = async (req, res) => {
try {
    const checkVal = await checkUserPerm(req,'createPlan');
    if (checkVal === false) {
        res.sendStatus(403);
    } else {
        const {
            acronym, desc,
            startDate, endDate, 
            pOpen, pToDo, pDoing, pDone, pClose,
            create
        } = req.body;

        const nowDate = new Date();
        const note = `Application ${acronym} is created on ${nowDate.toDateString()}`;
        const query = `INSERT INTO nodelogin.application(App_Acronym, App_Description, 
            App_startDate, App_endDate, 
            App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, App_permit_Close,
            App_permit_Create, Audit) VALUES 
            ('${acronym}','${desc}','${startDate}','${endDate}', 
            '${pOpen}','${pToDo}','${pDoing}','${pDone}',
            '${pClose}','${create}','${note}'); `;
    
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
    }
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}
};

// PM: edit App
exports.editApp = async (req, res) => {
try {
    const checkVal = await checkUserPerm(req,'createPlan');
    if (checkVal === false) {
        res.sendStatus(403);
    } else {
        const {
            app, desc,
            startDate, endDate, 
            pOpen, pToDo, pDoing, pDone, pClose,
            create
        } = req.body;

        const nowDate = new Date();
        let note = `Application ${app} is updated on ${nowDate.toDateString()}\n`;
        //App_Description, App_startDate, App_endDate, 

        // update the note if there is any changes 
        const checkAppQuery = `SELECT 
        App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, App_permit_Close,
        App_permit_Create FROM nodelogin.application WHERE App_Acronym='${app}';`;
        const result3 = await getQuery.processQuery(checkAppQuery,req.pool);

        const arr = [pOpen,pToDo,pDoing,pDone,pClose,create];
        let index = 0;
        for (const key in result3[0]) {
            if (result3[0][key]!==arr[index]) {
                note += `${key} updated from ${result3[0][key]} to ${arr[index]}\n`;
            }
            index++;
        }
        note += '-------------\n';
        console.log(note);

        const query = `UPDATE nodelogin.application SET App_Description='${desc}', 
        App_startDate='${startDate}', App_endDate='${endDate}', 
            App_permit_Open='${pOpen}', App_permit_toDoList='${pToDo}', App_permit_Doing='${pDoing}', 
            App_permit_Done='${pDone}', App_permit_Close='${pClose}',App_permit_Create='${create}', Audit=CONCAT('${note}',Audit) 
            WHERE App_Acronym='${app}';`;
    
        getQuery.processQuery(query, req.pool).then( result => {
            res.status(200).send({ message: "Application successfully created!"});
        }).catch((err) => { 
            // send 500 status 
            console.log(err)
            res.status(500).send(); 
            throw err;
        }); 
    }
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}
};

// Lead: Create Task
exports.createTask = async (req, res) => {
try {``
    const checkVal = await checkUserPerm(req,'createTask');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {

    // parse user input
    const { name, desc, plan, app, comment } = req.body;
    const owner = req.session.username;
    // create initial audit 
    let note = noteGen.makeNote(owner,'open');
    note += 'Comments: ' + comment + '\n';
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

// Lead: Edit Task (only description and plan)
exports.editTask = async(req, res) => {
    try {
        const checkVal = await checkUserPerm(req,'createTask');
        // send status 403 if user don't have the permission to do so
        if (checkVal === false) {
            res.sendStatus(403);
        } else {   
            const {desc, plan, taskId, comment} = req.body;

            let note = noteGen.makeNote(req.session.username, 'open');
            note = note + `>>>New changes to task>>>\nDescription: ${desc}\nPlan: ${plan}\nComments: ${comment}\n`;

            const query = `UPDATE nodelogin.task SET Task_description='${desc}', Task_plan='${plan}',Task_notes=CONCAT('${note}',Task_notes)
            WHERE Task_id='${taskId}';`;
            await getQuery.processQuery(query, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    } 
};

// Anyone: add comment to task
exports.addComment = async (req, res) => {
    try {
        const note = `--------------\nUser ${req.session.username} added a note.\n${req.body.comment}\n`;
        const query = `UPDATE nodelogin.task SET Task_notes=CONCAT('${note}',Task_notes) WHERE Task_id='${req.body.taskId}';`;

        await getQuery.processQuery(query, req.pool);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
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

// PM: Edit Plan
exports.editPlan = async (req, res) => {
try {
    const checkVal = await checkUserPerm(req,'createPlan');
    // send status 403 if user don't have the permission to do so
    if (checkVal === false) {
        res.sendStatus(403);
    } else {
    
    const { name, startDate, endDate, app } = req.body;

    // queries
    const query1 = `SELECT EXISTS (SELECT Plan_app_Acronym,Plan_MVP_name FROM nodelogin.plan WHERE Plan_app_Acronym='${app}' AND Plan_MVP_name='${name}');`;
    const query2 = `UPDATE nodelogin.plan SET Plan_startDate='${startDate}',Plan_endDate='${endDate}' 
    WHERE Plan_app_Acronym="${app}" AND Plan_MVP_name='${name}';`;

    try {
        // if app acronym exists and no duplicate plan name, insert. Else, send errors.
        const result1 = await getQuery.processQuery(query1, req.pool);
        if (result1 === 0) {
            res.sendStatus(400);
        } else {
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
}

// PM: approve new task/ set open->toDo
exports.setToDo = async(req, res) => {
    const { taskId } = req.body;
    const owner = req.session.username;
try {
    const checkVal1 = await checkUserPerm(req,'setOpen');    // if proj. man. wants to approce
    const checkVal2 = await checkUserPerm(req,'setToDo');   // if tm wants to move back
    
    // check task state
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    const result = await getQuery.processQuery(query1,req.pool);
    if (result.length === 0) { res.sendStatus(400); }       // task don't exist

    else if (((checkVal1 === true) && (result[0].Task_state === 'open')) ||
        ((checkVal2 === true) && (result[0].Task_state === 'doing'))) {
    
        // make the note that task status is set to 'to-do'
        const note = noteGen.makeNote(owner, 'to-do');
        console.log(note)

        // Update the status of the task=to-do, audit trail, task_owner 
        const query2 = `UPDATE nodelogin.task SET Task_owner='${owner}',Task_state='to_do', Task_notes=CONCAT('${note}',Task_notes)
        WHERE Task_id='${taskId}';`;

        // Update the task
        await getQuery.processQuery(query2, req.pool);
        res.sendStatus(200);
    } else {
        console.log("user dont have the permission to change task state");
        res.sendStatus(403);
    }
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}  
};

// Team member: working on task/ toDo->Doing
exports.setDoing = async(req, res) => {
    const { taskId } = req.body;
    const owner = req.session.username;
try {
    const checkVal1 = await checkUserPerm(req,'setDoing');
    const checkVal2 = await checkUserPerm(req,'setDone');

    // check task state
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    const result = await getQuery.processQuery(query1,req.pool);
    if (result.length === 0) { res.sendStatus(400); }       // task don't exist

    else if (((checkVal1 === true) && (result[0].Task_state === 'to_do')) ||
            ((checkVal2 === true) && (result[0].Task_state === 'done'))) {
        // make the note that task status is set to Doing
        const note = noteGen.makeNote(owner, 'doing');
        console.log(note)

        // Update the status of the task=doing, audit trail, task_owner
        const query2 = `UPDATE nodelogin.task SET Task_owner='${owner}',Task_state='doing', Task_notes=CONCAT('${note}',Task_notes) 
        WHERE Task_id='${taskId}';`;

        // Update the task
        await getQuery.processQuery(query2, req.pool);
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
} catch (error) {
    console.log(error)
    res.sendStatus(500);
}  
};

// Team member: working on task/ toDo->Doing
exports.setDone = async(req, res) => {
try {
    const checkVal = await checkUserPerm(req,'setDoing');
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
        } else if (result[0].Task_state === 'doing') {
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
            const query2 = `UPDATE nodelogin.task SET Task_owner='${owner}',Task_state='done', Task_notes=CONCAT('${note}',Task_notes)
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        } else {
            console.log("task state can't be set because of its previous state")
            res.sendStatus(403);
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
        } else if (result[0].Task_state === 'done') {
            // make the note that task status is set to close
            const note = noteGen.makeNote(owner, 'close');
            console.log(note)

            // Update the status of the task=close, audit trail, task_owner 
            const query2 = `UPDATE nodelogin.task SET Task_owner='${owner}',Task_state='close', Task_notes=CONCAT('${note}',Task_notes)
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        } else  {
            console.log("task state can't be set because of its previous state")
            res.sendStatus(403);
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
