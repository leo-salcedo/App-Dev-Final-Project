import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import SignIn from "./SignIn/SignIn.tsx"
import Tree from './Homework/hmwk.tsx'; 
import Leaderboard from "./Leaderboard/leaderboard.tsx"
import Questions from "./Questions/questions.tsx"

const Landing = ()=> (
  <div className="App">
      <h1>Homework Tree</h1>
      <Tree />
    </div>
)

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "" element={<SignIn />} />
        <Route path = "/Landing" element={<Landing />} />
        <Route path = "/Homework" element = {<Tree/>}/>
        <Route path = "/Leaderboard" element = {<Leaderboard/>}></Route>
        <Route path = "/Questions" element = {<Questions/>} ></Route>

      </Routes>
    </Router>
  );
}

export default App;
