import React from 'react';
import { HeaderContainer, NavButton } from './Header.css';

const Header = ({ views, currentView, onViewChange }) => {
    return (
        <HeaderContainer>
            {/* Map through the views object, creating a NavButton for each entry */}
            {Object.entries(views).map(([key, { label }]) => (
                <NavButton
                    key={key}
                    isactive={currentView === key} // Highlight the active view
                    onClick={() => onViewChange(key)} 
                >
                    {label}
                </NavButton>
            ))}
        </HeaderContainer>
    );
};

export default Header;
