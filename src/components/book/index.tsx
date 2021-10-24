import React from "react";
import { Badge } from "antd";
import { BACKGROUND_MAP, BAGES_COLOR_MAP } from "../../constants";
import { IBook } from "../../types/common";

import styles from "./index.module.sass";

type Props = {
  book: IBook;
  color: string;
};

export const Book: React.FC<Props> = (props: Props) => {
  const { id, title, author, year, age_resctriction } = props.book;
  const { color } = props;
  const content = (
    <span
      className={styles.itemImage}
      style={{ background: BACKGROUND_MAP[color] }}
    >
      <span className={styles.imageTitle}>{title}</span>
      <span className={styles.imageYear}>{year}</span>
      <span className={styles.imageAuthor}> {author}</span>
    </span>
  );

  return (
    <div
      className={`${styles.item} ${styles.itemText} ${styles.slickSlide}`}
      key={id}
    >
      {age_resctriction ? (
        <Badge.Ribbon
          text={`${age_resctriction}+`}
          color={BAGES_COLOR_MAP[color]}
        >
          {content}
        </Badge.Ribbon>
      ) : (
        content
      )}

      <span className={styles.itemTitle}>{title}</span>
      <span className={styles.itemAuthor}>{author}</span>
    </div>
  );
};
