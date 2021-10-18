import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RecommendationsCreator } from "../../components/recommendations-creator";
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
  return (
    <RecommendationsCreator
      genresData={genresData}
      isLoadingGenres={isLoadingGenres}
    />
  );
};
