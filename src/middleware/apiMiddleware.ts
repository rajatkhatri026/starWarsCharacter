// apiMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance'; // Import the axios instance with interceptors
import { fetchCharacters } from '../redux/thunks/charactersThunks'; // Import the correct thunk

// API Middleware to handle API requests and errors using Axios interceptors
export const apiMiddleware: Middleware = (store) => (next) => (action: any) => {

  // If the action is related to an API call, use axiosInstance
  if (action.type === fetchCharacters.pending.type) {
    store.dispatch({
      type: 'characters/fetchStart',
    });

    axiosInstance
      .get(`/people/?page=${action.payload || 1}`) // Assume the payload is the page number
      .then((response) => {
        // Dispatch success action if API call is successful
        store.dispatch({
          type: 'characters/fetchSuccess',
          payload: response.data.results, // Assuming response contains a 'results' field
        });
      })
      .catch((error) => {
        // Dispatch error action if API call fails
        store.dispatch({
          type: 'characters/fetchError',
          payload: error.message || 'An error occurred while fetching characters.',
        });
      });
  }

  // Pass the action to the next middleware or reducer
  return next(action);
};
