import React from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';

// function to modify the columns
// adding the className "col-OK" / "col-NO" if the user has the permissions to the column
function modifyCols(obj) {
    for (const key in obj) {
        switch (key) {
            case 'App_permit_Open':
                let element1 = document.getElementById("ColOpen");
                (obj['App_permit_Open']) ? element1.classList.add("col-OK") : element1.classList.add("col-NO"); 
                break;
            case 'App_permit_toDoList':
                let element2 = document.getElementById("ColToDo");
                (obj['App_permit_toDoList']) ? element2.classList.add("col-OK") : element2.classList.add("col-NO"); 
                break;
            case 'App_permit_Doing':
                let element3 = document.getElementById("ColDoing");
                (obj['App_permit_Doing']) ? element3.classList.add("col-OK") : element3.classList.add("col-NO"); 
                break;
            case 'App_permit_Done':
                let element4 = document.getElementById("ColDone");
                (obj['App_permit_Done']) ? element4.classList.add("col-OK") : element4.classList.add("col-NO"); 
                break;
            case 'App_permit_Close':
                let element5 = document.getElementById("ColClose");
                (obj['App_permit_Close']) ? element5.classList.add("col-OK") : element5.classList.add("col-NO"); 
                break;
            default:
                break;
        }
    }
}

// container to render the task details
class TaskView extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        const row = this.props.task;
        const taskID = `#${row.Task_id}`;
        let createDate = new Date(row.Task_createDate);

        return (
        <div className="row bg-white border border-darkblue mb-2 mt-1 task-height">
            <p className='m-0 mt-2 fs-5'>{row.Task_name}</p>
            <p className='m-0 mt-1'><small>{row.Task_id}</small></p>
            <div className="task-owner mt-1">
                <small>{row.Task_owner}</small>
            </div>

            {/* VIEW TASK  */}
            {/* Button trigger 'view tasks' */}
            <div>
                <button 
                    type="button" 
                    className="btn btn-primary btn-sm float-end" 
                    data-bs-toggle="modal" 
                    data-bs-target={taskID}>
                    View Task  
                </button>
            </div>
            

            {/* Modal to view task details */}
            <div className="modal fade" id={row.Task_id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{row.Task_name}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className='row mb-2'>
                        <div className='font-monospace'>Description:</div>
                        <span className='ms-2'>{row.Task_description}</span>
                    </div>
                    <div className="row mb-1 task-owner">
                        <div className="col-5 font-monospace">Task Owner:</div>
                        <div className="col">{row.Task_owner}</div>
                    </div>
                    <div className="row mb-1 ">
                        <div className="col-5 font-monospace">Task Creator:</div>
                        <div className="col">{row.Task_creator}</div>
                    </div>
                    <div className="row mb-1 task-owner">
                        <div className="col-5 font-monospace">Task Created on:</div>
                        <div className="col">{createDate.toDateString(0)}</div>
                    </div>
                    <div className="row mb-1">
                        <div className="col-5 font-monospace">Task id:</div>
                        <div className="col">{row.Task_id}</div>
                    </div>
                    <div className="row mb-1 task-owner">
                        <div className="col-5 font-monospace">Task plan:</div>
                        <div className="col">{row.Task_plan}</div>
                    </div>
                    <hr />
                    <div className='font-monospace'>Task notes: </div>
                    <p className='notesH overflow-auto' style={{"whiteSpace":"pre-line"}}> {row.Task_notes}</p>
                    <div>
                       
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>

        </div>
        )
    }
    
}

