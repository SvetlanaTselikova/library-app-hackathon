import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { BooksBlock } from "../../components/books-block";

import { RecommendationsCreator } from "../../components/recommendations-creator";
import {
  fetchCreatedRecommendationsRequest,
  fetchFilteredBooksRequest,
} from "../../store/slices";
import { BookType } from "../../types/common";
import {
  selectCreatedRecommendations,
  selectFilteredBooksData,
  selectGenresData,
  selectIsCreatedRecommendationsLoading,
  selectIsFilteredBooksLoading,
  selectIsLoadingGenres,
} from "./selector";

export const RecommendationsCreatorContainer = () => {
  const genresData = useSelector(selectGenresData);
  const isLoadingGenres = useSelector(selectIsLoadingGenres);
  const isLoadingFilteredBooks = useSelector(selectIsFilteredBooksLoading);
  const filteredBooksData = useSelector(selectFilteredBooksData);
  const isCreatingRecommendations = useSelector(
    selectIsCreatedRecommendationsLoading
  );
  const createdRecommendationsData = useSelector(selectCreatedRecommendations);
  const dispatch = useDispatch();

  return createdRecommendationsData.length ? (
    <BooksBlock
      books={createdRecommendationsData}
      title="Ваши персональные рекомендации"
    />
  ) : (
    <RecommendationsCreator
      genresData={genresData}
      isLoadingGenres={isLoadingGenres}
      isLoadingFilteredBooks={isLoadingFilteredBooks}
      filteredBooksData={filteredBooksData}
      fetchFilteredBooks={(type: BookType, genres: string[]) =>
        dispatch(fetchFilteredBooksRequest({ type, genres }))
      }
      isCreatingRecommendations={isCreatingRecommendations}
      fetchCreatedRecommendations={(ids) =>
        dispatch(fetchCreatedRecommendationsRequest(ids))
      }
    />
  );
};
