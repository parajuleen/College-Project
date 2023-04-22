import React from 'react'
import { useState,useContext,useEffect } from 'react';
import {Maincontext} from '../App';
import {statics,signedin} from '../api/config';
function Cprofile() {
  const [editable, isEditable] = useState(true)
  const { loginStatus, userLogin, loggedInUser, setToken, token } = useContext(Maincontext);
  const setEditable = () => {
    isEditable(false)
  }
  const changeValue = () => {
    isEditable(true)
  }

  const [user, setUser] = useState({
    name: '',
    email: '',
    contact:'',
    bio: '',
    photo: '',
    
  });
   useEffect(() => {
    // Fetch user profile data after login
    const fetchUserProfile = async () => {
      try {
        if (token) {
          const response = await signedin(token).get('api/v1/org/profile')
          console.log(response.data)
            if (response.data.filled) {
            setUser(response.data);
            setEditable();
            }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserProfile();
  }, []);


  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handlePhotoChange(event) {
    const file = event.target.files[0];
    setUser(prev => ({...prev,photo: file}))
   /* const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUser(prevUser => ({
        ...prevUser,
        photo: reader.result
      }));
    };*/
  }

  

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission
    console.log(user)
    const form = new FormData();
    form.append('name',user.name);
    form.append('email',user.email);
    form.append('contact',user.contact);
    form.append('logo',user.photo);
    form.append('about',user.bio)
    console.log(form)
    if (loggedInUser == 'client') {
       let user = signedin(token);
       user.post('/api/v1/org/profile',form)
    } else {
        alert("Must sign in as client")
    }
 


  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            <div className="mb-3">
              {user.photo ? (
                <img src={`${statics}/${user.photo}`} alt="Profile" className="img-fluid rounded-circle" style={{ width: '200px', height: '200px' }} />
              ) : (
                <i className="bi bi-person-circle" style={{ fontSize: '200px'}}></i>
              )}
            </div>
            <div>
              {editable ? (
                <input
                  type="file"
                  id="photo"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="form-control"
                />
              ) : null}
            </div>
          </div>
        </div>
        <div style={{ border: '1px solid #ccc', backgroundColor: '#577D86', padding: '10px' }}>
          <div className="col-md-8">
            {editable ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input type="text" id="name" name="name" value={user.name} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input type="text" id="email" name="email" value={user.email} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Contact:
                  </label>
                  <input type="text" id="name" name="contact" value={user.contact} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="about" className="form-label">
                  About:
                  </label>
                  <textarea id="bio" name="bio" value={user.bio} onChange={handleInputChange} className="form-control" />
                </div>
  <button type="submit" className="btn btn-primary" onClick={(event)=>{setEditable();handleSubmit(event)}}>
                  Save
                </button>
              </form>
            ) : (
              <>
                <h2>Profile</h2>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Contact:</strong> {user.contact}
                </p>
                <p>
                  <strong>About:</strong> {user.bio}
                </p>
                <button type="button" className="btn btn-primary" onClick={changeValue}>
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cprofile
