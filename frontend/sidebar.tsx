import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from 'reportWebVitals';

import Homework from './src/Homework/hmwk';
import Leaderboard from './src/Leaderboard/leaderboard';
import Profile from './src/Profile/profile';
import Questions from './src/Questions/questions';

// import BrowseIcon from './BrowseIcon.png';
// import MessagingIcon from './MessagingIcon.png';
// import AccountIcon from './AccountIcon.png';


function Sidebar() {

  // const [open, setOpen] = useState(true);
  //If you have any unread messages, they show up in here? In that case, we'd append those chats here.
  const Menus = [
    { title: 'Homework', path: '/hmwk', gap: true },
    { title: 'Leaderboard', path: '/leaderboard' },
    { title: 'Profile', path: '/profile'},
    { title: 'Questions', path: '/questions'}
  ];

  //src: ProfileIcon for instance if we want icons on sidebar

  // <img src={"/the folder/${Menu.title}.file format of the image"} />
  // name image file accordingly
  return (
    <ul className="Sidebar">
      {Menus.map((Menu, index) => (
        <React.Fragment key={index}>
          <NavLink to={Menu.path} id="link">
            <li className="Sidebar">
              {/* <img src={Menu.src} width="40px" className="sidebar-icons" /> */}
              <span id="link-text">&nbsp;&nbsp;{Menu.title}</span>
            </li>
          </NavLink>
          {Menu.gap ? <p style={{ marginBottom: '30px' }} /> : null}
        </React.Fragment>
      ))}
    </ul>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container">
        <div className="column" id="left-column"><Sidebar /></div>
        <div className="column" id="right-column">
          <Routes>
            <Route path="/hmwk" element={<Homework />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/questions" element={<Questions />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();