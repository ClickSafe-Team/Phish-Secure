import React from 'react';
import './Navbar.css';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => setCurrentPage('home')}>
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">ClickSafe</span>
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <button 
              className={`navbar-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => setCurrentPage('home')}
            >
              Home
            </button>
          </li>
          <li className="navbar-item">
            <button 
              className={`navbar-link ${currentPage === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </button>
          </li>
          <li className="navbar-item">
            <button 
              className={`navbar-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => setCurrentPage('about')}
            >
              About
            </button>
          </li>
        </ul>
        <div className="navbar-actions">
          <button className="btn-login">Login</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
