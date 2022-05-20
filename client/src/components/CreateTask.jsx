import React, {useEffect} from 'react';
import UserNav from './navbar/UserNav';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CreateTask = () => {
    let params = useParams();
    const navigate = useNavigate();

    // states
    const [charLeft, setCharLeft] = React.useState(150);
    const [tName, setTname] = React.useState('');
    const [Tdesc, setTdesc] = React.useState('');
    const [plan, setPlan] = React.useState('');
    const [note, setNote] = React.useState('');
    const [listP, setListP] = React.useState([]);

    // load the list of plans (of the application)
    useEffect(() => {
        const link = `../../task/getAppPlans/${params.app}`;
        fetch(link)
            .then(response => response.json())
            .then(data => setListP(data))
            .catch(e => alert('unable to fetch list of plans'));
    },[]);

    function handleDesc(e) {
        setTdesc(e.target.value);
        setCharLeft(150 - e.target.value.length);
    }

    function handleForm(e) {
        e.preventDefault();
        const linkForm = `../../task/createTask`;
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                //alert("successfully created task");
                navigate(`/dashboard/${params.app}`);
            } else if (this.readyState === 4 && this.status > 400) {
                alert('Unable to create task');
            }
        }
        
        const obj = {
            'name':tName,
            'desc': Tdesc,
            'comment': note,
            'plan': plan,
            'app': params.app
        };
        xhttp.open("POST",linkForm,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify(obj));
    }
    let link1 = `/dashboard/${params.app}`;
    return(
        <> 
        <UserNav />   
        {/* -name
        -desc
        -app
        -plan
        -owner */}

        <div className="container">
        <div className="row mt-3">
        <div className="col"></div>
        <div className="col-auto">
            {/* header */}  
            <div className="row mb-2">
                <h5 className='col'>Create New Task for "{params.app}"</h5>
                <div className="col-auto">
                    <button className='btn btn-outline-primary mb-2 fw-bold' onClick={() => navigate(link1)}>
                        &lt; back
                    </button>
                </div>
                <hr />
            </div> 
        <form onSubmit={handleForm}>
            {/* task name */}
            <div className="row mb-3">
                <label>Task Name</label>
                <input 
                    className='form-control' 
                    type="text"  
                    onChange={e => setTname(e.target.value)}
                    required
                />
            </div>
            {/* task description */}
            <div className="row">
                <label>Task Description</label>
                <textarea 
                    className='form-control' 
                    id='textbox1'
                    cols="25" 
                    rows="3" 
                    onChange={e => handleDesc(e)}
                />
                <p className='text-end'>{charLeft} / 150 characters left</p>
            </div>
            {/* task plan */}
            <div className="row mb-3">
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
            {/* task notes */}
            <div className="row mb-4">
                <label>Task Notes</label>
                <textarea
                    className='form-control'
                    id='textbox2'
                    cols="25"
                    rows="3"
                    onChange={e => setNote(e.target.value)}
                />
            </div>
            <div className="row mb-5">
                <div className="col"></div>
                <div className="col-auto">
                <button type="submit" className="btn btn-primary float-end">Save New Task</button>
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

export default CreateTask;