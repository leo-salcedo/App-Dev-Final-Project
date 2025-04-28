import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './questions.css'

function Questions() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [directions, setDirections] = useState('');
    const [status, setStatus] = useState('not started');
    
    return (
        <div className = "homework-container">
            <div className = "back-button" onClick = {() => navigate('/Homework')}>
                ← Back to Homework Tree
            </div>

            <h1>Homework Assignment #{id}</h1>

            <div className = "homework-directions">
                <h2>Homework Directions</h2>
                <p>"Placeholder" __________________ <br></br>
                    _______________________________ <br></br>
                    _______________________________ <br></br>
                    _______________________________ <br></br>
                    _______________________________ <br></br>
                </p>
            </div>

            <div className = "homework-status">
                <label>Status:</label>
                <select value = {status} onChange = {(e) => setStatus(e.target.value)}>
                    <option value="completed">Completed</option>
                    <option value="in progress">In Progress</option>
                    <option value="not started">Not Started</option>
                </select>
            </div>
        </div>
    );
}

export default Questions;