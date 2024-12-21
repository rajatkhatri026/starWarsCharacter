import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Using useTheme to access theme
  const { isAuthenticated, logout } = useAuth();

  return (
    <>
        <header className={`header`}>
            <h1>Star Wars Universe</h1>
            <button
                className="header-button theme-button"
                aria-label={`Toggle to ${isDarkMode ? 'light' : 'dark'} mode`}
                onClick={toggleTheme}
            >
                {isDarkMode ? '☀️' : '🌙'}
            </button>
            {isAuthenticated && (
                <button aria-label='logout' className='header-button' onClick={logout}>
                    Logout
                </button>
            )}
        </header>
        <hr className='my-0'></hr>
    </>
  );
};

export default Header;
