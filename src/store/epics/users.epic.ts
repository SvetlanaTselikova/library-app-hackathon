import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of, delay } from "rxjs";
import {
  fetchUsersFailure,
  fetchUsersRequest,
  fetchUsersSuccess,
} from "../slices/users";
import { RootEpic } from "../types";
import { errorNotification } from "../../utils";

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() => fetchUsersRequest())
  );
};

export const loadUsers: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchUsersRequest.match),
    delay(1000),
    switchMap(() => {
      const mockIds = [...Array(100).keys()]; // TODO: remove mock !!!!

      return of(mockIds).pipe(
        map((value) => fetchUsersSuccess(value)),
        catchError(() => {
          errorNotification();
          return of(fetchUsersFailure());
        })
      );
    })
  );
};
