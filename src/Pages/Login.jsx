import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom';
import Fprofile from './Fprofile';
import Cprofile from './Cprofile';
import { Maincontext } from '../App';
import { userapi } from '../api/config.js';

function Login() {

    const { loginStatus, userLogin, loggedInUser, setToken, token } = useContext(Maincontext)






    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})

    const handleInputChange = (event) => {
        const { name, value } = event.target
        console.log(name)
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))

    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Here you can handle the submission of the form
        try {
            let result = await userapi.post("/login", formData);
            let token = result.data.token
            setToken(token)
            userLogin('freelancer')
            console.log(`logged in as user with ${token}`)
        } catch (err) {
            console.log(err)
        }


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
                loggedInUser === 'client' ? <Cprofile /> : <Fprofile />) : (
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
                                                <label htmlFor='email' className="form-label">Email</label>
                                                <input type="text" className="form-control" id="email" name="email" value={formData.value} onChange={handleInputChange} />
                                                {errors.email && <div className="text-danger">{errors.email}</div>}
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="password" name="password" value={formData.value} onChange={handleInputChange} />
                                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                            </div>
                                            <div className="mb-4">
                                                <input type="checkbox" className="form-check-input" id="remember" />
                                                <label htmlFor="remember" className="form-label">Remember Me</label>
                                            </div>
                                            <div className="d-flex justify-content-center flex-column align-items-center ">
                                                <button type="submit" className=' btn-primary w-25' style={{ backgroundColor: "#116466" }} id="button">Login</button>
                                                <p>Don't Have an account? <Link to="/fsignup" className='text-decoration-none text-primary'>Register Here</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
            }

        </>
    );
}

export default Login
