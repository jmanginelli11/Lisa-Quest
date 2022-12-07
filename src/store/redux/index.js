import { configureStore } from '@reduxjs/toolkit';

import scoresReducer from './scoresReducer';

const store = configureStore({
  scoresReducer,
});
