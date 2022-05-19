// dashboard for user 
import React, { useState } from "react";
import { Link } from 'react-router-dom';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useAtom,atom  } from "jotai";
import { UserAtom } from "./Login";

const emptyApp = {
        App_Acronym: "",
        App_Description: "",
        App_endDate: new Date,
        App_startDate: new Date,
        App_permit_Open: '',
        App_permit_Done: '',
        App_permit_Doing: '',
        App_permit_toDoList: "",
        App_permit_Create: '',
        App_permit_Close:''
    };
const appDetails = atom(emptyApp);
const groups = atom([]);
const isUpdated = atom(false);
const isOpen = atom(false);

const AppEditModal = ({}) => {
    // start/end/current dates
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    
    // Application Description Input
    const [currentApp, setCurrentApp] = useAtom(appDetails);
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
    // App permit create 
    const [permitCreate, setPermitCreate] = useState('');

    const [options, setOptions] = useAtom(groups);

    const [isUpdate, setIsUpdate] = useAtom(isUpdated);

    const promise = new Promise((resolve, reject) => {
        
        resolve();
    });

    if (isUpdate) {
        setIsUpdate(!isUpdate);
        // start/end/current dates
        setStartDate(new Date(currentApp.App_startDate));
        setEndDate(new Date(currentApp.App_endDate));
    
        // Application Description Input
        setAppDesc(currentApp.App_Description);
        // App permit open
        setPermitOpen(currentApp.App_permit_Open);
        // App permit todo
        setPermitToDo(currentApp.App_permit_toDoList);
        // App permit doing
        setPermitDoing(currentApp.App_permit_Doing);
        // App permit done
        setPermitDone(currentApp.App_permit_Done);
        // App permit close
        setPermitClose(currentApp.App_permit_Close);
        // App permit create 
        setPermitCreate(currentApp.App_permit_Create);
    }

    function handleUpdate() {
        //console.log("start", startDate);
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST","../../task/editApp",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("successfully edited app");
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Failed to create app
                alert('Unable to edit app');
            }
        }
        const obj = {
            app : currentApp.App_Acronym,
            desc : appDesc,
            startDate : startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
            endDate : endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate(), 
            pOpen : permitOpen,
            pToDo : permitToDo, 
            pDoing : permitDoing,
            pDone : permitDone, 
            pClose : permitClose,
            create : permitCreate 
        };
        console.log(obj);
        //startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
        xhttp.send(JSON.stringify(obj));
    }

    return( 
        <div className="modal fade" id="editAppModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog " >
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">{currentApp.App_Acronym}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body overflow-auto container-fluid" style={{ height: "400px" }}>
                { isUpdate ? <h5>LOADING</h5> :null }
                {/* Application Description input */}
                <div className="row mb-3">
                    <label htmlFor="appDescr" className="form-label">Application Description</label>
                    <textarea
                        className="form-control"
                        type="text"
                        rows="3"
                        maxLength={150}
                        value={appDesc}
                        onChange={e => setAppDesc(e.target.value)}
                    />
                </div>

                {/* Start date input */}
                <div className="row mb-3">
                    <label className="form-label">Start Date</label>
                    <DatePicker 
                        selected={new Date(startDate)}
                        className="form-control"
                        onChange={date => setStartDate(date)}
                    />
                </div>

                {/* End date input */}
                <div className="row mb-3">
                    <label className="form-label">End Date</label>  
                    <DatePicker 
                        selected={new Date(endDate)}
                        className="form-control"
                        onChange={date => setEndDate(date)}
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
                        {console.log('permit',permitOpen)}
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

                {/* permit close */}
                <div className="row mb-3">
                    <label className="form-label">Groups with permission to Close tasks</label> 
                    <select
                        className="form-select"
                        onChange={e => setPermitClose(e.target.value)}
                        value={permitClose}
                    >
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
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={() =>handleUpdate()}>Save changes</button>
            </div>
            </div>
        </div>
        </div>
    )
    
}

const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataFetch, setDataFetch] = useState(null);
    
    const [is_open, setIsOpen] = useAtom(isOpen);
    const [user, setUserAtom ] = useAtom(UserAtom);
    const [options, setOptions] = useAtom(groups);
    const [isUpdate, setIsUpdate] = useAtom(isUpdated);

    // setup the current app to edit
    const [currentApp, setCurrentApp] = useAtom(appDetails);

    React.useEffect(() => {
        fetch('../../task/getAllApps')
            .then(response => response.json())
            .then(data => {
                setDataFetch(data);
                setIsLoaded(true);
                console.log(data)
            })
            .catch(err => {
                alert('unable to fetch app')
                console.log(err)
            } );
        if (user.roles.includes("Project Manager")) {
            fetch('../../getGrpNames')
            .then(response => response.json())
            .then(data => {
                console.log('Success:\n', data);
                setOptions(data[0].roles);                
            }).catch(e => alert('failed to load group names'));
        }
    },[]);
    
    function handleChange(app) {
        const link = `../../task/getOneAppInfo/${app}`;
        fetch(link)
            .then(res => res.json())
            .then(data => {
                setCurrentApp(data);
                setIsUpdate(true);
                setIsOpen(true);
            })
            .catch(e => alert('failed to load info'));
    }

    if (isLoaded) {
    return (
        <>
        <div className="container">
            <div className="row mt-2">
                <h3 className="fw-bold col-2">Dashboard</h3>
                { (user.roles.includes("Project Manager")) ?
                    <div className="col-auto mt-1">
                        <Link to='/createApp'><button className="btn btn-primary btn-sm">+ Create App</button></Link>
                    </div> 
                : null }
            </div>
            <div className="row">
                {
                    dataFetch.map((row,index) => {
                        const toLink = `/dashboard/${row.App_Acronym}`;
                        let sDate = new Date(row.App_startDate);
                        sDate = `${sDate.toDateString()}`;
                        let eDate = new Date(row.App_endDate);
                        eDate = eDate.toDateString();
                        return(
                            <div className="card col-3 m-3 shadow" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {row.App_Acronym}
                                    
                                    </h5>
                                    <p className="card-subtitle mb-2 text-muted"> {row.App_Description} </p>
                                    
                                    <pre className="card-text">
                                        Start Date: {sDate} <br />
                                        End date:   {eDate}
                                    </pre>
                                    <div className="row">
                                        <Link to={toLink} className="col"><button className="btn btn-colorT btn-fade">View Tasks</button></Link>        
                                        { 
                                            (user.roles.includes("Project Manager")) ? 
                                            <div className="col">
                                               <button 
                                                className="btn btn-colorP btn-fade"
                                                data-bs-toggle="modal" 
                                                data-bs-target="#editAppModal" 
                                                onClick={() => {handleChange(row.App_Acronym)}}
                                                >   
                                                    Edit App
                                                </button> 
                                            </div> : null 
                                        }
                                    </div>
                                    
                                </div>
                            </div>
                        );
                    })
                }
                {
                /*Card reference
                 <div className="card" style={{ width: "18rem" }}>
                    <div className="card-body">
                        <h5 class="card-title">Card title</h5>
                        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div> */
                }
            </div>

            <AppEditModal/>
        </div> 
        </>
            );
    } else {
        return (<h4>Loading data</h4>);
    }
}
    



export default Dashboard;