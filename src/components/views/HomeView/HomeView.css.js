import styled from 'styled-components';

// Main container for the Home Page
export const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 60px); // Full height of the screen minus the header
    background: url(https://www.freshbooks.com/wp-content/uploads/2022/02/cost-accounting.jpg) no-repeat center center;
    background-size: cover; // Adjusting the image to fit screen size
    padding: 20px;
    color: rgba(16, 16, 16, 1); 
`;

// Wrapper for the content
export const ContentWrapper = styled.div`
    text-align: center;
    background: rgba(255, 255, 255, 0.653); // Semi-transparent background
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // shadow
    max-width: 600px;
    width: 100%;
`;

// Title styling
export const Title = styled.h1`
    font-size: 36px;
    margin-bottom: 16px;
    color: #333; 
`;

// Subtitle styling
export const Subtitle = styled.h2`
    font-size: 22px;
    margin-bottom: 12px;
    color: #333; 
    font-weight: bold; 
`;

// Description styling
export const Description = styled.p`
    font-size: 19px;
    line-height: 1.6;
    color: #333;
`;
