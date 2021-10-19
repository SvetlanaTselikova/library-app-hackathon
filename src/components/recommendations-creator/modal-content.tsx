import React, { useState } from "react";
import { Modal } from "antd";

import { AskBlock } from "./ask";
import { StepsBlock } from "./steps";
import { IBook, BookType } from "../../types/common";
import styles from "./index.module.sass";

enum ModalMode {
  steps = "steps",
  ask = "ask",
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isLoadingGenres: boolean;
  genresData: string[];
  isLoadingFilteredBooks: boolean;
  filteredBooksData: IBook[];
  fetchFilteredBooks: (type: BookType, genres: string[]) => void;
};

export const ModalContent = (props: Props) => {
  const { isOpen, onClose } = props;
  const {
    isLoadingGenres,
    genresData,
    isLoadingFilteredBooks,
    filteredBooksData,
    fetchFilteredBooks,
  } = props;
  const [mode, setMode] = useState<ModalMode>(ModalMode.steps);

  return (
    <Modal
      visible={isOpen}
      footer={null}
      onCancel={onClose}
      closable
      width={mode === ModalMode.steps ? "80%" : undefined}
    >
      {mode === ModalMode.ask ? (
        <AskBlock
          onCancel={() => onClose()}
          onNext={() => setMode(ModalMode.steps)}
        />
      ) : (
        <StepsBlock
          genresData={genresData}
          isLoadingGenres={isLoadingGenres}
          isLoadingFilteredBooks={isLoadingFilteredBooks}
          filteredBooksData={filteredBooksData}
          fetchFilteredBooks={fetchFilteredBooks}
        />
      )}
    </Modal>
  );
};
