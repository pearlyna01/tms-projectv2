// This file returns the user management navlinks if the user has the role of the admin
import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { UserAtom } from "../Login";

const AdminNav = () => {
    const [user, setUserAtom] = useAtom(UserAtom);

    if (user.roles.includes("Admin")) {
        return (
            <>
            <li className="nav-item dropdown">
                <ul className="nav-link dropdown-toggle" 
                    data-bs-toggle="dropdown" 
                    role="button" 
                    aria-expanded="false"
                >User Management
                </ul>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/createUser">Create User</Link></li>
                    <li><Link className="dropdown-item" to="/manageUser">Manage Users</Link></li>
                    <li><Link className="dropdown-item" to="/manageGrp">Manage Groups</Link></li>
                </ul>
            </li>
            <li className="nav-item dropdown">
                <ul className="nav-link dropdown-toggle" 
                    data-bs-toggle="dropdown" 
                    role="button" 
                    aria-expanded="false"
                >App Management
                </ul>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/createApp">Create App</Link></li>
                    <li><Link className="dropdown-item" to="/manageApps">Manage Apps</Link></li>
                </ul>
            </li>
            </>
       
    ); 
    } else {
        return null;
    }
}


export default AdminNav;
