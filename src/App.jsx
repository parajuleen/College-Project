import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx';
import FreelancerSignUp from "./Pages/Freelancesign.jsx"
import Cprofile from './Pages/Cprofile.jsx'
import Post from './Pages/Post.jsx';
import Browse from './Pages/Browse.jsx';
import Header from './Components/Header.jsx';
import Nav from './Components/Nav.jsx';
import Freelancer from './Pages/Freelancer.jsx';

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
 
  const [token,setToken]  = useState(null);

  return (
   <>
   <Maincontext.Provider value={{loginStatus,userLogin,loggedInUser,token,setToken}} >
    {isLoggedIn ?<Nav/>:<Header/>}
   
  <Routes >
    <Route path='/' exact element={<Home/>}/>
    <Route path='/login' exact element={<Login />}/>
    <Route path='/fsignup' exact element={<FreelancerSignUp/>}/>
    <Route path='/signup' exact element={<Signup/>}/>
    <Route path='/fprofile' exact element={<Freelancer/>}/>
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
