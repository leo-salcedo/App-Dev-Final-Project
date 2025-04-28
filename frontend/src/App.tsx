import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import SignIn from "./SignIn/SignIn.tsx"
import Profile from './Profile/profile.tsx'
import Tree from './Homework/hmwk.tsx'; 
const backendUrl = import.meta.env.VITE_BACKEND;
import Leaderboard from "./Leaderboard/leaderboard.tsx"
import Questions from "./Questions/questions.tsx"

const Landing = ()=> (
  <div className="App">
      <h1>Homework Tree</h1>
    </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "" element={<SignIn />} />
        <Route path = "/Landing" element={<Landing />} />
        <Route path = "/Profile" element = {<Profile />}/>
        <Route path = "/Homework" element = {<Tree />}/>
        <Route path = "/Leaderboard" element = {<Leaderboard />}></Route>
        <Route path="/Homework/:id" element={<Questions />} />
        
      </Routes>
    </Router>
  );
}

export default App;
