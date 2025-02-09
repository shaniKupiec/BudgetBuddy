import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import "./DashboardView.css";

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const BudgetTable = ({ items }) => {
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
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>${item.cost}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{new Date(item.time).toLocaleDateString("en-GB")}</TableCell>
              <TableCell>
                <Button color="primary">Edit</Button>
                <Button color="secondary">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BudgetPieChart = ({ items }) => {
  if (items.length === 0) {
    return (
      <Typography variant="h6" align="center">
        No data available for this period.
      </Typography>
    );
  }

  const pastelColors = [
    '#FFB3BA', '#FFDFBA', '#FFFFBA', '#BAFFB3', '#BAE1FF', 
    '#FFBAFF', '#FF9B9B', '#D9D9D9', '#FFE6CC'
  ];
  
  const categoryTotals = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.cost;
    return acc;
  }, {});
  
  const data = Object.keys(categoryTotals).map((category, index) => ({
    id: index,
    label: category,
    value: categoryTotals[category],
    color: pastelColors[index % pastelColors.length], // Cycle through pastel colors
  }));

  return <PieChart series={[{ data }]} width={700} height={400} />;
};

const DashboardView = ({ items }) => {
  const [month, setMonth] = useState("all");
  const [year, setYear] = useState("all");

  const years = [...new Set(items.map((item) => new Date(item.time).getFullYear()))]
  .sort((a, b) => b - a); // Sort in descending order

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const filteredItems = items.filter((item) => {
    const itemDate = new Date(item.time);
    return (month === "all" || itemDate.getMonth() + 1 === parseInt(month)) && (year === "all" || itemDate.getFullYear() === parseInt(year));
  });

  console.log('items',items)

  return (
    <Container className="dashboard-container">
      <div className="form-container">
        <FormControl>
          <InputLabel>Month</InputLabel>
          <Select value={month} onChange={handleMonthChange}>
            <MenuItem value="all">All</MenuItem>
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
            <MenuItem value="all">All</MenuItem>
            {years.map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="table-container">
        <BudgetTable items={filteredItems} />
      </div>
      <div className="pie-container">
        <BudgetPieChart items={filteredItems} />
      </div>
    </Container>
  );
};

export default DashboardView;
