import React from "react";
import { Tag, Skeleton, Select } from "antd";
import styles from "./index.module.sass";

const { CheckableTag } = Tag;

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
  selectedGenres: string[];
  onChange: (value: string[]) => void;
};

export const GenresStep = (props: Props) => {
  const { isLoadingGenres, genresData, selectedGenres, onChange } = props;
  return isLoadingGenres ? (
    <Skeleton active />
  ) : (
    <div className={styles.genresContent}>
      <Select
        placeholder="Выберите жанры..."
        onChange={onChange}
        mode="multiple"
        className={styles.genresSelect}
        maxTagCount={6}
        loading={isLoadingGenres}
        value={selectedGenres as any}
      >
        {genresData?.length
          ? genresData
              .slice()
              .sort((one, two) => one.localeCompare(two))
              .map((item, inx) => (
                <Select.Option key={inx} value={item}>
                  {item}
                </Select.Option>
              ))
          : null}
      </Select>
    </div>
  );
};
