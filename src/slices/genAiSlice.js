import { createSlice } from "@reduxjs/toolkit";

const GenAISlice = createSlice({
  name: "genAI",
  initialState: {
    showGenAISearch: false,
    GenAIMoviesResult: null,
    GenAIMoviesName: null,
  },
  reducers: {
    toggleGenAISearch: (state, action) => {
      state.showGenAISearch = !state.showGenAISearch;
    },
    addGenAIMoviesResult: (state, action) => {
      const { moviesName, moviesResult } = action.payload;
      state.GenAIMoviesResult = moviesResult;
      state.GenAIMoviesName = moviesName;
    },
  },
});

export default GenAISlice.reducer;
export const { toggleGenAISearch, addGenAIMoviesResult } = GenAISlice.actions;
