// dashboard for user 
import React, { useState } from "react";
import { useNavigate,  Link } from 'react-router-dom';

import { useAtom  } from "jotai";
import { UserAtom } from "./Login";

const Dashboard = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [dataFetch, setDataFetch] = useState(null);
    const [user, setUserAtom ] = useAtom(UserAtom);

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
    },[]);
 
    if (isLoaded) {
    
    return (
        <>
        <div className="container">
            <div className="row mt-2">
                <h3 className="fw-bold col-2">Dashboard</h3>
                { (user.roles.includes("Admin")) ?
                    <div className="col-auto mt-1">
                        <Link to='/createApp'><button className="btn btn-primary btn-sm">+ Create App</button></Link>
                    </div> 
                : null }

            </div>
            
            <div>
                
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
                                    <Link to={toLink}>View Tasks</Link>
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
        </div> 
        </>
            );
        } else {
            return (<h4>Loading data</h4>);
        }
}
    



export default Dashboard;