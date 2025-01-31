import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import HomeView from "./components/views/HomeView/HomeView";
import DashboardView from "./components/views/DashboardView/DashboardView";
import ItemFormView from "./components/views/ItemFormView/ItemFormView";
import "./App.css";
import { demoData } from "./data/demo_data";
import { idb } from "./utils/mock_idb";

// Categories for the items
const CATEGORIES = ["Food & Drink", "Groceries", "Shopping", "Transport", "General"];
// Default view when the app starts
const DEFAULT_VIEW = "home";

const App = () => {
  // State hooks for managing different app states
  const [currentView, setCurrentView] = useState(DEFAULT_VIEW); // Tracks the current view of the app
  const [db, setDb] = useState(null); // Database state
  const [items, setItems] = useState([]); // State to hold items data
  const [currItem, setCurrItem] = useState({}); // State to hold the current item being edited or added
  const [modalMsg, setModalMsg] = useState(null); // State to handle modal messages

  // Initialize the IndexedDB when the component mounts
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await idb.openCostsDB("costsdb", 1) // Open the database
        setDb(database); // Set the db state once it's open
      } catch (error) {
        setModalMsg("Error initializing database."); // Show an error message if DB initialization fails
      }
    };

    initDB();

    return () => {
      if (db) db.closeDB(); // Close DB when the component unmounts
    };
  }, []); // Runs only once on mount

  // Load data from the database once it's initialized
  useEffect(() => {
    let isMounted = true; // To avoid setting state after component unmount

    if (db === null) return; // Exit if DB is not initialized yet

    const loadData = async () => {
      try {
        const allItems = await db.getAllItems(); // Fetch all items from the DB
        if (allItems.length === 0) {
          await db.loadDemoData(demoData); // Load demo data if DB is empty
          if (isMounted) setItems(await db.getAllItems()); // Set items state with demo data
        } else {
          if (isMounted) setItems(allItems); // Set items state if DB has data
        }
      } catch (error) {
        setModalMsg("Error loading data."); // Show error message if fetching data fails
      }
    };

    loadData();

    return () => {
      isMounted = false; // Clean up on unmount
    };
  }, [db]); // Runs when db state changes

  // Save or update an item in the database
  const saveItem = async (item) => {
    if (!db) return; // Return if DB is not available

    try {
      if (item.id) {
        await db.editItem(item); // Edit the item if it has an ID
      } else {
        await db.addCost(item); // Add a new item if no ID
      }
      setItems(await db.getAllItems()); // Reload all items from DB
      setCurrItem({}); // Reset the current item
      setCurrentView("dashboard"); // Switch to the dashboard view
    } catch (error) {
      setModalMsg("Error saving item."); // Show error message if saving fails
    }
  };

  // Views configuration mapping the views to components and props
  const VIEW_COMPONENTS = {
    home: {
      label: "Home",
      component: HomeView,
      props: {},
    },
    itemForm: {
      label: "Add New Item",
      component: ItemFormView,
      props: { item: currItem, categories: CATEGORIES, saveItem, setModalMsg },
    },
    dashboard: {
      label: "Dashboard",
      component: DashboardView,
      props: { items: items },
    },
  };

  // Determine which view to display based on the current view state
  const CurrentViewComponent = VIEW_COMPONENTS[currentView]?.component || HomeView;
  const currentViewProps = VIEW_COMPONENTS[currentView]?.props || {};

  return (
    <div className="app-container">
      <Header views={VIEW_COMPONENTS} currentView={currentView} onViewChange={setCurrentView} />
      <Container style={{ marginTop: "20px" }}>
        <div className="view-container">
          <CurrentViewComponent {...currentViewProps} />
        </div>
      </Container>

      {/* Modal to show dynamic messages */}
      <Dialog open={Boolean(modalMsg)} onClose={() => setModalMsg(null)}>
        <DialogTitle>Message</DialogTitle>
        <DialogContent>
          <p>{modalMsg}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalMsg(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default App;
