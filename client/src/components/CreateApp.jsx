import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsFillCalendarEventFill} from "react-icons/bs";
import MultiSelect from  'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';
import UserNav from "./navbar/UserNav";

const CreateApp = () => {
    // options to list the groups
    const [options, setOptions] = useState([]);

    // start/end/current dates
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const nowDate = new Date();
    
    // Number of characters left in the description text box
    const [charLeft, setCharLeft] = useState(0);
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
    // App permit close
    const [permitClose, setPermitClose] = useState('');
    // App permit create task
    const [permitCreateT, setPermitCreateT] = useState('');
    // App permit create plan
    const [permitCreateP, setPermitCreateP] = useState('');

    // modify the options to an array of { label:'', value:'' }
    function modifyOptions() {
        const arr = options;
        const res = [];
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const jsonObj = {};
            jsonObj.label = element;
            jsonObj.value = element;
            res.push(jsonObj);
        }
        return res;
    }

    // load the list of group names
    useEffect(() => {
        fetch('../../getGrpNames')
            .then(response => response.json())
            .then(data => {
                console.log('Success:\n', data);
                setOptions(data[0].roles);                
            });
    }, []);

    // Handle Application description input
    function handleAppDesc(e) {
        setAppDesc(e.target.value);
        setCharLeft(150 - e.target.value.length);
    }

    // Handle submit IN PROGRESS
    function handleSubmitApp(event) {
        event.preventDefault();
        console.log("start", startDate)
        let Open = permitOpen.split(',');
        let ToDo = permitToDo.split(',');
        let Doing = permitDoing.split(',');
        let Done = permitDone.split(',');
        let Close = permitClose.split(',');
        let createt = permitCreateT.split(',');
        let createp = permitCreateP.split(',');
        
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST","../../task/createApp",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("successfully created app");
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Failed to create app
                alert('Unable to create app');
            }
        }
        
        //startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
        xhttp.send(JSON.stringify({
            acronym : appAcr,
            desc : appDesc,
            startDate : startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
            endDate : endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate(), 
            pOpen : Open,
            pToDo : ToDo, 
            pDoing : Doing,
            pDone : Done, 
            pClose : Close,
            createT : createt, 
            createP : createp
        }));
    }

  
    return (
        <>
        <UserNav />
        <div className="container">
        <div className="row">
        <div className="col"></div>
        <form className="col-6 p-0" onSubmit={handleSubmitApp}>
            <h5>Create Application Details</h5>
            
            {/* Application Acronym input */}
            <div className="row mb-3">
                <label htmlFor="appAcronym" className="form-label">Application Acronym</label>
                <input 
                    className="form-control ms-2" 
                    type="text" 
                    onChange={e => setAppAcr(e.target.value)}
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
                />
                <p className="text-end m-0 p-0"><small>{charLeft} / 150 characters left</small></p>
            </div>

            {/* Start date input */}
            <div className="row mb-3">
                <label className="form-label">Start Date</label>
                <DatePicker 
                    selected={startDate} 
                    minDate={nowDate}
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
                <MultiSelect 
                    onChange={val => setPermitOpen(val)}
                    options={modifyOptions}
                />           
            </div>

            {/* permit Todo */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to To-Do tasks</label> 
                <MultiSelect 
                    onChange={val => setPermitToDo(val)}
                    options={modifyOptions}
                />
            </div>

            {/* permit doing */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to Doing tasks</label> 
                <MultiSelect 
                    onChange={val => setPermitDoing(val)}
                    options={modifyOptions}
                />
            </div>

            {/* permit done */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to Done tasks</label> 
                <MultiSelect 
                    onChange={val => setPermitDone(val)}
                    options={modifyOptions}
                />
            </div>

            {/* permit close */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to Close tasks</label> 
                <MultiSelect 
                    onChange={val => setPermitClose(val)}
                    options={modifyOptions}
                />
            </div>

            {/* permit create task */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to create tasks</label> 
                <MultiSelect 
                    onChange={val => setPermitCreateT(val)}
                    options={modifyOptions}
                />
            </div>

            {/* permit create plan */}
            <div className="row mb-3">
                <label className="form-label">Groups with permission to create plan</label> 
                <MultiSelect 
                    onChange={val => setPermitCreateP(val)}
                    options={modifyOptions}
                />
            </div>

            <button className="btn btn-primary float-end d-block" type="submit">Create New App</button>
        </form>
        <div className="col"></div>
        </div>
            
        </div>
        </>
    );
   

}

export default CreateApp;