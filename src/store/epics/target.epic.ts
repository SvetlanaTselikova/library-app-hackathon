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
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const loadTarget: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchTargetRequest.match),
    switchMap((action) => {
      return ajax
        .get<{ target: IBook[] }>(
          `${BACKEND_URL}/targets?target_ids=${action.payload.join(",")}`
        )
        .pipe(
          map((value) => fetchTargetSuccess(value?.response)),
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
    map(() => fetchTargetSuccess({ target: [] }))
  );
};
