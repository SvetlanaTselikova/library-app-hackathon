import React, { useState } from "react";
import { Modal } from "antd";

import { AskBlock } from "./ask";
import { StepsBlock } from "./steps";

enum ModalMode {
  steps = "steps",
  ask = "ask",
}

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isLoadingGenres: boolean;
  genresData: string[];
};

export const ModalContent = (props: Props) => {
  const { isOpen, onClose } = props;
  const { isLoadingGenres, genresData } = props;
  const [mode, setMode] = useState<ModalMode>(ModalMode.ask);
  return (
    <Modal visible={isOpen} footer={null} onCancel={onClose} closable>
      {mode === ModalMode.ask ? (
        <AskBlock
          onCancel={() => onClose()}
          onNext={() => setMode(ModalMode.steps)}
        />
      ) : (
        <StepsBlock genresData={genresData} isLoadingGenres={isLoadingGenres} />
      )}
    </Modal>
  );
};
