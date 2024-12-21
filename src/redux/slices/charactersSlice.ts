// charactersSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCharacters } from '../thunks/charactersThunks'; // Import the correct thunk
import { Character, CharactersState } from '../types/charactersTypes'; // Ensure this type is correct

interface FetchCharactersResponse {
  results: Character[]; // The "results" field in the API response
  next: string | null;
}

const initialState: CharactersState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  hasMore: false,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    fetchStart: (state) => {
      state.loading = true; // Set loading to true
    },
    fetchSuccess: (state, action: PayloadAction<FetchCharactersResponse>) => {
      state.loading = false; // Set loading to false
      state.data = [...state.data, ...action.payload?.results]; // Update data with fetched characters
      state.hasMore = action.payload.next !== null;
    },
    fetchError: (state, action: PayloadAction<string>) => {
      state.loading = false; // Set loading to false
      state.error = action.payload; // Set the error message
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true; // Set loading to true on pending
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false on success
        state.data = [...state.data, ...action.payload?.results]; // Store the fetched characters
        state.hasMore = action.payload.next !== null;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message || 'An error occurred while fetching characters.';
      });
  },
});

export const { setPage, fetchStart, fetchSuccess, fetchError } = charactersSlice.actions;
export default charactersSlice.reducer;
