import React, { useState } from 'react';
import Header from './components/Header/Header';
import { Container } from '@mui/material';
import HomeView from './components/views/HomeView/HomeView';
import DashboardView from './components/views/DashboardView/DashboardView';
import ItemFormView from './components/views/ItemFormView/ItemFormView';
import { AppContainer, ViewContainer } from './App.css';
import { demoItems } from './demoData';

const CATEGORIES = [
    "Food & Drink",
    "Groceries",
    "Shopping",
    "Transport",
    "General"
];

const DEFAULT_VIEW = 'home';

const App = () => {
    const [currentView, setCurrentView] = useState(DEFAULT_VIEW);
    const [items, setItems] = useState(demoItems);

    const saveItem = (newItem) => {
        console.log("add item", newItem)
        // setItems((prevItems) => [...prevItems, newItem]);
    };

    const VIEW_COMPONENTS = {
        home: {
            label: 'Home',
            component: HomeView,
            props: {},
        },
        itemForm: {
            label: 'Add New Item',
            component: ItemFormView,
            props: { categories: CATEGORIES, saveItem: saveItem },
        },
        dashboard: {
            label: 'Dashboard',
            component: DashboardView,
            props: { items: items },
        },
    };

    const CurrentViewComponent = VIEW_COMPONENTS[currentView]?.component || HomeView;
    const currentViewProps = VIEW_COMPONENTS[currentView]?.props || {};

    return (
        <AppContainer>
            <Header 
                views={VIEW_COMPONENTS}
                currentView={currentView}
                onViewChange={setCurrentView}
            />
            <Container style={{ marginTop: '20px' }}>
                <ViewContainer>
                    <CurrentViewComponent {...currentViewProps} />
                </ViewContainer>
            </Container>
        </AppContainer>
    );
};


export default App;
