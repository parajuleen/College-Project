import React, { useState,useEffect,useContext } from 'react';
import {signedin} from '../api/config';
import {Maincontext} from '../App';
const Dummy = () => {
    let {token} = useContext(Maincontext);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        let fetchJobs = async ()  => {
            try {
            let result = await signedin(token).get("api/v1/recommend");
            setJobs(result.data.jobs);
            console.log(result.data.jobs);
            } catch(err) {
                console.log(err)
                alert(err)
            }
        }
         fetchJobs();

    },[])
      
  return (
    <div className="container">
      <h1>Jobs List</h1>
      <div className="row">
        {jobs.map((job) => (
          <div className="col-12 mb-4" key={job._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{job.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                Posted by: {job.org.name}
                {/* Posted by: <Link to={`/clients/${job.clientId}`}>{job.clientName}</Link> (<a href={`mailto:${job.clientEmail}`} className="text-primary">{job.clientEmail}</a>) */}
            </h6>
                <h6 className="card-subtitle mb-2 text-muted">
                  {job.clientName} (<a href={`mailto:${job.org.email}`} className="text-primary">{job.org.email}</a>)
                </h6>
                <p className="card-text">{job.description}</p>
                <p className="card-text">Budget : <strong>Rs {job.budget}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dummy;
