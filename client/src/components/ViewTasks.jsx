import React from 'react';
import { useParams } from 'react-router-dom';
import UserNav from './navbar/UserNav';

const ViewTasks = () =>{
   
    let params = useParams();

    return(
        <>
        <UserNav />
        
        <div className="container">
        <div className="row mt-2 mb-2">
                <div className="col">
                    <button className="btn btn-colorT btn-fade btn-sm me-3" onClick={null}>
                        + New Task
                    </button>
                    <button className="btn btn-colorP btn-fade btn-sm me-2" onClick={null}>
                        + New Plan
                    </button>
                </div>
            </div>
            <div className="row mt-1 mb-2" id="taskCol">
                <div className="col bg-light border me-2 shadow-sm">
                    <h6 className="mt-2 mt-2">Open</h6>
                    <div className="row bg-white border">
                        test
                    </div>
                </div>
                <div className="col bg-light border me-2 shadow-sm">
                    <h6 className="mt-2 mt-2">To-Do</h6>
                </div>
                <div className="col bg-light border me-2 shadow-sm">
                    <h6 className="mt-2 mt-2">Doing</h6>
                </div>
                <div className="col bg-light border me-2 shadow-sm">
                    <h6 className="mt-2 mt-2">Done</h6>
                </div>
                <div className="col bg-light border shadow-sm">
                    <h6 className="mt-2 mt-2">Close</h6>
                </div>
            
            </div>

        </div>
        </>
        
    );
    
}

export default ViewTasks;