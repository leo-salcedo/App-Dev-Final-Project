import { useState } from 'react';
import "./SignIn.css"
import { Link } from 'react-router-dom';


const handleLogin = () => {
    window.location.href = 'https://redesigned-bassoon-j77q7ww9v5j2j76x-5173.app.github.dev/login';
};

const SignIn = ()=> {
    return (
      <div>
        <button onClick={handleLogin}>Login with Google</button>
        
        <ul>
          <li><Link to ="/Homework">Homework</Link></li>
          <li><Link to ="/Profile">Profile</Link></li>
          <li><Link to ="/Leaderboard" >Leaderboard</Link></li>
        </ul>
       
        </div>
    );};



export default SignIn;

