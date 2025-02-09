import React, { useState } from 'react';
import { Button } from '@mui/material';
import './ItemFormView.css'; // Import the CSS file

const ItemFormView = ({ categories = [], saveItem = () => {}, setModalMsg = () => {} }) => {
    // State hooks to manage form input values
    const [itemName, setItemName] = useState(''); // State for item name
    const [itemCost, setItemCost] = useState(''); // State for item cost
    const [itemDescription, setItemDescription] = useState(''); // State for item description
    const [itemDate, setItemDate] = useState(''); // State for item date
    const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category

    // Handle form submission
    const handleSubmit = () => {
        // Validation: Ensure all fields are filled
        if (itemName === '' || itemCost === '' || itemDescription === '' || itemDate === '' || selectedCategory === '') {
            setModalMsg('Please fill out all fields.'); // Show error message
            return;
        }

        // Save the item
        saveItem({
            cost: parseFloat(itemCost), // Ensure cost is saved as a number
            name: itemName,
            category: selectedCategory,
            description: itemDescription,
            time: new Date(itemDate).getTime(),
        });

        // Reset form fields
        setItemName('');
        setItemCost('');
        setItemDescription('');
        setItemDate('');
        setSelectedCategory('');
        setModalMsg('Item added successfully!'); // Show success message
    };

    return (
        <div className="item-form-container">
            <h2>Item Form</h2>
            {/* Form inputs */}
            <div className="item-form-inputs">
                {/* Input for item name */}
                <div className="input-row">
                    <label htmlFor="name" className="label">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="input"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)} // Update item name state
                        placeholder="Enter item name"
                    />
                </div>
                {/* Input for item cost */}
                <div className="input-row">
                    <label htmlFor="cost" className="label">Cost:</label>
                    <input
                        type="number" // Number input for cost
                        id="cost"
                        className="input"
                        value={itemCost}
                        onChange={(e) => {
                            const value = e.target.value;
                            // Allow empty input to enable delete
                            if (value === '') {
                                setItemCost('');
                                return;
                            }
                            // Allow only non-negative numbers
                            if (!isNaN(value) && parseFloat(value) >= 0) {
                                setItemCost(value);
                            } else {
                                setModalMsg('Cost must be a positive number.');
                            }
                        }}
                        placeholder="Enter item cost"
                    />
                </div>
                {/* Input for item description */}
                <div className="input-row">
                    <label htmlFor="description" className="label">Description:</label>
                    <input
                        type="text"
                        id="description"
                        className="input"
                        value={itemDescription}
                        onChange={(e) => setItemDescription(e.target.value)} // Update description state
                        placeholder="Enter item description"
                    />
                </div>
                {/* Input for item date */}
                <div className="input-row">
                    <label htmlFor="date" className="label">Date:</label>
                    <input
                        type="date" // Date input for selecting a date
                        id="date"
                        className="input"
                        value={itemDate}
                        onChange={(e) => setItemDate(e.target.value)} // Update date state
                    />
                </div>
            </div>
            {/* Dropdown for category selection */}
            <div className="dropdown-container">
                <label htmlFor="category" className="label">Category:</label>
                <select
                    id="category"
                    className="dropdown"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
                >
                    <option value="">Select a category</option>
                    {/* Render categories dynamically */}
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            {/* Submit button */}
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '16px' }}
            >
                Add Item
            </Button>
        </div>
    );
};

export default ItemFormView;
