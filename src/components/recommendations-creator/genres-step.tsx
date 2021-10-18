import React, { useState } from "react";
import { Tag, Skeleton } from "antd";
import styles from "./index.module.sass";

const { CheckableTag } = Tag;

type Props = {
  isLoadingGenres: boolean;
  genresData: string[];
  selectedGenres: string[];
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
};

export const GenresStep = (props: Props) => {
  const { isLoadingGenres, genresData, selectedGenres, onAdd, onRemove } =
    props;
  return isLoadingGenres ? (
    <Skeleton active />
  ) : (
    <div className={styles.genresContent}>
      {genresData.map((item) => (
        <CheckableTag
          className={styles.genreTag}
          checked={selectedGenres.includes(item)}
          onChange={(checked) => {
            if (checked) {
              onAdd(item);
            } else {
              onRemove(item);
            }
          }}
        >
          {item}
        </CheckableTag>
      ))}
    </div>
  );
};
