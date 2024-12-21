import { createSlice } from '@reduxjs/toolkit';
import { fetchSpecies } from '../thunks/speciesThunks';
import { SpeciesState } from '../types/speciesTypes';

const initialState: SpeciesState = {
  data: null,
  loading: false,
  error: null,
};

const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpecies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSpecies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred while fetching species data';
      });
  },
});

export default speciesSlice.reducer;
