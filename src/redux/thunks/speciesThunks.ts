import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSpecies = createAsyncThunk('species/fetch', async (url: string) => {
  const response = await axios.get(url);
  return response.data;
});
