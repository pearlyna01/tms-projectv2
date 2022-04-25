// component for displaying list of users in ManageUser
import React, { useEffect, useState, Component } from "react";
import { FaHammer,FaCheckCircle } from 'react-icons/fa';
import { BsFillPersonCheckFill } from 'react-icons/bs';
import { atom, useAtom } from 'jotai';
import FormWindow from './FormWindow';

// component to update user password
const UpdateUserPass = (props) => {
    const [passInput, setPass] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFalse, setShowFalse] = useState(false);

    async function handleUpdatePass(event) {
        event.preventDefault();

        // send the request to update the password
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Login successful
                setShowSuccess(true);
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Login unsuccessful. user/password incorrect
                setShowFalse(true);
            } 
        }
        xhttp.open("POST",`../../updatePassword/${props.user}`,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ password: passInput }));
        
        // reset password inputs
        setPass("");
    }

    console.log('update pass component')

    return(
        <form onSubmit={handleUpdatePass}>
            <div className="row">
                <label htmlFor="password" className="col-3 col-form-label">New Password:</label>
                <div className="col">
                    <input
                        type="password"
                        className="form-control"
                        onChange={(event) => setPass(event.target.value)}
                        id="password1"
                        pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,10}"
                        title="Must contain 8-10 characters, alphabets, numbers and special characters"
                    />
                </div>
                {/* <!--Submit button to create user--> */}
                <div className="col">
                    <button className="btn btn-primary" type="submit">Save</button>
                </div>
                { (showSuccess) ? 
                    <div><p className="text-success fw-bold float-end">Successfully saved!</p></div> : null
                } 
                { (showFalse) ?
                    <div><p className="text-danger fw-bold">Failed to save!</p></div> : null
                }
            </div>
        </form>
    )
};

// component to update user email 
const UpdateUserEmail = (props) => {
    const [emailInput, setEmail ] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showFalse, setShowFalse] = useState(false);

    console.log('update email component, user',props.user)
    
    // function to send http request to update email
    async function handleUpdateEmail(event) {
        event.preventDefault();
        
        // send http request to update email
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                // Login successful. Show message that it is successful
                setShowSuccess(true);
            } 
            else if (this.readyState === 4 && this.status > 400) {
                // Login unsuccessful. user/password incorrect
                setShowFalse(true);
            } 
        }
        xhttp.open("POST",`../../updateEmail/${props.user}`,true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(JSON.stringify({ email: emailInput}));
        
        // reset email input
        setEmail("");
    }

    return(
        <form onSubmit={handleUpdateEmail}>
            <div className="row mb-3">
                {/* input for new email address */}
                <label htmlFor="email" className="col-3 col-form-label">New Email address:</label>
                <div className="col">
                    <input type="email" className="form-control mt-2" id="email" name="email" 
                    onChange={(event) => setEmail(event.target.value)} />
                </div>

                {/* <!--Submit button to update email--> */}
                <div className="col mt-2">
                    <button className="btn btn-primary" type="submit">Save</button>
                </div>
                { (showSuccess) ? 
                    <div><p className="text-success fw-bold float-end">Successfully saved!</p></div> : null
                } 
                { (showFalse) ?
                    <div><p className="text-danger fw-bold">Failed to save!</p></div> : null
                }
            </div>
        </form>
    )
};

