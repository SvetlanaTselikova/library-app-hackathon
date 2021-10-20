import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of, delay } from "rxjs";
import {
  fetchFilteredBooksFailure,
  fetchFilteredBooksRequest,
  fetchFilteredBooksSuccess,
} from "../slices/filtered-books";
import { RootEpic } from "../types";
import { BookType, IBook } from "../../types/common";
import { errorNotification, getRandomInt } from "../../utils";

function prepareFilteredBooksMock() {
  const books: IBook[] = [];
  [...Array(10).keys()].forEach((item, inx) => {
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
      title: `${item} filtered book`,
    };
    books.push(book);
  });
  return {
    books,
  };
}

export const loadFilteredBooks: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchFilteredBooksRequest.match),
    delay(1000),
    switchMap((action) => {
      const response = prepareFilteredBooksMock();
      return of(response).pipe(
        // TODO: remove mock !!!
        map((value) => fetchFilteredBooksSuccess(value)),
        catchError(() => {
          errorNotification();
          return of(fetchFilteredBooksFailure());
        })
      );
    })
  );
};
