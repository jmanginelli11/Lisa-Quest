import { configureStore } from '@reduxjs/toolkit';
import scoresReducer from './redux/scoresReducer';

const store = configureStore({
  reducer: {
    scoresReducer,
  },
});

export default store;