// mini component to toggle 'assign/remove' role button
class AssignBut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: this.props.role,
            userName: this.props.userName,
            checkAssign: this.props.checkAssign
        };
        this.check = true;
        this.handleAssign = this.handleAssign.bind(this);
    }

    // function to assign/remove role onclick button
    async handleAssign(event) {
        event.preventDefault();

        const self = this;
        // remove role if it was assigned
        if (this.state.checkAssign) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                // successfully remove user from the role
                if (this.readyState === 4 && this.status === 200) {
                    console.log('successfully removed user from role')
                } 
                // failed to remove user from role
                else if (this.readyState === 4 && this.status > 400) {
                    console.log('failed to remove user from role')
                } 
            }
            xhttp.open("POST",`../../removeUserRole`,true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ user: self.state.userName, groupName: self.state.role }));
        }
        // else, add role to user
        else {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                // successfully added user from the role
                if (this.readyState === 4 && this.status === 200) {
                    console.log('successfully added user from role')
                } 
                // failed to add user from role
                else if (this.readyState === 4 && this.status > 400) {
                    console.log('failed to add user from role')
                } 
            }
            xhttp.open("POST",`../../assignUserRole`,true);
            xhttp.setRequestHeader("Content-type", "application/json");
            xhttp.send(JSON.stringify({ user: self.state.userName, groupName: self.state.role }));
        }

        // toggle to switch between assign/remove
        this.setState(state => ({
            ...state,
            checkAssign: !state.checkAssign
        }));
    }

    render() {
        if (this.state.checkAssign) {
            return (
                <button className="fw-bold btn btn-danger me-3" 
                    onClick={this.handleAssign}
                >
                    <BsFillPersonCheckFill className="me-2" />
                    Remove
                </button>
            ) 
        } else {
            return(
                <button className="fw-bold btn btn-success me-3"
                        onClick={this.handleAssign}
                >
                    <BsFillPersonCheckFill className="me-2" />
                    Assign
                </button>
            )
        }
    }    
}
// component to assign user to a role group
const AssignRole = (props) => {
    // user's currently assigned roles
    const currentGrps = props.currentRoles;
    const currentUser = props.user;
    // tms's avaliable roles
    const [grps,setGrps] = useState([]);

    useEffect(() => {
        // fetch the list of avaliable roles
        console.log('fetch avaliable roles')
        fetch('../../getGrpNames')
            .then(response => response.json())
            .then((data) => {
                // convert the list of key-value pairs where 
                // role group : is_assigned_to (boolean)
                const actualroles = data[0].roles;
                var jsonObj = {};
                for (let index = 0; index < actualroles.length; index++) {
                    if (currentGrps.includes(actualroles[index])) {
                        console.log(true)
                        jsonObj[actualroles[index]] = true;
                    } else {
                        jsonObj[actualroles[index]] = false;
                    }
                }
                setGrps(jsonObj);
                console.log(jsonObj)
            })
            .catch(() => alert('failed to fetch list of avaliable roles'));     
    },[currentGrps]);

    return(
        <div className="row">
        <div className="col-auto">
                <p className="mt-2 mt-3">Assign user to role(s): </p>
                <ul className="list-group">
                {
                    // grp -> key , grp[grp] -> value
                    Object.keys(grps).map((grp,index) => {
                        return(
                            <li className="list-group-item" key={index}>
                                <AssignBut role={grp} userName={currentUser} checkAssign={grps[grp]}/>
                                {grp}
                            </li>
                        )
                    })
                }
                </ul>
        </div>
        </div>
    )
}

// component display a row containing a user's details
class UserRow extends Component {
    constructor(props){
        super(props);
        this.state = { 
            details: {
                group_name:this.props.group_name, 
                username: this.props.username,
                email: this.props.email
            },
            inactive: this.props.inactive,
            editWindow: false
        };
        
        // note that need to use .bind() whenever super() is being called
        this.handleDisable = this.handleDisable.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    } 

    // open the window to edit the user's passsword and password
    toggleEdit() {
        this.setState(state => ({
            ...state,
            editWindow: !state.editWindow
        }));
    }

    // disable/enable user [new]
    handleDisable(event) {
        event.preventDefault();
        
        // To refer to the UserRow object properties
        const self = this;
        
        // if it is disabled -> enable it, else disable it 
        const action = (self.state.inactive === 1) ? "enable" : "disable";
        const actValue = (self.state.inactive === 1) ? 0 : 1;
        
        // http request
        const httpReq = `../../${action}User/${self.state.details.username}`;
        console.log(httpReq);

        // send a http request to disable/enable user 
        const xhttp = new XMLHttpRequest();
        xhttp.open('POST', httpReq, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            // Enabled/disabled successfuly
            if (this.readyState === this.DONE && this.status === 200) {
                // set state for the active function
                self.setState(state => ({
                    ...state,
                    inactive: actValue
                }));
                console.log(self.state)
                console.log(`User has been ${action}`);
            }
            else if (this.readyState === 4 && this.status > 400) {
                // Failed to disable/enable 
                console.log('Failed to disbale/enable user.');
            }
        }
        xhttp.send();
    }
    
