import React, {useEffect} from 'react';
import UserNav from './navbar/UserNav';
import { Link, useNavigate } from 'react-router-dom';

// todo:
// - need to navigate to the main page after submit 
// - modify to add the app acronym
const CreateTask = ({ appName }) => {
    // states
    const [charLeft, setCharLeft] = React.useState(150);
    const [tName, setTname] = React.useState('');
    const [Tdesc, setTdesc] = React.useState('');
    const [plan, setPlan] = React.useState('');
    const [listP, setListP] = React.useState([]);

    // load the list of plans (of the application)
    useEffect(() => {
        fetch('../../task/getAppPlans/ACRO3')
            .then(response => response.json())
            .then(data => setListP(data))
            .catch(e => alert('unable to fetch list of plans'));
    },[]);

    
    function handleDesc(e) {
        setTdesc(e.target.value);
        setCharLeft(150 - e.target.value.length);
    }

    function handleForm(e) {
        //e.preventDefault();
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST","../../task/createTask",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                alert("successfully created task");
            } 
            else if (this.readyState === 4 && this.status > 400) {
                alert('Unable to create task');
            }
        }
        
        xhttp.send(JSON.stringify({
            name:tName,
            desc: Tdesc,
            plan: plan,
            app: 'ACRO3'
        }));
        
    }

    return(
        <> 
        <UserNav />   
        {/* -name
        -desc
        -app
        -plan */}

        <div className="container">
        <div className="row mt-3">
        <div className="col"></div>
        <form onSubmit={handleForm} className="col-auto">
            {/* header */}  
            <div className="row mb-2">
                <h5 className='col'>Create New Task</h5>
                <div className="col-auto">
                    <Link className="fw-bold float-end" to="/">&lt; Back</Link> 
                </div>
                <hr />
            </div> 
            {/* task name */}
            <div className="row mb-2">
                <label>Task Name</label>
                <input 
                    className='form-control' 
                    type="text"  
                    onChange={e => setTname(e.target.value)}
                    required
                />
            </div>
            {/* task description */}
            <div className="row mb-2">
                <label>Task Description</label>
                <textarea 
                    className='form-control' 
                    cols="25" 
                    rows="3" 
                    onChange={e => handleDesc(e)}
                    required
                />
                <p className='text-end'>{charLeft} / 150 characters left</p>
            </div>
            {/* task plan */}
            <div className="row mb-4">
                <label>App Plan</label>
                <select 
                    className="form-select" 
                    onChange={e => setPlan(e.target.value)}
                    value={plan}
                >
                    <option value="">Chose a MVP plan</option>
                    {   listP.map((row,index) => {
                            return(
                                <option key={index} value={row.Plan_MVP_name}>
                                    {row.Plan_MVP_name}
                                </option>
                            );
                    })  }
                </select>
            </div>

            <div className="row">
                <div className="col"></div>
                <div className="col-auto">
                <button type="submit" className="btn btn-primary m-0 float-end">Save New Task</button>
                </div>
            </div>
            
        </form>
        <div className="col"></div>
        </div>
        
        </div>
       
    </>
    );
    
}

export default CreateTask;