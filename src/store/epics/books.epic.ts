import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of, delay } from "rxjs";
import {
  fetchBooksFailure,
  fetchBooksRequest,
  fetchBooksSuccess,
} from "../slices/books";
import { RootEpic } from "../types";
import { errorNotification } from "../../utils";

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() => fetchBooksRequest())
  );
};

export const loadBooks: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchBooksRequest.match),
    delay(1000),
    switchMap(() => {
      const mockIds = [...Array(20).keys()]; // TODO: remove mock !!!!

      return of(mockIds).pipe(
        map((value) => fetchBooksSuccess(value)),
        catchError(() => {
          errorNotification();
          return of(fetchBooksFailure());
        })
      );
    })
  );
};
