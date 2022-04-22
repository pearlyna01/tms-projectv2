// Normal header for login
import React from 'react';

const Header = () => {
  return (
    <nav id="nav_color" className={`navbar navbar-expand-lg navbar-dark bg-darkblue`}>
      <div className="container">
        
        {/* Title of site */}
        <h1 className="navbar-brand">Task Management</h1>

        {/* button to toggle the links when the navbar in mobile view */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  )
}

export default Header;