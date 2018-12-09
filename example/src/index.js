import React from 'react'
import ReactDOM from 'react-dom'
import { ReduxContext } from 'react-use-dux';
import { configureStore } from './dux/store/storeCreator';

import 'todomvc-app-css/index.css';

import App from './App'

const store = configureStore();

ReactDOM.render((
    <ReduxContext.Provider value={store}>
        <App />
    </ReduxContext.Provider>
    ), document.getElementById('root'));
