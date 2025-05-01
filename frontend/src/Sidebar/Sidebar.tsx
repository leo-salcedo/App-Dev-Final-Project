import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';


const Sidebar = () => {
 const location = useLocation();

 return (
   <div className="sidebar">

      <img
          src="/App_Dev-logo.png" 
          alt="App Dev Bootcamp" 
          className="sidebar-logo" 
          width="50" 
          height="50" 
        />
        <link rel="stylesheet" href="" />
    
     <nav className="menu">
       <Link to="/homework" className={`menu-item ${location.pathname === '/homework' ? 'active' : ''}`}>
         <i className="fas fa-pencil"></i>
         <span>Homework</span>
       </Link>
      
       <Link to="/gradebook" className={`menu-item ${location.pathname === '/gradebook' ? 'active' : ''}`}>
         <i className="fas fa-clipboard"></i>
         <span>Gradebook</span>
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