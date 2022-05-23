import React, { useState,useEffect } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useNavigate } from 'react-router-dom';

const CreateApp = () => {
    // options to list the groups
    const [options, setOptions] = useState([]);

    // start/end/current dates
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    
    // Number of characters left in the description text box
    const [charLeft, setCharLeft] = useState(150);
    // Application Acronym Input 
    const [appAcr, setAppAcr] = useState('');
    // Application Description Input
    const [appDesc, setAppDesc] = useState('');

    // App permit open
    const [permitOpen, setPermitOpen] = useState('');
    // App permit todo
    const [permitToDo, setPermitToDo] = useState('');
    // App permit doing
    const [permitDoing, setPermitDoing] = useState('');
    // App permit done
    const [permitDone, setPermitDone] = useState('');

    // App permit create 
    const [permitCreate, setPermitCreate] = useState('');

    const navigate = useNavigate();

    // load the list of group names
    useEffect(() => {
        fetch('../../getGrpNames')
            .then(response => response.json())
            .then(data => {
                console.log('Success:\n', data);
                setOptions(data[0].roles);                
            }).catch(e => alert('failed to load group names'));
    }, []);

    // Handle Application description input
    function handleAppDesc(e) {
        setAppDesc(e.target.value);
        setCharLeft(150 - e.target.value.length);
    }

    // Handle submit 
    function handleSubmitApp(event) {
        event.preventDefault();
        console.log("start", startDate);
        
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST","../../task/createApp",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                navigate('/');
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Failed to create app
                alert('Unable to create app');
            } else if (this.readyState === 4 && this.status === 400) {
                // Failed to create app
                alert('App already exists');
            }
        }
        
        //startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
        xhttp.send(JSON.stringify({
            acronym : appAcr,
            desc : appDesc,
            startDate : startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
            endDate : endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate(), 
            pOpen : permitOpen,
            pToDo : permitToDo, 
            pDoing : permitDoing,
            pDone : permitDone, 
            create : permitCreate 
        }));
    }

    return (
        <>
        <div className="container">
        <div className="row mt-3">
        <div className="col"></div>
          <div className="col-6 p-0 mb-5">
            <div className="row">
                <div className="col">
                    <h5>Create Application Details</h5>
                </div>
                <div className="col-auto">
                <button className='btn btn-outline-primary mb-2 fw-bold'onClick={() => navigate(-1)}>
                    &lt; back
                </button>
                </div>
            </div>
        <form onSubmit={handleSubmitApp}>   
            <hr />
            {/* Application Acronym input */}
            <div className="row mb-3">
                <label htmlFor="appAcronym" className="form-label">Application Acronym</label>
                <input 
                    className="form-control ms-2" 
                    type="text" 
                    onChange={e => setAppAcr(e.target.value)}
                    required
                />
            </div>
            
            {/* Application Description input */}
            <div className="row mb-3">
                <label htmlFor="appDesc" className="form-label">Application Description</label>
                <textarea
                    className="form-control ms-2"
                    type="text"
                    rows="3"
                    maxLength={150}
                    onChange={e => handleAppDesc(e)}
                    required
                />
                <p className="text-end m-0 p-0"><small>{charLeft} / 150 characters left</small></p>
            </div>

            {/* Start date input */}
            <div className="row mb-3">
                <label className="form-label">Start Date</label>
                <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    className="form-control col ms-2"
                />
            </div>

            {/* End date input */}
            <div className="row mb-3">
                <label className="form-label">End Date</label> 
                <DatePicker
                    onChange={(date) => setEndDate(date)} 
                    className="form-control col ms-2"
                    selected={endDate}
                    minDate={startDate}
                /> 
            </div>

            {/* permit open */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to Open tasks</label> 
                <select
                    className="form-select"
                    onChange={e => setPermitOpen(e.target.value)}
                    value={permitOpen}
                >
                    <option value="">choose role</option>
                    {
                        options.map((role, index) => {
                            return (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            );
                        })
                    }
                </select>   
            </div>

            {/* permit Todo */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to To-Do tasks</label> 
                <select
                    className="form-select"
                    onChange={e => setPermitToDo(e.target.value)}
                    value={permitToDo}
                >
                    <option value="">choose role</option>
                    {
                        options.map((role, index) => {
                            return (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            );
                        })
                    }
                </select>  
            </div>

            {/* permit doing */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to Doing tasks</label> 
                <select
                    className="form-select"
                    onChange={e => setPermitDoing(e.target.value)}
                    value={permitDoing}
                >
                    <option value="">choose role</option>
                    {
                        options.map((role, index) => {
                            return (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            );
                        })
                    }
                </select>  
            </div>

            {/* permit done */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to Done tasks</label> 
                <select
                    className="form-select"
                    onChange={e => setPermitDone(e.target.value)}
                    value={permitDone}
                >
                    <option value="">choose role</option>
                    {
                        options.map((role, index) => {
                            return (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            );
                        })
                    }
                </select>  
            </div>

            {/* permit create task */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to create tasks</label> 
                <select
                    className="form-select"
                    onChange={e => setPermitCreate(e.target.value)}
                    value={permitCreate}
                >
                    <option value="">choose role</option>
                    {
                        options.map((role, index) => {
                            return (
                                <option key={index} value={role}>
                                    {role}
                                </option>
                            );
                        })
                    }
                </select>  
            </div>

            <button className="btn btn-primary mt-2 float-end" type="submit">Create New App</button>
        </form>
        </div>
        <div className="col"></div>
        </div>
            
        </div>
        </>
    );
   

}

export default CreateApp;