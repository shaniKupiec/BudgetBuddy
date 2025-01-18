import React from 'react';
import { Button } from '@mui/material';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import './ItemFormView.css.js';



const ItemFormView = ({ categories, addItem }) => {

    return (
        <div>
            <h2>Item Form</h2>
            <div>
            <div> name: <input type='text'/> </div>
            <div> cost: <input type='text'/> </div>
            <Dropdown>
                <MenuButton>Categories</MenuButton>
                <Menu slots={{ listbox: 'div' }}>
                    {categories.map((category, index) => (
                        <MenuItem key={index}>{category}</MenuItem>
                    ))}
                </Menu>
            </Dropdown>
            </div>
            <div> description: <input type='text'/> </div>
            <Button variant="contained" color="primary" onClick={addItem}>
                Add Item
            </Button>
        </div>
    );
};

export default ItemFormView;
