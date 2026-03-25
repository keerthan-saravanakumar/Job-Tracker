import { Link, NavLink } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import { FiMoon, FiSun, FiBriefcase } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { theme, toggleTheme } = useApplications();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <FiBriefcase className="logo-icon" />
          <span>Smart Job Tracker</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
          <NavLink to="/applications" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Applications</NavLink>
          <NavLink to="/analytics" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Analytics</NavLink>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
