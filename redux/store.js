import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { authSlice } from './auth/reducer';

const rootReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //     },
  //   }),
});
