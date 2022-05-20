import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { atom,useAtom  } from 'jotai';
import EditTask from './parts/EditTask';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const isLeadAtom = atom(false);
const taskAtom = atom([]);
export const plansAtom = atom([]);

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

// Modal component for editing plans
const ModalEditPlan = ({plan}) => {
    let params = useParams();
    let planId = `#${plan.Plan_MVP_name}`;
    const [startDate, setStartDate] = React.useState(new Date(plan.Plan_startDate));
    const [endDate, setEndDate] = React.useState(new Date(plan.Plan_endDate));
    const [appPlans, setAppPlans] = useAtom(plansAtom);

    function handleSubmit() {
        //e.preventDefault();
        const linkForm = `../../task/editPlan`;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST",linkForm,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status > 400) {
                alert('Unable to create plan');
            } else if (this.readyState === 4 && this.status === 200) {
                // refresh plans
                const link3 = `../../task/getAppPlans/${params.app}`;
                fetch(link3).then(res => res.json())
                    .then(result => setAppPlans(result))
                    .catch(e => console.log(e));
            } 
        }
        
        xhttp.send(JSON.stringify({
            name: plan.Plan_MVP_name,
            startDate : startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
            endDate : endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate(), 
            app: params.app
        }));
    }

    return(
        <>
        <button type="button" className="btn editBUT btn-sm" data-bs-toggle="modal" data-bs-target={planId}>
            Edit Plan
        </button>
        <div className="modal fade" id={plan.Plan_MVP_name} tabIndex="-1" aria-labelledby={planId} aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h6 className="modal-title float-end" id="exampleModalLabel">Plan Name: {plan.Plan_MVP_name}</h6>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                {/* Start date input */}
                <div className="row mb-3">
                    <label className="form-label">Start Date</label>
                    <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} 
                        className="form-control"
                    />
                </div>

                {/* End date input */}
                <div className="row mb-5">
                    <label className="form-label">End Date</label> 
                    <DatePicker
                        onChange={(date) => setEndDate(date)} 
                        className="form-control"
                        selected={endDate}
                    /> 
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() => handleSubmit()}>Save changes</button>
            </div>
            </div>
        </div>
        </div>
        </>
    )
};

