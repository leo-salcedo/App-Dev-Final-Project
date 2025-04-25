import { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar.tsx';
import './leaderboard.css'

const Leaderboard = ()=> {
    return (
        <div className="leaderboard">
            <Sidebar />
            <h2>Leaderboard</h2>
        </div>
    );
}

export default Leaderboard;