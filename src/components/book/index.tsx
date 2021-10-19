import React, { useState, useEffect } from "react";

import { IBook } from "../../types/common";

import styles from "./index.module.sass";

type Props = {
  book: IBook;
  background: string;
};

export const Book: React.FC<Props> = (props: Props) => {
  const { id, title, author, year } = props.book;
  const { background } = props;

  return (
    <div
      className={`${styles.item} ${styles.itemText} ${styles.slickSlide}`}
      key={id}
    >
      <span className={styles.itemImage} style={{ background }}>
        <span className={styles.imageTitle}>{title}</span>
        <span className={styles.imageAuthor}> {author}</span>
        <span className={styles.imageYear}>{year}</span>
      </span>

      <span className={styles.itemTitle}>{title}</span>
      <span className={styles.itemAuthor}>{author}</span>
    </div>
  );
};
