import React, { Component } from 'react';
import { Link } from 'react-router-dom';



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