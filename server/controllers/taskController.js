const send_Email = require('../modules/sendEmail');
const getQuery = require('../modules/getQuery');
const noteGen = require('../modules/noteGen');

// Admin: Create App
exports.createApp = async (req, res) => {
    
    const {
        acronym, desc,
        startDate, endDate, 
        pOpen, pToDo, pDoing, pDone,
        createT, createP
    } = req.body;

    const query = `INSERT INTO nodelogin.application(App_Acronym, App_Description, 
        App_startDate, App_endDate, App_permit_Open, App_permit_toDoList, App_permit_Doing, App_permit_Done, 
        App_permit_CreateT, App_permit_CreateP) VALUES 
        ('${acronym}','${desc}','${startDate}','${endDate}', 
        '${pOpen}','${pToDo}','${pDoing}','${pDone}','${createT}','${createP}'); `;

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

// TODO: change owner to the req.session.username
// Lead: Create Task
exports.createTask = async (req, res) => {
    // parse user input
    const { name, desc, plan, app, owner } = req.body;
    //const owner = req.session.username;

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
        if (plan !== undefined) {
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
};

// PM: Create Plan
exports.createPlan = async (req, res) => {
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
        res.sendStatus(400);
    }
};

// TODO: change owner to the req.session.username
// PM: approve new task/ set open->toDo
exports.setToDo = async(req, res) => {
    const { taskId,owner } = req.body;

    // check if taskid is valid and state is not 'to_do'
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to toDo
            const note = noteGen.makeNote(owner, 'to-do');
            console.log(note)

            // Update the status of the task = to-do
            const query2 = `UPDATE nodelogin.task SET Task_state='to_do', Task_notes=CONCAT('${note}',Task_notes) 
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

// TODO: change owner to the req.session.username
// Team member: working on task/ toDo->Doing
exports.setDoing = async(req, res) => {
    const { taskId,owner } = req.body;

    // check if taskid is valid and state is not 'to_do'
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to toDo
            const note = noteGen.makeNote(owner, 'doing');
            console.log(note)

            // Update the status of the task = to-do
            const query2 = `UPDATE nodelogin.task SET Task_state='doing', Task_notes=CONCAT('${note}',Task_notes) 
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

// TODO: change owner to the req.session.username
// Team member: working on task/ toDo->Doing
exports.setDone = async(req, res) => {
    const { taskId,owner } = req.body;

    // send email notification to Lead when team member has completed

    // check if taskid is valid and state is not 'to_do'
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to toDo
            const note = noteGen.makeNote(owner, 'done');
            console.log(note)

            // Update the status of the task = to-do
            const query2 = `UPDATE nodelogin.task SET Task_state='done', Task_notes=CONCAT('${note}',Task_notes) 
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

// TODO: change owner to the req.session.username
// Lead: confirm the task to close
exports.setClose = async(req, res) => {
    const { taskId,owner } = req.body;

    // send email notification to Lead when team member has completed

    // check if taskid is valid and state is not 'to_do'
    const query1 = `SELECT Task_state FROM nodelogin.task WHERE Task_id="${taskId}";`;
    try {
        const result = await getQuery.processQuery(query1,req.pool);
        // send status 400 if task don't exist
        if (result.length === 0) {
            res.sendStatus(400);
        } else {
            // make the note that task status is set to toDo
            const note = noteGen.makeNote(owner, 'done');
            console.log(note)

            // Update the status of the task = to-do
            const query2 = `UPDATE nodelogin.task SET Task_state='done', Task_notes=CONCAT('${note}',Task_notes) 
            WHERE Task_id='${taskId}';`;

            // Update the task
            await getQuery.processQuery(query2, req.pool);
            res.sendStatus(200);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

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
        const test = await send_Email(Message);
        console.log('TESTING EMAIL RESPONSE========\n',test);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
};