
import { createStore, /*combineReducers,*/ applyMiddleware, compose } from 'redux';
import todoReducer from '../reducers/todoReducer';
import { useReduxBatchUpdateMiddleware } from 'react-use-dux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const configureStore = () => createStore(todoReducer, composeEnhancers(applyMiddleware(useReduxBatchUpdateMiddleware)));
