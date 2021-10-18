import { RootState } from "../../store/types";
import { createSelector } from "reselect";
import { GenresState } from "../../store/slices";

const getGenresState = (state: RootState): GenresState => state.genres;

export const selectGenresData = createSelector<
  RootState,
  GenresState,
  string[]
>(getGenresState, (genresState): string[] => genresState.genresData);

export const selectIsLoadingGenres = createSelector<
  RootState,
  GenresState,
  boolean
>(getGenresState, (genresState): boolean => genresState.loading);
