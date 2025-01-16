import styled from 'styled-components';

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-around;
    padding: 10px;
    background: #f5f5f5;
    width: 100%;
`;

export const NavButton = styled.button`
    background: none;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    color: ${({ isactive }) => (isactive ? '#1976d2' : '#000')};
    font-weight: ${({ isactive }) => (isactive ? 'bold' : 'normal')};
    border-bottom: ${({ isactive }) => (isactive ? '2px solid #1976d2' : 'none')};

    &:hover {
        color: #1976d2;
    }
`;