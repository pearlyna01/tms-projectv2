import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// admin extra nav link to manage user
const adminLinks = 
  <li class="nav-item">
    <a class="nav-link active" href="#">User Management</a>
  </li>
;

// user navbar links
const userLinks =  
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#">Settings</a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link">Tasks</a>              
      </li>
    </ul>
  </div>
;



// admin navlink

// profile and sign out function
const profileSignOut = props => {
  return (
    <div>
    <div class="justify-content-end">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active me-5" href="#">{props.username}</a>
        </li>

        <li class="nav-item">
          <button class="btn btn-outline-light">Sign out</button>
        </li>
      </ul>
    </div>  
    </div>
  )
} 

const navLinks = siteLink => {
  if (siteLink === "login") {
    return null;
  }
  return null;
}

const Header = ({children}, site) => {
  // not best practice to use <a> since it will refresh the page

  return (
    <div>
      <nav id="nav_color" className="navbar navbar-expand-lg navbar-dark bg-darkblue">
          <div className="container">
            <h2 className="navbar-brand" href="#">Task Management</h2>
            
            <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
            <navLinks />
            </div>
          </div>
      </nav>
      {children}
    </div>
  )
}

export default Header;