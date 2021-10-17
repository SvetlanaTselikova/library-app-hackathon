import { filter, map, switchMap, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchRecommendationsFailure,
  fetchRecommendationsRequest,
  fetchRecommendationsSuccess,
} from "../slices/recommendations";
import { RootEpic } from "../types";
import { ContentMode, IBook } from "../../types/common";
import { fetchPopularRequest, setContentMode } from "../slices";
import { NO_HISTORY } from "../../constants";

function prepareRecommendationsMock(userId: number) {
  const recommendations: IBook[] = [];
  const history: IBook[] = [];
  [...Array(10).keys()].forEach((item, inx) => {
    const bookObj = {
      id: inx,
      author: `${inx} author`,
      year: 123,
      annotation: `${inx} annotation`,
      age_resctriction: 16,
      volume: 123,
      rubric: "rubric",
      keyword: "keyword",
    };
    const recommendedBook = {
      ...bookObj,
      title: `${inx} rec book for ${userId}`,
    };
    const historyBook = {
      ...bookObj,
      title: `${inx} history book for ${userId}`,
    };
    recommendations.push(recommendedBook);
    history.push(historyBook);
  });
  return {
    history,
    recommendations,
  };
}

export const loadRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchRecommendationsRequest.match),
    switchMap((action) => {
      if (action.payload === NO_HISTORY) {
        return of(setContentMode(ContentMode.populdar));
      }
      const response = prepareRecommendationsMock(action.payload as number);
      return of(response).pipe(
        // TODO: remove mock !!!
        switchMap((value) => {
          if (value.recommendations.length) {
            return of(
              setContentMode(ContentMode.recommendations),
              fetchRecommendationsSuccess(value)
            );
          } else {
            return of(setContentMode(ContentMode.populdar));
          }
        }),
        catchError(() => of(fetchRecommendationsFailure()))
      );
    })
  );
};

export const finishLoadRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchPopularRequest.match),
    map(() => fetchRecommendationsSuccess({ history: [], recommendations: [] }))
  );
};
