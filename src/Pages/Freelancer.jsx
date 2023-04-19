import React from 'react'
import { useState } from 'react';

function Freelancer() {
  const [editable, isEditable] = useState(true)

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
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Digital Marketing','SEO', 'Graphics Designing', 'Content Writing', 'Social Media Managing','SQL','Oracle','MongoDb','Data Entry','ios Development','Python','Docker','AWS'],
    selectedSkills: [],
    experiences:''
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  function handlePhotoChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUser(prevUser => ({
        ...prevUser,
        photo: reader.result
      }));
    };
  }

  function handleSkillsChange(event) {
    const skill = event.target.value;
    if (event.target.checked) {
      setUser(prevUser => ({
        ...prevUser,
        selectedSkills: [...prevUser.selectedSkills, skill]
      }));
    } else {
      setUser(prevUser => ({
        ...prevUser,
        selectedSkills: prevUser.selectedSkills.filter(s => s !== skill)
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    // handle form submission
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="text-center">
            <div className="mb-3">
              {user.photo ? (
                <img src={user.photo} alt="Profile" className="img-fluid rounded-circle" style={{ width: '200px', height: '200px' }} />
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
                  <label htmlFor="bio" className="form-label">
                    Bio
                  </label>
                  <textarea id="bio" name="bio" value={user.bio} onChange={handleInputChange} className="form-control" />
                </div>

                <div className="mb-3">
                  <label htmlFor="skills" className="form-label">
                    Skills
                  </label>
                  <div className="skills-container" style={{ columns: 3 }}>
                  {user.skills.map((skill) => (
                    <div key={skill}>
                      <input type="checkbox" id={skill} name={skill} value={skill} checked={user.selectedSkills.includes(skill)} onChange={handleSkillsChange} />
                      <label htmlFor={skill}>{skill}</label>
                    </div>
                  ))}
                  </div>
                  <input type="text" id="selectedSkills" name="selectedSkills" value={user.selectedSkills.join(', ')} readOnly className="form-control" />
                  <small className="form-text text-muted">Selected skills</small>
                </div>
                <div className="mb-3">
  <label htmlFor="experiences" className="form-label">Experiences</label>
  <textarea id="experiences" placeholder="If any.."name="experiences" value={user.experiences} onChange={handleInputChange} className="form-control" />
</div>

                <button type="submit" className="btn btn-primary" onClick={setEditable}>
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
                  <strong>Bio:</strong> {user.bio}
                </p>
                <p>
                  <strong>Skills:</strong> {user.selectedSkills.join(', ')}
                </p>
                <p>
                  <strong>Experiences:</strong> {user.experiences}
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

export default Freelancer
