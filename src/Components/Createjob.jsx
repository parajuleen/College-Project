import React, { useState,useContext,useEffect } from 'react';
import './Createjob.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {signedin} from '../api/config';
import {Maincontext} from '../App';
import image1 from "../Assets/jobform.png"

  const skills = ['React', 'JavaScript', 'HTML', 'CSS', 'Digital Marketing','SEO', 'Graphics Designing', 'Content Writing', 'Social Media Managing','SQL','Oracle','MongoDb','Data Entry','Python','Docker','AWS']

function Jobs() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);
  const [budget, setBudget] = useState('');
  const [editingJobPosting, setEditingJobPosting] = useState(null)
  const [jobPostings, setJobPostings] = useState([]);
  const [jobId,setJobId] = useState(null);

  const {  token } = useContext(Maincontext);
  useEffect(() => {
    // Fetch user profile data after login
    const fetchAllJobs = async () => {
      try {
        if (token) {
          const response = await signedin(token).get('api/v1/job/all')
          console.log(response.data)
          if (response.data) {
              setJobPostings(response.data.jobs)
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
        fetchAllJobs()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newJobPosting = {
      title:jobTitle,
      description:jobDescription,
      skills:requiredSkills,
      budget,
    };

    let user = signedin(token);
    console.log(user,token)
    if(editingJobPosting === null){
      try {

      await user.post('/api/v1/job/create',newJobPosting)
      } catch (err) {
          alert(err);
          console.log(err)
      }
      setJobPostings([...jobPostings, newJobPosting]);
    }else{
      const updatedJobPostings = [...jobPostings];
      newJobPosting._id = jobId;
      updatedJobPostings[editingJobPosting] = newJobPosting;
      console.log("Editing",newJobPosting)
      try {
      await user.post(`/api/v1/job/update/${newJobPosting._id}`,newJobPosting)
      } catch(err) {
          console.log(err)
      }
      setJobPostings(updatedJobPostings);
      setEditingJobPosting(null); 
    }

    
    setJobTitle('');
    setJobDescription('');
    setRequiredSkills([]);
    setBudget('');
    setJobId(null);
    // setShowForm(false)
  }

  const handleEdit = (index) => {
    // set editing state and populate form inputs with job posting details
    console.log('editing ',index);
    setEditingJobPosting(index);
    const jobPosting = jobPostings[index];
    console.log('Job ',jobPosting);
    setJobTitle(jobPosting.title);
    setJobDescription(jobPosting.description);
    setRequiredSkills(jobPosting.skills);
    setBudget(jobPosting.budget);
    setJobId(jobPosting._id);
    // setShowForm(true)

  }
  

 const handleSkillChange = (e) => {
    const skill = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      
        setRequiredSkills(skills=>[...skills,skill])
    } else {
     
      setRequiredSkills(skills=>skills.filter(selected=>selected!==skill))
    }
  }



  return (

    <div className="container">
    <h1 className='d-flex justify-content-center'>Job Posting Form</h1>
  
  <main>
    <div className="row" style={{backgroundColor:'#379683'}}>

      
      <div className="col-md-6">
        <form className="job-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="jobTitle" className="form-label">Job Title:</label>
            <input type="text" id="jobTitle" name="jobTitle" className="form-control" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="jobDescription" className="form-label">Job Description:</label>
            <textarea id="jobDescription" name="jobDescription" className="form-control" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} required />
          </div>
            <div className="skills-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '20px', marginBottom: '10px' }}>
            {skills.map((skill,index) => (

              <div key={index} className='skill-item' style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                <label htmlFor={skill} style={{ fontSize: '16px', marginRight: '5px' }}>{skill}</label>
                <input type="checkbox" id={skill} name={skill} value={skill} checked={requiredSkills.includes(skill)} onChange={handleSkillChange} />
                
              </div>
            ))}
            </div>

          <div className="mb-3">
            <label htmlFor="requiredSkills" className="form-label">Required Skills:</label>
            <textarea id="requiredSkills" name="requiredSkills" className="form-control" value={requiredSkills.join(', ')} onChange={(event) => setRequiredSkills(event.target.value)} readOnly  />
          </div>

          <div className="mb-3">
            <label htmlFor="budget" className="form-label">Budget:</label>
            <div className="input-group">
              <span className="input-group-text">Rs</span>
              <input type="number" id="budget" name="budget" className="form-control" value={budget} onChange={(event) => setBudget(event.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" >Post Job</button>
        </form>
      </div>
      <div className="col-md-6">
            <img src={image1} alt='form' style={{width:"500px",height:"500px"}}/>
          </div>
    </div>
  
     
      <div className="col-md">
        <h2>Posted Jobs</h2>
        {jobPostings.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-3 g-3">
            {jobPostings.map((jobPosting, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">{jobPosting.title}</h3>
                    <p className="card-text"><strong>Description:</strong> {jobPosting.description}</p>
                    <p className="card-text"><strong>Skills:</strong> {jobPosting.skills.join(', ')}</p>
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
    
    
  </main>
</div>

  )}
  export default Jobs

