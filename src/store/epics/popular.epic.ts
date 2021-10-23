import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchPopularFailure,
  fetchPopularRequest,
  fetchPopularSuccess,
} from "../slices/popular";
import { RootEpic } from "../types";
import { ContentMode, IBook } from "../../types/common";
import { setContentMode } from "../slices/content-mode";
import { errorNotification } from "../../utils";
import { ajax } from "rxjs/ajax";
import { BACKEND_URL } from "../../constants";

export const initLoadPopular: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(setContentMode.match),
    filter((action) => action.payload === ContentMode.populdar),
    map(() => fetchPopularRequest())
  );
};

export const loadPopular: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchPopularRequest.match),
    switchMap((action) => {
      return ajax
        .get<{ month: IBook[]; news: IBook[]; russian: IBook[] }>(
          `${BACKEND_URL}/popular`
        )
        .pipe(
          map((value) => fetchPopularSuccess(value?.response)),
          catchError(() => {
            errorNotification();
            return of(fetchPopularFailure());
          })
        );
    })
  );
};
