import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {BsFillCalendarEventFill} from "react-icons/bs"

// Todo: 
// - add http requests for submit
// - add navbar 

const Main = () => {
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

    // Customized date picker (that includes the icon)
    const CustomDatePick = React.forwardRef((props, ref) => {
        return (
          <div className="row ms-2">          
            <input 
                type="text" 
                onClick={props.onClick} 
                ref={ref} 
                className="form-control col"
                value={props.value || props.placeholder} 
            />         
            <BsFillCalendarEventFill 
                onClick={props.onClick} 
                className="col-auto float-end mt-1"
                style={{ fontSize: 25}}
            />
          </div>
        );
    });

    // Handle Application description input
    function handleAppDesc(e) {
        setAppDesc(e.target.value);
        setCharLeft(150 - e.target.value.length);
    }

    // Handle submit
    function handleSubmitApp() {

    }

    return (
        <div className="container">
        <div className="row">
        <div className="col"></div>
        <form className="col-4 p-0" onSubmit={handleSubmitApp}>
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
                    wrapperClassName="datePicker"
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)} 
                    minDate={nowDate}
                    customInput={<CustomDatePick/>}
                />
            </div>

            {/* End date input */}
            <div className="row mb-5">
                <label className="form-label">End Date</label> 
                <DatePicker
                    wrapperClassName="datePicker"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    minDate={startDate}
                    customInput={<CustomDatePick/>}
                /> 
            </div>

            <button className="btn btn-primary float-end d-block" type="submit">Create New App</button>
        </form>
        <div className="col"></div>
        </div>
            
        </div>



    );

}

export default Main;