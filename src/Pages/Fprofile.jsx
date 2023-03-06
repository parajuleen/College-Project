import React from 'react'
import { useState } from 'react';
import img5 from "../Assets/nishan.jpg"
function Profile() {

    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSkillChange = (event) => {
        const { value } = event.target;
        setSelectedSkills((prevSelectedSkills) => {
            if (prevSelectedSkills.includes(value)) {
                return prevSelectedSkills.filter((skill) => skill !== value);
            } else {
                return [...prevSelectedSkills, value];
            }
        });
    };

    const skills = [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Angular',
        'Vue',
        'Node.js',
        'Express',
        'MongoDB',
        'MySQL',
        'PostgreSQL',
        'Python',
        'Java',
        'C#',
        'PHP',
    ];

    const [postContent, setPostContent] = useState('');
    const [isEditing, setIsEditing] = useState(true);


    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handlePostSubmit = (event) => {
        event.preventDefault();
        setIsEditing(false);
    };

    
    


    return (
        <>
            <div className="container">
                <div className="row">

                    <div className="col-12 col-md-3" style={{ backgroundColor: "#116466" }} >
                        <img className='img-fluid' src={img5} alt="profile" width="300px" height="300px" />
                    </div>


                    <div className="col-md-8">
                        <form onSubmit={handlePostSubmit}>
                            {isEditing ? (
                                <textarea
                                    className="form-control mb-3"
                                    rows="5"
                                    placeholder="Write about yourself?"
                                    value={postContent}
                                    onChange={handlePostContentChange}
                                />
                            ) : (
                                <p>{postContent}</p>
                            )}
                            {isEditing ? (
                                <div className="text-right">
                                    <button className="btn btn-primary mr-2" type="submit" >
                                        Post
                                    </button>
                                    <button className="btn btn-secondary" onClick={handleEditClick}>
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <div className="text-right">
                                    <button className="btn btn-primary" onClick={handleEditClick}>
                                        Edit
                                    </button>
                                </div>
                            )}
                        </form>

                    </div>


                </div>
            </div>


            <div className="row bg-success">
                <div className="col">
                    <h2>Skills</h2>
                    {/* <form onSubmit={handleSubmit}> */}
                        <div className="row">
                            {skills.map((skill) => (
                                <div key={skill} className="col-md-4">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={skill}
                                            value={skill}
                                            checked={selectedSkills.includes(skill)}
                                            onChange={handleSkillChange}
                                        />
                                        <label className="form-check-label" htmlFor={skill}>
                                            {skill}
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">
                            Save Skills
                        </button>
                    {/* </form> */}
                </div>
            </div>


        </>
    )
}

export default Profile
