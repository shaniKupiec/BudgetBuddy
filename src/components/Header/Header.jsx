import React from 'react';
import './Header.css';

const Header = ({ views, currentView, onViewChange }) => {
    return (
        <header className="header-container">
            {/* Map through the views object, creating a "link" to each view */}
            {Object.entries(views).map(([key, { label }]) => (
                <button className={`header-button ${currentView === key ? 'active' : ''}`}
                    key={key}
                    // when clicking on the name of the view, the view will change
                    onClick={() => onViewChange(key)} 
                >
                    {label}
                </button>
            ))}
        </header>
    );
};

export default Header;
