import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import './config/reactotronConfig';

import GlobalStyles from './styles/global';
import Routes from './routes';

import { store, persistor } from './store';
import history from './services/history';

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Routes />
                    <GlobalStyles />
                </Router>
            </PersistGate>
        </Provider>
    );
}

export default App;
