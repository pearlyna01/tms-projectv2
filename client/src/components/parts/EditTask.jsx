import React from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useAtom } from "jotai";
import { plansAtom } from '../ViewTasks';

const EditTask = ({row,taskID}) => {
    let createDate = new Date(row.Task_createDate);
    const [appPlans, setAppPlans] = useAtom(plansAtom);
    const [desc, setDesc] = React.useState(row.Task_description);
    const [plan, setPlan] = React.useState(row.Task_plan);

    let params = useParams();

    function handleSubmit() {
        //e.preventDefault();
        const linkForm = `../../task/editTask`;
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT",linkForm,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("successfully Updated task");
            } 
            else if (this.readyState === 4 && this.status > 400) {
                alert('Unable to update task');
            }
        }
        
        xhttp.send(JSON.stringify({
            app: params.app,
            taskId: row.Task_id,
            plan: plan,
            desc: desc
        }));
    }

    return(
        <>
        {/* Edit TASK  */}
        {/* Button trigger 'edit tasks' */}
        <div className='row m-0'>
            <div className="col">
                <button
                    type="button"
                    className="btn btn-colorP btn-sm float-end"
                    data-bs-toggle="modal"
                    data-bs-target={taskID}
                >
                    <small>Edit Task</small> 
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
                            <textarea
                                className="form-control"
                                type="text"
                                rows="3"
                                maxLength={150}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                            />
                        </div>
                        <div className="row mb-1">
                            <div className="col-5 font-monospace">Task plan:</div>
                            <select 
                                className="form-select col" 
                                onChange={e => setPlan(e.target.value)}
                                value={plan}
                            >
                            <option value="">---no plan---</option>
                            {   appPlans.map((row,index) => {
                                return(
                                    <option key={index} value={row.Plan_MVP_name}>
                                        {row.Plan_MVP_name}
                                    </option>
                                );
                            })  }
                            </select>
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
                            <div className="col">{createDate.toDateString()}</div>
                        </div>
                        <div className="row mb-1">
                            <div className="col-5 font-monospace">Task id:</div>
                            <div className="col">{row.Task_id}</div>
                        </div>
                        <hr />
                        <div className='font-monospace'>Task notes: </div>
                        <p className='notesH overflow-auto' style={{ "whiteSpace": "pre-line" }}> {row.Task_notes}</p>
                        <div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-success" onClick={() => handleSubmit()}>Update</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}

export default EditTask;