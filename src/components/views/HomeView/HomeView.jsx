import React from 'react';
import {
    HomeContainer,
    Title,
    Subtitle,
    Description,
    ContentWrapper,
} from './HomeView.css.js';

// This component represents the Home page of Budget Buddy
const HomeView = () => {
    return (
        <HomeContainer>   
            {/* Wrapper for the content */}
            <ContentWrapper>
                {/* Main title */}
                <Title>Welcome to Budget Buddy!</Title>
                {/* Subtitle */}
                <Subtitle>Manage your finances effortlessly with Budget Buddy</Subtitle>
                {/* Description */}
                <Description>
                    Add your expenses, generate detailed reports, and gain insights into your spending habits. 
                    Take control of your budget and plan for a smarter financial future!
                </Description>
            </ContentWrapper>
        </HomeContainer>
    );
};

export default HomeView;
