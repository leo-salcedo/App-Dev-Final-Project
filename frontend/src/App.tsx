import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import SignIn from "./SignIn/SignIn.tsx"
import Profile from './Profile/profile.tsx'
import Tree from './Homework/hmwk.tsx'; 
const backendUrl = import.meta.env.VITE_BACKEND;
import Gradebook from "./Gradebook/gradebook.tsx"
import Questions from "./Questions/questions.tsx"

const Landing = () => (
  <div className="App">
    <h1>Welcome to the Homework Tree</h1>
    <p>Start by selecting a page below:</p>
    <nav>
      <Link to="/Profile">Go to Profile</Link><br />
      <Link to="/Homework">View Homework Tree</Link><br />
      <Link to="/Gradebook">View Gradebook</Link>
    </nav>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<SignIn />} />
        <Route path = "/Landing" element={<Landing />} />
        <Route path = "/Profile" element = {<Profile/>}/>
        <Route path = "/Homework" element = {<Tree/>}/>
        <Route path = "/Gradebook" element = {<Gradebook/>}></Route>

        <Route path = "/SignIn" element={<SignIn />} />

        <Route path="/Homework/:id" element={<Questions />} />
        
      </Routes>
    </Router>
  );
}

export default App;
