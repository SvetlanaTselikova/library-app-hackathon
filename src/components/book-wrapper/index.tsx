import React, { useState, useEffect } from "react";
import { Popover } from "antd";
import { IBook } from "../../types/common";
import { Book } from "../book";
import { BookPopover } from "../book-popover";
import { COLORS } from "../../constants";

type Props = {
  book: IBook;
  popupPlacement?: string;
};

export const BookWrapper: React.FC<Props> = (props: Props) => {
  const { book, popupPlacement } = props;
  const [color, setColor] = useState<COLORS>(COLORS.orange);
  const pickColor = () => {
    const idLastNumber = book.id % 10;
    let pickedColor = COLORS.orange;
    if ([1, 4, 9].includes(idLastNumber)) {
      pickedColor = COLORS.red;
    }
    if ([0, 2, 5].includes(idLastNumber)) {
      pickedColor = COLORS.green;
    }
    return pickedColor;
  };
  useEffect(() => {
    const color = pickColor();
    setColor(color);
  }, []);

  return (
    <Popover
      content={<BookPopover book={book} color={color} />}
      trigger="hover"
      title="Описание книги"
      placement={popupPlacement as any}
    >
      <div style={{ display: "inline-block" }}>
        <Book book={book} color={color} />
      </div>
    </Popover>
  );
};
