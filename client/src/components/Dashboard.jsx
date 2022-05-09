// dashboard for user 
import UserNav from "./navbar/UserNav";
import React, { useState } from "react";
import { useNavigate,  Link } from 'react-router-dom';

class ListApps extends React.Component {

}
class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            dataFetch:null
        };
    }

    componentDidMount() {
        fetch('../../task/getAllApps')
            .then(response => response.json())
            .then(data => this.setState({isLoaded:true, dataFetch: data}))
            .catch(err => {
                alert('unable to fetch app')
                console.log(err)
            } );
        
    }
    //const navigate = useNavigate();
    //  linkTask() {
    //     navigate('/createTask');
    // }
    // linkPlan() {
    //     let navigateL
    //     useNavigate('/createPlan');
    // }

    // Handle submit
     handleSubmitApp() {
        
    }

    render() {
        const arr = this.state.dataFetch;
    if (this.state.isLoaded) {
        
    
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
            <h3 className="fw-bold mt-2">Dashboard</h3>
            <div className="row">
                {
                    arr.map((row,index) => {
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
                                    
                                    <pre class="card-text">
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
    }


{/* 

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
            </div> */}
export default Dashboard;