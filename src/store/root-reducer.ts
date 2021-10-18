import { combineReducers } from "@reduxjs/toolkit";
import {
  usersSlice,
  recommendationsSlice,
  popularSlice,
  contentModeSlice,
  booksSlice,
  targetSlice,
  genresSlice,
  createdRecommendationsSlice,
  filteredBooksSlice,
} from "./slices";

export default combineReducers({
  users: usersSlice.reducer,
  recommendations: recommendationsSlice.reducer,
  popular: popularSlice.reducer,
  contentMode: contentModeSlice.reducer,
  books: booksSlice.reducer,
  target: targetSlice.reducer,
  genres: genresSlice.reducer,
  createdRecommendationsSlice: createdRecommendationsSlice.reducer,
  filteredBooks: filteredBooksSlice.reducer,
});
