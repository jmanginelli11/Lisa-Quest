import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import scoresReducer from './redux/scoresReducer';
import { configureStore } from '@reduxjs/toolkit';

let middleware = [thunkMiddleware.withExtraArgument({ axios }), createLogger()];

const store = createStore(scoresReducer, applyMiddleware(...middleware));

export default store;
