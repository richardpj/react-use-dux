import React from 'react'
import ReactDOM from 'react-dom'
import { ReduxContextProvider } from 'react-use-dux';
import { createStore, /*combineReducers, applyMiddleware,*/ compose } from 'redux';

import 'todomvc-app-css/index.css';

import App from './App'
import todoReducer from './dux/reducers/todoReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

var store = createStore(todoReducer, composeEnhancers());


ReactDOM.render((
    <ReduxContextProvider value={store}>
        <App />
    </ReduxContextProvider>
    ), document.getElementById('root'));
