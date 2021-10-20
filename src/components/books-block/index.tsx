import React from "react";
import { Typography, Carousel, Divider } from "antd";

import { IBook } from "../../types/common";
import styles from "./index.module.sass";
import { BooksCarousel } from "../books-carousel";
import { BookWrapper } from "../book-wrapper";

type Props = {
  title: string;
  books: IBook[];
  isTarget?: boolean;
  popupPlacement?: string;
};

export const BooksBlock: React.FC<Props> = (props: Props) => {
  const { title, books, isTarget, popupPlacement } = props;

  return (
    <div style={{ margin: isTarget ? "40px 0 0 0 " : "40px 0" }}>
      {!isTarget ? <Divider /> : null}
      <Typography.Title level={4}>{title}</Typography.Title>
      <BooksCarousel>
        {books.map((item, inx) => (
          <React.Fragment key={inx}>
            <BookWrapper book={item} popupPlacement={popupPlacement} />
          </React.Fragment>
        ))}
      </BooksCarousel>
    </div>
  );
};
