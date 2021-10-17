import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchBooksFailure,
  fetchBooksRequest,
  fetchBooksSuccess,
} from "../slices/books";
import { RootEpic } from "../types";

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() => fetchBooksRequest())
  );
};

export const loadBooks: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchBooksRequest.match),
    switchMap(() => {
      const mockIds = [...Array(20).keys()]; // TODO: remove mock !!!!

      return of(mockIds).pipe(
        map((value) => fetchBooksSuccess(value)),
        catchError(() => of(fetchBooksFailure()))
      );
    })
  );
};
