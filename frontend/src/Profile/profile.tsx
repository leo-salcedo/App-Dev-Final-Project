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

    const handleLogout = ()=> {
        localStorage.clear();
        navigate('/SignIn');
    };

    const customSelectStyles = {
      control: (provided) => ({
        ...provided,
        color: "#000000",
        cursor: 'pointer',
      }),
      option: (provided, state) => ({
        ...provided,
        color: "#000000",
        cursor: 'pointer',
      }),
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
      
          <div className="profile-wrapper"> {/* New wrapper to center the card */}
            <div className="merged-container">
              <div className="header-container">Profile</div>
      
              <div className="section1">
                <form>
                  <div className="form-group">
                    <label htmlFor="year">Year in College:</label>
                    <Select
                      id="year"
                      options={years}
                      value={year}
                      onChange={setYear}
                      styles={customSelectStyles}
                    />
                  </div>
      
                  <div className="form-group">
                    <label htmlFor="proficient">Coding Proficiency:</label>
                    <Select
                      id="proficient"
                      options={proficients}
                      value={proficient}
                      onChange={setProficient}
                      styles={customSelectStyles}
                    />
                  </div>
                </form>
              </div>
      
              <div className="dotted-line"></div>
      
              <div className="section2">
                <form>
                  <div className="form-group">
                    <div className="button-container">
                      <button type="button" onClick={handleLogout} className="logOutButton">
                        Log Out
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
    );
      
};

export default Profile;
