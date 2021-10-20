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
import { errorNotification, getRandomInt } from "../../utils";

function prepareCreatedRecommendationsMock() {
  const books: IBook[] = [];
  [...Array(10).keys()].forEach((item, inx) => {
    const bookObj = {
      id: getRandomInt(0, 100),
      author: `${inx} author`,
      year: 123,
      annotation: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
      age_resctriction: Math.random() > 0.5 ? 16 : undefined,
      volume: 123,
      rubric: "rubric",
      keyword: "keyword",
      title_additional: ["add1", "add2", "add3", "add4"],
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
        catchError(() => {
          errorNotification();
          return of(fetchCreatedRecommendationsFailure());
        })
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
