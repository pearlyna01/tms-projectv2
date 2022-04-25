import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsFillCalendarEventFill} from "react-icons/bs"
const Main = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const nowDate = new Date();
    
    const [charLeft, setCharLeft] = useState(0);
    function handleCharLeft() {

    }
       
    function handleStartDate(date){
        
        console.log('Date chosen: ',date)

        // show warning if date is chosen before today
        if (date < nowDate) {
            alert('Date chosen is too early. Choose a later date.')
        } else {
            setStartDate(date);
        }
    }
    function handleEndDate(date){
        
        console.log('Date chosen: ',date)

        // show warning if date is chosen before today
        if (date < nowDate) {
            alert('Date chosen is too early. Choose a later date.')
        } else {
            setEndDate(date);
        }
    }

    return (
        <div className="container">
            <div className="row">
                div
            </div>
            <h5>Create Application Details</h5>
            {/* Application Acronym input */}
            <label htmlFor="app_acronym" className="form-label">Application Acronym</label>
            <input className="form-control" type="text" />

            {/* Application Description input */}
            <label htmlFor="app_desc" className="form-label">Application Description</label>
            <p><small>{charLeft} / 150 characters left</small></p>
            <textarea 
                className="form-control" 
                type="text" 
                rows="3"
                maxLength={150}
                onChange={e => setCharLeft(150 - e.target.value.length)}
            >        
            </textarea>
            
            {/* Start date input */}
            <label htmlFor="app_desc" className="form-label">Start Date</label>
            <DatePicker className="form-control" selected={startDate} onChange={(date) => handleStartDate(date)} />

            {/* Start date input */}
            <label htmlFor="app_desc" className="form-label">End Date</label>
            {/* <DatePicker className="form-control" selected={endDate} onChange={(date) => handleEndDate(date)} />
            <BsFillCalendarEventFill /> */}
            <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setEndDate(date)}
                minDate={new Date()}
            /> 
            <button className="btn btn-primary">Create New App</button>
        </div>



    );

}

export default Main;