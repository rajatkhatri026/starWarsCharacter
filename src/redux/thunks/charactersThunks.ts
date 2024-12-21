// charactersThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../middleware/axiosInstance'; // Import axiosInstance with interceptors

export const fetchCharacters = createAsyncThunk(
  'characters/fetch',
  async (page: number) => {
    try {
      const response = await axiosInstance.get(`/people/?page=${page}`);
      return response.data; // The API response (including "results")
    } catch (error) {
      // Handle errors or dispatch actions here if necessary
      throw error;
    }
  }
);
