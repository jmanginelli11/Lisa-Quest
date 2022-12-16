import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import scoresReducer from './redux/scoresReducer';

let middleware = [thunkMiddleware.withExtraArgument({ axios })];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(scoresReducer, applyMiddleware(...middleware));

export default store;
