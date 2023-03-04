import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
import Fprofile from './Fprofile';
import Cprofile  from './Cprofile';

function Login(props) {
const onLogin=props.onlogin
const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userType) => {
    setLoggedInUser(userType);

  };

const [username, setUsername] = useState('freelancer');
  const [password, setPassword] = useState('password');

  const verifyLogin = () => {

    // Validate user credentials 
    if (username === 'client' && password === 'password') {
      handleLogin('client');
    } else if (username === 'freelancer' && password === 'password') {
      handleLogin('freelancer');
    } else {
      alert('Invalid username or password!');
    }
  };
  

  const[formData,setFormData]=useState({
      email:'',
      password:''
    })
  const [errors,setErrors]=useState({})

  const handleInputChange=(event)=>{
    const{name,value}=event.target
    console.log(name)
    setFormData((prevState)=>({
        ...prevState,
        [name]:value,
    }))

  }
  const handleSubmit=(event)=>{
    event.preventDefault();
    // Here you can handle the submission of the form
  }
  function formIsValid() {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }
  
  useEffect(() => {
    formIsValid();
  }, [formData]);
  

  return (
    <>
     {loggedInUser ? (
        loggedInUser === 'client' ? <Cprofile /> : <Fprofile/>): (
      <>
     <div className="container my-5 h-50" >
    <div className="row justify-content-center ">
      <div className="col-lg-4 col-md-6 col-sm-6">
        <div className="card shadow" id="contain">
          <div className="card-title text-center border-bottom">
            <h2 className="p-3 bg-primary">Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlhtmlFor='email' className="form-label">Email</label>
                <input type="text" className="form-control" id="email" name="email" value={formData.value} onChange={handleInputChange}/>
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" value={formData.value} onChange={handleInputChange}/>
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>
              <div className="mb-4">
                <input type="checkbox" className="form-check-input" id="remember" />
                <label htmlFor="remember" className="form-label">Remember Me</label>
              </div>
              <div className="d-flex justify-content-center flex-column align-items-center ">
              <button className=' btn-primary w-25' style={{backgroundColor:"#116466"}} id="button" onClick={()=>{
                onLogin()
                verifyLogin()}}>Login</button>
              <p>Don't Have an account? <Link to="/fsignup" className='text-decoration-none text-primary'>Register Here</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
     </> )
  }
   
    </>
  );
}

export default Login
