import styled from 'styled-components';

export const ItemFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    gap: 24px; // Uniform spacing between all elements
    background: #f9f9f9; 
    border-radius: 10px; // Rounded corners 
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); // Shadow effect
    width: 95%; 
    margin: 0 auto; // Center alignment
`;

export const ItemFormInputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px; // Spacing between input fields
    width: 97%; // Field width
`;

export const InputRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px; // Spacing between label and field
    width: 100%;
`;

export const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    width: 100%;
    text-align: left; 
    background-color: #fff;

    &:focus {
        outline: none;
        border-color: #007bff; // Blue border on focus 
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.4); // Focus shadow
    }
`;

export const Label = styled.label`
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 4px;
    text-align: left; 
    color: #333; 
`;

export const DropdownContainer = styled.div`
    width: 99.5%;
    text-align: left; 
    gap: 8px; // Spacing between label and dropdown
    display: flex;
    flex-direction: column;
`;

export const Dropdown = styled.select`
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    background-color: #fff;
    cursor: pointer;
    text-align: left;
    direction: ltr; // Left-to-right text direction

    &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.4);
    }
`;

export const SelectedCategories = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: #555; // Darker gray for selected categories
    text-align: left;
`;
