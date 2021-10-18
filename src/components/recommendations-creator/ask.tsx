import React, { useState } from "react";
import { Button, Result, Space } from "antd";

type Props = {
  onCancel: () => void;
  onNext: () => void;
};

export const AskBlock = (props: Props) => {
  const { onCancel, onNext } = props;
  return (
    <Result
      subTitle="Похоже, у вас нет истории о прочитанных книгах. Ответьте на несколько
    коротких вопросов, и мы подберем рекомендации для вас."
      extra={
        <Space>
          <Button onClick={onCancel}>Нет, спасибо</Button>
          <Button type="primary" onClick={onNext}>
            {" "}
            Подобрать рекомендации
          </Button>
        </Space>
      }
      icon={<span></span>}
    />
  );
};
