import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of, delay } from "rxjs";
import {
  fetchRecommendationsFailure,
  fetchRecommendationsRequest,
  fetchRecommendationsSuccess,
} from "../slices/recommendations";
import { RootEpic } from "../types";
import { ContentMode, IBook } from "../../types/common";
import { fetchPopularRequest, setContentMode } from "../slices";
import { NO_HISTORY } from "../../constants";
import { errorNotification, getRandomInt } from "../../utils";

function prepareRecommendationsMock(userId: number) {
  const recommendations: IBook[] = [];
  const history: IBook[] = [];
  [...Array(10).keys()].forEach((item, inx) => {
    const bookObj = {
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
      id: getRandomInt(0, 100),
      title: `${inx} rec book for ${userId}`,
    };
    const historyBook = {
      ...bookObj,
      id: getRandomInt(0, 100),
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
    delay(1000),
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
        catchError(() => {
          errorNotification();
          return of(fetchRecommendationsFailure());
        })
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
