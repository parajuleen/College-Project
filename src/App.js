import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Home from './Pages/Home.js'
import Login from './Pages/Login.js'
import Signup from './Pages/Signup.js';
import FreelancerSignUp from "./Pages/Freelancesign.js"
import Fprofile from './Pages/Fprofile.js'
import Cprofile from './Pages/Cprofile.js'
import Post from './Pages/Post.js';
import Browse from './Pages/Browse.js';
import Header from './Components/Header.js';
import Nav from './Components/Nav.js';

export const Maincontext=React.createContext()


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
 const loginStatus=()=>{
  setIsLoggedIn(true)

  }
  const [loggedInUser, setLoggedInUser] = useState(null);
  const userLogin = (userType) => {
    console.log(userType)
    setLoggedInUser(userType);
  };
  

  return (
   <>
   <Maincontext.Provider value={{loginStatus,userLogin,loggedInUser}} >
    {isLoggedIn ?<Nav/>:<Header/>}
   
  <Routes >
    <Route path='/' exact element={<Home/>}/>
    <Route path='/login' exact element={<Login />}/>
    <Route path='/fsignup' exact element={<FreelancerSignUp/>}/>
    <Route path='/signup' exact element={<Signup/>}/>
    <Route path='/fprofile' exact element={<Fprofile/>}/>
    <Route path='/cprofile' exact element={<Cprofile/>}/>
    <Route path='/browse' exact element={<Browse/>}/>
    <Route path='/post' exact element={<Post/>}/> 
    <Route path='/*' exact element={<Home/>}/>
  </Routes>
  </Maincontext.Provider>
   </>
  );
}

export default App;
