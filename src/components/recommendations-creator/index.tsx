import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "./index.module.sass";
import magic from "../../images/magic.png";

import { ModalContent } from "./modal-content";
import { IBook, BookType } from "../../types/common";

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
  isLoadingFilteredBooks: boolean;
  filteredBooksData: IBook[];
  fetchFilteredBooks: (type: BookType, genres: string[]) => void;
};

export const RecommendationsCreator = (props: Props) => {
  const {
    isLoadingGenres,
    genresData,
    isLoadingFilteredBooks,
    filteredBooksData,
    fetchFilteredBooks,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <React.Fragment>
      <Button
        onClick={() => setIsOpen(true)}
        className={styles.creatorBtn}
        type="link"
      >
        Подобрать персональные рекомендации
        <img src={magic} className={styles.magicImg} />
      </Button>
      {isOpen ? (
        <ModalContent
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          genresData={genresData}
          isLoadingGenres={isLoadingGenres}
          isLoadingFilteredBooks={isLoadingFilteredBooks}
          filteredBooksData={filteredBooksData}
          fetchFilteredBooks={fetchFilteredBooks}
        />
      ) : null}
    </React.Fragment>
  );
};
