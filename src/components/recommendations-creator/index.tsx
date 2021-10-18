import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "./index.module.sass";
import magic from "../../images/magic.png";

import { ModalContent } from "./modal-content";

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
};

export const RecommendationsCreator = (props: Props) => {
  const { isLoadingGenres, genresData } = props;
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
        />
      ) : null}
    </React.Fragment>
  );
};
