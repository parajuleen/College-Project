import React from 'react'
import { useState, useEffect, axios } from "react";
import image1 from '../jobform.png'

function Newjob() {
  const [editingJobPosting, setEditingJobPosting] = useState(null);
  const [jobPostings, setJobPostings] = useState([]);
  // const [selectedSkills, setSelectedSkills] = useState([]);
  const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Digital Marketing','SEO', 'Graphics Designing', 'Content Writing', 'Social Media Managing','SQL','Oracle','MongoDb','Data Entry','Python','Docker','AWS']


  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    selectedSkills: [],
    budget: ''
  });


  useEffect(() => {
    //fetching backend data
    const fetchJobPostings = async () => {
      try {
        const response = await axios.get('/api/job-postings');
        setJobPostings(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobPostings();
  }, []);

  const handleSubmit = async (event) => {
    //sending data to backend
    event.preventDefault();
    const newJobPosting = {
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      // requiredSkills: formData.requiredSkills,
      requiredSkills: formData.selectedSkills,
      budget: formData.budget
    }
    try {
      if (editingJobPosting === null) {

        const response = await axios.post('/api/job-postings', newJobPosting);
        setJobPostings([...jobPostings, response.data]);
        // setJobPostings([...jobPostings, newJobPosting]);
      }
      else {
        const response = await axios.put(`/api/job-postings/${editingJobPosting}`, newJobPosting);
        const updatedJobPostings = [...jobPostings];
        updatedJobPostings[editingJobPosting] = response.data;
        // updatedJobPostings[editingJobPosting] = newJobPosting;
        setJobPostings(updatedJobPostings);
        setEditingJobPosting(null);
      }

      setFormData({
        jobTitle: '',
        jobDescription: '',
        selectedSkills:[],
        // requiredSkills: [],
        budget: ''
      });
      // setSelectedSkills([]);
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleEdit = (index) => {
    // set editing state and populate form inputs with job posting details
    setEditingJobPosting(index);
    const jobPosting = jobPostings[index];
    setFormData(jobPosting);
  };
  const handleSkillChange = (e) => {
    const skill = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setFormData({ ...formData, selectedSkills: [...formData.selectedSkills, skill] });
    } else {
      setFormData({ ...formData, selectedSkills: formData.selectedSkills.filter(selectedSkill => selectedSkill !== skill) });
    }
  }


  return (
    <div className="container" >
      <header>
        <h1>Job Posting Form</h1>
      </header>
      <main >
        <div className="row"style={{backgroundColor:'#379683'}}>
          <div className="col-md-6">
            <form className="job-form" onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="jobTitle" className="form-label">
                  Job Title:
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  className="form-control"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="jobDescription" className="form-label">
                  Job Description:
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  className="form-control"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>


              <div className="mb-3">
            <label htmlFor="skills" className="form-label">Skills:</label>
            <div className="skills-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', marginBottom: '10px' }}>
            {skills.map(skill => (

              <div key={skill} className='skill-item' style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <label htmlFor={skill} style={{ fontSize: '16px', marginRight: '5px' }}>{skill}</label>
                <input type="checkbox" id={skill} name={skill} value={skill} checked={formData.selectedSkills.includes(skill)} onChange={handleSkillChange} />
                
              </div>
            ))}
            </div>
            <label htmlFor="Required Skills" className="form-label">Required Skills:</label>
            <textarea id="selectedSkills" name="selectedSkills" value={formData.selectedSkills.join(', ')} readOnly className="form-control" />
          </div>

              {/* <div className="mb-3">
                <label htmlFor="requiredSkills" className="form-label">Select your skills:</label>
                {skills.map(skill => (
                  <div key={skill}>
                    <input
                      type="checkbox"
                      value={skill}
                      onChange={handleSkillChange}
                      checked={formData.selectedSkills.includes(skill)}
                    />
                    {skill}
                  </div>
                ))}
              </div> */}

              <div className="mb-3">
                <label htmlFor="budget" className="form-label">
                  Budget:
                </label>
                <div className="input-group">
                  <span className="input-group-text">Rs</span>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    className="form-control"
                    value={formData.budget}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary">
                Post Job
              </button>
            </form>
          </div>
          <div className="col-md-6">
            <img src={image1} alt='form' style={{width:"500px",height:"500px"}}/>
          </div>
         </div >
          <div className="col-md">
            <h2>Posted Jobs</h2>
            {jobPostings.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-3 g-3">
                {jobPostings.map((jobPosting, index) => (
                  <div className="col" key={index}>
                    <div className="card h-100">
                      <div className="card-body">
                        <h3 className="card-title">{jobPosting.jobTitle}</h3>
                        <p className="card-text"><strong>Description:</strong> {jobPosting.jobDescription}</p>
                        <p className="card-text"><strong>Skills:</strong> {jobPosting.requiredSkills}</p>
                        <p className="card-text"><strong>Budget:</strong> Rs{jobPosting.budget}</p>
                        <button type="button" className="btn btn-primary" onClick={() => handleEdit(index)}>Edit</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No job postings yet.</p>
            )}
          </div>
        
      </main >
    </div >

  )
}

export default Newjob
