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
};

export const ModalContent = (props: Props) => {
  const { isOpen, onClose } = props;
  const [mode, setMode] = useState<ModalMode>(ModalMode.steps);
  return (
    <Modal visible={isOpen} footer={null} onCancel={onClose} closable>
      {mode === ModalMode.ask ? (
        <AskBlock
          onCancel={() => onClose()}
          onNext={() => setMode(ModalMode.steps)}
        />
      ) : (
        <StepsBlock />
      )}
    </Modal>
  );
};
