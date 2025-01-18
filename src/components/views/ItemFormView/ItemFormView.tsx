import React from 'react';
import { Button } from '@mui/material';

const ItemFormView = ({ item, categories, saveItem }) => {

    return (
        <div>
            <h2>Item Form</h2>
            <Button variant="contained" color="primary" onClick={saveItem}>
                Add Item
            </Button>
        </div>
    );
};

export default ItemFormView;
