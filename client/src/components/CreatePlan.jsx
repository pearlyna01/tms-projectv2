import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserNav from './navbar/UserNav';
import { Link, useNavigate } from 'react-router-dom';

const CreatePlan = () => {
    // start/end/current dates
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [planName, setPlanName] = useState('');
    
    function handleSubmit(e) {
        //const xhttp = new XMLHttpRequest();

    }
    return(
        <>
            <UserNav />
            <div className="container">
            <div className="row mt-3">
            <div className="col"></div>
            <form className="col-4" onSubmit={handleSubmit}>
                 {/* header */}  
                <div className="row mb-2">
                    <h5 className='col'>Create Plan</h5>
                    <div className="col-auto">
                        <Link className="fw-bold float-end" to="/">&lt; Back</Link> 
                    </div>
                    <hr />
                </div> 
                 {/* Application Acronym input */}
                <div className="row mb-3">
                    <label htmlFor="planName" className="form-label">Plan Name</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        onChange={e => setPlanName(e.target.value)}
                    />
                </div>

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

                <div className="row">
                    <div className="col">
                        <button type="submit" className='btn btn-primary float-end'>
                            Save Plan
                        </button>
                    </div>
                </div>
                
            </form>
            <div className="col"></div>
            </div>
            </div>
        </>
    );
}

export default CreatePlan;