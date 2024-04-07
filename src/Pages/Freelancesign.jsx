import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiBase, userapi } from "../api/config.js";

function FreelancerSignUp() {

 


  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleTogglePassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!formIsValid()) {
      setDisplay(false)
      alert('Fill up the requirements');
      return
    }

    // Here you can handle the submission of the form
    try {
      let result = await userapi.post("/create", formData);
      console.log(result)
    } catch (e) {
      console.log("Error occured", e);
    }
    ('/login')

  }

  function formIsValid() {
    const errors = {};
    if (!formData.name) {
      errors.name = "Name is required";
    }
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
      
      <>
        <div className="h-50 my-5">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="card shadow" id="contain">
                <div className="card-title text-center border-bottom bg-primary">
                  <h5 className="p-3 font-weight-bold">Sign Up As Freelancer!</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="form-label">
                        Name:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="username" className="form-label">
                        Email:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="input-group align-items-center">
                        <input
                          type={passwordVisible ? "text" : "password"}
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.value}
                          onChange={handleInputChange}


                        />

                        <button
                          className="btn"
                          type="button"
                          onClick={handleTogglePassword}
                          style={{ backgroundColor: "grey" }}
                        >
                          {passwordVisible ? (
                            <i className="bi bi-eye-slash" ></i>
                          ) : (
                            <i className="bi bi-eye" ></i>
                          )}
                        </button>

                      </div>
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>


                    <div className="d-flex justify-content-center flex-column align-items-center">
                      <button
                        className="btn-primary w-25"
                        style={{ backgroundColor: '#116466' }}
                        id="button"
                        onClick={handleSubmit}
                      >
                        Sign Up
                      </button>

                      <p>
                        Already have an account?
                        <Link to="/login" className="text-primary">
                          Login
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}

export default FreelancerSignUp;