const ViewTasksCopy = () =>{
    let params = useParams();
    let navigate = useNavigate();
    const createTLink = `/createTask/${params.app}`;
    const createPLink = `/createPlan/${params.app}`;

    const [tasks, setTasks] = React.useState([]);
    const [appDetail, setAppDetail] = React.useState([]);
    const [appPlans, setAppPlans] = React.useState([]);
    const [userPerm, setUserPerm] = React.useState([]);

    React.useEffect(() => {
        const link1 = `../../task/getAppTasks/${params.app}`;
        const link2 = `../../task/getAppInfo/${params.app}`;
        const link3 = `../../task/getAppPlans/${params.app}`;
        const link4 = `../../task/getPerms/${params.app}`;

        // get tasks
        fetch(link1)
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                console.log('data received for getting tasks\n',data);
            })
            .catch(e => {
                console.log(e);
                alert('unable to fetch data');
            });
        // get app details
        fetch(link2)
            .then(response => response.json())
            .then(data => {
                setAppDetail(data);
                console.log('data received for getting app detail\n', data);
            })
            .catch(e => alert('unable to fetch app detail'));
        // get app plans
        fetch(link3)
            .then(response => response.json())
            .then(data => {
                setAppPlans(data);
                console.log('data received for getting app plans\n', data);
            })
            .catch(e => alert('unable to fetch app detail'));
        // get user perms to modify UI
        fetch(link4)
            .then(response => response.json())
            .then(data => {
                setUserPerm(data);
                modifyCols(data);
                
                console.log('user perms', userPerm)
            })
            .catch(e => alert('unable to get user perms'));
    },[]);

    return(
        <>
        <UserNav />
        
        <div className="container">
        <div className="row mt-2 mb-2">

            <h6 className="col fw-bold"> Dashboard for App "{params.app}" </h6>
            
            {/* buttons column */}
            <div className="col-auto float-end">
                {
                    userPerm.App_permit_CreateT ? 
                    <button className="btn btn-colorT btn-fade btn-sm me-3" onClick={() => navigate(createTLink)}>
                        + New Task
                    </button> : null
                }
                {
                    userPerm.App_permit_CreateP ? 
                    <button className="btn btn-colorP btn-fade btn-sm me-2" onClick={() => navigate(createPLink)}>
                        + New Plan
                    </button> : null
                }
            </div>

        </div>
        
        {/* task columns */}
        <div className="row mt-1 mb-2">

            {/* open column */}
            <div className="col border me-2 shadow-sm" id="ColOpen">
                <h6 className="mt-2 ms-1 row fw-bold">Open</h6>
                
                {/* tasks listed here */}
                <div className="row">
                <div className="col overflow-auto col-height">
                {                    
                    tasks.open?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                } 
                </div>
                </div>
            </div>

            {/* to-do column */}
            <div className="col border me-2 shadow-sm " id="ColToDo">
                <h6 className="mt-2 ms-1 row fw-bold">To Do</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto col-height">
                <div className="col">
                {                    
                    tasks.to_do?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                } 
                </div>
                </div>
            </div>

            {/* doing column */}
            <div className="col border me-2 shadow-sm" id="ColDoing">
                <h6 className="mt-2 ms-1 row fw-bold">Doing</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto col-height">
                <div className="col">
                {                    
                    tasks.doing?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                } 
                </div>
                </div>
            </div>

            {/* done column */}
            <div className="col border me-2 shadow-sm" id="ColDone">
                <h6 className="mt-2 ms-1 row fw-bold">Done</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto col-height">
                <div className="col">
                {                    
                    tasks.done?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                } 
                </div>
                </div>
            </div>

            {/* close column*/}
            <div className="col border me-2 shadow-sm" id="ColClose">
                <h6 className="mt-2 ms-1 row fw-bold">Close</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto col-height">
                <div className="col">
                {                    
                    tasks.close?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                } 
                </div>
                </div>
            </div>
        </div>
        
        {/* App description and Dates */}
        <h6 className='row fw-bold mt-1'> App Details </h6>
        <div className="row">
            {/* App Description */}
            <div className="col border">
                <p className='m-0 font-monospace text-decoration-underline mt-2'><small>Description</small></p>
                <p>{appDetail.App_Description}</p>
            </div>
            
            {/* App Dates */}
            <div className="col border">
                <p className='m-0 font-monospace text-decoration-underline mt-2'><small>App dates</small> </p>

                <div className="row">
                    <p className='col-sm-3'>Start date:</p>
                    <p className='col'>{appDetail.App_startDate}</p>
                </div>
                <div className="row">
                    <p className='col-sm-3'>End date:</p>
                    <p className='col'>{appDetail.App_endDate}</p>
                </div>
            </div>
        </div>
        
        {/* App Plans */}
        <h6 className='row fw-bold mt-1'> App Plans </h6>
        <div className="row">
            <table className="table">
                <tbody>
                <tr  className='table-secondary'>
                    <td><small>Plan name</small></td>
                    <td><small>Plan start date</small></td>
                    <td><small>Plan end date</small></td>
                </tr>
                {
                    appPlans.map((row,index) => (
                        <tr key={index}>
                            <td>{row.Plan_MVP_name}</td>
                            <td>{row.Plan_startDate}</td>
                            <td>{row.Plan_endDate}</td>
                        </tr>
                    ))
                }
                <tr>

                </tr>
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
    
}

export default ViewTasksCopy;