import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import scoresReducer from './redux/scoresReducer';

let middleware = [thunkMiddleware.withExtraArgument({ axios })];

const store = createStore(scoresReducer, applyMiddleware(...middleware));

export default store;
