import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk';
import scoresReducer from './redux/scoresReducer';

let middleware;
if (process.env.NODE_ENV === 'production') {
  middleware = [thunkMiddleware.withExtraArgument({ axios })];
} else {
  middleware = [thunkMiddleware.withExtraArgument({ axios }), createLogger()];
}

const store = createStore(scoresReducer, applyMiddleware(...middleware));

export default store;
