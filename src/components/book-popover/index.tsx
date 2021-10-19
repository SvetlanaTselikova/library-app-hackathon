import React, { useState, useEffect } from "react";
import { Tag } from "antd";
import { IBook } from "../../types/common";
import { Book } from "../book";
import styles from "./index.module.sass";

type Props = {
  book: IBook;
  background: string;
};

export const BookPopover: React.FC<Props> = (props: Props) => {
  const { book, background } = props;
  return (
    <div className={styles.wrapper}>
      <Book book={book} background={background} />
      <div>
        <div className={styles.annotation}>{book.annotation}</div>
        <div className={styles.age}>{book.year}</div>
        <div className={styles.volume}>{book.volume} страниц</div>
        <div className={styles.tags}>
          <Tag color="blue" className={styles.tag}>
            {book.rubric}
          </Tag>
          {book.keyword ? (
            <Tag className={styles.tag}>{book.keyword}</Tag>
          ) : null}
          {Array.isArray(book.title_additional)
            ? book.title_additional
                .slice(0, 5)
                .map((item) => <Tag className={styles.tag}>{item}</Tag>)
            : null}
        </div>
      </div>
    </div>
  );
};
