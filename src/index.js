import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from "./store/store"
import App from './App';

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render the application
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
