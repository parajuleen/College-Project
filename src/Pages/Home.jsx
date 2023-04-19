import React from 'react'
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import "./Home.css"
import img1 from "../Assets/money.png"
import img2 from "../Assets/first.png"
import img3 from "../Assets/second.png"
import img4 from "../Assets/search.png"

function Home() {
  return (
    <>

      <div className="container-fluid main">
        <div className="row first">
          <div className="col abt" id="tagline">
            <p>
              Effortless Freelancing,<br />Limitless Oppurtunities.
            </p>
            <button className='btn'>
              <Link to="/fsignup" >Join As Freelancer</Link></button>
            <button className='btn '> <Link to="/signup" >Join As Client</Link></button>
          </div>
            <div className="col abt">
              <img src={img2} alt="firstimage" width="500px" height="500px"/>

            </div>
            </div>

            <div className="row">
            <div className="col abt">
            <img src={img3} alt="firstimage" width="500px" height="500px"/>

          </div>
            <div className="col abt">
            <h1>Who are we?</h1>
            <p>Talent Match is the freelance talent marketplace, connecting businesses with skilled professionals from all over the country. With Talent Match, you can find and hire top talent in a wide range of industries, including web development, graphic design, writing, customer service, and more</p>
            </div>
            </div>

          

        
        <div className="row" id="second ">
          <div className="col abt ">
            <h1 className='fw-bolder'>What do we do ?</h1>
            <p> Our platform is easy to use and designed to help you find the perfect freelancer for your project. You can search for freelancers by skill, location, and experience level,and then invite them to submit a proposal for your project. Once you've selected a freelancer, you can work with them directly ,using secure messaging .</p>

          </div>
          <div className="col abt">
          <img src={img4} alt="firstimage" width="500px" height="500px"/>
           </div>
          </div>


          <div className="row" id="fourth">
            <div className="col ">
            <img src={img1} alt="firstimage" width="500px" height="500px"/>
            </div>
            <div className="col abt "> <p>Talent Match also offers a variety of resources and support to help you get the most out of your freelance experience.If you're looking for top talent to help you bring your business to the next level, Talent Match is the perfect solution.
              <Link to="/Signup" className='text-primary'>Sign Up</Link> or <Link to="/Login" className="text-primary">Login</Link> now to start browsing our talent pool, and find the perfect freelancer for your next project.
              We want to make sure you find the right fit and get the best results.Thank you for considering Talent Match!
              </p></div>
           
          </div>



        

      </div>
      <Footer />
    </>
  );
}

export default Home
