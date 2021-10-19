import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RecommendationsCreator } from "../../components/recommendations-creator";
import { fetchFilteredBooksRequest } from "../../store/slices";
import { BookType } from "../../types/common";
import {
  selectFilteredBooksData,
  selectGenresData,
  selectIsFilteredBooksLoading,
  selectIsLoadingGenres,
} from "./selector";

export const RecommendationsCreatorContainer = () => {
  const genresData = useSelector(selectGenresData);
  const isLoadingGenres = useSelector(selectIsLoadingGenres);
  const isLoadingFilteredBooks = useSelector(selectIsFilteredBooksLoading);
  const filteredBooksData = useSelector(selectFilteredBooksData);
  const dispatch = useDispatch();

  return (
    <RecommendationsCreator
      genresData={genresData}
      isLoadingGenres={isLoadingGenres}
      isLoadingFilteredBooks={isLoadingFilteredBooks}
      filteredBooksData={filteredBooksData}
      fetchFilteredBooks={(type: BookType, genres: string[]) =>
        dispatch(fetchFilteredBooksRequest({ type, genres }))
      }
    />
  );
};
