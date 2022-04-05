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