import { filter, map, switchMap, catchError, concatMap } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchCreatedRecommendationsFailure,
  fetchCreatedRecommendationsRequest,
  fetchCreatedRecommendationsSuccess,
} from "../slices/created-recommendations";
import { RootEpic } from "../types";
import { IBook } from "../../types/common";
import { fetchRecommendationsRequest } from "../slices";

function prepareCreatedRecommendationsMock() {
  const books: IBook[] = [];
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
      title: `${inx} created rec book`,
    };
    books.push(recommendedBook);
  });
  return {
    books,
  };
}

export const loadCreatedRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchCreatedRecommendationsRequest.match),
    switchMap((action) => {
      const response = prepareCreatedRecommendationsMock();
      return of(response).pipe(
        // TODO: remove mock !!!
        map((value) => fetchCreatedRecommendationsSuccess(value)),
        catchError(() => of(fetchCreatedRecommendationsFailure()))
      );
    })
  );
};

export const clearCreatedRecommendations: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchRecommendationsRequest.match),
    map(() => fetchCreatedRecommendationsSuccess({ books: [] }))
  );
};
