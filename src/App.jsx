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
import { AppContainer, ViewContainer } from "./App.css";
import { demoData } from "./data/demo_data";
import { IDB } from "./utils/idb";

const CATEGORIES = ["Food & Drink", "Groceries", "Shopping", "Transport", "General"];
const DEFAULT_VIEW = "home";

const App = () => {
  const [currentView, setCurrentView] = useState(DEFAULT_VIEW);
  const [db, setDb] = useState(null);
  const [items, setItems] = useState([]);
  const [currItem, setCurrItem] = useState({});
  const [modalMsg, setModalMsg] = useState(null);

  // Initialize the database
  useEffect(() => {
    const initDB = async () => {
      try {
        const database = new IDB("myDatabase", "myStore");
        await database.initDB();
        setDb(database);
      } catch (error) {
        setModalMsg("Error initializing database.");
      }
    };

    initDB();

    return () => {
      if (db) db.closeDB();
    };
  }, []);

  // Load data from the database
  useEffect(() => {
    let isMounted = true;

    if (db === null) return;

    const loadData = async () => {
      try {
        const allItems = await db.getAllItems();
        if (allItems.length === 0) {
          await db.loadDemoData(demoData);
          if (isMounted) setItems(await db.getAllItems());
        } else {
          if (isMounted) setItems(allItems);
        }
      } catch (error) {
        setModalMsg("Error loading data.");
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [db]);

  // Save or update an item
  const saveItem = async (item) => {
    if (!db) return;

    try {
      if (item.id) {
        await db.editItem(item);
      } else {
        const newId = await db.addItem(item);
        item.id = newId;
      }
      setItems(await db.getAllItems());
      setCurrItem({});
      setCurrentView("dashboard");
    } catch (error) {
      setModalMsg("Error saving item.");
    }
  };

  // Views configuration
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

  const CurrentViewComponent = VIEW_COMPONENTS[currentView]?.component || HomeView;
  const currentViewProps = VIEW_COMPONENTS[currentView]?.props || {};

  return (
    <AppContainer>
      <Header views={VIEW_COMPONENTS} currentView={currentView} onViewChange={setCurrentView} />
      <Container style={{ marginTop: "20px" }}>
        <ViewContainer>
          <CurrentViewComponent {...currentViewProps} />
        </ViewContainer>
      </Container>

      {/* modal that will show the user massage */}
      <Dialog open={Boolean(modalMsg)} onClose={() => setModalMsg(null)}>
        <DialogTitle>Massage</DialogTitle>
        <DialogContent>
          <p>{modalMsg}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalMsg(null)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
      
    </AppContainer>
  );
};

export default App;
