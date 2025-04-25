import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
 const location = useLocation();

 return (
   <div className="sidebar">

      <img 
          src="/____/____.png" 
          alt="App Dev Bootcamp" 
          className="sidebar-logo" 
          width="50" 
          height="50" 
        />

     {/* <Link to="/post" className="plus-btn">
            <i className="fa-solid fa-plus"></i>
     </Link> */}
    
     <nav className="menu">
       <Link to="/hmwk" className={`menu-item ${location.pathname === '/hmwk' ? 'active' : ''}`}>
         <i className="fas fa-search"></i>
         <span>Homework</span>
       </Link>
      
       <Link to="/leaderboard" className={`menu-item ${location.pathname === '/leaderboard' ? 'active' : ''}`}>
         <i className="fas fa-comments"></i>
         <span>Leaderboard</span>
       </Link>
      
       <Link to="/profile" className={`menu-item ${location.pathname === '/profile' ? 'active' : ''}`}>
         <i className="fas fa-user"></i>
         <span>Profile</span>
       </Link>
     </nav>
   </div>
 );
};

export default Sidebar;