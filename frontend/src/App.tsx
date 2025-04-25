import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import SignIn from "./SignIn/SignIn.tsx"
import Tree from './Homework/hmwk.tsx'; 
const backendUrl = process.env.REACT_APP_BACKEND;
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
        <Route path = "/" element={<SignIn />} />
        <Route path = "/tree" element={<Tree />} />
      </Routes>
    </Router>
  );
}

export default App;
