import React, { useState } from 'react';

const Dummy = () => {
    const [jobs, setJobs] = useState([
        {
          id: 1,
          jobTitle: 'Software Engineer',
          clientName: 'ABC Company',
          clientEmail: 'abc@company.com',
          description: 'We are looking for a software engineer with experience in React and Node.js',
          budget: '$80,000 - $100,000',
          postedBy:'ABC'
        },
        {
          id: 2,
          jobTitle: 'Web Designer',
          clientName: 'XYZ Agency',
          clientEmail: 'xyz@agency.com',
          description: 'We are seeking a talented web designer to join our team',
          budget: '$50,000 - $70,000',
          postedBy:'DEF'
        },
        {
          id: 3,
          jobTitle: 'Marketing Manager',
          clientName: '123 Inc.',
          clientEmail: '123@inc.com',
          description: 'We are hiring a marketing manager with experience in digital marketing',
          budget: '$90,000 - $110,000',
          postedBy:'GHI'
        },
        {
          id: 4,
          jobTitle: 'Data Analyst',
          clientName: 'Data Corp',
          clientEmail: 'data@corp.com',
          description: 'We are seeking a data analyst to help us analyze customer data',
          budget: '$70,000 - $90,000',
          postedBy:'JKL'
        },
        {
          id: 5,
          jobTitle: 'Product Manager',
          clientName: 'Product Co.',
          clientEmail: 'product@co.com',
          description: 'We are looking for a product manager with experience in software development',
          budget: '$100,000 - $120,000',
          postedBy:'MNO'
        },
      ]);
      
  return (
    <div className="container">
      <h1>Jobs List</h1>
      <div className="row">
        {jobs.map((job) => (
          <div className="col-12 mb-4" key={job.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{job.jobTitle}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                Posted by: {job.postedBy}
                {/* Posted by: <Link to={`/clients/${job.clientId}`}>{job.clientName}</Link> (<a href={`mailto:${job.clientEmail}`} className="text-primary">{job.clientEmail}</a>) */}
            </h6>
            
                <h6 className="card-subtitle mb-2 text-muted">
                  {job.clientName} (<a href={`mailto:${job.clientEmail}`} className="text-primary">{job.clientEmail}</a>)
                </h6>
                <p className="card-text">{job.description}</p>
                <p className="card-text">Budget Range: <strong>{job.budget}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dummy;
