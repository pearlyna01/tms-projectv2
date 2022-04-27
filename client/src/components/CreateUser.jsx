import React, { useState, useEffect } from "react";
import UserNav from "./navbar/UserNav";
import MultiSelect from  'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';

const CreateUser = () => {
    const [ newUsername, setNewUsername ] = useState("");
    const [ newPass, setPassW ] = useState("");
    const [ newEmail, setNewEmail ] = useState("");
    
    const [options, setOptions] = useState([]);
    const [value, setvalue ] = useState('');

    // load the group names
    useEffect(() => {
        fetch('../../getGrpNames')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setOptions(data[0].roles);
            });
    }, []);

    // set value when the options are selected
    function handleOnchange(val) {
        setvalue(val);
        console.log("Group names selected: ",val);
    }

    // modify the options to an array of { label:'', value:'' }
    function modifyOptions() {
        const arr = options;
        const res = [];
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            const jsonObj = {};
            jsonObj.label = element;
            jsonObj.value = element;
            res.push(jsonObj);
        }
        return res;
    }
    
    // function send http request to create a new user/row in accounts table
    async function createAUser(event) {
        //event.preventDefault();
        
        // parse the list of roles into an array 
        const listRoles = value.split(',');
        console.log(listRoles)
        // send http request to server to login
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST","../../createUser",true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                if (this.responseText === "User already exists") {
                    alert("Username already exists. Choose another username.")
                } else {
                    // User created successfully
                    alert('User created successfully');
                }
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Failed to create user
                alert('Unable to create user');
            } 
        }
        
        xhttp.send(JSON.stringify({
            username:newUsername, 
            password:newPass,
            email:newEmail,
            grp: listRoles
        }));
    }

    return (
        <div>
            <UserNav />
        <div className="container">
        <div className="row">
            {/* <!--Title--> */}
            <h3 className="mt-3">User Management</h3>
            <hr />

            <div className="col">

                {/* <!--Create a new user group--> */}
                <div className="row">
                <div className="col-sm-5 ms-5 mt-2">
                    <h4>Create a user</h4>
                    <hr />
                    
                    <form onSubmit={createAUser}>
                    {/* <!--new username--> */}
                    <div className="row mb-3">
                        <label htmlFor="newUsername" className="col-sm-4 col-form-label">New Username</label>
                        <div className="col">
                        <input type="text" className="form-control mt-2" id="newUsername" 
                        autoComplete="new-password"
                        onChange={(event) => setNewUsername(event.target.value)}
                        />
                        </div>
                    </div>

                    {/* <!--email--> */}
                    <div className="row mb-3">
                        <label htmlFor="email" className="col-sm-4 col-form-label">Email address</label>
                        <div className="col">
                            <input 
                                type="email" 
                                className="form-control mt-2" 
                                id="email" 
                                autoomplete="new-password"
                                onChange={(event) => setNewEmail(event.target.value)} 
                            />
                        </div>
                    </div>

                    {/* <!--new password--> */}
                    <div className="row mb-3">
                        <label htmlFor="Password" className="col-sm-4 col-form-label">New Password</label> 
                        <div className="col">
                        <input 
                            type="password" 
                            className="form-control mt-2"
                            id="newPassword"
                            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}"
                            title="Must contain 8-10 characters, alphabets, numbers and special characters"
                            onChange={(event) => setPassW(event.target.value)}
                            autoComplete="new-password"
                        />
                        </div>
                    </div>

                    {/* <!--Assigning group--> */}
                    <div className="preview-values">
                        <p>Assigned group</p>
                        {/* {value} */}
                    </div>

                    <MultiSelect
                        onChange={handleOnchange}
                        options={modifyOptions}
                    />
                    
                    {/* <!--Submit button to create user--> */}
                    <div className="row">
                        <div className="col">
                            <button className="btn btn-primary float-end mt-3" type="submit">Submit</button>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div> 
            </div> 
        </div>
        </div>
    );
}

export default CreateUser;