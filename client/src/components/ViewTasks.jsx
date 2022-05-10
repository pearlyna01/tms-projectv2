import React from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import UserNav from './navbar/UserNav';

const ViewTasks = () =>{
    let params = useParams();
    let navigate = useNavigate();
    const createTLink = `/createTask/${params.app}`;
    const createPLink = `/createPlan/${params.app}`;

    const [tasks, setTasks] = React.useState([]);
    const [appDetail, setAppDetail] = React.useState([]);
    const [appPlans, setAppPlans] = React.useState([]);
    const [userPerm, setUserPerm] = React.useState([]);

    React.useEffect(() => {
        const link1 = `../../task/getAppTasks/${params.app}`;
        const link2 = `../../task/getAppInfo/${params.app}`;
        const link3 = `../../task/getAppPlans/${params.app}`;
        const link4 = `../../task/getPerms/${params.app}`;

        // get tasks
        fetch(link1)
            .then(response => response.json())
            .then(data => {
                setTasks(data);
                console.log('data received for getting tasks\n',data);
            })
            .catch(e => {
                console.log(e);
                alert('unable to fetch data');
            });
        // get app details
        fetch(link2)
            .then(response => response.json())
            .then(data => {
                setAppDetail(data);
                console.log('data received for getting app detail\n', data);
            })
            .catch(e => alert('unable to fetch app detail'));
        // get app plans
        fetch(link3)
            .then(response => response.json())
            .then(data => {
                setAppPlans(data);
                console.log('data received for getting app plans\n', data);
            })
            .catch(e => alert('unable to fetch app detail'));
        // get user perms
        fetch(link4)
            .then(response => response.json())
            .then(data => setUserPerm(data))
            .catch(e => alert('unable to get user perms'));
    },[]);

    return(
        <>
        <UserNav />
        
        <div className="container">
        <div className="row mt-2 mb-2">

            <h6 className="col fw-bold"> Dashboard for App "{params.app}" </h6>
            
            {/* buttons column */}
            <div className="col-auto float-end">
                <button className="btn btn-colorT btn-fade btn-sm me-3" onClick={() => navigate(createTLink)}>
                    + New Task
                </button>
                <button className="btn btn-colorP btn-fade btn-sm me-2" onClick={() => navigate(createPLink)}>
                    + New Plan
                </button>
            </div>

        </div>
        
        {/* task columns */}
        <div className="row mt-1 mb-2" >
            {/* open column */}
            <div className="col bg-light border me-2 shadow-sm ">
                <h6 className="mt-2 ms-1 row fw-bold">Open</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto"  id="taskCol">
                <div className="col">
                {                    
                    tasks.open?.map((row, index) => (
                        <div key={index} className="row bg-white border border-darkblue mb-2 mt-1 task-height">
                            <p className='m-0 mt-2 fs-5'>{row.Task_name}</p>
                            <p className='m-0 mt-1'><small>{row.Task_id}</small></p>
                            <div className="task-owner mt-1">
                                <small>{row.Task_owner}</small>
                            </div>
                            <Link to="#">View task</Link>
                        </div>
                    ))
                } 
                </div>
                </div>
            </div>

            {/* to-do column */}
            <div className="col col-OK border me-2 shadow-sm ">
                <h6 className="mt-2 ms-1 row fw-bold">To Do</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto"  id="taskCol">
                <div className="col">
                {                    
                    tasks.to_do?.map((row, index) => (
                        <div key={index} className="row bg-white border border-darkblue mb-2 mt-1 task-height">
                            <p className='m-0 mt-2 fs-5'>{row.Task_name}</p>
                            <p className='m-0 mt-1'><small>{row.Task_id}</small></p>
                            <div className="task-owner mt-1">
                                <small>{row.Task_owner}</small>
                            </div>
                            <Link to="#">View task</Link>
                        </div>
                    ))
                } 
                </div>
                </div>
            </div>

            {/* doing column */}
            <div className="col col-NO border me-2 shadow-sm ">
                <h6 className="mt-2 ms-1 row fw-bold">Doing</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto"  id="taskCol">
                <div className="col">
                {                    
                    tasks.doing?.map((row, index) => (
                        <div key={index} className="row bg-white border border-darkblue mb-2 mt-1 task-height">
                            <p className='m-0 mt-2 fs-5'>{row.Task_name}</p>
                            <p className='m-0 mt-1'><small>{row.Task_id}</small></p>
                            <div className="task-owner mt-1">
                                <small>{row.Task_owner}</small>
                            </div>
                            <Link to="#">View task</Link>
                        </div>
                    ))
                } 
                </div>
                </div>
            </div>

            {/* done column */}
            <div className="col bg-light border me-2 shadow-sm ">
                <h6 className="mt-2 ms-1 row fw-bold">Done</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto"  id="taskCol">
                <div className="col">
                {                    
                    tasks.done?.map((row, index) => (
                        <div key={index} className="row bg-white border border-darkblue mb-2 mt-1 task-height">
                            <p className='m-0 mt-2 fs-5'>{row.Task_name}</p>
                            <p className='m-0 mt-1'><small>{row.Task_id}</small></p>
                            <div className="task-owner mt-1">
                                <small>{row.Task_owner}</small>
                            </div>
                            <Link to="#">View task</Link>
                        </div>
                    ))
                } 
                </div>
                </div>
            </div>

            {/* close column*/}
            <div className="col bg-light border me-2 shadow-sm ">
                <h6 className="mt-2 ms-1 row fw-bold">Close</h6>
                
                {/* tasks listed here */}
                <div className="row overflow-auto"  id="taskCol">
                <div className="col">
                {                    
                    tasks.close?.map((row, index) => (
                        <div key={index} className="row bg-white border border-darkblue mb-2 mt-1 task-height">
                            <p className='m-0 mt-2 fs-5'>{row.Task_name}</p>
                            <p className='m-0 mt-1'><small>{row.Task_id}</small></p>
                            <div className="task-owner mt-1">
                                <small>{row.Task_owner}</small>
                            </div>
                            <Link to="#">View task</Link>
                        </div>
                    ))
                } 
                </div>
                </div>
            </div>
        </div>
        
        {/* App description and Dates */}
        <h6 className='row fw-bold mt-1'> App Details </h6>
        <div className="row">
            {/* App Description */}
            <div className="col border">
                <p className='m-0 font-monospace text-decoration-underline mt-2'><small>Description</small> </p>
                <p>{appDetail.App_Description}</p>
            </div>
            
            {/* App Dates */}
            <div className="col border">
                <p className='m-0 font-monospace text-decoration-underline mt-2'><small>App dates</small> </p>

                <div className="row">
                    <p className='col-sm-3'>Start date:</p>
                    <p className='col'>{appDetail.App_startDate}</p>
                </div>
                <div className="row">
                    <p className='col-sm-3'>End date:</p>
                    <p className='col'>{appDetail.App_endDate}</p>
                </div>
            </div>
        </div>
        
        {/* App Plans */}
        <h6 className='row fw-bold mt-1'> App Plans </h6>
        <div className="row">
            <table className="table">
                <tbody>
                <tr  className='table-secondary'>
                    <td><small>Plan name</small></td>
                    <td><small>Plan start date</small></td>
                    <td><small>Plan end date</small></td>
                </tr>
                {
                    appPlans.map((row,index) => (
                        <tr key={index}>
                            <td>{row.Plan_MVP_name}</td>
                            <td>{row.Plan_startDate}</td>
                            <td>{row.Plan_endDate}</td>
                        </tr>
                    ))
                }
                <tr>

                </tr>
                </tbody>
            </table>
        </div>
        </div>
        </>
    );
    
}

export default ViewTasks;