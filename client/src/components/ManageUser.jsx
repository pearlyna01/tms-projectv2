import React, { useEffect, useState } from "react";
import UserNav from "./navbar/UserNav";
import UserDetails from "./parts/UserDetails";

// display all user's active status, names and edit function
const ManageUser = () => {
    const [userList, setUserList] = useState([]);
    const [rolesList, setRolesList] = useState([]);
    const [selected, setSelected] = useState('all');

    useEffect(() => {
        // fetch the list of users with their active status, username, email, roles
        const xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function () {
            if ((this.readyState === this.DONE && this.status === 200) ||
                (this.readyState === this.DONE && this.status === 304)) {
                // Able to get list of users
                console.log("User List: ", this.responseText);
                setUserList(JSON.parse(this.responseText));
            }
        }
        
        xhttp.open('GET', '../../getUsersList', true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send();

        // get the list of roles 
        fetch('../../getGrpNames')
            .then(response => response.json())
            .then(data => setRolesList(data[0].roles))
            .catch(e => console.log(e));
    }, []);

    async function requestList(value) {
        // when the user select a role to filter
        if (value !== 'all') {
            // get the list of users based on the role selected
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = async function () {
                if ((this.readyState === 4 && this.status === 200) ||
                    (this.readyState === 4 && this.status === 304)) {
                    // Able to get list of users
                    console.log("User List: ", this.responseText);
                    setUserList(JSON.parse(this.responseText));
                }
            }
            xhttp.open('POST', '../../getUsersList/searchRole', true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ roles: value }));
            console.log(userList)
        }

        // when the user choose to view all users 
        if (value === 'all') {
            // fetch the list of users with their active status, username, email, roles
            const xhttp = new XMLHttpRequest();
            xhttp.open('GET', '../../getUsersList', true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.onreadystatechange = function () {
                if ((this.readyState === this.DONE && this.status === 200) ||
                    (this.readyState === this.DONE && this.status === 304)) {
                    // Able to get list of users
                    console.log("User List: ", this.responseText);
                    setUserList(JSON.parse(this.responseText));
                }
            }
            xhttp.send();
        }
    }
    async function handleChange(e) {
        e.preventDefault();

        //reset the user list before it can re-render the whole list
        setUserList([]);
        // send the http request to get the list 
        requestList(e.target.value);
        // set the value for the option selected 
        setSelected(e.target.value);
        
        console.log('Role selected', e.target.value, '-----');
    }

    return (
        <div>
            <UserNav />
            <div className="container">
                <div className="row m-3">
                    {/* <div className="col">
                    <button className="btn btn-success btn-lg">+ New User</button>
                </div> */}
                    <div className="col-auto"><p>Search users by group: </p></div>
                    <div className="col-3">

                        <select
                            className="form-select"
                            onChange={handleChange}
                            value={selected}
                        >
                            <option value="all">All users</option>
                            {
                                rolesList.map((role, index) => {
                                    return (
                                        <option key={index} value={role}>
                                            {role}
                                        </option>
                                    );
                                })
                            }

                        </select>
                    </div>
                </div>
                <table className="table table-striped">
                    {/* headers for the table */}
                    <thead>
                        <tr>
                            <th className="col-1" scope="col"><small>Enable/<br/>Disable user</small></th>
                            <th className="col-3" scope="col">Username</th>
                            <th className="col-3" scope="col">Email</th>
                            <th scope="col">Roles</th>
                            <th className="col-1" scope="col">Edit</th>
                        </tr>
                    </thead>

                    {/* rows containing users' details */}
                    <UserDetails array={userList} />
                </table>
            </div>
        </div>
    )
}

export default ManageUser;
