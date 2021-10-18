import React, { useState } from "react";
import { Button, Modal } from "antd";

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
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
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
