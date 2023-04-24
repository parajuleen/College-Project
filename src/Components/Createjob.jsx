import React, { useState,useContext,useEffect } from 'react';
import './Createjob.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {signedin} from '../api/config';
import {Maincontext} from '../App';
function Jobs() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [budget, setBudget] = useState('');
  const [editingJobPosting, setEditingJobPosting] = useState(null)
  const [jobPostings, setJobPostings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [jobId,setJobId] = useState(null);

  const { loginStatus, userLogin, loggedInUser, setToken, token } = useContext(Maincontext);
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
      skills:[requiredSkills],
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
    setRequiredSkills('');
    setBudget('');
    setJobId(null);
    setShowForm(false)
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
    setShowForm(true)

  }
  const handleBtnClick=()=>{
    setShowForm(!showForm);
  }


  return (

    <div className="container">
  <header>
    <h1>Job Posting Form</h1>
  </header>
  <main>
    <div className="row">

     { showForm && (
      
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

          <div className="mb-3">
            <label htmlFor="requiredSkills" className="form-label">Required Skills:</label>
            <input type="text" id="requiredSkills" name="requiredSkills" className="form-control" value={requiredSkills} onChange={(event) => setRequiredSkills(event.target.value)} required />
          </div>

          <div className="mb-3">
            <label htmlFor="budget" className="form-label">Budget:</label>
            <div className="input-group">
              <span className="input-group-text">$</span>
              <input type="number" id="budget" name="budget" className="form-control" value={budget} onChange={(event) => setBudget(event.target.value)} required />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" >Post Job</button>
        </form>
      </div>)}
    
  
      
    { !showForm && (<div className="col-lg">
      <button type="button" className="btn btn-primary" id="display" onClick={handleBtnClick}>Post New Jobs</button>
      </div>)}
      
     
      <div className="col-lg-12">
        {jobPostings.length > 0 ? (
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {jobPostings.map((jobPosting, index) => (
              <div className="col" key={index}>
                <div className="card h-100">
                  <div className="card-body">
                    <h3 className="card-title">{jobPosting.title}</h3>
                    <p className="card-text"><strong>Description:</strong> {jobPosting.description}</p>
                    <p className="card-text"><strong>Skills:</strong> {jobPosting.skills}</p>
                    <p className="card-text"><strong>Budget:</strong> ${jobPosting.budget}</p>
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
    
    </div>
  </main>
</div>

  )}
  export default Jobs

