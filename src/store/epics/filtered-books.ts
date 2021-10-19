import { filter, map, switchMap, catchError, take } from "rxjs/operators";
import { of } from "rxjs";
import {
  fetchFilteredBooksFailure,
  fetchFilteredBooksRequest,
  fetchFilteredBooksSuccess,
} from "../slices/filtered-books";
import { RootEpic } from "../types";
import { BookType, IBook } from "../../types/common";

function prepareFilteredBooksMock() {
  const books: IBook[] = [];
  [...Array(10).keys()].forEach((item, inx) => {
    const bookObj = {
      id: item,
      author: `${item} author`,
      year: 123,
      annotation: `${item} annotation`,
      age_resctriction: 16,
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

export const init: RootEpic = (action$, state$) => {
  return state$.pipe(
    take(1),
    map(() =>
      fetchFilteredBooksRequest({ type: BookType.classic, genres: ["sss"] })
    )
  );
};
export const loadFilteredBooks: RootEpic = (action$, state$) => {
  return action$.pipe(
    filter(fetchFilteredBooksRequest.match),
    switchMap((action) => {
      const response = prepareFilteredBooksMock();
      return of(response).pipe(
        // TODO: remove mock !!!
        map((value) => fetchFilteredBooksSuccess(value)),
        catchError(() => of(fetchFilteredBooksFailure()))
      );
    })
  );
};
