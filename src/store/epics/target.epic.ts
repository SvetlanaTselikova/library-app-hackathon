import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchTargetFailure,
  fetchTargetRequest,
  fetchTargetSuccess,
} from "../slices/target";
import { RootEpic } from "../types";
import { IBook } from "../../types/common";
import { fetchRecommendationsRequest } from "../slices";
import { errorNotification, getRandomInt } from "../../utils";

function prepareTargetMock(bookIds: number[]) {
  const books: IBook[] = [];
  bookIds.forEach((item, inx) => {
    const bookObj = {
      id: getRandomInt(0, 100),
      author: `${item} author`,
      year: 123,
      annotation: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's.`,
      age_resctriction: Math.random() > 0.5 ? 16 : undefined,
      volume: 123,
      rubric: "rubric",
      keyword: "keyword",
      title_additional: ["add1", "add2", "add3", "add4"],
    };
    const book = {
      ...bookObj,
      title: `${item} target book`,
    };
    books.push(book);
  });
  return {
    books,
  };
}

export const loadTarget: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchTargetRequest.match),
    switchMap((action) => {
      const response = prepareTargetMock(action.payload);
      return of(response).pipe(
        // TODO: remove mock !!!
        map((value) => fetchTargetSuccess(value)),
        catchError(() => {
          errorNotification();
          return of(fetchTargetFailure());
        })
      );
    })
  );
};

export const clearTarget: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchRecommendationsRequest.match),
    map(() => fetchTargetSuccess({ books: [] }))
  );
};
