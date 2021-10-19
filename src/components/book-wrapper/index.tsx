import React, { useState, useEffect } from "react";
import { Popover } from "antd";
import { IBook } from "../../types/common";
import { Book } from "../book";
import { BookPopover } from "../book-popover";
import { COLORS, BACKGROUND_MAP } from "../../constants";

type Props = {
  book: IBook;
};

export const BookWrapper: React.FC<Props> = (props: Props) => {
  const { book } = props;
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
    <Popover
      content={<BookPopover book={book} background={background} />}
      trigger="hover"
      title="Описание книги"
    >
      <div style={{ display: "flex" }}>
        <Book book={book} background={background} />
      </div>
    </Popover>
  );
};
