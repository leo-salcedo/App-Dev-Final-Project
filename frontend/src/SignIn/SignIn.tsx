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

        <form action={backendUrl + "/regLogin"} method="POST">
          <label htmlFor="fname">First name:</label>
          <input type="text" id="fname" name="fname" /><br /><br />
          
          <label htmlFor="lname">Last name:</label>
          <input type="text" id="lname" name="lname" /><br /><br />
          
          <input type="submit" value="Submit" />
        </form>
        
        <ul>
          <li><Link to ="/Homework">Homework</Link></li>
          <li><Link to ="/Profile">Profile</Link></li>
          <li><Link to ="/Gradebook">Gradebook</Link></li>
        </ul>
       
        </div>
    );};



export default SignIn;

