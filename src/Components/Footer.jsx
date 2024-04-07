import React from "react";
import { Facebook,Instagram,Twitter, } from "@mui/icons-material";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>

    <div className="container w-100 mw-100" style={{backgroundColor:"#116466" }} >
      <div className="row">
        <div className="col  col-md-6 col-sm-6">
        <h5><strong>Contact</strong></h5>
        <ul class="list-unstyled contact ">
          <li><a href="#">Email</a></li>
          <li><a href="#">Phone</a></li>
          <li><a href="#">Address</a></li>
        </ul>
        </div>
        <div className="col col-md-6 col-sm-6 " id="socialmedia" >
           <h5><strong>Follow us:</strong></h5>
        <ul className="list-inline">
          <li className="list-inline-item"><a href="#"><Facebook/></a></li>
          <li className="list-inline-item"><a href="#"><Instagram/></a></li>
          <li className="list-inline-item"><a href="#"><Twitter/></a></li>
        </ul>

        </div>
      </div>



    </div>
   


  
    </>
  );
}

export default Footer;