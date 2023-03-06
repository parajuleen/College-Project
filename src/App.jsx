import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx';
import FreelancerSignUp from "./Pages/Freelancesign.jsx"
import Fprofile from './Pages/Fprofile.jsx'
import Cprofile from './Pages/Cprofile.jsx'
import Post from './Pages/Post.jsx';
import Browse from './Pages/Browse.jsx';
import Header from './Components/Header.jsx';
import Nav from './Components/Nav.jsx';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const handleLogin=()=>{
  setIsLoggedIn(true)
 }
  return (
   <>
    {isLoggedIn ?<Nav/>:<Header/>}
   
  <Routes >
    <Route path='/' exact element={<Home/>}/>
    <Route path='/login' exact element={<Login onlogin={handleLogin} />}/>
    <Route path='/fsignup' exact element={<FreelancerSignUp/>}/>
    <Route path='/signup' exact element={<Signup/>}/>
    <Route path='/fprofile' exact element={<Fprofile/>}/>
    <Route path='/cprofile' exact element={<Cprofile/>}/>
    <Route path='/browse' exact element={<Browse/>}/>
    <Route path='/post' exact element={<Post/>}/> 
    <Route path='/*' exact element={<Home/>}/>
  </Routes>
  
   </>
  );
}

export default App;
