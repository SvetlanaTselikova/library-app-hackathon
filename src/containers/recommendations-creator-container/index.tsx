import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { RecommendationsCreator } from "../../components/recommendations-creator";
import { selectGenresData, selectIsLoadingGenres } from "./selector";

export const RecommendationsCreatorContainer = () => {
  const genresData = useSelector(selectGenresData);
  const isLoadingGenres = useSelector(selectIsLoadingGenres);
  return (
    <RecommendationsCreator
      genresData={genresData}
      isLoadingGenres={isLoadingGenres}
    />
  );
};
