
import React from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { store } from './store/store';
import Login from './components/Login';
import TaskManager from './components/TaskManager';

const AppContent = () => {
    const user = useSelector(state => state.auth.user);
    return user ? <TaskManager /> : <Login />;
};

const App = () => {
    return (
        <Provider store={store}>
            <AppContent />
        </Provider>
    );
};

export default App;