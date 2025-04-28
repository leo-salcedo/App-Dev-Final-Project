import "./SignIn.css"
import { Link } from 'react-router-dom';


const backendUrl = import.meta.env.VITE_BACKEND;

const handleLogin = () => {
    window.location.href = `${backendUrl}/login`;
};

const SignIn = ()=> {
    return (
      <div>
        <button onClick={handleLogin}>Login with Google</button>
        
        <ul>
          <li><Link to ="/Homework">Homework</Link></li>
          <li><Link to ="/Profile">Profile</Link></li>
          <li><Link to ="/Gradebook">Gradebook</Link></li>
        </ul>
       
        </div>
    );};



export default SignIn;

