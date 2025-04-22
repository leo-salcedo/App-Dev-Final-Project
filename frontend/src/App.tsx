import { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import './App.css'
import SignIn from "./SignIn/SignIn.tsx"
import Tree from './Homework/hmwk.tsx'; 

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
      </Routes>
    </Router>
  );
}

export default App
