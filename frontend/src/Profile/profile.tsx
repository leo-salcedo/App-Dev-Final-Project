import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Sidebar from '../Sidebar/Sidebar.tsx';
import './profile.css'
import './profile';

const Profile = () => {
    const navigate = useNavigate();
    
    const [location, setLocation] = useState(() => {
        const stored = localStorage.getItem('location');
        return stored ? JSON.parse(stored) : [];
    });
    const [produce, setProduce] = useState(() => {
        const stored = localStorage.getItem('produce');
        return stored ? JSON.parse(stored) : [];
    });
    const [season, setSeason] = useState(() => {
        const stored = localStorage.getItem('season');
        return stored ? JSON.parse(stored) : [];
    });
    const [negotiation, setNegotiation] = useState(() => {
        const stored = localStorage.getItem('negotiation');
        return stored ? JSON.parse(stored) : [];
    });
    const [travel, setTravel] = useState(() => {
        const stored = localStorage.getItem('travel');
        return stored ? JSON.parse(stored) : [];
    });
    const [notifications, setNotifications] = useState(() => localStorage.getItem('notifications') || 'all');
    const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'english');
    const [privacy, setPrivacy] = useState(() => localStorage.getItem('privacy') || 'public');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const locations = [
        { value: 'Washington, DC', label: 'Washington, DC' },
        { value: 'Fairfax, VA', label: 'Fairfax, VA' },
        { value: 'Frederick, MD', label: 'Frederick, MD' },
        { value: 'Rockville, MD', label: 'Rockville, MD' },
        { value: 'Columbia, MD', label: 'Columbia, MD' },
        { value: 'College Park, MD', label: 'College Park, MD' }
    ];

    const produces = [
        { value: 'Tomatoes', label: 'Tomatoes' },
        { value: 'Peppers', label: 'Peppers' },
        { value: 'Lettuce', label: 'Lettuce' },
        { value: 'Celery', label: 'Celery' },
        { value: 'Spinach', label: 'Spinach' },
        { value: 'Broccoli', label: 'Broccoli' },
        { value: 'Cauliflower', label: 'Cauliflower' },
        { value: 'Strawberries', label: 'Strawberries' },
        { value: 'Blueberries', label: 'Blueberries' },
        { value: 'Parsley', label: 'Parsley' },
        { value: 'Squash', label: 'Squash' },
        { value: 'Pumpkin', label: 'Pumpkin' }
    ];

    const seasons = [
        { value: 'spring', label: 'spring' },
        { value: 'summer', label: 'summer' },
        { value: 'fall', label: 'fall' },
        { value: 'winter', label: 'winter' }
    ];
    
    const negotiations = [
        { value: 'yes', label: 'yes' },
        { value: 'no', label: 'no' },
        { value: 'sometimes', label: 'sometimes' }
    ];

    const travels = [
        { value: 'yes', label: 'yes' },
        { value: 'no', label: 'no' },
        { value: 'sometimes', label: 'sometimes' }
    ];

    useEffect(() => localStorage.setItem('location', JSON.stringify(location)), [location]);
    useEffect(() => localStorage.setItem('produce', JSON.stringify(produce)), [produce]);
    useEffect(() => localStorage.setItem('season', JSON.stringify(season)), [season]);
    useEffect(() => localStorage.setItem('negotiation', JSON.stringify(negotiation)), [negotiation]);
    useEffect(() => localStorage.setItem('travel', JSON.stringify(travel)), [travel]);
    useEffect(() => localStorage.setItem('notifications', notifications), [notifications]);
    useEffect(() => localStorage.setItem('language', language), [language]);
    useEffect(() => localStorage.setItem('privacy', privacy), [privacy]);

    return (
        <div className="account-page">
            <Sidebar />
            <div className="merged-container">
                <div className="header-container">Profile</div>
                <div className="section1">
                    <form>
                        <div className="form-group">
                            <label id="labelName" htmlFor="location">Location:</label>
                            <Select id="location" isMulti options={locations} value={location} onChange={setLocation} />
                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="produce">Produce:</label>
                            <Select id="produce" isMulti options={produces} value={produce} onChange={setProduce} />
                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="season">Seasons:</label>
                            <Select id="season" isMulti options={seasons} value={season} onChange={setSeason} />
                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="negotiation">Will Negotiate Pricing:</label>
                            <Select id="negotiation" isMulti options={negotiations} value={negotiation} onChange={setNegotiation} />
                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="travel">Will Travel to Secure Sale:</label>
                            <Select id="travel" isMulti options={travels} value={travel} onChange={setTravel} />
                        </div>
                    </form>
                </div>

                <div className="dotted-line"></div>

                <div className="section2">
                    <div className="display-container">
                        <h3>Display:</h3>
                    </div>
                    <form>
                        <div className="form-group">
                            <label id="labelName" htmlFor="notifications">Notifications:</label>
                            <select id="notifications" value={notifications} onChange={(e) => setNotifications(e.target.value)}>
                                <option value="all">All Notifications</option>
                                <option value="email">Email Only</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="language">Language:</label>
                            <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                                <option value="english">English</option>
                                <option value="spanish">Spanish</option>
                                <option value="french">French</option>
                                <option value="german">German</option>
                                <option value="mandarin">Mandarin</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label id="labelName" htmlFor="privacy">Privacy Settings:</label>
                            <select id="privacy" value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
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