    // disable/enable user
    // handleDisable(event) {
    //     event.preventDefault();
        
    //     // To refer to the UserRow object properties
    //     const self = this;
        
    //     // if it is disabled -> enable it, else disable it 
    //     const action = (self.state.inactive === 1) ? "enable" : "disable";
    //     const actValue = (self.state.inactive === 1) ? 0 : 1;
        
    //     // http request
    //     const httpReq = `../../${action}User/${self.state.details.username}`;
    //     console.log(httpReq);

    //     // send a http request to disable/enable user 
    //     const xhttp = new XMLHttpRequest();
    //     xhttp.open('POST', httpReq, true);
    //     xhttp.setRequestHeader("Content-type", "application/json");
    //     xhttp.onreadystatechange = function () {
    //         // Enabled/disabled successfuly
    //         if (this.readyState === this.DONE && this.status === 200) {
    //             // set state for the active function
    //             self.setState(state => ({
    //                 ...state,
    //                 inactive: actValue
    //             }));
    //             console.log(self.state)
    //             console.log(`User has been ${action}`);
    //         }
    //         else if (this.readyState === 4 && this.status > 400) {
    //             // Failed to disable/enable 
    //             console.log('Failed to disbale/enable user.');
    //         }
    //     }
    //     xhttp.send();
    // }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.userID !== prevProps.userID) {
    //         this.fetchData(this.props.userID);
    //     }
    // }

    render() {
        const roles = this.state.details.group_name;
        return (
            <tr>
                {/* clickable button to disable/enable user */}
                <td>
                    <div class="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value="" 
                            id="inactive status" 
                            checked={!this.state.inactive}
                            onChange={this.handleDisable}
                            style={{
                                width: 23, 
                                height: 23,
                                margin: 1
                            }}
                        />
                    </div>
                    {/* <FaCheckCircle 
                        style={{ 
                            color: (this.state.inactive === 1) ? "#bf0000" : "#00bf60", 
                            cursor:"pointer",
                            marginLeft:15,
                            fontSize:23,
                        }}
                        title="Click to enable/disable user"
                        onClick={this.handleDisable}
                    /> */}
                </td>
                {/* display username and email */}
                <td>{this.state.details.username}</td>
                <td>{this.state.details.email}</td>
                {/* display the user's roles */}
                <td>
                    <ul>
                    {
                        roles.map((role, index) => {
                            // renders the array if the user has any roles
                            if (role !== null) {
                                return (
                                    <li key={index}>{role}</li>
                                )
                            } else {
                                return (null)
                            }
                        })
                    }
                </ul>
                    
                </td>
                
                {/* clickable button to change user's email/password/roles */}
                <td><FaHammer 
                    style={{ cursor:"pointer" }} 
                    onClick={this.toggleEdit}/>
                </td>
                {
                    this.state.editWindow && (
                    <FormWindow>
                    <div className="container">
                        <h4 className="mt-3">Change user details for "{this.state.details.username}"</h4>
                        
                        {/* <!--Change email input--> */}
                        <UpdateUserEmail user={this.state.details.username} />
                        
                        {/* <!--new password--> */}
                        <UpdateUserPass user={this.state.details.username} />
                        
                        {/* Assign user some roles */}
                        <AssignRole currentRoles={roles} 
                                    user={this.state.details.username}
                        />
                    </div>
                    </FormWindow>
                    )
                }
            </tr>
        );
    }
}

// maps out each user with its [id,username, inactive, group_name] in a array
class UserDetails extends Component {    
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
        const array = this.props.array;
        return (
            <tbody>
            {
                /* return the list containing users' details*/
                array.map((user,index) => {
                    const {username, inactive, email,roles} = user;
                    return(
                        <UserRow 
                            key={index} 
                            username={username} 
                            inactive={inactive} 
                            group_name={roles} 
                            email={email}
                        />
                    )
                })
            }
            </tbody>
        );
    }
}

export default UserDetails;