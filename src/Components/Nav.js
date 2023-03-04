import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Nav() {
  

  return (

<>

<nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#116466",
marginBottom:"3px" }}>
  <div className="container-fluid " >
    <Link className="navbar-brand" to="/">Talent Match</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2  mb-lg-0">
        <li className="nav-item ">
          <Link className="nav-link active text-white  " aria-current="page" to="/Fprofile">Profile</Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link active text-white" to="/browse">Browse Jobs</Link>
        </li>
        </ul>  
    </div>
  </div>
</nav>
</>
  );
}

export default Nav
