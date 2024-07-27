// src/Navbar.js
import { Link } from 'react-router-dom';
// import { useAuth } from './../AuthContext';
import './Navbar.css';

export default function Navbar() {
  // const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="nav">
      <Link to="/home" className="site-title">
      SecureFishing
      </Link>
      <ul>
        {/* <li>
          <Link to="/">Content</Link>
        </li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li> */}
        <li>
          <Link to="/app/dashboard">Simulation</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        
          
        
      </ul>
    </nav>
  );
}
