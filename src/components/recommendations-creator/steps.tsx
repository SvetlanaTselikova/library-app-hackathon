import React, { useState } from "react";
import { Button, Steps, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styles from "./index.module.sass";
import { BookType } from "../../types/common";
import { TypeStep } from "./type-step";

const { Step } = Steps;

export const StepsBlock = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedType, setSelectedType] = useState<BookType | undefined>(
    undefined
  );
  const steps = [
    {
      title: "Тип",
      content: (
        <TypeStep
          currentType={selectedType}
          onSelect={(type) => setSelectedType(type)}
        />
      ),
      header: "Выберите тип литературы",
    },
    {
      title: "Жанры",
      content: "Second-content",
    },
    {
      title: "Книги",
      content: "Last-content",
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <React.Fragment>
      <Steps current={currentStep} progressDot>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <div className={styles.stepsContent}>
        <Typography.Title level={4} className={styles.stepHeader}>
          {steps[currentStep].header}
        </Typography.Title>
        {steps[currentStep].content}
      </div>
      <div className={styles.stepBtns}>
        {currentStep > 0 && <Button onClick={() => prev()}>Назад</Button>}
        <Button
          type="primary"
          onClick={() => next()}
          className={styles.stepBtnNext}
        >
          {currentStep === steps.length - 1
            ? "Подобрать рекомендации"
            : "Далее"}
        </Button>
      </div>
    </React.Fragment>
  );
};
