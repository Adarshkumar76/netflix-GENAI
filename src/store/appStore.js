import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice";
import movieReducer from "../slices/movieSlice";
import configReducer from "../slices/configSlice";
import genAiReducer from "../slices/genAiSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    genai: genAiReducer,
    config: configReducer,
  },
});

export default appStore;
