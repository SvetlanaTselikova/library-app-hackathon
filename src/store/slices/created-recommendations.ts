import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/common";

export type CreatedRecommendationsState = {
  createdRecommendationsData: IBook[];
  loading: boolean;
};

const initialState: CreatedRecommendationsState = {
  createdRecommendationsData: [],
  loading: false,
};

export const createdRecommendationsSlice = createSlice({
  name: "createdRecommendations",
  initialState,
  reducers: {
    fetchCreatedRecommendationsFailure: (
      state: CreatedRecommendationsState,
      action: PayloadAction
    ): CreatedRecommendationsState => ({
      ...state,
      loading: false,
    }),
    fetchCreatedRecommendationsRequest: (
      state: CreatedRecommendationsState,
      action: PayloadAction<number[]>
    ): CreatedRecommendationsState => ({
      ...state,
      createdRecommendationsData: [],
      loading: true,
    }),
    fetchCreatedRecommendationsSuccess: (
      state: CreatedRecommendationsState,
      action: PayloadAction<{ books: IBook[] }>
    ): CreatedRecommendationsState => ({
      ...state,
      loading: false,
      createdRecommendationsData: action.payload.books,
    }),
  },
});

export const {
  fetchCreatedRecommendationsFailure,
  fetchCreatedRecommendationsRequest,
  fetchCreatedRecommendationsSuccess,
} = createdRecommendationsSlice.actions;
