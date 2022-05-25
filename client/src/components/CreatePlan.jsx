import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserNav from './navbar/UserNav';
import { useNavigate,useParams } from 'react-router-dom';

const CreatePlan = () => {
    let params = useParams();
    const navigate = useNavigate();
    const linkBack = `/dashboard/${params.app}`;

    // start/end/current dates
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [planName, setPlanName] = useState('');
    
    function handleSubmit(e) {
        e.preventDefault();
        const linkForm = `../../task/createPlan`;
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST",linkForm,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                navigate(linkBack);
            } 
            else if (this.readyState === 4 && this.status >= 400) {
                alert('Unable to create plan');
            }
        }
        
        xhttp.send(JSON.stringify({
            name: planName,
            startDate : startDate.getFullYear() + '-' + (startDate.getMonth()+1) + '-' + startDate.getDate(), 
            endDate : endDate.getFullYear() + '-' + (endDate.getMonth()+1) + '-' + endDate.getDate(), 
            app: params.app
        }));
    }

    return(
        <>
            <UserNav />
            <div className="container">
            <div className="row mt-3">
            <div className="col"></div>
            <div className="col-4">
            <form  onSubmit={handleSubmit}>
                 {/* header */}  
                <div className="row mb-2">
                    <h5 className='col'>Create Plan</h5>
                    <div className="col-auto">
                    <button className='btn btn-outline-primary mb-2 fw-bold' onClick={() => navigate(linkBack)}>
                        &lt; back
                    </button>
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
            </div>
            <div className="col"></div>
            </div>
            </div>
        </>
    );
}

export default CreatePlan;