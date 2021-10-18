import React, { useState } from "react";
import { Button, Modal } from "antd";

import { ModalContent } from "./modal-content";

export const RecommendationsCreator = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <React.Fragment>
      <Button onClick={() => setIsOpen(true)}>Open modal</Button>
      {isOpen ? (
        <ModalContent isOpen={isOpen} onClose={() => setIsOpen(false)} />
      ) : null}
    </React.Fragment>
  );
};
