import React from 'react';
import './HomeView.css'; // Import the CSS file

//Budget Buddy home page
const HomeView = () => {
    return (
        <div className="home-container">   
            {/* Wrapper for the content */}
            <div className="content-wrapper">
                {/* Main title */}
                <h1 className="title">Welcome to Budget Buddy!</h1>
                {/* Subtitle */}
                <h2 className="subtitle">Manage your finances effortlessly with Budget Buddy</h2>
                {/* Description */}
                <p className="description">
                    Add your expenses, generate detailed reports, and gain insights into your spending habits. 
                    Take control of your budget and plan for a smarter financial future!
                </p>
            </div>
        </div>
    );
};

export default HomeView;
