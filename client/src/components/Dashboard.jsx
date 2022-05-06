// dashboard for user 
import UserNav from "./navbar/UserNav";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
    const navigate = useNavigate();
    function linkTask() {
        navigate('/createTask');
    }
    function linkPlan() {
        navigate('/createPlan');
    }

    // Handle submit
    function handleSubmitApp() {
        
    }

    return (
        <>
        <UserNav />
        {/* <nav className="navbar navbar-light bg-light flex-column align-items-stretch p-3 col-1">
            <h5 className="navbar-brand">Apps List</h5>
            <nav className="nav nav-pills flex-column">
                <a className="nav-link  active" >Item 1</a>
                <a className="nav-link" >Item 2</a>
                <a className="nav-link" >Item 3</a>
            </nav>
        </nav> */}
        
        <div className="container">
            
            <div className="row mt-2">
                <h3 className="fw-bold col-auto">Dashboard</h3>
                <div className="col">
                    <button className="btn btn-colorT btn-fade btn-sm me-3" onClick={linkTask}>
                        + New Task
                    </button>
                    <button className="btn btn-colorP btn-fade btn-sm me-2" onClick={linkPlan}>
                        + New Plan
                    </button>
                </div>
            </div>
            <div className="row mt-1 mb-2" id="taskCol">
                <div className="col bg-light border me-2">
                    <h6>Open</h6>
                    <div className="row bg-white border">
                        test
                    </div>
                </div>
                <div className="col bg-light border me-2">
                    <h6>To-Do</h6>
                </div>
                <div className="col bg-light border me-2">
                    <h6>Doing</h6>
                </div>
                <div className="col bg-light border me-2">
                    <h6>Done</h6>
                </div>
                <div className="col bg-light border">
                    <h6>Close</h6>
                </div>

            </div> 
            <div className="row">
                <h6>Description</h6>
                <p>
                bero id faucibus nisl tincidunt eget nullam non nisi est sit amet facilisis magna etiam tempor orci eu lobortis elementum nibh tellus molestie nunc non blandit massa enim nec dui nunc mattis enim ut tellus elementum sagittis vitae et leo duis ut diam quam nulla porttitor massa id neque aliquam vestibulum morbi blandit cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget gravida cum sociis natoque penatibus et magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer malesuad
                </p>
            </div>
            <hr />
            <div className="row">
                <h6 className="fw-bold">Plans</h6>
                <ul>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                    <li>Test</li>
                </ul>
            </div>
        </div>
            
        
        </>
        



    );

}

export default Dashboard;