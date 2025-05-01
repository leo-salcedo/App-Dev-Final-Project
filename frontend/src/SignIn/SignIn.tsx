import { Link } from 'react-router-dom';
import "./SignIn.css";

const backendUrl = import.meta.env.VITE_BACKEND;

const handleLogin = () => {
  window.location.href = `${backendUrl}/login`;
};

const SignIn = () => {
  return (
    <div className="signin-container">
      <div className="signin-box">
        <h1>Welcome to Bootcamp Backpack 🎒</h1>
        <p className="subtitle">Your home for homework, progress, and practice!</p>

        <button className="login-button" onClick={handleLogin}>
          Login with Google
        </button>

        {/* <ul className="nav-links">
          <li><Link to="/Homework">Homework</Link></li>
          <li><Link to="/Gradebook">Gradebook</Link></li>
          <li><Link to="/Profile">Profile</Link></li>
        </ul> */}
      </div>
    </div>
  );
};

export default SignIn;
