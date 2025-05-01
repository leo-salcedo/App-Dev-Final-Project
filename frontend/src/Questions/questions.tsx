import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import './questions.css'

function Questions() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [directions, setDirections] = useState('');
    const [status, setStatus] = useState('not-started');

    useEffect(() => {
        const savedStatus = localStorage.getItem(`status-${id}`);
        if (savedStatus) {
            setStatus(savedStatus);
        }
    }, [id]);
    
    const directionsMap: Record<string, string> = {
        "1A": `Create a local repository, and then connect it to Github.<br />
              OR make a remote repository on Github and clone it to your local computer.<br />
              (Name it whatever you'd like).<br />
              Push a picture of you.`,
      
        "1B": `Go to this website: <a href="https://learngitbranching.js.org/" target="_blank" rel="noopener noreferrer">https://learngitbranching.js.org/</a><br />
              Complete level 1–3 “Introduction Sequence”.<br />
              Click on the “Remote” tab and complete levels 1–6 of “Push & Pull – Git Remotes!”.`,
      
        "1C": `*Optional* watch this video: <a href="https://www.youtube.com/watch?v=DVRQoVRzMIY&ab_channel=TechWithTim" target="_blank" rel="noopener noreferrer">YouTube – Tech With Tim</a>`,
      
        "2A": `Complete levels 1–13 and 18–20 of Flexbox Froggy.<br />
               Create a new branch titled 'flexbox' in your repository and create a new folder.<br />
               Then upload your screenshots for this week to the new folder in the flexbox branch.`,
      
        "2B": `Create a new repository and name it what you want your website to be.<br />
               Make a website about any topic you want!<br />
               Your website must include your headshot photo, h1/h2 tags, p tags, a tags, and sections.<br />
               Style your site using CSS to look polished.`,
      
        "3A": `Memory Flash Card game using the directions in the commented code.<br />
               This will be tricky, but uses all elements learned in class.`,
      
        "3B": `This homework is easier—create a flash card game like Quizlet.<br />
               There’s one card at a time, and you can scroll through cards.`,
      
        "4A": `Read the React documentation: 
               <a href="https://react.dev/learn/your-first-component" target="_blank" rel="noopener noreferrer">Your First Component</a>`,
      
        "4B": `Read the React documentation: 
               <a href="https://react.dev/learn/describing-the-ui" target="_blank" rel="noopener noreferrer">Describing the UI</a>`,
      
        "5A": `Instructions are in this README 
               (<b>DO NOT CLONE THIS REPOSITORY</b>):<br />
               <a href="https://github.com/KiberVG/bootcampfall2024-twitterclone/tree/fc272dc578ddecaa016d630b18a1a6ff910c8c69" target="_blank" rel="noopener noreferrer">Twitter Clone Homework Repo</a><br />
               Download starter files from here: 
               <a href="https://drive.google.com/file/d/1IlSWjLWmIUiS7ftWYb6F2QK_sK2NED2r/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive Link</a><br />
               Create your own repository for each homework assignment.`,
      
        "6A": `Read this FastAPI tutorial: 
               <a href="https://fastapi.tiangolo.com/tutorial/first-steps/" target="_blank" rel="noopener noreferrer">FastAPI First Steps</a>`,
      
        "7A": `React Reading: 
               <a href="https://react.dev/learn/updating-objects-in-state" target="_blank" rel="noopener noreferrer">Updating Objects in State</a>`,
      
        "7B": `React Reading: 
               <a href="https://react.dev/learn/updating-arrays-in-state" target="_blank" rel="noopener noreferrer">Updating Arrays in State</a>`,
      
        "7C": `React Reading: 
               <a href="https://react.dev/learn/synchronizing-with-effects" target="_blank" rel="noopener noreferrer">Synchronizing with Effects</a>`,
      };

    return (
        <div className = "page-container">
            <div className = "homework-container">
                <div className = "back-button" onClick = {() => {
                    navigate('/Homework');
                    window.location.reload();
                }}>
                    ← Back to Homework Tree
                </div>

                <h1>Homework Assignment #{id}</h1>

                <div className="homework-directions">
                    <h2>Homework Directions:</h2>
                    <div
                        className="homework-directions-content"
                        dangerouslySetInnerHTML={{ __html: directionsMap[id ?? ""] || "Directions not found for this assignment." }}
                    />
                    </div>
                <div className = "homework-status">
                    <label>Status:</label>
                    <select 
                        value = {status} 
                        onChange = {(e) => {
                            setStatus(e.target.value);
                            localStorage.setItem(`status-${id}`, e.target.value);
                        }}
                    >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="not-started">Not Started</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Questions;