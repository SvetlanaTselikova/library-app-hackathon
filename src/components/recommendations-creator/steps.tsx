import React, { useState } from "react";
import { Button, Steps, Typography } from "antd";
import styles from "./index.module.sass";
import { BookType } from "../../types/common";
import { TypeStep } from "./type-step";
import { GenresStep } from "./genres-step";

const { Step } = Steps;

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
};

export const StepsBlock = (props: Props) => {
  const { isLoadingGenres, genresData } = props;
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedType, setSelectedType] = useState<BookType | undefined>(
    undefined
  );
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);

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
      content: (
        <GenresStep
          isLoadingGenres={isLoadingGenres}
          genresData={genresData}
          selectedGenres={selectedGenres}
          onAdd={(value) => setSelectedGenres([...selectedGenres, value])}
          onRemove={(value) =>
            setSelectedGenres(selectedGenres.filter((item) => item !== value))
          }
        />
      ),
      header: "Выберите интересные жанры",
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
  const getIsNextDisabled = () => {
    if (currentStep === 0 && !selectedType) {
      return true;
    }
    if (currentStep === 1 && !selectedGenres.length) {
      return true;
    }
    if (currentStep === 2 && !selectedBooks.length) {
      return true;
    }
    return false;
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
          disabled={getIsNextDisabled()}
        >
          {currentStep === steps.length - 1
            ? "Подобрать рекомендации"
            : "Далее"}
        </Button>
      </div>
    </React.Fragment>
  );
};
