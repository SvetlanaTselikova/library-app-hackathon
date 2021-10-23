import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GenresState = {
  genresData: string[];
  loading: boolean;
};

const initialState: GenresState = {
  genresData: [],
  loading: false,
};

export const genresSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    fetchGenresFailure: (
      state: GenresState,
      action: PayloadAction
    ): GenresState => ({
      ...state,
      loading: false,
    }),
    fetchGenresRequest: (
      state: GenresState,
      action: PayloadAction
    ): GenresState => ({
      ...state,
      loading: true,
    }),
    fetchGenresSuccess: (
      state: GenresState,
      action: PayloadAction<{ genres: string[] }>
    ): GenresState => ({
      ...state,
      loading: false,
      genresData: action.payload?.genres || [],
    }),
  },
});

export const { fetchGenresFailure, fetchGenresRequest, fetchGenresSuccess } =
  genresSlice.actions;