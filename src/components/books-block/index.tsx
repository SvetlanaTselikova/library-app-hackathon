import React from "react";
import { Typography, Carousel, Divider } from "antd";

import { IBook } from "../../types/common";
import styles from "./index.module.sass";
import { BooksCarousel } from "../books-carousel";
import { Book } from "../book";

type Props = {
  title: string;
  books: IBook[];
  isTarget?: boolean;
};

export const BooksBlock: React.FC<Props> = (props: Props) => {
  const { title, books, isTarget } = props;

  return (
    <div style={{ margin: isTarget ? "40px 0 0 0 " : "40px 0" }}>
      {!isTarget ? <Divider /> : null}
      <Typography.Title level={4}>{title}</Typography.Title>
      <BooksCarousel>
        {books.map((item, inx) => (
          <Book book={item} />
        ))}
      </BooksCarousel>
    </div>
  );
};
