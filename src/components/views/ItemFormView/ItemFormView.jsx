import React, { useState } from 'react';
import { Button } from '@mui/material';
import {
    ItemFormContainer,
    ItemFormInputs,
    InputRow,
    Input,
    Label,
    DropdownContainer,
    Dropdown,
    SelectedCategories,
} from './ItemFormView.css.js';

const ItemFormView = ({ categories = [], saveItem = () => {} }) => {
    const [itemName, setItemName] = useState(''); // State for item name
    const [itemCost, setItemCost] = useState(''); // State for item cost
    const [itemDescription, setItemDescription] = useState(''); // State for item description
    const [itemDate, setItemDate] = useState(''); // State for item date
    const [selectedCategory, setSelectedCategory] = useState(''); // State for a single selected category

    const handleSubmit = () => {
        if (!itemName || !itemCost || !itemDescription || !itemDate || !selectedCategory) {
            alert('Please fill out all fields'); // Alert for missing fields
            return;
        }

        saveItem({
            name: itemName,
            cost: itemCost,
            description: itemDescription,
            date: itemDate,
            category: selectedCategory, // Save the single selected category
        });

        // Reset the form fields
        setItemName('');
        setItemCost('');
        setItemDescription('');
        setItemDate('');
        setSelectedCategory('');
        alert('Item added successfully!');
    };

    return (
        <ItemFormContainer>
            <h2>Item Form</h2>
            <ItemFormInputs>
                {/* Input for item name */}
                <InputRow>
                    <Label htmlFor="name">Name:</Label>
                    <Input
                        type="text"
                        id="name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Enter item name"
                    />
                </InputRow>
                {/* Input for item cost */}
                <InputRow>
                    <Label htmlFor="cost">Cost:</Label>
                    <Input
                        type="text"
                        id="cost"
                        value={itemCost}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(value) && Number(value) > 0) {
                                setItemCost(value); // Only allow positive numbers
                            }
                        }}
                        placeholder="Enter item cost"
                    />
                </InputRow>
                {/* Input for item description */}
                <InputRow>
                    <Label htmlFor="description">Description:</Label>
                    <Input
                        type="text"
                        id="description"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)}
                        placeholder="Enter item description"
                    />
                </InputRow>
                {/* Input for item date */}
                <InputRow>
                    <Label htmlFor="date">Date:</Label>
                    <Input
                        type="date"
                        id="date"
                        value={itemDate}
                        onChange={(e) => setItemDate(e.target.value)}
                    />
                </InputRow>
            </ItemFormInputs>
            {/* Dropdown for single category selection */}
            <DropdownContainer>
                <Label htmlFor="category">Category:</Label>
                <Dropdown
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </Dropdown>
                {selectedCategory && (
                    <SelectedCategories>
                        Selected Category: {selectedCategory}
                    </SelectedCategories>
                )}
            </DropdownContainer>
            {/* Submit button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
                Add Item
            </Button>
        </ItemFormContainer>
    );
};

export default ItemFormView;
