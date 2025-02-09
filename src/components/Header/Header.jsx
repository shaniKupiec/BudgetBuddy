import React from "react";
import "./Header.css";

const Header = ({ views, currentView, handleViewChange }) => {
  return (
    <header className="header-container">
      {/* Map through the views object, creating a "link" to each view */}
      {Object.entries(views).map(([key, { label }]) => (
        <button
          className={`header-button ${currentView === key ? "active" : ""}`}
          key={key}
          // Change the view according to which button has been chosen
          onClick={() => handleViewChange(key)}
        >
          {label}
        </button>
      ))}
    </header>
  );
};

export default Header;
