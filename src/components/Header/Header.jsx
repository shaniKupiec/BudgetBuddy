import React from 'react';
import { HeaderContainer, NavButton } from './Header.css';

const Header = ({ views, currentView, onViewChange }) => {
    return (
        <HeaderContainer>
            {Object.entries(views).map(([key, { label }]) => (
                <NavButton
                    key={key}
                    isactive={currentView === key}
                    onClick={() => onViewChange(key)}
                >
                    {label}
                </NavButton>
            ))}
        </HeaderContainer>
    );
};

export default Header;