// Modal component for view a task
const Modal = ({row, taskID}) => {
    let createDate = new Date(row.Task_createDate);
    let detail = row;
    const [note, setNote] = React.useState('');
    const [tasks, setTasks] = useAtom(taskAtom);
    let params = useParams();
    
    function handleSubmit() {
        //e.preventDefault();
        const linkForm = `../../task/addComment`;
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT",linkForm,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                const link1 = `../../task/getAppTasks/${params.app}`;
                fetch(link1).then( res => res.json() )
                            .then( data => {
                                setTasks(data);
                                console.log('tasks refreshed')
                            });

            } 
            else if (this.readyState === 4 && this.status > 400) {
                alert('Unable to update task');
            }
        }
        
        xhttp.send(JSON.stringify({
            taskId: row.Task_id,
            comment: note
        }));
    }

    return(
        <>
        <div className='row m-0'>
            <div className="col"></div>
            <div className="col-auto">
                <button
                type="button"
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target={taskID}>
                    <small>View Task</small> 
                </button>
            </div>
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
                            <span className='ms-2'>{detail.Task_description}</span>
                        </div>
                        <div className="row mb-1 task-owner">
                            <div className="col-5 font-monospace">Task Owner:</div>
                            <div className="col">{detail.Task_owner}</div>
                        </div>
                        <div className="row mb-1 ">
                            <div className="col-5 font-monospace">Task Creator:</div>
                            <div className="col">{detail.Task_creator}</div>
                        </div>
                        <div className="row mb-1 task-owner">
                            <div className="col-5 font-monospace">Task Created on:</div>
                            <div className="col">{createDate.toDateString()}</div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5 font-monospace">Task id:</div>
                            <div className="col">{row.Task_id}</div>
                        </div>
                        <div className="row mb-1 task-owner">
                            <div className="col-5 font-monospace">Task plan:</div>
                            <div className="col">{detail.Task_plan}</div>
                        </div>
                        { 
                            !(row.Task_state === "close") ?  
                            <div className="row mb-1">
                                <div className="col-5 font-monospace">Add Comment:</div>
                                <textarea
                                    className="form-control"
                                    type="text"
                                    rows="3"
                                    onChange={e => setNote(e.target.value)}
                                />
                                <button type="button" className="btn btn-success float-end" onClick={() => handleSubmit()}>Add Comment</button>

                            </div>
                        : null
                        }
                        <hr />
                        <div className='font-monospace'>Task notes: </div>
                        <p className='notesH overflow-auto' style={{ "whiteSpace": "pre-line" }}> {detail.Task_notes}</p>
                        <div>

                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

// container to render the task details
const TaskView = ({row,index}) => {
    const taskID = `#${row.Task_id}`;
    let params = useParams();
    
    const [lead, setLead] = useAtom(isLeadAtom);
    
    if (row !== undefined) {
    return (
        <Draggable draggableId={row.Task_id} index={index} isDragDisabled={row.Task_state === "close"}> 
        {(provided) => {
            return (
                <div className="row bg-white border border-darkblue mb-2 mt-1 task-height"
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    
                    <small>Task Name:</small>
                    <div className='fw-bold text-end'>{row.Task_name}</div>
                    <div className='fs-6 task-owner'>
                        <small>Task id:  <span className='float-end'>{row.Task_id}</span></small>
                    </div>

                    <div className="">
                        <small>Task owner:<span className='float-end'>{row.Task_owner}</span></small>
                    </div>
                    
                    
                    {/* VIEW/EDIT TASK  */}
                    {
                        lead && row.Task_state ==='open' ? 
                        
                        <EditTask row={row} taskID={taskID}/>
                        : <Modal row={row} taskID={taskID}/>
                    }
                </div>
            );
        }}
        </Draggable>
    )}
}

// function to reorder the items
function reorder(array, start, end) {
    let result = Array.from(array);
    let [removed] = result.splice(start, 1);
    result.splice(end, 0, removed);

    return result;
}

// function to modify list of tasks if user has the perms to do it
// AND get the task's latest details
function changeList(arr, source, destination) {
    
    let arrCopy = { ...arr };
    console.log(arrCopy)
    let sourceCopy = arrCopy[source.droppableId];
    let destCopy = arrCopy[destination.droppableId];
    const [removed] = sourceCopy.splice(source.index, 1);

    destCopy.splice(destination.index, 0, removed);

    arrCopy[source.droppableId] = sourceCopy;
    arrCopy[destination.droppableId] = destCopy;
    
    return arrCopy;
}

// returns the route link based on the action
function getAction(action) {
    switch (action) {
        case 'to_do':
            return '../../task/setToDo';    
        case 'doing':
            return '../../task/setDoing';
        case 'done':
            return '../../task/setDone';
        case 'close':
            return '../../task/setClose';
        default:
            return;
    }
}

const ViewTasks = () =>{
    let params = useParams();
    let navigate = useNavigate();
    const createTLink = `/createTask/${params.app}`;
    const createPLink = `/createPlan/${params.app}`;

    const [tasks, setTasks] = useAtom(taskAtom);
    //const [oldTasks, setOldT] = React.useState([]);
    const [userPerm, setUserPerm] = React.useState([]);
    const [appDetail, setAppDetail] = React.useState([]);
    const [appPlans, setAppPlans] = useAtom(plansAtom);
    const [lead, setLead] = useAtom(isLeadAtom);

    function refreshTasks() {
        const link1 = `../../task/getAppTasks/${params.app}`;
        fetch(link1).then( res => res.json() )
                    .then( data => {
                        setTasks(data);
                        console.log('tasks refreshed')
                    });
    }


    function updateTask(source,destination) { 
        const actLink = getAction(destination.droppableId);
        const task_id = tasks[source.droppableId][source.index].Task_id;

        let result = changeList(tasks, source, destination);
        setTasks(result);

        // send http request to update task state
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // modify the tasks if the task state has been updated
            if (this.readyState === 4) {
                refreshTasks();
                if (this.status === 403) {
                    //alert("User don't have permission to update state.");
                } else if (this.status > 400 && this.status !== 403) {
                    alert('Unable to update state');                    
                }
            }
        }
        xhttp.open("PUT",actLink,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ taskId: task_id, app: params.app}));
    }

    React.useEffect(() => {
        const fetchingData  = () => {
            const link1 = `../../task/getAppTasks/${params.app}`;
            const link4 = `../../task/getPerms/${params.app}`;
            const link2 = `../../task/getAppInfo/${params.app}`;
            const link3 = `../../task/getAppPlans/${params.app}`;
            
            Promise.all([
                fetch(link1).then(response => response.json()),
                fetch(link4).then(response => response.json()),
                fetch(link2).then(response => response.json()),
                fetch(link3).then(response => response.json())
            ]).then(([data1, data2, data3, data4]) => {
                setTasks(data1);
                setUserPerm(data2);
                setLead(data2.App_permit_Create);
                modifyCols(data2);
                setAppDetail(data3);
                setAppPlans(data4);
            }).catch(e => {
                alert('Unable to fetch some data');
                console.log(e);
            });
        };
        fetchingData();
    },[params.app]);

    const onDragEnd = (result) => {
        const { source, destination } = result;
        
        // if item is dropped outside the list, return it
        if (!destination) { return; }
        
        // if user wants to reorder the item
        if (source.droppableId === destination.droppableId) { 
            const list = reorder(tasks[source.droppableId],source.index,destination.index);
            let listCopy = tasks;
            listCopy[source.droppableId] = list;
            setTasks(listCopy);
        } else {
            if (destination.droppableId === "open") { return; }

            if (source.droppableId === "open" && destination.droppableId === "to_do" && userPerm.App_permit_Open) {
                updateTask(source,destination);
            } else if ((source.droppableId === "to_do" && destination.droppableId === "doing") && userPerm.App_permit_toDoList) {
                updateTask(source,destination);
            } else if (((source.droppableId === "doing" && destination.droppableId === "to_do") || 
                        (source.droppableId === "doing" && destination.droppableId === "done")) && userPerm.App_permit_Doing) {
                updateTask(source,destination);
            } else if ((source.droppableId === "done" && destination.droppableId === "doing") && userPerm.App_permit_Done) {
                updateTask(source,destination);
            } else if (source.droppableId === "done" && destination.droppableId === "close" && userPerm.App_permit_Close) {
                updateTask(source,destination);
            } else {
                return;
            } 
        } 
    };

    return(        
        <div className="container">

        <div className="row mt-2 mb-2">
            <h6 className="col fw-bold"> Dashboard for App "{params.app}" </h6>

            {/* buttons column */}
            <div className="col-auto float-end">
                {
                    userPerm.App_permit_Create ? 
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

        <div className="row mt-1 mb-2">
        <DragDropContext onDragEnd={onDragEnd}>
            {/* open column */}
            <div className="col border me-2 shadow-sm" id="ColOpen">
                <h6 className="mt-2 ms-1 row fw-bold">Open</h6>
                
                {/* tasks listed here */}
                <div className="row">
                {/* {                    
                    tasks.open?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                }  */}
                <Droppable droppableId="open">
                    {(provided) =>(
                        <div className="col overflow-auto col-height open"
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                            {tasks.open?.map((row, index) => 
                                (<TaskView key={row.Task_id} row={row} index={index}/> )
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>

            {/* to-do column */}
            <div className="col border me-2 shadow-sm " id="ColToDo">
                <h6 className="mt-2 ms-1 row fw-bold">To Do</h6>
                
                {/* tasks listed here */}
                <div className="row ">
                {/* <div className="col overflow-auto col-height">
                {                    
                    tasks.to_do?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                } 
                </div> */}
                <Droppable droppableId="to_do">
                    {(provided) =>(
                        <div className="col overflow-auto col-height to_do"
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                            {tasks.to_do?.map((row, index) => (
                                <TaskView key={row.Task_id} row={row} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>

            {/* doing column */}
            <div className="col border me-2 shadow-sm" id="ColDoing">
                <h6 className="mt-2 ms-1 row fw-bold">Doing</h6>
                
                {/* tasks listed here */}
                <div className="row ">
                <Droppable droppableId="doing">
                    {(provided) =>(
                        <div className="col overflow-auto col-height doing"
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                            {tasks.doing?.map((row, index) => (
                                <TaskView key={row.Task_id} row={row} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>

            {/* done column */}
            <div className="col border me-2 shadow-sm" id="ColDone">
                <h6 className="mt-2 ms-1 row fw-bold">Done</h6>
                
                {/* tasks listed here */}
                <div className="row">
                {/* {                    
                    tasks.done?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                }  */}
                <Droppable droppableId="done">
                    {(provided) =>(
                        <div className="col overflow-auto col-height done"
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                            {tasks.done?.map((row, index) => (
                                <TaskView key={row.Task_id} row={row} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>

            {/* close column*/}
            <div className="col border me-2 shadow-sm" id="ColClose">
                <h6 className="mt-2 ms-1 row fw-bold">Close</h6>
                
                {/* tasks listed here */}
                <div className="row">
                {/* {                    
                    tasks.close?.map((row, index) => (
                        <TaskView key={index} task={row} />
                    ))
                }  */}
                <Droppable droppableId="close">
                    {(provided) =>(
                        <div className="col overflow-auto col-height close"
                            {...provided.droppableProps} ref={provided.innerRef}
                        >
                            {tasks.close?.map((row, index) => (
                                <TaskView key={row.Task_id} row={row} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                </div>
            </div>
        </DragDropContext>
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
                    {
                        userPerm.App_permit_CreateP ? <td><small>Edit Plan</small></td> : <></>
                    }
                </tr>
                {
                    appPlans.map((row,index) => (
                        <tr key={index}>
                            <td>{row.Plan_MVP_name}</td>
                            <td>{row.Plan_startDate}</td>
                            <td>{row.Plan_endDate}</td>
                            {
                                userPerm.App_permit_CreateP ? <ModalEditPlan plan={row} /> : <></>
                            }
                        </tr>
                    ))
                }
                
                </tbody>
            </table>
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
        
        </div>
    );
    
}

export default ViewTasks;