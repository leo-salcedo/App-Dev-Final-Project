import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Sidebar from '../Sidebar/Sidebar.tsx';
import './profile.css'
import './profile';

const Profile = () => {
    const navigate = useNavigate();
    
    const [year, setYear] = useState(() => {
        const stored = localStorage.getItem('year');
        return stored ? JSON.parse(stored) : [];
    });
    const [proficient, setProficient] = useState(() => {
        const stored = localStorage.getItem('proficient');
        return stored ? JSON.parse(stored) : [];
    });

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const years = [
        { value: 'Freshman', label: 'Freshman' },
        { value: 'Sophomore', label: 'Sophomore' },
        { value: 'Junior', label: 'Junior' },
        { value: 'Senior', label: 'Senior' },
        { value: 'Super Senior', label: 'Super Senior' }
    ];

    const proficients = [
        { value: 'Beginner', label: 'Beginner' },
        { value: 'Amateur', label: 'Amateur' },
        { value: 'Intermediate', label: 'Intermediate' },
        { value: 'Advanced', label: 'Advanced' },
        { value: 'Goated', label: 'Goated' }
    ];

    useEffect(() => localStorage.setItem('year', JSON.stringify(year)), [year]);
    useEffect(() => localStorage.setItem('proficient', JSON.stringify(proficient)), [proficient]);

    return (
        <div className="account-page">
            <Sidebar />
            <div className="merged-container">
                <div className="header-container">Profile</div>
                <div className="section1">
                    <form>
                        <div className="form-group">
                            <label id="labelName" htmlFor="year">Year in College:</label>
                            <Select id="year" options={years} value={year} onChange={setYear} />

                            //**use isMulti to the right of id for multiple selection enabled! - Maggie

                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="proficient">Coding Proficiency:</label>
                            <Select id="proficient" options={proficients} value={proficient} onChange={setProficient} />
                        </div>
                    </form>
                </div>

                <div className="dotted-line"></div>

                <div className="section2">
                    <form>
                        <div className="form-group">
                            <button type="button" onClick={handleLogout} className="logOutButton">Log Out</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
