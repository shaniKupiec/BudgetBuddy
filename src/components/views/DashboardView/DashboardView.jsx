import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import "./DashboardView.css";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pastelColors = ["#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFB3", "#BAE1FF", "#FFBAFF", "#FF9B9B", "#D9D9D9", "#FFE6CC"];

const BudgetTable = ({ items, deleteItem, handleEditItem }) => {
  // In case there are no items in that month / year
  if (items.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No items found for this period.
      </Typography>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        {/* Create the table head */}
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Cost</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Iterate for each item a table row with it's data */}
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.cost}₪</TableCell>
              <TableCell>{item.description}</TableCell>
              {/* Format the time from ms -> dd/mm/yyyy */}
              <TableCell>{new Date(item.time).toLocaleDateString("en-GB")}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => handleEditItem(item)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => deleteItem(item.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BudgetPieChart = ({ items }) => {
  // In case there are no items in that month / year
  if (items.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No data available for this period.
      </Typography>
    );
  }

  // Calc the total cost for each category according to the items
  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.cost;
    return acc;
  }, {});

  // Build data object according to the mui pie chart syntax
  const data = Object.keys(categoryTotals).map((category, index) => ({
    id: index,
    label: `${category}: ${categoryTotals[category]}₪`,
    value: categoryTotals[category],
    color: pastelColors[index % pastelColors.length], // Cycle through pastel colors
  }));

  return <PieChart series={[{ data }]} width={700} height={400} />;
};

const DashboardView = ({ items, deleteItem, handleEditItem }) => {
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

  // Extract unique years from items, keeping only those with entries, and sort them in descending order.
  const years = [...new Set(items.map((item) => new Date(item.time).getFullYear()))].sort((a, b) => b - a); 

  // Set the selected month in the useState
  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };
  
  // Set the selected year in the useState
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  // Filter the items according to the selected year and month
  const filteredItems = items.filter((item) => {
    const itemDate = new Date(item.time);
    return (month === "all" || itemDate.getMonth() + 1 === parseInt(month)) && (year === "all" || itemDate.getFullYear() === parseInt(year));
  });

  return (
    <Container className="dashboard-container">
      {/* Form to chose month and year to filter by */}
      <div className="form-container">
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange}>
            {/* Add the option to not filter by month */}
            <MenuItem value="all">All</MenuItem>
            {/* Iterate through the month of the year */}
            {monthNames.map((name, index) => (
              <MenuItem key={index} value={index + 1}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={handleYearChange}>
            {/* Add the option to not filter by year */}
            <MenuItem value="all">All</MenuItem>
            {/* Iterate through the relevant years */}
            {years.map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="table-container">
        <BudgetTable items={filteredItems} deleteItem={deleteItem} handleEditItem={handleEditItem} />
      </div>
      <div className="pie-container">
        <BudgetPieChart items={filteredItems} />
      </div>
    </Container>
  );
};

export default DashboardView;
