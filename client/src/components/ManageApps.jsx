import React from "react";
import UserNav from "./navbar/UserNav";

const ManageApps = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        
        fetch('../../task/getAllApps')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(e => console.log(e));
    },[]);
    return( 
        <>
        <UserNav />
        <div className="container">
            <table className="table table-striped">
            <thead>
                <tr>
                    <th className="col-1" scope="col">App Acronym</th>
                    <th className="col-3" scope="col">Task Description</th>
                    <th className="col-2" scope="col">Start Date</th>
                    <th className="col-2" scope="col">End Date</th>
                    <th className="col-1" scope="col">Edit</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row,index) => {
                        return(
                            <tr key={index}>
                                <td>{row.App_Acronym}</td>
                                <td>{row.App_Description}</td>
                                <td>{row.App_startDate}</td>
                                <td>{row.App_endDate}</td>
                                <td></td>
                            </tr>
                        );
                    })
                }
            </tbody>
            </table>
        </div>
        </>
    );
    
}

export default ManageApps;