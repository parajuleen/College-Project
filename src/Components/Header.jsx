import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Header() {
  return (
<>

<nav className="navbar navbar-expand-lg navbar-light " style={{backgroundColor:"#116466",
marginBottom:"3px" }}>
  <div className="container-fluid" >
    <Link className="navbar-brand" to="/">
    <span style={{ fontWeight: "bold", fontSize: "24px", color: "#fff", textShadow: "1px 1px #000" ,fontStyle: "italic" }}>TalentMatch</span>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2  mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active text-white  " aria-current="page" to="/" >Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" to="/fsignup">Find Jobs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" to="/signup">Find Freelancer</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active text-white" to="/login">Login</Link>
        </li>
        {/* <li className="nav-item">
          <Link className="nav-link active text-white" to="/signup">Sign Up</Link>
        </li> */}
      
      </ul>
      
    </div>
  </div>
</nav>
</>
  );
}

export default Header
