import React from 'react';
import { Button } from '@mui/material';

const ItemFormView = ({ categories, addItem }) => {
    return (
        <div>
            <h2>Item Form</h2>
            <div>
                <div>Categories:</div>
                <ul>
                    {categories.map((category, index) => (
                        <li key={category + index}>{category}</li>
                    ))}
                </ul>
            </div>
            <Button variant="contained" color="primary" onClick={addItem}>
                Add Item
            </Button>
        </div>
    );
};

export default ItemFormView;
