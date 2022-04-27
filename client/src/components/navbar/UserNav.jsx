import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from "jotai";
import { UserAtom, userDetails } from "../Login";
import AdminNav from "./AdminNav";

// profile and sign out function
const UserNav = () => {
  const [user, setUserAtom ] = useAtom(UserAtom);

  // function to redirect to home page
  const navigate = useNavigate();

  // function to logout at button
  function handleLogOut() {
    // reset the session to default
    setUserAtom(userDetails);

    console.log('PRESSED LOGOUT')
    
    // function to redirect to home page
    navigate('/');    
    
    // send http request to logout
    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', '../../logoutUser', true);
    xhttp.send();
  }

  return (
    <nav id="nav_color" className="navbar navbar-expand-lg navbar-dark bg-darkblue">
    <div className="container">
      <h2 className="navbar-brand">Task Management</h2>
      
      {/* <!--navbar links--> */}
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse " id="navbarNav">
        <ul className="navbar-nav ">
          
          {/* <li className="nav-item">
            <Link className="nav-link" style={{margin:0}} to="#">Tasks</Link>
          </li> */}

          <li className="nav-item" style={{margin:0}}>
            <Link className="nav-link" style={{margin:0}} to="/settings">Settings</Link>
          </li>
          <AdminNav />
        </ul>
      </div>

      {/* <!--right-end navbar-items--> */}
      <div className="justify-content-end" >
        <ul className="navbar-nav">
          {/* <!--display current user--> */}
          <li className="nav-item">
            <h5 className="nav-link active me-4" style={{margin:0, fontWeight:"bold"}}>{user.username}</h5>
          </li>
          {console.log(user)}
          {/* <!--sign out button--> */}
          <form onClick={handleLogOut}>
            <li className="nav-item">
            <button 
              className="btn btn-outline-light"
              style={{margin:0}}
              >
                Sign out
            </button>
          </li>
          </form>
          
        </ul>
      </div> 
    </div>
    </nav>
    
  )
} 

export default UserNav;