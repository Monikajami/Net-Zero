import React from 'react';
import './Header.css'; // Importing the specific CSS for this page
import { IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Importing Profile icon

const Header = () => {
  const handleLogout = () => {
    // Clear the token from localStorage to log the user out
    localStorage.removeItem('token');
    console.log('User logged out');

    // Redirect to the login page
    window.location.href = '/login';
  };

  const handleNotificationsClick = () => {
    // Redirect to the notifications page
    window.location.href = '/notification';
  };

  const handleProfileClick = () => {
    // Redirect to the profile page
    window.location.href = '/profile';
  };

  return (
    <header className="carbon-header">
      <div className="logo">
        <h1>Carbon Trading Hub</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="/home">Home</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
          
          {/* Notification Icon Button */}
          <li>
            <IconButton color="inherit" onClick={handleNotificationsClick}>
              <NotificationsIcon />
            </IconButton>
          </li>

          {/* Profile Icon Button */}
          <li>
            <IconButton color="inherit" onClick={handleProfileClick}>
              <AccountCircleIcon />
            </IconButton>
          </li>
          
          
          <li>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
