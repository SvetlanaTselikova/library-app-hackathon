import React, { useState, useEffect } from "react";
import { COLORS, BACKGROUND_MAP } from "../../constants";
import { IBook } from "../../types/common";

import styles from "./index.module.sass";

type Props = {
  book: IBook;
};

export const Book: React.FC<Props> = (props: Props) => {
  const { id, title, author, year } = props.book;
  const [background, setBackground] = useState<string>("#fff");
  const pickColor = () => {
    const colors = Object.values(COLORS);
    const pickedColor = colors[Math.floor(Math.random() * colors.length)];
    return pickedColor;
  };
  useEffect(() => {
    const color = pickColor();
    setBackground(BACKGROUND_MAP[color]);
  }, []);

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
