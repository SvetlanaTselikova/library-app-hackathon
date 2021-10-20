import { filter, map, switchMap, catchError } from "rxjs/operators";
import { of, delay } from "rxjs";
import {
  fetchPopularFailure,
  fetchPopularRequest,
  fetchPopularSuccess,
} from "../slices/popular";
import { RootEpic } from "../types";
import { ContentMode, IBook } from "../../types/common";
import { setContentMode } from "../slices/content-mode";
import { errorNotification, getRandomInt } from "../../utils";

function preparePopularMock() {
  const month: IBook[] = [];
  const russian: IBook[] = [];
  const news: IBook[] = [];
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
    const monthBook = {
      ...bookObj,
      id: getRandomInt(0, 100),
      title: `${inx} month book`,
    };
    const russianBook = {
      ...bookObj,
      id: getRandomInt(0, 100),
      title: `${inx} russian book`,
    };
    const newBook = {
      ...bookObj,
      id: getRandomInt(0, 100),
      title: `${inx} new book`,
    };
    month.push(monthBook);
    russian.push(russianBook);
    news.push(newBook);
  });
  return {
    month,
    russian,
    news,
  };
}

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
    delay(1000),
    switchMap((action) => {
      const response = preparePopularMock();
      return of(response).pipe(
        // TODO: remove mock !!!
        map((value) => fetchPopularSuccess(value)),
        catchError(() => {
          errorNotification();
          return of(fetchPopularFailure());
        })
      );
    })
  );
};
