import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './slices/charactersSlice';
import speciesReducer from './slices/speciesSlice';
// import { apiMiddleware } from '../middleware/apiMiddleware'; // Import your custom API middleware

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    species: speciesReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiMiddleware), // Add the API middleware to the default middleware stack
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
